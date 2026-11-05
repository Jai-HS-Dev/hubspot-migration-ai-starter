import fs from 'node:fs';

export const catalog = JSON.parse(fs.readFileSync(new URL('../migration-catalog.json', import.meta.url), 'utf8'));

export function getRecipe(id) {
  const recipe = catalog.recipes.find((item) => item.id === id);
  if (!recipe) throw new Error('Unknown recipe. Choose an ID from migration-catalog.json.');
  return recipe;
}

export function dateOnly(value = new Date().toISOString().slice(0, 10)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
    throw new Error('Use a valid calendar date in YYYY-MM-DD format.');
  }
  return value;
}

export function milestonesFor(recipe, asOf) {
  const date = dateOnly(asOf);
  return recipe.milestones.map((item) => ({ ...item, status: date >= item.date ? 'reached-recheck-official-source' : 'upcoming-recheck-official-source' }));
}
