# Delegated execution

When assigned execution work, load the actual [execution core](../SKILL.md) and this reference; apply them to the assignment without invoking the top-level workflow or orchestrating recursively.

1. Read the assignment's exact plan/content and source base. Match the assigned step IDs, owned paths, exclusions, permissions, dependencies, and acceptance criteria to current source. Missing or conflicting ownership blocks the affected work.
2. Implement only assigned pending steps within those boundaries, preserving others' work. Do not write the shared plan, delegate, expand scope, or run checks reserved for the coordinator. When choosing or revising an implementation approach, read the core's [simplicity reference](simplicity.md).
3. Run only assigned, permitted checks. Return assigned step IDs, changed paths and results, exact checks and observed outcomes, unrun checks with reasons, blockers or `REPLAN_REQUIRED`, and any partial effects. Do not mark a step verified from an unrun check; the coordinator owns integration and acceptance.
