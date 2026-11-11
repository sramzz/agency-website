# CRM workflow planning card for a service business

An original educational resource prepared for Ranking Rebels on 23 October 2026. The example is fictional. No CRM was configured, data imported, messages sent or business results measured.

Use this card to agree how enquiries, opportunities, quotes and follow-up should be recorded. It is a business process proposal, not a native record model or import template for every CRM.

## 1. Define the records before choosing fields

| Concept | What the business needs to distinguish |
|---|---|
| Contact | The person and the information needed to manage the relationship |
| Organisation, when relevant | A business or other organisation associated with people and work |
| Interaction | A form, call, email, meeting or other recorded communication |
| Opportunity | One distinct potential piece of work or buying decision |
| Quote | A particular version of a proposed scope and price, linked to the relevant opportunity |
| Accepted job | Work recorded as accepted under the agreed sales process |
| New customer | A distinct first-time customer under a stated definition, checked against existing records |
| Task | A next action with an owner, due point and completion evidence |

These concepts may be implemented as different objects, fields or linked records depending on the product. Do not assume a label called “lead” or “customer” means the same thing across tools. A contact's relationship status and an opportunity's sales stage answer different questions.

## 2. A fictional sequence: one person, two projects

Consider a fictional landscaping business serving selected Perth suburbs. C01 identifies one confirmed person. The references below are anonymous educational identifiers, not real customer records or a tested system.

| Step | What happens | Record decision | What should not be inferred |
|---|---|---|---|
| 1 | I01: a person submits a request about project A | Confirm identity as C01; create opportunity O01 and link I01 | A form is not an accepted job |
| 2 | I02: the same person calls about the same project | After confirming the relationship, link the call to C01/O01 | This is not a second opportunity or a second person |
| 3 | The team issues quote Q01-v1, then revises it to Q01-v2 | Preserve the revision history; identify Q01-v2 as current and v1 as superseded | Two versions are not two won jobs; issued does not mean accepted |
| 4 | Q01-v2 is accepted under the business's process | Record the acceptance evidence, mark O01 won and link accepted job J01 | Acceptance is not proof of completed delivery, recognised revenue or payment |
| 5 | I03: C01 later asks about a separate project B | Create O02 linked to the existing C01; assessment remains pending | A new opportunity is not automatically another new customer |
| 6 | I04: a forwarded request uses a shared inbox, but the sender and project relationship are uncertain | Keep an owned intake item pending verification; do not automatically merge or attach it | An email match alone does not resolve identity or project scope |

Under this example's definition, C01 became one first-time customer at the acceptance of the first job. O02 remains an open, unassessed opportunity. If it later results in another accepted job for that customer, it would be repeat work rather than another first-time customer.

**At the end of the fictional sequence:** four labelled enquiry interactions, I01–I04; one confirmed contact; two confirmed opportunities; two versions of one quote; one accepted job; one distinct first-time customer; one unresolved intake item. I04 does not establish a second contact or a third opportunity. This is not a count of every message involved in issuing or accepting the quote. These counts illustrate record logic, not performance or a conversion rate.

## 3. Agree stages and transition evidence

One possible opportunity workflow is received → assessment → scope/quote → decision → won or lost. Adapt it to the work; not every business needs every stage or the same order. Keep unknown, on-hold and unresolved cases visible under explicit rules.

| Question | Record the business's rule |
|---|---|
| When is an interaction a separate opportunity rather than follow-up on an existing one? | |
| What establishes identity and the link to the correct project? | |
| What makes an enquiry suitable, unsuitable or still unassessed? | |
| What evidence allows entry to each stage? | |
| What constitutes an issued quote and which version is current? | |
| What establishes acceptance, and who may mark the opportunity won? | |
| How are lost reasons, on-hold cases and reopened work handled? | |
| What counts as a distinct new customer versus repeat work? | |
| What is handed to delivery, and who confirms receipt? | |

An unanswered follow-up is not automatically a lost sale unless the business has a defined, appropriate closure rule. A quote value or forecast is not automatically realised revenue.

## 4. Keep the operational record small and useful

For each active opportunity, begin with the linked contact, requested service, necessary service location/context, assessment status, sales stage, owner, last meaningful update, next action and its due point. Add the current quote reference and outcome evidence when relevant.

Record available source information with its limits; do not manufacture a complete attribution history. Keep marketing permissions and preferences separately from the sales stage, with the relevant source, date, scope and opt-out status. Only collect information with a defined purpose and appropriate access.

Roles can be shared in a small team, but responsibility should be clear:

- Intake owner: confirm receipt, identity and project relationship.
- Opportunity owner: assess fit, maintain the stage and arrange the next action.
- Delivery owner: acknowledge a handover after acceptance.
- Data owner: resolve uncertain duplicates, permissions, record rules and exceptions.

Those are responsibilities, not a requirement to employ four people. Agree cover when the usual owner is unavailable.

## 5. Test a small setup before wider use

Use synthetic records first. Check the example sequence and record what actually happens, rather than assuming a feature works because it appears in a product demonstration.

| Check | Expected business behaviour | Observation / owner |
|---|---|---|
| Same person follows up on the same project | Correct existing opportunity, with history retained | |
| Same person requests separate work | Separate opportunity, linked to the same verified contact | |
| Quote is revised | Current version clear; earlier version not counted as another sale | |
| Shared identifier creates uncertainty | Review queue; no unjustified merge | |
| Owner is unavailable | Agreed cover or escalation; task remains visible | |
| External sending or automation is enabled | Correct conditions, permissions, stop rules and exception handling checked | |
| Records are exported | Required fields, associations and history inspected; missing elements identified | |

An export of record properties is not automatically a complete backup or proof that another product can restore the whole account. Confirm what is included, what needs separate export and how a recovery or move would be checked. Preserve a source-to-destination reference mapping when trialling imports.

This table contains expected checks only. It has no observed results and does not demonstrate a CRM, integration or automation passing them.

## 6. Review the process after adoption

Look at unassigned active opportunities, missing next actions, overdue work, stale stages, unassessed enquiries, unresolved duplicates and handovers without acknowledgement. Define the eligible records, due point and observation cut-off before calculating any rate; show counts and unknowns.

For a win rate, compare won opportunities with the relevant qualified opportunity group under a stated follow-up period, showing unresolved cases. Count first-time customers separately. Do not infer that the CRM caused extra revenue from a before-and-after count alone.

Decide what to simplify or repair, who owns the change and when to review it. The benefit of the card is a clearer working agreement; its commercial effect still needs evidence.
