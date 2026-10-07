---
name: workflow-health-check
description: >-
  Diagnoses legacy workflow migrations and out-of-sync skills when explicitly requested. Read-only
  `--check` audit is the default; `--fix` requires explicit user authorization. Triggers:
  '/workflow-health-check', 'workflow-health-check', 'wf-doctor', 'wf-repair'.
---

# Workflow Health Check & Auto-Repair (`/workflow-health-check`)

Optional diagnostics and repair for explicitly requested legacy workflow migration or skill repair. This is not part of normal plan/execute workflows.

---

## Usage

```bash
# Read-only audit (exit 0 if healthy, 1 if issues found)
./scripts/workflow-health-check.sh --check [--workspace="/path/to/project"]

# Auto-repair (migrates legacy dirs, patches references, repairs skills)
./scripts/workflow-health-check.sh --fix [--workspace="/path/to/project"]
```

---

## Agent Protocol

When invoked, identify the target workspace and run `--check` first. Report results. Run `--fix` only when the user explicitly requested repair; a check finding issues does not authorize mutation. Do not automatically rerun checks unless requested.
