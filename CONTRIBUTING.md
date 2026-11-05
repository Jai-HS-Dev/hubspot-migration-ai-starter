# Contributing

Keep changes small, synthetic and source-backed. Match existing instructions,
contracts and support labels. Add tests for changed behavior and failure cases.
Never include private platform details or production data.

Run npm run check:ai, npm run check, npm test and npm run smoke:example.
Test Windows path behavior as well as POSIX where possible. Do not weaken skipped
security tests or secret checks to obtain a green result.

Legacy fixtures belong under clearly named input directories. Modern output must
not acquire obsolete paths or callback handlers. Do not add install hooks, online
telemetry, active CI/CD workflows, MCP connections or live migration commands
without a separate explicit review and approval.

All imported third-party source needs license/attribution review. This release
links to the official converter instead of copying its implementation.
