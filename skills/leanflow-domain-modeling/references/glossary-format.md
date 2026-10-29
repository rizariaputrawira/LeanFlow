# Recording settled domain language

Read when an authorized task records settled terms. Reuse the project's existing glossary structure and location. This fallback format does not authorize a new document or a parallel documentation system; the parent skill's write and privacy boundaries still apply.

## A lean definition

Use a context title and one or two sentences describing its business/domain boundary. Under `Language`, define each settled term by what it **is**, usually in one or two sentences. Mention discouraged synonyms only where actual competing project language needs disambiguation. Group natural clusters; a flat list is sufficient otherwise.

```markdown
# Ordering

Ordering records customer commitments and their fulfilment state.

## Language

**Order**: A customer's commitment to purchase a specified set of items.
_Avoid_: Transaction, purchase request

**Invoice**: A request for payment for an amount owed by a customer.
_Avoid_: Payment, receipt
```

Before adding a term, check whether it names a project-specific concept and whether an existing definition already owns it. General programming vocabulary, implementation choices, requirements, open questions, and scratch notes belong elsewhere. Distinct concepts do not become synonyms because their implementation uses the same primitive type.

## Contexts and relationships

If the project already separates contexts, update the correct context owner. A domain map should explain each context, link its glossary, and state meaningful relationships: which context owns a concept, references another context's identity, or produces information another consumes. Do not duplicate every definition or impose an event architecture.

Infer context from the actual topic and existing map. If ownership is materially ambiguous, return competing owners and the needed decision before writing. A single-context project does not need a multi-context map. With no sufficient owner, propose a destination consistent with existing conventions and create it only for an authorized settled term; do not invent a default root glossary or workflow path.

## Ready to record

The definition must distinguish the concrete counterexamples discussed, use the selected canonical term consistently, preserve approved intent when code is deficient, and have one maintained owner. Report remaining implementation mismatches separately rather than embedding code details or unsettled alternatives into the glossary. In read-only or planning-only work, return the proposed text instead of writing it.
