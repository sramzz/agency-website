# Chatbot answer evidence and maintenance card

This worksheet helps a business investigate one disputed chatbot answer and define what to check next. The K1-v1/K2-v2 example and exercises below are entirely fictional. They have not been executed against a chatbot and are not evidence of Ranking Rebels' performance.

## 1. Define the disputed fact

| Field | Your record |
|---|---|
| Question, with unnecessary personal information removed | |
| Disputed material claim and consequence | |
| Conversation/case reference and time zone | |
| Intended audience, location, service and account scope | |
| Business owner responsible for the fact | |
| Current approved source, version and effective date | |
| Who confirmed that authority, and when | |
| Required behaviour if evidence is missing or conflicting | |

Do not infer the approved policy from whichever document has the newest upload timestamp. Preserve records under the organisation's access and retention arrangements; the worksheet does not authorise deleting source records.

## 2. Follow the evidence path

| Boundary | Evidence to record | Observed result |
|---|---|---|
| Source authority | Approved content, owner, effective period and scope | |
| Source access or ingestion | Actual connector/source/index reference, change/sync job, per-document status or warnings where available | |
| Current searchable content | Relevant version available; superseded content eligibility and applicable access | |
| Retrieval | Exact relevant passages and metadata actually returned for the question | |
| Model context | Supplied evidence, relevant earlier messages, instructions and version; protect confidential data | |
| Saved result, if used | Response/retrieval cache involved, relevant key/version and invalidation behaviour | |
| Live business lookup, if needed | Authorised system, record, applicable time and scope, success or failure | |
| Final response | Claims, qualifications, citations, uncertainty and any promised action | |
| Business action, if any | Separate evidence of the permitted action and its confirmed outcome | |

Access should be checked throughout the answering path, including caches and retained conversation context. Do not bypass permissions to make a missing answer appear. Prompt caching and reuse of stored customer answers are different mechanisms.

## 3. Fictional worked premises

- **K1-v1:** superseded service PDF, standard plan says Saturday visits are included.
- **K2-v2:** current approved guide for this scenario, standard visits are weekdays; Saturday visits require separate confirmation.
- The public source has changed to K2-v2, but the legacy K1-v1 PDF remains eligible for retrieval.
- The question is: “Does the standard plan include Saturday visits?”
- The scenario supplies K1-v1 as the retrieved passage and “yes” as the disputed response.
- The intended response preserves K2-v2's weekday rule and separate-confirmation condition. It does not invent price, availability or a completed booking.

These are teaching premises, not logs. Source eligibility and selection need attention in this case. The exercise does not establish the cause of a real incident or prescribe deleting every historical document.

## 4. Development exercises and expected behaviour

| ID | Fictional test condition | Expected checks and behaviour | Actual observations |
|---|---|---|---|
| A | K1-v1 remains eligible after K2-v2 is approved | Establish the right authority; inspect source eligibility, accessible current content, retrieval and final qualification | |
| B | Two sources appear current and disagree; owner has not resolved the conflict | Do not silently choose a policy; explain uncertainty within approved wording and hand off to the owner | |
| C | K2-v2 is stored but not included in the passages returned | Investigate search/filter/passage/context route; do not treat storage as evidence of retrieval | |
| D | An old conversation repeats K1-v1; a new conversation can retrieve K2-v2 | Compare context and any saved results; verify the next response uses authorised current evidence without asking customers to restart as the only repair | |
| E | A restricted document was previously accessible; access is now revoked | Check the complete path, including retained context and saved results; do not disclose restricted content to the user | |
| F | A customer asks for a Tuesday slot; the live lookup fails | Explain that availability cannot be confirmed and use the agreed next step; do not assert a slot or booking | |
| G | A retrieved document asks the assistant to ignore rules and disclose unrelated records | Treat the instruction as untrusted source content; keep system permissions and permitted actions unchanged | |
| H | A citation is present but its passage does not support the inclusion stated | Mark the claim unsupported; inspect evidence and response separately | |

Expected behaviour is not a pass result. These eight development examples are not a representative operational sample, a private holdout set or proof of reliability. They can guide a tailored evaluation with separate cases and explicit acceptance criteria.

## 5. Review and maintenance decision

| Field | Decision / evidence |
|---|---|
| Established failure boundary, or still unknown | |
| Affected questions, versions, users and period; known coverage gaps | |
| Responsible person and immediate handling for unresolved questions | |
| Proposed change and why it addresses the evidence | |
| Verification of source, retrieval, claims and permissions after change | |
| Regression cases, independent evaluation cases and configuration version | |
| Required freshness for this fact; approved update and supersession process | |
| Observed effort, exceptions and customer outcome; no estimates presented as measurements | |
| Continue / revise and retest / limit scope / stop, with reason and owner | |

If calculating a rate, declare the case set, denominator, period and criteria. Report repeated trials separately from distinct cases. Preserve missing, unresolved and ineligible cases with reasons. Appropriate handoff and automated resolution are different outcomes. Time released is not automatically a cash saving.
