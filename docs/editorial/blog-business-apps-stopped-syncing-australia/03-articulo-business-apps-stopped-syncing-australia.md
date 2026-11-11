# Why Have Your Business Apps Stopped Syncing?

Business apps can stop passing the right information when a connection loses access, a trigger or filter no longer matches, fields change, usage limits intervene or a service cannot complete a request. Sometimes the workflow runs without an error but updates the wrong record or never reaches the intended next step.

Start with one affected enquiry, booking or record. Follow it from the source to the destination and establish the first point where the evidence stops matching the expected result. Before replaying the workflow, check what it has already done.

Suppose an enquiry reaches your CRM and returns a contact reference, but the opportunity request times out and the follow-up task is never reached. You need to establish what was saved before deciding what to repeat. We will follow that fictional enquiry below. It is a teaching example, not an incident, test or client result from Ranking Rebels.

## First, agree what “syncing” should mean

An integration connects systems. A workflow uses a trigger, conditions and actions to move work forward. A synchronisation may keep selected records aligned in one direction or both. Those are different expectations.

If a website form creates an opportunity in your customer relationship management (CRM) system, that does not necessarily mean editing the CRM will update the original form. Nor does creating a contact establish that a follow-up task exists.

Write the expected result in business terms:

> Each eligible quote enquiry should appear as the correct opportunity, linked to the correct contact, with an assigned follow-up task by the agreed deadline.

Specify which enquiries are eligible and who handles exceptions. The deadline should fit the business and the actual connection; “instant” should not be assumed.

