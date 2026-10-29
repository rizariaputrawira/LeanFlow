# Trace the causal origin

Load when a symptom occurs deep in a stack, invalid data appears far from its origin, or several callers may trigger the same defect. Use supplied failure evidence without confirmation-only reruns. The entrypoint's authorization boundary applies to every probe and correction here.

## Backward trace

1. Locate the operation where the reported failure manifests. Identify the immediate bad value/state and the invariant it violates.
2. Find its real caller and inspect the supplied argument/state. Continue toward the entry point, identifying where each value was produced, transformed, defaulted or consumed.
3. At each hop record inspected file/line, incoming value or source-derived condition, transformation and next caller. Use available read-only navigation; runtime values require an authorized debugger or observation rather than invention from source.
4. Find the earliest causal operation creating/accepting the invalid condition or bypassing the necessary contract. Check other callers using that owner. Missing initialization before a lifecycle hook is not repaired by ignoring a later storage exception.
5. Compare a working route and formulate a discriminating prediction before changing code. Missing dynamic-dispatch or deployment evidence keeps the chain partial; name the exact unobserved link.

A useful trace is causal, not merely a stack listing: explain how the specific symptom follows from the original trigger. For a tenant leak, distinguish a policy returning wrong rows from a consumer skipping the policy entirely; the latter is not repaired by retesting the already-correct function.

## Instrument only the decisive boundary

Where authorized runtime inspection is necessary, prefer a breakpoint with relevant locals and call stack. Otherwise, if writes are permitted, use temporary tagged diagnostics immediately before the failing operation to capture relevant arguments, lifecycle stage and caller. Collect no credentials or broad environment dumps; redact and retain minimum signal. Remove diagnostics you introduced after the investigation/fix.

Unknown test pollution can be isolated with existing authorized test selection/fixture mechanisms and one-variable comparisons. No bisection script, checkout operation or shell pipeline is implied.

## Root fix, not blanket defense layers

Correct the owner establishing the violated invariant only within implementation authority. Add a further boundary control only if that boundary independently requires it and approved design includes it; do not automatically guard every layer. Obtain original consumer-route and meaningful regression-seam evidence through the authorized verifier. A source-derived chain supports a hypothesis; it is not an observed runtime stack or a guarantee that the bug is impossible.
