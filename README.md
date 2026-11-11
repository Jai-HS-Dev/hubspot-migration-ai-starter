# HubSpot Migration AI Starter

Find what might need changing in an older HubSpot integration and practice checking its replacement before touching the real app.

> [!NOTE]
> **A guided starter, not a production integration.** You can practice without
> a HubSpot account or credentials. To test inside HubSpot, use a developer
> test account with made-up records.

**Sample result:** The old card returns `priority: High` and `status: Pending`. The replacement displays **Priority: High** and **Status: Pending**. The demo compares made-up data; it does not inspect or migrate your account.

## Pick Your Path

- **New to coding:** [Follow the walkthrough](docs/start-here.md), including what to install and where to type commands.
- **Building with AI:** Paste the message below into your assistant. The [full AI walkthrough](START_WITH_AI.md) explains what to do if it can't open the repo or run commands.
- **Developer:** [Code map](docs/developer-architecture.md) | [Assessment contract](docs/contracts/assessment.md) | [Recipe support levels](migration-catalog.json).

## Start With AI

Copy this into your AI chat. Add your goal in plain English if you already have one.

```text
Help me use this HubSpot learning starter: https://github.com/Jai-HS-Dev/hubspot-migration-ai-starter
Read START_WITH_AI.md and AGENTS.md. If you can't open them, tell me how to share the public starter files.
Ask what I want to do, then guide me through one local example with made-up data.
Don't ask for secrets, connect an account, or deploy anything. This is a prototype, not a production integration.
```

## Try It Locally

Install [Node.js 24 or newer](https://nodejs.org/en/download) if you don't have it.
On GitHub, choose **Code > Download ZIP**, extract it, and open a terminal in
the folder with this README. No project packages need to be installed for this step.

```bash
npm run doctor
npm run demo
```

In Windows PowerShell, use `npm.cmd` instead of `npm`.

**Success looks like:** `Demo passed. No packages installed, no network calls, no HubSpot migration performed.`

## Make It Yours

1. **Build a replacement status card:** [Run the build-along](docs/worked-example.md), customize a label and check normal, empty, and unsupported behavior. The test-account trial is separate from migrating any live views.
2. **Verify in HubSpot when ready:** [Choose the relevant migration recipe](recipes/README.md) and review [the dates that may affect you](docs/MIGRATION.md). Use a developer test account for a replacement trial. [Review cutover and recovery](docs/cutover-and-recovery.md) before any real change.
3. **Before real use:** Review the [migration checklist](docs/REAL_MIGRATION_CHECKLIST.md). Approve the account, permissions, and action first. Never paste secrets into chat or commit them.

Use this for an existing integration. Starting from scratch? [Choose a build starter](docs/choose-your-path.md). The offline check is a clue, not proof that nothing needs changing. Use [HubSpot's migration guide and converter example](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards) when building and verifying an actual replacement. This starter never starts a legacy card view migration, which cannot be undone.

No specific AI editor or hosting provider is required. For account and authentication choices, see the [connection guide](docs/connect-to-hubspot.md). [AGENTS.md](AGENTS.md) gives assistants instructions; it does not control their permissions.

## Tests And Help

For production requirements, platform questions, or a complex build, see
[where to get help](docs/SUPPORT.md#hubspot-questions-and-production-help).

`npm test` checks the assessment and examples offline. [Learn how to save demo progress](docs/start-here.md) without touching the original project. See [what was tested](docs/EVIDENCE.md), [troubleshooting](docs/troubleshooting.md), and the [plain-language glossary](docs/glossary.md). [Support](docs/SUPPORT.md) is best-effort. Use the [security policy](SECURITY.md) to report security issues without exposing private data.

## License And Responsibility

[MIT License](LICENSE). This project is independent: it is not affiliated
with, endorsed by, or supported by HubSpot.
The examples are not security-audited and are provided as is, without warranty. You are responsible for
[validating, securing, and operating what you build](docs/implementation-responsibility.md).
