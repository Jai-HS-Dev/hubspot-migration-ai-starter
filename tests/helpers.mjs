import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function tempProject(t) {
  const parent = path.resolve(os.tmpdir());
  const dir = fs.mkdtempSync(path.join(parent, 'hs-migration-test-'));
  t.after(() => {
    if (path.dirname(dir) !== parent || !path.basename(dir).startsWith('hs-migration-test-')) throw new Error('Unsafe test cleanup target.');
    fs.rmSync(dir, { recursive: true, force: true });
  });
  return dir;
}

export function write(root, file, value) {
  const target = path.resolve(root, file);
  if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error('Unsafe fixture path.');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value));
}
