# Consequential decision records

Read only when a consequential architecture/domain choice needs a durable record and recording is authorized. Reuse the existing ADR location, numbering, content structure, and status vocabulary. Inspect existing records and avoid overwrites. If none exists, propose a suitable convention without silently adopting a documentation system or creating a directory. The parent skill's read-only, planning-only, and privacy boundaries still apply.

## Minimal useful record

A title and concise context/decision/reason can suffice when they preserve the real basis. Include considered options, consequences, constraints, and source links when they explain a non-obvious trade-off. Distinguish:

- the problem or constraint that forced the choice;
- the decision and its scope, or the proposal still awaiting a decision;
- why the selected option fits and meaningful rejected alternatives;
- the actual decision/authorization basis or locator when available;
- non-obvious consequences and relevant requirements or related decisions.

Do not fabricate dates, approval events, or identities. Unknown facts remain unknown. A number gives stable identity, not acceptance. Do not copy private specification or plan details into a tracked ADR without authorization; use an appropriately bounded proposal instead.

## Status and replacement

Preserve the project's existing labels and transitions; do not rename them or introduce a second lifecycle. Where no convention exists, these are fallback meanings:

| Status | Meaning and required basis |
| --- | --- |
| `proposed` | A choice under consideration; no approval is implied. |
| `accepted` | An actually settled choice with its real decision/authorization basis recorded or linked. |
| `deprecated` | No longer recommended; explain the observed decision to retire it and current applicability. |
| `superseded` | A real successor record exists; link it and explain the replacement boundary. |

Follow existing successor and reverse-link conventions. Under the fallback, put the real successor link alongside `superseded`. Do not invent a future ADR. A proposed successor is not an accepted replacement; preserve the current decision's actual applicability until the replacement is decided.

## When a record earns its place

Preserve hard-to-reverse ownership/integration choices, surprising deviations with genuine reasons, contested alternatives, lock-in, or non-visible constraints a future maintainer would otherwise miss. Small reversible local choices need no ADR merely because modeling ran. Insufficient evidence produces a proposed decision and missing basis, not manufactured acceptance or an unauthorized file.
