import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { convertLegacyCard } from '../src/legacy-card.mjs';
import { assessProject } from '../src/assessment.mjs';
const fixture = file => JSON.parse(fs.readFileSync(new URL('../examples/legacy-card-migration/' + file, import.meta.url), 'utf8'));

test('worked migration preserves a custom label without claiming installed verification', () => {
  const definition = fixture('legacy/card-definition.json');
  const response = fixture('legacy/card-response.json');
  definition.display.properties[0].label = 'Support priority';
  const model = convertLegacyCard(definition, response);
  assert.equal(model.items[0].properties[0].label, 'Support priority');
  assert.equal(model.items[0].properties[0].value, 'Normal');
  assert.equal(model.liveWritesEnabled, false);
  const report = assessProject(fileURLToPath(new URL('../examples/legacy-card-migration/legacy/', import.meta.url)));
  assert.equal(report.installedState, 'unknown');
  assert.equal(report.liveChangesPerformed, false);
});

test('worked migration shows missing data and stops on an unsupported legacy action', () => {
  const definition = fixture('legacy/card-definition.json');
  const response = fixture('legacy/card-response.json');
  delete response.results[0].status;
  const model = convertLegacyCard(definition, response);
  assert.deepEqual(model.items[0].properties.find(field => field.label === 'Status'), {
    label: 'Status', value: ''
  });
  const empty = convertLegacyCard(definition, { results: [] });
  assert.equal(empty.state, 'empty');
  assert.deepEqual(empty.items, []);
  response.results[0].actions = [{ type: 'UNSUPPORTED_SAMPLE' }];
  assert.throws(() => convertLegacyCard(definition, response), /not executed or silently dropped/);
});
