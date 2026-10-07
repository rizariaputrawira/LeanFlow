---
name: to-spec
description: Optionally synthesize supplied conversation or design material into a reference specification before planning.
---

# To-spec

This is optional documentation, not a prerequisite to planning. Read a supplied source document first; otherwise use available conversation context. If material design information is absent, state what is missing rather than inventing it. Preserve source meaning and distinguish decisions, requirements, constraints, open questions, and out-of-scope items.

## Specification template

Use only sections relevant to the source; retain the settled-decision table for decisions actually made.

```markdown
# <Title>

**Status:** Draft
**Source:** <conversation or source path>
**Date:** <YYYY-MM-DD>

## Problem Statement
## Proposed Solution
## User Stories
## Implementation Decisions
## Settled Decisions & Answers
| ID | Decision | Rationale |
|---|---|---|
## Testing Seams
## Out of Scope
```

Save to `.workflow/specs/<SEQ>-YYYYMMDD-<slug>-spec.md`, selecting a new non-colliding sequence without overwriting existing files. Review for ambiguity, contradiction, unsupported assumptions, and scope drift. Do not commit unless requested. Stop after saving and report the path. Offer `/plan` as the normal next step or explicit `/hyperplan` for adversarial depth; do not plan or implement automatically.
