#!/usr/bin/env node
'use strict';

// Shared by both installers; preserve routing, permissions, credentials, and servers.
const fs = require('node:fs');
const [settingsPath, mcpPath, mode] = process.argv.slice(2);
if (!settingsPath || !mcpPath || (mode && mode !== '--check')) {
  console.error('Usage: node apply-privacy.cjs <settings.json> <mcp_config.json> [--check]');
  process.exit(1);
}
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function load(file) {
  if (!fs.existsSync(file)) return {};
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    // Parse errors can echo credential-bearing JSON; report only its path.
    throw new Error(`Invalid JSON in ${file}`);
  }
  if (!isObject(value)) throw new Error(`${file} must contain a JSON object`);
  return value;
}
function save(file, value) {
  const temporaryPath = `${file}.privacy-${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, {
      mode: fs.existsSync(file) ? fs.statSync(file).mode & 0o777 : 0o600,
      flag: 'wx',
    });
    fs.renameSync(temporaryPath, file);
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}
try {
  const settings = load(settingsPath);
  const mcp = load(mcpPath);
  if (mcp.mcpServers !== undefined && !isObject(mcp.mcpServers)) {
    throw new Error('mcpServers must be a JSON object');
  }
  let mcpChanged = false;
  for (const server of Object.values(mcp.mcpServers || {})) {
    if (!isObject(server) || !server.command || !Array.isArray(server.args)) continue;
    const hasPackage = name => server.args.some(arg => typeof arg === 'string' && (arg === name || arg.startsWith(`${name}@`)));
    let controls;
    if (hasPackage('@upstash/context7-mcp')) controls = { OTEL_SDK_DISABLED: 'true' };
    if (hasPackage('@colbymchenry/codegraph')) controls = { CODEGRAPH_TELEMETRY: '0', DO_NOT_TRACK: '1' };
    if (!controls) continue;
    if (server.env !== undefined && !isObject(server.env)) {
      throw new Error('Recognized MCP server env must be a JSON object');
    }
    server.env = { ...server.env, ...controls };
    mcpChanged = true;
  }
  if (mode === '--check') {
    console.log('Privacy preflight passed (CLI and MCP configuration).');
  } else {
    settings.showFeedbackSurvey = false;
    save(settingsPath, settings);
    if (mcpChanged) save(mcpPath, mcp);
    console.log('Feedback surveys disabled; recognized MCP telemetry opt-outs applied.');
  }
} catch (error) {
  console.error(`Cannot apply privacy settings: ${error.message}`);
  process.exit(1);
}
