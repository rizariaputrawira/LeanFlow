#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestName = '.leanflow-manifest.json';
const coreSkills = ['leanflow-brainstorm', 'leanflow-plan', 'leanflow-execute', 'leanflow-orchestrate', 'leanflow-to-spec', 'leanflow-commit-message', 'leanflow-pr-work'];
const supportSkills = ['leanflow-research', 'leanflow-domain-modeling', 'leanflow-architecture', 'leanflow-plan-review', 'leanflow-debugging', 'leanflow-code-review', 'leanflow-security-review', 'leanflow-license-review', 'leanflow-writing', 'leanflow-git-status'];
const roles = ['planner', 'executor', 'reviewer'];
const hosts = {
  omp: { target: () => path.join(os.homedir(), '.omp', 'agent'), skills: 'skills', agents: 'agents', extension: 'md' },
  agy: { target: () => path.join(os.homedir(), '.gemini', 'config', 'plugins', 'leanflow'), skills: 'skills', agents: 'agents', extension: 'md' },
  claude: { target: () => path.join(os.homedir(), '.claude'), skills: 'skills', agents: 'agents', extension: 'md' },
  codex: { skills: '.agents/skills', agents: '.codex/agents', extension: 'toml' },
  generic: { skills: '' },
};
const usage = 'Usage: node scripts/install.mjs <omp|agy|claude|codex|generic> [--target DIR] [--with-agents] [--dry-run] [--update]';

function fail(message) {
  throw new Error(message);
}

function parseArgs(args) {
  const harness = args[0];
  if (!Object.hasOwn(hosts, harness)) fail(usage);
  const options = { harness, withAgents: false, dryRun: false, update: false };
  const seen = new Set();
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (!['--target', '--with-agents', '--dry-run', '--update'].includes(arg)) fail(`Unknown argument: ${arg}\n${usage}`);
    if (seen.has(arg)) fail(`Duplicate argument: ${arg}`);
    seen.add(arg);
    if (arg === '--target') {
      const value = args[++i];
      if (!value || value.startsWith('--')) fail('--target requires a directory');
      options.target = path.resolve(value);
    } else {
      options[{ '--with-agents': 'withAgents', '--dry-run': 'dryRun', '--update': 'update' }[arg]] = true;
    }
  }
  const host = hosts[harness];
  if (!options.target && !host.target) fail(`${harness} requires --target DIR`);
  if (options.withAgents && !host.agents) fail(`${harness} does not provide native agents`);
  options.target ??= host.target();
  return options;
}

function statMaybe(file) {
  try {
    return fs.lstatSync(file);
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

// Check every existing ancestor, not just the last path component. In particular,
// a custom target must not redirect writes through a user-created symlink.
function assertSafePath(file, kind) {
  const absolute = path.resolve(file);
  const root = path.parse(absolute).root;
  const parts = absolute.slice(root.length).split(path.sep).filter(Boolean);
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    const stat = statMaybe(current);
    if (!stat) continue;
    if (stat.isSymbolicLink()) fail(`Symlink paths are not supported: ${current}`);
    const expected = i === parts.length - 1 ? kind : 'directory';
    if (expected === 'directory' ? !stat.isDirectory() : !stat.isFile()) {
      fail(`Expected ${expected}: ${current}`);
    }
  }
}

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function safeRelative(file) {
  if (typeof file !== 'string' || !file || /[\\:<>"|?*\x00-\x1f]/.test(file)) {
    fail(`Unsafe managed path: ${JSON.stringify(file)}`);
  }
  const unsafeSegment = file.split('/').some(part =>
    !part || part === '.' || part === '..' || /[. ]$/.test(part) ||
    /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part));
  if (unsafeSegment || file === manifestName || file.startsWith(`${manifestName}/`)) {
    fail(`Unsafe managed path: ${JSON.stringify(file)}`);
  }
  return file;
}

function destination(target, relative) {
  return path.join(target, ...safeRelative(relative).split('/'));
}

function readManifest(target, harness) {
  const file = path.join(target, manifestName);
  assertSafePath(file, 'file');
  if (!statMaybe(file)) return { schemaVersion: 1, harness, files: Object.create(null) };
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    fail(`Malformed manifest: ${file}`);
  }
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest) || Object.keys(manifest).sort().join(',') !== 'files,harness,schemaVersion' || manifest.schemaVersion !== 1 || manifest.harness !== harness || !manifest.files || typeof manifest.files !== 'object' || Array.isArray(manifest.files)) {
    fail(`Unsupported or malformed manifest: ${file}`);
  }
  for (const [relative, hash] of Object.entries(manifest.files)) {
    safeRelative(relative);
    if (typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash)) fail(`Invalid managed hash: ${relative}`);
  }
  return manifest;
}

