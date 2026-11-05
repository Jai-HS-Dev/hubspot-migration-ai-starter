import fs from 'node:fs';
import path from 'node:path';
import { root } from './cli.mjs';
import { catalog, dateOnly } from '../src/catalog.mjs';

const required = [
  'README.md', 'EVIDENCE.md', 'START_WITH_AI.md', 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md',
  'examples/catalog.json', 'docs/choose-your-path.md',
  'LICENSE', 'SECURITY.md', 'SUPPORT.md', 'CONTRIBUTING.md', 'COMPATIBILITY.md',
  'MIGRATION.md', 'REAL_MIGRATION_CHECKLIST.md', '.gitignore', '.env.example',
  '.cursor/rules/hubspot-migration.mdc', '.windsurfrules',
  '.github/instructions/migration.instructions.md', '.github/prompts/assess-my-migration.prompt.md',
  '.github/prompts/review-before-cutover.prompt.md', '.github/ISSUE_TEMPLATE/migration-help.yml',
  'docs/start-here.md', 'docs/non-developer-safety-gates.md', 'docs/security-for-non-developers.md',
  'docs/ai-coding-tools.md', 'docs/developer-architecture.md', 'docs/auth-options.md', 'docs/hosting-options.md',
  'docs/contracts/assessment.md', 'docs/contracts/legacy-card.md', 'docs/contracts/progress.md',
  'docs/cutover-and-recovery.md', 'docs/implementation-responsibility.md', 'docs/maintainer-checklist.md',
  'templates/inventory.md', 'templates/migration-plan.md', 'templates/verification-report.md',
  'schemas/assessment.schema.json', 'schemas/progress.schema.json'
];
const failures = [];
for (const file of required) if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
if (fs.existsSync(path.join(root, '.env'))) failures.push('This toolkit needs no credentials; keep real environment files out of its root.');
const ignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
if (!ignore.split(/\r?\n/).includes('.migration-local/')) failures.push('Local migration reports must be ignored.');
if (catalog.schemaVersion !== 1) failures.push('Unsupported catalog schema version.');
dateOnly(catalog.reviewedOn);
const ids = new Set();
for (const recipe of catalog.recipes) {
  const target = path.resolve(root, recipe.path);
  if (!/^[a-z0-9-]+$/.test(recipe.id) || ids.has(recipe.id)) failures.push('Invalid/duplicate recipe ID.');
  ids.add(recipe.id);
  if (!target.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(target)) failures.push('Recipe path must exist inside this repo.');
  if (!['contract-tested-local-example', 'contract-tested-handler-example', 'guidance-only'].includes(recipe.support) || recipe.liveAccountVerified !== false) failures.push('Unsupported evidence claim in catalog.');
  for (const source of recipe.sources) {
    const url = new URL(source);
    if (url.protocol !== 'https:' || !['developers.hubspot.com', 'github.com'].includes(url.hostname)) failures.push('Catalog references must use reviewed primary sources.');
  }
  for (const milestone of recipe.milestones) dateOnly(milestone.date);
}
const privateMarkers = String(process.env.AI_READINESS_FORBIDDEN_MARKERS ?? '').split('|').filter(Boolean);
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.migration-local', 'dist', 'build'].includes(entry.name) || entry.isSymbolicLink()) continue;
    if (entry.name.startsWith('.env') && entry.name !== '.env.example') continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(?:md|mdc|mjs|cjs|js|json|yml|yaml|example)$/.test(entry.name) && entry.name !== '.windsurfrules') continue;
    const relative = path.relative(root, file).replaceAll('\\', '/');
    const content = fs.readFileSync(file, 'utf8');
    if (/pat-na1-[a-zA-Z0-9-]{20,}|gh[pousr]_[a-zA-Z0-9]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content) || privateMarkers.some((marker) => content.includes(marker))) failures.push(`${relative}: possible private marker; matched values are not printed.`);
    if (/^examples\/.+\/modern(?:\/|\.)/.test(relative) && /\/crm\/v[1-4]\/|exports\.main\s*=\s*(?:async\s*)?\(\s*event\s*,\s*callback/.test(content)) failures.push(`${relative}: legacy pattern in modern output.`);
    if (entry.name.endsWith('.json')) {
      try { JSON.parse(content); } catch { failures.push(`${relative}: invalid JSON.`); }
    }
    if (entry.name.endsWith('.md')) {
      for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        const link = match[1];
        if (/^(https?:|mailto:|#)/.test(link)) continue;
        const target = path.resolve(path.dirname(file), link.split('#')[0]);
        if (!target.startsWith(path.resolve(root) + path.sep) || !fs.existsSync(target)) failures.push(`${relative}: broken or out-of-repo local link.`);
      }
    }
  }
}
walk(root);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('AI readiness passed: entry points, catalog, links, modern fixtures, JSON and basic private-marker checks. Not a security certification.');
