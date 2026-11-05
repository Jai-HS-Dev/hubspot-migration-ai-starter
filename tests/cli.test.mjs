import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { tempProject } from './helpers.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const run = (script, args = []) => spawnSync(process.execPath, [`scripts/${script}.mjs`, ...args], { cwd: root, encoding: 'utf8', timeout: 15000 });

test('the default doctor labels its fixture as demo and leaves installed state unknown', () => {
  const result = run('doctor', ['--json', '--as-of', '2026-11-04']);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, 'demo');
  assert.equal(report.findings[0].status, 'affected');
  assert.equal(report.installedState, 'unknown');
});

test('doctor can inspect an explicit project without writing or echoing its path', (t) => {
  const project = tempProject(t);
  const result = run('doctor', ['--project', project, '--json']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).mode, 'project');
  assert.ok(!result.stdout.includes(project));
});

test('invalid arguments stop without echoing potentially sensitive input', () => {
  const marker = 'synthetic-private-argument';
  const result = run('doctor', ['--unknown', marker]);
  assert.equal(result.status, 1);
  assert.ok(!result.stderr.includes(marker));
  assert.match(result.stderr, /Stopped safely/);
});

test('offline demo produces an honest completion receipt', () => {
  const result = run('demo');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /local-demo-passed/);
  assert.match(result.stdout, /"deployment": "not-performed"/);
  assert.match(result.stdout, /"authVerified": false/);
});
