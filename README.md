# HubSpot Migration AI Starter

Keep an existing HubSpot integration working as platform requirements change.

**A practical migration blueprint with small examples, not a finished production
migration or a universal converter.** Start offline, then use approved HubSpot
account access to test the replacement and verify the existing installation.
No coding experience is assumed; the guide helps you choose each next step.

## What This Helps You Do

Identify what may need updating, describe the behavior you must preserve, and
plan a small, testable migration. Topics include legacy CRM cards, workflow code,
serverless functions, APIs and authentication.

**Your first result:** Convert made-up legacy-card data and compare old/new
behavior locally. No installed app changes; account state remains unknown.

## Choose Your Starting Point

### I'm New To Coding

Follow [the step-by-step walkthrough](docs/start-here.md). It explains where to
type commands, what success means and how to recover safely.

### I'm Building With AI

Use the prompt below, then choose the relevant [migration recipe](recipes/README.md).
Your assistant should ask one plain-language question at a time.

### I'm A Developer

Jump to [architecture](docs/developer-architecture.md), the
[assessment contract](docs/contracts/assessment.md) and
[recipe support levels](migration-catalog.json). The same approval limits apply.

## Start With Your AI Assistant

Paste this into an assistant that can read the repository files:

```text
Read README.md, AGENTS.md and START_WITH_AI.md.
Help me preserve [describe the existing behavior] during a HubSpot migration.
Start with the offline demo. Explain commands and expected results.
Inspect only my approved source folder, read-only; do not run its scripts.
When account testing is needed, use docs/connect-to-hubspot.md.
Help me choose a test account and preserve working app identity, auth and hosting.
Never ask for secrets or customer data in chat.
Ask approval before packages, account access, uploads, deployment or cutover.
```

[START_WITH_AI.md](START_WITH_AI.md) has the fuller first-conversation prompt;
[AGENTS.md](AGENTS.md) holds canonical coding instructions. Tool-specific files
point there. Automatic loading varies between AI tools. No MCP connection is
needed for the offline checks.

## Try The Safe Example

You need Node.js 24+ and npm; the [walkthrough](docs/start-here.md) records the
tested version and setup guidance. This local runtime is separate from managed
HubSpot and hosting-provider runtimes.

Download and extract the repository. Open a terminal in the folder containing
`README.md` and `package.json`, then run:

```bash
npm run doctor
npm run demo
```

On Windows PowerShell, use:

```powershell
npm.cmd run doctor
npm.cmd run demo
```

No packages, credentials or HubSpot connection are needed for this demo.
The doctor should say `demo mode` and `Installed state: unknown.`;
the demo ends with:

```text
Demo passed. No packages installed, no network calls, no HubSpot migration performed.
```

The commands finish and return to the terminal prompt. This proves only the
documented local behavior, not that your installed integration has migrated.
If a command fails, stop and use [troubleshooting](docs/troubleshooting.md);
do not weaken security settings or enter live credentials to make it pass.

## Connect To HubSpot When You're Ready

Assessing approved local source needs no account connection. Testing an installed
replacement or verifying the actual app does need suitable account access.

Use [the migration connection guide](docs/connect-to-hubspot.md) to choose a
developer test account, check feature/plan availability, and review existing
authentication and hosting. A separate test app can help learning; it is not a
migration of the original app. Do not replace working OAuth or app identity just
to follow an example.

## What Is Included And What Isn't

| Area | Actual support |
| --- | --- |
| [Legacy-card example](examples/legacy-card-migration/README.md) | Runnable offline: small plain-text subset, synthetic data and request-format comparison. Unsupported types/actions stop with an error. |
| [Modern app/card scaffold](examples/legacy-card-migration/modern/README.md) | Illustrative: locally tested renderer; no cloud build, install or view migration verified. Legacy input fixtures must not be deployed. |
| [Workflow example](examples/workflow-node-24/README.md) | Runnable offline: before/after handler-output comparison, not a workflow deployment. |
| [Other recipes](recipes/README.md) | Assessment signals and procedures only, not automatic conversion. |

[Evidence](EVIDENCE.md) and the [example catalog](examples/catalog.json) record
limits. No example currently claims developer-account verification or production
readiness. The doctor uses bounded heuristics, not an account audit; missing
evidence is not a clean bill of health.

## Plan One Migration Safely

1. Inspect only the approved source folder, read-only.
2. Record affected behavior, inspected-source findings and unknowns in a private
   [inventory](templates/inventory.md) and [plan](templates/migration-plan.md).
3. Recheck official requirements, implement a small replacement and test it with
   synthetic data in the approved environment.
4. Verify the exact original app, account, views and behavior before requesting
   separate approval for cutover and later cleanup.
5. Write an honest [verification report](templates/verification-report.md).

**Legacy card view migration cannot be reversed. A source backup does not undo
it.** This toolkit never invokes that migration or deletes cards/flags.
Read [cutover and recovery](docs/cutover-and-recovery.md) and the
[real-migration checklist](REAL_MIGRATION_CHECKLIST.md) before live operations.

Keep secrets and customer data out of chats, GitHub, screenshots and logs.
Use [security guidance](docs/security-for-non-developers.md) and
[approval gates](docs/non-developer-safety-gates.md); successful tests or saved
progress never grant permission for account changes.

## Developer Reference

- [Compatibility](COMPATIBILITY.md) and [migration notices](MIGRATION.md): reviewed versions, deadlines and source limits.
- [Authentication](docs/auth-options.md) and [hosting](docs/hosting-options.md): preserve working choices unless change is necessary.
- [Assessment](docs/contracts/assessment.md), [card](docs/contracts/legacy-card.md) and [progress](docs/contracts/progress.md) contracts.

Run `npm run check:ai`, `npm run check`, `npm test` and `npm run demo` after changes
(use `npm.cmd` on Windows). Report skipped/failed checks and installed evidence
separately.

To save demo progress locally:

```bash
npm run progress -- init --recipe legacy-crm-cards
npm run progress -- show
npm run progress -- check
npm run demo -- --save
```

Only `init` and `demo --save` create files under ignored `.migration-local/`;
they do not overwrite existing reports. Keep the same `--project` path when
checking a real-project snapshot. Saved state is untrusted evidence, not approval.

[Choose your scope](docs/choose-your-path.md) before using companions:
[contact card](https://github.com/Jai-HS-Dev/hubspot-contact-card-ai-starter/tree/dc5cf0d),
[agent tools](https://github.com/Jai-HS-Dev/hubspot-agent-tools-ai-starter/tree/26fe2ac),
or [OAuth](https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter/tree/331841b).
These pinned references are optional, not certified plug-compatible services.

## Help And License

See [troubleshooting](docs/troubleshooting.md) and [best-effort support](SUPPORT.md).
Report vulnerabilities through [SECURITY.md](SECURITY.md) without private data.

Licensed under [MIT](LICENSE); preserve required copyright and license notices.
Builders remain responsible for reviewing, testing, securing and operating their
implementation; see [implementation responsibility](docs/implementation-responsibility.md).
This independent community starter is not affiliated with or endorsed by HubSpot,
and is not a security audit, legal advice or a production guarantee.
