import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));

export function parseArgs(args, values = [], flags = []) {
  const result = Object.create(null);
  for (let index = 0; index < args.length; index++) {
    const name = args[index];
    if (Object.hasOwn(result, name)) throw new Error('Duplicate option.');
    if (values.includes(name)) {
      const value = args[++index];
      if (!value || value.startsWith('--')) throw new Error('Missing option value.');
      result[name] = value;
    } else if (flags.includes(name)) result[name] = true;
    else throw new Error('Unknown option. Use --help.');
  }
  return result;
}

export function demoProject() { return path.join(root, 'examples/legacy-card-migration/legacy'); }

export function fail() {
  // Avoid echoing caller-supplied paths, JSON, credentials, or private source snippets.
  console.error('Stopped safely. Check documented options, project access, and existing local reports. No live operation was attempted.');
  process.exitCode = 1;
}
