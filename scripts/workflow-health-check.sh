#!/usr/bin/env bash
# ==============================================================================
# Workflow Health Check & Auto-Repair Tool
# Diagnoses and heals workspace workflow conventions and installed skills.
# ==============================================================================

set -euo pipefail

MODE="check" # "check" or "fix"
TARGET_WORKSPACE="$(pwd)"
GLOBAL_GEMINI_DIR="${HOME}/.gemini"
GLOBAL_CONFIG_DIR="${GLOBAL_GEMINI_DIR}/config"
GLOBAL_SKILLS_DIR="${GLOBAL_CONFIG_DIR}/skills"
CANONICAL_REPO_DIR=""

# Determine if running from the antigravity-cli-config repository
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
if [ -f "${REPO_ROOT}/config/AGENTS.md" ]; then
  CANONICAL_REPO_DIR="${REPO_ROOT}"
fi

# Parse CLI arguments
for arg in "$@"; do
  case "$arg" in
    --check)
      MODE="check"
      shift
      ;;
    --fix)
      MODE="fix"
      shift
      ;;
    --workspace=*)
      TARGET_WORKSPACE="${arg#*=}"
      shift
      ;;
    --skills-dir=*)
      GLOBAL_SKILLS_DIR="${arg#*=}"
      shift
      ;;
    --help|-h)
      echo "Antigravity Workflow Health Check & Auto-Repair Tool"
      echo "Usage: $(basename "$0") [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --check                Run health diagnostics in read-only audit mode (default)"
      echo "  --fix                  Automatically migrate directories, patch references, and repair skills"
      echo "  --workspace=<path>     Target workspace directory (default: current directory)"
      echo "  --skills-dir=<path>    Target skills directory (default: ~/.gemini/config/skills)"
      echo "  --help, -h             Show this help message"
      exit 0
      ;;
  esac
done

# Resolve absolute path for workspace
TARGET_WORKSPACE="$(cd "${TARGET_WORKSPACE}" && pwd)"

ISSUES_FOUND=0
MIGRATIONS_APPLIED=0

echo "============================================================"
echo "🩺 Workflow & Skills Health Check"
echo "============================================================"
echo "Target Workspace: ${TARGET_WORKSPACE}"
echo "Global Skills:    ${GLOBAL_SKILLS_DIR}"
echo "Execution Mode:   ${MODE}"
echo ""

# ------------------------------------------------------------------------------
# 1. Workspace Workflow Directory Convention Check & Migration
# ------------------------------------------------------------------------------
echo "📁 Checking workspace workflow structure..."

migrate_dir() {
  local src="$1" dest="$2" warn="$3" fix="$4"
  [ -d "$src" ] || return 0
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
  if [ "$MODE" = "fix" ]; then
    echo "  🔧 ${fix}..."
    mkdir -p "$dest"
    if ! cp -an "${src}/." "${dest}/"; then
      echo "  ⚠️ Migration copy failed; preserving source '${src}' for manual recovery." >&2
      return 0
    fi
    # Keep the source tree: collisions and copy semantics vary across platforms,
    # so a successful no-clobber copy is not proof every source entry migrated.
    echo "  ℹ️ Copied available entries without overwrite; source '${src}' retained for manual reconciliation."
    MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
  else
    echo "  ⚠️ ${warn}"
  fi
}

migrate_dir "${TARGET_WORKSPACE}/.ar-wf" "${TARGET_WORKSPACE}/.workflow" \
  "Legacy workflow root found: '.ar-wf/' (Expected: '.workflow/')" \
  "Migrating legacy '.ar-wf/' to '.workflow/'"

WF_DIR="${TARGET_WORKSPACE}/.workflow"

