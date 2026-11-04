    /* ================================================================== */
    /* V3 · UI                                                             */
    /* ================================================================== */

    const V3_CSS = [
      '.jw3-card,.jw3-pill{--jw3-gold:#c8a45d;--jw3-gold:color-mix(in srgb, var(--dsw-alias-label-primary,#e9e7e2) 42%, #c8a45d);}',
      '.jw3-card{box-sizing:border-box;display:flex;flex-direction:column;gap:7px;',
      'max-height:min(78vh,620px);overflow:auto;padding:10px 12px 12px;border-radius:12px;',
      'background:var(--dsw-alias-bg-overlay,#26272d);color:var(--dsw-alias-label-primary,#e9e7e2);',
      'border:1px solid var(--dsw-alias-border-l2,#4a4d57);',
      'box-shadow:0 14px 38px rgba(0,0,0,.28);font-size:13px;line-height:1.65;',
      'font-family:"KaiTi","STKaiti","Microsoft YaHei",serif;}',
      '.jw3-head{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;cursor:grab;}',
      '.jw3-title{font-size:17px;font-weight:700;letter-spacing:2px;color:var(--jw3-gold);}',
      '.jw3-max{font-size:10px;font-weight:400;letter-spacing:1px;color:var(--jw3-gold);border:1px solid color-mix(in srgb, var(--jw3-gold) 55%, transparent);border-radius:8px;padding:1px 6px;margin-left:8px;vertical-align:2px;}',
      '.jw3-sub{font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);margin-top:1px;}',
      '.jw3-icon-btn{flex:none;width:22px;height:22px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1,#383a42);',
      'background:transparent;color:var(--dsw-alias-label-secondary,#a9a59c);cursor:pointer;font-size:13px;line-height:1;}',
      '.jw3-icon-btn:hover{color:var(--dsw-alias-label-primary,#e9e7e2);border-color:var(--dsw-alias-border-l2,#4a4d57);}',
      '.jw3-tabs{display:grid;grid-template-columns:repeat(6,1fr);gap:2px;border-bottom:1px solid var(--dsw-alias-border-l1,#383a42);padding-bottom:4px;}',
      '.jw3-tab{position:relative;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#a9a59c);',
      'font-size:12px;padding:4px 0;cursor:pointer;border-radius:5px;font-family:inherit;}',
      '.jw3-tab.on{color:var(--dsw-alias-label-primary,#e9e7e2);background:color-mix(in srgb, var(--jw3-gold) 15%, transparent);font-weight:700;}',
      '.jw3-dot{position:absolute;top:0;right:4px;width:4px;height:4px;border-radius:50%;background:#e06c5a;}',
      '.jw3-sec{font-size:12px;font-weight:700;color:var(--jw3-gold);margin-top:2px;display:flex;align-items:center;gap:6px;}',
      '.jw3-sec:before{content:"";display:inline-block;width:3px;height:12px;background:var(--jw3-gold);border-radius:1px;}',
      '.jw3-muted{font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-row{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;}',
      '.jw3-bars{display:flex;flex-direction:column;gap:5px;}',
      '.jw3-bars .jw3-row{flex-wrap:nowrap;gap:8px;}',
      '.jw3-bars .jw3-row .jw3-muted:last-child{white-space:nowrap;}',
      '.jw3-bar{position:relative;height:11px;border-radius:6px;background:var(--dsw-alias-bg-layer-1,#1f2025);overflow:hidden;}',
      '.jw3-bar>i{position:absolute;left:0;top:0;bottom:0;border-radius:5px;background:var(--jw3-gold);}',
      '.jw3-bar.em>i{background:var(--dsw-alias-state-success-primary,#6fbf73);}',
      '.jw3-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;}',
      '.jw3-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}',
      '.jw3-cell{background:var(--dsw-alias-bg-layer-1,#1f2025);border:1px solid var(--dsw-alias-border-l1,#383a42);',
      'border-radius:7px;padding:5px 7px;}',
      '.jw3-cell b{display:block;font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);font-weight:400;}',
      '.jw3-cell span{font-size:14px;font-weight:700;color:var(--dsw-alias-label-primary,#e9e7e2);}',
      '.jw3-num{font-size:13px;font-weight:700;color:var(--jw3-gold);}',
      '.jw3-btn{border:1px solid var(--dsw-alias-border-l2,#4a4d57);border-radius:7px;background:var(--dsw-alias-bg-layer-2,#2c2e35);',
      'color:var(--dsw-alias-label-primary,#e9e7e2);font-size:12px;padding:6px 10px;cursor:pointer;font-family:inherit;white-space:nowrap;}',
      '.jw3-btn:hover{border-color:var(--jw3-gold);}',
      '.jw3-btn.gold{background:#c8a45d;color:#20211f;border-color:#c8a45d;font-weight:700;}',
      '.jw3-btn.ghost{background:transparent;}',
      '.jw3-btn:disabled{opacity:.4;cursor:not-allowed;}',
      '.jw3-btn-row{display:flex;gap:6px;flex-wrap:wrap;}',
      '.jw3-btn-row3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}',
      '.jw3-btn-row3 .jw3-btn{min-width:0;padding:6px 2px;font-size:12px;text-align:center;overflow:hidden;text-overflow:ellipsis;}',
      '.jw3-attr{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;text-align:center;}',
      '.jw3-attr>div{background:var(--dsw-alias-bg-layer-1,#1f2025);border-radius:6px;padding:4px 1px;}',
      '.jw3-attr em{display:block;font-style:normal;font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-attr i{font-style:normal;font-size:14px;font-weight:700;color:var(--dsw-alias-label-primary,#e9e7e2);}',
      '.jw3-attr button{margin-top:2px;width:100%;border:0;background:color-mix(in srgb, var(--jw3-gold) 16%, transparent);',
      'color:var(--jw3-gold);font-size:11px;border-radius:4px;cursor:pointer;padding:2px 0;font-family:inherit;}',
      '.jw3-line{background:var(--dsw-alias-bg-layer-1,#1f2025);border-radius:7px;padding:6px 8px;font-size:11px;',
      'color:var(--dsw-alias-label-secondary,#a9a59c);max-height:110px;overflow:auto;}',
      '.jw3-opp{background:var(--dsw-alias-bg-layer-1,#1f2025);border:1px solid var(--dsw-alias-border-l1,#383a42);',
      'border-radius:8px;padding:7px 9px;display:flex;flex-direction:column;gap:4px;}',
      '.jw3-opp-top{display:flex;justify-content:space-between;align-items:center;gap:6px;}',
      '.jw3-tag{font-size:10px;padding:1px 6px;border-radius:8px;border:1px solid var(--jw3-gold);color:var(--jw3-gold);}',
      '.jw3-tag.elite{border-color:#c05a4a;color:#c05a4a;}',
      '.jw3-stat-row{display:flex;gap:10px;font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-stat-row b{color:var(--dsw-alias-label-primary,#e9e7e2);font-weight:700;}',
      '.jw3-rate{font-size:11px;color:var(--dsw-alias-state-success-primary,#3f9b46);font-weight:700;}',
      '.jw3-opp-actions{display:flex;justify-content:flex-end;gap:6px;}',
      '.jw3-fight{display:flex;flex-direction:column;gap:6px;}',
      '.jw3-hp{display:flex;flex-direction:column;gap:2px;font-size:11px;}',
      '.jw3-hp .barline{height:9px;border-radius:5px;background:var(--dsw-alias-bg-layer-1,#1f2025);overflow:hidden;}',
      '.jw3-hp .barline>i{display:block;height:100%;background:#d06c5a;transition:width .3s;}',
      '.jw3-hp .barline.p>i{background:var(--dsw-alias-state-success-primary,#6fbf73);}',
      '.jw3-log{display:flex;flex-direction:column;gap:2px;max-height:150px;overflow:auto;font-size:11px;',
      'color:var(--dsw-alias-label-secondary,#a9a59c);background:var(--dsw-alias-bg-layer-1,#1f2025);',
      'border-radius:7px;padding:6px 8px;}',
      '.jw3-result{border:1px solid var(--jw3-gold);border-radius:8px;padding:8px 10px;font-size:12px;',
      'background:color-mix(in srgb, var(--jw3-gold) 9%, transparent);}',
      '.jw3-choice{border:1px solid var(--dsw-alias-border-l2,#4a4d57);border-radius:8px;padding:7px 9px;',
      'display:flex;flex-direction:column;gap:4px;}',
      '.jw3-choice.act{border-color:var(--jw3-gold);background:color-mix(in srgb, var(--jw3-gold) 8%, transparent);}',
      '.jw3-skill{border:1px solid var(--dsw-alias-border-l1,#383a42);border-radius:7px;padding:6px 8px;',
      'display:flex;flex-direction:column;gap:2px;background:var(--dsw-alias-bg-layer-1,#1f2025);}',
      '.jw3-skill.learned{border-color:color-mix(in srgb, var(--jw3-gold) 55%, transparent);}',
      '.jw3-skill-head{display:flex;justify-content:space-between;gap:6px;align-items:center;font-size:12px;}',
      '.jw3-skill-head b{color:var(--dsw-alias-label-primary,#e9e7e2);}',
      '.jw3-chip{font-size:10px;padding:0 5px;border-radius:7px;border:1px solid var(--dsw-alias-border-l2,#4a4d57);',
      'color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-chip.gold{border-color:var(--jw3-gold);color:var(--jw3-gold);}',
      '.jw3-story{font-size:12px;line-height:1.8;text-indent:2em;color:var(--dsw-alias-label-primary,#e9e7e2);white-space:pre-wrap;}',
      '.jw3-price{color:var(--jw3-gold);font-weight:700;}',
      '.jw3-task{display:flex;justify-content:space-between;gap:8px;font-size:12px;padding:4px 0;',
      'border-bottom:1px dashed var(--dsw-alias-border-l1,#383a42);}',
      '.jw3-task.done{color:var(--dsw-alias-state-success-primary,#3f9b46);}',
      '.jw3-timer{font-size:11px;color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-readonly{font-size:12px;font-weight:700;color:var(--dsw-alias-label-primary,#e9e7e2);}',
      '.jw3-bag-item{display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:11px;',
      'border-bottom:1px dashed var(--dsw-alias-border-l1,#383a42);padding:3px 0;}',
      '.jw3-pill{position:fixed;z-index:60;display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;',
      'background:var(--dsw-alias-bg-overlay,#26272d);border:1px solid var(--jw3-gold);color:var(--jw3-gold);font-size:11px;',
      'cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.24);font-family:inherit;}',
      '.jw3-pill .badge{background:#c8a45d;color:#20211f;border-radius:8px;font-size:10px;padding:0 4px;font-weight:700;}',
      '.jw3-pill-hide{opacity:.62;}','.jw3-pill-hide:hover{opacity:1;}',
      '.jw3-toast{position:fixed;z-index:70;left:50%;transform:translateX(-50%);bottom:26px;padding:5px 12px;',
      'border-radius:8px;background:rgba(30,30,34,.94);color:#f0d9a8;font-size:11px;pointer-events:none;}',
      '.jw3-choice-row{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;}',
      '.jw3-back{font-size:10px;}',
      '.jw3-card.jw3-compact{font-size:12px;padding:9px 10px 11px;}',
      '.jw3-card.jw3-compact .jw3-tab{font-size:11px;}',
      '.jw3-card.jw3-compact .jw3-grid2{grid-template-columns:1fr;}',
      '.jw3-card.jw3-compact .jw3-cell span{font-size:13px;}',
      '.jw3-card.jw3-compact .jw3-title{font-size:16px;}',
      '.jw3-card.jw3-compact .jw3-grid3{grid-template-columns:repeat(2,1fr);}',
      '.jw3-card.jw3-large{font-size:13px;padding:12px 14px 14px;}',
      '.jw3-card.jw3-large .jw3-grid2{grid-template-columns:repeat(2,1fr);}',
      '.jw3-card.jw3-large .jw3-log{max-height:150px;}',
      '.jw3-card.jw3-dock-left{border-left-color:var(--jw3-gold);}',
      '.jw3-card.jw3-dock-right{border-right-color:var(--jw3-gold);}',
      '.jw3-card.jw3-dock-top{border-top-color:var(--jw3-gold);}',
      '.jw3-card.jw3-dock-bottom{border-bottom-color:var(--jw3-gold);}',
      '.jw3-empty{font-size:10px;color:var(--dsw-alias-label-secondary,#a9a59c);opacity:.75;padding:4px 0;}',
      '.jw3-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;}',
      '.jw3-stat-grid>div{background:var(--dsw-alias-bg-layer-1,#1f2025);border-radius:6px;padding:3px 6px;',
      'display:flex;justify-content:space-between;align-items:baseline;gap:3px;min-width:0;}',
      '.jw3-stat-grid em{font-style:normal;font-size:10px;color:var(--dsw-alias-label-secondary,#a9a59c);white-space:nowrap;}',
      '.jw3-stat-grid i{font-style:normal;font-size:12.5px;font-weight:700;color:var(--dsw-alias-label-primary,#e9e7e2);',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.jw3-actions2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;}',
      '.jw3-actions2 .jw3-btn{min-width:0;padding:6px 2px;font-size:12px;text-align:center;overflow:hidden;text-overflow:ellipsis;}',
      '.jw3-ladder{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;}',
      '.jw3-rung{font-size:10.5px;text-align:center;line-height:1.35;padding:3px 1px;border-radius:5px;',
      'border:1px solid var(--dsw-alias-border-l1,#383a42);color:var(--dsw-alias-label-secondary,#a9a59c);}',
      '.jw3-rung.reached{border-color:var(--jw3-gold);color:var(--jw3-gold);}',
      '.jw3-rung.cur{background:var(--jw3-gold);color:#20211f;border-color:var(--jw3-gold);font-weight:700;}',
    ].join('');

    const V3_CARD_WIDTH = { compact: 320, standard: 320, large: 320 };

    function v3CardWidth(settings) {
      return V3_CARD_WIDTH.compact;
    }

    const UI3 = {
      tab: 'home',
      view: 'home',
      battle: null,
      opponents: null,
      travel: null,
      travelText: '',
      toast: null,
      onboardName: '',
      onboardGender: 'male',
      settingsName: '',
      shopQ: 'private',
      showChoice: false,
      showHidden: false,
    };

    function v3Toast(msg) {
      UI3.toast = msg;
      window.setTimeout(function () {
        if (UI3.toast === msg) {
          UI3.toast = null;
          if (window.__JW3_RERENDER) window.__JW3_RERENDER();
        }
      }, 2200);
    }

    function v3PlaceCard(s, w, h) {
      const W = window.innerWidth || 1280;
      const H = window.innerHeight || 800;
      if (!s.pos) s.pos = { x: W - w - 18, y: Math.max(64, H - h - 20) };
      if (s.dock === 'right') s.pos.x = W - w - 6;
      else if (s.dock === 'left') s.pos.x = 6;
      s.pos.x = Math.max(6, Math.min(W - w - 6, s.pos.x));
      if (s.dock === 'bottom') s.pos.y = H - h - 6;
      else if (s.dock === 'top') s.pos.y = 6;
      s.pos.y = Math.max(6, Math.min(H - h - 6, s.pos.y));
    }

    function v3GenderText(s) {
      if (s.gender === 'kuihua') return '葵花';
      return s.gender === 'female' ? '女' : '男';
    }

    function v3AchieveList(s) {
      return ACHIEVEMENTS.map(function (a) {
        return { id: a.id, title: a.title, desc: a.desc, got: !!s.ach[a.id] };
      });
    }

    function JianghuPetV3() {
      const rerenderState = useState(0);
      const rerender = rerenderState[1];
      const [battleKey, setBattleKey] = useState(0);
      const cardRef = useRef(null);
      const pillRef = useRef(null);
      const drag = useRef(null);
      const suppressClick = useRef(false);
      const holdRef = useRef({ timer: null, interval: null });
      const nameRef = useRef(null);

      function refresh() {
        rerender(function (v) { return (v + 1) % 1000000; });
      }
      window.__JW3_RERENDER = refresh;

      if (!S) {
        S = v3Load();
        v3PlaceCard(S, v3CardWidth(S.settings), 380);
        UI3.onboardName = S.name && S.name !== '少侠' ? S.name : '';
        UI3.onboardGender = S.gender === 'female' ? 'female' : 'male';
      }

      useEffect(function () {
        let count = 0;
        const id = window.setInterval(function () {
          if (!S || !S.setup) return;
          if (typeof document !== 'undefined' && document.hidden) return;
          const ae = typeof document !== 'undefined' ? document.activeElement : null;
          if (ae && ae.classList && ae.classList.contains('jw3-input')) return;
          const r = v3Tick(S, Date.now());
          if (r) {
            if (r.gains && r.gains.minutes >= 1) {
              logPush(S, '离线修炼 ' + Math.round(r.gains.minutes) + ' 分钟：修为 +'
                + Math.round(r.gains.exp) + '，银两 +' + Math.round(r.gains.silver));
            }
            if (r.ups > 0) v3Toast('突破至 ' + S.level + ' 级');
            if (r.learned && r.learned.length) v3Toast('习得「' + r.learned.join('、') + '」');
          }
          count += 1;
          if (S.settings.autosave !== false && count % 5 === 0) save();
          rerender(function (v) { return (v + 1) % 1000000; });
        }, 1000);
        return function () { window.clearInterval(id); };
      }, []);

      useEffect(function () {
        if (!UI3.battle || UI3.battle.res) return undefined;
        const b = UI3.battle;
        const lines = b.sim.lines;
        const step = Math.max(170, Math.min(380, Math.floor(4200 / Math.max(1, lines.length))));
        const id = window.setInterval(function () {
          if (UI3.battle !== b) return;
          b.shown += 1;
          if (b.shown >= lines.length) {
            window.clearInterval(id);
            finishBattle();
          } else {
            refresh();
          }
        }, step);
        return function () { window.clearInterval(id); };
      }, [battleKey]);

      /* after every render, clamp / re-dock using the element's real size */
      React.useLayoutEffect(function () {
        const el = S.collapsed ? pillRef.current : cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const W = window.innerWidth || 1280;
        const H = window.innerHeight || 800;
        const w = r.width || el.offsetWidth || 320;
        const h = r.height || el.offsetHeight || 40;
        const base = S.pos || { x: 64, y: 96 };
        let x = base.x;
        let y = base.y;
        if (S.dock === 'right') x = W - w - 6;
        else if (S.dock === 'left') x = 6;
        x = Math.max(6, Math.min(W - w - 6, x));
        if (S.dock === 'bottom') y = H - h - 6;
        else if (S.dock === 'top') y = 6;
        y = Math.max(6, Math.min(H - h - 6, y));
        if (!S.pos || Math.abs(x - S.pos.x) > 0.5 || Math.abs(y - S.pos.y) > 0.5) {
          S.pos = { x: x, y: y };
          /* write position straight to the DOM: never trigger a re-render from
             inside a layout effect (a re-render loop makes text inputs laggy). */
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        }
      });

      function finishBattle() {
        const b = UI3.battle;
        if (!b || b.res) return;
        const res = v3ApplyBattle(S, b.enemy, b.sim);
        v3CheckBattleGrowth(S, res);
        if (res.drops.length) logPush(S, '战利品：' + res.drops.join('，'));
        b.res = res;
        UI3.opponents = null;
        save();
        refresh();
      }

      function startBattle(opp) {
        const sim = v3Battle(S, opp.enemy);
        UI3.battle = { enemy: opp.enemy, tag: opp.tag, sim: sim, res: null, shown: 0 };
        UI3.view = 'battle';
        setBattleKey(function (k) { return k + 1; });
        refresh();
      }

      function doFight(opp) {
        if (S.stamina < 10) { v3Toast('体力不足（比武需 10 点）'); return; }
        S.stamina -= 10;
        startBattle(opp);
      }

      function refreshOpponents() {
        UI3.opponents = v3MakeOpponents(S);
        refresh();
      }

      function closeBattle() {
        UI3.battle = null;
        UI3.opponents = null;
        UI3.view = 'home';
        UI3.tab = 'home';
        refresh();
      }

      function openTab(tab) {
        UI3.tab = tab;
        UI3.view = 'home';
        if (tab !== 'quest') UI3.showChoice = false;
        refresh();
      }

      function doClaimQuest() {
        const r = v3ClaimQuest(S);
        v3Toast(r.text);
        if (r.ok && r.choice) UI3.showChoice = true;
        save();
        refresh();
      }

      function doChoose(endingId) {
        const r = v3ChooseEnding(S, endingId);
        v3Toast(r.text);
        if (r.ok) UI3.showChoice = false;
        save();
        refresh();
      }

      function doJoinSect(sectId) {
        const r = v3JoinSect(S, sectId);
        v3Toast(r.text);
        save();
        refresh();
      }

      function doLearn(id) {
        const r = v3TryLearn(S, id);
        v3Toast(r.text);
        save();
        refresh();
      }

      function doTravel(destId) {
        if (S.stamina < 15) { v3Toast('体力不足（游历需 15 点）'); return; }
        const dest = DESTINATIONS[destId];
        if (!dest) return;
        S.stamina -= 15;
        const ev = dest.events[rndInt(0, dest.events.length - 1)];
        UI3.travel = { dest: destId, event: ev, chain: false };
        UI3.travelText = '';
        refresh();
      }

      function doTravelOption(opt) {
        const ev = UI3.travel;
        if (!ev || ev.resolved) return;
        const r = v3ResolveTravelOption(S, opt);
        UI3.travelText = r.text;
        if (r.next) {
          UI3.travel = { dest: ev.dest, event: r.next, chain: true, resolved: false };
        } else {
          UI3.travel = { dest: ev.dest, event: ev.event, chain: false, resolved: true };
          v3RecordTravel(S, ev.dest);
        }
        save();
        refresh();
      }

      function closeTravel() {
        UI3.travel = null;
        UI3.travelText = '';
        UI3.view = 'home';
        UI3.tab = 'home';
        refresh();
      }

      function doBuyShop(kind) {
        const r = v3BuyShopItem(S, kind);
        v3Toast(r.text);
        save();
        refresh();
      }

      function doEquip(uid) {
        const r = v3EquipFromBag(S, uid);
        v3Toast(r.text);
        save();
        refresh();
      }

      function doSell(uid) {
        const r = v3SellEquip(S, uid);
        v3Toast(r.text);
        if (r.ok) save();
        refresh();
      }

      function doSubmitAlt(way) {
        const r = v3SubmitAlt(S, way);
        v3Toast(r.text);
        if (r.ok) save();
        refresh();
      }

      function doUnequip(slot) {
        const r = v3Unequip(S, slot);
        v3Toast(r.text);
        save();
        refresh();
      }

      function attrPlus(key) {
        if (S.potential <= 0) { v3Toast('潜能不足'); return; }
        S.potential -= 1;
        S[key] += 1;
        save();
        refresh();
      }

      function startDrag(e) {
        if (e.button !== undefined && e.button !== 0) return;
        const cur = e.currentTarget;
        const t = e.target;
        if (t && t.closest) {
          const it = t.closest('button, input, textarea, select, a');
          if (it && it !== cur) return;
        }
        if (drag.current) return;
        const el = S.collapsed ? pillRef.current : cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const base = S.pos || { x: r.left, y: r.top };
        const self = {
          x: e.clientX, y: e.clientY, px: base.x, py: base.y,
          w: r.width || el.offsetWidth, h: r.height || el.offsetHeight, moved: false,
        };
        function onMove(ev) { moveDrag(ev); }
        function onUp(ev) { endDrag(ev, self); }
        self.cleanup = function () {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
        };
        drag.current = self;
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
      }

      function moveDrag(e) {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (!d.moved) {
          if (Math.abs(dx) < 3 && Math.abs(dy) < 3) return;
          d.moved = true;
        }
        const W = window.innerWidth || 1280;
        const H = window.innerHeight || 800;
        S.pos = {
          x: Math.max(6, Math.min(W - d.w - 6, d.px + dx)),
          y: Math.max(6, Math.min(H - d.h - 6, d.py + dy)),
        };
        S.dock = null;
        refresh();
      }

      function endDrag(e, self) {
        const d = self || drag.current;
        if (!d) return;
        if (d.cleanup) d.cleanup();
        drag.current = null;
        if (!d.moved) return;
        suppressClick.current = true;
        window.setTimeout(function () { suppressClick.current = false; }, 0);
        const el = S.collapsed ? pillRef.current : cardRef.current;
        const W = window.innerWidth || 1280;
        const H = window.innerHeight || 800;
        const w = el ? (el.offsetWidth || d.w) : d.w;
        const h = el ? (el.offsetHeight || d.h) : d.h;
        const pos = S.pos || { x: d.px, y: d.py };
        if (S.settings.snap) {
          const th = 24;
          let dock = null;
          if (pos.x <= th) { pos.x = 6; dock = 'left'; }
          else if (pos.x + w >= W - th) { pos.x = W - w - 6; dock = 'right'; }
          if (!dock) {
            if (pos.y <= th) { pos.y = 6; dock = 'top'; }
            else if (pos.y + h >= H - th) { pos.y = H - h - 6; dock = 'bottom'; }
          }
          S.pos = pos;
          S.dock = dock;
        } else {
          S.dock = null;
        }
        save();
        refresh();
      }

      function toggleCollapse() {
        if (suppressClick.current) { suppressClick.current = false; return; }
        S.collapsed = !S.collapsed;
        v3PlaceCard(S, S.collapsed ? 168 : v3CardWidth(S.settings), S.collapsed ? 34 : 420);
        save();
        refresh();
      }

      function resetPos() {
        S.pos = null;
        S.dock = null;
        v3PlaceCard(S, S.collapsed ? 168 : v3CardWidth(S.settings), S.collapsed ? 34 : 420);
        save();
        refresh();
      }

      /* ------------------------- render ------------------------- */

      if (!S.setup) {
        return h(React.Fragment, null,
          h('style', { key: 'css' }, V3_CSS),
          h('div', {
            key: 'onboard', ref: cardRef,
            className: 'jw3-card jw3-compact',
            style: { position: 'fixed', left: (S.pos ? S.pos.x : 64) + 'px', top: (S.pos ? S.pos.y : 96) + 'px', width: '320px', zIndex: 60, pointerEvents: 'auto' },
          },
            h('div', { className: 'jw3-head', onPointerDown: startDrag },
              h('div', null,
                h('div', { className: 'jw3-title' }, '桌面江湖'),
                h('div', { className: 'jw3-sub' }, '入世 · 先立名号')
              )
            ),
            h('div', { className: 'jw3-story' }, '案头一方，即是江湖。今日起在桌面行走江湖，先给自己立个名号。'),
            h('div', { className: 'jw3-row' },
              h('span', { className: 'jw3-muted' }, '名号'),
              h('input', {
                className: 'jw3-input', ref: nameRef, defaultValue: UI3.onboardName,
                placeholder: '取个侠名（最多 12 字）',
                onChange: function (e) { UI3.onboardName = e.target.value; },
                style: { flex: 1, marginLeft: '8px', background: 'var(--dsw-alias-bg-layer-1,#1f2025)', border: '1px solid var(--dsw-alias-border-l2,#4a4d57)', color: 'inherit', borderRadius: '6px', padding: '4px 7px', fontFamily: 'inherit' },
              })
            ),
            h('div', { className: 'jw3-row' },
              h('span', { className: 'jw3-muted' }, '性别'),
              h('div', { className: 'jw3-btn-row' },
                h('button', { className: 'jw3-btn' + (UI3.onboardGender === 'male' ? ' gold' : ''), onClick: function () { UI3.onboardGender = 'male'; refresh(); } }, '男'),
                h('button', { className: 'jw3-btn' + (UI3.onboardGender === 'female' ? ' gold' : ''), onClick: function () { UI3.onboardGender = 'female'; refresh(); } }, '女')
              )
            ),
            h('button', {
              className: 'jw3-btn gold', style: { width: '100%' },
              onClick: function () {
                const raw = nameRef.current ? nameRef.current.value : UI3.onboardName;
                const nm = (raw || '').trim().slice(0, 12);
                if (!nm) { v3Toast('请先取个名号'); return; }
                const s = newStateV3(nm);
                s.setup = true;
                s.gender = UI3.onboardGender;
                S = s;
                v3PlaceCard(S, v3CardWidth(S.settings), 380);
                logPush(S, '你踏入江湖，自「' + nm + '」始。');
                save();
                v3Toast('江湖路远，请多指教');
                refresh();
              },
            }, '踏入江湖')
          )
        );
      }

      const pos = S.pos || { x: 64, y: 96 };
      const activeTab = UI3.tab;

      function tabDef(id, label) {
        const dot = (id === 'home' && S.potential > 0) || (id === 'quest' && v3QuestReady(S))
          || (id === 'sect' && S.sect && S.skillPoints > 0 && v3LearnableForBadge());
        return h('button', {
          key: id, className: 'jw3-tab' + (activeTab === id ? ' on' : ''),
          onClick: function () { openTab(id); },
        }, label, dot ? h('span', { key: 'd', className: 'jw3-dot' }) : null);
      }

      function v3LearnableForBadge() {
        if (!S.sect || !SKILL_TREE[S.sect]) return false;
        return SKILL_TREE[S.sect].base.some(function (sk) {
          return !S.skills[sk.id] && S.level >= sk.lv && sk.sp > 0 && S.skillPoints >= sk.sp;
        });
      }

      /* ---- home ---- */
      function renderHome() {
        const d = v3Derived(S);
        const need = expNeed(S.level);
        const maxed = S.level >= 100;
        const sec = S.sect ? SECTS[S.sect] : null;
        const curQuest = v3QuestCurrent(S);
        const nodes = [];
        nodes.push(h('div', { key: 'bars', className: 'jw3-bars' },
          h('div', null,
            h('div', { className: 'jw3-row' },
              h('span', { className: 'jw3-muted' }, '修为'),
              h('span', { className: 'jw3-muted' }, maxed ? '满级 · 修为不再增长' : Math.round(S.exp) + ' / ' + need)),
            h('div', { className: 'jw3-bar' }, h('i', { style: { width: (maxed ? 100 : Math.min(100, (S.exp / need) * 100)) + '%' } }))
          ),
          h('div', null,
            h('div', { className: 'jw3-row' },
              h('span', { className: 'jw3-muted' }, '体力'),
              h('span', { className: 'jw3-muted' }, Math.round(S.stamina) + ' / ' + maxStamina(S.level))),
            h('div', { className: 'jw3-bar em' }, h('i', { style: { width: Math.min(100, (S.stamina / maxStamina(S.level)) * 100) + '%' } }))
          ),
          h('div', { key: 'rate', className: 'jw3-muted' },
            maxed
              ? '已臻化境 · 修为不再增长（仍可赚取银两）'
              : S.mode === 'train'
              ? '修炼中 · 修为 ' + fmt(trainRate(S.level)) + ' / 分 · 体力缓缓恢复'
              : S.mode === 'rest'
                ? '打坐调息中 · 体力恢复约 ' + fmt(10 * (1 + v3SkillPass(S).staPct)) + ' / 分'
                : '未修炼 · 点「修炼」涨修为，或「打坐调息」快速回体力')
        ));
        nodes.push(h('div', { key: 'cells', className: 'jw3-stat-grid' },
          cell('战力', d.atk), cell('气血', d.maxHp), cell('防御', d.def),
          cell('身法', d.spd), cell('银两', Math.round(S.silver)), cell('战绩', S.wins + '胜' + S.losses + '负')
        ));
        nodes.push(h('div', { key: 'actions', className: 'jw3-actions2' },
          h('button', {
            className: 'jw3-btn' + (S.mode === 'train' ? ' gold' : ''),
            onClick: function () { S.mode = S.mode === 'train' ? 'idle' : 'train'; save(); refresh(); },
          }, S.mode === 'train' ? '停止修炼' : '开始修炼'),
          h('button', {
            className: 'jw3-btn' + (S.mode === 'rest' ? ' gold' : ''),
            onClick: function () { S.mode = S.mode === 'rest' ? 'idle' : 'rest'; save(); refresh(); },
          }, S.mode === 'rest' ? '停止调息' : '打坐调息'),
          h('button', { className: 'jw3-btn', onClick: function () { UI3.view = 'battle'; refresh(); } }, '比武 · 10'),
          h('button', { className: 'jw3-btn', onClick: function () { UI3.view = 'travel'; refresh(); } }, '游历 · 15')
        ));
        nodes.push(h('div', { key: 'attr', className: 'jw3-attr' },
          attrCell('体质', S.con, 'con'), attrCell('智力', S.int, 'int'),
          attrCell('力量', S.str, 'str'), attrCell('耐力', S.end, 'end'), attrCell('敏捷', S.agi, 'agi')
        ));
        nodes.push(h('div', { key: 'pot', className: 'jw3-row' },
          h('span', { className: 'jw3-muted' },
            '剩余潜能：' + S.potential
            + (S.pills ? ' · 忘忧丹 ×' + S.pills : '')
            + (S.bolus ? ' · 大力丸 ×' + S.bolus : '')),
          h('span', { className: 'jw3-row', style: { gap: '6px' } },
            S.pills ? h('button', {
              className: 'jw3-btn ghost', style: { padding: '2px 8px', fontSize: '11px' },
              onClick: function () {
                const r = v3UsePill(S);
                v3Toast(r.text);
                if (r.ok) { save(); }
                refresh();
              },
            }, '服用忘忧丹') : null,
            S.bolus ? h('button', {
              className: 'jw3-btn ghost', style: { padding: '2px 8px', fontSize: '11px' },
              onClick: function () {
                const r = v3UseBolus(S);
                v3Toast(r.text);
                if (r.ok) { save(); }
                refresh();
              },
            }, '服用大力丸') : null,
            h('span', { className: 'jw3-muted' }, sec ? sec.name + ' · ' + sectTitleOf(S) : '未拜师')
          )
        ));
        if (curQuest) {
          const qt = v3QuestTaskList(S, curQuest);
          const pend = qt.filter(function (x) { return !x.done; })[0];
          let qtext;
          if (pend) qtext = '委托：' + pend.label + '（' + pend.cur + '/' + pend.n + '）';
          else if (S.level < curQuest.lv) qtext = '需 ' + curQuest.lv + ' 级';
          else qtext = '委托已完成，可回任务页领取';
          nodes.push(h('div', { key: 'quest', className: 'jw3-cell', style: { cursor: 'pointer' }, onClick: function () { openTab('quest'); } },
            h('b', null, '主线 · ' + curQuest.title),
            h('div', { className: 'jw3-muted' }, qtext),
          ));
        }
        nodes.push(h('div', { key: 'log', className: 'jw3-line' },
          S.log.slice(-4).reverse().map(function (line, i) { return h('div', { key: i }, line); })
        ));
        return nodes;
      }

      function cell(label, val) {
        return h('div', { className: 'jw3-cell' }, h('b', null, label), h('span', null, String(val)));
      }

      function stopAttrHold() {
        const st = holdRef.current;
        if (st.timer) {
          window.clearTimeout(st.timer);
          st.timer = null;
          if (!st.fired && st.key) attrPlusQuiet(st.key);
        }
        if (st.interval) { window.clearInterval(st.interval); st.interval = null; }
        st.key = null;
      }

      function attrPlusQuiet(key) {
        if (S.potential <= 0) { stopAttrHold(); return; }
        S.potential -= 1;
        S[key] += 1;
        save();
        refresh();
      }

      function startAttrHold(e, key) {
        if (e && e.preventDefault) e.preventDefault();
        stopAttrHold();
        if (S.potential <= 0) { v3Toast('潜能不足'); return; }
        holdRef.current.key = key;
        holdRef.current.fired = false;
        holdRef.current.timer = window.setTimeout(function () {
          holdRef.current.fired = true;
          holdRef.current.interval = window.setInterval(function () { attrPlusQuiet(key); }, 160);
        }, 420);
      }

      function attrCell(label, val, key) {
        return h('div', null,
          h('em', null, label),
          h('i', null, String(val)),
          h('button', {
            onPointerDown: function (e) { startAttrHold(e, key); },
            onPointerUp: stopAttrHold,
            onPointerLeave: stopAttrHold,
            onPointerCancel: stopAttrHold,
            onContextMenu: function (e) { e.preventDefault(); },
          }, '+')
        );
      }

      /* ---- battle ---- */
      function renderBattle() {
        if (UI3.battle) {
          const b = UI3.battle;
          const lines = b.sim.lines.slice(0, b.shown);
          return [
            h('div', { key: 'head', className: 'jw3-row' },
              h('div', { className: 'jw3-sec' }, '比武 · ' + b.enemy.name + '（' + b.enemy.level + '级）'),
              h('button', { className: 'jw3-btn gold', onClick: function () { b.shown = b.sim.lines.length; finishBattle(); } }, '跳过')
            ),
            (function () {
              const hpArr = b.sim.hps || [];
              let php = b.sim.maxHp;
              let ehp = b.sim.maxEhp;
              if (b.res) {
                php = b.res.php;
                ehp = b.res.ehp;
              } else if (b.shown > 0 && hpArr.length) {
                const idx = Math.min(hpArr.length - 1, b.shown - 1);
                php = hpArr[idx][0];
                ehp = hpArr[idx][1];
              }
              const pMax = b.sim.maxHp;
              const eMax = b.sim.maxEhp;
              if (b.res) php = pMax;
              return h('div', { key: 'hp', className: 'jw3-hp' },
                h('div', { className: 'jw3-row' },
                  h('span', null, '你'),
                  h('span', { className: 'jw3-muted' }, '气血 ' + Math.round(php) + ' / ' + pMax)),
                h('div', { className: 'barline p' }, h('i', { style: { width: Math.max(0, Math.min(100, (php / pMax) * 100)) + '%' } })),
                h('div', { className: 'jw3-row', style: { marginTop: '3px' } },
                  h('span', null, b.enemy.name),
                  h('span', { className: 'jw3-muted' }, '气血 ' + Math.round(ehp) + ' / ' + eMax)),
                h('div', { className: 'barline' }, h('i', { style: { width: Math.max(0, Math.min(100, (ehp / eMax) * 100)) + '%' } })),
                b.res ? null : h('div', { className: 'jw3-muted', style: { marginTop: '2px' } }, '交手中…')
              );
            })(),
            h('div', { key: 'log', className: 'jw3-log' }, (lines.length ? lines : ['你与' + b.enemy.name + '相对而立，杀气渐起……'])
              .map(function (line, i) { return h('div', { key: i }, line); })),
            b.res ? h('div', { key: 'res', className: 'jw3-result' },
              h('div', null, (b.res.win ? '【胜】' : '【负】') + ' ' + b.enemy.name + ' · ' + b.res.rounds + ' 回合'),
              h('div', { className: 'jw3-muted' }, '修为 +' + b.res.exp + (b.res.silver ? '，银两 +' + b.res.silver : '')),
              b.res.drops.length ? h('div', { className: 'jw3-muted' }, '战利品：' + b.res.drops.join('，')) : null,
              h('div', { className: 'jw3-muted' }, '战后调息，气血已恢复圆满'),
              h('button', { className: 'jw3-btn gold', style: { marginTop: '4px' }, onClick: closeBattle }, '收势')
            ) : null,
          ];
        }
        if (!UI3.opponents) UI3.opponents = v3MakeOpponents(S);
        const list = UI3.opponents;
        return [
          h('div', { key: 'head', className: 'jw3-row' },
            h('div', { className: 'jw3-sec' }, '择人比武 · 10 体力'),
            h('div', { className: 'jw3-btn-row' },
              h('button', { className: 'jw3-btn ghost', onClick: refreshOpponents }, '换一批'),
              h('button', { className: 'jw3-btn ghost', onClick: function () { UI3.view = 'home'; UI3.tab = 'home'; refresh(); } }, '返回首页')
            )
          ),
        ].concat(list.map(function (it, i) {
          return h('div', { key: 'opp' + i, className: 'jw3-opp' },
            h('div', { className: 'jw3-opp-top' },
              h('b', null, it.enemy.name),
              h('span', { className: 'jw3-tag' + (it.enemy.elite ? ' elite' : '') }, it.tag + (it.enemy.elite ? ' · 精英' : ''))
            ),
            h('div', { className: 'jw3-stat-row' },
              h('span', null, '等级 ', h('b', null, it.enemy.level)),
              h('span', null, '气血 ', h('b', null, it.enemy.maxHp)),
              h('span', null, '攻击 ', h('b', null, it.enemy.atk))
            ),
            h('div', { className: 'jw3-opp-top' },
              h('span', { className: 'jw3-rate' }, '预估胜算 ' + it.rate + '%'),
              h('button', { className: 'jw3-btn gold', onClick: function () { doFight(it); } }, '挑战')
            )
          );
        }));
      }

      /* ---- travel ---- */
      function renderTravel() {
        if (UI3.travel) {
          const t = UI3.travel;
          return [
            h('div', { key: 'head', className: 'jw3-row' },
              h('div', { className: 'jw3-sec' }, (DESTINATIONS[t.dest] ? DESTINATIONS[t.dest].name : '江湖') + (t.chain ? ' · 再生变故' : '')),
              h('button', { className: 'jw3-btn gold', onClick: closeTravel }, '返回')
            ),
            h('div', { key: 'ev', className: 'jw3-cell' },
              h('b', null, t.event.title),
              h('div', { className: 'jw3-story', style: { marginTop: '3px' } }, t.event.text)
            ),
            h('div', { key: 'opts', className: 'jw3-grid2' }, (t.resolved ? [] : t.event.options).map(function (opt, i) {
              const can = !opt.can || opt.can(S);
              return h('button', {
                key: 'o' + i, className: 'jw3-btn',
                disabled: !can,
                onClick: function () { doTravelOption(opt); },
              }, opt.label);
            })),
            t.resolved ? h('div', { key: 'done', className: 'jw3-timer' }, '此事已了，收拾心情继续赶路。') : null,
            UI3.travelText ? h('div', { key: 'res', className: 'jw3-result' }, UI3.travelText) : null,
          ];
        }
        return [
          h('div', { key: 'head', className: 'jw3-row' },
            h('div', { className: 'jw3-sec' }, '游历 · 15 体力'),
            h('button', { className: 'jw3-btn ghost', onClick: function () { UI3.view = 'home'; UI3.tab = 'home'; refresh(); } }, '返回首页')
          ),
          h('div', { key: 'grid', className: 'jw3-grid2' }, DEST_ORDER.map(function (id) {
            const d = DESTINATIONS[id];
            return h('div', {
              key: id, className: 'jw3-cell', style: { cursor: 'pointer' },
              onClick: function () { doTravel(id); },
            },
              h('b', null, d.icon + ' ' + d.name),
              h('div', { className: 'jw3-muted' }, d.desc)
            );
          })),
        ];
      }

      /* ---- quest ---- */
      function renderQuest() {
        const nodes = [];
        const ch = v3QuestCurrent(S);
        const ending = v3EndingOf(S);
        if (!ch) {
          nodes.push(h('div', { key: 'done', className: 'jw3-result' },
            '主线已走完。' + (ending ? '你的终局：「' + ending.name + '」' : ''),
            h('div', { className: 'jw3-muted', style: { marginTop: '3px' } }, FINAL_TEXT[S.sect] || '')
          ));
        } else {
          const tasks = v3QuestTaskList(S, ch);
          const doneCount = tasks.filter(function (x) { return x.done; }).length;
          const levelOk = S.level >= ch.lv;
          const alt = v3QuestAlt(S, ch);
          const altDone = v3QuestAltDone(S, ch);
          const bagOk = S.bag.some(function (x) { return !x.jue; });
          let head = ch.title;
          if (!levelOk) head += '（需 ' + ch.lv + ' 级）';
          else if (doneCount < tasks.length || !altDone) head += '（委托 ' + doneCount + '/' + tasks.length + (alt && !altDone ? ' · 人情未了' : '') + '）';
          else head += '（可领取）';
          nodes.push(h('div', { key: 'chap', className: 'jw3-cell' },
            h('b', null, head),
            h('div', { className: 'jw3-story', style: { marginTop: '4px' } }, ch.text),
            S.quest.altPath ? h('div', { key: 'flavor', className: 'jw3-muted', style: { marginTop: '3px' } }, ALT_FLAVOR[S.quest.altPath]) : null,
            h('div', { key: 'ti', className: 'jw3-muted', style: { marginTop: '3px' } }, TASK_INTRO[ch.id] || ''),
            h('div', { key: 'th', className: 'jw3-sec', style: { marginTop: '5px' } }, '本章委托'),
            h('div', { key: 'tasks' }, tasks.map(function (x) {
              return h('div', { key: x.label + x.n, className: 'jw3-task' + (x.done ? ' done' : '') },
                h('span', null, (x.done ? '✓ ' : '○ ') + x.label),
                h('b', null, x.cur + ' / ' + x.n)
              );
            })),
            alt ? h('div', { key: 'alt' },
              h('div', { key: 'altSec', className: 'jw3-sec', style: { marginTop: '5px' } }, '人情往来（二选一）'),
              h('div', { key: 'altRow', className: 'jw3-row', style: { gap: '6px' } },
                h('button', {
                  className: 'jw3-btn' + (S.quest.altDone === 'silver' ? ' gold' : ''),
                  disabled: !!S.quest.altDone || S.silver < alt.silver,
                  onClick: function () { doSubmitAlt('silver'); },
                }, S.quest.altDone === 'silver' ? '✓ 银两已打点' : '打点 ' + alt.silver + ' 两'),
                h('button', {
                  className: 'jw3-btn' + (S.quest.altDone === 'equip' ? ' gold' : ''),
                  disabled: !!S.quest.altDone || !bagOk,
                  onClick: function () { doSubmitAlt('equip'); },
                }, S.quest.altDone === 'equip' ? '✓ 装备已送出' : '交出一件装备')
              ),
              h('div', { key: 'altNote', className: 'jw3-muted' },
                S.quest.altDone === 'silver' ? '银子递出去，事情办得利落。'
                  : S.quest.altDone === 'equip' ? '装备递过去，江湖人记下你的人情。'
                    : '银两打点更省事，送装备更结人情——两条路都会影响往后的主线。')
            ) : null,
            !levelOk ? h('div', { key: 'lv', className: 'jw3-timer', style: { marginTop: '4px' } },
              '等级不足：当前 ' + S.level + ' / 需 ' + ch.lv) : null,
            h('button', {
              className: 'jw3-btn gold', style: { marginTop: '6px' },
              disabled: !v3QuestReady(S),
              onClick: doClaimQuest,
            }, v3QuestReady(S)
              ? '领取本章 · ' + (ch.reward && ch.reward.silver ? '银两+' + ch.reward.silver : '推进')
              : '委托未完成（' + doneCount + '/' + tasks.length + (alt && !altDone ? ' · 人情未了' : '') + '）')
          ));
        }
        if (UI3.showChoice) {
          const list = ENDINGS[S.sect] || [];
          nodes.push(h('div', { key: 'choice', className: 'jw3-sec' }, '终局抉择'));
          nodes.push(h('div', { key: 'choiceRow', className: 'jw3-choice-row' },
            list.filter(function (e) { return !e.fallback; }).map(function (e) {
              return h('div', { key: e.id, className: 'jw3-choice act' },
                h('b', null, e.name),
                h('div', { className: 'jw3-muted' }, e.desc),
                h('button', { className: 'jw3-btn gold', onClick: function () { doChoose(e.id); } }, '选择')
              );
            })
          ));
        }
        if (S.sect === 'gaibang' && S.level >= 99 && !S.quest.choice80) {
          nodes.push(h('div', { key: 'hidden', className: 'jw3-sec' }, '99 级 · 江湖奇遇'));
          const list = ENDINGS.gaibang;
          list.forEach(function (e) {
            if (e.need) {
              const val = S[e.need.stat] || 0;
              const ok = val >= e.need.n;
              nodes.push(h('div', { key: e.id, className: 'jw3-choice' + (ok ? ' act' : '') },
                h('b', null, e.name + (ok ? '' : '（未解锁）')),
                h('div', { className: 'jw3-muted' }, e.desc + ' · 需' + (e.need.stat === 'int' ? '智力' : '敏捷') + ' ' + e.need.n + '（当前 ' + val + '）'),
                h('button', { className: 'jw3-btn', disabled: !ok, onClick: function () { doChoose(e.id); } }, ok ? '走这条路' : '条件不足')
              ));
            } else {
              nodes.push(h('div', { key: e.id, className: 'jw3-choice' },
                h('b', null, e.name),
                h('div', { className: 'jw3-muted' }, e.desc),
                h('button', { className: 'jw3-btn', onClick: function () { doChoose(e.id); } }, '不涉庙堂，执刀屠龙')
              ));
            }
          });
        }
        if (S.quest.choice80 && !ending) {
          nodes.push(h('div', { key: 'chosen', className: 'jw3-muted' }, '已抉择，等待 100 级终式大成。'));
        }
        const line = v3QuestLine(S);
        const doneChapters = line.slice(0, Math.min(S.quest.idx, line.length));
        if (doneChapters.length) {
          nodes.push(h('div', { key: 'past', className: 'jw3-sec' }, '已走过的章回'));
          nodes.push(h('div', { key: 'pastList', className: 'jw3-line' },
            doneChapters.map(function (c, i) { return h('div', { key: i }, '· ' + c.title); })
          ));
        }
        return nodes;
      }

      /* ---- sect ---- */
      function renderSect() {
        if (!S.sect) {
          const nodes = [h('div', { key: 'h', className: 'jw3-sec' }, '拜师 · 10 级可入')];
          SECT_KEYS.forEach(function (id) {
            const sec = SECTS[id];
            const genderOk = (sec.gender === 'any')
              || (sec.gender === 'male' && S.gender === 'male')
              || (sec.gender === 'female' && S.gender === 'female');
            nodes.push(h('div', { key: id, className: 'jw3-cell' },
              h('b', null, sec.icon + ' ' + sec.name),
              h('div', { className: 'jw3-muted' }, sec.desc),
              h('div', { className: 'jw3-row', style: { marginTop: '4px' } },
                h('span', { className: 'jw3-muted' }, sec.gender === 'male' ? '只收男弟子' : sec.gender === 'female' ? '只收女弟子' : '男女皆可'),
                h('button', {
                  className: 'jw3-btn' + (S.level >= 10 && genderOk ? ' gold' : ''),
                  disabled: S.level < 10 || !genderOk,
                  onClick: function () { doJoinSect(id); },
                }, S.level < 10 ? '需 10 级' : genderOk ? '拜入' : '性别不符')
              )
            ));
          });
          return nodes;
        }
        const sec = SECTS[S.sect];
        const tree = SKILL_TREE[S.sect];
        const nodes = [];
        nodes.push(h('div', { key: 'sect', className: 'jw3-cell' },
          h('b', null, sec.icon + ' ' + sec.name + ' · ' + sectTitleOf(S)),
          h('div', { className: 'jw3-muted' }, sec.desc),
          h('div', { className: 'jw3-muted', style: { marginTop: '3px' } }, '技能点：' + S.skillPoints + '（游历 / 比武掉落，精英更高）')
        ));
        nodes.push(h('div', { key: 'titles', className: 'jw3-ladder' },
          sec.titles.map(function (t) {
            const reached = S.level >= t.lv;
            const cur = sectTitleOf(S) === t.name;
            return h('div', {
              key: t.lv,
              className: 'jw3-rung' + (reached ? ' gold' : '') + (cur ? ' cur' : ''),
            },
              h('em', null, t.lv + ' 级'),
              h('span', null, t.name)
            );
          })
        ));
        tree.base.forEach(function (sk) {
          const learned = !!S.skills[sk.id];
          let label = '修习';
          let can = true;
          if (learned) { label = '已习得'; can = false; }
          else if (S.level < sk.lv) { label = '需 ' + sk.lv + ' 级'; can = false; }
          else if (sk.lv <= 25) { label = '升级自得'; can = false; }
          else if (S.skillPoints < sk.sp) { label = '技能点 ' + sk.sp; can = false; }
          else { label = '修习 · ' + sk.sp + '点'; }
          nodes.push(h('div', { key: sk.id, className: 'jw3-skill' + (learned ? ' learned' : '') },
            h('div', { className: 'jw3-skill-head' },
              h('b', null, sk.name),
              h('span', { className: 'jw3-chip' + (learned ? ' gold' : '') }, sk.lv + ' 级')
            ),
            h('div', { className: 'jw3-muted' }, sk.desc),
            h('div', { className: 'jw3-row' },
              h('span', { className: 'jw3-muted' }, learned ? '已习得' : '消耗 ' + sk.sp + ' 技能点'),
              h('button', { className: 'jw3-btn', disabled: !can || learned, onClick: function () { doLearn(sk.id); } }, label)
            )
          ));
        });
        const ending = v3EndingOf(S);
        const finalSkill = ending && ending.skill ? SKILL_TREE[S.sect].finals.filter(function (f) { return f.id === ending.skill; })[0] : null;
        nodes.push(h('div', { key: 'final', className: 'jw3-skill' + (finalSkill && S.skills[finalSkill.id] ? ' learned' : '') },
          h('div', { className: 'jw3-skill-head' },
            h('b', null, finalSkill ? finalSkill.name : '终式 · 未定'),
            h('span', { className: 'jw3-chip' }, '100 级')
          ),
          h('div', { className: 'jw3-muted' }, finalSkill ? finalSkill.desc : '80 级（丐帮 99 级）抉择后，100 级方可大成')
        ));
        return nodes;
      }

      /* ---- equip ---- */
      function renderEquip() {
        const nodes = [];
        ['weapon', 'armor'].forEach(function (slot) {
          const it = S.equip[slot];
          nodes.push(h('div', { key: 'slot' + slot, className: 'jw3-cell' },
            h('b', null, (slot === 'weapon' ? '兵器' : '衣甲') + ' · ' + (it ? it.name : '未装备')),
            it ? h('div', { className: 'jw3-muted' },
              '等级 ' + (it.lv || it.tier * 5) + ' · ' + (slot === 'weapon'
                ? '伤害 +' + it.atk + (it.spd ? ' · 身法 +' + it.spd : '')
                : '防御 +' + it.def + ' · 气血 +' + it.hp)
            ) : h('div', { className: 'jw3-muted' }, '空'),
            it ? h('button', { className: 'jw3-btn ghost', onClick: function () { doUnequip(slot); } }, '卸下') : null
          ));
        });
        if (!S.sect) {
          nodes.push(h('div', { key: 'noSect', className: 'jw3-empty' }, '拜师后才能在商铺购得本门专属兵器衣甲。'));
        } else {
          const tier = v3EquipTier(S);
          const shop = v3ShopEnsure(S, Date.now());
          const remain = Math.ceil(v3ShopRemain(S, Date.now()) / 1000);
          const mm = Math.floor(remain / 60);
          const ss = remain % 60;
          nodes.push(h('div', { key: 'shopHead', className: 'jw3-row' },
            h('span', { className: 'jw3-sec' }, '商铺 · ' + (tier * 5) + ' 级档'),
            h('span', { className: 'jw3-timer' }, '刷新 ' + mm + ':' + (ss < 10 ? '0' + ss : ss))
          ));
          nodes.push(h('div', { key: 'shopNote', className: 'jw3-timer' },
            '每 5 分钟刷新一次，按当前等级随机上架，品质随机。'));
          ['weapon', 'armor'].forEach(function (kind) {
            const it = shop && shop.items ? shop.items[kind] : null;
            if (!it) {
              nodes.push(h('div', { key: 'buy' + kind, className: 'jw3-cell' },
                h('b', null, (kind === 'weapon' ? '兵器' : '衣甲') + ' · 已售罄'),
                h('div', { className: 'jw3-muted' }, '等下一轮刷新。')
              ));
              return;
            }
            const price = it.price || v3EquipPrice(it);
            nodes.push(h('div', { key: 'buy' + kind, className: 'jw3-cell' },
              h('div', { className: 'jw3-row' },
                h('b', null, it.name),
                h('span', { className: 'jw3-price' }, price + ' 两')
              ),
              h('div', { className: 'jw3-muted' },
                kind === 'weapon'
                  ? '伤害 +' + it.atk + (it.spd ? ' · 身法 +' + it.spd : '')
                  : '防御 +' + it.def + ' · 气血 +' + it.hp
              ),
              h('button', {
                className: 'jw3-btn' + (S.silver >= price ? '' : ' ghost'),
                disabled: S.silver < price,
                onClick: function () { doBuyShop(kind); },
              }, S.silver >= price ? '购买' : '银两不足')
            ));
          });
          const pill = shop && shop.items ? shop.items.pill : null;
          const bolus = shop && shop.items ? shop.items.bolus : null;
          if (pill) {
            nodes.push(h('div', { key: 'buypill', className: 'jw3-cell' },
              h('div', { className: 'jw3-row' },
                h('b', null, '忘忧丹'),
                h('span', { className: 'jw3-price' }, pill.price + ' 两')
              ),
              h('div', { className: 'jw3-muted' }, pill.desc || '洗髓伐骨 · 重置五维返还潜能'),
              h('button', {
                className: 'jw3-btn' + (S.silver >= pill.price ? '' : ' ghost'),
                disabled: S.silver < pill.price,
                onClick: function () { doBuyShop('pill'); },
              }, S.silver >= pill.price ? '购买' : '银两不足')
            ));
          }
          if (bolus) {
            nodes.push(h('div', { key: 'buybolus', className: 'jw3-cell' },
              h('div', { className: 'jw3-row' },
                h('b', null, '大力丸'),
                h('span', { className: 'jw3-price' }, bolus.price + ' 两')
              ),
              h('div', { className: 'jw3-muted' }, bolus.desc || '壮气提神 · 恢复 50 点体力'),
              h('button', {
                className: 'jw3-btn' + (S.silver >= bolus.price ? '' : ' ghost'),
                disabled: S.silver < bolus.price,
                onClick: function () { doBuyShop('bolus'); },
              }, S.silver >= bolus.price ? '购买' : '银两不足')
            ));
          }
          const ending = v3EndingOf(S);
          if (ending) {
            const j = JUE_WORLD[ending.weapon];
            const owned = (S.equip.weapon && S.equip.weapon.uid === ending.weapon)
              || S.bag.some(function (b) { return b.uid === ending.weapon; });
            nodes.push(h('div', { key: 'jue', className: 'jw3-cell' },
              h('b', null, '绝世 · ' + (j ? j.name : '')),
              h('div', { className: 'jw3-muted' }, '100 级终局武器' + (owned ? ' · 已入囊中' : ' · 100 级时获得')),
              j ? h('div', { className: 'jw3-muted' }, '伤害 +' + j.atk + ' · 气血 +' + (j.hp || 0) + (j.spd ? ' · 身法 +' + j.spd : '')) : null
            ));
          }
        }
        nodes.push(h('div', { key: 'bagHead', className: 'jw3-sec' }, '行囊（' + S.bag.length + '）'));
        if (!S.bag.length) {
          nodes.push(h('div', { key: 'bagEmpty', className: 'jw3-empty' }, '空空如也。比武、游历或商铺可得装备。'));
        } else {
          nodes.push(h('div', { key: 'bag', className: 'jw3-line' }, S.bag.slice().reverse().map(function (it, i) {
            const sp = v3SellPrice(it);
            return h('div', { key: 'b' + i, className: 'jw3-bag-item' },
              h('span', { className: 'jw3-chip' + (it.jue ? ' gold' : '') }, it.jue ? '绝世' : (it.kind === 'weapon' ? '兵' : '甲') + ' ' + (it.lv || it.tier * 5) + '级'),
              h('span', { style: { flex: 1, textAlign: 'left' } }, it.name),
              it.jue ? null : h('button', {
                className: 'jw3-btn ghost', style: { padding: '2px 6px', fontSize: '10.5px' },
                onClick: function () { doSell(it.uid); },
              }, '售 ' + sp + ' 两'),
              h('button', { className: 'jw3-btn ghost', onClick: function () { doEquip(it.uid); } }, '装备')
            );
          })));
        }
        return nodes;
      }

      /* ---- growth ---- */
      function renderGrowth() {
        const nodes = [];
        nodes.push(h('div', { key: 'h', className: 'jw3-sec' }, '江湖成就'));
        nodes.push(h('div', { key: 'ch', className: 'jw3-grid2' }, ACHIEVEMENTS.map(function (a) {
          const got = !!S.ach[a.id];
          return h('div', { key: a.id, className: 'jw3-cell', style: { opacity: got ? 1 : 0.55 } },
            h('b', null, a.title + (got ? ' ✓' : '')),
            h('div', { className: 'jw3-muted' }, a.desc)
          );
        })));
        nodes.push(h('div', { key: 'gh', className: 'jw3-sec' }, '江湖纪事'));
        if (!S.growth.length) {
          nodes.push(h('div', { key: 'ge', className: 'jw3-empty' }, '尚无纪事。'));
        } else {
          nodes.push(h('div', { key: 'g', className: 'jw3-line', style: { maxHeight: '160px' } },
            S.growth.slice(-20).reverse().map(function (g, i) {
              return h('div', { key: i }, '· ' + g.title + (g.text ? '：' + g.text : ''));
            })
          ));
        }
        return nodes;
      }

      /* ---- settings ---- */
      function renderSettings() {
        const nodes = [];
        nodes.push(h('div', { key: 'h', className: 'jw3-sec' }, '角色'));
        nodes.push(h('div', { key: 'name', className: 'jw3-row' },
          h('span', { className: 'jw3-muted' }, '名号'),
          h('span', { className: 'jw3-readonly' }, S.name || '少侠')
        ));
        nodes.push(h('div', { key: 'gender', className: 'jw3-row' },
          h('span', { className: 'jw3-muted' }, '性别'),
          h('span', { className: 'jw3-readonly' }, v3GenderText(S))
        ));
        nodes.push(h('div', { key: 'fixed', className: 'jw3-timer' },
          '名号与性别在初入江湖时定下，途中不可更改（葵花宝典除外）。'));
        nodes.push(h('div', { key: 'sectRow', className: 'jw3-row' },
          h('span', { className: 'jw3-muted' }, '门派'),
          h('button', { className: 'jw3-btn', onClick: function () { openTab('sect'); } }, S.sect ? SECTS[S.sect].name + ' · 前往' : '尚未拜师 · 前往')
        ));
        nodes.push(h('div', { key: 'sizeH', className: 'jw3-sec' }, '界面'));
        [['snap', '贴边吸附'], ['autoHide', '折叠时淡出'], ['autosave', '自动保存']].forEach(function (p) {
          nodes.push(h('div', { key: p[0], className: 'jw3-row' },
            h('span', { className: 'jw3-muted' }, p[1]),
            h('div', { className: 'jw3-btn-row' },
              h('button', {
                className: 'jw3-btn' + (S.settings[p[0]] ? ' gold' : ''),
                onClick: function () { S.settings[p[0]] = !S.settings[p[0]]; save(); refresh(); },
              }, S.settings[p[0]] ? '开' : '关')
            )
          ));
        });
        nodes.push(h('div', { key: 'saveH', className: 'jw3-sec' }, '存档'));
        nodes.push(h('div', { key: 'save', className: 'jw3-btn-row' },
          h('button', {
            className: 'jw3-btn', onClick: function () {
              try {
                const data = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
                if (navigator.clipboard) navigator.clipboard.writeText(data);
                v3Toast('存档已复制到剪贴板');
              } catch (err) { v3Toast('导出失败'); }
            },
          }, '导出存档'),
          h('button', {
            className: 'jw3-btn', onClick: function () {
              try {
                const text = window.prompt('粘贴存档字符串：');
                if (!text) return;
                const obj = JSON.parse(decodeURIComponent(escape(atob(text.trim()))));
                if (!obj) return;
                S = v3Normalize(obj);
                v3PlaceCard(S, v3CardWidth(S.settings), 400);
                v3Toast('存档已导入');
                save(); refresh();
              } catch (err) { v3Toast('存档无效'); }
            },
          }, '导入存档')
        ));
        nodes.push(h('div', { key: 'pos', className: 'jw3-row' },
          h('span', { className: 'jw3-muted' }, '位置'),
          h('button', { className: 'jw3-btn', onClick: resetPos }, '回到默认角落')
        ));
        nodes.push(h('button', {
          key: 'reset', className: 'jw3-btn', style: { color: '#e08c7c' },
          onClick: function () {
            if (!window.confirm('确定重置整个江湖？存档将清空。')) return;
            try { window.localStorage.removeItem(SAVE_KEY); } catch (err) { /* noop */ }
            S = newStateV3();
            S.setup = false;
            UI3.onboardName = '';
            v3Toast('江湖已重置');
            refresh();
          },
        }, '重置整个江湖'));
        nodes.push(h('div', { key: 'note', className: 'jw3-muted' },
          '存档保存在浏览器（key: desktop-jianghu.save.v1），每 5 秒自动保存。提示：网页插件无法绘制到 DSH 窗口之外，贴边吸附作用于窗口四边。'));
        return nodes;
      }

      function bodyNodes() {
        if (UI3.view === 'battle' && UI3.tab === 'home') return renderBattle();
        if (UI3.view === 'travel' && UI3.tab === 'home') return renderTravel();
        if (UI3.tab === 'quest') return renderQuest();
        if (UI3.tab === 'sect') return renderSect();
        if (UI3.tab === 'equip') return renderEquip();
        if (UI3.tab === 'growth') return renderGrowth();
        if (UI3.tab === 'settings') return renderSettings();
        return renderHome();
      }

      const tabDefs = [
        ['home', '首页'], ['quest', '任务'], ['sect', '门派'],
        ['equip', '装备'], ['growth', '成长'], ['settings', '设置'],
      ];

      const card = h('div', {
        key: 'card', ref: cardRef,
        className: 'jw3-card jw3-compact' + (S.dock ? ' jw3-dock-' + S.dock : ''),
        style: {
          position: 'fixed',
          left: pos.x + 'px', top: pos.y + 'px',
          width: v3CardWidth(S.settings) + 'px',
          zIndex: 60, pointerEvents: 'auto', userSelect: 'none',
        },
      },
        h('div', {
          key: 'head', className: 'jw3-head',
          onPointerDown: startDrag,
          onDoubleClick: resetPos,
        },
          h('div', null,
            h('div', { className: 'jw3-title' }, '桌面江湖',
              S.level >= 100 ? h('span', { key: 'max', className: 'jw3-max' }, '满级') : null),
            h('div', { className: 'jw3-sub' },
              (S.name || '少侠') + ' · ' + v3GenderText(S) + ' · '
              + (S.sect ? SECTS[S.sect].name + ' · ' + sectTitleOf(S) : '白身') + ' · ' + S.level + ' 级')
          ),
          h('button', {
            className: 'jw3-icon-btn', title: '收起',
            onClick: toggleCollapse,
          }, '—')
        ),
        h('div', { key: 'tabs', className: 'jw3-tabs' },
          tabDefs.map(function (t) { return tabDef(t[0], t[1]); })
        ),
        h('div', { key: 'body', className: 'jw3-body' }, bodyNodes())
      );

      if (S.collapsed) {
        return h(React.Fragment, null,
          h('style', { key: 'css' }, V3_CSS),
          h('button', {
            key: 'pill',
            ref: pillRef,
            className: 'jw3-pill' + (S.settings.autoHide ? ' jw3-pill-hide' : ''),
            style: {
              left: pos.x + 'px', top: pos.y + 'px',
            },
            onPointerDown: startDrag,
            onClick: function () {
              if (suppressClick.current) { suppressClick.current = false; return; }
              toggleCollapse();
            },
            title: '展开桌面江湖',
          },
            h('span', { key: 'dot', style: { width: '7px', height: '7px', borderRadius: '50%', background: '#c8a45d' } }),
            h('span', { key: 'n' }, S.name || '桌面江湖'),
            h('span', { key: 'lv', className: 'jw3-muted' }, S.level >= 100 ? '满级' : S.level + ' 级'),
            S.potential > 0 ? h('span', { key: 'b', className: 'badge' }, String(S.potential)) : null
          )
        );
      }

      return h(React.Fragment, null,
        h('style', { key: 'css' }, V3_CSS),
        card,
        UI3.toast ? h('div', { key: 'toast', className: 'jw3-toast' }, UI3.toast) : null
      );
    }
