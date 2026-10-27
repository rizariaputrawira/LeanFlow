---
name: leanflow-commit-message
description: Use when asked to suggest, draft, or improve a Git commit message from repository changes; advice only, never commits.
---

# LeanFlow Commit Message

Inspect actual changes and propose concise, natural developer-written commit-message text. This procedure is strictly read-only; it does not authorize a commit or any other repository mutation.

## Inspect the right evidence

1. Read `git --no-optional-locks status` to establish staged, unstaged, and untracked state without writing Git's optional index refresh. Inspect the staged diff, for example `git diff --staged`, to determine whether anything is staged. Use read-only Git inspection only.
2. If anything is staged, use the staged diff as the complete subject of the message. Exclude unstaged and untracked changes. Resolve unclear staged intent from relevant evidence; ask only if a material ambiguity remains.
3. Only when nothing is staged, inspect relevant unstaged diffs and the actual contents of relevant untracked files. Do not infer content from filenames or inspect unrelated work.
4. Follow the user's explicit format first. Otherwise inspect recent commit subjects and, when useful, bodies for repository style: capitalization, tense, prefixes, punctuation, scope notation, length, and body usage. Use Conventional Commits only when requested or consistent with observed history.
5. Describe evidenced behavior and intent, not merely filenames. Distinguish configuring an existing feature from adding one. Do not inflate performance, security, test, cost, or outcome claims beyond the evidence.

## Write the suggestion

Normally return one concise subject line and nothing else. Prefer plain, specific verbs over marketing or release-note language. Add a short body only for useful non-obvious rationale, compatibility, migration, or tradeoffs. Do not invent issue IDs, footers, co-author lines, or other metadata; include them only when requested or established by relevant history.

For genuinely separate, independently committable concerns, follow the user's requested format or use:

```text
These changes appear to contain separate concerns.

Suggested commits:

1. First human-style commit message
2. Second human-style commit message
```

Replace the examples with evidence-backed messages. Add path groups only if needed to clarify the split. Incidental file grouping is not evidence of separate concerns. If there are no changes to describe, say so instead of fabricating a message.

## Read-only boundary

Never alter source, the index, refs, configuration, history, branches, remotes, or the worktree. Do not run `git add`, `commit`, `amend`, `reset`, `restore`, `checkout`, `switch`, `rebase`, `merge`, `cherry-pick`, `tag`, `push`, or `clean`, or equivalent mutations through another tool. Read-only status, diff, log, and show inspection is allowed. These instructions are not a technical sandbox.

“How should I commit this?” and “suggest a commit message” request advice, not execution. Return the message in the permitted response channel. If a separate assignment explicitly requests a commit, finish this read-only drafting procedure first; the separate assignment and native policy govern any later mutation.