if [ -d "${WF_DIR}" ]; then
  migrate_dir "${WF_DIR}/planning" "${WF_DIR}/plans" \
    "Legacy plans directory found: '.workflow/planning/' (Expected: '.workflow/plans/')" \
    "Renaming '.workflow/planning/' to '.workflow/plans/'"

  migrate_dir "${WF_DIR}/planning/brainstorm" "${WF_DIR}/brainstorm" \
    "Nested brainstorm found: '.workflow/planning/brainstorm/' (Expected: '.workflow/brainstorm/')" \
    "Un-nesting brainstorm directory to '.workflow/brainstorm/'"

  migrate_dir "${WF_DIR}/plans/brainstorm" "${WF_DIR}/brainstorm" \
    "Nested brainstorm found: '.workflow/plans/brainstorm/' (Expected: '.workflow/brainstorm/')" \
    "Un-nesting brainstorm directory to '.workflow/brainstorm/'"

  migrate_dir "${WF_DIR}/hyper-execution" "${WF_DIR}/executions" \
    "Legacy execution directory found: '.workflow/hyper-execution/' (Expected: '.workflow/executions/')" \
    "Migrating '.workflow/hyper-execution/' to '.workflow/executions/'"

  EXEC_DIR="${WF_DIR}/executions"
  if [ -d "${EXEC_DIR}" ]; then
    migrate_dir "${EXEC_DIR}/executions" "${EXEC_DIR}/runs" \
      "Nested executions folder found: '.workflow/executions/executions/' (Expected: '.workflow/executions/runs/')" \
      "Restructuring '.workflow/executions/executions/' into '.workflow/executions/runs/'"

    for item in "${EXEC_DIR}"/*; do
      if [ -d "${item}" ]; then
        base="$(basename "${item}")"
        if [ "$base" != "runs" ] && [ "$base" != "evidence" ] && [ "$base" != "executions" ]; then
          if [ -f "${item}/state.json" ] || [ -f "${item}/notes.md" ]; then
            migrate_dir "${item}" "${EXEC_DIR}/runs/${base}" \
              "Unorganized execution folder: '.workflow/executions/${base}' (Expected: '.workflow/executions/runs/${base}')" \
              "Relocating run '${base}' to '.workflow/executions/runs/${base}'"
          fi
        fi
      fi
    done
  fi

  # Check .gitignore for .workflow/executions/evidence/
  if [ -d "${EXEC_DIR}/evidence" ] && [ -d "${TARGET_WORKSPACE}/.git" ]; then
    GITIGNORE="${TARGET_WORKSPACE}/.gitignore"
    if [ ! -f "${GITIGNORE}" ] || ! grep -q "\.workflow/executions/evidence" "${GITIGNORE}" 2>/dev/null; then
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
      if [ "$MODE" = "fix" ]; then
        echo "  🔧 Adding '.workflow/executions/evidence/' to .gitignore..."
        echo -e "\n# Antigravity execution evidence\n.workflow/executions/evidence/" >> "${GITIGNORE}"
        MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
      else
        echo "  ⚠️ '.workflow/executions/evidence/' missing from .gitignore"
      fi
    fi
  fi
else
  echo "  ℹ️ No active '.workflow/' folder in target workspace (clean / uninitialized)."
fi

# ------------------------------------------------------------------------------
# 2. Content Reference Check & Patching (.workflow/**/*.md and .json)
# ------------------------------------------------------------------------------
echo "🔍 Checking workflow internal path & skill references..."
if [ -d "${WF_DIR}" ]; then
  # Preserve the historical planning depth while migrating retired skill invocations.
  DEPRECATED_MATCHES=$(grep -rn --exclude-dir="evidence" -E "(\.ar-wf/|/ar-(ultrawork|flashplan|superplan|hyperplan|hyperexecution|brainstorm)\b|/(ultrawork|flashplan|superplan|hyperplan)\b)" "${WF_DIR}" 2>/dev/null || true)
  if [ -n "${DEPRECATED_MATCHES}" ]; then
    MATCH_COUNT=$(printf '%s\n' "${DEPRECATED_MATCHES}" | wc -l)
    ISSUES_FOUND=$((ISSUES_FOUND + MATCH_COUNT))
    if [ "$MODE" = "fix" ]; then
      echo "  🔧 Patching ${MATCH_COUNT} deprecated references in .workflow/ files..."
      TMP_SED="$(mktemp 2>/dev/null || mktemp -t 'wf-patch')"
      # Use find and portable sed (excluding evidence directory)
      while IFS= read -r file; do
        sed -e 's|\.ar-wf/planning/brainstorm/|\.workflow/brainstorm/|g' \
            -e 's|\.ar-wf/planning/|\.workflow/plans/|g' \
            -e 's|\.ar-wf/hyper-execution/executions/|\.workflow/executions/runs/|g' \
            -e 's|\.ar-wf/hyper-execution/evidence/|\.workflow/executions/evidence/|g' \
            -e 's|\.ar-wf/hyper-execution/ledger\.jsonl|\.workflow/executions/ledger\.jsonl|g' \
            -e 's|\.ar-wf/|\.workflow/|g' \
            -e 's|/ar-ultrawork|/leanflow-orchestrate|g' \
            -e 's|/ultrawork|/leanflow-orchestrate|g' \
            -e 's|/ar-flashplan|/leanflow-plan (method: flash)|g' \
            -e 's|/flashplan|/leanflow-plan (method: flash)|g' \
            -e 's|/ar-superplan|/leanflow-plan (method: super)|g' \
            -e 's|/superplan|/leanflow-plan (method: super)|g' \
            -e 's|/ar-hyperplan|/leanflow-plan (method: hyper)|g' \
            -e 's|/hyperplan|/leanflow-plan (method: hyper)|g' \
            -e 's|/ar-hyperexecution|/leanflow-hyperexecution|g' \
            -e 's|/ar-brainstorm|/leanflow-brainstorm|g' \
            < "$file" > "$TMP_SED"
        mv "$TMP_SED" "$file"
      done < <(find "${WF_DIR}" -path "${WF_DIR}/executions/evidence" -prune -o -type f \( -name "*.md" -o -name "*.json" \) -print)
      rm -f "$TMP_SED"
      MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + MATCH_COUNT))
    else
      echo "  ⚠️ Found ${MATCH_COUNT} deprecated reference(s) (.ar-wf or legacy skill invocations) inside .workflow/"
    fi
  else
    echo "  ✅ All internal workflow references are up to date."
  fi
