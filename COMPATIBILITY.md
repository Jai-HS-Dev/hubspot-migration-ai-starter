# Compatibility

Reviewed on 2026-11-04. Recheck current official sources before changing live systems.

| Surface | Baseline or limit |
| --- | --- |
| This toolkit | Node.js 24+; Node built-ins only; no install required |
| HubSpot project examples to generate | Current reviewed platform 2026.09; fetch current schemas first |
| HubSpot project functions | Platform 2026.03/2026.09 manages Node.js 24; local Node is independent |
| Workflow custom code | Runtime selected per action; async return contract, not callbacks on Node.js 24 |
| External hosts | Preserve the current provider and verify its runtime independently |
| AI clients | Must be able to read files; optional CLI/MCP capabilities are not assumed |
| Authentication | None for the toolkit; live access is a separate reviewed decision |
| Platform publishing | No deployment, cutover or account-write command is included |

## Support Evidence

The executable card example tests a small plain-text data adapter and form/JSON
business-field parsing. The matching React project scaffold renders the synthetic
model; parity tests cover labels, values, links and empty state. It does not upload
a card, authenticate a request, implement arbitrary actions, or migrate installed views.
The workflow example verifies output parity, not actual managed-runtime execution.
Other recipes are guidance-only. No live-account migration is claimed.

The official converter sample may contain an older project baseline. Do not copy
its version/configuration blindly; compare it with current documentation and schemas.

The doctor is heuristic and bounded. Unknown means more evidence is needed.
This release does not determine product entitlements or actual workflow runtimes.
See docs/contracts/assessment.md for exact exclusions.
