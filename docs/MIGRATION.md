# Migration Guidance And Source Review

This repository guides migrations in other projects; it is not itself a HubSpot
app. It has no hsproject.json, live OAuth installation or Worker deployment.

## Reviewed Notices

| Topic | Reviewed milestone | Meaning |
| --- | --- | --- |
| Legacy CRM cards | November 2, 2026 | Current card guide lists removal from customer views |
| Card migration UI/API | December 1, 2026 | Guide lists the end of the migration tool window; recheck availability |
| Node.js 20 workflow custom code | November 3 / November 17, 2026 | New creation blocked, then existing edits blocked; execution continues |
| Design Manager functions | November 17, 2026 / February 1, 2027 | Edits blocked, then legacy endpoint execution stops |
| Pipelines v1 | December 4, 2026 | Endpoint shutdown, not just unsupported status |
| CRM v4 | March 30, 2027 | Earlier separate support deadline |
| Projects 2025.2 | March 2027 | Migrate platform; older sunset versions can already fail builds |
| API v1-v3 and legacy app architecture | September 2027 | Separate API and app-architecture migrations |

These summarize sources reviewed 2026-11-04, not guarantees of present service
availability. The doctor accepts --as-of YYYY-MM-DD to make deadline warnings
reproducible (default: current UTC calendar date). A passed deadline is not an
instruction to retry a retired endpoint. Check the official source and actual
account before planning a live operation.

## Updating The Toolkit

Keep catalog recipe IDs stable. Update official references, reviewed dates, support
labels and examples together. Re-run local checks. Existing saved fingerprints
may become stale; re-assess and review rather than carrying approval forward.

Never globally replace old URL versions: path positions, responses and permissions
differ. Required creation associations are currently UI-only, unlike required
properties enforced on API writes. Keep app-required links explicit and verified.

## Sources

- [Card migration](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards)
- [Node.js 24 workflow upgrade](https://developers.hubspot.com/docs/api-reference/legacy/automation/workflow-actions/upgrade-custom-code-actions-to-node-24)
- [Runtime sunset](https://developers.hubspot.com/changelog/sunsetting-design-manager-serverless-functions-and-older-node.js-runtimes-for-custom-code-actions)
- [Legacy APIs/apps](https://developers.hubspot.com/changelog/legacy-apis-and-legacy-apps-whats-going-unsupported-and-when)
- [Pipelines v1](https://developers.hubspot.com/changelog/pipelines-api-v1-sunset)
- [Corrected write validation](https://developers.hubspot.com/changelog/crm-api-write-validation-enforcement)
