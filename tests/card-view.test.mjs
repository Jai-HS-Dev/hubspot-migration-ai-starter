import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { convertLegacyCard } from '../src/legacy-card.mjs';
import { renderMigratedCard } from '../examples/legacy-card-migration/modern/src/app/cards/render-card.mjs';
import { model } from '../examples/legacy-card-migration/modern/src/app/cards/synthetic-model.mjs';
const json = file => JSON.parse(fs.readFileSync(new URL('../examples/legacy-card-migration/' + file, import.meta.url), 'utf8'));
const ui = { React: { createElement: (type, props, ...children) => ({ type, props, children }) }, Flex: 'Flex', Text: 'Text', Link: 'Link', Divider: 'Divider' };
test('replacement app declares the minimum Contacts scope and no external fetches', () => {
  const app = json('modern/src/app/app-hsmeta.json').config;
  const card = json('modern/src/app/cards/migrated-card-hsmeta.json').config;
  assert.equal(app.distribution, 'private');
  assert.equal(app.auth.type, 'static');
  assert.deepEqual(app.auth.requiredScopes, ['oauth', 'crm.objects.contacts.read']);
  assert.deepEqual(app.auth.optionalScopes, []);
  assert.deepEqual(app.auth.conditionallyRequiredScopes, []);
  assert.deepEqual(app.permittedUrls, { fetch: [], iframe: [], img: [] });
  assert.deepEqual(card.objectTypes, ['CONTACT']);
  assert.equal(card.location, 'crm.record.tab');
});
test('legacy data becomes the model consumed by the actual card renderer', () => {
  const converted = convertLegacyCard(json('legacy/card-definition.json'), json('legacy/card-response.json'));
  assert.deepEqual(model, converted);
  const tree = renderMigratedCard(converted, ui);
  const serialized = JSON.stringify(tree);
  for (const item of converted.items) {
    assert.ok(serialized.includes(item.title));
    if (item.href) assert.ok(serialized.includes(item.href));
    for (const property of item.properties) assert.ok(serialized.includes(property.label + ': ' + property.value));
  }
});
test('empty state is rendered and actions/unsafe links are rejected', () => {
  assert.match(JSON.stringify(renderMigratedCard({ ...model, state: 'empty', items: [] }, ui)), /No items available/);
  assert.throws(() => renderMigratedCard({ ...model, actions: [{}] }, ui), /read-only/);
  assert.throws(() => renderMigratedCard({ ...model, items: [{ ...model.items[0], href: 'javascript:alert(1)' }] }, ui), /Unsafe/);
});
