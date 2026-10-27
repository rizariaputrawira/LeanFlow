#!/usr/bin/env bash
# ==============================================================================
# Antigravity Configuration Installer (Linux & macOS)
# Supports both:
# 1. Local execution inside cloned repository
# 2. Remote pipe: curl -fsSL https://raw.githubusercontent.com/<user>/<repo>/main/install.sh | bash
# ==============================================================================

set -euo pipefail

# Configurable defaults
DEFAULT_REPO="rizariaputrawira/LeanFlow"
REPO_NAME="${ANTIGRAVITY_REPO:-$DEFAULT_REPO}"
TARGET_WORKSPACE="${WORKSPACE_DIR:-${HOME}/workspaces}"
DRY_RUN=false
TEMP_DIR=""

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --workspace=*)
      TARGET_WORKSPACE="${arg#*=}"
      shift
      ;;
    --repo=*)
      REPO_NAME="${arg#*=}"
      shift
      ;;
    --help|-h)
      echo "Antigravity Configuration Installer"
      echo "Usage: install.sh [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --dry-run              Simulate installation without touching ~/.gemini"
      echo "  --workspace=<path>     Set root workspace directory (default: ~/workspaces)"
      echo "  --repo=<owner/repo>    GitHub repository to download from when piped via curl"
      echo "  --help, -h             Show this help message"
      exit 0
      ;;
  esac
done

cleanup() {
  if [ -n "${TEMP_DIR}" ] && [ -d "${TEMP_DIR}" ]; then
    rm -rf "${TEMP_DIR}"
  fi
}
trap cleanup EXIT

echo "============================================================"
echo "⚡ Antigravity Portable Configuration Installer"
echo "============================================================"
echo "Workspace Root: ${TARGET_WORKSPACE}"
echo "Dry Run Mode:   ${DRY_RUN}"
echo ""

# 1. Determine Source Directory (Local repo vs Remote pipe)
SCRIPT_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

if [ -n "${SCRIPT_DIR}" ] && [ -f "${SCRIPT_DIR}/config/AGENTS.md" ]; then
  SRC_DIR="${SCRIPT_DIR}"
  echo "📦 Source: Local repository at ${SRC_DIR}"
elif [ -f "./config/AGENTS.md" ]; then
  SRC_DIR="$(pwd)"
  echo "📦 Source: Local working directory at ${SRC_DIR}"
else
  echo "🌐 Source: Remote execution detected. Fetching repository archive from GitHub (${REPO_NAME})..."
  TEMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t 'antigravity-config')"
  ARCHIVE_URL="https://github.com/${REPO_NAME}/archive/refs/heads/main.tar.gz"
  
  if command -v curl >/dev/null 2>&1; then
    if ! curl -fsSL "${ARCHIVE_URL}" | tar -xz -C "${TEMP_DIR}" --strip-components=1 2>/dev/null; then
      echo "❌ Error: Failed to fetch archive from ${ARCHIVE_URL}." >&2
      echo "   Please ensure the GitHub repository exists and has a 'main' branch, or clone it locally." >&2
      exit 1
    fi
  elif command -v wget >/dev/null 2>&1; then
    if ! wget -qO- "${ARCHIVE_URL}" | tar -xz -C "${TEMP_DIR}" --strip-components=1 2>/dev/null; then
      echo "❌ Error: Failed to fetch archive from ${ARCHIVE_URL}." >&2
      exit 1
    fi
  else
    echo "❌ Error: Neither curl nor wget is available to download configuration archive." >&2
    exit 1
  fi
  SRC_DIR="${TEMP_DIR}"
fi

# 2. Pre-flight Environment Diagnostics
echo "🔍 Running pre-flight environment checks..."
MISSING_PREREQS=0

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Error: 'node' is required to safely merge privacy settings and run bundled hooks." >&2
  exit 1
else
  echo "  ✅ Node.js detected: $(node -v)"
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "  ⚠️ Warning: 'npx' is not found in PATH. Context7, GitHub, and LSP MCP servers require npx."
  MISSING_PREREQS=$((MISSING_PREREQS + 1))
else
  echo "  ✅ npx detected: $(npx -v 2>/dev/null || echo 'available')"
fi

