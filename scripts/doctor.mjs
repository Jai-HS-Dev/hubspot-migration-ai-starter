import { assessProject } from '../src/assessment.mjs';
import { parseArgs, demoProject, fail } from './cli.mjs';

try {
  const args = parseArgs(process.argv.slice(2), ['--project', '--as-of'], ['--json', '--help']);
  if (args['--help']) console.log('npm run doctor -- [--project <existing-project>] [--as-of YYYY-MM-DD] [--json]\nDefault: synthetic demo. Bounded read-only local inspection; no network, account access, or writes.');
  else {
    const report = assessProject(args['--project'] ?? demoProject(), { asOf: args['--as-of'], mode: args['--project'] ? 'project' : 'demo' });
    if (args['--json']) console.log(JSON.stringify(report, null, 2));
    else {
      console.log(`HubSpot migration doctor: ${report.mode} mode; ${report.coverage.filesRead} files inspected.`);
      for (const item of report.findings) console.log(`${item.recipeId}: ${item.status} (${item.evidenceCount} local signals)`);
      console.log(`Installed state: unknown. Incomplete local coverage: ${report.coverage.incomplete}.`);
      console.log(`Sources reviewed ${report.sourceReviewedOn}; recheck time-sensitive notices before acting.`);
      console.log(report.nextStep);
    }
  }
} catch { fail(); }
