# Legacy App Architecture And Authentication

**Support:** manual guidance and modern local-metadata hints only. No live app discovery.

1. Establish the original app and installed environments using supported account
   evidence. A modern hsproject.json does not prove the installed app migrated.
2. Inventory OAuth/static/service-key context, scopes, webhooks, cards, actions,
   callbacks, token storage and uninstall behavior privately.
3. Recheck the official app migration path for this architecture. Preserve app
   identity where required; do not create a new app just to remove a warning.
4. Review API and app-platform migrations separately. Do not infer one from another.
5. Plan compatible scope/metadata/install changes and account consent, with explicit
   approval. Never rotate encryption keys or discard stored tokens incidentally.
6. Validate in a developer account with synthetic data and acceptance tests.
7. Approve each deployment, consent, cutover and cleanup action separately, then
   verify actual installations rather than treating local metadata as proof.

A Remote MCP auth connector is not the OAuth client for every backend app.
Use the companion OAuth starter for concepts, not as a drop-in credential store.
[Official migration overview](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/overview).
