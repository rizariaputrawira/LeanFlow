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
    let result = install('--dry-run');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(home, '.gemini')), false);
    result = install();
    assert.equal(result.status, 0, result.stderr);
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
