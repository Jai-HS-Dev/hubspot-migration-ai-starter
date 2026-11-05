import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { catalog, dateOnly, milestonesFor } from './catalog.mjs';

const ignored = new Set(['.git', 'node_modules', '.migration-local', '.codex', '.claude', '.ssh', '.aws', '.wrangler', '.hubspot', 'dist', 'build', 'coverage', 'tests', 'fixtures', 'examples']);
const extensions = new Set(['.json', '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx']);
const secretName = /(?:^\.env(?:\.|$)|^\.npmrc$|^hubspot\.config\.|secret|credential|token|private.?key|^auth\.json$)/i;
const maxFiles = 500;
const maxBytes = 256 * 1024;

export function assessProject(project, { asOf, mode = 'project' } = {}) {
  const date = dateOnly(asOf);
  if (!['project', 'demo'].includes(mode)) throw new Error('Invalid assessment mode.');
  const rootStat = fs.lstatSync(project);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory() || path.basename(path.resolve(project)).startsWith('.') || secretName.test(path.basename(project))) throw new Error('Choose a real project directory, not a credential directory or symlink.');
  const root = fs.realpathSync(project);
  const normalizePath = (value) => process.platform === 'win32' ? value.toLowerCase() : value;
  if (normalizePath(root) !== normalizePath(path.resolve(project))) throw new Error('Select the canonical source folder, not a path through a symlink.');
  const files = [];
  let incomplete = false;
  let excluded = 0;
  let visited = 0;
  function walk(dir, depth = 0) {
    if (depth > 30 || visited >= 3000) { incomplete = true; return; }
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)); }
    catch { incomplete = true; return; }
    for (const entry of entries) {
      if (++visited > 3000) { incomplete = true; return; }
      if (entry.name.startsWith('.') || ignored.has(entry.name) || secretName.test(entry.name) || /\.(pem|key)$/i.test(entry.name)) { excluded++; continue; }
      const filename = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) { incomplete = true; excluded++; continue; }
      if (entry.isDirectory()) { walk(filename, depth + 1); continue; }
      if (!entry.isFile() || !extensions.has(path.extname(entry.name))) continue;
      if (files.length >= maxFiles) { incomplete = true; return; }
      try {
        const stat = fs.lstatSync(filename);
        if (stat.size > maxBytes || stat.isSymbolicLink()) { incomplete = true; continue; }
        const text = fs.readFileSync(filename, 'utf8');
        let json;
        if (entry.name.endsWith('.json')) {
          try { json = JSON.parse(text); } catch { incomplete = true; }
        }
        files.push({ relative: path.relative(root, filename).replaceAll('\\', '/'), name: entry.name, text, json });
      } catch { incomplete = true; }
    }
  }
  walk(root);
  const sourceFiles = files.filter((file) => !file.name.endsWith('.json'));
  const platform = files.find((file) => file.relative === 'hsproject.json')?.json?.platformVersion;
  const modernProject = ['2026.03', '2026.09'].includes(platform);
  const legacyCards = files.filter((file) => file.json?.fetch?.targetUrl && Array.isArray(file.json?.display?.properties));
  const callbackActions = sourceFiles.filter((file) => /exports\.main\s*=\s*(?:async\s*)?\(\s*event\s*,\s*callback\s*\)/.test(file.text) && /\bcallback\s*\(/.test(file.text));
  const legacyFunctions = files.filter((file) => file.name === 'serverless.json' && /^nodejs(?:12|14|16|18|20)\.x$/.test(file.json?.runtime ?? '') && file.json?.endpoints);
  const modernFunctions = files.filter((file) => file.json?.type === 'app-function');
  const legacyApis = sourceFiles.filter((file) => /\/crm\/v[1-4]\/|\/(?:crm-)?pipelines\/v1(?:\/|\b)/.test(file.text));
  const modernApis = sourceFiles.filter((file) => /\/crm\/(?:objects|associations|properties|owners|pipelines)\/2026-09(?:\/|\b)/.test(file.text));
  const appMeta = files.some((file) => file.name === 'app-hsmeta.json' && file.json?.type === 'app');
  const signals = {
    'legacy-crm-cards': { count: legacyCards.length, modern: false, reason: 'Legacy-shaped card definition found; installed card state is unknown.' },
    'workflow-node-24': { count: callbackActions.length, modern: false, reason: 'Callback-based workflow-shaped source found; installed action and runtime are unknown.' },
    'design-manager-functions': { count: legacyFunctions.length, modern: modernProject && modernFunctions.length > 0, reason: 'Legacy Design Manager metadata found; deployed endpoints are unknown.' },
    'date-based-apis': { count: legacyApis.length, modern: modernApis.length > 0, reason: 'Legacy API references found in eligible source files; live usage is unknown.' },
    'legacy-apps': { count: 0, modern: modernProject && appMeta, reason: 'Installed app architecture needs account-level confirmation.' }
  };
  const snapshot = crypto.createHash('sha256');
  for (const file of files) snapshot.update(file.relative).update('\0').update(file.text).update('\0');
  return {
    schemaVersion: 1, mode, assessedOn: date, sourceReviewedOn: catalog.reviewedOn,
    snapshot: snapshot.digest('hex'), projectFingerprint: crypto.createHash('sha256').update(normalizePath(root)).digest('hex'),
    catalogSnapshot: crypto.createHash('sha256').update(JSON.stringify(catalog)).digest('hex'),
    coverage: { filesRead: files.length, excludedEntries: excluded, incomplete, scope: 'bounded local source; credentials, symlinks, examples and tests excluded' },
    findings: catalog.recipes.map((recipe) => {
      const signal = signals[recipe.id];
      const status = signal.count ? 'affected' : signal.modern && !incomplete ? 'not-affected-in-inspected-source' : 'unknown';
      return { recipeId: recipe.id, status, evidenceCount: signal.count,
        explanation: signal.count ? signal.reason : status === 'unknown' ? 'Insufficient local evidence. No match is not proof of no migration need.' : 'Modern patterns found in inspected source only; installed behavior is not verified.',
        support: recipe.support, milestones: milestonesFor(recipe, date) };
    }),
    installedState: 'unknown', liveChangesPerformed: false, credentialsRequired: false,
    nextStep: 'Review the recipe and official sources; confirm account evidence separately before a live plan.'
  };
}
