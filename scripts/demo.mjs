import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import { convertLegacyCard, normalizeActionPayload } from '../src/legacy-card.mjs';
import { assessProject } from '../src/assessment.mjs';
import { saveLocalReport } from '../src/progress.mjs';
import { root, demoProject, parseArgs, fail } from './cli.mjs';

try {
  const args = parseArgs(process.argv.slice(2), [], ['--save', '--help']);
  if (args['--help']) console.log('npm run demo -- [--save]\nOffline contract demo. --save creates an ignored local receipt; never deploys or contacts HubSpot.');
  else {
    const read = (file) => JSON.parse(fs.readFileSync(path.join(root, 'examples/legacy-card-migration', file), 'utf8'));
    const modern = convertLegacyCard(read('legacy/card-definition.json'), read('legacy/card-response.json'));
    assert.deepEqual(modern, read('modern/expected-view-model.json'));
    assert.equal(convertLegacyCard(read('legacy/card-definition.json'), { results: [] }).state, 'empty');
    const expected = { associatedObjectId: 'demo-contact', associatedObjectType: 'CONTACT', actionKey: 'preview' };
    assert.deepEqual(normalizeActionPayload('application/x-www-form-urlencoded', new URLSearchParams(expected).toString()), normalizeActionPayload('application/json', JSON.stringify(expected)));
    const assessment = assessProject(demoProject(), { mode: 'demo' });
    const receipt = {
      schemaVersion: 1, mode: 'synthetic-demo', recipeId: 'legacy-crm-cards',
      sourceSnapshot: assessment.snapshot, catalogSnapshot: assessment.catalogSnapshot,
      checks: ['row identities and plain-text columns preserved', 'empty-state contract supported', 'form and JSON business fields normalize identically'],
      rows: modern.items.length, tests: 'local-demo-passed', installedState: 'unknown',
      authVerified: false, liveWritesPerformed: false, deployment: 'not-performed',
      nextStep: 'Run npm test, review the recipe, and create an approved app-card implementation plan.'
    };
    if (args['--save']) saveLocalReport(root, 'receipt.json', receipt);
    console.log(JSON.stringify(receipt, null, 2));
    console.log('Demo passed. No packages installed, no network calls, no HubSpot migration performed.');
  }
} catch { fail(); }
