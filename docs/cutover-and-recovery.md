# Cutover And Recovery

No command in this toolkit executes these steps.

## Before Any Live Operation

Confirm the exact app, account and environment locally without posting identifiers
in chat. Review scope/auth compatibility, original app identity, product entitlements,
snapshot, acceptance results and current official sources. Name the specific action,
its blast radius, permitted synthetic test data and whether it is reversible.
Obtain explicit approval for each sensitive operation.

## Legacy Card Views

Build/test the replacement before adding it to the app that owns the legacy card.
Check compatible objects and locations. For tickets, the current guide requires
separate crm.record.sidebar and helpdesk.sidebar cards with different titles.

For relevant Marketplace migrations, review hs-release-app-cards and
hs-hide-crm-cards flags. Beta visibility is not replacement of existing views.
The guide requires flag removal before final migration; deletion itself needs
explicit approval. Never automatically delete a flag while merely assessing.

Once card view migration begins it cannot be stopped or reversed. A previous code
build can restore code only; it cannot undo that view operation. Test first and
describe forward-repair options honestly. Never consolidate multiple legacy cards
into one replacement without reviewing and explicitly approving that mapping.

The guide lists November 2 removal and a December 1 migration tool window.
Recheck current availability, especially after that window; do not promise an
endpoint will still work or provide an automatic retry/cleanup command.

## Verification

Check data, object coverage, actions, error/permission behavior and intended views
in authorized test installs, then the approved release scope. Do not delete a
legacy card until verified migration and explicit cleanup approval.
[Official procedure](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards).
