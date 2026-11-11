# AI enquiry workflow — development kit and pilot brief

Prepared for Ranking Rebels on 20 October 2026, Australia/Sydney. Original educational materials, in Australian English. **No model, connector or business workflow has been executed using this kit. There are no measured outcomes.**

Use the kit to make a proposed workflow inspectable. It is not a ready-to-run integration, a complete security test plan or a representative evaluation dataset. Replace the demonstration rules with rules approved for your own process before testing anything operational.

## 1. A completed illustrative brief

| Field | Demonstration specification |
|---|---|
| Problem to investigate | Staff manually interpret free-text service enquiries and prepare handovers. No workload or savings have been measured. |
| Outcome | One correct enquiry record, correct assignment and required follow-up task, verified within a time the process owner defines before a pilot. |
| Baseline | Observe current handling and compare a simpler structured-form/rules alternative where feasible. No baseline values are supplied. |
| AI task | Propose service, postcode as written, supporting excerpt, internal summary and a reason for review; do not invent absent information. |
| Demonstration rules | Recognised services: `SEO` and `Ads`. Demonstration location codes: `3000` and `3002`. These are fictitious routing rules, not Ranking Rebels service-area or sales policy. |
| Routing | A single supported service plus one supported location produces a proposal for review. Missing, conflicting, unsupported or uncertain values go to a named review queue. Never reject automatically. |
| Demonstration assignment | SEO with a supported location proposes `SEO_OWNER`; Ads with a supported location proposes `ADS_OWNER`. These are fictitious role identifiers. The reviewer confirms the specific current owner in the approved payload. Exceptions go to `REVIEW_OWNER`; suspicious instructions go to `SECURITY_REVIEWER`. A real business must resolve these roles to authorised people/queues before use. |
| Demonstration identity | A new source enquiry ID creates one enquiry record and one associated follow-up task. A repeated ID checks the existing record and task. No ambiguous customer matching, merging or updates to unrelated contacts are included. Test fixtures must make that mapping inspectable. |
| Human role | Inspect original input and proposal; resolve uncertainty; approve the particular action payload. The business must name the owner and deputy before real use. |
| Action boundary | Initial exploration has no production writes. In an assisted pilot, a limited component applies only a current approved action and verifies record, assignment and task. |
| Excluded actions | No external messages, prices, guarantees, rejection, bookings, deletion or unrelated customer lookup. |
| Failure route | Visible exception with owner and next action. A write timeout has an unknown outcome until reconciled; never assume the write failed. |
| Stop and recovery | Stop new actions; identify in-flight cases, reconcile actual effects and use manual handling. A stop does not undo earlier actions. |
| Advancement | Decide quality by consequence, net handling time, queue capacity, cost and failure recovery before results are seen. No numeric release threshold is supplied. |

For the output contract, a service hint may be `SEO`, `Ads`, `Other` or `Unclear`; this hint is not an approval or routing instruction. Preserve the postcode text or indicate missing/conflicting information. Rules and a person resolve whether the request meets the policy. The implementation team must agree the exact field types and validation before using a tool.

The demonstration deliberately avoids a self-selected confidence threshold. For example, a model claiming `0.99` confidence must still be checked against the message and policy. A syntactically valid field is not proof of correctness.

## 2. Flow to discuss with the implementation team

Receive original message with stable ID → check recorded state → propose fields and summary → validate structure and source support → review and resolve exceptions → approve current action → apply through limited integration → verify actual record, assignment and task.

Record the original input, policy/configuration version and approved payload or equivalent evidence, under an appropriate access and retention policy. This is a design brief, not a claim that those components already exist.

In an isolated test, use simulated business effects. In shadow observation, disable business writes and messages, including secondary integrations; real data sent to a model still needs an appropriate treatment basis. In assisted use, the reviewer must have capacity and context to make the decision.

## 3. Synthetic development scenarios

`08-synthetic-development-cases.csv` contains **12 visible scenarios**. Each has an input, fixture or injected condition, and expected behaviour. The expected cells are specifications, not observations or results.

Important details:

- Run each scenario in an isolated, resettable test fixture. Scenario S08 starts with E001 already processed; its duplicate relationship to S01 is intentional and must not depend on test execution order.
- There are twelve scenarios and eleven distinct demonstration enquiry IDs. Do not treat those numbers as a real pilot cohort or sum them to calculate business completion.
- Failures injected at the model or integration layer are part of the scenario, not statements that the enquiry text itself causes that failure.
- All examples are synthetic. No customer names, email addresses, accounts or real records are included.
- This is a visible development set. It cannot serve as an independent held-out evaluation after it has guided configuration or prompts. Reserve separate appropriate cases for that purpose.
- No number of passes on these scenarios establishes a real-world failure rate, privacy compliance, protection against every attack or readiness for wider deployment.

### Worked trace — expected, not executed

