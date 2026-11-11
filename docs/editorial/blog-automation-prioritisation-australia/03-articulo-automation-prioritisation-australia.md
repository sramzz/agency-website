# Which Business Processes Should You Automate First? A Practical Prioritisation Guide

Start with a process that solves a worthwhile problem, has understandable rules and inputs, and produces a result your team can check. The first opportunity should be small enough to assess honestly, including the work needed when something goes wrong.

That could be assigning new enquiries, preparing a regular report or creating onboarding tasks. There is no universal winner. The same task can be a sensible first project in one business and an expensive distraction in another.

Choosing well means answering two questions separately: **is this process ready for automation, and is automating it worth the effort?** A task can be easy to connect but barely matter. Another can be valuable but need clearer ownership or better data first.

## Start with the problem, then define the process

“We spend too much time on admin” identifies frustration, but it does not define a project. Neither does “automate sales”.

Consider this hypothetical process at a service business: “Website enquiries reach our inbox, but someone has to copy the details into our customer system, find the right team and create a follow-up task.”

That gives you a process to examine:

- **Trigger:** a new enquiry arrives through the website form.
- **Inputs:** contact details, requested service and location.
- **Required result:** one accurate record, assigned to the appropriate person, with a follow-up task.
- **Boundary:** the process ends at assignment. It does not prepare a quote or promise availability.
- **Owner:** someone who can explain the routing rules and deal with exceptions.

Find out where the work stalls. Copying details may be slow, records may go missing or enquiries may sit untouched because nobody knows who should respond. Each problem points to different work.

If ownership is the problem, connecting two systems will not settle it. Agreeing on responsibility might produce a useful improvement before you automate anything.

