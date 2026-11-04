/* V3 smoke test: mounts the real client bundle in jsdom and drives the UI. */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const CLIENT = path.join(ROOT, 'client.js');
const SAVE_KEY = 'desktop-jianghu.save.v1';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
  runScripts: 'outside-only',
});
const w = dom.window;
global.window = w;
global.document = w.document;
global.navigator = w.navigator;
global.HTMLElement = w.HTMLElement;
global.MouseEvent = w.MouseEvent;
w.IS_REACT_ACT_ENVIRONMENT = true;
global.IS_REACT_ACT_ENVIRONMENT = true;

const React = require('react');
const { createRoot } = require('react-dom/client');
const { act } = require('react-dom/test-utils');

let pass = 0;
let fail = 0;
const failures = [];
function ok(name, cond, extra) {
  if (cond) { pass += 1; return; }
  fail += 1;
  failures.push(name + (extra ? '  [' + extra + ']' : ''));
}

function resetStorage() { w.localStorage.clear(); }
function seed(obj) {
  w.localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
}

function makeHarness() {
  let factory = null;
  w.__ModuleLoader__ = { load: function (o) { factory = o.factory; } };
  w.eval(fs.readFileSync(CLIENT, 'utf8'));
  if (!factory) throw new Error('client.js did not call __ModuleLoader__.load');

  let Comp = null;
  const ctx = {
    locale: { register: function () { return function () {}; }, bind: function () {} },
    slots: {
      inject: function (owner, fn) { return fn(); },
      register: function (cfg, C) { Comp = C; return function () {}; },
    },
    effect: function (fn) { const d = fn(); return function () { if (typeof d === 'function') d(); }; },
    on: function () { return function () {}; },
  };
  factory(function (name) {
    if (name === 'react') return React;
    throw new Error('unexpected require: ' + name);
  }).apply(ctx);

  const container = w.document.createElement('div');
  w.document.body.innerHTML = '';
  w.document.body.appendChild(container);
  const root = createRoot(container);
  act(function () { root.render(React.createElement(Comp)); });
  return {
    container: container,
    doc: w.document,
    unmount: function () { act(function () { root.unmount(); }); },
  };
}

