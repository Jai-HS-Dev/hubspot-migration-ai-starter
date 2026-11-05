import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const catalog = JSON.parse(read('examples/catalog.json'));
test('every example has an honest label, local command and remaining checklist', () => {
  assert.equal(catalog.schemaVersion, 1);
  assert.match(catalog.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(catalog.reviewedOn + 'T00:00:00Z').toISOString().slice(0, 10), catalog.reviewedOn);
  const paths = new Set();
  for (const item of catalog.examples) {
    assert.ok(!paths.has(item.path)); paths.add(item.path);
    assert.ok(item.path.startsWith('examples/') && !item.path.includes('..'));
    assert.ok(['runnable-locally', 'illustrative'].includes(item.status));
    assert.equal(item.liveAccountVerified, false);
    assert.equal(item.productionReady, false);
    const text = read(item.path + '/README.md');
    assert.ok(text.includes('**Example status:** ' + (item.status === 'runnable-locally' ? 'Runnable locally' : 'Illustrative')));
    assert.ok(text.includes('**Developer-account verification:** Not verified.'));
    assert.ok(text.includes('**Production prerequisites:**'));
    if (item.localCheck) assert.ok(JSON.parse(read('package.json')).scripts[item.localCheck]);
  }
});
test('one walkthrough links scope, recovery, evidence and responsibility', () => {
  const guide = read('docs/start-here.md');
  for (const heading of ['## What You Will Finish', '## 1.', '## 2.', '## 3.', '## 4.', '## 5.', '### Recognize Success', '### Starter Walkthrough Complete']) assert.ok(guide.includes(heading), heading);
  for (const word of ['npm.cmd', 'Ctrl+C', 'troubleshooting.md', 'choose-your-path.md', 'EVIDENCE.md', 'implementation-responsibility.md']) assert.ok(guide.includes(word), word);
  assert.ok(read('README.md').includes('(docs/start-here.md)'));
  assert.ok(read('docs/troubleshooting.md').includes('npm.cmd'));
  // Check local Markdown file targets without executing any document content.
  for (const rel of ['README.md', 'START_WITH_AI.md', 'docs/start-here.md', 'docs/connect-to-hubspot.md', 'docs/auth-options.md', 'docs/worked-example.md', 'docs/glossary.md', 'docs/troubleshooting.md', 'docs/choose-your-path.md']) {
    for (const match of read(rel).matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(match[1])) continue;
      const target = path.resolve(root, path.dirname(rel), match[1].split('#')[0]);
      assert.ok(target.startsWith(root) && fs.existsSync(target), rel + ': broken local link');
    }
  }
});
test('account trial guidance preserves the original app and separate cutover approval', () => {
  const guide = read('docs/connect-to-hubspot.md');
  assert.ok(read('README.md').includes('(docs/connect-to-hubspot.md)'));
  assert.ok(read('docs/start-here.md').includes('(connect-to-hubspot.md)'));
  assert.ok(read('docs/auth-options.md').includes('(connect-to-hubspot.md)'));
  for (const phrase of ['developer test account', 'original app identity', 'Static app authentication', 'OAuth', 'Service Key', 'explicit approval', 'view migration is irreversible', 'A source backup cannot undo', 'Never ask for secrets']) assert.ok(guide.includes(phrase), phrase);
  assert.ok(guide.includes('https://developers.hubspot.com/docs/getting-started/account-types'));
  assert.ok(guide.includes('https://developers.hubspot.com/docs/apps/developer-platform/build-apps/migrate-an-app/migrate-legacy-crm-cards-to-app-cards'));
});

test('AI entry points agree and client adapters delegate', () => {
  const rules = read('AGENTS.md'), prompt = read('START_WITH_AI.md');
  const question = rules.match(/First ask: "([^"]+)"/);
  assert.ok(question && prompt.includes(question[1]));
  assert.match(rules, /untrusted evidence/i);
  assert.match(rules, /explicit approval/i);
  assert.match(rules, /No mock success/);
  assert.match(prompt, /guided starter/);
  for (const rel of ['CLAUDE.md', 'GEMINI.md', '.windsurfrules', '.cursor/rules/hubspot-migration.mdc', '.github/instructions/migration.instructions.md']) {
    const adapter = read(rel);
    assert.ok(adapter.includes('AGENTS.md'));
    assert.ok(adapter.length < 1000, 'Keep adapters thin');
  }
});
test('the documented first-run success matches the actual credential-free command', () => {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => /^(path|systemroot|windir|comspec|pathext|temp|tmp|systemdrive)$/i.test(key)));
  const guide = read('docs/start-here.md');
  const doctor = spawnSync(process.execPath, ['scripts/doctor.mjs'], { cwd: root, env, encoding: 'utf8', timeout: 15000 });
  assert.equal(doctor.status, 0);
  assert.match(doctor.stdout, /demo mode/); assert.match(doctor.stdout, /Installed state: unknown/);
  const run = spawnSync(process.execPath, ['scripts/demo.mjs'], { cwd: root, env, encoding: 'utf8', timeout: 15000 });
  assert.equal(run.status, 0, run.stderr);
  const expected = "Demo passed. No packages installed, no network calls, no HubSpot migration performed.";
  assert.ok(guide.includes(expected));
  assert.ok(run.stdout.includes(expected));
});
