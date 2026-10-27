'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const repo = path.resolve(__dirname, '..');

test('installer migrates telemetry opt-ins without losing user settings or MCP authentication', { skip: process.platform === 'win32' }, () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-privacy-'));
  const settingsPath = path.join(home, '.gemini/antigravity-cli/settings.json');
  const mcpPath = path.join(home, '.gemini/config/mcp_config.json');
  const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
  const install = (...args) => cp.spawnSync('bash', [path.join(repo, 'install.sh'), `--workspace=${home}/workspace`, ...args], {
    env: { ...process.env, HOME: home }, encoding: 'utf8',
  });
  try {
    const workspace = path.join(home, 'workspace');
    const ignorePath = path.join(workspace, '.gitignore');
    fs.mkdirSync(workspace);
    const git = (...args) => cp.spawnSync('git', args, { cwd: workspace, encoding: 'utf8' });
    let gitResult = git('init', '--quiet');
    assert.equal(gitResult.status, 0, gitResult.stderr);
    fs.writeFileSync(ignorePath, '# user rules\r\n/user-cache/');
    fs.mkdirSync(path.join(workspace, '.workflow'));
    fs.writeFileSync(path.join(workspace, '.workflow/existing.md'), 'preserve tracked artifact');
    gitResult = git('add', '.workflow/existing.md');
    assert.equal(gitResult.status, 0, gitResult.stderr);
    let result = install('--dry-run');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(home, '.gemini')), false);
    assert.equal(fs.readFileSync(ignorePath, 'utf8'), '# user rules\r\n/user-cache/');
    result = install();
    assert.equal(result.status, 0, result.stderr);
    const expectedIgnore = fs.readFileSync(ignorePath, 'utf8');
    assert.ok(expectedIgnore.startsWith('# user rules\r\n/user-cache/'));
    for (const file of ['workflow/future.md', '.workflow/plans/future.md']) {
      gitResult = git('check-ignore', file);
      assert.equal(gitResult.status, 0, gitResult.stderr);
    }
    gitResult = git('ls-files', '--error-unmatch', '.workflow/existing.md');
    assert.equal(gitResult.status, 0, gitResult.stderr);
    assert.equal(fs.readFileSync(path.join(workspace, '.workflow/existing.md'), 'utf8'), 'preserve tracked artifact');
    const skillsDir = path.join(home, '.gemini/config/skills');
    const customSkill = path.join(skillsDir, 'my-local-skill', 'SKILL.md');
    fs.mkdirSync(path.dirname(customSkill));
    fs.writeFileSync(customSkill, 'local skill: preserve unchanged');
    const helperFile = path.join(skillsDir, 'plan', 'notes.txt');
    fs.mkdirSync(path.dirname(helperFile));
    fs.writeFileSync(helperFile, 'helper-only directory is not a legacy skill');
    assert.equal(read(settingsPath).showFeedbackSurvey, false);
    assert.equal(read(mcpPath).mcpServers.context7.env.OTEL_SDK_DISABLED, 'true');
    assert.equal(read(mcpPath).mcpServers.codegraph.env.CODEGRAPH_TELEMETRY, '0');
    const preferences = { model: 'custom-model', trustedWorkspaces: ['/custom'], toolPermission: 'strict', nested: { keep: 42 } };
    const servers = {
      renamedContext: { command: 'npx', args: ['-y', '@upstash/context7-mcp@4.1.2'], env: { OTEL_SDK_DISABLED: 'false', API_KEY: 'fixture-only' } },
      graph: { command: 'npx', args: ['@colbymchenry/codegraph', 'serve', '--mcp'], env: { CODEGRAPH_TELEMETRY: '1', DO_NOT_TRACK: '0' } },
      github: { command: 'npx', args: ['@modelcontextprotocol/server-github'], env: { GITHUB_PERSONAL_ACCESS_TOKEN: 'fixture-token' } },
      custom: { url: 'https://example.invalid/mcp', disabled: true },
    };
    fs.writeFileSync(settingsPath, '\uFEFF' + JSON.stringify({ ...preferences, showFeedbackSurvey: true }));
    fs.writeFileSync(mcpPath, JSON.stringify({ mcpServers: servers, other: 'preserve' }));
    result = install();
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(read(settingsPath), { ...preferences, showFeedbackSurvey: false });
    const migrated = read(mcpPath);
    assert.deepEqual(migrated.mcpServers.github, servers.github);
    assert.deepEqual(migrated.mcpServers.custom, servers.custom);
    assert.equal(migrated.other, 'preserve');
    assert.deepEqual(migrated.mcpServers.renamedContext.env, { OTEL_SDK_DISABLED: 'true', API_KEY: 'fixture-only' });
    assert.deepEqual(migrated.mcpServers.graph.env, { CODEGRAPH_TELEMETRY: '0', DO_NOT_TRACK: '1' });
    const once = fs.readFileSync(mcpPath, 'utf8');
    result = install();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(mcpPath, 'utf8'), once);
    assert.equal(fs.readFileSync(ignorePath, 'utf8'), expectedIgnore);
    assert.equal(fs.readFileSync(customSkill, 'utf8'), 'local skill: preserve unchanged');
    assert.equal(fs.readFileSync(helperFile, 'utf8'), 'helper-only directory is not a legacy skill');
    fs.writeFileSync(mcpPath, '{invalid');
    const before = fs.readFileSync(settingsPath, 'utf8');
    result = install();
    assert.notEqual(result.status, 0);
    assert.equal(fs.readFileSync(mcpPath, 'utf8'), '{invalid');
    assert.equal(fs.readFileSync(settingsPath, 'utf8'), before);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

