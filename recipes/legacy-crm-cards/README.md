# Legacy CRM Card To App Card

**Support:** offline adapter/format contract tests. No live migration verified.
The example includes a synthetic React project scaffold, not a universal converter
or a verified installed migration. See the modern example README before setup.

## Does This Apply?

A legacy card definition with fetch/display properties is a local candidate, not
proof of an installed legacy card. Confirm the app and affected users separately.
Existing modern app cards do not need a legacy view migration merely because
they display contacts or tickets.

## Safe Walkthrough

1. Read the current official guide below and check the migration tool window.
2. Inventory existing app identity, objects, locations, data columns, actions,
   auth, URLs and permission behavior privately. Do not paste raw exports in chat.
3. Run npm run demo. Compare examples/legacy-card-migration/legacy with modern.
4. Map every required feature. This adapter supports STRING columns only and
   rejects unsupported actions/types rather than losing them.
5. Plan a replacement using the official converter or the companion card starter.
   Fetch current schemas and confirm auth/feature/entitlement compatibility.
6. Keep the existing backend where suitable. Test old form/new JSON action formats
   behind signature verification and server-side identity checks. The demo parser
   is not signature verification and executes no requests.
7. Use the modern React example to verify rendered labels, values and safe links.
   For a real backend, add loading/error/setup/permission states using the companion
   card starter; the static example itself makes no requests.
8. Add/test it in the original app's developer environment only with approval.
   Upload success is not installation or view-migration verification.
9. Follow docs/cutover-and-recovery.md for separate flag, view and cleanup approvals.
   Card view migration cannot be reversed. Never run it merely to test a converter.

## Mapping Worksheet

| Legacy behavior | Replacement decision | Evidence needed |
| --- | --- | --- |
| Display fields/results | View model and escaped UI components | Local parity test, then authorized installed display check |
| Empty data | Empty state, not a crash | Local contract test |
| Action hooks | Reviewed server adapter and UI confirmation | Auth/signature/idempotency and failure tests |
| Dynamic title/settings/iframe | Explicit UI mapping | Review converter differences; do not assume identical behavior |
| Ticket/help desk placement | Separate CRM/helpdesk cards where needed | Current schema, compatible locations and actual views |
| Existing user views | Official migration procedure | Approved irreversible cutover and installed verification |

The guide lists November 2, 2026 legacy view removal and December 1 migration tool
availability. After the window, recheck current supported recovery guidance instead
of blindly retrying a retired API.

## Official References

- [Migration guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards)
- [Official converter and differences](https://github.com/HubSpot/ui-extensions-examples/tree/main/legacy-card-converter)
- [Companion card starter](https://github.com/Jai-HS-Dev/hubspot-contact-card-ai-starter/tree/dc5cf0d)
