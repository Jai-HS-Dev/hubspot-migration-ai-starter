# Synthetic App Card Replacement

**Example status:** Illustrative.
**Local check:** `npm run test` from the repository root, after the documented setup.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../../docs/REAL_MIGRATION_CHECKLIST.md) and [evidence](../../../docs/EVIDENCE.md); no production implementation is included.

Synthetic app/card project scaffold with a locally tested renderer; no cloud build, install or view migration verified.


This directory now includes a complete app/card **source scaffold**, not just a
view-model snapshot. It renders synthetic data only: no CRM queries, external
calls, secrets, or buttons that mutate records. The private static-auth app
requests [the Contacts read scope for card visibility](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/extension-points/app-cards/reference#supported-objects).
That is account-level permission, even though this card does not query records.
It is not a universal converter and has not been uploaded or live-account verified.

## Follow The Data

1. ../legacy/card-definition.json and card-response.json are non-deployable inputs.
2. The root adapter converts their supported STRING fields to expected-view-model.json.
3. src/app/cards/synthetic-model.mjs contains exactly that output; a parity test
   fails if it drifts from the adapter or loses labels/values/links.
4. MigratedCard.jsx passes it to render-card.mjs using real SDK components. Text is
   rendered as escaped React text; links are rechecked as HTTPS without credentials,
   queries or fragments. Empty results render a distinct no-data state.

From the toolkit root, `npm.cmd test` verifies the adapter-to-renderer contract
without packages or credentials. The renderer is dependency-injected so the
assessment toolkit retains its zero-dependency installation path.

## Optional HubSpot Project Trial

hsproject.json uses platform 2026.09 and ./src. The app/card metadata matches the
reviewed schemas. The cards package pins @hubspot/ui-extensions 1.0.1 and React
18.3.1; ask for approval and review/lock dependencies before any installation.
SDK packages are needed only for this optional UI project, not the toolkit commands.

For learning, request explicit approval to upload this synthetic project to a
developer account. Check the cloud build and installed rendering; local tests alone
are not evidence of either. Do not run an irreversible view migration for this demo.

For a real migration, **do not upload this as a new app and call the migration done**.
Preserve the original app identity and required capabilities. Use this view inside
the reviewed replacement card project and keep the old backend where appropriate.
Use the companion contact-card starter's signed backend and UI states for dynamic
data, authenticated loading, errors, setup and access denial. Verify both old/new
behavior on approved synthetic records before requesting separate cutover approval.

Unsupported legacy actions/types deliberately stop conversion. Never enable
liveWritesEnabled: this example has no authenticated action handler. Follow the
recipe and current official converter guide for behaviors outside this subset.
