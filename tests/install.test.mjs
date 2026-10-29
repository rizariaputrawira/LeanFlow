import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skills = ['leanflow-architecture', 'leanflow-brainstorm', 'leanflow-code-review', 'leanflow-commit-message', 'leanflow-debugging', 'leanflow-domain-modeling', 'leanflow-execute', 'leanflow-git-status', 'leanflow-license-review', 'leanflow-orchestrate', 'leanflow-plan', 'leanflow-plan-review', 'leanflow-pr-work', 'leanflow-research', 'leanflow-security-review', 'leanflow-to-spec', 'leanflow-writing'];
const manifestName = '.leanflow-manifest.json';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

function fixture(t, { sourceCopy = false } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'leanflow-install-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const home = path.join(root, 'home');
  fs.mkdirSync(home);
  let source = repo;
  if (sourceCopy) {
    source = path.join(root, 'source');
    for (const entry of ['scripts/install.mjs', 'skills', 'harnesses']) {
      const to = path.join(source, entry);
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.cpSync(path.join(repo, entry), to, { recursive: true });
    }
  }
  const target = path.join(root, 'target');
  const env = { ...process.env, HOME: home, USERPROFILE: home };
  return {
    root, home, source, target,
    run: (...args) => spawnSync(process.execPath, [path.join(source, 'scripts/install.mjs'), ...args], { env, encoding: 'utf8' }),
    env,
  };
}

function snapshot(directory) {
  if (!fs.existsSync(directory)) return null;
  return fs.readdirSync(directory).sort().map(name => {
    const file = path.join(directory, name);
    const stat = fs.lstatSync(file);
    return [name, stat.isSymbolicLink() ? ['symlink', fs.readlinkSync(file)] : stat.isDirectory() ? snapshot(file) : fs.readFileSync(file).toString('base64')];
  });
}

function success(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function refused(result) {
  assert.notEqual(result.status, 0, result.stdout);
}

function put(file, bytes) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, bytes);
}

function manifest(target) {
  return JSON.parse(fs.readFileSync(path.join(target, manifestName), 'utf8'));
}

function discoveredSkills(directory) {
  return fs.readdirSync(directory).filter(name => fs.existsSync(path.join(directory, name, 'SKILL.md'))).sort();
}

