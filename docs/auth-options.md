# Authentication Options

No auth is required for this toolkit's checks, tests, demo or progress commands.

For a real account test, follow
[the migration connection guide](connect-to-hubspot.md). It separates offline
assessment, developer-account testing, original-installation verification and
cutover approval.

For the actual integration, inventory the existing installation model and required
operations. Preserve working OAuth/token storage and app identity unless the
migration guide requires a change. Changing scopes, installs or auth models is a
separate account-affecting operation with explicit approval and verification.

For a new reusable/multi-account integration, evaluate OAuth. For eligible
single-account system integrations, evaluate scoped Service Keys using current
official documentation. Existing private tokens are migration context, not a
reason to create a new legacy private app.

For a project-based app restricted to one account, static app authentication may
be appropriate where the selected feature supports it. Service Keys are for
eligible REST data access, not a replacement for app cards or webhooks. Check
[app authentication](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/overview)
and [Service Key limits](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys).
Do not replace working OAuth merely because another option exists.

Keep token exchange, refresh, encryption, request signatures and authorization
server-side. The demo action normalizer is only a parser; it authenticates nothing.
Never trust caller-provided app/account/user IDs as verified identity.

Do not assume an OAuth app can use every HubSpot serverless feature. Check current
auth/feature compatibility, scopes, entitlements and schemas for the exact target.
See the companion OAuth starter rather than duplicating credential infrastructure.
