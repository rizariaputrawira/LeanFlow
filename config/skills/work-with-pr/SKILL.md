---
name: work-with-pr
description: >-
  User-requested PR lifecycle guidance for branch/worktree, reviewable changes, CI, and merge.
  Uses canonical plan/execute workflows only when useful; no automatic sizing, worker fan-out, or
  atomic checkbox commits. Use when the user explicitly requests PR delivery.
  Triggers: 'create a PR', 'implement and PR', 'work on this and make a PR', 'implement issue',
  'land this as a PR', 'work-with-pr', 'PR workflow'.
---

# Work With PR — Full PR Lifecycle

When the user explicitly requests PR delivery, manage the requested branch/worktree, reviewable change, PR, and any authorized CI/merge lifecycle. Keep work within the user's requested scope; split work only when needed and agreed.

```
Setup → authorized implementation → PR creation → requested CI/review and merge
```

## Phase 0: Setup

### 1. Decide the PR split

Split into separate PRs only when the user requests it or independent changes need separate review. Do not spawn workers by default.

### 2. Resolve repository context

```bash
REPO_NAME=$(basename "$PWD")
BASE_BRANCH=$(git remote show origin | grep 'HEAD branch' | awk '{print $NF}')
```

### 3. Create branch

```bash
# Auto-generate from task summary:
BRANCH_NAME="feature/$(echo "$TASK_SUMMARY" | tr '[:upper:] ' '[:lower:]-' | head -c 50 | sed 's/-$//')"
git fetch origin "$BASE_BRANCH"
git branch "$BRANCH_NAME" "origin/$BASE_BRANCH"
```

### 4. Create worktree

Place worktrees as siblings to the repo to avoid nesting issues:

```bash
WORKTREE_PATH="../${REPO_NAME}-wt/${BRANCH_NAME//\//-}"
mkdir -p "$(dirname "$WORKTREE_PATH")"
git worktree add "$WORKTREE_PATH" "$BRANCH_NAME"
cd "$WORKTREE_PATH"
```

### 5. Install dependencies

```bash
[ -f "package.json" ] && (command -v bun &>/dev/null && bun install || npm install)
[ -f "requirements.txt" ] && pip install -r requirements.txt
[ -f "go.mod" ] && go mod tidy
```

## Phase 1: Implement

Implementation may use canonical [`/plan`](../plan/SKILL.md) when a plan is useful, and [`/execute`](../execute/SKILL.md) only for a user-authorized supplied plan. Do not impose tiers, automatic state tracking, evidence directories, atomic checkbox commits, or parallel workers. Use appropriate verification and report actual outcomes.

## Phase 2: PR Creation

```bash
git push -u origin "$BRANCH_NAME"
```

Create the PR with `gh pr create`. The PR description MUST include:
- **What**: One sentence summary
- **Why**: Motivation / problem solved
- **How**: Key implementation decisions
- **Testing**: What was verified and how
- **Checklist**: [ ] tests pass, [ ] types clean, [ ] no dead code introduced

## Phase 3: Verification Loop

```bash
# Poll CI until all checks pass:
while true; do
  STATUS=$(gh pr checks "$BRANCH_NAME" --json name,state --jq '[.[] | select(.state != "SUCCESS")] | length')
  [ "$STATUS" = "0" ] && break
  echo "Waiting for CI... ($STATUS checks pending/failing)"
  sleep 30
done
```

If any check fails:
1. Fetch the failure logs: `gh run view --log-failed`
2. Fix the root cause inside the worktree
3. Commit the fix
4. Push and return to Phase 3

Do not merge a PR with failing checks.

## Phase 4: Merge and Cleanup

```bash
gh pr merge "$BRANCH_NAME" --squash --auto
# Wait for actual merge:
while [ "$(gh pr view "$BRANCH_NAME" --json state -q .state)" != "MERGED" ]; do sleep 5; done
# Cleanup:
cd ../..
git worktree remove "$WORKTREE_PATH"
git branch -d "$BRANCH_NAME"
```
