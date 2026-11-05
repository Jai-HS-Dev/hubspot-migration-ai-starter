# Design Manager Functions To Developer Projects

**Support:** source-assessment signals and guidance only. No automated conversion
or live-account verification.

1. Inventory each actual Design Manager function and its page/template/module
   callers, endpoints, runtime, secrets, response shapes and error behavior.
2. Distinguish these from functions already in supported Developer Projects.
3. Recheck editing/shutdown deadlines and product entitlements. Local Node is not
   the runtime selector for HubSpot-managed project functions.
4. Plan function groups and the smallest caller changes. Preserve unrelated site
   code. Confirm the project's auth model supports the required function features.
5. Fetch current schemas; map metadata, async return responses, parameters,
   request body, headers, secrets, dependencies, timeout and limits explicitly.
6. Test responses and every caller with synthetic inputs in an approved dev account.
7. Approve upload and caller cutover separately. A URL-only text replacement is
   not a migration. Keep a tested code/caller recovery plan while the old service
   remains available; do not promise rollback after its execution shutdown.

The dated notice lists November 17, 2026 edit restrictions and February 1, 2027
shutdown. A current Worker backend is not a Design Manager function.
[Official guide](https://developers.hubspot.com/docs/cms/reference/serverless-functions/migrate-design-manager-serverless-to-projects).
