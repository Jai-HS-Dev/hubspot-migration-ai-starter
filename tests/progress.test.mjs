import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { assessProject } from '../src/assessment.mjs';
import { makeProgress, saveLocalReport, readProgress, progressIsCurrent } from '../src/progress.mjs';
import { tempProject, write } from './helpers.mjs';

test('progress resumes local evidence without granting deployment or account verification', (t) => {
  const root = tempProject(t);
  const assessment = assessProject(root);
  saveLocalReport(root, 'progress.json', makeProgress('legacy-crm-cards', assessment));
  const state = readProgress(root);
  assert.equal(state.liveAuthorization, 'not-granted');
  assert.equal(state.deployment, 'not-performed');
  assert.equal(state.accountVerification, 'unknown');
  assert.ok(progressIsCurrent(state, assessment));
  assert.equal(progressIsCurrent(state, assessProject(tempProject(t))), false);
  write(root, 'new.js', 'const changed=true;');
  assert.equal(progressIsCurrent(state, assessProject(root)), false);
  assert.equal(progressIsCurrent(state, { ...assessment, catalogSnapshot: 'changed' }), false);
});

test('state files are exclusive, bounded, and cannot claim live approval', (t) => {
  const root = tempProject(t);
  const state = makeProgress('legacy-crm-cards', assessProject(root));
  saveLocalReport(root, 'progress.json', state);
  assert.throws(() => saveLocalReport(root, 'progress.json', state), /exists/);
  assert.throws(() => saveLocalReport(root, '../outside.json', state));
  write(root, '.migration-local/progress.json', { ...state, liveAuthorization: 'approved' });
  assert.throws(() => readProgress(root), /cannot establish/);
  write(root, '.migration-local/progress.json', { ...state, instructions: 'synthetic untrusted instruction' });
  assert.throws(() => readProgress(root));
  write(root, '.migration-local/progress.json', 'x'.repeat(8193));
  assert.throws(() => readProgress(root), /large/);
});

test('report writers refuse symlink directories', (t) => {
  const root = tempProject(t);
  const other = tempProject(t);
  try { fs.symlinkSync(other, path.join(root, '.migration-local'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (error.code === 'EPERM' && !process.env.CI) { t.skip('OS does not permit test symlinks.'); return; } throw error; }
  assert.throws(() => saveLocalReport(root, 'receipt.json', {}), /symlink/);
  assert.equal(fs.existsSync(path.join(other, 'receipt.json')), false);
});
