'use strict';
const fs = require('node:fs');
const path = require('node:path');

const [source, destination] = process.argv.slice(2);
if (!source || !destination) {
  console.error('Usage: node check-legacy-skills.cjs <repository> <installed-skills>');
  process.exit(1);
}

// Derive the old identities from shipped packages, including helper-only packages.
const legacyNames = new Set(['flashplan', 'superplan', 'hyperplan']);
for (const relative of ['skills', 'config/skills']) {
  const directory = path.join(source, relative);
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith('leanflow-')) {
      legacyNames.add(entry.name.slice('leanflow-'.length));
    }
  }
}

const conflicts = [...legacyNames].sort().map(name => path.join(destination, name, 'SKILL.md'))
  .filter(file => fs.existsSync(file) && fs.statSync(file).isFile());
if (conflicts.length) {
  console.error('Cannot install namespaced LeanFlow skills: legacy unprefixed skill entries would remain advertised alongside replacements:');
  for (const file of conflicts) console.error(`  - ${file}`);
  console.error('Preserve local changes and explicitly resolve or archive these legacy skill directories outside the discovered skills directory before rerunning. This preflight does not change destination files.');
  process.exitCode = 1;
}
