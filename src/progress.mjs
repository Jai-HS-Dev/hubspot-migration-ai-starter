import fs from 'node:fs';
import path from 'node:path';
import { getRecipe } from './catalog.mjs';

export function progressIsCurrent(state, assessment) {
  return state?.schemaVersion === 1 && state.targetFingerprint === assessment.projectFingerprint && state.sourceSnapshot === assessment.snapshot && state.catalogSnapshot === assessment.catalogSnapshot;
}

export function makeProgress(recipeId, assessment) {
  getRecipe(recipeId);
  return {
    schemaVersion: 1, recipeId, targetFingerprint: assessment.projectFingerprint, sourceSnapshot: assessment.snapshot, catalogSnapshot: assessment.catalogSnapshot,
    inventory: 'local-source-assessed', plan: 'needs-human-review', localExample: 'not-run',
    accountVerification: 'unknown', liveAuthorization: 'not-granted', deployment: 'not-performed'
  };
}

function localFile(root, name) {
  if (!['progress.json', 'receipt.json'].includes(name)) throw new Error('Unsupported local report name.');
  const dir = path.join(root, '.migration-local');
  if (fs.existsSync(dir) && (!fs.lstatSync(dir).isDirectory() || fs.lstatSync(dir).isSymbolicLink())) throw new Error('Report directory must not be a symlink.');
  const filename = path.join(dir, name);
  if (fs.existsSync(filename) && (!fs.lstatSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink())) throw new Error('Report file must not be a symlink.');
  return { dir, filename };
}

export function saveLocalReport(root, name, value) {
  const { dir, filename } = localFile(root, name);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  if (fs.existsSync(filename)) throw new Error('Report exists. Review or archive it explicitly; no overwrite performed.');
  fs.writeFileSync(filename, JSON.stringify(value, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
}

export function readProgress(root) {
  const { filename } = localFile(root, 'progress.json');
  if (!fs.existsSync(filename)) throw new Error('No saved progress.');
  if (fs.statSync(filename).size > 8192) throw new Error('Saved progress is too large.');
  const state = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const keys = ['schemaVersion', 'recipeId', 'targetFingerprint', 'sourceSnapshot', 'catalogSnapshot', 'inventory', 'plan', 'localExample', 'accountVerification', 'liveAuthorization', 'deployment'];
  if (!state || Object.keys(state).some((key) => !keys.includes(key)) || state.schemaVersion !== 1 ||
      !/^[a-f0-9]{64}$/.test(state.targetFingerprint) || !/^[a-f0-9]{64}$/.test(state.sourceSnapshot) || !/^[a-f0-9]{64}$/.test(state.catalogSnapshot) ||
      state.liveAuthorization !== 'not-granted' || state.deployment !== 'not-performed' || state.accountVerification !== 'unknown') {
    throw new Error('Unsupported saved progress; it cannot establish authorization or live completion.');
  }
  getRecipe(state.recipeId);
  // Saved state is untrusted; never return edited free text as agent instructions.
  return {
    schemaVersion: 1, recipeId: state.recipeId, targetFingerprint: state.targetFingerprint, sourceSnapshot: state.sourceSnapshot, catalogSnapshot: state.catalogSnapshot,
    localExample: state.localExample === 'synthetic-demo-passed' ? 'self-reported-synthetic-demo-passed' : 'not-run',
    accountVerification: 'unknown', liveAuthorization: 'not-granted', deployment: 'not-performed'
  };
}
