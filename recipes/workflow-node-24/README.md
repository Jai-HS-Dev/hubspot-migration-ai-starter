# Workflow Custom Code To Node.js 24

**Support:** offline before/after handler output-parity test. No installed runtime verified.

## Does This Apply?

Check the Language setting of the actual custom-code action. A callback-shaped
source file is a clue, not proof it is pasted into a workflow. External actionUrl
endpoints and Cloudflare Workers are different execution surfaces.

## Procedure

1. Identify the exact workflow/action and save its existing code/output settings.
2. Recheck the official runtime guide. This catalog records November 3 creation
   and November 17 editing restrictions from the dated notice; existing executions
   continue. Reconcile conflicting/newer notices before making live decisions.
3. Compare examples/workflow-node-24/legacy.cjs and modern.cjs. Preserve output
   fields and error/retry behavior; await asynchronous work before returning.
4. Review supplied library versions, secrets and API contracts independently.
5. Test the original/new behavior locally with synthetic inputs.
6. With specific approval, select Node.js 24 in the HubSpot action editor and
   apply the reviewed code. The CLI does not update workflow custom-code actions.
7. Test a dedicated synthetic record only with approval: a test can modify it.
8. Verify outputs, warnings, failures and downstream behavior before saving.
   Record the actual installed result separately from local tests.

Do not promise a Node.js 20 rollback once editing restrictions apply. The small
fixture does not model your business logic or full HubSpot execution environment.

[Official upgrade guide](https://developers.hubspot.com/docs/api-reference/legacy/automation/workflow-actions/upgrade-custom-code-actions-to-node-24).
A larger [purchase workflow reference](https://github.com/Jai-HS-Dev/sample-workflow-custom-code-Public/tree/ebfea14)
is available, but is not automatically installed by using this toolkit.
