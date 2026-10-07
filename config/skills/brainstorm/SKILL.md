---
name: brainstorm
description: Optional collaborative design exploration for unresolved intent, Fog/Frontier decision mapping, or an explicitly requested visual companion.
---

# Brainstorm

Use when requested or when material design choices are unresolved. Ordinary implementation requests do not require brainstorming. Help clarify intent, explore options, and record decisions without turning the discussion into a mandatory implementation pipeline.

## Choose the useful depth

- **Spike:** For a feasibility question, agree on a bounded probe, investigate as cheaply as correctness permits, and report findings. Any temporary artifact is not production work.
- **Bounded design:** Ground in the existing flow, clarify only material constraints, then present a short in-chat approach and trade-offs. Offer `/plan` if structured planning would help; direct implementation remains governed by the user's request.
- **Architectural design:** For new subsystems or interdependent choices, explore alternatives and record the approved design where useful. Decompose independent projects rather than guessing at requirements.

Do not force approval ceremonies for ordinary authorized tasks. When a design decision genuinely needs user choice, present it and wait for that choice before treating it as settled.

## Fog and Frontier

Use Wayfinder mapping for foggy or interdependent domains. **Fog** is unresolved problem space that cannot yet be phrased as a precise question. **Blocked** questions depend on unresolved decisions. **Frontier** questions have no unresolved dependencies. Ask one question at a time from the Frontier; never guess at Fog or ask a Blocked question prematurely. Record settled rationale in the design document when one is created. When explicitly requested, a Wayfinder map can be maintained in chat or saved as `.workflow/brainstorm/<SEQ>-YYYYMMDD-<slug>-wayfinder.md` without overwriting existing artifacts.

For a saved architectural design, preserve actionable work separately from unknown future work. Use a new sequence for `.workflow/brainstorm/<SEQ>-YYYYMMDD-<slug>-design.md`; do not commit unless requested. Review it for placeholders, contradictions, ambiguity, and scope.

## Handoff

Offer optional `/to-spec` to formalize the design, `/plan` for normal planning, or explicit `/hyperplan` for adversarial planning. Do not automatically start these steps or execution. Antigravity's built-in `/plan` may expand natively; load the supplied plan skill explicitly when planning is intended and do not claim an override.

## Visual companion

A browser-based companion is available for showing mockups, diagrams, and visual options. Offer it just in time when a concrete question is genuinely clearer visually, and ask before opening it. After acceptance, follow [`visual-companion.md`](visual-companion.md); otherwise continue text-only.
