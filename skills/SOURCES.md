# Portable workflow sources

The four core skills were moved and revised from this repository's existing `config/skills/{brainstorm,plan,execute,orchestrate}/SKILL.md` files at revision `fc21d61df750cb409a30b9d9df6645949f70cb32`.

Source repository: https://github.com/rizariaputrawira/LeanFlow

Changes in this cutover: remove core Antigravity command/tool/role requirements; keep direct execution as default; discover optional host delegation; centralize plan format and local artifact privacy; preserve authorization, verification, and historical-record boundaries.

The canonical packages are now `leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, and `leanflow-orchestrate`. All shipped user-facing optional skills use the same `leanflow-` namespace. Internal tool names, upstream branding, application data paths, and named adapter roles are not skill identities and retain their original names.

Planning consolidation absorbs the former `flashplan`, `superplan`, and `hyperplan` entrypoints into `leanflow-plan`. The former flash/super aliases had no distinct implementation; the consolidated skill now defines evidence-based flash/super/hyper methods. Hyper retains the former five critique perspectives and bounded revision, without mandatory workers. Retired planning packages are removed, not retained as aliases.

This records the immediate source and changes, not an independently established upstream license lineage. No new license grant is asserted here. Existing optional adapter assets and their source notices remain separate; the portable core does not require the bundled visual companion or other adapter utilities.
