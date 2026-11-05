import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root } from './cli.mjs';

let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'dist', 'build'].includes(entry.name) || entry.isSymbolicLink()) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(?:mjs|cjs|js|jsx)$/.test(entry.name)) {
      const jsx = entry.name.endsWith('.jsx');
      // App entrypoints use plain JavaScript React and need no JSX compiler.
      const result = spawnSync(process.execPath, jsx ? ['--input-type=module', '--check'] : ['--check', file], { encoding: 'utf8', ...(jsx ? { input: fs.readFileSync(file, 'utf8') } : {}) });
      if (result.status !== 0) throw new Error(`Syntax check failed for ${path.relative(root, file)}.`);
      count++;
    }
  }
}
walk(root);
console.log(`Syntax check passed for ${count} JavaScript modules (including non-deployable legacy fixtures).`);