function snapshot(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .map(entry => {
      const file = path.join(directory, entry.name);
      return [entry.name, entry.isDirectory() ? snapshot(file) : fs.readFileSync(file).toString('base64')];
    });
}

const powerShell = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';
const hasPowerShell = cp.spawnSync(powerShell, ['-NoProfile', '-Command', 'exit 0'], { encoding: 'utf8' }).status === 0;
for (const shell of ['bash', powerShell]) {
  const unavailable = shell === 'bash' ? process.platform === 'win32' : !hasPowerShell;
  test(`${shell} installer refuses legacy skills before changing destination files, including dry-run`, { skip: unavailable }, () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), 'leanflow-legacy-install-'));
    const config = path.join(home, '.gemini/config');
    const cli = path.join(home, '.gemini/antigravity-cli');
    const workspace = path.join(home, 'workspace');
    const skills = path.join(config, 'skills');
    try {
      fs.mkdirSync(skills, { recursive: true });
      fs.mkdirSync(cli, { recursive: true });
      fs.mkdirSync(workspace);
      fs.writeFileSync(path.join(config, 'AGENTS.md'), 'user guidance: do not overwrite');
      fs.writeFileSync(path.join(config, 'mcp_config.json'), '{"mcpServers":{}}');
      fs.writeFileSync(path.join(cli, 'settings.json'), '{"showFeedbackSurvey":true,"userValue":"keep"}');
      fs.writeFileSync(path.join(workspace, '.gitignore'), '# user rules\n/user-cache/\n');
      fs.mkdirSync(path.join(skills, 'my-local-skill'));
      fs.writeFileSync(path.join(skills, 'my-local-skill/SKILL.md'), 'unrelated local skill');
      for (const name of ['plan', 'ast-grep', 'flashplan', 'superplan', 'hyperplan']) {
        const legacy = path.join(skills, name);
        fs.mkdirSync(legacy);
        fs.writeFileSync(path.join(legacy, 'SKILL.md'), `user-modified ${name} skill`);
        fs.writeFileSync(path.join(legacy, 'notes.txt'), 'preserve local notes');
        const beforeConfig = snapshot(path.join(home, '.gemini'));
        const beforeWorkspace = snapshot(workspace);
        for (const dryRun of [false, true]) {
          const args = shell === 'bash'
            ? [path.join(repo, 'install.sh'), `--workspace=${workspace}`, ...(dryRun ? ['--dry-run'] : [])]
            : ['-NoProfile', '-File', path.join(repo, 'install.ps1'), '-Workspace', workspace, ...(dryRun ? ['-DryRun'] : [])];
          const result = cp.spawnSync(shell, args, {
            env: { ...process.env, HOME: home, USERPROFILE: home }, encoding: 'utf8',
          });
          assert.notEqual(result.status, 0, `${name}: installer unexpectedly accepted legacy skill`);
          const output = result.stdout + result.stderr;
          assert.ok(output.includes(path.join(legacy, 'SKILL.md')), output);
          assert.deepEqual(snapshot(path.join(home, '.gemini')), beforeConfig);
          assert.deepEqual(snapshot(workspace), beforeWorkspace);
          assert.equal(fs.readdirSync(home).some(entry => entry.startsWith('.gemini.bak.')), false);
        }
        fs.rmSync(legacy, { recursive: true });
      }
    } finally {
      fs.rmSync(home, { recursive: true, force: true });
    }
  });
}
