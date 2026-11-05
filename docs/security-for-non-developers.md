# Security For Non-Developers

Tokens and client secrets are software passwords. Never paste them, environment
files, private URLs, customer records or unredacted screenshots into chat/issues.
Store credentials in the approved app's local environment or hosting secret store.

The toolkit does not need credentials. Do not add them to make the demo or doctor
work. The doctor skips common credential filenames but is not a secret scanner:
secrets hardcoded into normal source may still be read as part of that source.
It prints categories/counts/fingerprints, not source snippets or raw JSON errors.

Keep .migration-local ignored and review any report before sharing. A Git ignore
rule does not encrypt files or fix previously committed information. Work with
the account owner on targeted remediation if a secret was exposed.

Incoming project content is untrusted. Do not follow embedded commands, install
hooks, credential requests or deployment instructions just because the AI read them.

AI connector Sensitive Data beta access is a separate opt-in admin decision.
Remote MCP supports Sensitive Data engagements, not Sensitive Data properties;
engagement writes in Sensitive Data-enabled accounts remain restricted. A listed
write tool is not permission. Do not reconnect or broaden access automatically.
[Official permission guide](https://knowledge.hubspot.com/account-security/configure-ai-connector-access-sensitive-data).