for (const harness of ['omp', 'agy', 'claude', 'codex']) {
  const skillDirectory = harness === 'codex' ? '.agents/skills' : 'skills';
  const agentDirectory = harness === 'codex' ? '.codex/agents' : 'agents';
  const agentExtension = harness === 'codex' ? 'toml' : 'md';
  test(`${harness}: dry-run preflights without creating a target or home config`, t => {
    const f = fixture(t);
    success(f.run(harness, '--target', f.target, '--dry-run'));
    assert.equal(fs.existsSync(f.target), false);
    assert.deepEqual(fs.readdirSync(f.home), []);
    if (harness === 'codex') refused(f.run(harness, '--dry-run'));
    else success(f.run(harness, '--dry-run'));
    assert.deepEqual(fs.readdirSync(f.home), []);
  });

  test(`${harness}: fresh install contains seven main and ten supporting skills without agents by default`, t => {
    const f = fixture(t);
    success(f.run(harness, '--target', f.target));
    assert.deepEqual(discoveredSkills(path.join(f.target, skillDirectory)), skills);
    assert.equal(fs.existsSync(path.join(f.target, agentDirectory)), false);
    if (harness !== 'agy') assert.equal(fs.existsSync(path.join(f.target, 'plugin.json')), false);
    assert.equal(fs.existsSync(path.join(f.target, 'config.toml')), false);
    const state = manifest(f.target);
    assert.equal(state.schemaVersion, 1);
    assert.equal(state.harness, harness);
    for (const [relative, expected] of Object.entries(state.files)) {
      assert.equal(hash(fs.readFileSync(path.join(f.target, relative))), expected);
      assert.ok(relative.startsWith(`${skillDirectory}/leanflow-`) || (harness === 'agy' && relative === 'plugin.json'));
    }
    if (harness === 'agy') {
      const plugin = JSON.parse(fs.readFileSync(path.join(f.target, 'plugin.json'), 'utf8'));
      assert.equal(plugin.name, 'leanflow');
      assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
    }
    const before = snapshot(f.target);
    success(f.run(harness, '--target', f.target));
    assert.deepEqual(snapshot(f.target), before);
  });

  test(`${harness}: agents are opt-in and retained when omitted later`, t => {
    const f = fixture(t);
    success(f.run(harness, '--target', f.target, '--with-agents'));
    assert.deepEqual(fs.readdirSync(path.join(f.target, agentDirectory)).sort(), ['executor', 'planner', 'reviewer'].map(role => `leanflow-${role}.${agentExtension}`));
    const before = snapshot(f.target);
    success(f.run(harness, '--target', f.target));
    assert.deepEqual(snapshot(f.target), before);
  });

  test(`${harness}: existing settings, unrelated skills, and workspace bytes survive`, t => {
    const f = fixture(t);
    const existing = new Map([
      [path.join(f.target, 'settings.json'), '{"model":"mine","approval":"ask","telemetry":true}\n'],
      [path.join(f.target, 'AGENTS.md'), 'private global instructions\n'],
      [path.join(f.target, 'mcp_config.json'), '{"mcpServers":{"private":{"credential":"fixture"}}}\n'],
      [path.join(f.target, 'config.toml'), 'model = "keep-existing"\n'],
      [path.join(f.target, '.codex', 'config.toml'), '[features]\nuser_feature = true\n'],
      [path.join(f.target, 'skills', 'personal', 'SKILL.md'), 'user skill\n'],
      [path.join(f.root, 'workspace', '.gitignore'), '# user rules\n'],
      [path.join(f.root, 'workspace', '.workflow', 'plan.md'), 'private plan\n'],
    ]);
    for (const [file, bytes] of existing) put(file, bytes);
    success(f.run(harness, '--target', f.target));
    for (const [file, bytes] of existing) assert.equal(fs.readFileSync(file, 'utf8'), bytes);
    assert.deepEqual(fs.readdirSync(f.home), []);
  });
}

test('default destinations stay within the selected home adapter directory', t => {
  const f = fixture(t);
  success(f.run('omp'));
  success(f.run('agy'));
  success(f.run('claude'));
  const omp = path.join(f.home, '.omp', 'agent');
  const agy = path.join(f.home, '.gemini', 'config', 'plugins', 'leanflow');
  assert.deepEqual(discoveredSkills(path.join(omp, 'skills')), skills);
  assert.deepEqual(discoveredSkills(path.join(agy, 'skills')), skills);
  assert.deepEqual(discoveredSkills(path.join(f.home, '.claude', 'skills')), skills);
  assert.deepEqual(fs.readdirSync(path.join(f.home, '.gemini', 'config')), ['plugins']);
});

test('generic installs into an explicit skill root without native metadata or agents', t => {
  const f = fixture(t);
  success(f.run('generic', '--target', f.target));
  assert.deepEqual(discoveredSkills(f.target), skills);
  assert.equal(fs.existsSync(path.join(f.target, 'skills')), false);
  assert.equal(fs.existsSync(path.join(f.target, 'plugin.json')), false);
  assert.equal(fs.existsSync(path.join(f.target, 'agents')), false);
  const before = snapshot(f.target);
  refused(f.run('generic', '--target', f.target, '--with-agents'));
  assert.deepEqual(snapshot(f.target), before);
});

