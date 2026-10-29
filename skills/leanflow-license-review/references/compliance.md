# Use and release compliance checks

Load when reviewing avoidance of license violations, a release/hosted deployment or suspected noncompliance. Apply the entrypoint's evidence chain first; this checklist grants no mutation, execution, publication or legal-clearance authority.

## Map obligations to actual activity

Record inspected release/version and recipients. Distinguish private use/modification, source/binary delivery, browser code, containers, device firmware and remote interaction. Network use is not automatically distribution, but browser-delivered code is a copy and AGPL/custom terms may impose separate service obligations. A build-only dependency is not automatically shipped; determine whether its code, runtime or generated content enters the artifact. Dev/runtime manifest labels do not establish exemptions.

For each included component record `component/path + exact version | applicable grant/clause | triggering activity | required delivery/action | observed artifact evidence | gap/condition`. Cover direct/transitive dependencies, vendored snippets, assets and nested payloads within scope. Explicitly mark uninspected material. A scanner or SBOM is inventory evidence, not a grant or proof all obligations are met; do not install/run one without authority.

## Check applicable conditions

| Evidence/terms | Questions for the actual grant and artifact |
|---|---|
| MIT, BSD, ISC or other permissive grant | Do required copyright, conditions and disclaimers reach recipients in the required form? A README credit or URL alone may be insufficient. Inspect each text separately. |
| Apache-2.0 | Are license copies delivered, required modification notices present in changed files, applicable source notices retained, and any relevant upstream NOTICE attribution supplied in a section 4(d) permitted location? NOTICE is not an extra license; do not invent a NOTICE requirement where none applies. |
| GPL-covered distribution | What covered work, version and exception apply? Are notices, corresponding source including required build/install material, chosen source-delivery/offer mechanism and applicable installation-information requirements met? A homepage or source for a different binary version is insufficient. |
| LGPL integration | Are library modification/source obligations, required notices/texts, reverse-engineering rights and applicable relink/replacement mechanisms satisfied? Inspect version and combined-work facts; dynamic linking alone does not answer them. |
| MPL-covered files | Are covered files/modifications available under applicable MPL terms, notices preserved, and executable recipients told how to obtain source? Distinguish covered from unrelated files and inspect secondary-license exclusions before combinations. |
| Modified AGPL network service | Does section 13 apply to the actual modified program? Is a prominent no-charge corresponding-source opportunity available to remote users? Separately inspect conveying obligations; unrelated infrastructure on the same server is not automatically covered. |
| Dual/multiple licenses and exceptions | Is `OR` an authorized choice, `AND` cumulative and `WITH` applicable? Record the available chosen grant; do not manufacture alternatives from separate component licenses. |
| Assets, documentation, fonts, datasets and models | What separate attribution, change indication, share-alike, reserved-font-name, redistribution or use restrictions apply? Do not assume the software root license covers them. |
| Missing, custom, commercial or source-available grant | What permission or evidence is missing/restricted? Public availability, attribution, purchase or an SPDX label alone does not establish proposed-use rights. Surface exact restriction and owner/legal question. |

Primary lookup anchors: [MIT](https://choosealicense.com/licenses/mit/), [Apache sections 3–6](https://spdx.org/licenses/Apache-2.0.html), [LGPLv3 and incorporated GPLv3](https://spdx.org/licenses/LGPL-3.0-only.html), [MPL official FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/), [AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html), [SPDX expressions](https://spdx.github.io/spdx-spec/v2.3.1/SPDX-license-expressions/) and [non-software scopes](https://choosealicense.com/non-software/). Read applicable primary terms rather than treating this table or a FAQ as the grant. Online lookup remains conditional on the entrypoint's research authority.

## Report and remediation

- Distinguish observed omissions from uncertain obligations and unknown grants. Name the artifact and clause supporting each finding, what remains uninspected and evidence that would resolve it.
- Give a concrete release-condition checklist: notices, source access/offers, packaging corrections and unresolved permissions, with component/version locators. Remain read-only; recommend withholding affected distribution if necessary permissions or compliance cannot be established instead of silently declaring clearance.
- For suspected past noncompliance, preserve supplied artifacts/evidence and identify affected versions, activities and dates. Flag license-specific termination, cure/reinstatement and recipient remediation for qualified review; adding a notice now does not prove historical cure.
- If selection, licensing new work or actual fixes are requested, distinguish the evidence report from the separately authorized change task and establish rights, terms, scope and approval before any mutation. No instruction here authorizes removing notices, rewriting upstream terms, deleting releases, contacting claimants or publishing admissions/settlements.
