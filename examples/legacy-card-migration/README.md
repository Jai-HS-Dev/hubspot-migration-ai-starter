# Offline Legacy Card Migration Example

**Example status:** Runnable locally.
**Local check:** `npm run demo` from the repository root, after the documented setup.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../REAL_MIGRATION_CHECKLIST.md) and [evidence](../../EVIDENCE.md); no production implementation is included.

Offline adapter and synthetic fixtures. Legacy inputs are non-deployable.


Run npm run demo from the toolkit root. No install, account, web server or network
is needed. Tests cover parity, empty results, unsupported behavior and unsafe input.

- legacy/card-definition.json: synthetic legacy input, not deployment metadata.
- legacy/card-response.json: synthetic results, never customer data.
- modern/expected-view-model.json: UI-neutral contract, not an app-card definition.
- ../../src/legacy-card.mjs: actual tested adapter and request-format parser.

The demo preserves supported IDs, titles, links and STRING columns. It separately
compares the same business-field payload in form and JSON formats. It does not
convert legacy action definitions or authenticate/execute their hooks.

## To Build The Real App Card

Read recipes/legacy-crm-cards/README.md and the official converter. Choose the
original app/project and fetch current schemas. Render the view model with current
HubSpot UI components, add necessary states and object/location support, and test
the actual backend/signature/permissions contract. Do not upload this fixture folder
as a HubSpot app. The modern subfolder includes a synthetic project scaffold, but the offline demo creates no project metadata, uploads nothing and installs no card.

The generated model has no live actions. Unsupported legacy actions deliberately
fail rather than being silently omitted. Implement them under a reviewed contract
in the real app, not by enabling a hidden live-mode switch in this demo.
