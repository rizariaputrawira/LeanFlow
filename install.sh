#!/usr/bin/env bash
# Run from a local checkout; all argument handling belongs to the Node installer.
set -euo pipefail
exec node "$(dirname "${BASH_SOURCE[0]}")/scripts/install.mjs" "$@"