For two-way sync, agree which system controls each field and what happens when values disagree. [HubSpot's data-sync documentation](https://knowledge.hubspot.com/integrations/connect-and-use-hubspot-data-sync) illustrates configurable direction and conflict resolution in one product. Those settings are not a universal feature of every integration.

## Recognise the symptom before choosing a fix

A missing run, a stopped run and a successful run with the wrong outcome call for different investigations.

| What you see | What to investigate first |
|---|---|
| The source has a new item, but no execution is visible | Whether the workflow is active, watching the right event and resource, and able to receive or retrieve the item |
| The run stops at a condition | The actual input and the rule applied; a deliberate exclusion may be working as configured |
| A step reports an error or is held | Its message, account, permissions, required fields, usage limits and service availability |
| The run appears successful, but the result is wrong | The destination, record reference, mappings, route and definition of completion |
| Records arrive late, twice or with unexpected values | Queues, retries, repeated events, competing workflows and sync direction |

These are starting points, not a diagnosis. [Zapier's troubleshooting overview](https://help.zapier.com/hc/en-us/articles/30582278131597-Zap-is-not-working) similarly separates activation, triggering, errors, permissions and unexpected behaviour. The cause still depends on the connected apps and configuration.

If incorrect actions are continuing, the workflow owner may need to contain the affected route and arrange manual handling while investigating. Check what pausing actually stops: queued work or automatic retries may need separate attention. Pausing does not undo records or messages already created.

## Trace one affected item through the whole route

Choose a specific source reference rather than searching for “the missing leads”. Record when the item was created, including the time zone, and the workflow version involved. Compare an affected item with a genuinely comparable working example if one is available.

Use a simple route:

**Source record → trigger → conditions → action → destination → next responsibility.**

At each boundary, ask what evidence exists. Did the source save the enquiry? Did the automation receive it? Did the condition allow it through? What was sent to the CRM? Which record was returned? Was the task assigned to the intended person?

[Zapier's run-detail documentation](https://help.zapier.com/hc/en-us/articles/20512774106125-View-specific-Zap-run-details) distinguishes the data sent into an action from the data returned. Use the equivalent execution details in your platform to inspect the actual run, rather than relying only on the editor's sample data.

Then check the destination itself. A returned contact ID may belong to an existing person while their new opportunity is still missing. A task may exist but be assigned elsewhere. Search using the relevant references and relationships, not just a familiar name.

Keep unknowns visible. “No record found in this search” is weaker evidence than a confirmed record with the correct identifier. Search permissions, visibility and timing can limit what you can establish.

Preserve useful evidence before changing the configuration: workflow version, run reference, relevant step inputs and outputs, and the last known working point. Use appropriately redacted excerpts when sharing the investigation. Passwords, access tokens and unnecessary customer details do not belong in a troubleshooting brief.

## Check the causes that fit the evidence

### 1. The trigger is watching a different event or has not collected it yet

Confirm the event, account, form, list, folder or other resource being watched. “New contact” and “new enquiry” may represent different events. A flow configured for one form will not automatically collect submissions from a replacement form.

Triggers also behave differently. Some poll an app periodically; others receive a webhook sent by the source. [Zapier documents both trigger types](https://help.zapier.com/hc/en-us/articles/8496244568589-How-Zap-triggers-work), with behaviour depending on the app and event. Check the relevant collection interval or delivery evidence before declaring an item lost.

Do not assume turning a workflow back on imports everything created while it was off. Recovery of the gap is a separate question with product-specific limits.

### 2. Access has changed

A connection may use the wrong account, have expired or revoked authorisation, or lack access to the required resource. Inspect the actual failing action and ask the account owner to verify the access it needs.

[Make's connection guidance](https://help.make.com/connect-an-application) distinguishes verification, reauthorisation and editing permissions. A connection check does not establish that every action using it has the necessary access. Deleting a shared connection can affect other workflows.

Repair the specific access problem through the authorised owner. Granting broad administrator access or repeatedly deleting and recreating connections is not a substitute for identifying the requirement.

### 3. A field or business rule has changed

A form may now supply a different service value, a required field may be empty, or the destination may expect a different format. Check the current input against the mapping and the destination's requirements.

[Zapier's missing-data guide](https://help.zapier.com/hc/en-us/articles/8496199667981-Zap-is-not-sending-data) includes unmapped, empty, renamed and deleted fields among possible causes. A trigger can work while the expected value fails to reach its destination.

Treat conditions separately from faults. If a rule excludes out-of-area requests, that route may stop correctly. If the business has expanded its service area, the configuration may no longer match the current policy. Confirm the intended rule rather than removing the filter simply to make more runs continue.

### 4. A limit or temporary service problem intervened

Distinguish a subscription's usage allowance from a service limiting how quickly requests can be sent. They require different responses. Zapier's [limits documentation](https://help.zapier.com/hc/en-us/articles/8496181445261-Zap-limits) separates task limits from platform and app rate limits.

A 429 response commonly signals a request-rate limit; use the affected provider's instructions rather than a fixed retry timetable copied from another app. A queue may be delayed rather than permanently lost. Check its actual state and the service's relevant status information.

Retrying can help a temporary problem, but it does not repair an invalid field, incorrect rule or missing permission. Microsoft's [Retry pattern guidance](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry) recommends matching retry behaviour to the fault and warns that aggressive retries can worsen overload.

### 5. The system accepted the request, but the business outcome is incomplete

A green execution status answers a question about the platform's processing. It should not replace checking the result your team needs.

For example, [Make's webhook documentation](https://help.make.com/webhooks) explains that its default acceptance response confirms the request has entered the queue. That acknowledgement alone does not confirm the correct opportunity and task were created later.

Other gaps are logical: a filter excludes all items, a successful action updates the wrong record, or a task is created without a usable owner. Check the business outcome independently of a status badge.

## Why replaying everything can create a second problem

A timeout means a response was not received in time. It does not establish that the destination did nothing. An app may create a record and then fail to return confirmation.

Repeated delivery can also be part of a provider's design. [Stripe's webhook documentation](https://docs.stripe.com/webhooks#event-delivery-behaviors), for example, describes duplicate deliveries and does not guarantee event order. That is a documented Stripe behaviour, not a claim that every business app follows the same policy.

Separate two controls:

- **Recognising a repeated event:** is this the same enquiry delivery being processed again?
- **Preventing a repeated action:** could another attempt create a second opportunity, task or message?

Idempotency means repeating an operation does not add another effect of that operation. It requires support in the relevant design or API; storing an event ID somewhere does not automatically protect every downstream action.

The identifier also needs to match the work. One customer's email address is not a unique enquiry identifier: the same person may request two separate projects. Conversely, two deliveries of the same enquiry should not automatically become two opportunities.

Understand the replay option before using it. [Zapier distinguishes replaying failed steps](https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay) from [replaying an entire run](https://help.zapier.com/hc/en-us/articles/8496241726989-Replay-Zap-runs), which can repeat previously successful actions.

[n8n's execution documentation](https://docs.n8n.io/build/understand-workflows/understand-executions/view-all-executions.md) describes another important distinction: a retry keeps completed node results, but the failed node processes its saved items again, including items it handled before failing. Selecting “retry” is therefore not proof that no side effect can repeat.

## A fictional enquiry with an uncertain write

Return to the fictional enquiry, **E104**. It should link to contact **C42**, create one opportunity for this request and assign a follow-up task. These identifiers and states are teaching premises, not results from a real account.

| Step | Evidence supplied by the fictional scenario | What remains to establish |
|---|---|---|
| Receive E104 | The source and trigger both contain E104 | Whether all later work completed |
| Link contact C42 | The contact step returned the correct relationship | Whether an opportunity exists for E104 |
| Create opportunity | The request timed out without a confirmed result | Whether the CRM created the opportunity anyway |
| Create follow-up task | This step was not reached | Whether manual handling has since changed what is needed |

Replaying the whole route would ignore the uncertain opportunity. The responsible person first checks the destination using the enquiry reference and supporting evidence.

Suppose the scenario then establishes that opportunity **O104** already exists for E104. The recovery plan can link that confirmed result and address only the missing task, after checking current ownership, any manual action and the platform's recovery mechanism. If the result cannot be established, leave it uncertain and escalate; a blank search is not permission to create another record blindly.

“Search before creating” is useful investigation, but not a complete duplicate-prevention guarantee. Concurrent attempts can both search before either writes. An implementer needs to assess supported idempotency, uniqueness or coordination controls for the particular operation.

## Repair the cause, then reconcile the affected work

Restoring a connection proves neither that the earlier backlog was recovered nor that every new item will complete correctly.

Use a bounded recovery plan:

1. **Define the affected group.** Record the source, eligibility rule, period and known limitations. Use business-item references; one enquiry can generate several delivery attempts.
2. **Compare source and destinations.** Classify each item as verified complete, incomplete, uncertain or intentionally excluded. Keep exclusions and unknowns visible.
3. **Check current state.** Someone may have handled the enquiry manually, changed the assignment or completed the task. Old input does not establish what should happen now.
4. **Choose the recovery action.** Correct the cause and identify which missing action may safely run. Check automatic retries and competing workflows before adding a manual attempt.
5. **Verify a controlled example before a batch.** Confirm records, relationships and assignments in the destination, along with the absence of unintended repeated actions.
6. **Reconcile the group again.** Record completed, unresolved and deliberately excluded items, with a responsible person for anything outstanding.

Recovery is not always a replay. A provider may require a resynchronisation, a fresh lookup or manual reconciliation. Available history, delivery windows and connector capabilities vary; do not promise to reconstruct every missed event.

## Make the next failure easier to notice and resolve

Give the workflow an owner and agreed cover. Record its purpose, systems, required fields, permissions, version and exception route. Keep a short change record when forms, fields or business rules change.

Monitor both technical errors and the intended result. Error notifications will not necessarily identify a workflow that never triggered or a successful run that applied the wrong rule. For a quiet or seasonal workflow, an absence of runs is not automatically an incident either: compare expected eligible activity with actual completion.

Useful operational observations include unique eligible enquiries awaiting completion, the age of unresolved work, confirmed duplicate actions and human recovery effort. Separate them from execution counts. Do not invent a completion rate when the source inventory is incomplete; record the coverage gap.

Reliable connections can reduce repeated data entry, make handovers easier to verify and help the team recover work consistently. The benefit comes from the controls and working habits, and should be assessed against their setup and maintenance effort. Adding AI is optional; it does not by itself repair access, mappings or recovery behaviour.

If your tools are connected but the work is still getting lost between them, explore [Ranking Rebels' automation approach](https://rankingrebels.com/solutions/ai-automation/). Bring one affected workflow, the expected outcome and a redacted example of where the evidence breaks down.
