# Hosting Options

Preserve the current host unless a required migration makes a change necessary.

HubSpot Developer Projects, external serverless endpoints, long-running services,
Cloudflare Workers, Vercel and other hosts are possible depending on the existing
app, auth model, product entitlements and endpoint needs. This toolkit needs none.

A Design Manager function migration is not an instruction to move an unrelated
Cloudflare backend. HubSpot project runtime, workflow runtime and local Node are
different surfaces. Test provider-specific APIs and request signatures separately.

Before an approved deployment, verify secret storage, durable token storage,
request validation, rate limits, logs, target identity, build configuration and
rollback behavior. Keep adapters thin and business contracts independent of host.
