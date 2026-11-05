# Developer Architecture

This is an offline migration workbench, not a network service or deployable HubSpot app.

- src/assessment.mjs: bounded local discovery and evidence classification.
- src/catalog.mjs: recipe metadata, reviewed sources and calendar warnings.
- src/legacy-card.mjs: pure supported-subset adapter and action payload parser.
- src/progress.mjs: ignored local state, exclusive writes and fingerprint checks.
- scripts/: explicit CLI boundaries; no external command execution during discovery.
- examples/: synthetic legacy inputs and modern outputs.
- tests/: contract, negative, scanner, state, CLI and workflow parity tests.
- templates/: private inventory/plan/verification documents to complete locally.

Keep discovery read-only. No source evaluation, fetching target URLs, dependency
installation or credential fallback. File-name and regex heuristics are not an AST
audit. Avoid extending them into unsafe universal conversion.

There are no third-party dependencies. New packages need explicit approval and
review. No active GitHub Actions workflow, hooks or MCP connection is installed;
docs/maintainer-checklist.md describes enabling CI in a separately approved change.
