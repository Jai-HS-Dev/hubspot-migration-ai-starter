# Non-Developer Safety Gates

## Gate 1: Understand Without Changing

Identify the approved source folder and whether this is a demo or installed app.
Use read-only assessment; do not run scripts supplied by the inspected project.
Finish with facts, hypotheses and unknowns.

## Gate 2: Preserve Behavior

Write down the data, buttons, permissions and related records users rely on.
Choose the smallest matching recipe. Keep the old host and auth where possible.
Approval for a plan is not approval to deploy it.

## Gate 3: Work Locally With Fake Data

Use synthetic fixtures. No secrets or customer exports in chat or Git.
Review dependencies before installation; the toolkit itself needs none.
Pass local acceptance tests and explain unsupported features.

## Gate 4: Verify The Target

Confirm the intended app/account/environment and product entitlements through a
supported connection or human confirmation. Do not ask for secrets in chat.
Missing permissions remain unknown, without scope expansion or token extraction.

## Gate 5: Approve A Specific Live Operation

Explain exactly what changes and what cannot be undone. Require fresh explicit
approval for upload, deploy, view migration, flag deletion, permission changes and
tests that mutate records. Identify the synthetic test data first.
A saved JSON state file cannot provide this approval.

## Gate 6: Verify And Report

Read back the installed result where access permits. Verify business behavior,
not just HTTP 200 or deployment success. Record failures and remaining unknowns.
Do not label a migration complete based on generated code or mock tests alone.
