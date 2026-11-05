# Start With AI

Open this repository in an AI coding tool that can read project files. Paste this
prompt into its chat. Explanation depth changes for beginners and developers;
the safety boundaries stay the same.

```text
Help me use this guided starter, not build a production integration by default.
Read AGENTS.md, README.md and docs/start-here.md first, then the selected contract,
example README and EVIDENCE.md. Ask me one question at a time:
"What existing behavior do you want to keep working?"

Start with the credential-free local walkthrough. Explain each command, expected
result and safe recovery. Tell me what the demo does not prove. Help me make one
small plan before code changes and keep mock mode available.

Follow AGENTS.md for trust, secrets and approval boundaries. Do not request secrets
or customer data in chat. Do not assume account access, install dependencies,
publish, deploy or change live data merely because I shared a repository.
Finish with what was tested, what is unfinished and the next decision.
```

[The walkthrough](docs/start-here.md) is the single beginner path.
[AGENTS.md](AGENTS.md) holds the operating instructions; README.md explains scope.
Client-specific files should point there, not maintain competing rule sets.
No particular AI subscription, CLI or MCP connection is required for the mock demo.
