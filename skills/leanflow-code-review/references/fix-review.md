# Review a correction without losing prior findings

Load when previous findings and a correction are supplied. Remain read-only and source-only: scoped re-review is neither an automatic whole-branch review nor a test runner.

## Establish the fix basis

Read original requirements/brief, every prior finding, prior reviewed snapshot, current fix comparison and accessible correction/evidence report. Preserve finding identities and exact root causes. State missing basis instead of reconstructing claims from memory. Include WIP/untracked corrections when requested.

For each prior finding, inspect whether its specific defect remains at the real consumer path. Read surrounding controls/callers when decisive; changed lines alone may not establish a fix. Author statements such as “addressed” or “tests green” do not disposition findings.

## Exact dispositions

- **addressed:** inspected current sources correct the particular defect within the original requirement. Cite correction and decisive consumer/control source. Separately state required runtime/remediation evidence and actual result; source correction does not imply every acceptance check passed.
- **not-addressed:** defect remains, workaround misses the root cause, or replacement still violates the requirement. Cite surviving path and consequence.
- **needs-evidence:** decisive source/runtime fact is unavailable or evidence misses the finding. Name the missing fact and focused safe check for the authorized owner; uncertainty is not addressed.

Account for **every** prior finding in original order or by stable identifier. “Attempted” is not a disposition. Rejected feedback needs inspected technical grounds rather than disappearing from the list.

## New defects and exclusions

Inspect the fix and affected integration boundaries for new breakage: changed return/error contract, lost denial, altered state/lifecycle or weakened test oracle. Report severity and exact source-grounded consequence. A defect wholly outside that boundary is a separately labeled out-of-scope observation; it neither expands the correction task nor excuses an in-scope failure.

Finish with per-finding dispositions, new breakage, out-of-scope observations, coverage gaps and a scoped verdict naming anything open. No checkout changes, automatic commit, provider/model tier, fixed retry loop or worker execution is introduced. Missing behavior proof goes to the authorized integration verifier; it is not an all-clear.
