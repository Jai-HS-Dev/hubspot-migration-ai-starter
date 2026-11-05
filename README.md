# HubSpot Migration AI Starter

Migrate existing HubSpot integrations with help from any AI coding tool.

**Guided starter, not a finished production integration.**

**Your first result:** Convert synthetic legacy-card data, compare old and new behavior, and produce a local assessment without changing an installed app. Synthetic card data and request-format parity checks pass. Installed account state stays unknown; no migration or deployment occurs.


For non-developers, vibe coders, and developers. This is a fourth companion to
the card, agent-tool, and OAuth starters: assessment and migration first, not a
replacement for those projects.

## Quick Start

Follow [your first working result](docs/start-here.md): describe your goal, run the
credential-free mock, choose auth/hosting only if needed, make one small change,
and verify what is still unfinished. No account connection is needed to begin.

Using an assistant? Open [START_WITH_AI.md](START_WITH_AI.md). It should ask one
plain-language question at a time. The walkthrough includes Windows commands,
expected output, stop instructions and [safe recovery](docs/troubleshooting.md).

Experienced developers can jump to [architecture](docs/developer-architecture.md)
and [the contract](docs/contracts/assessment.md); the same evidence and safety limits apply.

## Pick Your Path

| You want | Start here |
| --- | --- |
| A first result without coding experience | [One offline walkthrough](docs/start-here.md) |
| An existing integration to assess | The same walkthrough, then the approved source folder and [recipe](recipes/README.md) |
| Developer contracts and implementation | [Architecture](docs/developer-architecture.md) and [assessment contract](docs/contracts/assessment.md) |

Start without account access. Repository samples are not proof that a feature is
installed. [Choose your scope](docs/choose-your-path.md); don't combine all companions
or replace working authentication merely to follow the demo.

## What Is Actually Implemented?

See [EVIDENCE.md](EVIDENCE.md) for verification limits and the optional UI project.

| Migration | Evidence in this release | Live verified? |
| --- | --- | --- |
| Legacy CRM cards | Offline adapter, matching React card scaffold, data/render parity and failure tests | No |
| Workflow Node.js 24 | Small before/after handlers with output-parity tests | No |
| Design Manager functions | Assessment signals and reviewed procedure only | No |
| Date-based CRM APIs | Source-pattern assessment and migration procedure only | No |
| Legacy apps/authentication | Modern metadata hints and manual review procedure only | No |

The card example supports a deliberately small plain-text subset. It is **not a
universal converter or account-verified deployment**. A synthetic React project
is in `examples/legacy-card-migration/modern/`; its metadata matches the reviewed
2026.09 schemas. Unsupported actions/types stop
with an error. Use the official converter and the card starter to implement the
chosen replacement, then test it in the original app's developer environment.

## Example Labels

[examples/catalog.json](examples/catalog.json) lists every example and its limits.
**Runnable locally** means the stated mock/offline check runs after its documented
setup. **Illustrative** means a pattern or scaffold, not a complete runnable or
deployable integration. **Developer-account verified** requires recorded installed
evidence; none of these examples currently claims it. **Production prerequisites**
are work to review, not a certification or an included production service.

| Example | Status | What the local evidence covers |
| --- | --- | --- |
| [examples/legacy-card-migration](examples/legacy-card-migration/README.md) | Runnable locally | Offline adapter and synthetic fixtures. Legacy inputs are non-deployable. |
| [examples/legacy-card-migration/modern](examples/legacy-card-migration/modern/README.md) | Illustrative | Synthetic app/card project scaffold with a locally tested renderer; no cloud build, install or view migration verified. |
| [examples/workflow-node-24](examples/workflow-node-24/README.md) | Runnable locally | Offline handler-output parity only; legacy handler is a non-deployable input fixture. |

Use [EVIDENCE.md](EVIDENCE.md) for the current verification record. Every example's
README also states its status and points to the remaining live-use checklist.

## One Migration Process

1. Inspect the approved source folder read-only.
2. Classify findings as affected, not affected in inspected source, or unknown.
3. Recheck official sources and create a [plan](templates/migration-plan.md).
4. Make and test small local changes with synthetic data.
5. Verify the exact app/account/environment and request explicit live approval.
6. Verify installed behavior and write an honest [completion report](templates/verification-report.md).

Legacy card **view migration cannot be reversed**. A source-code backup does not
reverse it. Nothing in this toolkit invokes the migration API or deletes flags/cards.
See [cutover gates](docs/cutover-and-recovery.md) before planning that operation.

## Resume Without Carrying Secrets

```bash
npm run progress -- init --recipe legacy-crm-cards
npm run progress -- show
npm run progress -- check
npm run demo -- --save
```

Only `init` and `demo --save` create files, under ignored `.migration-local/`.
They never overwrite existing reports. Use the same `--project` path when checking
a real-project snapshot. Saved state is editable, untrusted local evidence:
it never grants approval or proves deployment. [Progress contract](docs/contracts/progress.md).

## Familiar Companion Repositories

- [Contact-card starter](https://github.com/Jai-HS-Dev/hubspot-contact-card-ai-starter/tree/dc5cf0d): card UI and backend choices.
- [Agent-tools starter](https://github.com/Jai-HS-Dev/hubspot-agent-tools-ai-starter/tree/26fe2ac): optional reuse of existing tool endpoints.
- [OAuth starter](https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter/tree/331841b): secure installation/token lifecycle patterns.

These pinned references are for comparison, not certified plug-in compatibility.
Do not replace working auth or force an agent-tool integration to migrate a card.

## Current Guidance And Limits

Sources reviewed **2026-11-04**. Project baseline `2026.09`; date-based API baseline
`2026-09`. The local Node.js 24 requirement is separate from managed project
functions and provider-specific runtimes. See [COMPATIBILITY.md](COMPATIBILITY.md)
and [MIGRATION.md](MIGRATION.md) for deadlines and source-review limits.

The doctor uses bounded heuristics, not an AST or account audit. It excludes
credentials, symlinks, tests, fixtures, and examples inside an inspected project.
Access failures and incomplete evidence are not a clean bill of health.

## License And Implementation Responsibility

MIT licensed; retain the notices in [LICENSE](LICENSE). Educational reference,
provided as-is, not an official HubSpot product, security audit, compliance
certification, or production guarantee. Review [implementation responsibility](docs/implementation-responsibility.md)
and [REAL_MIGRATION_CHECKLIST.md](REAL_MIGRATION_CHECKLIST.md) before live use.