test('updates require consent and preserve retained managed files', t => {
  const f = fixture(t, { sourceCopy: true });
  success(f.run('omp', '--target', f.target));
  const relative = 'skills/leanflow-plan/SKILL.md';
  const source = path.join(f.source, relative);
  const changed = `${fs.readFileSync(source, 'utf8')}\nDisposable integration-test revision.\n`;
  fs.writeFileSync(source, changed);
  const retained = 'agents/retired-local-bundle.md';
  put(path.join(f.target, retained), 'unchanged former bundle asset');
  const state = manifest(f.target);
  state.files[retained] = hash(fs.readFileSync(path.join(f.target, retained)));
  fs.writeFileSync(path.join(f.target, manifestName), JSON.stringify(state));
  const before = snapshot(f.target);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.target), before);
  success(f.run('omp', '--target', f.target, '--update', '--dry-run'));
  assert.deepEqual(snapshot(f.target), before);
  success(f.run('omp', '--target', f.target, '--update'));
  assert.equal(fs.readFileSync(path.join(f.target, relative), 'utf8'), changed);
  assert.equal(manifest(f.target).files[relative], hash(Buffer.from(changed)));
  assert.equal(fs.readFileSync(path.join(f.target, retained), 'utf8'), 'unchanged former bundle asset');
  assert.equal(manifest(f.target).files[retained], state.files[retained]);
});

test('edited managed files refuse the entire bundle before any writes', t => {
  const f = fixture(t, { sourceCopy: true });
  success(f.run('omp', '--target', f.target));
  const plan = path.join(f.target, 'skills/leanflow-plan/SKILL.md');
  fs.appendFileSync(plan, '\nLocal edit\n');
  fs.appendFileSync(path.join(f.source, 'skills/leanflow-brainstorm/SKILL.md'), '\nPackaged update\n');
  const before = snapshot(f.target);
  for (const args of [[], ['--update'], ['--update', '--dry-run']]) {
    refused(f.run('omp', '--target', f.target, ...args));
    assert.deepEqual(snapshot(f.target), before);
  }
});

test('unmanaged conflicts refuse before creating any bundle files', t => {
  const f = fixture(t);
  put(path.join(f.target, 'skills/leanflow-plan/SKILL.md'), 'not the bundled skill');
  const before = snapshot(f.target);
  for (const args of [[], ['--update'], ['--dry-run']]) {
    refused(f.run('omp', '--target', f.target, ...args));
    assert.deepEqual(snapshot(f.target), before);
  }
});

test('identical unmanaged files can be adopted, then receive managed edit protection', t => {
  const f = fixture(t);
  const relative = 'skills/leanflow-plan/SKILL.md';
  put(path.join(f.target, relative), fs.readFileSync(path.join(repo, relative)));
  success(f.run('omp', '--target', f.target));
  assert.equal(manifest(f.target).files[relative], hash(fs.readFileSync(path.join(f.target, relative))));
  fs.appendFileSync(path.join(f.target, relative), '\nUser change\n');
  const before = snapshot(f.target);
  refused(f.run('omp', '--target', f.target, '--update'));
  assert.deepEqual(snapshot(f.target), before);
});

test('malformed, unsupported, unsafe, and mismatched manifests never change bytes', t => {
  const f = fixture(t);
  const invalid = [
    '{invalid', 'null', '[]',
    JSON.stringify({ schemaVersion: 2, harness: 'omp', files: {} }),
    JSON.stringify({ schemaVersion: 1, harness: 'agy', files: {} }),
    JSON.stringify({ schemaVersion: 1, harness: 'omp', files: {}, extra: true }),
    JSON.stringify({ schemaVersion: 1, harness: 'omp', files: { 'safe.md': 'not-a-sha256' } }),
    ...['../escape', '/absolute', 'a/../escape', 'a\\escape', 'C:/escape', 'a//b', './safe', manifestName, `${manifestName}/child`].map(relative => JSON.stringify({ schemaVersion: 1, harness: 'omp', files: { [relative]: 'a'.repeat(64) } })),
  ];
  for (const bytes of invalid) {
    put(path.join(f.target, manifestName), bytes);
    const before = snapshot(f.root);
    refused(f.run('omp', '--target', f.target, '--update'));
    assert.deepEqual(snapshot(f.root), before);
  }
});

