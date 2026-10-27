---
name: leanflow-brainstorm
description: Use when goals, feasibility, or consequential design choices remain unresolved.
---

# LeanFlow Brainstorm

Collaborate through the current host's permitted conversation, read, and search interfaces. No harness, model, browser companion, named worker, or slash command is required. Recognize the user's intent without requiring a skill name. Clear implementation requests do not require a separate brainstorming ceremony. If the user requires delegation-only work, use permitted delegation or report the capability blocker; do not substitute direct work.

1. Establish outcome, audience, constraints, available evidence, and observable success. Inspect project context before asking for discoverable facts. Distinguish facts, assumptions, and unknowns.
2. Choose the useful depth:
   - **Spike:** define a bounded feasibility question and permitted probe, then report observations and limits. Temporary artifacts are not production work.
   - **Bounded design:** trace the existing flow, compare concrete options, and propose a compact in-chat approach.
   - **Architectural design:** map load-bearing choices, dependencies, ownership, and trade-offs before committing to a direction.
3. Resolve material decisions in dependency order. Use the host's question interface if available, otherwise chat. Batch independent questions; do not guess blocked choices. Recommend an option with concrete trade-offs and risks. Unresolved choices pause only dependent work.
4. Lead the synthesis with settled decisions, then their rationale, exclusions, and unknowns in chat by default. For English or Indonesian design prose, read the shared [writing guidance](../leanflow-to-spec/references/writing.md) and apply the relevant language checks. If a saved design is requested, first follow the privacy procedure in [`../leanflow-plan/SKILL.md`](../leanflow-plan/SKILL.md), step 5, then save a non-colliding `.workflow/brainstorm/<SEQ>-YYYYMMDD-<slug>-design.md`. Preserve historical artifacts; do not commit them.
5. Finish with the proposed approach, acceptance criteria, unresolved choices, and authorized next stage. Brainstorming alone does not authorize planning artifacts, implementation, or external effects. If the user already authorized exploration, planning, and implementation together, carry settled context into [`../leanflow-plan/SKILL.md`](../leanflow-plan/SKILL.md), then [`../leanflow-execute/SKILL.md`](../leanflow-execute/SKILL.md), without redundant approval. Pass exact settled content, including any in-chat plan, rather than inventing an artifact path. Run directly unless orchestration or delegation was explicitly requested.

Use diagrams or host visual tools only when useful to a concrete decision and authorized. Do not require a companion server, browser launch, tool registration, or host configuration change merely to brainstorm.

Adapted from Superpowers brainstorming by Jesse Vincent; retained [MIT notice](LICENSE.superpowers). Source references and LeanFlow-specific changes are recorded in the repository's `skills/SOURCES.md`.