if ! command -v git >/dev/null 2>&1; then
  echo "  ⚠️ Warning: 'git' is not found in PATH."
  MISSING_PREREQS=$((MISSING_PREREQS + 1))
else
  echo "  ✅ git detected: $(git --version)"
fi

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "  💡 Notice: GITHUB_TOKEN is not currently exported. (GitHub MCP server requires this for auth)."
else
  echo "  ✅ GITHUB_TOKEN is present in environment."
fi

# 3. Target Directories & Non-Destructive Backup
GEMINI_DIR="${HOME}/.gemini"
CONFIG_DIR="${GEMINI_DIR}/config"
CLI_DIR="${GEMINI_DIR}/antigravity-cli"

# Refuse a flat legacy agent filename conflict before any installation mutation.
for agent_dir in "${SRC_DIR}/config/agents/"*; do
  [ -d "${agent_dir}" ] || continue
  agent_name="$(basename "${agent_dir}")"
  if [ -f "${CONFIG_DIR}/agents/${agent_name}.md" ]; then
    echo "❌ Cannot install agent '${agent_name}': flat file ${CONFIG_DIR}/agents/${agent_name}.md conflicts with the directory-based agent. Preserve it and resolve the conflict manually." >&2
    exit 1
  fi
done

# Refuse legacy skill identities without deleting or rewriting local packages.
node "${SRC_DIR}/scripts/check-legacy-skills.cjs" "${SRC_DIR}" "${CONFIG_DIR}/skills"

# Validate before any mutation; malformed settings must not fall back to telemetry defaults.
node "${SRC_DIR}/scripts/apply-privacy.cjs" "${CLI_DIR}/settings.json" "${CONFIG_DIR}/mcp_config.json" --check

if [ "${DRY_RUN}" = true ]; then
  echo ""
  echo "🔎 [DRY RUN] Would create directories:"
  echo "   - ${CONFIG_DIR}"
  echo "   - ${CLI_DIR}"
  echo "   - ${TARGET_WORKSPACE}"
  
  if [ -d "${CONFIG_DIR}" ]; then
    echo "🔎 [DRY RUN] Would backup existing ~/.gemini to ~/.gemini.bak.$(date +%Y%m%d_%H%M%S)"
  fi
  
  echo "🔎 [DRY RUN] Would render templates without sed -i:"
  echo "   - config.json.template -> ${CONFIG_DIR}/config.json (hostname: $(hostname))"
  echo "   - mcp_config.json.template -> ${CONFIG_DIR}/mcp_config.json (workspace: ${TARGET_WORKSPACE})"
  echo "   - settings.json.template -> ${CLI_DIR}/settings.json (if missing)"
  echo "🔎 [DRY RUN] Would disable feedback surveys and recognized MCP telemetry, preserving unrelated settings."
  echo "🔎 [DRY RUN] Would merge portable skills/ and adapter config/skills/ into ${CONFIG_DIR}/skills, and copy hooks, agents, and AGENTS.md."
  echo "🔎 [DRY RUN] Would preserve ${TARGET_WORKSPACE}/.gitignore and add /workflow/ and /.workflow/ when missing."
  echo ""
  echo "✅ Dry run completed successfully. Zero changes were made."
  exit 0
fi

echo ""
echo "🚀 Proceeding with installation..."

# Back up every file the privacy merge can change, including settings-only installs.
if { [ -d "${CONFIG_DIR}" ] && [ "$(ls -A "${CONFIG_DIR}" 2>/dev/null)" ]; } || [ -f "${CLI_DIR}/settings.json" ]; then
  BACKUP_DIR="$(mktemp -d "${HOME}/.gemini.bak.$(date +%Y%m%d_%H%M%S).XXXXXX")"
  echo "💾 Creating backup of existing configuration to ${BACKUP_DIR}..."
  mkdir -p "${BACKUP_DIR}"
  [ ! -d "${CONFIG_DIR}" ] || cp -r "${CONFIG_DIR}" "${BACKUP_DIR}/"
  [ -f "${CLI_DIR}/settings.json" ] && cp "${CLI_DIR}/settings.json" "${BACKUP_DIR}/" || true
fi

# Ensure target directories exist
mkdir -p "${CONFIG_DIR}" "${CLI_DIR}" "${TARGET_WORKSPACE}"

