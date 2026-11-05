import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { convertLegacyCard, normalizeActionPayload } from '../src/legacy-card.mjs';

const read = (file) => JSON.parse(fs.readFileSync(new URL(`../examples/legacy-card-migration/${file}`, import.meta.url), 'utf8'));
const definition = () => read('legacy/card-definition.json');
const response = () => read('legacy/card-response.json');

test('preserves card row IDs, labels, values and safe links', () => {
  assert.deepEqual(convertLegacyCard(definition(), response()), read('modern/expected-view-model.json'));
});

test('handles empty results and missing property values', () => {
  assert.equal(convertLegacyCard(definition(), { results: [] }).state, 'empty');
  const data = response(); delete data.results[0].priority;
  assert.equal(convertLegacyCard(definition(), data).items[0].properties[0].value, '');
});

test('refuses unsupported legacy actions and data types rather than dropping behavior', () => {
  const data = response(); data.results[0].actions = [{ type: 'ACTION_HOOK' }];
  assert.throws(() => convertLegacyCard(definition(), data), /reviewed adapter/);
  assert.throws(() => convertLegacyCard(definition(), { ...response(), primaryAction: {} }), /reviewed adapter/);
  const def = definition(); def.display.properties[0].dataType = 'CURRENCY';
  assert.throws(() => convertLegacyCard(def, response()), /STRING/);
});

test('rejects duplicate IDs, oversized input, and unsafe links', () => {
  const data = response(); data.results[1].objectId = data.results[0].objectId;
  assert.throws(() => convertLegacyCard(definition(), data), /Duplicate/);
  assert.throws(() => convertLegacyCard(definition(), { results: Array(101).fill(data.results[0]) }), /limits/);
  for (const link of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com', 'https://example.com?token=synthetic']) {
    const row = { ...response().results[0], link };
    assert.throws(() => convertLegacyCard(definition(), { results: [row] }));
  }
});

const action = { associatedObjectId: 'demo-contact', associatedObjectType: 'CONTACT', actionKey: 'preview' };

test('normalizes legacy form and modern JSON business fields equally', () => {
  assert.deepEqual(normalizeActionPayload('application/json; charset=utf-8', JSON.stringify(action)), action);
  assert.deepEqual(normalizeActionPayload('application/x-www-form-urlencoded', new URLSearchParams(action).toString()), action);
});

test('rejects duplicate form fields, prototype keys, unexpected identity fields and large bodies', () => {
  assert.throws(() => normalizeActionPayload('application/x-www-form-urlencoded', new URLSearchParams(action) + '&actionKey=other'));
  assert.throws(() => normalizeActionPayload('application/json', '{"__proto__":{}}'));
  assert.throws(() => normalizeActionPayload('application/json', JSON.stringify({ ...action, portalId: 'untrusted' })));
  assert.throws(() => normalizeActionPayload('text/plain', JSON.stringify(action)));
  assert.throws(() => normalizeActionPayload('application/json', 'x'.repeat(8193)));
  assert.throws(() => normalizeActionPayload('application/json', JSON.stringify({ ...action, actionKey: '../execute' })));
});

test('workflow return-based fixture preserves outputs without a callback', async () => {
  const require = createRequire(import.meta.url);
  const legacy = require('../examples/workflow-node-24/legacy.cjs').main;
  const modern = require('../examples/workflow-node-24/modern.cjs').main;
  for (const ready of [false, true]) {
    let previous;
    await legacy({ inputFields: { ready } }, (value) => { previous = value; });
    assert.deepEqual(await modern({ inputFields: { ready } }), previous);
  }
  assert.equal(modern.length, 1);
  await assert.rejects(legacy({ inputFields: { ready: true } }), /callback/);
});
