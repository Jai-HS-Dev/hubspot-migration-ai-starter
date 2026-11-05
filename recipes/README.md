# Choose A Migration Recipe

Do not guess from a repository name. Use evidence and migration-catalog.json.

| Recipe | When to review |
| --- | --- |
| [Legacy CRM cards](legacy-crm-cards/README.md) | Existing legacy definition/card needs a modern UI extension |
| [Workflow Node.js 24](workflow-node-24/README.md) | An installed custom-code action uses an old runtime/handler |
| [Design Manager functions](design-manager-functions/README.md) | Existing legacy serverless functions and their callers |
| [Date-based APIs](date-based-apis/README.md) | Older CRM endpoint paths and response contracts |
| [Legacy apps](legacy-apps/README.md) | App architecture, installation identity and auth migration |

Card and workflow recipes have limited offline contract examples. The others are
guidance-only. None is live-account verified by this toolkit.
