# Worked Exercise: Preserve A Support Label

**Scope:** Offline synthetic migration. No installed app, account or views change.
You will preserve a meaningful label and record what the assessment cannot prove.

## 1. See The Starting Point

From the toolkit root:

```bash
npm run doctor
npm run example:guided
```

Use `npm.cmd` on Windows. No package install or account connection is needed.
The named check is:

```text
worked migration preserves a custom label without claiming installed verification
```

It changes a synthetic legacy definition in memory, converts it with the existing
adapter and verifies that the label and value survive. It writes no source files.

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

## 3. Build A Private Inventory And Plan

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

## 4. Keep Cutover Separate

The offline doctor uses bounded source heuristics. Missing evidence is not
evidence that the account is unaffected. Select a [recipe](../recipes/README.md)
and use [the account guide](connect-to-hubspot.md) before installed testing.

Preserve original app identity and compatible auth/hosting. A new test app does
not migrate the original installation. Legacy card view migration is irreversible;
a source backup cannot undo it. Follow [cutover gates](cutover-and-recovery.md)
and obtain explicit approval for each sensitive operation.
