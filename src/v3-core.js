    /* ================================================================== */
    /* V3 · core                                                           */
    /* ================================================================== */

    /* v0.5.0 数值重做：覆盖旧经验曲线（同名函数声明后置覆盖，仅本 factory 内） */
    function expNeed(level) {
      if (level <= 1) return 20;
      if (level === 2) return 60;
      if (level === 3) return 120;
      return Math.round(28 * Math.pow(level, 2.25) + 70 * Math.pow(level, 1.3));
    }

    function v3DefaultQuest() {
      return {
        idx: 0, choice80: null, hidden99: null, finalShown: false,
        base: { wins: 0, eliteWins: 0, travels: 0, equips: 0, dests: {} },
        readyLogged: null,
        altDone: null, altPath: null,
      };
    }

    function newStateV3(name) {
      const s = newState();
      s.v = V3_VERSION;
      if (name) { s.name = name.slice(0, 12); s.setup = true; }
      s.quest = v3DefaultQuest();
      s.equip = { weapon: null, armor: null };
      s.bag = [];
      s.stats.eliteWins = 0;
      s.stats.equips = 0;
      s.stats.dests = {};
      s.shop = null;
      s.pills = 0;
      s.bolus = 0;
      s.mode = 'idle';
      return s;
    }

    function v3Normalize(parsed) {
      const s = normalizeV2(parsed);
      s.v = V3_VERSION;
      if (typeof s.level !== 'number' || !isFinite(s.level)) s.level = 1;
      if (s.level > 100) s.level = 100;
      const q = parsed.quest && typeof parsed.quest === 'object' ? parsed.quest : {};
      s.quest = {
        idx: Math.max(0, Math.min(30, Number(q.idx) || 0)),
        choice80: typeof q.choice80 === 'string' ? q.choice80 : null,
        hidden99: typeof q.hidden99 === 'string' ? q.hidden99 : null,
        finalShown: !!q.finalShown,
        base: (q.base && typeof q.base === 'object') ? {
          wins: Number(q.base.wins) || 0,
          eliteWins: Number(q.base.eliteWins) || 0,
          travels: Number(q.base.travels) || 0,
          equips: Number(q.base.equips) || 0,
          dests: (q.base.dests && typeof q.base.dests === 'object') ? q.base.dests : {},
        } : { wins: 0, eliteWins: 0, travels: 0, equips: 0, dests: {} },
        readyLogged: typeof q.readyLogged === 'string' ? q.readyLogged : null,
        altDone: q.altDone === 'silver' || q.altDone === 'equip' ? q.altDone : null,
        altPath: q.altPath === 'silver' || q.altPath === 'equip' ? q.altPath : null,
      };
      if (!s.stats || typeof s.stats !== 'object') s.stats = { battles: 0, travels: 0 };
      if (typeof s.stats.eliteWins !== 'number') s.stats.eliteWins = 0;
      if (typeof s.stats.equips !== 'number') s.stats.equips = 0;
      if (!s.stats.dests || typeof s.stats.dests !== 'object') s.stats.dests = {};
      s.shop = (parsed.shop && parsed.shop.items && typeof parsed.shop.items === 'object') ? parsed.shop : null;
      s.pills = Math.max(0, Number(parsed.pills) || 0);
      s.bolus = Math.max(0, Number(parsed.bolus) || 0);
      if (s.mode !== 'train' && s.mode !== 'rest') {
        s.mode = parsed.training === false ? 'rest' : parsed.training ? 'train' : 'idle';
      }
      if (!s.mode) s.mode = 'idle';
      s.equip = { weapon: null, armor: null };
      if (parsed.equip && typeof parsed.equip === 'object') {
        ['weapon', 'armor'].forEach(function (slot) {
          const it = parsed.equip[slot];
          if (it && typeof it === 'object' && typeof it.name === 'string') s.equip[slot] = it;
        });
      }
      s.bag = Array.isArray(parsed.bag)
        ? parsed.bag.filter(function (it) { return it && typeof it.name === 'string'; }).slice(-60)
        : [];
      if (parsed.gender === 'kuihua') s.gender = 'kuihua';
      return s;
    }

    function v3Load() {
      try {
        let raw = window.localStorage.getItem(SAVE_KEY);
        if (!raw) raw = window.localStorage.getItem('jingwu' + 'tang.pet.v1');
        if (!raw) return newStateV3();
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return newStateV3();
        return v3Normalize(parsed);
      } catch (err) {
        return newStateV3();
      }
    }

    function v3SkillName(id) {
      const sects = Object.keys(SKILL_TREE);
      for (let i = 0; i < sects.length; i += 1) {
        const tree = SKILL_TREE[sects[i]];
        const all = tree.base.concat(tree.finals);
        for (let j = 0; j < all.length; j += 1) {
          if (all[j].id === id) return all[j].name;
        }
      }
      return id;
    }

    function v3SkillPass(s) {
      const out = {
        dmgPct: 0, defPct: 0, hpPct: 0, trainPct: 0, silverPct: 0, staPct: 0, spdPct: 0,
        critAdd: 0, critDmg: 0, dodgeAdd: 0, armorPenChance: 0, regenPct: 0, emergencyHeal: 0,
      };
      if (!s.sect || !SKILL_TREE[s.sect]) return out;
      const tree = SKILL_TREE[s.sect];
      const all = tree.base.concat(tree.finals);
      for (let i = 0; i < all.length; i += 1) {
        const sk = all[i];
        if (!s.skills || !s.skills[sk.id]) continue;
        for (const k in sk.pass) out[k] += sk.pass[k];
      }
      return out;
    }

    function v3Derived(s) {
      const p = v3SkillPass(s);
      const w = s.equip && s.equip.weapon ? s.equip.weapon : null;
      const a = s.equip && s.equip.armor ? s.equip.armor : null;
      const wAtk = w ? (w.atk || 0) : 0;
      const wSpd = w ? (w.spd || 0) : 0;
      const aDef = a ? (a.def || 0) : 0;
      const aHp = a ? (a.hp || 0) : 0;
      return {
        maxHp: Math.round((50 + s.con * 10 + s.level * 6 + aHp) * (1 + p.hpPct)),
        atk: Math.round((5 + s.str * 2.2 + s.level * 0.8 + wAtk) * (1 + p.dmgPct)),
        def: Math.round((2 + s.end * 1.5 + s.level * 0.5 + aDef) * (1 + p.defPct)),
        spd: Math.round((2 + s.agi * 1.6 + s.level * 0.3 + wSpd) * (1 + p.spdPct)),
        crit: Math.min(0.35, 0.03 + s.agi * 0.002 + p.critAdd),
        critDmg: p.critDmg,
        dodge: Math.min(0.25, 0.0015 * s.agi + p.dodgeAdd),
        armorPenChance: Math.min(0.4, p.armorPenChance),
        regenPct: p.regenPct,
        emergencyHeal: p.emergencyHeal,
        trainPct: p.trainPct,
        silverPct: p.silverPct,
        staPct: p.staPct,
      };
    }

    function v3AutoSkills(s) {
      if (!s.sect || !SKILL_TREE[s.sect]) return [];
      const got = [];
      SKILL_TREE[s.sect].base.forEach(function (sk) {
        if (sk.lv <= 25 && s.level >= sk.lv && !s.skills[sk.id]) {
          s.skills[sk.id] = true;
          growthPush(s, 'learn_' + sk.id, '习得武学', '学会了「' + sk.name + '」');
          logPush(s, '你领悟了「' + sk.name + '」');
          got.push(sk.name);
        }
      });
      return got;
    }

    function v3TryLearn(s, id) {
      if (!s.sect || !SKILL_TREE[s.sect]) return { ok: false, text: '尚未拜师' };
      const tree = SKILL_TREE[s.sect];
      let sk = null;
      for (let i = 0; i < tree.base.length; i += 1) if (tree.base[i].id === id) sk = tree.base[i];
      if (!sk) return { ok: false, text: '本门无此武学' };
      if (s.skills[id]) return { ok: false, text: '已经学会' };
      if (s.level < sk.lv) return { ok: false, text: '需 ' + sk.lv + ' 级方可修习' };
      if (sk.sp > 0 && s.skillPoints < sk.sp) return { ok: false, text: '技能点不足（需 ' + sk.sp + '，可游历或比武获得）' };
      if (sk.sp > 0) s.skillPoints -= sk.sp;
      s.skills[id] = true;
      growthPush(s, 'learn_' + id, '习得武学', '学会了「' + sk.name + '」');
      logPush(s, '你领悟了「' + sk.name + '」');
      return { ok: true, text: '习得「' + sk.name + '」' };
    }

    function v3EndingOf(s) {
      const choice = s.quest.choice80 || s.quest.hidden99;
      if (!choice || !s.sect) return null;
      const list = ENDINGS[s.sect] || [];
      for (let i = 0; i < list.length; i += 1) if (list[i].id === choice) return list[i];
      return null;
    }

    function v3LearnFinal(s) {
      const ending = v3EndingOf(s);
      if (!ending) return null;
      if (s.level >= 100 && ending.skill && !s.skills[ending.skill]) {
        s.skills[ending.skill] = true;
        growthPush(s, 'final_' + ending.skill, '大成之境', '终式「' + v3SkillName(ending.skill) + '」大成');
        logPush(s, '终式「' + v3SkillName(ending.skill) + '」大成');
      }
      return ending;
    }

    function v3GrantJue(s) {
      const ending = v3EndingOf(s);
      if (!ending || s.level < 100) return null;
      const uid = ending.weapon;
      if (s.equip.weapon && s.equip.weapon.uid === uid) return null;
      for (let i = 0; i < s.bag.length; i += 1) if (s.bag[i].uid === uid) return null;
      const j = JUE_WORLD[uid];
      if (!j) return null;
      const it = {
        uid: 'jue_' + uid, kind: 'weapon', sect: null, tier: 20, qid: 'jue',
        name: j.name, atk: j.atk, hp: j.hp, spd: j.spd || 0, jue: true,
      };
      it.uid = uid;
      v3AddToBag(s, it);
      growthPush(s, 'jue_' + uid, '绝世神兵', '获得「' + j.name + '」');
      logPush(s, '你得到一柄「' + j.name + '」');
      return it;
    }

    function v3LevelUp(s) {
      let ups = 0;
      while (s.level < 100 && s.exp >= expNeed(s.level)) {
        s.exp -= expNeed(s.level);
        s.level += 1;
        s.potential += 3;
        ups += 1;
        if (s.level === 10) growthPush(s, 'lv_10', '名动江湖', '修为突破至 10 级，可拜入门派');
        if (s.level === 30) growthPush(s, 'lv_30', '名动江湖', '修为突破至 30 级');
        if (s.level === 50) growthPush(s, 'lv_50', '名动江湖', '修为突破至 50 级');
        if (s.level === 80) growthPush(s, 'lv_80', '名动江湖', '修为突破至 80 级');
        if (s.level === 100) growthPush(s, 'lv_100', '一代宗师', '修为突破至 100 级');
      }
      if (s.level >= 100) s.exp = 0;
      const learned = v3AutoSkills(s);
      let finalEnding = null;
      if (s.level >= 100) {
        finalEnding = v3LearnFinal(s);
        v3GrantJue(s);
      }
      return { ups: ups, learned: learned, ending: finalEnding };
    }

    function v3Tick(s, now) {
      const secs = Math.max(0, Math.min((now - s.lastTick) / 1000, OFFLINE_CAP));
      s.lastTick = now;
      if (secs < 0.5) return null;
      const p = v3SkillPass(s);
      let gains = null;
      const mode = s.mode || 'idle';
      if (mode === 'train') {
        const exp = (trainRate(s.level) * (1 + p.trainPct) * secs) / 60;
        const silver = ((2 + s.level * 0.4) * (1 + p.silverPct) * secs) / 60;
        s.exp += exp;
        s.silver += silver;
        s.stamina = Math.min(maxStamina(s.level), s.stamina + (secs / 60) * (1 + p.staPct));
        gains = { exp: exp, silver: silver, minutes: secs / 60 };
      } else if (mode === 'rest') {
        s.stamina = Math.min(maxStamina(s.level), s.stamina + (secs / 6) * (1 + p.staPct));
      } else {
        s.stamina = Math.min(maxStamina(s.level), s.stamina + (secs / 40) * (1 + p.staPct));
      }
      const r = v3LevelUp(s);
      return { gains: gains, ups: r.ups, learned: r.learned, ending: r.ending };
    }

    function v3MakeEnemy(level, elite, name, ref, mul) {
      const lv = Math.max(1, level);
      return makeEnemy(lv, elite, name, ref, mul);
    }

    /* v0.6.1 平衡：敌人强度随等级锚定「该等级玩家预期战力」，
       避免纯线性数值在高等级被玩家拉开（或反超）。 */
    function v3ExpectedBuildDerived(level) {
      const lv = Math.max(1, level);
      const pts = (lv - 1) * 3;
      const pseudo = {
        level: lv,
        con: 5 + Math.floor(pts * 0.25),
        int: 5 + Math.floor(pts * 0.05),
        str: 5 + Math.floor(pts * 0.35),
        end: 5 + Math.floor(pts * 0.2),
        agi: 5 + Math.floor(pts * 0.15),
        sect: 'shaolin',
        skills: {},
        equip: {},
      };
      const tier = Math.max(1, Math.min(19, Math.floor(lv / 5)));
      pseudo.equip.weapon = v3MakeEquip('shaolin', 'weapon', tier, 'private');
      pseudo.equip.armor = v3MakeEquip('shaolin', 'armor', tier, 'private');
      return v3Derived(pseudo);
    }

    /* 同层敌人基础强度：约 7 轮血、9 轮打死玩家；精英 ×1.06。
       额外按玩家实际战力做一次「阻尼自适应」：玩家越强，敌人也相应变强一部分，
       避免堆数值后无脑碾压（K_POW 为自适应强度，0 = 纯等级锚定，1 = 完全跟随玩家）。 */
    function makeEnemy(level, elite, name, ref, mul) {
      const lv = Math.max(1, level);
      const scale = (elite ? 1.06 : 1) * (mul || 1);
      let nm = name || ENEMY_NAMES[rndInt(0, ENEMY_NAMES.length - 1)];
      if (elite && !name) nm += ELITE_SUFFIX[rndInt(0, ELITE_SUFFIX.length - 1)];
      const e = v3ExpectedBuildDerived(lv);
      const p = ref || e;
      const K_POW = 0.9;
      const blend = function (act, exp) {
        const rr = Math.max(0.45, Math.min(2.2, (act || exp) / Math.max(1, exp)));
        return exp * Math.pow(rr, K_POW);
      };
      const bAtk = blend(p.atk, e.atk);
      const bHp = blend(p.maxHp, e.maxHp);
      const bDef = blend(p.def, e.def);
      return {
        name: nm,
        level: lv,
        elite: !!elite,
        maxHp: Math.round(bAtk * 7.2 * scale),
        atk: Math.round((bHp / 8.9 + bDef * 0.55) * scale),
        def: Math.round(bAtk * 0.285 * scale),
        spd: Math.round(6 + lv * 1.35),
      };
    }

    const BASE_MOVES = {
      shaolin: ['罗汉拳', '韦陀掌', '少林长拳'],
      emei: ['峨嵋剑法', '金顶掌', '流云剑'],
      gaibang: ['劈空掌', '扫堂腿', '打狗棒法'],
    };
    const PLAYER_VERBS = ['施出', '使出一记', '沉肩运起', '抢步递出', '回身抖出'];
    const ENEMY_VERBS = ['挥刃横扫', '欺身直进', '变招抢攻', '冷笑一声抢攻而上', '踏中宫逼近'];

    function v3PlayerMoves(s) {
      const out = [];
      if (s.sect && SKILL_TREE[s.sect]) {
        SKILL_TREE[s.sect].base.concat(SKILL_TREE[s.sect].finals).forEach(function (sk) {
          if (s.skills && s.skills[sk.id] && (sk.desc || '').indexOf('被动') !== 0) out.push(sk.name);
        });
      }
      (BASE_MOVES[s.sect] || ['拳脚功夫', '掌法', '腿法']).forEach(function (m) { out.push(m); });
      return out;
    }

    function v3Battle(s, enemy) {
      const d = v3Derived(s);
      let php = d.maxHp;
      let ehp = enemy.maxHp;
      let rounds = 0;
      let emerg = d.emergencyHeal > 0;
      const lines = [];
      const hps = [];
      const moves = v3PlayerMoves(s);
      const weapon = s.equip && s.equip.weapon ? s.equip.weapon.name : '';
      function pickMove() { return moves[Math.floor(Math.random() * moves.length)]; }
      function pushLine(text) {
        lines.push(text);
        hps.push([Math.max(0, Math.round(php)), Math.max(0, Math.round(ehp))]);
      }
      pushLine(weapon
        ? '你握紧「' + weapon + '」，' + enemy.name + ' 亮出兵刃，二人相对而立。'
        : '你空手而立，' + enemy.name + ' 上下打量你一眼，嘴角一挑。');
      for (let r = 1; r <= 30 && php > 0 && ehp > 0; r += 1) {
        rounds = r;
        if (d.regenPct > 0 && r % 3 === 0) {
          const heal = Math.max(1, Math.round(d.maxHp * d.regenPct));
          php = Math.min(d.maxHp, php + heal);
          const heartName = s.sect && SKILL_TREE[s.sect]
            ? (SKILL_TREE[s.sect].base.filter(function (x) { return x.pass && x.pass.regenPct; })[0] || {}).name || '心法'
            : '心法';
          pushLine('第' + r + '回合 · 「' + heartName + '」运转，气血 +' + heal);
        }
        const order = d.spd >= enemy.spd ? ['p', 'e'] : ['e', 'p'];
        for (let i = 0; i < order.length; i += 1) {
          if (php <= 0 || ehp <= 0) break;
          if (order[i] === 'p') {
            const crit = chance(d.crit);
            const pen = chance(d.armorPenChance);
            const edef = enemy.def * (pen ? 0.15 : 0.55);
            const critMul = crit ? 1.6 + d.critDmg : 1;
            const swing = 0.84 + Math.random() * 0.32;
            const dmg = Math.max(1, Math.round((d.atk * critMul - edef) * swing));
            ehp -= dmg;
            const mv = pickMove();
            const verb = PLAYER_VERBS[Math.floor(Math.random() * PLAYER_VERBS.length)];
            if (crit) {
              pushLine('第' + r + '回合 · 你' + verb + '「' + mv + '」，正中' + enemy.name + '要害，受创 ' + dmg + '（暴击）');
            } else if (pen) {
              pushLine('第' + r + '回合 · 「' + mv + '」穿透护体真气，' + enemy.name + ' 再削 ' + dmg + ' 点气血（破防）');
            } else {
              pushLine('第' + r + '回合 · 你' + verb + '「' + mv + '」，' + enemy.name + ' 受创 ' + dmg);
            }
          } else {
            if (chance(d.dodge)) {
              pushLine('第' + r + '回合 · ' + enemy.name + ' ' + ENEMY_VERBS[Math.floor(Math.random() * ENEMY_VERBS.length)] + '，你侧身避过，衣角都没沾着');
              continue;
            }
            const swing = 0.84 + Math.random() * 0.32;
            const dmg = Math.max(1, Math.round((enemy.atk - d.def * 0.55) * swing));
            php -= dmg;
            pushLine('第' + r + '回合 · ' + enemy.name + ' 欺到近前，你气血 -' + dmg);
          }
        }
        if (emerg && php > 0 && php < d.maxHp * 0.4) {
          const heal = Math.max(1, Math.round(d.maxHp * d.emergencyHeal));
          php = Math.min(d.maxHp, php + heal);
          emerg = false;
          pushLine('第' + r + '回合 · 佛光普照，周身暖意涌动，气血 +' + heal);
        }
      }
      const n = Math.min(lines.length, 18);
      return {
        win: ehp <= 0 && php > 0,
        rounds: rounds,
        lines: lines.slice(-n),
        hps: hps.slice(-n),
        php: Math.max(0, php),
        ehp: Math.max(0, ehp),
        maxHp: d.maxHp,
        maxEhp: enemy.maxHp,
      };
    }

    function v3ApplyBattle(s, enemy, sim) {
      const p = v3SkillPass(s);
      const win = sim.win;
      const exp = win ? Math.round(expNeed(enemy.level) * 0.12) : Math.round(expNeed(s.level) * 0.03);
      const silver = win
        ? Math.round((5 + enemy.level * 4 + (enemy.elite ? 12 : 0)) * (1 + p.silverPct))
        : 0;
      const drops = [];
      if (win) {
        s.wins += 1;
        s.streak += 1;
        if (s.streak > s.bestStreak) s.bestStreak = s.streak;
        if (enemy.elite) s.stats.eliteWins += 1;
        if (v3DropSkillPoint(s, enemy.elite ? 'elite' : 'battle')) {
          drops.push('技能点 +1');
          logPush(s, '比武中有所领悟：技能点 +1');
        }
        const eq = v3DropEquip(s, enemy.elite);
        if (eq) drops.push('获得「' + eq.name + '」');
        if (chance(enemy.elite ? 0.28 : 0.12)) {
          s.bolus = (s.bolus || 0) + 1;
          drops.push('大力丸 ×1');
          logPush(s, '比武后得了一包「大力丸」');
        }
      } else {
        s.losses += 1;
        s.streak = 0;
      }
      s.stats.battles += 1;
      s.exp += exp;
      s.silver += silver;
      const lv = v3LevelUp(s);
      if (win) v3QuestCheck(s);
      if (lv.ups > 0) drops.push('突破至 ' + s.level + ' 级');
      if (lv.learned.length) drops.push('习得 ' + lv.learned.join('、'));
      return {
        win: win, rounds: sim.rounds, lines: sim.lines, exp: exp, silver: silver, drops: drops,
        php: Math.round(sim.php), ehp: Math.round(sim.ehp),
      };
    }

    function v3Estimate(s, enemy) {
      const d = v3Derived(s);
      const critFactor = 1 + d.crit * (0.6 + d.critDmg);
      const pdmg = Math.max(1, d.atk * critFactor - enemy.def * 0.55);
      const edmg = Math.max(1, (enemy.atk - d.def * 0.55) * (1 - d.dodge * 0.9));
      const pRounds = enemy.maxHp / pdmg;
      const eRounds = d.maxHp / edmg;
      const edge = (eRounds - pRounds) / Math.max(2, (eRounds + pRounds) / 2);
      const rate = 1 / (1 + Math.exp(-edge * 3.4));
      return Math.max(2, Math.min(98, Math.round(rate * 100)));
    }

    function v3MakeOpponents(s) {
      const lv = s.level;
      const pd = v3Derived(s);
      const defs = [
        { lv: Math.max(1, lv - 2), elite: false, mul: 0.9 },
        { lv: Math.max(1, lv), elite: chance(0.15), mul: 1 },
        { lv: Math.min(100, Math.max(1, lv + 1)), elite: false, mul: 1.06 },
      ];
      const tags = [
        { key: 'easy', name: '初出茅庐' },
        { key: 'normal', name: '旗鼓相当' },
        { key: 'hard', name: '凶名在外' },
      ];
      const list = defs.map(function (d) {
        const enemy = v3MakeEnemy(d.lv, d.elite, null, pd, d.mul);
        return { enemy: enemy, rate: v3Estimate(s, enemy) };
      });
      list.sort(function (a, b) { return b.rate - a.rate; });
      return list.map(function (it, i) {
        it.tag = tags[i].name;
        it.key = tags[i].key;
        return it;
      });
    }

    function v3Grant(s, fx, flavor) {
      const lv = s.level;
      const out = [];
      if (fx.exp) {
        const e = Math.round(expNeed(lv) * fx.exp);
        s.exp += e;
        out.push('修为 +' + e);
      }
      if (fx.silver) {
        const v = Math.round(fx.silver[0] + lv * fx.silver[1]);
        s.silver = Math.max(0, s.silver + v);
        out.push('银两 ' + (v >= 0 ? '+' : '') + v);
      }
      if (fx.potential) {
        s.potential += fx.potential;
        out.push('潜能 +' + fx.potential);
      }
      if (fx.stamina) {
        s.stamina = Math.max(0, Math.min(maxStamina(lv), s.stamina + fx.stamina));
        out.push('体力 ' + (fx.stamina > 0 ? '+' : '') + fx.stamina);
      }
      const r = v3LevelUp(s);
      if (r.ups > 0) out.push('突破至 ' + s.level + ' 级');
      if (r.learned.length) out.push('习得 ' + r.learned.join('、'));
      return { text: flavor + (out.length ? '（' + out.join('，') + '）' : ''), ups: r.ups };
    }

    function v3ResolveTravelOption(s, opt) {
      if (opt.can && !opt.can(s)) return { ok: false, text: '条件不足，无法选择。' };
      if (opt.loseSilver) s.silver = Math.max(0, s.silver - opt.loseSilver);
      let text = '';
      if (opt.battle) {
        const enemy = opt.battle(s);
        const sim = v3Battle(s, enemy);
        const res = v3ApplyBattle(s, enemy, sim);
        text = (res.win ? opt.flavorWin : opt.flavorLose)
          + '（' + res.rounds + ' 回合，修为 +' + res.exp
          + (res.silver ? '，银两 +' + res.silver : '') + '）';
        if (res.drops.length) text += ' ' + res.drops.join('，');
      } else {
        text = v3Grant(s, opt.fx || {}, opt.flavor).text;
        if (chance(0.05)) {
          s.skillPoints += 1;
          text += ' 于山水间偶有所悟：技能点 +1';
        }
        if (chance(0.10)) {
          const it = v3DropEquip(s, false);
          if (it) text += ' 拾得「' + it.name + '」';
        }
      }
      if (opt.chain && chance(opt.chain.chance)) {
        return { ok: true, text: text, next: opt.chain.event };
      }
      return { ok: true, text: text };
    }

    function v3RecordTravel(s, dest) {
      s.stats.travels += 1;
      if (dest) s.stats.dests[dest] = (s.stats.dests[dest] || 0) + 1;
      const t = s.stats.travels;
      if (t === 10) growthPush(s, 'travel_10', '初涉江湖', '已经游历 10 次');
      if (t === 50) growthPush(s, 'travel_50', '行遍四方', '已经游历 50 次');
      if (t === 100) growthPush(s, 'travel_100', '踏遍青山', '已经游历 100 次');
      if (chance(0.18)) {
        s.bolus = (s.bolus || 0) + 1;
        logPush(s, '途中在野店歇脚，掌柜塞给你一包「大力丸」');
      }
      v3QuestCheck(s);
    }

    function v3CheckBattleGrowth(s, res) {
      if (!res.win) return;
      growthPush(s, 'first_win', '初战告捷', '赢下第一场比武');
      if (s.wins >= 10) growthPush(s, 'win_10', '小有名气', '累计胜利 10 场');
      if (s.wins >= 50) growthPush(s, 'win_50', '威震一方', '累计胜利 50 场');
      if (s.wins >= 100) growthPush(s, 'win_100', '名动江湖', '累计胜利 100 场');
      if (s.streak >= 5) growthPush(s, 'streak_5', '连战连捷', '取得 5 连胜');
      if (s.streak >= 10) growthPush(s, 'streak_10', '势如破竹', '取得 10 连胜');
    }

    /* ---- 商铺（每 5 分钟刷新，品质随机） ---- */
    const SHOP_REFRESH_MS = 5 * 60 * 1000;

    function v3ShopRollQuality() {
      let roll = Math.random();
      for (let i = 0; i < SHOP_QUALITY_WEIGHTS.length; i += 1) {
        roll -= SHOP_QUALITY_WEIGHTS[i].w;
        if (roll <= 0) return SHOP_QUALITY_WEIGHTS[i].id;
      }
      return 'private';
    }

    function v3ShopRefresh(s, now) {
      const tier = v3EquipTier(s);
      const items = {};
      ['weapon', 'armor'].forEach(function (kind) {
        const qid = v3ShopRollQuality();
        const it = v3MakeEquip(s.sect, kind, tier, qid);
        it.uid = 'shop_' + kind + '_' + tier + '_' + qid + '_' + now;
        it.price = v3EquipPrice(it);
        it.qid = qid;
        items[kind] = it;
      });
      if (chance(0.18)) {
        items.pill = {
          kind: 'pill', name: '忘忧丹', price: 600, qid: 'pill',
          desc: '洗髓伐骨 · 服用后重置五维并返还全部潜能',
          uid: 'shop_pill_' + now,
        };
      }
      if (chance(0.22)) {
        items.bolus = {
          kind: 'bolus', name: '大力丸', price: 220, qid: 'bolus',
          desc: '壮气提神 · 服下立即恢复 50 点体力',
          uid: 'shop_bolus_' + now,
        };
      }
      s.shop = { at: now, tier: tier, items: items };
      return s.shop;
    }

    function v3ShopEnsure(s, now) {
      const t = now || Date.now();
      if (!s.sect) { s.shop = null; return null; }
      const tier = v3EquipTier(s);
      if (!s.shop || !s.shop.items || s.shop.tier !== tier || !s.shop.at
        || s.shop.at > t + 60000 || t - s.shop.at >= SHOP_REFRESH_MS) {
        return v3ShopRefresh(s, t);
      }
      return s.shop;
    }

    function v3ShopRemain(s, now) {
      if (!s.shop || !s.shop.at) return SHOP_REFRESH_MS;
      return Math.max(0, SHOP_REFRESH_MS - ((now || Date.now()) - s.shop.at));
    }

    function v3BuyShopItem(s, kind) {
      if (!s.sect) return { ok: false, text: '先拜入门派，才能购本门兵器' };
      const shop = v3ShopEnsure(s, Date.now());
      if (!shop || !shop.items[kind]) return { ok: false, text: '铺子里暂时无货' };
      const it = shop.items[kind];
      const price = it.price || v3EquipPrice(it);
      if (s.silver < price) return { ok: false, text: '银两不足（需 ' + price + '）' };
      s.silver -= price;
      if (kind === 'pill') {
        s.pills = (s.pills || 0) + 1;
        shop.items.pill = null;
        logPush(s, '你花了 ' + price + ' 两银子，购得「忘忧丹」');
        return { ok: true, text: '购得「忘忧丹」（可在首页服用）' };
      }
      if (kind === 'bolus') {
        s.bolus = (s.bolus || 0) + 1;
        shop.items.bolus = null;
        logPush(s, '你花了 ' + price + ' 两银子，购得「大力丸」');
        return { ok: true, text: '购得「大力丸」（可在首页服用）' };
      }
      const copy = JSON.parse(JSON.stringify(it));
      delete copy.price;
      v3AddToBag(s, copy);
      shop.items[kind] = null;
      logPush(s, '你花了 ' + price + ' 两银子，购得「' + copy.name + '」');
      return { ok: true, text: '购得「' + copy.name + '」', item: copy };
    }

    function v3UsePill(s) {
      if (!s.pills) return { ok: false, text: '没有忘忧丹（可去商铺购置）' };
      const keys = ['con', 'int', 'str', 'end', 'agi'];
      let refund = 0;
      keys.forEach(function (k) {
        if (typeof s[k] === 'number' && s[k] > 5) refund += s[k] - 5;
        s[k] = 5;
      });
      if (refund <= 0) return { ok: false, text: '五维未曾加点，无需洗髓' };
      s.potential += refund;
      s.pills -= 1;
      logPush(s, '你服下忘忧丹，洗髓伐骨，返还潜能 ' + refund + ' 点');
      return { ok: true, text: '洗髓完成，返还潜能 ' + refund + ' 点' };
    }

    function v3UseBolus(s) {
      if (!s.bolus) return { ok: false, text: '没有大力丸（商铺、比武、游历皆可得）' };
      const max = maxStamina(s.level);
      if (s.stamina >= max) return { ok: false, text: '体力已满，不必再服' };
      const before = s.stamina;
      s.stamina = Math.min(max, s.stamina + 50);
      s.bolus -= 1;
      const gain = Math.round(s.stamina - before);
      logPush(s, '你服下大力丸，气力一振，体力 +' + gain);
      return { ok: true, text: '大力丸下肚，体力 +' + gain };
    }

    /* ---- 主线委托 ---- */
    function v3QuestBase(s) {
      if (!s.quest.base || typeof s.quest.base !== 'object') {
        s.quest.base = { wins: 0, eliteWins: 0, travels: 0, equips: 0, dests: {} };
      }
      if (!s.quest.base.dests || typeof s.quest.base.dests !== 'object') s.quest.base.dests = {};
      return s.quest.base;
    }

    function v3QuestTasks(ch) {
      return ch && QUEST_TASKS[ch.id] ? QUEST_TASKS[ch.id] : [];
    }

    function v3TaskCount(s, t) {
      if (t.t === 'win') return s.wins || 0;
      if (t.t === 'elite') return s.stats.eliteWins || 0;
      if (t.t === 'travel') return s.stats.travels || 0;
      if (t.t === 'equip') return s.stats.equips || 0;
      if (t.t === 'dest') return (s.stats.dests && s.stats.dests[t.dest]) || 0;
      return 0;
    }

    function v3TaskLabel(t) {
      if (t.t === 'win') return '在擂台上胜出 ' + t.n + ' 场';
      if (t.t === 'elite') return '击败 ' + t.n + ' 名成名的硬手';
      if (t.t === 'travel') return '江湖上走 ' + t.n + ' 个来回';
      if (t.t === 'equip') return '寻得 ' + t.n + ' 件像样的兵器衣甲';
      if (t.t === 'dest') return '往「' + (DESTINATIONS[t.dest] ? DESTINATIONS[t.dest].name : '深山') + '」走上 ' + t.n + ' 遭';
      return '完成委托';
    }

    function v3QuestTaskList(s, ch) {
      const base = v3QuestBase(s);
      return v3QuestTasks(ch).map(function (t) {
        let start = 0;
        if (t.t === 'win') start = base.wins || 0;
        else if (t.t === 'elite') start = base.eliteWins || 0;
        else if (t.t === 'travel') start = base.travels || 0;
        else if (t.t === 'equip') start = base.equips || 0;
        else if (t.t === 'dest') start = (base.dests && base.dests[t.dest]) || 0;
        const cur = Math.max(0, v3TaskCount(s, t) - start);
        return {
          t: t.t, n: t.n, cur: Math.min(t.n, cur), done: cur >= t.n,
          label: v3TaskLabel(t),
        };
      });
    }

    function v3QuestTasksDone(s, ch) {
      return v3QuestTaskList(s, ch).every(function (x) { return x.done; });
    }

    /* 本章的「提交方式」：银两打点 或 交出一件装备，二选一才算完卷 */
    function v3QuestAlt(s, ch) {
      if (!ch) return null;
      return QUEST_ALT[ch.id] || null;
    }

    function v3QuestAltDone(s, ch) {
      return !v3QuestAlt(s, ch) || s.quest.altDone === 'silver' || s.quest.altDone === 'equip';
    }

    function v3QuestAltRequirement(s, way) {
      const ch = v3QuestCurrent(s);
      const alt = v3QuestAlt(s, ch);
      if (!ch || !alt) return { ok: false, text: '本章无需打点' };
      if (s.quest.altDone) return { ok: false, text: '本章的「人情」已经了结' };
      if (way === 'silver') {
        return s.silver >= alt.silver
          ? { ok: true }
          : { ok: false, text: '银两不足（需 ' + alt.silver + ' 两）' };
      }
      const item = s.bag.filter(function (x) { return x && typeof x.name === 'string' && !x.jue; })[0];
      if (!item) return { ok: false, text: '行囊里没有可交出的装备' };
      return { ok: true, item: item };
    }

    function v3SubmitAlt(s, way) {
      const ch = v3QuestCurrent(s);
      const alt = v3QuestAlt(s, ch);
      const req = v3QuestAltRequirement(s, way);
      if (!alt || !req.ok) return req;
      if (way === 'silver') {
        s.silver -= alt.silver;
        s.quest.altDone = 'silver';
        logPush(s, '你取出 ' + alt.silver + ' 两银子上下打点，了结一桩人情');
        v3QuestCheck(s);
        return { ok: true, text: '银子递出去，事情办得利落（银两 -' + alt.silver + '）' };
      }
      const item = req.item;
      const idx = s.bag.indexOf(item);
      if (idx >= 0) s.bag.splice(idx, 1);
      s.quest.altDone = 'equip';
      logPush(s, '你把「' + item.name + '」交了出去，换回一句「够义气」');
      v3QuestCheck(s);
      return { ok: true, text: '「' + item.name + '」送了出去，江湖人记下这份人情' };
    }

    function v3QuestCheck(s) {
      const ch = v3QuestCurrent(s);
      if (!ch || s.quest.readyLogged === ch.id) return;
      if (s.level < ch.lv) return;
      if (!s.sect && ch.lv >= 10) return;
      if (v3QuestTasksDone(s, ch) && v3QuestAltDone(s, ch)) {
        s.quest.readyLogged = ch.id;
        logPush(s, '主线『' + ch.title + '』的委托已全部完成，可回任务页领取');
      }
    }

    /* ---- 主线 ---- */
    function v3QuestLine(s) {
      if (!s.sect) return QUEST_COMMON;
      return QUEST_COMMON.concat(QUEST_SECT[s.sect]);
    }

    function v3QuestCurrent(s) {
      const line = v3QuestLine(s);
      const idx = s.quest.idx || 0;
      return idx < line.length ? line[idx] : null;
    }

    function v3QuestReady(s) {
      const ch = v3QuestCurrent(s);
      if (!ch) return false;
      if (s.level < ch.lv) return false;
      if (!s.sect && ch.lv >= 10) return false;
      return v3QuestTasksDone(s, ch) && v3QuestAltDone(s, ch);
    }

    function v3ClaimQuest(s) {
      const ch = v3QuestCurrent(s);
      if (!ch) return { ok: false, text: '主线已走完。' };
      if (s.level < ch.lv) {
        return { ok: false, text: '尚未达到条件（需 ' + ch.lv + ' 级）' };
      }
      if (!s.sect && ch.lv >= 10) {
        return { ok: false, text: '尚未达到条件（需先拜入门派）' };
      }
      if (!v3QuestTasksDone(s, ch)) {
        const todo = v3QuestTaskList(s, ch).filter(function (x) { return !x.done; });
        return { ok: false, text: '尚有委托未完成：' + todo.map(function (x) { return x.label + '（' + x.cur + '/' + x.n + '）'; }).join('，') };
      }
      if (!v3QuestAltDone(s, ch)) {
        return { ok: false, text: '还差一桩人情未了：交银子打点，或挑一件装备送出去。' };
      }
      const alt = v3QuestAlt(s, ch);
      const path = s.quest.altDone || s.quest.altPath || null;
      const r = ch.reward || {};
      const out = [];
      const silverMul = path === 'silver' ? 1.15 : 1;
      const expMul = path === 'equip' ? 1.15 : 1;
      if (r.silver) {
        const sv = Math.round(r.silver * silverMul);
        s.silver += sv;
        out.push('银两 +' + sv);
      }
      if (r.exp) {
        const e = Math.round(expNeed(s.level) * r.exp * expMul);
        s.exp += e;
        out.push('修为 +' + e);
      }
      if (r.skillPoint) { s.skillPoints += r.skillPoint; out.push('技能点 +' + r.skillPoint); }
      s.quest.idx += 1;
      if (alt) {
        s.quest.altPath = path;
        s.quest.altDone = null;
      }
      s.quest.base = {
        wins: s.wins || 0,
        eliteWins: s.stats.eliteWins || 0,
        travels: s.stats.travels || 0,
        equips: s.stats.equips || 0,
        dests: JSON.parse(JSON.stringify(s.stats.dests || {})),
      };
      s.quest.readyLogged = null;
      growthPush(s, 'story_' + ch.id, '江湖纪事', ch.title);
      logPush(s, '『' + ch.title + '』告一段落');
      const lv = v3LevelUp(s);
      if (lv.learned.length) out.push('习得 ' + lv.learned.join('、'));
      const suffix = out.length ? '（' + out.join('，') + '）' : '';
      if (ch.choice) return { ok: true, text: '『' + ch.title + '』已完成' + suffix, choice: true };
      return { ok: true, text: '『' + ch.title + '』已完成' + suffix };
    }

    function v3ChooseEnding(s, endingId) {
      if (!s.sect) return { ok: false, text: '尚未拜师' };
      const list = ENDINGS[s.sect] || [];
      let ending = null;
      for (let i = 0; i < list.length; i += 1) if (list[i].id === endingId) ending = list[i];
      if (!ending) return { ok: false, text: '无此结局' };
      const isGaibang = s.sect === 'gaibang';
      const needLv = isGaibang ? 99 : 80;
      if (s.level < needLv) return { ok: false, text: '需 ' + needLv + ' 级方可抉择' };
      if (isGaibang && s.quest.chapterDone80 === false) { /* noop */ }
      if (ending.need) {
        const v = s[ending.need.stat] || 0;
        if (v < ending.need.n) {
          return { ok: false, text: '需' + (ending.need.stat === 'int' ? '智力' : '敏捷') + ' ' + ending.need.n + ' 点（当前 ' + v + '）' };
        }
      }
      s.quest.choice80 = endingId;
      s.quest.hidden99 = endingId;
      if (endingId === 'gaibang_kuihua') {
        s.gender = 'kuihua';
        growthPush(s, 'gender_kuihua', '阴阳倒转', '修炼《葵花宝典》，你不再是原来的你');
      }
      const skill = v3LearnFinal(s);
      v3GrantJue(s);
      growthPush(s, 'ending_' + endingId, '终局抉择', '你选择了「' + ending.name + '」');
      logPush(s, '你选择了「' + ending.name + '」');
      return { ok: true, text: '你选择了「' + ending.name + '」' + (skill && skill.skill ? '，终式大成' : ''), ending: ending };
    }

    /* ---- 装备 ---- */
    function v3EquipTier(s) {
      return Math.max(1, Math.min(19, Math.floor(s.level / 5)));
    }

    function v3MakeEquip(sect, kind, tier, qid) {
      const q = EQUIP_QUALITIES.filter(function (x) { return x.id === qid; })[0] || EQUIP_QUALITIES[1];
      const lv = tier * 5;
      const names = kind === 'weapon' ? WEAPON_NAMES[sect] : ARMOR_NAMES[sect];
      const base = names[Math.max(0, Math.min(names.length - 1, tier - 1))] || names[0];
      const uid = kind + '_' + sect + '_' + tier + '_' + q.id;
      if (kind === 'weapon') {
        return {
          uid: uid, kind: kind, sect: sect, tier: tier, qid: q.id, lv: lv,
          name: base + '·' + q.name,
          atk: Math.round((4 + lv * 1.15) * q.mul),
          spd: Math.round(lv * 0.15 * q.mul),
        };
      }
      return {
        uid: uid, kind: kind, sect: sect, tier: tier, qid: q.id, lv: lv,
        name: base + '·' + q.name,
        def: Math.round((2 + lv * 0.72) * q.mul),
        hp: Math.round((14 + lv * 3.1) * q.mul),
      };
    }

    function v3EquipPrice(item) {
      const q = EQUIP_QUALITIES.filter(function (x) { return x.id === item.qid; })[0] || EQUIP_QUALITIES[1];
      const lv = item.tier * 5;
      const base = item.kind === 'weapon' ? (40 + lv * 24) : (34 + lv * 20);
      return Math.round(base * q.price);
    }

    function v3AddToBag(s, item) {
      if (!item.jue && typeof item.uid === 'string' && item.uid.indexOf('#') < 0) {
        item.uid = item.uid + '#' + (s.bag.length + 1) + Math.random().toString(36).slice(2, 5);
      }
      s.bag.push(item);
      if (s.bag.length > 60) s.bag.splice(0, s.bag.length - 60);
      s.stats.equips = (s.stats.equips || 0) + 1;
      v3QuestCheck(s);
      return item;
    }

    function v3DropEquip(s, elite) {
      if (!s.sect) return null;
      const p = elite ? 0.34 : 0.16;
      if (!chance(p)) return null;
      const tier = v3EquipTier(s);
      let qid = 'private';
      const roll = Math.random();
      if (roll < 0.32) qid = 'broken';
      else if (roll < 0.86) qid = 'private';
      else qid = 'official';
      if (elite && roll > 0.55) qid = 'official';
      const kind = chance(0.6) ? 'weapon' : 'armor';
      const it = v3MakeEquip(s.sect, kind, tier, qid);
      v3AddToBag(s, it);
      return it;
    }

    function v3DropSkillPoint(s, source) {
      const p = source === 'elite' ? 0.12 : source === 'travel' ? 0.05 : 0.04;
      if (chance(p)) {
        s.skillPoints += 1;
        return true;
      }
      return false;
    }

    function v3BuyEquip(s, kind, qid) {
      if (!s.sect) return { ok: false, text: '先拜入门派，才能购本门兵器' };
      const tier = v3EquipTier(s);
      const it = v3MakeEquip(s.sect, kind, tier, qid);
      const price = v3EquipPrice(it);
      if (s.silver < price) return { ok: false, text: '银两不足（需 ' + price + '）' };
      s.silver -= price;
      v3AddToBag(s, it);
      logPush(s, '你花了 ' + price + ' 两银子，购得「' + it.name + '」');
      return { ok: true, text: '购得「' + it.name + '」', item: it };
    }

    function v3EquipFromBag(s, uid) {
      let idx = -1;
      for (let i = 0; i < s.bag.length; i += 1) if (s.bag[i].uid === uid) idx = i;
      if (idx < 0) return { ok: false, text: '行囊中没有这件装备' };
      const item = s.bag[idx];
      const slot = item.kind === 'weapon' ? 'weapon' : 'armor';
      const old = s.equip[slot];
      s.bag.splice(idx, 1);
      s.equip[slot] = item;
      if (old) s.bag.push(old);
      return { ok: true, text: '装备「' + item.name + '」' };
    }

    function v3Unequip(s, slot) {
      const it = s.equip[slot];
      if (!it) return { ok: false, text: '该部位未装备' };
      s.equip[slot] = null;
      s.bag.push(it);
      return { ok: true, text: '卸下「' + it.name + '」' };
    }

    function v3SellEquip(s, uid) {
      let idx = -1;
      for (let i = 0; i < s.bag.length; i += 1) if (s.bag[i].uid === uid) idx = i;
      if (idx < 0) return { ok: false, text: '行囊中没有这件装备' };
      const it = s.bag[idx];
      if (it.jue) return { ok: false, text: '绝世神兵岂能论斤称两卖掉' };
      const price = Math.max(1, Math.round(v3EquipPrice(it) * 0.4));
      s.bag.splice(idx, 1);
      s.silver += price;
      logPush(s, '你把「' + it.name + '」当了 ' + price + ' 两银子');
      return { ok: true, text: '出售「' + it.name + '」，银两 +' + price, price: price };
    }

    function v3SellPrice(item) {
      if (!item || item.jue) return 0;
      return Math.max(1, Math.round(v3EquipPrice(item) * 0.4));
    }

    function v3JoinSect(s, sectId) {
      if (s.sect) return { ok: false, text: '你已拜入' + SECTS[s.sect].name };
      if (s.level < 10) return { ok: false, text: '需 10 级方可拜师' };
      const sec = SECTS[sectId];
      if (!sec) return { ok: false, text: '无此门派' };
      if (sec.gender === 'male' && s.gender !== 'male') return { ok: false, text: '少林寺只收男弟子' };
      if (sec.gender === 'female' && s.gender !== 'female') return { ok: false, text: '峨嵋派只收女弟子' };
      s.sect = sectId;
      const auto = v3AutoSkills(s);
      growthPush(s, 'join_' + sectId, '拜入门派', '你拜入' + sec.name + '，成为' + sec.titles[0].name);
      logPush(s, '你拜入' + sec.name);
      return { ok: true, text: '你拜入' + sec.name + (auto.length ? '，习得「' + auto.join('、') + '」' : '') };
    }
