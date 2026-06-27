#!/bin/bash
set -eo pipefail
shopt -s nullglob

# check to see if this file is being run or sourced from another script
_is_sourced() {
	# https://unix.stackexchange.com/a/215279
	[ "${#FUNCNAME[@]}" -ge 2 ] \
		&& [ "${FUNCNAME[0]}" = '_is_sourced' ] \
		&& [ "${FUNCNAME[1]}" = 'source' ]
}

# Re-seed Claude Code config after the volume is mounted.
#
# This image mounts a named volume over $CLAUDE_CONFIG_DIR (=/claude-config)
# at runtime (so `claude --resume` survives `--rm`). That mount shadows the
# symlinks dotfiles' install.sh created at build time, leaving the custom
# statusLine / hooks hidden. The entrypoint runs *after* the mount, so
# re-creating the symlinks here makes them stick.
#
# No-op when CLAUDE_CONFIG_DIR is unset (e.g. the plain Docker image). Never
# fatal: a failure here must not take down the container (we run under set -e).
_seed_claude_config() {
	[ -n "${CLAUDE_CONFIG_DIR:-}" ] || return 0
	local seeder="$HOME/dotfiles/config/claude-code/seed-config-dir.sh"
	[ -x "$seeder" ] || { echo "entrypoint: seeder not found, skipping" >&2; return 0; }
	# A freshly created volume can be root-owned; take ownership (passwordless sudo).
	sudo -n chown -R "$(id -u):$(id -g)" "$CLAUDE_CONFIG_DIR" 2>/dev/null || true
	"$seeder" || echo "entrypoint: seed-config-dir.sh failed (non-fatal)" >&2
}

_main() {
    _seed_claude_config
    exec "$@"
}

# If we are sourced from elsewhere, don't perform any further actions
if ! _is_sourced; then
	_main "$@"
fi
