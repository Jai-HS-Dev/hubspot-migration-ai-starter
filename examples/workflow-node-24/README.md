# Workflow Handler Parity

**Example status:** Runnable locally.
**Local check:** `npm run test` from the repository root, after the documented setup.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../docs/REAL_MIGRATION_CHECKLIST.md) and [evidence](../../docs/EVIDENCE.md); no production implementation is included.

Offline handler-output parity only; legacy handler is a non-deployable input fixture.


legacy.cjs is a non-deployable callback input fixture for Node.js 24.
modern.cjs returns the same outputFields asynchronously.

npm test compares both output paths using synthetic inputs. It does not select a
runtime in HubSpot or exercise the managed runtime's supplied libraries. Apply the
workflow recipe to the actual business code and installed action separately.
