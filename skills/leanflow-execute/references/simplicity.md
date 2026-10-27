# Choose the simplest complete implementation

Read when choosing or revising an implementation approach during planning or execution. Trace the affected behavior and consumers first, then stop at the first option that meets every acceptance criterion:

1. Remove speculative work, not requested behavior.
2. Reuse an existing implementation or project convention.
3. Use the standard library or a native platform capability when adequate.
4. Reuse an appropriate installed dependency before adding one.
5. Otherwise write the smallest maintainable correct implementation.

Prefer direct code to abstractions, duplicate helpers, or configuration for hypothetical variability. Fix the cause across affected callers; remove paths made obsolete by the replacement. Preserve unrelated work and required compatibility, validation, security, data integrity, and accessibility. A smaller diff does not justify reduced scope or omitted checks.

Use meaningful existing coverage and verify the actual changed consumer path under the assignment's permissions. Add regression coverage when it catches a plausible consumer-visible failure; do not test incidental implementation details or delete useful checks as bloat. Report only observed results and name unrun checks.

Adapted from KitShift's Ponytail-derived guidance; retained notices: [Ponytail](../LICENSE.ponytail) and [KitShift](../../leanflow-plan/LICENSE.kitshift). Source revisions and modifications are recorded in the repository's `skills/SOURCES.md`.
