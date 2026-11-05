import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');

test('CI runs full tests without deployment credentials or privileged PR events', () => {
  const workflow = read('.github/workflows/ai-starter-checks.yml');
  assert.ok(workflow.includes('permissions:\n  contents: read'));
  assert.ok(workflow.includes('persist-credentials: false'));
  assert.ok(workflow.includes('run: npm test'));
  assert.ok(workflow.includes('windows-latest') && workflow.includes('ubuntu-latest'));
  assert.equal([...workflow.matchAll(/uses: actions\/(?:checkout|setup-node)@[a-f0-9]{40}\b/g)].length, 2);
  assert.ok(!workflow.includes('pull_request_target'));
  assert.ok(!workflow.includes('secrets.') && !workflow.includes('wrangler') && !workflow.includes('hs project upload'));
});

test('worked exercise and glossary stay linked from the human README', () => {
  assert.ok(read('README.md').includes('(docs/worked-example.md)'));
  assert.ok(read('README.md').includes('(docs/glossary.md)'));
  assert.ok(read('docs/worked-example.md').includes('npm run example:guided'));
  assert.ok(read('docs/worked-example.md').includes('synthetic'));
});
