# Troubleshooting

| Observation | Safe next step |
| --- | --- |
| node/npm not found | Ask for supported installation guidance; no remote install scripts are included |
| PowerShell blocks npm | Try npm.cmd; do not weaken execution policy |
| doctor says unknown | Review scope/exclusions and obtain missing evidence; do not mark it clean |
| stopped safely | Check --help, accessible folder, valid date/recipe, and existing local report |
| local report already exists | Review/archive it explicitly; the toolkit deliberately never overwrites it |
| progress check exits 2 | Re-assess and review the plan; the inspected source or catalog changed |
| callback is not a function | Follow the workflow Node.js 24 recipe; repository edits alone do not update HubSpot |
| unsupported action/type | Map it explicitly using official references; don't silently omit it |
| a permissions request fails | Record installed state as unknown; don't extract tokens or broaden scopes |
| security tests skipped for symlinks | Report the skip; rerun on a permitted test environment before relying on that coverage |

Raw input/error messages are not printed to avoid leaking paths or malformed private
content. The doctor is deliberately local and cannot fix missing HubSpot access.

## First-Run Recovery

Start at the first failed step in [the walkthrough](start-here.md). Keep mock mode.
Do not paste full logs, environment files, account IDs, private URLs, tokens,
customer records or unredacted screenshots into chat or a public issue.

| What you see | What it means | Safe recovery |
| --- | --- | --- |
| node or npm is not recognized | Runtime missing or terminal opened before installation | Use the official Node download path in the walkthrough; reopen the terminal and check versions. No random install scripts. |
| npm.ps1 cannot run because scripts are disabled | PowerShell selected its script wrapper | Use npm.cmd for the same command. Do not change global execution policy. |
| package.json not found / ENOENT | Wrong working folder | Open the extracted folder containing README.md and package.json; run the command from that root. |
| Missing script | Wrong repository, older download or wrong folder | Compare package.json scripts and UPGRADE_NOTES/EVIDENCE where present. Do not add dependencies blindly. |
| Unsupported Node/runtime | Local version does not match this example | Compare node --version with package.json and COMPATIBILITY.md. Local and managed HubSpot runtimes are separate. |
| EADDRINUSE / address already in use | Example could not use its local port | Stop only a known example in its own terminal with Ctrl+C, then retry once. Do not kill unknown processes, disable a firewall or create a tunnel. |
| Smoke command returns the prompt | The short script has finished | This is expected. Look for the documented success line; it does not leave a preview server running. |
| The demo passed but nothing appeared in HubSpot | Local checks do not install an app | Expected. Finish the blueprint and choose a separately approved developer trial; do not upload merely to make the demo look complete. |
| 401/403, missing scope or invalid signature in a later live trial | Authentication or authorization has not passed | Stop that live operation; review the exact caller, registered app and selected configuration privately. Never disable validation or widen permissions to bypass it. |
| Check fails or a test is skipped | Local evidence is incomplete | Keep the exact failure/skip visible. Use a synthetic reproduction and request help; do not label it passed. |

## Stop And Ask For Help When

The next step would require secrets in chat, customer data, unknown access,
installing unreviewed code, disabling a safeguard, changing a live account, public
exposure or an irreversible operation. Continue safe mock work while that decision
is pending. Approval must name the operation and intended environment.

Use [SUPPORT.md](SUPPORT.md) with the command name, version and a synthetic
reproduction. Explain what you expected versus what happened, without full
transcripts or sensitive data. A generic error is not permission to extract tokens.