# Keep local workflow artifacts out of future Git additions without changing tracked files.
node -e '
const fs = require("node:fs");
const path = require("node:path");
const file = path.join(process.argv[1], ".gitignore");
const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
const lines = current.split(/\r?\n/);
const missing = ["/workflow/", "/.workflow/"].filter(entry => !lines.includes(entry));
if (missing.length) fs.appendFileSync(file, (current && !current.endsWith("\n") ? "\n" : "") + missing.join("\n") + "\n");
' "${TARGET_WORKSPACE}"
echo "ℹ️ Workspace workflow directories are ignored. Already tracked workflow artifacts remain tracked; remove them from the Git index manually if needed (preserve local files)."

# Render configuration files only when absent; preserve installed user settings.
echo "⚙️ Rendering configuration templates when missing..."
HOSTNAME_VAL="$(hostname 2>/dev/null || echo 'localhost')"
if [ ! -f "${CONFIG_DIR}/config.json" ]; then
  sed "s|\${REMOTE_HOSTNAME}|${HOSTNAME_VAL}|g" \
    < "${SRC_DIR}/config/config.json.template" > "${CONFIG_DIR}/config.json"
fi
if [ ! -f "${CONFIG_DIR}/mcp_config.json" ]; then
  sed "s|\${WORKSPACE_ROOT}|${TARGET_WORKSPACE}|g" \
    < "${SRC_DIR}/config/mcp_config.json.template" > "${CONFIG_DIR}/mcp_config.json"
fi

# Initialize settings.json without trusting an arbitrary workspace.
if [ ! -f "${CLI_DIR}/settings.json" ]; then
  cp "${SRC_DIR}/settings/settings.json.template" "${CLI_DIR}/settings.json"
else
  echo "ℹ️ Existing settings.json preserved at ${CLI_DIR}/settings.json"
fi
node "${SRC_DIR}/scripts/apply-privacy.cjs" "${CLI_DIR}/settings.json" "${CONFIG_DIR}/mcp_config.json"



# 5. Copy Static Assets
echo "📦 Copying global rules, hooks, and skills..."
cp "${SRC_DIR}/config/AGENTS.md" "${CONFIG_DIR}/AGENTS.md"
cp "${SRC_DIR}/config/hooks.json" "${CONFIG_DIR}/hooks.json"

# Merge optional adapter skills with the portable canonical core.
mkdir -p "${CONFIG_DIR}/skills"
for skill_root in "${SRC_DIR}/config/skills" "${SRC_DIR}/skills"; do
  for skill_dir in "${skill_root}/"*; do
    [ -d "${skill_dir}" ] || continue
    cp -r "${skill_dir}" "${CONFIG_DIR}/skills/"
  done
done

# Copy shipped agents, preserving unrelated directories.
if [ -d "${SRC_DIR}/config/agents" ]; then
  mkdir -p "${CONFIG_DIR}/agents"
  for agent_dir in "${SRC_DIR}/config/agents/"*; do
    [ -d "${agent_dir}" ] || continue
    agent_name="$(basename "${agent_dir}")"
    mkdir -p "${CONFIG_DIR}/agents/${agent_name}"
    cp -r "${agent_dir}/." "${CONFIG_DIR}/agents/${agent_name}/"
  done
fi

# Copy utility scripts
if [ -d "${SRC_DIR}/scripts" ]; then
  mkdir -p "${CONFIG_DIR}/scripts"
  cp -r "${SRC_DIR}/scripts/"* "${CONFIG_DIR}/scripts/"
  chmod +x "${CONFIG_DIR}/scripts/"*.sh 2>/dev/null || true
fi

echo ""
echo "============================================================"
echo "🎉 Antigravity configuration successfully installed!"
echo "============================================================"
echo "Global Config: ${CONFIG_DIR}"
echo "Skills Count:  $(ls -1 "${CONFIG_DIR}/skills" 2>/dev/null | wc -l)"
echo ""
echo "You can now run 'agy' or 'antigravity' in your terminal."
echo "Privacy action required: in agy, open /config and set Enable Telemetry to off."
echo "agy 1.3.1 stores this control through its backend, not settings.json; this installer cannot verify or automate it."