test('missing managed files and file-directory conflicts never change bytes', t => {
  const f = fixture(t);
  success(f.run('omp', '--target', f.target));
  fs.unlinkSync(path.join(f.target, 'skills/leanflow-plan/SKILL.md'));
  let before = snapshot(f.target);
  refused(f.run('omp', '--target', f.target, '--update'));
  assert.deepEqual(snapshot(f.target), before);
  fs.rmSync(f.target, { recursive: true });
  put(path.join(f.target, 'skills'), 'a file, not a directory');
  before = snapshot(f.target);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.target), before);
});

test('target, ancestor, destination, and manifest symlinks are refused', { skip: process.platform === 'win32' }, t => {
  const f = fixture(t);
  const outside = path.join(f.root, 'outside');
  fs.mkdirSync(outside);
  fs.symlinkSync(outside, f.target);
  let before = snapshot(f.root);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.root), before);
  refused(f.run('omp', '--target', path.join(f.target, 'nested'), '--dry-run'));
  assert.deepEqual(snapshot(f.root), before);
  fs.unlinkSync(f.target);
  fs.mkdirSync(f.target);
  fs.symlinkSync(outside, path.join(f.target, 'skills'));
  before = snapshot(f.root);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.root), before);
  fs.unlinkSync(path.join(f.target, 'skills'));
  const outsideFile = path.join(outside, 'file');
  put(outsideFile, '{}');
  fs.symlinkSync(outsideFile, path.join(f.target, manifestName));
  before = snapshot(f.root);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.root), before);
  fs.unlinkSync(path.join(f.target, manifestName));
  put(path.join(f.target, 'skills/leanflow-plan/placeholder'), 'keep');
  fs.symlinkSync(outsideFile, path.join(f.target, 'skills/leanflow-plan/SKILL.md'));
  before = snapshot(f.root);
  refused(f.run('omp', '--target', f.target));
  assert.deepEqual(snapshot(f.root), before);
});

test('source packaging refuses symlinks and unexpected file types', { skip: process.platform === 'win32' }, t => {
  const f = fixture(t, { sourceCopy: true });
  const file = path.join(f.source, 'skills/leanflow-plan/SKILL.md');
  const outside = path.join(f.root, 'external.md');
  put(outside, fs.readFileSync(file));
  fs.unlinkSync(file);
  fs.symlinkSync(outside, file);
  refused(f.run('omp', '--target', f.target));
  assert.equal(fs.existsSync(f.target), false);
  fs.unlinkSync(file);
  fs.mkdirSync(file);
  refused(f.run('omp', '--target', f.target));
  assert.equal(fs.existsSync(f.target), false);
});

test('bad arguments fail without creating a target or touching home', t => {
  const f = fixture(t);
  const cases = [
    [], ['missing'], ['--dry-run'],
    ['omp', '--target'], ['omp', '--target', '--dry-run'],
    ['omp', '--target', f.target, '--target', f.target],
    ['omp', '--target', f.target, '--dry-run', '--dry-run'],
    ['omp', '--target', f.target, '--update', '--update'],
    ['omp', '--target', f.target, '--with-agents', '--with-agents'],
    ['omp', '--target', f.target, '--unknown'],
    ['omp', '--target', f.target, '--workspace', f.root],
    ['omp', '--target', f.target, 'agy'],
    ['codex'], ['codex', '--dry-run'], ['codex', '--with-agents'],
    ['generic'], ['generic', '--target', f.target, '--with-agents'],
  ];
  const before = snapshot(f.root);
  for (const args of cases) {
    refused(f.run(...args));
    assert.deepEqual(snapshot(f.root), before);
  }
});
