# Choose Your Scope

## Start With Mock-Only Learning

Use [the same beginner path](start-here.md) first. No HubSpot app, real account,
credentials, hosting or package installation is required for the first mock result.
Synthetic card data and request-format parity checks pass. Installed account state stays unknown; no migration or deployment occurs.

## What This Starter Owns

Convert synthetic legacy-card data, compare old and new behavior, and produce a local assessment without changing an installed app. It is a guide and a small example, not an operated service, a complete
production app, or a promise of an adapter for every AI tool and hosting provider.

## When You Do Not Need It

You are building a new tool or card with nothing to migrate, or your source does not show a relevant migration need. Do not introduce OAuth, a new backend or another starter just to finish
a static/mock example or replace an existing reviewed implementation.

## Add Only The Responsibility You Need

| Need | Smallest relevant starting point |
| --- | --- |
| Tool/workflow endpoint behavior | [Agent-tools starter](https://github.com/Jai-HS-Dev/hubspot-agent-tools-ai-starter) |
| Contact-record UI | [Contact-card starter](https://github.com/Jai-HS-Dev/hubspot-contact-card-ai-starter) |
| Reusable installation/token lifecycle learning | [OAuth starter](https://github.com/Jai-HS-Dev/hubspot-oauth-service-ai-starter) |
| Preserve an existing integration through a migration | This starter's [migration recipes](../recipes/README.md) |

Companions are optional references, not plug-compatible services you must install
together. Each one has its own setup and evidence limits. Preserve working app
identity, authentication and hosting unless the goal requires a change.

## Only Then Plan A Developer Trial

Choose minimum data and scopes with [auth guidance](auth-options.md) and
[hosting guidance](hosting-options.md). Confirm prerequisites in [compatibility](../COMPATIBILITY.md).
A hosted demo is still a test, not production approval. Do not connect an account,
publish, deploy, change permissions or mutate records without explicit approval
for the target and operation. Start with approved synthetic data.

## Real-Use Responsibility

A private inventory and approved plan for the actual source, installed account evidence, unsupported behavior mapping, developer tests and a separately approved cutover. Keep verification distinct from generated code or local tests.
Read [implementation responsibility](implementation-responsibility.md) and the
[checklist](../REAL_MIGRATION_CHECKLIST.md).
