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

_main() {
    # コンテナ側の規約セットアップ（ボリューム所有権・Claude 設定など）は
    # dotfiles に一任する。このテンプレートはツール固有の知識を持たない。
    local init="$HOME/dotfiles/container-init.sh"
    [ -x "$init" ] && { "$init" || echo "entrypoint: container-init.sh failed (non-fatal)" >&2; }
    exec "$@"
}

# 別スクリプトから source された場合は、これ以上何もしない
if ! _is_sourced; then
	_main "$@"
fi
