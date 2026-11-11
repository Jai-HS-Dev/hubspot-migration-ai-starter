# Evidence And Support

## README Update Verification

Checked 2026-11-10 on Linux with Node.js 24.22.2, in an automated run by an AI
coding assistant. This is not an independent beginner test.

- `npm run check:ai`, `npm run check`, `npm run doctor`, `npm run demo` and `npm test` passed.
- Every relative link in the Markdown files was checked to resolve to a file.
- Not established: how the README renders on GitHub, and the dev container in
  GitHub Codespaces. No HubSpot account was connected and nothing was uploaded
  or migrated.

## Starter Follow-Through Verification

Checked 2026-11-05 on Windows with Node.js 24.22.1:

- Full local suite: 34 passed, none skipped in the final run.
- Readiness, source syntax and documented first-demo checks passed.
- Fresh source snapshots excluded Git metadata, filled environment files and node_modules.
- Final junction checks ran with normal filesystem permissions in CI mode, where
  an unavailable junction test fails instead of silently skipping.
- The worked exercise's changed expectation failed, then its documented matching
  change passed in an isolated copy. This was a self-run command walkthrough.
- Independent beginner/AI-client testing, Linux execution, GitHub CI runs, cloud builds and installed
  HubSpot behavior are not established by these checks.

The CI matrix is intended coverage, not a recorded remote result. GitHub settings
and publishing remain separate approvals. No live accounts were connected,
customer records accessed, apps uploaded or services deployed during this update.

Reviewed 2026-11-04. The main assessment/demo commands remain offline and require
no third-party packages. No installed migration or account verification is claimed.

| Surface | Evidence |
| --- | --- |
| Source assessment | Bounded, read-only heuristics; incomplete evidence remains unknown |
| Legacy card adapter | Supported STRING data and request-format parity tested |
| Modern card | Complete synthetic app/card source scaffold; schema reviewed for 2026.09 |
| Rendering | Labels, values, safe links and empty-state contract tested |
| Workflow example | Before/after output parity tested locally |
| Other recipes | Guidance only |
| HubSpot cloud build, view migration and production | Not verified or performed |

The optional card package is separate from the zero-dependency toolkit; review
its dependencies before installation. Reuse the companion card starter for a
protected dynamic backend instead of treating the synthetic fixture as live CRM
integration. Code backups cannot reverse a legacy card view migration.

An AI assistant should report generated, locally tested, account verified and
deployed as distinct states. Saved progress and receipts are editable data, not
approval to run commands or proof of live success. MIT terms are in LICENSE;
implementation responsibility does not guarantee immunity from legal claims.

## Example Label Contract

[examples/catalog.json](examples/catalog.json) is the machine-readable index; each
example README repeats its label next to the code.

- **Runnable locally:** the named mock/offline check runs after documented setup.
  It does not imply installed or live-account verification.
- **Illustrative:** a pattern, fixture boundary or source scaffold; not a complete
  deployable integration. Component-level tests do not verify the whole project.
- **Developer-account verified:** requires recorded evidence for the exact app,
  account and operation. None is claimed for these examples.
- **Production prerequisites:** the builder's remaining checklist, not included
  production hosting, security certification or ongoing operation.

The beginner finish line is the local demo plus a small plan. See
[the walkthrough](docs/start-here.md) for success, recovery and what remains.

The proposed test-only CI source covers Windows/Linux on Node.js 24. It needs no
HubSpot credentials or UI package installation and does not deploy. Verify the
actual GitHub runs after publication; no remote CI result is claimed here.