fi

# ------------------------------------------------------------------------------
# 3. Skills Health Check & Auto-Repair
# ------------------------------------------------------------------------------
echo "🧠 Checking installed skills health..."

if [ -d "${GLOBAL_SKILLS_DIR}" ]; then
  # A. Report obsolete skill identities; never delete potentially local packages.
  DEPRECATED_SKILLS=("ar-brainstorm" "ar-flashplan" "ar-superplan" "ar-hyperplan" "ar-hyperexecution" "ar-ultrawork" "ultrawork" "init-ai-core-consultation")
  for dep_skill in "${DEPRECATED_SKILLS[@]}"; do
    if [ -f "${GLOBAL_SKILLS_DIR}/${dep_skill}/SKILL.md" ]; then
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
      echo "  ⚠️ Deprecated skill found: '${GLOBAL_SKILLS_DIR}/${dep_skill}'. Preserve local changes and explicitly resolve or archive it outside the discovered skills directory."
    fi
  done

  LEGACY_SKILL_CONFLICT=false
  if [ -n "${CANONICAL_REPO_DIR}" ]; then
    if ! node "${CANONICAL_REPO_DIR}/scripts/check-legacy-skills.cjs" "${CANONICAL_REPO_DIR}" "${GLOBAL_SKILLS_DIR}"; then
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
      LEGACY_SKILL_CONFLICT=true
    fi
  fi

  # B. Verify skill frontmatter integrity
  for skill_md in "${GLOBAL_SKILLS_DIR}"/*/SKILL.md; do
    if [ -f "$skill_md" ]; then
      skill_dir="$(dirname "$skill_md")"
      skill_name="$(basename "$skill_dir")"

      # Check for YAML frontmatter delimiters
      if ! head -n 1 "$skill_md" | grep -q "^---"; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        echo "  ⚠️ Skill '${skill_name}' missing opening YAML frontmatter delimiter (---)."
      fi

      if ! grep -q "^name:" "$skill_md"; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        echo "  ⚠️ Skill '${skill_name}' missing 'name:' field in frontmatter."
      fi

      if ! grep -q "^description:" "$skill_md"; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        echo "  ⚠️ Skill '${skill_name}' missing 'description:' field in frontmatter."
      fi
    fi
  done

  # C. Ensure helper scripts in skills have executable permissions
  for skill_md in "${GLOBAL_SKILLS_DIR}"/*/SKILL.md; do
    [ -f "${skill_md}" ] || continue
    skill_dir="$(dirname "${skill_md}")"
    for script_file in "${skill_dir}"/*.sh "${skill_dir}"/scripts/*.sh; do
      if [ -f "$script_file" ] && [ ! -x "$script_file" ]; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        if [ "$MODE" = "fix" ]; then
          echo "  🔧 Adding execute permission to: ${script_file}..."
          chmod +x "$script_file"
          MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
        else
          echo "  ⚠️ Script not executable: ${script_file}"
        fi
      fi
    done
  done

  # D. Sync latest skills and config if canonical repository is available
  if [ -n "${CANONICAL_REPO_DIR}" ] && [ "${LEGACY_SKILL_CONFLICT}" = false ]; then
    # Check for missing portable core and optional adapter skills.
    for can_skill in "${CANONICAL_REPO_DIR}/skills/"* "${CANONICAL_REPO_DIR}/config/skills/"*; do
      if [ -f "${can_skill}/SKILL.md" ]; then
        s_name="$(basename "$can_skill")"
        if [ ! -f "${GLOBAL_SKILLS_DIR}/${s_name}/SKILL.md" ]; then
          ISSUES_FOUND=$((ISSUES_FOUND + 1))
          if [ "$MODE" = "fix" ]; then
            echo "  🔧 Installing missing canonical skill: '${s_name}'..."
            mkdir -p "${GLOBAL_SKILLS_DIR}/${s_name}"
            cp -r "${can_skill}/." "${GLOBAL_SKILLS_DIR}/${s_name}/"
            MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
          else
            echo "  ⚠️ Missing canonical skill in global config: '${s_name}'"
          fi
        fi
      fi
    done

    # Check hooks.json sync
    if [ -f "${CANONICAL_REPO_DIR}/config/hooks.json" ]; then
      if [ ! -f "${GLOBAL_CONFIG_DIR}/hooks.json" ] || ! cmp -s "${CANONICAL_REPO_DIR}/config/hooks.json" "${GLOBAL_CONFIG_DIR}/hooks.json"; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        if [ "$MODE" = "fix" ]; then
          echo "  🔧 Synchronizing global hooks.json with canonical repo..."
          cp "${CANONICAL_REPO_DIR}/config/hooks.json" "${GLOBAL_CONFIG_DIR}/hooks.json"
          MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
        else
          echo "  ⚠️ Global hooks.json is out of date with canonical repository."
        fi
      fi
    fi

    # Check AGENTS.md sync
    if [ -f "${CANONICAL_REPO_DIR}/config/AGENTS.md" ]; then
      if [ ! -f "${GLOBAL_CONFIG_DIR}/AGENTS.md" ] || ! cmp -s "${CANONICAL_REPO_DIR}/config/AGENTS.md" "${GLOBAL_CONFIG_DIR}/AGENTS.md"; then
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
        if [ "$MODE" = "fix" ]; then
          echo "  🔧 Synchronizing global AGENTS.md with canonical repo..."
          cp "${CANONICAL_REPO_DIR}/config/AGENTS.md" "${GLOBAL_CONFIG_DIR}/AGENTS.md"
          MIGRATIONS_APPLIED=$((MIGRATIONS_APPLIED + 1))
        else
          echo "  ⚠️ Global AGENTS.md is out of date with canonical repository."
        fi
      fi
    fi
  fi
else
  echo "  ℹ️ Global skills directory not yet installed at ${GLOBAL_SKILLS_DIR}."
fi

# ------------------------------------------------------------------------------
# Summary & Status Output
# ------------------------------------------------------------------------------
echo ""
echo "============================================================"
if [ "$ISSUES_FOUND" -eq 0 ]; then
  echo "🎉 HEALTH CHECK PASSED: Everything is up to date and healthy!"
  echo "============================================================"
  exit 0
else
  if [ "$MODE" = "fix" ]; then
    echo "✅ AUTO-REPAIR COMPLETED: Applied ${MIGRATIONS_APPLIED} fixes."
    echo "============================================================"
    exit 0
  else
    echo "⚠️ ISSUES DETECTED: Found ${ISSUES_FOUND} issue(s)."
    echo "   Run with '--fix' to automatically resolve all detected issues:"
    echo "   $0 --fix --workspace=\"${TARGET_WORKSPACE}\""
    echo "============================================================"
    exit 1
  fi
fi
