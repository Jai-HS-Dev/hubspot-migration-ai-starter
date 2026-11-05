# Legacy CRM APIs To Date-Based APIs

**Support:** local pattern assessment and guidance only. No universal URL rewrite.

1. Inventory endpoints and consumers, including deployed callers absent from source.
2. Read each current endpoint reference: path position, auth, pagination, request,
   response, association semantics, limits and warnings can change independently.
3. Keep contract fixtures and test one client/operation at a time.
4. Preserve conditional/creation-property validation details without blind retries.
   Required creation associations are currently UI-only; keep links your app
   requires explicit and verified. User-level association permissions are separate.
5. Preserve successful IDs and normalization warnings. Explain partial multi-system
   success and prevent duplicate writes rather than retrying everything.
6. Deploy only with target-specific approval; verify recent live usage separately.
   Old migration dashboard history can remain after a source update.

Reviewed examples: /crm/objects/2026-09/{type}, /crm/owners/2026-09 and
/crm/properties/2026-09/{type}. Confirm the endpoint rather than globally replacing
v3 with a date. OAuth and app-architecture changes are separate migrations.

Pipelines v1 shutdown is December 4, 2026; v4 support ends March 30, 2027; the
general v1-v3 support window is September 2027. Unsupported is not universally an
immediate shutdown. Recheck endpoint-specific notices before acting.

[Versioning](https://developers.hubspot.com/docs/developer-tooling/platform/versioning).
[Corrected validation notice](https://developers.hubspot.com/changelog/crm-api-write-validation-enforcement).
