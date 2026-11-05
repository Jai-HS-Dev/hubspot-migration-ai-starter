import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { catalog } from '../src/catalog.mjs';
import { assessProject } from '../src/assessment.mjs';
import { makeProgress } from '../src/progress.mjs';
import { tempProject } from './helpers.mjs';

test('catalog has stable unique recipes with real docs and honest support claims', () => {
  assert.equal(catalog.recipes.length, 5);
  assert.equal(new Set(catalog.recipes.map((item) => item.id)).size, 5);
  for (const recipe of catalog.recipes) {
    assert.equal(recipe.liveAccountVerified, false);
    assert.ok(fs.existsSync(new URL(`../${recipe.path}`, import.meta.url)));
    assert.ok(recipe.sources.every((value) => value.startsWith('https://')));
  }
  assert.equal(catalog.recipes.find((item) => item.id === 'legacy-crm-cards').irreversibleCutover, true);
});

test('documented schema enums and constant safety fields agree with emitted contracts', (t) => {
  const assessmentSchema = JSON.parse(fs.readFileSync(new URL('../schemas/assessment.schema.json', import.meta.url), 'utf8'));
  const progressSchema = JSON.parse(fs.readFileSync(new URL('../schemas/progress.schema.json', import.meta.url), 'utf8'));
  const report = assessProject(tempProject(t));
  const progress = makeProgress('legacy-crm-cards', report);
  for (const key of assessmentSchema.required) assert.ok(Object.hasOwn(report, key));
  for (const item of report.findings) assert.ok(assessmentSchema.properties.findings.items.properties.status.enum.includes(item.status));
  for (const key of progressSchema.required) assert.ok(Object.hasOwn(progress, key));
  for (const [key, schema] of Object.entries(progressSchema.properties)) {
    if (Object.hasOwn(schema, 'const') && Object.hasOwn(progress, key)) assert.equal(progress[key], schema.const);
  }
});
