# Condition-based waiting

Load for asynchronous waits or flaky timing. Wait for the actual observable condition rather than guessing completion time. This reference defines a mechanism, not a new polling library or permission to execute or edit.

## Replace guessed delay with a predicate

1. Identify the consumer's actual need: a matching event, ready state, completed result, file visibility or domain-specific count. State the expected payload/value as well as readiness so an unrelated event cannot satisfy the wait.
2. Use the project's existing framework wait/assertion/event primitive and configured timeout/cancellation policy. Prefer an event, promise or completion signal where available. Re-evaluate fresh state in a polling predicate rather than capturing a stale result before waiting.
3. Make the predicate exact: `result is present` is not a truthiness check when zero, false or empty data are valid. Distinguish ready state from result correctness and observe both through the supported consumer interface.
4. Bound the wait with the existing appropriate timeout. Diagnostics identify expected condition and safe observed state. Use existing cleanup/unsubscription facilities so failure does not leak handlers or leave work running.
5. Exercise affected behavior only through the authorized executor and retain actual evidence. A longer timeout alone does not fix a wrong predicate, missing signal or deadlock.

Examples: completion event with the requested correlation ID; accessible UI ready state; result available for the correct tenant; expected protocol-item count. Use the framework's actual syntax, not an invented universal helper.

## When elapsed time is the contract

For debounce, throttling, expiry or timed partial output, time itself may be behavior. First observe the triggering condition, then use the project's existing controlled clock/timer facility or a justified measured timing approach. Derive the interval from the actual contract and explain it; do not turn a guessed sleep into a fixture expectation.

No universal polling interval, five-second budget, retry cap or busy loop is prescribed. Reuse framework defaults/project policy unless evidence and authorized scope require a change. If an event or configured timeout cannot be observed, name the missing fact rather than declaring the flake repaired from source alone.
