# From Offline Assessment To A HubSpot Migration Test

The offline demo is a first checkpoint, not the end of the migration. You can
inspect approved source without connecting an account. To test an installed
replacement, verify the existing app, or perform cutover, you need authorized
access to the relevant HubSpot environment.

This guide helps you and your AI assistant make those decisions. It does not
connect accounts, supply credentials, or perform a migration.

## 1. Understand The Existing Integration First

Describe what must keep working, using no customer details. Approve one local
source folder for read-only assessment. Do not run its scripts during discovery.
The doctor's source findings do not prove what is installed in HubSpot.

Create a private inventory of the current app identity, host, authentication,
objects, views, actions and dependent workflows. Note missing source or unavailable
access as unknown. Do not use a newly created app as a substitute for identifying
the original one.

Keep filled plans and reports under ignored `.migration-local/`; do not put
credentials, private endpoints or customer exports in this public repository.

## 2. Choose The Right Account For The Next Step

| Next step | Account requirement |
| --- | --- |
| Run the synthetic demo or inspect approved source | No account connection. |
| Learn how the replacement renders | An approved developer test account with the needed features. |
| Check what the original app actually does | Authorized access to its current installation; begin read-only. |
| Change the installed integration or customer views | Separate approval for the exact original app, target accounts and operation. |

For a separate practice environment, go to **Development > Testing > Test
Accounts > Create developer test account**. If you do not have a HubSpot login,
start with [HubSpot onboarding](https://developers.hubspot.com/developer-platform-basics).
Developer test accounts are free, with trial features and limits; they are not
the same as Enterprise sandboxes or your production account. See
[HubSpot account types](https://developers.hubspot.com/docs/getting-started/account-types).

Check test subscriptions against the real account's required features. A test
using extra trial features does not prove the customer's plan supports them.
Ask an admin if access or a menu is missing; do not request broad permissions or
buy a plan just to clear an error.

A separate test app can validate learning, but it does not migrate the original
app or reproduce customer installation history and views. For legacy cards,
[HubSpot's migration guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards)
describes testing a replacement separately before adding it to the owning app.
Recheck current availability and deadlines before planning a real operation.

## 3. Preserve Authentication And Hosting Where Possible

Start with the existing reviewed setup. Updating a card or runtime does not
automatically require a new OAuth app, token store or hosting provider.

When a change is actually required, explain these options in plain language:

| Need | Option to evaluate |
| --- | --- |
| Existing working authorization | Preserve it if compatible with the required migration. |
| Project-based app limited to one account | Static app authentication where the selected feature supports it. |
| App installed by multiple customer accounts | OAuth. |
| Data-only, single-account REST integration | A scoped Service Key where eligible; not a replacement for app features. |

Use [HubSpot's authentication overview](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/overview)
and [Service Key limits](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys).
Service Keys do not install cards or replace webhook/app migration requirements.
CLI login is development access, not the app's authentication or approval for
CRM access. Never extract a saved token to work around missing permissions.

If OAuth setup must change, review exact callback URLs, minimum scopes,
browser-bound state, server-side token exchange, protected storage, refresh and
disconnect behavior. Keep credentials out of chat and browser/card code.
Use [auth options](auth-options.md) and [hosting options](hosting-options.md);
do not assume code can move between hosts unchanged.

## 4. Plan And Approve A Small Test

Have the assistant explain missing implementation work and propose one test:
what runs, where, which synthetic records it uses, and how success is checked.
Confirm the selected account in HubSpot before continuing.

Get explicit approval before account creation, packages, connection, live reads,
uploads, deployment or writes. Test-account API calls are live requests, even
with made-up record names. Enter secrets only in the approved app's ignored local
configuration or server-side secret store, never in this toolkit or AI chat.

Compare old and new labels, fields, object coverage, associations and actions as
applicable. Check empty, loading, error and permission-denied behavior. Use
approved synthetic inputs and check for downstream automation before any write.
Unsupported behavior must stay visible, not be silently removed.

Installing this repository's synthetic scaffold is not a completed migration.
Its optional UI package setup is separate from the zero-package offline demo;
follow the example README and ask approval before installing dependencies.

## 5. Treat Cutover As A Separate Decision

Cutover means switching the existing installation or user views to the replacement.
Local tests and a new test install do not authorize that switch.

For legacy cards, view migration is irreversible. A source backup cannot undo
it. Preserve the original app identity, verify card mappings and follow
[cutover and recovery](cutover-and-recovery.md). Do not run a migration endpoint,
delete flags or remove legacy cards merely to test a demo or clear a warning.

Check the current official procedure and availability. Request separate approval
for each sensitive operation, describe who is affected and distinguish reversible
code deployment from irreversible view changes. If evidence is incomplete, stop
the affected live operation and continue safe local work.

## 6. Report What Is Actually Verified

Record **generated**, **locally tested**, **developer-account verified** and
**deployed** separately. Use the private [verification report](../templates/verification-report.md),
include failures and unknowns, and obtain separate cleanup approval.

Review [the real-migration checklist](REAL_MIGRATION_CHECKLIST.md) and
[implementation responsibility](implementation-responsibility.md) before real use.
An assessment or test does not certify production readiness.

For the next AI conversation:

```text
The offline demo works. Use docs/connect-to-hubspot.md to plan my migration test.
Ask what existing behavior must be preserved and which source folder I approve.
Help me choose a test account without replacing the original app or working auth.
Check current official requirements and identify missing implementation work.
Do not connect, install, upload, write or perform cutover without explicit approval.
Never ask for secrets or customer data in chat.
```