S01 asks for SEO and explicitly states 3000. Under the demonstration rules, the expected proposal is SEO/3000, assigned to the fictitious `SEO_OWNER`, with evidence from that message and an internal summary. A person confirms the particular owner and approves that payload. In an approved assisted test fixture, the permitted executor produces one enquiry record mapped to E001 and one follow-up task, checks the owner and verifies their existence. In an offline or shadow run, none of those business writes occurs.

For S08, the fixture already contains the completed work for E001. The expected outcome is to recognise prior processing and verify the existing state without creating a second record or task. Replaying a message is not permission to repeat its effects.

If S11 times out during a simulated CRM write, the expected state is `outcome_unknown`. The executor must reconcile the receiver's state before deciding whether another attempt is appropriate. A retry limit or ID does not by itself provide exactly-once delivery.

## 4. Record observed development results separately

`09-development-results-template.csv` has one row for each scenario with `status=not_run`. All observations are blank. Populate only after an actual authorised test, retaining configuration/run identification and evidence. Do not replace expected behaviour with a plausible model answer or mark a case passed by reading its specification.

Suggested statuses: `not_run`, `passed`, `failed`, `inconclusive`. A pass needs evidence against the expected behaviour; an inconclusive case needs a reason and next action. Do not convert “not run” to a zero error count.

Use the result log for development checks. It is not a spreadsheet of real business results. Model-only simulation cannot verify CRM state; a mock can check a contract, but the connected system needs its own authorised tests.

## 5. Define the real pilot scorecard before running it

The following is an original worksheet, not a certified measurement method. Decide eligibility, cohort, deadline, ownership and targets with the business before observation. Record `admitted_at`, `due_at`, `verified_completed_at` and the reporting cutoff. Keep admitted difficult and failed cases visible; record exclusions and their reasons separately.

| Measure | Definition to agree | Keep separate |
|---|---|---|
| AI preparation quality | Cases with grounded fields and usable internal summary without substantive correction / cases processed by AI, after review of that cohort. At cutoff, record unreviewed cases separately and do not silently treat them as passes. | Final success after a person repairs the output. |
| Business completion | For the cohort with `due_at` at or before the reporting cutoff: unique eligible enquiries with accurate record, correct assignment and task verified by `due_at` / all unique eligible enquiries admitted to that cohort. | Newer not-yet-due enquiries, plus escalated, failed and pending states. If there are no deadline-matured cases, the settled rate is unavailable, not 0% or 100%. |
| Escalation | Expected-review cases routed appropriately, unnecessary escalations and unresolved queue volume. Define the expected route with reviewers. | Automatic completion; a safe escalation is not an automatic resolution. |
| Human work | Handling, review, corrections, exceptions and support for an equivalent period/cohort. | Waiting and software execution time; avoid counting a shared support minute twice. |
| Cost | Declared recurring charges and included operating costs for the same period; report set-up separately and include it when evaluating the investment. | Capacity, cash savings and revenue. Do not imply one from another. |
| Boundary failures | Each unauthorised action, exposure or important failure, including consequence and recovery. | A favourable average that would conceal it. |

For business completion at the reporting cutoff, use mutually exclusive states for every admitted unique enquiry: `completed_on_time`, `completed_late`, `escalated_unresolved`, `failed`, `pending`. Record state and its time; escalate as an event or review dimension as well. A previously escalated enquiry that is resolved before the deadline can finish as `completed_on_time`, while retaining the escalation history. Late completions are not counted in the on-time numerator.

Keep a separate deadline dimension so unresolved cases within their allowance are not called failures: `not_yet_due`, `deadline_met`, `completed_late` or `overdue_unresolved`, as applicable. Report all admissions and this inventory alongside the settled rate. If additionally reporting a rate over all admissions before their deadlines have elapsed, label it provisional and explain how pending cases affect it. Do not quietly exclude failed or difficult cases from the deadline-matured cohort.

Record preparation as a separate dimension: `usable_without_substantive_change`, `required_correction`, `no_usable_output`, `awaiting_review`, or `not_applicable`. A business success repaired by a person can coexist with `required_correction`; this does not double count enquiries in the completion metric.

If expressing preparation quality across all AI-processed cases at a cutoff, keep `awaiting_review` in the denominator, show its count and label the rate provisional while review is incomplete. Unreviewed is not a confirmed error. If additionally reporting the proportion accepted among reviewed cases, label that different denominator explicitly. Do not compare the two rates as if they measured the same thing.

There is no timing, cost, accuracy or improvement data to fill in from this package. A hypothetical example is not a substitute for those observations.

## 6. Decision and follow-up record

Write the decision, evidence, material failures, unresolved uncertainties, owner and next review point. Choose continue within the same boundary, change/retest, extend a particular part, or stop. Recheck relevant cases after changes to model/configuration, prompts, rules, documents, tools or action scope.

For a real Ranking Rebels case contribution, obtain a responsible person's account of problem, scope, tools, AI task, human role, observed outcome, limitations and permission for attribution or anonymity. No such implementation evidence is supplied by this kit. Use the factual account only when available; do not turn this worked trace into agency experience.
