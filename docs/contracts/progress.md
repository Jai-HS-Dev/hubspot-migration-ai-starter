# Progress And Completion Contract

Only progress init and demo --save write local artifacts, under .migration-local
inside the toolkit. Existing files are never overwritten. Review/archive them
explicitly before starting a new run. Never commit or post filled local reports.

progress init saves schemaVersion, recipeId, target/source/catalog fingerprints and
fixed local-status values. progress show validates fields and returns only bounded
known fields. progress check requires the same explicit --project selection and
compares fingerprints, including the canonical target folder. An identical copy
in a different folder is stale rather than a silent target switch. Exit 2 means
stale; exit 1 means missing/invalid state.

A matching fingerprint proves neither user approval nor a completed migration.
Files are editable and untrusted. Live authorization is always not-granted, account
verification unknown and deployment not-performed. Do not put instructions, secrets,
customer records or credentials into the state file.

The demo receipt records which synthetic checks ran. It never sets live success.
For an actual project, complete templates/verification-report.md locally and use
supported account evidence after explicit approval. A receipt is not certification.