[Australian Government guidance on productivity](https://business.gov.au/planning/innovation/improving-productivity-in-your-business) recommends reviewing unnecessary steps, bottlenecks, errors and responsibility. Use that review to ask whether a step should be removed, simplified or automated.

## Check readiness before comparing benefits

Frequent work with clear rules is a useful place to look. It is not an automatic approval. Check these conditions before treating a candidate as ready for a trial.

### Can people describe a correct result?

Write down what should happen in ordinary cases and what should happen when information is incomplete or unusual. You do not need to automate every exception. You need a defined destination for cases the automation cannot handle.

For enquiry routing, an unknown service area might go to a review queue. Quietly choosing a team anyway would be a different, less acceptable outcome.

### Are the inputs and connections usable?

Check where information comes from, whether it is sufficiently accurate and complete, and whether the relevant systems support the required action.

“These apps integrate” is only a starting point. Confirm the particular operation, access permissions, subscription requirements and limits. A connection that reads contacts may not support updating the field your process needs.

If an AI product will handle personal information, check its suitability and the obligations applying to your business and data. [OAIC guidance on commercial AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) addresses those considerations. Privacy Act coverage varies, including for [small businesses](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business). Do not assume a single rule covers every reader.

### Can the business own the exceptions and consequences?

Identify who will notice failures, resolve uncertain cases and keep the rules current. The person responsible needs enough context and time to act.

Consider the effect of a mistake. Creating an internal draft and sending a binding offer are different actions. A useful first scope might prepare information while leaving a consequential decision with an authorised person.

Ask what can be stopped or recovered. If the team cannot detect a bad result or contain its effects, narrow the scope or resolve that problem before proceeding.

Also consider planned changes. An imminent CRM migration or a service model that changes every week may alter the economics. It does not make automation impossible, but the expected maintenance belongs in the decision.

Keep missing information visible as an unknown when comparing your options.

## Measure the work that matters

For each candidate, collect evidence from the people doing the work and, where available, system records. Review ordinary cases alongside difficult ones. A few clean demonstrations may miss the work that makes the process expensive.

Record the volume over a stated period, active handling time, delays, corrections and exceptions. Note whether each figure is observed, estimated or still unknown. Use a period that captures meaningful variations in your business. There is no sample size that suits every process.

UiPath's [Detailed Assessment documentation](https://docs.uipath.com/automation-hub/automation-cloud/latest/user-guide/completing-the-detailed-assessment) illustrates the range of factors a formal assessment can consider, including volume, handling time, variants, review and stability. You can gather comparable evidence in a simple worksheet without buying that platform.

### Separate active time from waiting

Active time is the time someone spends reading, entering, checking or correcting information. Elapsed time runs from the start of the process to its outcome and includes queues and waiting.

An enquiry might take five minutes to enter but wait a day for assignment. Removing four minutes of typing would release some capacity. It would not necessarily fix the delay that matters to the customer.

Choose a measure linked to the problem: time to assignment, enquiries without an owner, corrections per case or staff handling time. You may need more than one measure to see whether work has simply moved elsewhere.

### Count useful outcomes, not just successful runs

A workflow can finish without a technical error and still assign the wrong person or create a duplicate record.

For the enquiry example, define success as an accurate record assigned correctly, with the required follow-up task created, within the agreed scope. Count each unique enquiry once, even if the system retries an action. Track cases completed automatically, completed with human help and still awaiting attention separately.

That distinction matters because retries can repeat an action that already took effect. Microsoft's [guidance on handling transient faults](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/handle-transient-faults) discusses duplicate effects and the need to consider whether retrying an operation is appropriate. You do not need a technical design at selection stage, but you do need to know whether the likely failures are manageable.

## Compare value, effort and uncertainty together

Once a candidate has a credible scope and the essential conditions are understood, compare it with the alternatives.

Consider what would improve: capacity, response time, consistency, visibility or fewer missed handovers. Explain the mechanism. Creating a task with an owner may reduce forgotten follow-ups. It does not itself guarantee a sale.

Include the work needed to build and run it:

- mapping and simplifying the process, cleaning data and setting up connections.
- configuration, testing, staff training and the change to everyday work.
- licences, usage charges, hosting and any additional service capacity.
- human review, exceptions, failed runs, support and maintenance.
- changes needed when rules, systems or providers change.

Compare incremental costs over the same period. Avoid charging a project for the full cost of software you would keep anyway, or treating an existing subscription as proof that additional usage is free.

[business.gov.au's digital tools guidance](https://business.gov.au/online-and-digital/digital-tools-for-business) recommends considering upfront and ongoing costs and reviewing whether tools continue to provide value. A cheap subscription can support an expensive process. A more expensive option can still be worthwhile if the complete comparison supports it.

You can use a matrix to organise a discussion, but a total score should not override an unresolved permission or an unacceptable consequence. Keep important unknowns alongside the estimate. If a missing fact could reverse the decision, investigate it before declaring a winner.

## An example: compare five candidates

For the hypothetical service business, five tasks might look like this. The order depends on what that business knows and needs.

| Candidate | What this business knows | Provisional decision |
|---|---|---|
| Create and route website enquiry records | Required fields and service rules are agreed. A review owner exists. Handling time is recorded, but the exact system action still needs checking. | First candidate to investigate. Verify the connection, duplicate handling and net benefit before approving a trial. |
| Prepare an internal weekly job-status summary | Definitions are agreed, a supported export has been demonstrated and a manager reviews the output. Manual preparation takes less time than enquiry routing. | Another credible candidate. Compare its smaller potential capacity benefit and known connection with the less certain effort of routing. |
| Create onboarding tasks after a sale | Handoffs are often missed, but staff disagree about when onboarding starts and who owns it. | Improve the process first. Agree on the trigger and responsibility, then assess task creation. |
| Merge duplicate customer records | Duplicate records create frequent work, but mistaken merges could combine different customers and lose useful history. | Reduce the scope to flagging possible duplicates for review. Keep merge decisions with an authorised person until evidence supports a wider scope. |
| Prepare a monthly management report | Preparation is brief, definitions are changing and nobody uses several sections. | Simplify the report first. Defer automation unless the remaining work or decision value justifies it. |

There are two credible options to compare here. If missed enquiry handovers are the more important problem, checking the routing connection may be the best next action. If that check reveals substantial integration work, the weekly summary may offer a more manageable first scope, provided its remaining benefit justifies the cost.

Record what is known about each, then resolve the unknown most likely to change the order. The summary still needs enough benefit to justify its cost. So does enquiry routing, even though it involves more manual work. If neither has sufficient expected value, choose neither for now.

Frequency has not made duplicate merging the best first action. Nor does a monthly schedule make reporting unimportant: a report that delays a critical decision could deserve much higher priority in a different business.

## Calculate net capacity before claiming savings

Here is an illustrative monthly calculation for enquiry routing. **Every number below is hypothetical**, including the exception rate and future handling time. This is a way to test assumptions, not a forecast for your business.

Assume the current process handles 120 enquiries a month, taking six active staff minutes each: **720 minutes, or 12 hours**.

For the proposed scope, assume:

| Human work after automation | Monthly assumption | Active minutes |
|---|---|---|
| Review ordinary cases | 96 cases × 1 minute | 96 |
| Handle exceptions manually | 24 cases × 6 minutes | 144 |
| Monitor the process, reconcile records and correct operational issues | Combined monthly allowance | 80 |
| **Total** | **All 120 enquiries, plus operational work** | **320** |

The 24 exceptions are part of the 120 enquiries, not additional cases. Their six minutes replace the ordinary review allowance. They are not counted in both rows. The 80-minute allowance covers separate operational work, not the same exception handling again.

Under these assumptions, net capacity released is **720 − 320 = 400 minutes: six hours and 40 minutes a month**. That is less than the 12 hours you would claim by ignoring the remaining work.

If volume halved while the same case mix, handling times and 80-minute operational allowance applied, capacity released would fall to two hours and 40 minutes. Fixed support effort matters more at lower volumes.

Neither figure is a cash saving or ROI calculation. Set-up time and financial costs still need assessment. Salaried staff may use the released capacity for follow-up or delivery while the wage bill stays the same. Reduced overtime or an avoided external charge would need separate evidence.

The same applies to revenue: having more follow-up time creates an opportunity, not proof of additional sales. Keep expected benefits separate from results you later observe.

## Choose the simplest approach that fits the task

Only now does it make sense to ask what should perform the work.

Fixed rules may be sufficient to route a structured form by service and location. An AI step might help extract information from free-text messages inside an otherwise defined workflow. A more flexible agent may be relevant where choosing the next action or tool creates demonstrable value.

Those approaches can be combined. Adding one AI classification step does not mean handing over the whole process, and a process with human approval can still contain useful automation. Our comparison of [AI agents and workflow automation](https://rankingrebels.com/blog/ai-agents-vs-workflow-automation/) explains these choices through a service enquiry.

Anthropic's [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) recommends starting with the simplest sufficient solution and weighing added complexity against its costs. Treat that as design guidance, not evidence that every process needs an agent.

Check the capabilities of systems you already use before commissioning another layer. Once the job and its value are clear, compare the [benefits and trade-offs of custom software](https://rankingrebels.com/blog/custom-software-benefits/) with configuring or extending existing tools.

## Make a decision you can explain

Finish the assessment with a provisional decision: investigate for a small trial, improve the process first, retain a human decision, or defer. State what evidence could change it.

If that first trial includes AI, use a [workflow pilot with defined checks and measurements](https://rankingrebels.com/blog/how-to-build-ai-workflow/) to turn the chosen process into a testable scope.

For a trial candidate, identify the smallest useful scope, the result to check, the person responsible and the circumstances in which you would stop or return to manual handling. Agree on these before judging a demonstration. Keep the assessment proportional to the action and its consequences.

Use this short brief for an internal discussion or a conversation with a provider:

| Question | What to record |
|---|---|
| What problem are we solving? | A specific delay, workload, omission or quality issue, with available evidence. |
| Where does this process start and end? | Trigger, inputs, correct result, boundaries and owner. |
| What happens today? | Volume and period, active time, waiting, exceptions and corrections. |
| What would change? | Proposed automated steps, remaining human work and expected benefit. |
| What could make this unsuitable? | Data or access gaps, consequential errors, dependencies and unresolved assumptions. |
| What will it take to run? | Initial effort, ongoing costs, review, support and responsibility for changes. |
| What is the decision? | Next action, evidence still needed and how a useful result would be recognised. |

A useful first project earns its place through a clear problem, manageable scope and evidence of value. The outcome may be an automation, a simpler manual process or a decision to wait.

Bring that brief to a conversation about [AI automation with Ranking Rebels](https://rankingrebels.com/solutions/ai-automation/) if you want help assessing a candidate. We can start with the work you want to improve and what needs checking before implementation.
