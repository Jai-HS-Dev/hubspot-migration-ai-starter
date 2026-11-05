# Assessment Contract

schemaVersion is 1. The doctor emits a report with mode, reviewed/assessed dates,
source, canonical-project-path and catalog fingerprints, coverage, findings and
explicit installedState. The path itself is not printed.

| Status | Meaning |
| --- | --- |
| affected | A heuristic found a legacy-shaped local artifact; review the candidate |
| not-affected-in-inspected-source | Eligible modern patterns found and no conflicting inspected signal; not an account-wide assurance |
| unknown | Insufficient evidence, unsupported shape or incomplete coverage |

Installed state always remains unknown. No credentials or live changes are involved.

## Scope And Limits

Explicit project folder only. Read JSON and JS/TS-family files, at most 500 files,
256 KiB per file, 3,000 directory entries and 30 nested levels. Skip symlinks,
common credential files, hidden directories, .git, node_modules, tooling credential directories,
.migration-local, build outputs, tests, fixtures and examples below the target.
The default target is a synthetic fixture root, labelled demo mode.

Unreadable/malformed/oversized files, limits and symlinks mark incomplete coverage.
Deliberate exclusions are counted. Source comments and strings can match patterns;
this is not an AST/runtime analyzer. Callback detection recognizes only the
documented event/callback shape, not every possible workflow implementation.

Output includes no raw source, paths or property values. Fingerprints identify only
the inspected files, not credentials, excluded files or installed account state.
Do not use the report as a security audit or migration authorization.

--as-of accepts a real YYYY-MM-DD calendar date. Dates yield warnings to recheck
sources; they do not establish that any migration API is available or safe to call.
Exit 0 means assessment produced, including unknowns. Exit 1 means command stopped,
not that the target is safe. Source edits and account verification are separate.
