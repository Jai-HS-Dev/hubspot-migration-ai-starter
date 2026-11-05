const object = (value) => value && typeof value === 'object' && !Array.isArray(value);
const dangerous = new Set(['__proto__', 'prototype', 'constructor']);

function text(value, field) {
  if (typeof value !== 'string' || value.length > 500 || value.trim() === '') throw new Error(`Invalid ${field}. Use bounded plain text.`);
  return value;
}

function safeUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('Use HTTPS links without credentials, queries, or fragments in this example.');
  return url.href;
}

export function convertLegacyCard(definition, response) {
  if (!object(definition) || !Array.isArray(definition.display?.properties) || !Array.isArray(response?.results)) throw new Error('Expected a legacy definition and results array.');
  if (response.results.length > 100 || definition.display.properties.length > 30) throw new Error('Example data exceeds supported limits.');
  if (response.primaryAction || response.allObjectActions || response.actions) throw new Error('Top-level legacy actions need an explicitly reviewed adapter.');
  const columns = definition.display.properties.map((column) => {
    const key = text(column.name, 'property name');
    if (dangerous.has(key) || column.dataType !== 'STRING') throw new Error('This example supports plain STRING properties only; review other types manually.');
    return { key, label: text(column.label, 'property label') };
  });
  const ids = new Set();
  return {
    state: response.results.length ? 'success' : 'empty', title: text(definition.title, 'card title'),
    items: response.results.map((row) => {
      if (!object(row) || !['string', 'number'].includes(typeof row.objectId)) throw new Error('Invalid row identifier.');
      const id = text(String(row.objectId), 'row identifier');
      if (ids.has(id)) throw new Error('Duplicate row identifier.');
      ids.add(id);
      if (row.actions !== undefined && (!Array.isArray(row.actions) || row.actions.length)) throw new Error('Legacy actions require an explicitly reviewed adapter; they are not executed or silently dropped.');
      return { id, title: text(row.title, 'row title'), href: row.link ? safeUrl(row.link) : null,
        properties: columns.map(({ key, label }) => {
          const value = row[key];
          if (value !== undefined && value !== null && typeof value !== 'string') throw new Error('Unsupported property type.');
          return { label, value: value == null || value === '' ? '' : text(value, 'property value') };
        }) };
    }),
    actions: [], liveWritesEnabled: false
  };
}

// Parsing only: signature verification and authorization belong to the real server.
export function normalizeActionPayload(contentType, body) {
  if (typeof body !== 'string' || Buffer.byteLength(body) > 8192) throw new Error('Expected a bounded raw request body.');
  const type = String(contentType).split(';')[0].trim().toLowerCase();
  let payload;
  if (type === 'application/json') payload = JSON.parse(body);
  else if (type === 'application/x-www-form-urlencoded') {
    payload = Object.create(null);
    for (const [key, value] of new URLSearchParams(body)) {
      if (Object.hasOwn(payload, key) || dangerous.has(key)) throw new Error('Duplicate or unsafe field.');
      payload[key] = value;
    }
  } else throw new Error('Unsupported content type.');
  const allowed = new Set(['associatedObjectId', 'associatedObjectType', 'actionKey']);
  if (!object(payload) || Object.keys(payload).some((key) => !allowed.has(key))) throw new Error('Unexpected action fields.');
  if (Object.keys(payload).length !== 3) throw new Error('Missing action fields.');
  const id = text(payload.associatedObjectId, 'associated object ID');
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error('Invalid associated object ID.');
  if (!['CONTACT', 'COMPANY', 'DEAL', 'TICKET'].includes(payload.associatedObjectType)) throw new Error('Unsupported object type.');
  const actionKey = text(payload.actionKey, 'action key');
  if (!/^[a-zA-Z0-9_-]+$/.test(actionKey)) throw new Error('Invalid action key.');
  return { associatedObjectId: id, associatedObjectType: payload.associatedObjectType, actionKey };
}
