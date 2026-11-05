# Authentication Options

No auth is required for this toolkit's checks, tests, demo or progress commands.

For the actual integration, inventory the existing installation model and required
operations. Preserve working OAuth/token storage and app identity unless the
migration guide requires a change. Changing scopes, installs or auth models is a
separate account-affecting operation with explicit approval and verification.

For a new reusable/multi-account integration, evaluate OAuth. For eligible
single-account system integrations, evaluate scoped Service Keys using current
official documentation. Existing private tokens are migration context, not a
reason to create a new legacy private app.

Keep token exchange, refresh, encryption, request signatures and authorization
server-side. The demo action normalizer is only a parser; it authenticates nothing.
Never trust caller-provided app/account/user IDs as verified identity.

Do not assume an OAuth app can use every HubSpot serverless feature. Check current
auth/feature compatibility, scopes, entitlements and schemas for the exact target.
See the companion OAuth starter rather than duplicating credential infrastructure.
