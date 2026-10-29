# Coverage checklist: outcome, integration, evidence

The reviewer inspects sources and reports only. Do not mutate a plan, implement its actions, run proposed checks, or treat an “approved” label as independently verified authorization. Apply the checklist proportionately to consequential work; no task count, worker count, or context threshold defines correctness.

## 1. Bind the input and authority

- Identify the exact plan content/version and whether it is proposed or supported by actual observed authorization. Read relevant requirements, fixed decisions, design/security constraints, and exclusions.
- Missing material requirements or decisions mean unknown coverage, not an inferred requirement or a pass. Resolve discoverable facts by reading actual sources. Cite precise anchors and redact secrets.
- Compare the current request with the plan's claimed authorization and scope. Copied assertions or digests cannot authorize work. Do not re-ask a verified decision merely to create a new gate.
- Apply the selected LeanFlow workflow's actual prerequisites. When orchestration is selected, inspect the required saved specification and its connection to the plan; an inline substitute cannot silently remove that prerequisite. Standalone planning does not require a saved specification. Do not impose a new documentation-first baseline, manifest, tracker, or architecture document set.
- Keep approved intent distinct from current implementation. A defect in code does not lower the requirement, and a proposed design is not an accepted decision.

## 2. Trace semantic acceptance

For every canonical criterion, create a row:

| Criterion / source anchor | Deliverable / actions | Integration / consumer | Planned observable proof | Status | Evidence / gap |
| --- | --- | --- | --- | --- | --- |

Use these status meanings:

- **Covered:** explicit feasible actions, integration, and planned proof account for the whole criterion; this is plan coverage, not demonstrated behavior.
- **Partial:** some required meaning, consumer, or proof is missing.
- **Uncovered:** the plan supplies no adequate delivery route.
- **Unknown:** a material source or fact is unavailable, so coverage cannot be determined.

Ask whether the actions deliver all of the criterion's meaning, not whether its ID appears. One criterion may span slices and several criteria may share a slice. Include guest/denied paths, errors, cleanup/order, and negative constraints where required. A successful path cannot prove a forbidden path is denied. Preserve acceptance omitted from the plan's local summary.

Identify silent “v1,” “static for now,” mock, scaffold, or future-work reductions of approved behavior. Do not invent a phase split that weakens final acceptance. An explicitly assigned later complete slice remains pending, not already delivered or silently optional.

## 3. Validate complete deliverables

- Each slice needs concrete allowed paths/artifacts, actions, expected behavior, proof, and an observable done condition. “Implement auth” or “write appropriate tests” leaves material decisions unspecified.
- Trace actual input/entry → enforcement/processing → output/consumer, and identify the tasks connecting each link. An isolated API, unused import, disconnected component, or hardcoded screen is not an end-to-end outcome.
- Setup/configuration must connect to the deliverable that consumes it; a forest of horizontal components is not an initial working tracer.
- Failure/recovery behavior and required documentation updates need actual owners. Current actionable feedback belongs in executable plan content or has an explicit source-grounded deferral/rejection; it must not survive only as a hidden review contract.
- Artifact existence, substantive shape, wiring/data flow, and exercised behavior are distinct proof layers. The plan must not substitute one for another where acceptance requires more.

## 4. Challenge prerequisites and contracts

- Every dependency needs an existing producer, real interface, or fixed decision. Find missing producers, cycles, and actions scheduled before their prerequisites.
- Check sufficiency across the actual delivery boundary. A feasible tracer does not justify skipping required app-level decisions; conversely, ordinary plan review does not require new documents the task never adopted.
- Compare producer and consumer names, signatures, types, errors, data transformations, ownership, and lifecycle assumptions. Flag incompatible expectations or destructive sanitization before a consumer that needs raw data.
- Find undeclared shared mutable resources and writer/reader ordering. Distinguish concrete causal coupling from vague same-subsystem association; severity follows actual impact, not a mechanical coupling count.
- Confirm write and integration ownership for shared files/resources. Read-only workers do not gain execution authority through task wording. Agents, waves, or a tracker database are not required to express dependencies and ownership.
- If optional companion inspection is used, its result must preserve the current review's read-only contract and return source-grounded findings, not writes or execution receipts.

## 5. Assess proof without executing it

- Each check should name the actual consumer seam, independent expected values, relevant inputs/environment, and observable success/failure results. Could it pass on the original defect, a dummy static return, or disconnected implementation? If so, it does not prove the criterion.
- A planned green build is not runtime transition, denial, concurrency, or recovery evidence. Check the proposed proof against the particular invariant, including relevant negative cases.
- Confirm from accessible project sources that the proposed command, tool, and path exist and that future execution has an appropriate authorized owner. Do not run them during review. Unsupported runtime/deployment facts remain unknown.
- Preserve known failures and missing validation prerequisites. A missing prerequisite is a concrete gap with an owner/resolution, not permission to report the check as passed or omit the criterion.
- Full canonical acceptance controls final proof. Do not narrow a test to make a reduced outcome appear sufficient. Planned tests are unrun until actual authorized execution provides observed results.

## 6. Inspect decisions and undo cost

- Deliver fixed decisions exactly. Do not turn discretionary preferences into user mandates or excluded/deferred ideas into tasks.
- Distinguish reversible local choices, costly coordinated changes, and one-way migrations or published-contract choices. State concrete undo cost rather than merely calling something difficult.
- Unresolved consequential choices need resolution under the existing approval boundary before dependent mutation. Materially changed scope, behavior, security boundaries, or fixed decisions cannot inherit approval merely from an unchanged filename.
- Reviewer preferences do not authorize an alternate design. State the needed decision or evidence; a suggested remedy is only one possible route.

## Result shape

Begin with inspected scope and the coverage table. Then list blockers, warnings, and information, each with:

1. **Invariant:** the property that must hold, not a preferred edit.
2. **Evidence:** exact requirement/plan/code anchors establishing the gap or uncertainty.
3. **Consequence:** the affected outcome, integration, safety, authorization, or proof.
4. **Needed decision/evidence:** the specific resolution; an optional remedy may illustrate it.

End with unavailable sources, exclusions, unresolved decisions, and whether the review is complete within its declared scope. Missing material context keeps review incomplete. Never approve or save the plan, run its checks, or substitute document shape for semantic coverage.
