# Integration trace and recovery card

An original worksheet for **Why Have Your Business Apps Stopped Syncing?** Use it to document evidence, uncertainties and a proposed recovery. It is not an automatic repair tool or a platform-independent replay procedure.

## 1. Define the work and the affected scope

| Field | Your record |
|---|---|
| Workflow name, platform and relevant version | |
| Business outcome and eligibility rule | |
| Source system and expected destination(s) | |
| Direction of transfer; field/conflict ownership where relevant | |
| Responsible owner and cover | |
| Expected completion deadline and reason | |
| Last known working point and first known affected item | |
| Investigation period and time zone | |
| Available history, access and coverage limitations | |
| Containment or manual fallback, if needed | |

Use stable business-item references when available. Distinguish a person, an enquiry, a delivery attempt and a workflow execution. Two attempts for one enquiry are not two enquiries. One person can have two legitimate enquiries.

## 2. Trace one item

Business-item reference: __________

| Boundary or action | Expected result | Evidence location and reference | State: confirmed / failed / not attempted / uncertain / excluded | Next question and owner |
|---|---|---|---|---|
| Source saved the item | | | | |
| Trigger retrieved or received it | | | | |
| Conditions selected its route | | | | |
| Destination action 1 | | | | |
| Destination action 2 | | | | |
| Business handover completed | | | | |

Record actual step input and output where available, relevant timestamps, destination identifiers and the workflow version. Use redacted excerpts and approved evidence locations. Do not paste passwords, access tokens or unnecessary customer data into the card.

A successful status, accepted webhook or returned contact ID does not establish every downstream outcome. An error status can still leave a destination write uncertain; record what the evidence actually establishes. Check the relevant destination and relationship. A missing history entry or empty search may reflect limited visibility; record uncertainty instead of inventing failure or success.

## 3. Explain the cause and repair proposal

| Question | Your record |
|---|---|
| What difference between expected and actual behaviour is established? | |
| What is only a hypothesis, and what evidence would distinguish it? | |
| Is the issue a trigger, condition, access, field, limit, delivery or destination problem? | |
| Which product-specific instructions apply? Include source/date | |
| What repair is proposed, and who may perform it? | |
| What other workflows or shared connections could be affected? | |
| How will the repair be checked without unintended actions? | |

Do not remove a deliberate filter or grant broad permissions merely to make an execution continue. A repaired connection and recovered historical work are separate facts.

## 4. Plan recovery before repeating an action

| Question | Your record |
|---|---|
| Which unique eligible business items are affected? | |
| Which actions are already confirmed for each item? | |
| Which actions have uncertain results? | |
| What has changed through manual handling or later updates? | |
| Could automatic retries or another workflow still act? | |
| What does the proposed replay actually repeat: workflow, step, items or sub-workflow? | |
| Which operation needs duplicate prevention, and what supported mechanism provides it? | |
| Does the operation reference identify this enquiry/action rather than merely the person? | |
| How are concurrent attempts coordinated, where necessary? | |
| If no safe recovery can be established, who resolves the exception? | |
| Controlled example and destination checks before any batch | |
| Planned action, owner, scope and verification point | |

A stored event ID does not automatically protect all destination actions. Searching before creating does not by itself prevent concurrent duplicates. Use the actual platform and destination documentation; do not assume one provider's retry policy applies to another.

## 5. Record actual implementation and reconciliation

Leave this section blank until work is performed and checked.

| Field | Actual evidence |
|---|---|
| Repair performed, by whom, version and time | |
| Controlled verification performed and result | |
| Source inventory and eligibility/period covered | |
| Unique items verified complete | |
| Unique items incomplete or uncertain | |
| Items deliberately excluded and reason | |
| Destination checks and references | |
| Duplicate actions found, or limits of the duplicate check | |
| Manual handling and other changes included | |
| Remaining work, owner and next review | |

Do not enter missing evidence as zero. Keep technical attempts separate from unique business items. If calculating a completion rate, define the eligible cohort, deadline and reporting cut-off, include unresolved items whose deadlines have elapsed, and show newer items separately. State coverage gaps before interpreting a rate.

## 6. Worked trace: fictional E104

These are supplied teaching premises, not observations from a real system or a tested integration.

Expected workflow: E104 should link to contact C42, create one opportunity for this request and assign a follow-up task.

| Step | Premise in the fictional scenario | Investigation implication |
|---|---|---|
| Source/trigger | Both contain E104 | Receipt is established within the scenario, not downstream completion |
| Contact | C42 is correctly linked | The new opportunity remains a separate requirement |
| Opportunity creation | The request timed out without a confirmed result | The write is uncertain, not proven absent |
| Task | The workflow did not reach this step | Check whether subsequent manual handling changed the requirement |

Additional premise: investigation establishes that O104 already exists for E104. Proposed recovery: preserve that confirmed relationship, check current work and use a supported method to address only the missing task. If the opportunity cannot be established, keep the write uncertain and refer it to the owner. A blank search is not proof that a new create request is safe.

## 7. Development scenarios to check

These are suggested exercises, not an executed test suite, representative sample or release benchmark.

| Case | Supplied situation | Expected behaviour to assess | Unacceptable shortcut |
|---|---|---|---|
| A — No visible run | An eligible source item exists, but history shows no execution | Check event/resource, access, collection method and visibility; do not assert a cause without evidence | Declare the record lost or repeatedly submit new copies |
| B — Rule changed | A current service value no longer matches an old filter | Compare input and approved current rule; update and test only if justified | Remove all filters to pass the test |
| C — Uncertain write | E104's opportunity request timed out | Establish destination state and supported recovery before another create | Assume nothing was created because confirmation is missing |
| D — Repeated delivery | The same enquiry arrives again | Recognise the same business item and prevent repeated effects using appropriate controls | Create another opportunity or task simply because another run started |
| E — Separate request | E105 is a different enquiry from the same verified contact C42 | Preserve the distinct request and appropriate relationship | Deduplicate all enquiries using the person's email alone |
| F — Partial batch/changed state | A failed step processed some items; one affected enquiry was later handled manually | Check per-item effects, current state and the actual replay scope | Repeat every action on the saved input without reconciliation |

### Actual results — intentionally blank

| Case | Version/environment | Test performed | Observed destination result | Unresolved issue and next action |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |
| D | | | | |
| E | | | | |
| F | | | | |

The cases have not been run. Do not convert expected behaviour or fictional premises into observed results, client evidence or a guarantee of recovery.
