---
name: leanflow-research
description: "[Matt Pocock] Research a decision or technical question using cited primary sources."
---

# LeanFlow Research

Use this companion for evidence gathering, not implementation or approval. It adds no mandatory stage to other LeanFlow skills. Use permitted source-reading and search tools; no particular host, model, service, or worker is required. Research-only and read-only assignments remain so when another skill or helper is used.

1. **Bind the question.** State the question, intended decision/use, scope, relevant dates or versions, supplied constraints, and authorized result destination. Resolve discoverable context before asking. If the question contains several independent claims, separate them so evidence for one cannot stand in for the others.
2. **Find the owning evidence.** Investigate official documentation, standards/specifications, first-party APIs, release notes, or actual source code. Use secondary material to locate or contextualize primary evidence, not as the sole support for material conclusions. Inspect the actual source behind a search result; a snippet or an unverified helper summary is not a checked source. Respect the current task's access and privacy boundaries.
3. **Trace and reconcile claims.** Connect each material claim to the source passage, code location, or version that supports it. Distinguish direct observation from interpretation and recommendations. Check whether the source applies to the requested release/platform and whether newer or conflicting primary evidence changes the conclusion. When evidence conflicts, state the conflict, each source's applicability, and what resolves it; do not manufacture consensus. If a source is unavailable, disclose that limitation and finish the supported parts.
4. **Answer the decision.** Present the question/scope, concise findings with adjacent inline links or repository path/line citations, implications for the intended decision, caveats, and remaining unknowns. Label unsupported assumptions rather than turning them into facts. Include enough version/date context that a reader can judge applicability. A conclusion must not be more certain than its evidence.
5. **Deliver within authority.** Return the report in chat unless a destination and saving are authorized. Do not create research folders, change code, run experiments, or make decisions on the user's behalf merely because research would benefit from them. For LeanFlow specification or plan artifacts, their existing owners—[specification](../leanflow-to-spec/SKILL.md) and [planning](../leanflow-plan/SKILL.md)—retain format, privacy, saving, and approval responsibility. Optional permitted delegation can gather an independent source set; inspect its links and conclusions before incorporating them, and preserve the same read-only boundary.

Done means the requested question is answered to the extent supported by inspected evidence, every material conclusion has a nearby citation, and unresolved facts or inaccessible sources are explicit. A recommendation is not approval or execution evidence.

Adapted from KitShift's `workflow-research` and its Matt Pocock source. Retained notices: [Matt Pocock](LICENSE.matt) and [KitShift](LICENSE.kitshift). Exact lineage is recorded in the distribution's `skills/SOURCES.md`.
