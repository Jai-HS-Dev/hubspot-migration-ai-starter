# Build A Replacement For A Legacy Status Card

**Scope:** Offline synthetic migration. No installed app, account or views change.
You will preserve a meaningful label and record what the assessment cannot prove.

## 1. See The Starting Point

From the toolkit root:

```bash
npm run doctor
npm run build:example
```

Use `npm.cmd` on Windows. No package install or account connection is needed.
The named check is:

```text
worked migration preserves a custom label without claiming installed verification
```

It changes a synthetic legacy definition in memory, converts it with the existing
adapter and verifies that the label and value survive. A second check verifies a
blank field, an empty result, and rejection of an unsupported action. Nothing
is uploaded or executed in HubSpot, and the checks write no source files.

## 2. Make A Small Customization In Your Copy

Open `tests/worked-example.test.mjs`. The existing example sets the first
property label to `Support priority` and expects that label with value `Normal`.

Change only the expected label to `Customer priority` first. Run
`npm run example:guided`; the assertion should fail.
Then change the synthetic input label assignment to `Customer priority`.
Run the focused command again, then `npm test`; both should pass.

You changed the requirement and then the matching synthetic input. The adapter
preserved it without a universal conversion rule or a live migration.
The test also checks `liveWritesEnabled: false`, unknown installed state and
no live changes. Do not change those evidence boundaries to make a test pass.

## 3. See The Replacement In A Test Account

Use the [synthetic replacement project](../examples/legacy-card-migration/modern/README.md),
not the legacy input files. After separately approving dependencies, upload,
installation, and the Contacts test view, follow the
[HubSpot card setup guide](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/extension-points/app-cards/create-an-app-card).
Confirm the sample priority and status match the legacy fixture. If you want
to see missing data in HubSpot, use a synthetic empty replacement fixture in a
test-only copy and confirm that it shows no results. Verify unsupported
actions offline; never create or trigger one just to test an error.

This is an optional replacement trial, not a view swap, and has not been
verified end to end. If the card isn't available, stop and check feature
eligibility, app installation, and view placement. Do not expand CRM access
or change an existing app to make the sample work.

## 4. Build A Private Inventory And Plan

For a real migration, copy these templates into ignored `.migration-local/`
only after choosing the approved source folder:

- [Inventory](../templates/inventory.md): original behavior, source evidence and unknowns.
- [Plan](../templates/migration-plan.md): mappings, unsupported features and acceptance checks.
- [Verification report](../templates/verification-report.md): tests, actual installed evidence and unfinished work.

A useful synthetic report excerpt would say:

```text
Local result: custom label and value preserved.
Installed account state: unknown.
Deployment/cutover performed: no.
Next decision: approve a replacement test in the correct environment.
```

That excerpt is an example of honest wording, not an account verification receipt.
Never commit filled reports or customer data.

Record mismatches too. For example, if the local conversion completes but the
replacement shows the wrong priority, write **conversion completed; behavior
comparison failed**. Keep the original result, expected result, and actual
result in the private report. Do not mark the replacement verified or start a
cutover until the mismatch is understood and retested.

## 5. Keep Cutover Separate

The offline doctor uses bounded source heuristics. Missing evidence is not
evidence that the account is unaffected. Select a [recipe](../recipes/README.md)
and use [the account guide](connect-to-hubspot.md) before installed testing.

Preserve original app identity and compatible auth/hosting. A new test app does
not migrate the original installation. Legacy card view migration is irreversible;
a source backup cannot undo it. Follow [cutover gates](cutover-and-recovery.md)
and obtain explicit approval for each sensitive operation.
