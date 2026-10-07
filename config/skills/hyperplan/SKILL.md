---
name: hyperplan
description: Use for explicitly requested deep, adversarial planning when extra critique is warranted; planning only.
---

# Hyperplan

Adversarial planning is explicit, not an automatically selected tier. The main agent remains the sole orchestrator and plan owner; use only the native planner and optional read-only reviewer, never nested roles.
1. Read supplied context and the canonical [`../plan/SKILL.md`](../plan/SKILL.md). Ask for missing material intent only when necessary.
2. Invoke the installed `planner` and wait for its grounded draft using native waiting/message handling. Then invoke the read-only `reviewer` and wait for its actual report attacking five perspectives: skeptic (unnecessary complexity), validator (edge cases and verification), researcher (evidence and unknowns), architect (boundaries and integration), challenger (simpler alternatives). These are lenses within one reviewer, not five agents. Do not return a waiting message as final or define substitute agents after an error.
3. When critique identifies a material improvement, invoke the planner for at most one revision with decisive findings. Main validates authorization and plan quality.
4. Persist the accepted plan as an ordinary workspace file under `.workflow/plans/` with a non-colliding sequence and date, using canonical plan structure. Preserve prior plans. Do not request native artifact feedback or create a second implementation-plan artifact, since native auto-approval can start execution.
5. Report plan path, surviving concerns, and limitations. Stop without implementation.

Use this for deeper scrutiny, not as a default required phase. It cannot grant extra tools, containment, or authority beyond native permissions.
