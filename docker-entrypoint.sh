#!/bin/bash
set -eo pipefail
shopt -s nullglob

# このファイルが直接実行されたのか、別スクリプトから source されたのかを確認する
_is_sourced() {
	# https://unix.stackexchange.com/a/215279
	[ "${#FUNCNAME[@]}" -ge 2 ] \
		&& [ "${FUNCNAME[0]}" = '_is_sourced' ] \
		&& [ "${FUNCNAME[1]}" = 'source' ]
}

# 実行時にマウントされたボリュームを開発ユーザーが書き込めるようにする。
# 新規作成された named volume は root 所有で現れるので、マウント後に chown する。
# パスが無ければ（未マウントなら）何もしない。set -e 下でも致命的にしない。
_own_mount() {
	local d="$1"
	[ -n "$d" ] && [ -d "$d" ] || return 0
	sudo -n chown -R "$(id -u):$(id -g)" "$d" 2>/dev/null || true
}

# ボリュームのマウント後に Claude Code の設定を貼り直す。
#
# このイメージは実行時に named volume を $CLAUDE_CONFIG_DIR (=/claude-config) へ
# 上書きマウントする（これで `claude --resume` が `--rm` でも生き残る）。その
# マウントは dotfiles の install.sh がビルド時に張った symlink を覆い隠し、独自の
# statusLine / hooks を見えなくする。entrypoint はマウントの *後* に走るので、
# ここで symlink を貼り直せば有効なまま残る。
#
# CLAUDE_CONFIG_DIR が未設定なら（例：素の Docker イメージ）何もしない。ここでの
# 失敗でコンテナを落としてはならないので、致命的にしない（set -e 下で動作）。
_seed_claude_config() {
	[ -n "${CLAUDE_CONFIG_DIR:-}" ] || return 0
	local seeder="$HOME/dotfiles/config/claude-code/seed-config-dir.sh"
	[ -x "$seeder" ] || { echo "entrypoint: seeder not found, skipping" >&2; return 0; }
	"$seeder" || echo "entrypoint: seed-config-dir.sh failed (non-fatal)" >&2
}

_main() {
    _own_mount "${CLAUDE_CONFIG_DIR:-}"
    _own_mount /zsh-volume
    _seed_claude_config
    exec "$@"
}

# 別スクリプトから source された場合は、これ以上何もしない
if ! _is_sourced; then
	_main "$@"
fi
