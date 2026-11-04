#!/usr/bin/env node
/**
 * Balance sampler.
 *
 * Loads the built client.js in a tiny sandbox, reaches into the factory closure
 * via an injected hook, then simulates duels for several build profiles and
 * reports win rates for the three opponent tiers.
 *
 * Usage:  node dev/balance.cjs [battles]
 * Requires: npm install  (for react)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CLIENT = path.join(ROOT, 'client.js');
const ANCHOR = "    return {\n      inject: ['slots', 'locale'],";
const HOOK = [
  '    window.__DH_BAL = {',
  '      newStateV3: newStateV3,',
  '      v3Derived: v3Derived,',
  '      v3MakeEquip: v3MakeEquip,',
  '      v3MakeOpponents: v3MakeOpponents,',
  '      v3Battle: v3Battle,',
  '      v3EquipTier: v3EquipTier,',
  '      SKILL_TREE: SKILL_TREE,',
  '      SECT_KEYS: SECT_KEYS,',
  '    };',
  '',
].join('\n');

let src = fs.readFileSync(CLIENT, 'utf8');
if (src.indexOf(ANCHOR) < 0) throw new Error('apply() anchor not found in client.js — run npm run build first');
src = src.replace(ANCHOR, HOOK + ANCHOR);

let captured = null;
const sandbox = {
  window: { __ModuleLoader__: { load: function (mod) { captured = mod; } } },
  console: console,
  Math: Math,
  JSON: JSON,
  Date: Date,
};
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'client.js' });
if (!captured) throw new Error('client module was not registered');

const React = require('react');
captured.factory(function (name) {
  if (name === 'react') return React;
  throw new Error('unexpected require: ' + name);
});
const G = sandbox.window.__DH_BAL;
if (!G) throw new Error('balance hook missing');

const LEVELS = [15, 30, 50, 70, 90, 99, 100];
const PROFILES = {
  strong: { weights: [0.25, 0.05, 0.35, 0.2, 0.15], quality: 'official', skills: 'all' },
  typical: { weights: [0.2, 0.05, 0.35, 0.25, 0.15], quality: 'private', skills: 'first2' },
  weak: { weights: [0.2, 0.05, 0.35, 0.25, 0.15], quality: 'private', skills: 'none' },
};
const KEYS = ['con', 'int', 'str', 'end', 'agi'];
const FAKE_NAME = '校验侠';

function makeBuild(sect, level, profile) {
  const s = G.newStateV3(FAKE_NAME);
  s.level = level;
  const pot = (level - 1) * 3;
  const weights = PROFILES[profile].weights;
  KEYS.forEach(function (k, i) { s[k] = 5 + Math.floor(pot * weights[i]); });
  s.potential = 0;
  s.skillPoints = 99;
  const skills = G.SKILL_TREE[sect].base;
  skills.forEach(function (sk, i) {
    if (level < sk.lv) return;
    if (PROFILES[profile].skills === 'all' ||
        (PROFILES[profile].skills === 'first2' && i < 2)) {
      s.skills[sk.id] = true;
    }
  });
  const tier = G.v3EquipTier(s);
  const q = PROFILES[profile].quality;
  s.equip = {
    weapon: G.v3MakeEquip(sect, 'weapon', tier, q),
    armor: G.v3MakeEquip(sect, 'armor', tier, q),
  };
  return s;
}

const battles = Math.max(20, Number(process.argv[2]) || 200);
const rows = [];
G.SECT_KEYS.forEach(function (sect) {
  LEVELS.forEach(function (level) {
    Object.keys(PROFILES).forEach(function (profile) {
      const s = makeBuild(sect, level, profile);
      const acc = { easy: 0, normal: 0, hard: 0, n: { easy: 0, normal: 0, hard: 0 } };
      for (let round = 0; round < battles; round += 1) {
        const ops = G.v3MakeOpponents(s);
        ops.forEach(function (op) {
          const res = G.v3Battle(s, op.enemy);
          if (res.win) acc[op.key] += 1;
          acc.n[op.key] += 1;
        });
      }
      const pct = function (k) { return Math.round((acc[k] / acc.n[k]) * 1000) / 10; };
      rows.push({
        sect: sect, level: level, profile: profile,
        easy: pct('easy'), normal: pct('normal'), hard: pct('hard'),
      });
    });
  });
});

console.log('battles per opponent: ' + battles);
console.log('sect      lv  profile   easy   normal  hard');
rows.forEach(function (r) {
  console.log(
    r.sect.padEnd(9) + String(r.level).padEnd(4) + r.profile.padEnd(9) +
    String(r.easy).padStart(6) + String(r.normal).padStart(9) + String(r.hard).padStart(6)
  );
});
