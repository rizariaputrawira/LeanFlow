# Deepening a module cluster

Read when a concrete candidate cluster and dependencies are under consideration. Use the vocabulary and authority limits in the parent skill.

## Classify actual dependencies

| Category | Design and proposed test strategy |
| --- | --- |
| **In-process** | Pure computation or in-memory state. Consolidate coherent behavior and test through the resulting interface; no adapter is needed. |
| **Local-substitutable** | An established local substitute exists, such as an in-memory filesystem or test database. Use it for integration behavior and keep the substitute internal; do not expose a production port merely for tests. |
| **Remote but owned** | An independently owned system/service is reached over a network. A seam with production transport and controlled test adapters can consolidate caller logic when real variation and the owning contract justify it. |
| **True external** | Third-party behavior is outside the codebase's control. Isolate only the necessary dependency behind an existing or justified interface and propose a faithful controlled test adapter; do not abstract behavior the module does not need. |

These categories guide evidence and proposed verification, not mandatory architecture patterns. Preserve real ownership, latency, failure, security, and consistency behavior. An in-memory substitute cannot prove a distributed contract's transport, permission, or failure semantics; identify the remaining real integration evidence required.

## Seam discipline

A seam needs actual variation, not merely a wish to mock. One adapter alone is extra indirection unless another real variation is demonstrated. Internal test seams need not become public. Prefer tests through the deep module's interface that assert observable behavior, and consider whether they traverse the real caller chain implicated by the problem.

Identify tests the redesign would make obsolete, but recommend replacement only when their relevant behavior would be covered through the new interface. A proposed redesign is not evidence that coverage exists and does not authorize deleting useful tests. Consider locality of errors as well as code changes.

Finish with dependency categories and assumptions, interface/seam placement, any justified production/test adapters, retained behavior, and verification the design would enable or still require. These are recommendations, not authorization to edit code, create a prototype, replace tests, or run them.
