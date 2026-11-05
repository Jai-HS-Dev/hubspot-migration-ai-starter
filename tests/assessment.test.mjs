import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { assessProject } from '../src/assessment.mjs';
import { dateOnly, getRecipe, milestonesFor } from '../src/catalog.mjs';
import { tempProject, write } from './helpers.mjs';

const finding = (report, id) => report.findings.find((item) => item.recipeId === id);

test('an empty project is unknown, not a clean installed account', (t) => {
  const report = assessProject(tempProject(t), { asOf: '2026-11-04' });
  assert.ok(report.findings.every((item) => item.status === 'unknown'));
  assert.equal(report.installedState, 'unknown');
  assert.equal(report.liveChangesPerformed, false);
});

test('detects legacy source without claiming that the example is installed', (t) => {
  const root = tempProject(t);
  write(root, 'card.json', { fetch: { targetUrl: 'https://example.com' }, display: { properties: [] } });
  write(root, 'action.js', 'exports.main = async (event, callback) => { callback({outputFields:{}}); };');
  write(root, 'serverless.json', { runtime: 'nodejs20.x', endpoints: {} });
  write(root, 'api.js', 'const path = "/crm/v3/objects/contacts";');
  const report = assessProject(root);
  for (const id of ['legacy-crm-cards', 'workflow-node-24', 'design-manager-functions', 'date-based-apis']) assert.equal(finding(report, id).status, 'affected');
  assert.equal(report.installedState, 'unknown');
});

test('modern metadata establishes source evidence only', (t) => {
  const root = tempProject(t);
  write(root, 'hsproject.json', { platformVersion: '2026.09' });
  write(root, 'src/app/app-hsmeta.json', { type: 'app' });
  write(root, 'src/app/function-hsmeta.json', { type: 'app-function' });
  write(root, 'src/client.js', 'const path = "/crm/objects/2026-09/contacts";');
  const report = assessProject(root);
  assert.equal(finding(report, 'design-manager-functions').status, 'not-affected-in-inspected-source');
  assert.equal(finding(report, 'date-based-apis').status, 'not-affected-in-inspected-source');
  assert.equal(finding(report, 'legacy-apps').status, 'not-affected-in-inspected-source');
  assert.equal(report.installedState, 'unknown');
});

test('malformed or oversized files make coverage incomplete', (t) => {
  const root = tempProject(t);
  write(root, 'hsproject.json', { platformVersion: '2026.09' });
  write(root, 'app-hsmeta.json', { type: 'app' });
  write(root, 'broken.json', '{');
  write(root, 'large.js', 'x'.repeat(256 * 1024 + 1));
  const report = assessProject(root);
  assert.equal(report.coverage.incomplete, true);
  assert.equal(finding(report, 'legacy-apps').status, 'unknown');
});

test('skips secret files and fixture folders and never echoes source payloads', (t) => {
  const root = tempProject(t);
  const marker = 'synthetic-private-value-do-not-echo';
  write(root, '.env', marker);
  write(root, 'credentials.json', { secret: marker });
  write(root, 'tests/input.js', 'const path="/crm/v3/objects/contacts";');
  write(root, 'src/index.js', `// ${marker}`);
  const report = assessProject(root);
  assert.equal(report.coverage.filesRead, 1);
  assert.equal(finding(report, 'date-based-apis').status, 'unknown');
  assert.ok(!JSON.stringify(report).includes(marker));
  assert.ok(!JSON.stringify(report).includes(root));
});

test('does not follow directory symlinks or junctions', (t) => {
  const root = tempProject(t);
  const other = tempProject(t);
  write(other, 'card.json', { fetch: { targetUrl: 'https://example.com' }, display: { properties: [] } });
  try { fs.symlinkSync(other, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (error.code === 'EPERM') { t.skip('OS does not permit test symlinks.'); return; } throw error; }
  assert.equal(assessProject(root).coverage.filesRead, 0);
  assert.equal(assessProject(root).coverage.incomplete, true);
  assert.throws(() => assessProject(path.join(root, 'linked')));
});

test('bounds file count and invalidates source fingerprints after changes', (t) => {
  const root = tempProject(t);
  write(root, 'source.js', 'const value=1;');
  const before = assessProject(root).snapshot;
  write(root, 'source.js', 'const value=2;');
  assert.notEqual(assessProject(root).snapshot, before);
  for (let i = 0; i < 501; i++) write(root, `file-${i}.js`, '');
  const report = assessProject(root);
  assert.equal(report.coverage.filesRead, 500);
  assert.equal(report.coverage.incomplete, true);
});

test('calendar deadlines are warnings, never proof an API is available', () => {
  assert.throws(() => dateOnly('2026-02-30'));
  assert.throws(() => dateOnly('today'));
  assert.throws(() => getRecipe('unknown'));
  const items = milestonesFor(getRecipe('legacy-crm-cards'), '2026-12-02');
  assert.ok(items.every((item) => item.status === 'reached-recheck-official-source'));
});
