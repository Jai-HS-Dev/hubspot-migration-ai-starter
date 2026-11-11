# Start With AI

You can start with the public GitHub link. You do not need a HubSpot login,
credentials, an MCP connection or a hosting account for the first exercise.

| What your assistant can do | How to start |
| --- | --- |
| Read GitHub links | Paste the prompt below with the public repository link. Ask it to name the files it could read. |
| Read project folders | Download the public repository ZIP, extract it, and open that folder in your coding tool. Then paste the prompt. |
| Only read chat or attachments | Share the public `README.md`, `START_WITH_AI.md` and `AGENTS.md`. Share the public walkthrough if asked. Never attach a private project, `.env` file or CRM export. |

Use the same version for your download and the files your assistant reads. If
you downloaded a release ZIP, share its link to this prompt or use the public
files from your extracted folder. Don't silently switch to the default branch.
If the assistant cannot run commands, run them yourself and share only the
success line or a sanitized error.

```text
Help me use the HubSpot Migration AI Starter. This is a guided starter, not a production integration.
Public repository: https://github.com/Jai-HS-Dev/hubspot-migration-ai-starter

First read AGENTS.md, README.md and docs/start-here.md. If you can't read them,
say which file you need. Don't guess at repository commands or claim you ran them.

Start by asking me: "What existing behavior do you want to keep working?"
If I don't have an idea yet, offer the supplied example. Explain terms as needed.
Use the first build-along in the local walkthrough. State my goal, the expected
result, and what needs separate approval before any HubSpot or hosting step.
Explain the command, where to run it,
and the line or screen that means it worked. If I can't run it yet, help me plan
from the example and mark the result as not run.

When I can recognize the sample result, propose one small change, the file to
edit, and how to check it. Read the relevant contract and example README before
editing. Keep the local sample working.

Follow AGENTS.md. No secrets or customer data in chat. Sharing this repo is not
approval to install packages, sign in, change permissions, publish, deploy, or
touch live data. Finish with what actually ran, what is still unverified, and
one next decision.
```

**Try saying:** "Make sure a replacement card still shows the priority of a made-up support request."

**First finish line:** Run `npm run build:example` using [the walkthrough](docs/start-here.md).
Look for `worked migration preserves a custom label without claiming installed verification`. See that the replacement preserves a sample label, then change the label and check it again. Installed app state remains unknown.

**A later decision:** [Try the synthetic replacement in a developer test account](docs/worked-example.md#3-see-the-replacement-in-a-test-account) after approval. For a real assessment, agree on the source folder first; do not start a migration.

**Optional:** Run `npm run demo` for the broader offline assessment; it does not inspect a real account.

Report actual results separately from instructions or plans. See
[what was tested](docs/EVIDENCE.md) for this starter's verification limits.

[AGENTS.md](AGENTS.md) holds the operating instructions; README.md explains scope.
Client-specific files should point there, not maintain competing rule sets.
No particular AI subscription, HubSpot CLI or MCP connection is required for the mock demo.
