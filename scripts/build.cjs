#!/usr/bin/env node
/**
 * Build the Client module.
 *
 * The runtime entry is `client.js`, a single-file Cordis Client module. It is
 * assembled from:
 *   - src/shell.js     host shell (module loader, shared helpers, apply())
 *   - src/v3-data.js   static game data
 *   - src/v3-core.js   game logic / balance
 *   - src/v3-ui.js     React UI (registers JianghuPetV3)
 *
 * The V3 sources are spliced right before the shell's `apply()` return block,
 * and the shell's legacy `JianghuPet` registration is switched to `JianghuPetV3`.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const outFile = path.join(ROOT, 'client.js');
const shellFile = path.join(ROOT, 'src', 'shell.js');
const pkgFile = path.join(ROOT, 'package.json');
const v3Files = ['v3-data.js', 'v3-core.js', 'v3-ui.js'];

const ANCHOR = "    return {\n      inject: ['slots', 'locale'],";
const LEGACY_REG = '}, JianghuPet);';
const V3_REG = '}, JianghuPetV3);';

function read(file) {
  if (!fs.existsSync(file)) throw new Error('missing source file: ' + file);
  return fs.readFileSync(file, 'utf8');
}

const shell = read(shellFile);
const pkg = JSON.parse(read(pkgFile));
if (!pkg.name || !pkg.version) throw new Error('package.json must have name and version');

if (shell.indexOf(LEGACY_REG) < 0) throw new Error('legacy component registration not found in src/shell.js');
if (shell.indexOf(ANCHOR) < 0) throw new Error('apply() anchor not found in src/shell.js');

const parts = v3Files.map(function (name) {
  return read(path.join(ROOT, 'src', name)).replace(/\s+$/, '');
});

const aIdx = shell.indexOf(ANCHOR);
let out = shell.slice(0, aIdx) + parts.join('\n\n') + '\n\n' + shell.slice(aIdx);
out = out.replace(LEGACY_REG, V3_REG);

if (out.indexOf('V3 · data') < 0) throw new Error('build sanity check failed: v3 data marker missing');
if ((out.match(/__ModuleLoader__\.load/g) || []).length !== 1) {
  throw new Error('build sanity check failed: expected exactly one module loader call');
}
if (out.indexOf("id: '" + pkg.name + "'") < 0) {
  throw new Error('build sanity check failed: Client loader id must equal package name (' + pkg.name + ')');
}

fs.writeFileSync(outFile, out);
console.log(
  'built client.js: ' +
    Buffer.byteLength(out) +
    ' bytes, ' +
    out.split('\n').length +
    ' lines, v' +
    pkg.version +
    ' (shell + ' +
    v3Files.join(' + ') +
    ')'
);