function readBundle(options) {
  const bundle = new Map();
  function addFile(source, relative) {
    assertSafePath(source, 'file');
    const stat = fs.lstatSync(source);
    if (!stat.isFile()) fail(`Expected packaged regular file: ${source}`);
    // readFileSync reports unreadable files instead of silently omitting them.
    bundle.set(safeRelative(relative), fs.readFileSync(source));
  }
  function addTree(source, relative) {
    assertSafePath(source, 'directory');
    for (const entry of fs.readdirSync(source, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(source, entry.name);
      const output = `${relative}/${entry.name}`;
      if (entry.isDirectory()) addTree(file, output);
      else if (entry.isFile()) addFile(file, output);
      else fail(`Unsupported packaged entry: ${file}`);
    }
  }
  for (const skill of [...coreSkills, ...supportSkills]) {
    const source = path.join(sourceRoot, 'skills', skill);
    const relative = [hosts[options.harness].skills, skill].filter(Boolean).join('/');
    addTree(source, relative);
    if (!bundle.has(`${relative}/SKILL.md`)) fail(`Missing packaged SKILL.md: ${source}`);
  }
  if (options.withAgents) {
    for (const role of roles) {
      const host = hosts[options.harness];
      const name = `leanflow-${role}.${host.extension}`;
      addFile(path.join(sourceRoot, 'harnesses', options.harness, 'agents', name), `${host.agents}/${name}`);
    }
  }
  if (options.harness === 'agy') {
    bundle.set('plugin.json', Buffer.from(`${JSON.stringify({ name: 'leanflow', version: '0.1.0' }, null, 2)}\n`));
  }
  return bundle;
}

function preflight(options, bundle) {
  assertSafePath(options.target, 'directory');
  const manifest = readManifest(options.target, options.harness);
  const files = new Map(Object.entries(manifest.files));
  // Validate even no-longer-bundled files. They remain owned and are never removed.
  for (const [relative, hash] of files) {
    const file = destination(options.target, relative);
    assertSafePath(file, 'file');
    if (!statMaybe(file) || digest(fs.readFileSync(file)) !== hash) fail(`Locally edited or missing managed file: ${file}`);
  }
  const writes = [];
  for (const [relative, bytes] of bundle) {
    const file = destination(options.target, relative);
    assertSafePath(file, 'file');
    const stat = statMaybe(file);
    const hash = digest(bytes);
    const currentHash = stat ? digest(fs.readFileSync(file)) : undefined;
    if (stat && !files.has(relative) && currentHash !== hash) fail(`Conflicting unmanaged file: ${file}`);
    if (files.has(relative) && currentHash !== hash && !options.update) fail(`Managed update requires --update: ${file}`);
    if (currentHash !== hash) writes.push({ file, bytes });
    files.set(relative, hash);
  }
  // Detect path collisions between retained manifest entries and new bundle files
  // before creating anything, including a manifest entry that is a file's parent.
  const paths = new Set([...files.keys(), manifestName]);
  for (const relative of paths) {
    const parts = relative.split('/');
    for (let i = 1; i < parts.length; i++) {
      if (paths.has(parts.slice(0, i).join('/'))) fail(`Managed path collision: ${relative}`);
    }
  }
  const next = { schemaVersion: 1, harness: options.harness, files: Object.fromEntries([...files].sort(([a], [b]) => a.localeCompare(b))) };
  const manifestBytes = Buffer.from(`${JSON.stringify(next, null, 2)}\n`);
  const manifestPath = path.join(options.target, manifestName);
  if (!statMaybe(manifestPath) || !fs.readFileSync(manifestPath).equals(manifestBytes)) writes.push({ file: manifestPath, bytes: manifestBytes });
  return writes;
}

function atomicWrite(file, bytes) {
  assertSafePath(file, 'file');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  assertSafePath(file, 'file');
  const temporary = path.join(path.dirname(file), `.leanflow-${randomUUID()}.tmp`);
  try {
    fs.writeFileSync(temporary, bytes, { flag: 'wx', mode: 0o644 });
    assertSafePath(file, 'file');
    fs.renameSync(temporary, file);
  } finally {
    if (statMaybe(temporary)) fs.unlinkSync(temporary);
  }
}

try {
  const args = process.argv.slice(2);
  const help = (args.length === 1 && ['--help', '-h'].includes(args[0])) ||
    (args.length === 2 && Object.hasOwn(hosts, args[0]) && ['--help', '-h'].includes(args[1]));
  if (help) {
    console.log(usage);
    console.log('Install seven main skills and ten model-invokable supporting skills; add --with-agents for native roles. codex and generic require an explicit --target.');
    process.exit(0);
  }
  const options = parseArgs(args);
  const bundle = readBundle(options);
  const writes = preflight(options, bundle);
  if (options.dryRun) {
    console.log(`Dry run: ${writes.length} file writes planned for ${options.target}; no filesystem changes.`);
  } else {
    // Each replacement is atomic; failures can leave a partially installed bundle.
    // There is deliberately no whole-bundle rollback or automatic file removal.
    for (const { file, bytes } of writes) atomicWrite(file, bytes);
    console.log(`Installed ${options.harness} bundle at ${options.target} (${writes.length} file writes).`);
  }
  console.log('Writes are atomic per file, not a whole-bundle transaction; no automatic rollback or removal.');
} catch (error) {
  console.error(`LeanFlow install failed: ${error.message}`);
  process.exitCode = 1;
}