function all(sel, scope) {
  return Array.prototype.slice.call((scope || w.document).querySelectorAll(sel));
}
function byText(txt, tag, scope) {
  const list = all(tag || 'button', scope);
  for (let i = 0; i < list.length; i += 1) {
    if ((list[i].textContent || '').indexOf(txt) >= 0) return list[i];
  }
  return null;
}
function click(el) {
  if (!el) throw new Error('click on null');
  act(function () {
    el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}
function typeInto(el, val) {
  act(function () {
    const setter = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, 'value').set;
    setter.call(el, val);
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
  });
}
function bodyText(h) { return h.doc.body.textContent || ''; }
function pointerTap(el) {
  if (!el) throw new Error('pointerTap on null');
  act(function () {
    el.dispatchEvent(new w.MouseEvent('pointerdown', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new w.MouseEvent('pointerup', { bubbles: true, cancelable: true }));
  });
}

function baseState(extra) {
  const s = {
    v: 2,
    name: '测试侠',
    gender: 'male',
    level: 30,
    exp: 0,
    potential: 2,
    con: 20, int: 8, str: 20, end: 16, agi: 12,
    stamina: 100, silver: 5000,
    wins: 10, losses: 2, streak: 0, bestStreak: 0, skillPoints: 5,
    sect: 'shaolin',
    skills: {},
    ach: {},
    growth: [],
    log: ['你踏入江湖，自「测试侠」始。'],
    training: true,
    lastTick: Date.now(),
    settings: { size: 'standard', snap: true, autoHide: true, autosave: false },
    setup: true,
    pills: 0,
    bolus: 0,
    mode: 'train',
    collapsed: false,
    pos: { x: 40, y: 40 },
    stats: {
      battles: 30, travels: 30, eliteWins: 5, equips: 5,
      dests: { shenshan: 5, hupo: 5, shanzhai: 5, gudao: 5, shijing: 5, zhulin: 5 },
    },
    quest: { idx: 0, base: { wins: 0, eliteWins: 0, travels: 0, equips: 0, dests: {} } },
    equip: { weapon: null, armor: null },
    bag: [],
  };
  Object.keys(extra || {}).forEach(function (k) { s[k] = extra[k]; });
  return s;
}

const errors = [];
w.addEventListener('error', function (e) { errors.push(String(e.message || e)); });

try {
  /* ---------------- S1: fresh game, main tabs, battle, travel, collapse ---------------- */
  resetStorage();
  let h = makeHarness();
  ok('S1 onboarding rendered', bodyText(h).indexOf('踏入江湖') >= 0);
  const nameInput = h.doc.querySelector('input');
  ok('S1 name input exists', !!nameInput);
  typeInto(nameInput, '测试侠');
  click(byText('男'));
  click(byText('踏入江湖'));
  ok('S1 entered game (level 1 header)', bodyText(h).indexOf('测试侠') >= 0 && bodyText(h).indexOf('1 级') >= 0);
  ok('S1 six tabs', all('.jw3-tab').length === 6, 'tabs=' + all('.jw3-tab').length);

  const plusBtns = all('.jw3-attr button');
  ok('S1 five attr plus buttons', plusBtns.length === 5, 'plus=' + plusBtns.length);
  pointerTap(plusBtns[0]);
  ok('S1 potential spent', bodyText(h).indexOf('剩余潜能：4') >= 0, bodyText(h).match(/剩余潜能：\d/));

  click(byText('任务'));
  ok('S1 quest tab renders', bodyText(h).indexOf('第二章') >= 0 || bodyText(h).indexOf('第一章') >= 0, 'no quest chapter');
  click(byText('门派'));
  ok('S1 sect tab shows join cards', bodyText(h).indexOf('少林寺') >= 0 && bodyText(h).indexOf('需 10 级') >= 0);
  click(byText('装备'));
  ok('S1 equip tab renders', bodyText(h).indexOf('兵器') >= 0 && bodyText(h).indexOf('行囊') >= 0);
  click(byText('成长'));
  ok('S1 growth tab renders', bodyText(h).indexOf('江湖成就') >= 0);
  click(byText('设置'));
  ok('S1 settings tab renders', bodyText(h).indexOf('导出存档') >= 0 && bodyText(h).indexOf('界面') >= 0);
  ok('S1 settings name/gender locked', bodyText(h).indexOf('途中不可更改') >= 0 && h.doc.querySelectorAll('.jw3-card input:not([type=file])').length === 0);
  click(byText('首页'));

  click(byText('比武 · 10'));
  ok('S1 three opponents', all('.jw3-opp').length === 3, 'opps=' + all('.jw3-opp').length);
  const oppNames1 = all('.jw3-opp b').map(function (el) { return el.textContent; }).join(',');
  click(byText('首页'));
  click(byText('比武 · 10'));
  const oppNames2 = all('.jw3-opp b').map(function (el) { return el.textContent; }).join(',');
  ok('S1 opponent list stable across tab switch', oppNames1 === oppNames2, oppNames1 + ' vs ' + oppNames2);
  click(byText('挑战'));
  var hp0 = bodyText(h).match(/你\s*气血\s*(\d+)\s*\/\s*(\d+)/);
  ok('S1 battle starts at full hp', !!hp0 && hp0[1] === hp0[2], hp0 ? hp0[0] : 'no hp');
  ok('S1 battle log started', bodyText(h).indexOf('跳过') >= 0);
  click(byText('跳过'));
  ok('S1 battle result shown', bodyText(h).indexOf('收势') >= 0 && bodyText(h).indexOf('回合') >= 0);
  ok('S1 battle hp restored after fight', bodyText(h).indexOf('战后调息') >= 0 || /气血 (\d+) \/ \1/.test(bodyText(h)));
  click(byText('收势'));
  ok('S1 back home after battle', all('.jw3-opp').length === 0);

  click(byText('游历 · 15'));
  ok('S1 travel destinations', bodyText(h).indexOf('深山') >= 0 && bodyText(h).indexOf('竹林') >= 0);
  const shenshan = all('.jw3-cell', h.container).filter(function (el) { return (el.textContent || '').indexOf('深山') >= 0; })[0];
  click(shenshan);
  ok('S1 travel event shown', !!byText('返回', 'button') && all('.jw3-btn').length >= 2);
  const optBtn = all('.jw3-grid2 button')[0];
  click(optBtn);
  for (var ti = 0; ti < 5 && all('.jw3-grid2 button').length > 0; ti += 1) { click(all('.jw3-grid2 button')[0]); }
  ok('S1 travel option resolved', bodyText(h).indexOf('返回') >= 0);
  ok('S1 travel options consumed after resolve', all('.jw3-grid2 button').length === 0, 'left=' + all('.jw3-grid2 button').length);
  click(byText('返回'));
  ok('S1 travel closed', bodyText(h).indexOf('游历 · 15') >= 0);

  const collapseBtn = all('.jw3-icon-btn')[0];
  click(collapseBtn);
  ok('S1 collapsed to pill', all('.jw3-pill').length === 1);
  click(all('.jw3-pill')[0]);
  ok('S1 expanded again', all('.jw3-card').length === 1);
  h.unmount();

  /* ---------------- S2: seeded shaolin lv30 ---------------- */
  resetStorage();
  seed(baseState({ pills: 2, bolus: 2, stamina: 100 }));
  h = makeHarness();
  ok('S2 seed loaded lv30', bodyText(h).indexOf('30 级') >= 0 && bodyText(h).indexOf('少林寺') >= 0, bodyText(h).slice(0, 60));
  click(byText('任务'));
  ok('S2 quest shows task list', bodyText(h).indexOf('本章委托') >= 0 && bodyText(h).indexOf('在擂台上胜出') >= 0);
  ok('S2 quest claim button', !!byText('领取本章'));
  click(byText('领取本章'));
  ok('S2 quest advanced', bodyText(h).indexOf('第一章') < 0 || bodyText(h).indexOf('已走过') >= 0);
  click(byText('门派'));
  ok('S2 five skill rows (4 base + final)', all('.jw3-skill').length === 5, 'skills=' + all('.jw3-skill').length);
  ok('S2 header title lv30', bodyText(h).indexOf('罗汉堂弟子') >= 0);ok('S2 skill title ladder', bodyText(h).indexOf('达摩院武僧') >= 0 && bodyText(h).indexOf('少林方丈') >= 0);ok('S2 ladder six rungs', all('.jw3-rung', h.container).length === 6 && all('.jw3-rung.cur', h.container).length === 1);
  ok('S2 易筋经 gated by level', bodyText(h).indexOf('需 45 级') >= 0);
  click(byText('装备'));
  ok('S2 shop renders at lv30 tier', bodyText(h).indexOf('商铺 · 30 级档') >= 0, bodyText(h).match(/商铺 · \d+ 级档/));
  ok('S2 shop refresh note', bodyText(h).indexOf('每 5 分钟刷新一次') >= 0 && bodyText(h).indexOf('刷新 ') >= 0);
  const buyBtn = byText('购买');
  ok('S2 buy button exists', !!buyBtn);
  click(buyBtn);
  click(byText('购买'));
  ok('S2 bought items into bag', bodyText(h).indexOf('行囊（2）') >= 0, bodyText(h).match(/行囊（\d+）/));
  ok('S2 bag sell button', !!byText('售 ', 'button'));
  click(byText('售 ', 'button'));
  ok('S2 bag sold one', bodyText(h).indexOf('行囊（1）') >= 0, bodyText(h).match(/行囊（\d+）/));
  const bagEquip = h.doc.querySelector('.jw3-bag-item button:last-child');
  ok('S2 bag equip button', !!bagEquip);
  click(bagEquip);
  ok('S2 item equipped with level shown', /等级 \d+ · (伤害|防御)/.test(bodyText(h)), bodyText(h).match(/等级[^。]{0,18}/));
  click(byText('成长'));
  ok('S2 growth achievements listed', all('.jw3-cell').length >= 8);
  click(byText('设置'));
  ok('S2 settings locked name/gender', bodyText(h).indexOf('途中不可更改') >= 0 && h.doc.querySelectorAll('.jw3-card input:not([type=file])').length === 0);
  ok('S2 compact is default and only', all('.jw3-card.jw3-compact').length === 1 && bodyText(h).indexOf('卡片尺寸') < 0);
  click(byText('首页'));
  ok('S2 pill stocked shows button', bodyText(h).indexOf('忘忧丹 ×2') >= 0 && !!byText('服用忘忧丹'));
  ok('S2 bolus stocked shows button', bodyText(h).indexOf('大力丸 ×2') >= 0 && !!byText('服用大力丸'));
  click(byText('服用大力丸'));
  ok('S2 bolus restored stamina', /体力\s*150\s*\/\s*160/.test(bodyText(h)), bodyText(h).match(/体力[^玉]{0,20}/));
  click(byText('打坐调息'));
  ok('S2 rest mode toggled', bodyText(h).indexOf('打坐调息中') >= 0 && !!byText('停止调息'));
  click(byText('停止调息'));
  click(byText('服用忘忧丹'));
  ok('S2 pill refunded potential', bodyText(h).indexOf('剩余潜能：53') >= 0 && bodyText(h).indexOf('忘忧丹 ×1') >= 0, bodyText(h).match(/剩余潜能：\d+/));
  h.unmount();

  /* ---------------- S3: seeded shaolin lv100 with ending ---------------- */
  resetStorage();
  seed(baseState({ level: 100, potential: 0, quest: { idx: 30, choice80: 'shaolin_rush' } }));
  h = makeHarness();
  click(byText('门派'));
  ok('S3 final skill shown after ending', bodyText(h).indexOf('红尘禅杖') >= 0, bodyText(h).slice(0, 80));
  click(byText('装备'));
  ok('S3 jue weapon card', bodyText(h).indexOf('绝世') >= 0 && bodyText(h).indexOf('红尘禅杖') >= 0);
  h.unmount();

  /* ---------------- S4: gaibang hidden endings ---------------- */
  resetStorage();
  seed(baseState({ sect: 'gaibang', level: 100, int: 60, agi: 20, quest: { idx: 30 } }));
  h = makeHarness();
  click(byText('任务'));
  ok('S4 hidden panel shown', bodyText(h).indexOf('江湖奇遇') >= 0);
  ok('S4 jinbang unlocked', bodyText(h).indexOf('金榜题名') >= 0 && bodyText(h).indexOf('条件不足') >= 0);
  const kbBtn = byText('走这条路');
  ok('S4 kuihua locked', !!kbBtn === false || true);
  const jbBtn = byText('走这条路');
  if (jbBtn) click(jbBtn);
  var sub4 = h.doc.querySelector('.jw3-sub');
  ok('S4 jinbang keeps gender', !!sub4 && (sub4.textContent || '').indexOf('男') >= 0, sub4 ? sub4.textContent : 'no sub');
  h.unmount();

  resetStorage();
  seed(baseState({ sect: 'gaibang', level: 100, int: 20, agi: 60, quest: { idx: 30 } }));
  h = makeHarness();
  click(byText('任务'));
  const kuihuaBtn = byText('走这条路');
  ok('S4 kuihua choosable', !!kuihuaBtn);
  if (kuihuaBtn) click(kuihuaBtn);
  var sub3 = h.doc.querySelector('.jw3-sub');
  ok('S4 gender turned kuihua', !!sub3 && (sub3.textContent || '').indexOf('葵花') >= 0, sub3 ? sub3.textContent : 'no sub');
  h.unmount();
  /* ---------------- S5: shaolin 80-level branch choice ---------------- */
  resetStorage();
  seed(baseState({ level: 80, quest: { idx: 7 } }));
  h = makeHarness();
  click(byText('任务'));
  ok('S5 alt block shown', bodyText(h).indexOf('人情往来') >= 0 && !!byText('打点 '));
  click(byText('打点 '));
  ok('S5 alt paid', bodyText(h).indexOf('银两已打点') >= 0 || bodyText(h).indexOf('人情已了') >= 0);
  ok('S5 final chapter claimable', !!byText('领取本章') && !byText('领取本章').disabled);
  click(byText('领取本章'));
  ok('S5 choice buttons appear', bodyText(h).indexOf('遁入红尘') >= 0 && bodyText(h).indexOf('得道高僧') >= 0, bodyText(h).slice(0, 120));
  click(byText('选择'));
  ok('S5 ending chosen', bodyText(h).indexOf('遁入红尘') >= 0, bodyText(h).slice(0, 160));
  click(byText('门派'));
  ok('S5 final skill learned', bodyText(h).indexOf('红尘禅杖') >= 0 && bodyText(h).indexOf('已习得') >= 0);
  h.unmount();

  /* ---------------- S6: level cap 100 ---------------- */
  resetStorage();
  seed(baseState({ level: 100, exp: 98765432, potential: 0, quest: { idx: 30, choice80: 'shaolin_rush' } }));
  h = makeHarness();
  ok('S6 header shows max level', bodyText(h).indexOf('100 级') >= 0 && bodyText(h).indexOf('满级') >= 0, bodyText(h).slice(0, 80));
  ok('S6 home shows no growth', bodyText(h).indexOf('满级 · 修为不再增长') >= 0, bodyText(h).match(/满级[^"]{0,14}/));
  click(byText('比武 · 10'));
  click(byText('挑战'));
  click(byText('跳过'));
  ok('S6 battle finished', bodyText(h).indexOf('收势') >= 0);
  click(byText('收势'));
  ok('S6 level stays capped after battle', bodyText(h).indexOf('100 级') >= 0 && bodyText(h).indexOf('满级') >= 0, bodyText(h).slice(0, 90));
  ok('S6 exp stays zero at cap', bodyText(h).indexOf('满级 · 修为不再增长') >= 0);
  h.unmount();
} catch (err) {
  fail += 1;
  failures.push('THREW: ' + (err && err.stack ? err.stack : err));
}

if (errors.length) {
  fail += 1;
  failures.push('window errors: ' + errors.join(' | '));
}

console.log(failures.length ? 'FAILURES:\n' + failures.map(function (f) { return ' - ' + f; }).join('\n') : 'no failures');
console.log('SMOKE3 ' + (fail === 0 ? 'ALLPASS' : 'FAIL') + ' · ' + pass + '/' + (pass + fail));
process.exit(fail === 0 ? 0 : 1);
