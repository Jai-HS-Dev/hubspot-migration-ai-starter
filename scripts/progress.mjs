import { assessProject } from '../src/assessment.mjs';
import { makeProgress, saveLocalReport, readProgress, progressIsCurrent } from '../src/progress.mjs';
import { root, demoProject, parseArgs, fail } from './cli.mjs';

try {
  const [command, ...options] = process.argv.slice(2);
  const args = parseArgs(options, ['--project', '--recipe'], ['--help']);
  if (!command || command === '--help' || args['--help']) console.log('npm run progress -- init --recipe <id> [--project <path>]\nnpm run progress -- show\nnpm run progress -- check [--project <path>]\nOnly init creates an ignored state file; saved progress cannot grant live approval.');
  else if (command === 'init') {
    const assessment = assessProject(args['--project'] ?? demoProject(), { mode: args['--project'] ? 'project' : 'demo' });
    saveLocalReport(root, 'progress.json', makeProgress(args['--recipe'] ?? 'legacy-crm-cards', assessment));
    console.log('Progress created in .migration-local/progress.json. No live authorization or deployment recorded.');
  } else if (command === 'show') console.log(JSON.stringify(readProgress(root), null, 2));
  else if (command === 'check') {
    const state = readProgress(root);
    const assessment = assessProject(args['--project'] ?? demoProject(), { mode: args['--project'] ? 'project' : 'demo' });
    const current = progressIsCurrent(state, assessment);
    console.log(current ? 'Local source and catalog fingerprints match. Live state remains unknown.' : 'STALE: source or catalog changed. Review inventory and plan again; approval is never carried forward.');
    if (!current) process.exitCode = 2;
  } else throw new Error('Unknown progress command.');
} catch { fail(); }
