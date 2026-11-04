window.__ModuleLoader__.load({
  id: 'dsh-desktop-jianghu',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const useState = React.useState;
    const useEffect = React.useEffect;
    const useRef = React.useRef;
    const useCallback = React.useCallback;

    const SAVE_KEY = 'desktop-jianghu.save.v1';
    const OFFLINE_CAP = 8 * 3600;
    const VERSION = 2;

    /* ------------------------------------------------------------------ */
    /* Static data                                                         */
    /* ------------------------------------------------------------------ */

    const TITLES = [
      { lv: 2, name: '无名小卒' },
      { lv: 10, name: '武林新丁' },
      { lv: 20, name: '江湖小虾' },
      { lv: 30, name: '后起之秀' },
      { lv: 40, name: '武林高手' },
      { lv: 50, name: '风尘奇侠' },
      { lv: 60, name: '无双隐士' },
      { lv: 70, name: '世外高人' },
      { lv: 80, name: '江湖侠隐' },
      { lv: 90, name: '无敌圣者' },
    ];

    const ENEMY_NAMES = [
      '山野樵夫', '镖局趟子手', '游方剑客', '黑衣刀客', '江南剑侠', '塞北刀客',
      '落霞庄庄客', '青竹帮众', '恶虎寨喽啰', '独行盗', '铁掌帮徒', '落魄书生',
      '无名老卒', '赤发鬼', '黄河艄公', '快刀手',
    ];

    const ELITE_SUFFIX = ['·首领', '·教头', '·恶煞', '·执事'];

    const SECTS = {
      shaolin: {
        id: 'shaolin',
        name: '少林寺',
        icon: '卍',
        gender: 'male',
        color: '#c8a45d',
        desc: '天下武学正宗。外练筋骨皮，内修禅心，只收男弟子。',
        titles: [
          { lv: 10, name: '少林武僧' },
          { lv: 30, name: '罗汉堂弟子' },
          { lv: 50, name: '达摩院武僧' },
          { lv: 70, name: '般若堂首座' },
          { lv: 90, name: '少林长老' },
          { lv: 100, name: '少林方丈' },
        ],
        skills: [
          { id: 'sl_jinzhong', name: '金钟罩', lv: 5, sp: 2, desc: '被动 · 防御 +18%', pass: { defPct: 0.18 } },
          { id: 'sl_fumo', name: '伏魔棍法', lv: 15, sp: 3, desc: '战斗 · 伤害 +10%', pass: { dmgPct: 0.10 } },
          { id: 'sl_yijin', name: '易筋经', lv: 30, sp: 4, desc: '被动 · 修炼 +25%，气血 +12%', pass: { trainPct: 0.25, hpPct: 0.12 } },
          { id: 'sl_wuxiang', name: '无相劫指', lv: 50, sp: 5, desc: '战斗 · 15% 概率破防，暴击伤害 +20%', pass: { armorPenChance: 0.15, critDmg: 0.2 } },
        ],
      },
      emei: {
        id: 'emei',
        name: '峨嵋派',
        icon: '❀',
        gender: 'female',
        color: '#d8a0b0',
        desc: '峨嵋金顶，剑法清灵，兼修心法疗伤，只收女弟子。',
        titles: [
          { lv: 10, name: '峨嵋弟子' },
          { lv: 30, name: '金顶弟子' },
          { lv: 50, name: '峨嵋剑侠' },
          { lv: 70, name: '峨嵋长老' },
          { lv: 90, name: '峨嵋掌门' },
          { lv: 100, name: '金顶真人' },
        ],
        skills: [
          { id: 'em_qingxin', name: '清心诀', lv: 5, sp: 2, desc: '战斗 · 每 3 回合回复 4% 气血', pass: { regenPct: 0.04 } },
          { id: 'em_feixu', name: '飞絮剑法', lv: 15, sp: 3, desc: '战斗 · 伤害 +8%，身法 +6%', pass: { dmgPct: 0.08, spdPct: 0.06 } },
          { id: 'em_miejue', name: '灭绝剑意', lv: 30, sp: 4, desc: '战斗 · 暴击 +8%', pass: { critAdd: 0.08 } },
          { id: 'em_foguang', name: '佛光普照', lv: 50, sp: 5, desc: '战斗 · 气血低于 40% 时回复 12%（每场一次）', pass: { emergencyHeal: 0.12 } },
        ],
      },
      gaibang: {
        id: 'gaibang',
        name: '丐帮',
        icon: '☯',
        gender: 'any',
        color: '#9fc0a0',
        desc: '天下第一大帮。弟子遍布市井，棒法刚猛，消息灵通，男女皆收。',
        titles: [
          { lv: 10, name: '一袋弟子' },
          { lv: 30, name: '三袋弟子' },
          { lv: 50, name: '五袋弟子' },
          { lv: 70, name: '八袋长老' },
          { lv: 90, name: '传功长老' },
          { lv: 100, name: '北丐' },
        ],
        skills: [
          { id: 'gb_dagou', name: '打狗棒法', lv: 5, sp: 2, desc: '战斗 · 暴击 +6%', pass: { critAdd: 0.06 } },
          { id: 'gb_xianglong', name: '降龙十八掌', lv: 15, sp: 3, desc: '战斗 · 伤害 +12%', pass: { dmgPct: 0.12 } },
          { id: 'gb_qigai', name: '乞丐功', lv: 30, sp: 4, desc: '被动 · 体力恢复 +40%，银两 +20%', pass: { staPct: 0.4, silverPct: 0.2 } },
          { id: 'gb_xiaoyao', name: '逍遥游', lv: 50, sp: 5, desc: '战斗 · 闪避 +8%', pass: { dodgeAdd: 0.08 } },
        ],
      },
    };

    /* Travel destinations. Every option resolves through resolveTravelOption();
       `fx` entries are scaled rewards, `battle` spawns a quick fight,
       `chain` fires a second-choice event with the given probability. */

    const DESTINATIONS = {
      shenshan: {
        id: 'shenshan',
        name: '深山',
        icon: '⛰',
        desc: '云深林密，多有隐世高人与无主药圃。',
        events: [
          {
            id: 'hermit',
            title: '林中遇隐士',
            text: '一位白发老者盘坐青石，见你根骨不俗，抬手示意你近前。',
            options: [
              {
                label: '虚心请教', fx: { exp: 0.25 }, flavor: '老者点拨数句，许多关窍豁然贯通',
                chain: {
                  chance: 0.3,
                  event: {
                    id: 'cliff', title: '石壁留影',
                    text: '请教完，老者随手一指，云雾散开处露出半面石壁，壁上剑痕纵横。',
                    options: [
                      { label: '凝神参悟', fx: { exp: 0.4 }, flavor: '你对着剑痕枯坐半日，修为大涨' },
                      { label: '拓印带走', fx: { silver: [25, 6] }, flavor: '你把剑痕拓下，进城卖给了武馆' },
                    ],
                  },
                },
              },
              {
                label: '献上薄礼（银两 -20）', can: function (s) { return s.silver >= 20; },
                loseSilver: 20, fx: { potential: 1 }, flavor: '老者收下薄礼，赠你一丝感悟',
              },
            ],
          },
          {
            id: 'herb',
            title: '荒废药圃',
            text: '半山腰有片荒废药圃，几株老参在乱草间探出头来。',
            options: [
              { label: '挖药换钱', fx: { silver: [30, 7] }, flavor: '你小心起出药材，背到山下换了银钱' },
              {
                label: '守圃老农', fx: { exp: 0.15 }, flavor: '老农与你聊起山中旧事，你听得入神',
                chain: {
                  chance: 0.35,
                  event: {
                    id: 'recipe', title: '传方',
                    text: '老农见你实诚，从怀里摸出一张泛黄药方，说兴许对练武之人有用。',
                    options: [
                      { label: '收下研究', fx: { potential: 2 }, flavor: '你照着药方调理几日，气血充盈' },
                      { label: '婉言谢绝', fx: { exp: 0.3 }, flavor: '老农不再多言，只指点你一句吐纳口诀' },
                    ],
                  },
                },
              },
            ],
          },
          {
            id: 'canyon',
            title: '云雾深谷',
            text: '林尽处是一道深谷，云气翻涌，隐约传来兽吼。',
            options: [
              {
                label: '攀藤而下', flavorWin: '你循声而去，一剑逼退守谷的山魈', flavorLose: '山魈凶悍，你且战且退，受了些皮外伤',
                battle: function (s) { return makeEnemy(Math.max(1, s.level - 1), false, '守谷山魈'); },
              },
              { label: '原路返回', fx: { stamina: 12 }, flavor: '你绕开深谷，寻了处向阳坡歇脚' },
            ],
          },
        ],
      },
      hupo: {
        id: 'hupo',
        name: '湖泊',
        icon: '🌊',
        desc: '烟波浩渺，渡口渔家，湖心偶有旧时遗物。',
        events: [
          {
            id: 'ferryman',
            title: '渡口老翁',
            text: '渡口老翁撑着乌篷船，见你风尘仆仆，招呼你上船。',
            options: [
              { label: '帮忙撑船', fx: { silver: [15, 5], exp: 0.1 }, flavor: '一趟下来，老翁塞给你几枚铜钱' },
              { label: '讨教水性', fx: { potential: 1 }, flavor: '老翁说了些借力卸力的道理，你记在心里' },
            ],
          },
          {
            id: 'island',
            title: '湖心小岛',
            text: '湖心孤岛上有断壁残垣，像是旧时水寨。',
            options: [
              {
                label: '上岛探查', fx: { exp: 0.2 }, flavor: '你在断壁间翻检半晌，找到些前人留下的练功心得',
                chain: {
                  chance: 0.3,
                  event: {
                    id: 'waterbandit', title: '水匪',
                    text: '正要离岛，芦苇荡里划出两条快船，几个水匪围了上来。',
                    options: [
                      {
                        label: '拔剑迎战', flavorWin: '你剑光如练，杀退水匪，夺了他们的船资',
                        flavorLose: '水匪人多，你夺路而走，只保住了性命',
                        battle: function (s) { return makeEnemy(Math.max(1, s.level), false, '水匪头目'); },
                      },
                      { label: '弃船而走（体力 -10）', fx: { stamina: -10 }, flavor: '你钻进芦苇荡，绕了半日才脱身' },
                    ],
                  },
                },
              },
              { label: '绕岛而行', fx: { stamina: 10 }, flavor: '你沿着湖岸慢慢走，吹了半日湖风' },
            ],
          },
          {
            id: 'fisher',
            title: '渔家夜话',
            text: '夜宿渔家，老渔夫温了酒，说起湖底的旧闻。',
            options: [
              { label: '借宿一晚', fx: { stamina: 25 }, flavor: '一夜好眠，晨起精神抖擞' },
              {
                label: '听渔歌', fx: { exp: 0.2 }, flavor: '你听出渔歌里藏着调息的法门',
                chain: {
                  chance: 0.25,
                  event: {
                    id: 'sunken', title: '湖底沉箱',
                    text: '老渔夫说，去年打渔时网到过一只锁着的旧木箱。',
                    options: [
                      { label: '下水寻箱', fx: { silver: [60, 12] }, flavor: '你潜到湖底，果然摸到那只木箱，箱子早烂了，里面的银锭还在' },
                      { label: '只作听者', fx: { exp: 0.25 }, flavor: '你听他说到天明，江湖掌故又多了几分' },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
      shanzhai: {
        id: 'shanzhai',
        name: '山寨',
        icon: '🏯',
        desc: '狼烟山寨，刀口舔血，也藏着快意恩仇。',
        events: [
          {
            id: 'bandit',
            title: '山道遇匪',
            text: '山道转处，几名剪径毛贼拦住去路，为首者横刀喝问买路钱。',
            options: [
              {
                label: '拔刀迎战', flavorWin: '你刀势沉稳，几招便把毛贼头子拍翻在地', flavorLose: '毛贼一拥而上，你且战且退',
                battle: function (s) { return makeEnemy(Math.max(1, s.level - 1), false, '剪径毛贼'); },
              },
              {
                label: '留下买路钱（银两 -20）', can: function (s) { return s.silver >= 20; },
                loseSilver: 20, flavor: '好汉不吃眼前亏，你丢下些碎银过去了',
              },
            ],
          },
          {
            id: 'arena',
            title: '寨门赌斗',
            text: '寨门口设着擂台，几个汉子正围着下注，赢家可得寨主赏钱。',
            options: [
              {
                label: '下场比试', flavorWin: '你连胜三场，寨主大笑，赏了你一袋银子', flavorLose: '第三场遇上寨中好手，你败下阵来',
                battle: function (s) { return makeEnemy(Math.max(1, s.level + 1), true, '寨中好手'); },
              },
              { label: '押注旁观', fx: { exp: 0.15 }, flavor: '你看这些江湖打法，揣摩出几分门道' },
            ],
          },
          {
            id: 'blackshop',
            title: '黑店',
            text: '荒岭上唯一一间客栈亮着灯，店里伙计笑得过分殷勤。',
            options: [
              {
                label: '掀桌质问', flavorWin: '你先发制人，掌柜与伙计原形毕露，被你打服', flavorLose: '黑店人马齐上，你冲出店门才脱身',
                battle: function (s) { return makeEnemy(Math.max(1, s.level + 1), false, '黑店掌柜'); },
              },
              { label: '忍下不提', fx: { stamina: -10 }, flavor: '你和衣而卧，一夜没敢合眼，天不亮就走' },
            ],
          },
        ],
      },
      gudao: {
        id: 'gudao',
        name: '古道',
        icon: '🛤',
        desc: '商旅古道，镖队与破庙，走江湖的老路。',
        events: [
          {
            id: 'escort',
            title: '镖队同行',
            text: '一支镖队正在路边打尖，总镖头见你身手利落，问你愿不愿搭伙走一程。',
            options: [
              {
                label: '护送一程', flavorWin: '果然有劫匪来犯，你与镖队合力杀退，总镖头重谢', flavorLose: '劫匪凶悍，镖队折了货物，你帮着断后',
                battle: function (s) { return makeEnemy(Math.max(1, s.level), false, '劫镖盗匪'); },
              },
              { label: '结伴同行', fx: { exp: 0.18, silver: [10, 3] }, flavor: '一路听镖师讲江湖规矩，你受益不少' },
            ],
          },
          {
            id: 'ruin',
            title: '荒野破庙',
            text: '古道旁一座破庙，佛龛蒙尘，梁上却有新扫过的痕迹。',
            options: [
              { label: '佛前静坐', fx: { exp: 0.3 }, flavor: '你对着残佛静坐半日，心如止水' },
              {
                label: '梁上留字', fx: { exp: 0.1 }, flavor: '梁上刻着一行小字，像是前人留的暗号',
                chain: {
                  chance: 0.3,
                  event: {
                    id: 'hidden', title: '藏银',
                    text: '你顺着暗号所指，在佛像底座摸到一块松动的砖。',
                    options: [
                      { label: '撬开砖头', fx: { silver: [45, 10] }, flavor: '砖下是个油布包，里面是几锭旧银' },
                      { label: '原样放回', fx: { potential: 1 }, flavor: '你敬了炷香，悄然退出破庙' },
                    ],
                  },
                },
              },
            ],
          },
          {
            id: 'oldtree',
            title: '老树系马',
            text: '古道边一棵老槐树上拴着匹瘦马，鞍辔俱全，却不见主人。',
            options: [
              { label: '树下歇脚', fx: { stamina: 20 }, flavor: '你靠着老树打了个盹，醒来精神好了许多' },
              { label: '等马主人', fx: { exp: 0.15 }, flavor: '半日后来了个赶车的老人，与你聊了一路江湖' },
            ],
          },
        ],
      },
      shijing: {
        id: 'shijing',
        name: '市井',
        icon: '🏮',
        desc: '三教九流，消息与银钱都在市井里流动。',
        events: [
          {
            id: 'tavern',
            title: '酒肆听风',
            text: '镇口酒肆人声鼎沸，几个江湖客正在争论最近哪位高手剑法更高。',
            options: [
              { label: '凑近细听', fx: { exp: 0.2 }, flavor: '你听出门道，对剑理又多了几分理解' },
              {
                label: '请客喝酒（银两 -15）', can: function (s) { return s.silver >= 15; },
                loseSilver: 15, fx: { potential: 1 }, flavor: '酒酣耳热，一位老江湖拍肩指点你几句',
              },
            ],
          },
          {
            id: 'market',
            title: '集市奇货',
            text: '集市角落，一个游方郎中支着摊子，摊上摆着几瓶颜色古怪的丹药。',
            options: [
              {
                label: '买一枚丹药（银两 -30）', can: function (s) { return s.silver >= 30; },
                loseSilver: 30, fx: { potential: 1 }, flavor: '丹药入腹，一股暖流游走四肢',
              },
              {
                label: '摆摊卖艺（体力 -10）', can: function (s) { return s.stamina >= 10; },
                fx: { stamina: -10, silver: [20, 6] }, flavor: '一趟拳脚引来满堂喝彩',
              },
            ],
          },
          {
            id: 'street',
            title: '街头卖艺',
            text: '街口有泼皮占了场子收保护钱，围观的百姓敢怒不敢言。',
            options: [
              {
                label: '下场理论', flavorWin: '你三两下把泼皮头子摔出圈外，围观百姓齐声叫好', flavorLose: '泼皮一拥而上，你只好且战且退',
                battle: function (s) { return makeEnemy(Math.max(1, s.level - 1), false, '街头泼皮'); },
              },
              { label: '扔下几文', fx: { silver: [-5, 0], exp: 0.1 }, flavor: '你留下几文钱，转身走了' },
            ],
          },
        ],
      },
      zhulin: {
        id: 'zhulin',
        name: '竹林',
        icon: '🎋',
        desc: '竹涛如海，清幽处常有琴声与棋局。',
        events: [
          {
            id: 'cabin',
            title: '竹林木屋',
            text: '竹林深处有间无主木屋，屋中落满竹叶，唯有一方石桌干净如新。',
            options: [
              { label: '借宿一晚', fx: { stamina: 30 }, flavor: '一夜听竹而眠，醒来神清气爽' },
              {
                label: '临桌打谱', fx: { exp: 0.25 }, flavor: '你对着空桌推演招式，颇有心得',
                chain: {
                  chance: 0.3,
                  event: {
                    id: 'chess', title: '棋局',
                    text: '石桌底下压着一副残局，黑白子竟是用磁石做的。',
                    options: [
                      { label: '解局', fx: { potential: 2 }, flavor: '你苦思一夜，解到妙处时只觉心神一畅' },
                      { label: '摆回原样', fx: { exp: 0.25 }, flavor: '你不愿扰了前人雅兴，把棋子一一摆回' },
                    ],
                  },
                },
              },
            ],
          },
          {
            id: 'sword',
            title: '竹涛听剑',
            text: '风过竹林，万竿齐响，如万剑交鸣。',
            options: [
              { label: '随风演武', fx: { exp: 0.3 }, flavor: '你顺着竹涛的节奏出剑，剑意越发圆融' },
              { label: '静听风声', fx: { potential: 1 }, flavor: '你听出风里藏着起承转合，心中一动' },
            ],
          },
          {
            id: 'zither',
            title: '林中琴声',
            text: '竹林深处传来琴声，清越处忽又转急，像是有人以琴演武。',
            options: [
              {
                label: '循声而去', fx: { exp: 0.2 }, flavor: '你循声穿过竹林，见一位白衣人正在抚琴',
                chain: {
                  chance: 0.3,
                  event: {
                    id: 'enlighten', title: '琴中剑意',
                    text: '一曲终了，白衣人抬眼看你，说你身上有股未磨开的剑意。',
                    options: [
                      { label: '请教剑理', fx: { potential: 2 }, flavor: '白衣人只说了三句话，你却觉得胜过苦练三月' },
                      { label: '拱手告辞', fx: { exp: 0.35 }, flavor: '你退出竹林，耳边仍是那曲子的余韵' },
                    ],
                  },
                },
              },
              { label: '驻足聆听', fx: { exp: 0.25 }, flavor: '一曲听罢，你只觉心神澄澈' },
            ],
          },
        ],
      },
    };

    const DEST_ORDER = ['shenshan', 'hupo', 'shanzhai', 'gudao', 'shijing', 'zhulin'];

    const ACHIEVEMENTS = [
      { id: 'first_win', title: '初战告捷', desc: '赢下第一场比武' },
      { id: 'win_10', title: '小有名气', desc: '累计胜利 10 场' },
      { id: 'win_50', title: '威震一方', desc: '累计胜利 50 场' },
      { id: 'win_100', title: '名动江湖', desc: '累计胜利 100 场' },
      { id: 'streak_5', title: '连战连捷', desc: '取得 5 连胜' },
      { id: 'streak_10', title: '势如破竹', desc: '取得 10 连胜' },
      { id: 'travel_10', title: '初涉江湖', desc: '游历 10 次' },
      { id: 'travel_50', title: '行遍四方', desc: '游历 50 次' },
      { id: 'travel_100', title: '踏遍青山', desc: '游历 100 次' },
      { id: 'learn_first', title: '初窥门径', desc: '习得第一门门派武学' },
      { id: 'learn_all', title: '一脉相承', desc: '学全本门武学' },
      { id: 'sect_master', title: '登堂入室', desc: '门派称谓达到最高一阶' },
    ];

    /* ------------------------------------------------------------------ */
    /* Helpers                                                             */
    /* ------------------------------------------------------------------ */

    function rndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function chance(p) {
      return Math.random() < p;
    }

    function pick(arr) {
      return arr[rndInt(0, arr.length - 1)];
    }

    function fmt(n) {
      return Math.floor(n);
    }

    /* ------------------------------------------------------------------ */
    /* Game core                                                           */
    /* ------------------------------------------------------------------ */

    function expNeed(level) {
      if (level <= 1) return 20;
      if (level === 2) return 60;
      if (level === 3) return 120;
      return Math.round(22 * Math.pow(level, 2.2) + 60 * Math.pow(level, 1.3));
    }

    function trainRate(level) {
      return Math.round(120 + 60 * level + 12 * Math.pow(level, 1.8));
    }

    function maxStamina(level) {
      return 100 + level * 2;
    }

    function titleOf(level) {
      let name = '白身';
      for (let i = 0; i < TITLES.length; i += 1) {
        if (level >= TITLES[i].lv) name = TITLES[i].name;
      }
      return name;
    }

    function sectOf(s) {
      return s.sect ? SECTS[s.sect] : null;
    }

    function sectTitleOf(s) {
      const sec = sectOf(s);
      if (!sec) return '无门无派';
      let name = sec.titles[0].name;
      for (let i = 0; i < sec.titles.length; i += 1) {
        if (s.level >= sec.titles[i].lv) name = sec.titles[i].name;
      }
      return name;
    }

    function nextSectTitle(s) {
      const sec = sectOf(s);
      if (!sec) return null;
      for (let i = 0; i < sec.titles.length; i += 1) {
        if (s.level < sec.titles[i].lv) return sec.titles[i];
      }
      return null;
    }

    function skillPass(s) {
      const agg = {
        dmgPct: 0, critAdd: 0, critDmg: 0, defPct: 0, hpPct: 0, spdPct: 0,
        dodgeAdd: 0, armorPenChance: 0, regenPct: 0, emergencyHeal: 0,
        trainPct: 0, staPct: 0, silverPct: 0,
      };
      const sec = sectOf(s);
      if (!sec) return agg;
      for (let i = 0; i < sec.skills.length; i += 1) {
        const sk = sec.skills[i];
        if (!s.skills[sk.id]) continue;
        for (const k in sk.pass) {
          if (typeof sk.pass[k] === 'number') agg[k] += sk.pass[k];
        }
      }
      return agg;
    }

    function derived(s) {
      const lv = s.level;
      const p = skillPass(s);
      return {
        atk: 5 + s.str * 2.2 + lv * 0.8,
        def: (2 + s.end * 1.5 + lv * 0.5) * (1 + p.defPct),
        spd: (2 + s.agi * 1.6 + lv * 0.3) * (1 + p.spdPct),
        crit: Math.min(0.4, 0.03 + s.agi * 0.002 + p.critAdd),
        dodge: Math.min(0.3, s.agi * 0.0015 + p.dodgeAdd),
        maxHp: Math.round((50 + s.con * 10 + lv * 6) * (1 + p.hpPct)),
        dmgPct: p.dmgPct,
        critDmg: p.critDmg,
        armorPenChance: p.armorPenChance,
        regenPct: p.regenPct,
        emergencyHeal: p.emergencyHeal,
      };
    }

    function defaultSettings() {
      return { snap: true, autoHide: true, size: 'standard', anim: true, autosave: true };
    }

    function newState() {
      return {
        v: 2,
        setup: false,
        name: '少侠',
        gender: 'male',
        level: 1,
        exp: 0,
        potential: 5,
        con: 5,
        int: 5,
        str: 5,
        end: 5,
        agi: 5,
        stamina: 100,
        silver: 0,
        wins: 0,
        losses: 0,
        streak: 0,
        bestStreak: 0,
        training: true,
        lastTick: Date.now(),
        log: [],
        sect: null,
        skills: {},
        skillPoints: 0,
        growth: [],
        ach: {},
        stats: { battles: 0, travels: 0 },
        settings: defaultSettings(),
        pos: null,
        collapsed: false,
        dock: null,
      };
    }

    function migrateV1(p) {
      const s = newState();
      const nums = ['level', 'exp', 'potential', 'con', 'int', 'str', 'end', 'agi',
        'stamina', 'silver', 'wins', 'losses'];
      for (let i = 0; i < nums.length; i += 1) {
        if (typeof p[nums[i]] === 'number' && isFinite(p[nums[i]])) s[nums[i]] = p[nums[i]];
      }
      if (typeof p.name === 'string' && p.name) s.name = p.name.slice(0, 12);
      s.training = p.training !== false;
      s.lastTick = typeof p.lastTick === 'number' ? p.lastTick : Date.now();
      s.log = Array.isArray(p.log) ? p.log.slice(-40) : [];
      s.pos = p.pos && typeof p.pos.x === 'number' && typeof p.pos.y === 'number'
        ? { x: p.pos.x, y: p.pos.y } : null;
      s.collapsed = !!p.collapsed;
      s.setup = true;
      s.gender = 'male';
      s.growth.push({ id: 'migrated', title: '旧梦重续', text: '单机版存档已并入桌面插件', t: Date.now() });
      return s;
    }

    function normalizeV2(parsed) {
      const s = newState();
      const keys = ['level', 'exp', 'potential', 'con', 'int', 'str', 'end', 'agi',
        'stamina', 'silver', 'wins', 'losses', 'streak', 'bestStreak', 'skillPoints'];
      for (let i = 0; i < keys.length; i += 1) {
        const v = parsed[keys[i]];
        if (typeof v === 'number' && isFinite(v)) s[keys[i]] = v;
      }
      if (typeof parsed.name === 'string' && parsed.name) s.name = parsed.name.slice(0, 12);
      if (parsed.gender === 'female' || parsed.gender === 'male') s.gender = parsed.gender;
      if (parsed.sect && SECTS[parsed.sect]) s.sect = parsed.sect;
      if (parsed.skills && typeof parsed.skills === 'object') {
        for (const id in parsed.skills) {
          if (parsed.skills[id]) s.skills[id] = true;
        }
      }
      if (parsed.ach && typeof parsed.ach === 'object') {
        for (const id in parsed.ach) s.ach[id] = parsed.ach[id];
      }
      s.growth = Array.isArray(parsed.growth) ? parsed.growth.slice(-80) : [];
      s.log = Array.isArray(parsed.log) ? parsed.log.slice(-40) : [];
      s.training = parsed.training !== false;
      s.setup = parsed.setup !== false;
      s.stats = Object.assign({ battles: 0, travels: 0 }, parsed.stats || {});
      s.settings = Object.assign(defaultSettings(), parsed.settings || {});
      s.lastTick = Math.min(Date.now(), Math.max(0, Number(parsed.lastTick) || Date.now()));
      s.pos = parsed.pos && typeof parsed.pos.x === 'number' && typeof parsed.pos.y === 'number'
        ? { x: parsed.pos.x, y: parsed.pos.y } : null;
      s.collapsed = !!parsed.collapsed;
      s.dock = parsed.dock || null;
      return s;
    }

    function load() {
      try {
        const raw = window.localStorage.getItem(SAVE_KEY);
        if (!raw) return newState();
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return newState();
        if (parsed.v === 1) return migrateV1(parsed);
        return normalizeV2(parsed);
      } catch (err) {
        return newState();
      }
    }

    function save() {
      if (!S) return;
      try {
        window.localStorage.setItem(SAVE_KEY, JSON.stringify(S));
      } catch (err) {
        /* storage unavailable: keep the session state in memory */
      }
    }

    function logPush(s, line) {
      s.log.push(line);
      if (s.log.length > 40) s.log.splice(0, s.log.length - 40);
    }

    function growthPush(s, id, title, text) {
      if (s.ach[id]) return false;
      s.ach[id] = Date.now();
      s.growth.push({ id: id, title: title, text: text, t: Date.now() });
      if (s.growth.length > 80) s.growth.splice(0, s.growth.length - 80);
      return true;
    }

    const LEVEL_MARKS = [10, 20, 30, 50, 70, 90];

    function levelUp(s) {
      let ups = 0;
      while (s.level < 100 && s.exp >= expNeed(s.level)) {
        s.exp -= expNeed(s.level);
        s.level += 1;
        s.potential += 3;
        s.skillPoints += 1;
        ups += 1;
        for (let i = 0; i < LEVEL_MARKS.length; i += 1) {
          if (s.level === LEVEL_MARKS[i]) {
            growthPush(s, 'lv_' + s.level, '名动江湖', '修为突破至 ' + s.level + ' 级，称号「' + titleOf(s.level) + '」');
          }
        }
        const sec = sectOf(s);
        if (sec) {
          for (let i = 0; i < sec.titles.length; i += 1) {
            if (s.level === sec.titles[i].lv && i > 0) {
              growthPush(s, 'sect_title_' + sec.id + '_' + i, sec.name + '·' + sec.titles[i].name,
                '你在' + sec.name + '中的地位更进一步');
            }
          }
        }
      }
      if (s.level >= 100) s.exp = 0;
      return ups;
    }

    function tick(s, now) {
      const secs = Math.max(0, Math.min((now - s.lastTick) / 1000, OFFLINE_CAP));
      s.lastTick = now;
      if (secs < 0.5) return null;
      const p = skillPass(s);
      let gains = null;
      if (s.training) {
        const exp = (trainRate(s.level) * (1 + p.trainPct) * secs) / 60;
        const silver = ((2 + s.level * 0.4) * (1 + p.silverPct) * secs) / 60;
        s.exp += exp;
        s.silver += silver;
        s.stamina = Math.min(maxStamina(s.level), s.stamina + (secs / 60) * (1 + p.staPct));
        gains = { exp: exp, silver: silver, minutes: secs / 60 };
      } else {
        s.stamina = Math.min(maxStamina(s.level), s.stamina + (secs / 40) * (1 + p.staPct));
      }
      const ups = levelUp(s);
      return { gains: gains, ups: ups };
    }

    function makeEnemy(level, elite, name) {
      const lv = Math.max(1, level);
      const scale = elite ? 1.12 : 1;
      let nm = name || ENEMY_NAMES[rndInt(0, ENEMY_NAMES.length - 1)];
      if (elite && !name) nm += ELITE_SUFFIX[rndInt(0, ELITE_SUFFIX.length - 1)];
      return {
        name: nm,
        level: lv,
        elite: !!elite,
        maxHp: Math.round((60 + lv * 18) * scale),
        atk: Math.round((8 + lv * 2.1) * scale),
        def: Math.round((3 + lv * 1.8) * scale),
        spd: Math.round(5 + lv * 1.3),
      };
    }

    function battle(s, enemy) {
      const d = derived(s);
      let php = d.maxHp;
      let ehp = enemy.maxHp;
      let rounds = 0;
      let emerg = d.emergencyHeal > 0;
      const lines = [];
      for (let r = 1; r <= 30 && php > 0 && ehp > 0; r += 1) {
        rounds = r;
        if (d.regenPct > 0 && r % 3 === 0) {
          const heal = Math.max(1, Math.round(d.maxHp * d.regenPct));
          php = Math.min(d.maxHp, php + heal);
          lines.push('第' + r + '回合 · 清心诀运转，气血 +' + heal);
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
            const dmg = Math.max(1,
              Math.round((d.atk * (1 + d.dmgPct) * critMul - edef) * swing));
            ehp -= dmg;
            lines.push('第' + r + '回合 · 你一剑递出，' + enemy.name + ' 受创 ' + dmg
              + (crit ? '（暴击）' : '') + (pen ? '（破防）' : ''));
          } else {
            if (chance(d.dodge)) {
              lines.push('第' + r + '回合 · ' + enemy.name + ' 一刀劈空，你侧身避过');
              continue;
            }
            const swing = 0.84 + Math.random() * 0.32;
            const dmg = Math.max(1, Math.round((enemy.atk - d.def * 0.55) * swing));
            php -= dmg;
            lines.push('第' + r + '回合 · ' + enemy.name + ' 击中你，气血 -' + dmg);
          }
        }
        if (emerg && php > 0 && php < d.maxHp * 0.4) {
          const heal = Math.max(1, Math.round(d.maxHp * d.emergencyHeal));
          php = Math.min(d.maxHp, php + heal);
          emerg = false;
          lines.push('第' + r + '回合 · 佛光普照，气血 +' + heal);
        }
      }
      const win = ehp <= 0 && php > 0;
      const p = skillPass(s);
      const exp = win ? Math.round(expNeed(enemy.level) * 0.32) : Math.round(expNeed(s.level) * 0.07);
      const silver = win
        ? Math.round((8 + enemy.level * 9 + (enemy.elite ? 15 : 0)) * (1 + p.silverPct))
        : 0;
      if (win) {
        s.wins += 1;
        s.streak += 1;
        if (s.streak > s.bestStreak) s.bestStreak = s.streak;
      } else {
        s.losses += 1;
        s.streak = 0;
      }
      s.stats.battles += 1;
      s.exp += exp;
      s.silver += silver;
      const ups = levelUp(s);
      return {
        win: win, rounds: rounds, lines: lines.slice(-16),
        exp: exp, silver: silver, ups: ups,
        php: Math.max(0, Math.round(php)), ehp: Math.max(0, Math.round(ehp)),
      };
    }

    function estimateWin(s, enemy) {
      const d = derived(s);
      const critFactor = 1 + d.crit * (0.6 + d.critDmg);
      const pdmg = Math.max(1, d.atk * (1 + d.dmgPct) * critFactor - enemy.def * 0.55);
      const edmg = Math.max(1, (enemy.atk - d.def * 0.55) * (1 - d.dodge * 0.9));
      const pRounds = enemy.maxHp / pdmg;
      const eRounds = d.maxHp / edmg;
      const edge = (eRounds - pRounds) / Math.max(2, (eRounds + pRounds) / 2);
      const rate = 1 / (1 + Math.exp(-edge * 3.4));
      return Math.max(2, Math.min(98, Math.round(rate * 100)));
    }

    function makeOpponents(s) {
      const lv = s.level;
      const defs = [
        { lv: Math.max(1, lv - 2), elite: false },
        { lv: Math.max(1, lv), elite: chance(0.15) },
        { lv: Math.max(1, lv + 2), elite: true },
      ];
      const tags = [
        { key: 'easy', name: '初出茅庐' },
        { key: 'normal', name: '旗鼓相当' },
        { key: 'hard', name: '凶名在外' },
      ];
      const list = defs.map(function (d) {
        const enemy = makeEnemy(d.lv, d.elite);
        return { enemy: enemy, rate: estimateWin(s, enemy) };
      });
      list.sort(function (a, b) { return b.rate - a.rate; });
      return list.map(function (it, i) {
        it.tag = tags[i].name;
        it.key = tags[i].key;
        return it;
      });
    }

    function grant(s, fx, flavor) {
      const lv = s.level;
      const out = [];
      if (fx.exp) {
        const e = Math.round(expNeed(lv) * fx.exp * (1 + fx.expBoost || 0));
        s.exp += e;
        out.push('修为 +' + e);
      }
      if (fx.silver) {
        const v = Math.round(fx.silver[0] + lv * fx.silver[1]) * (fx.silver[0] < 0 ? 1 : 1);
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
      const ups = levelUp(s);
      if (ups > 0) out.push('突破至 ' + s.level + ' 级');
      return { text: flavor + (out.length ? '（' + out.join('，') + '）' : ''), ups: ups };
    }

    function resolveTravelOption(s, opt) {
      if (opt.can && !opt.can(s)) return { ok: false, text: '条件不足，无法选择。' };
      if (opt.loseSilver) {
        s.silver = Math.max(0, s.silver - opt.loseSilver);
      }
      let text = '';
      if (opt.battle) {
        const enemy = opt.battle(s);
        const res = battle(s, enemy);
        text = (res.win ? opt.flavorWin : opt.flavorLose)
          + '（' + res.rounds + ' 回合，修为 +' + res.exp
          + (res.silver ? '，银两 +' + res.silver : '') + '）';
        if (res.ups > 0) text += ' 突破至 ' + s.level + ' 级！';
      } else {
        text = grant(s, opt.fx || {}, opt.flavor).text;
      }
      if (opt.chain && chance(opt.chain.chance)) {
        return { ok: true, text: text, next: opt.chain.event };
      }
      return { ok: true, text: text };
    }

    function recordTravel(s) {
      s.stats.travels += 1;
      const t = s.stats.travels;
      if (t === 10) growthPush(s, 'travel_10', '初涉江湖', '已经游历 10 次');
      if (t === 50) growthPush(s, 'travel_50', '行遍四方', '已经游历 50 次');
      if (t === 100) growthPush(s, 'travel_100', '踏遍青山', '已经游历 100 次');
    }

    function checkBattleGrowth(s, res) {
      if (res.win) {
        growthPush(s, 'first_win', '初战告捷', '赢下第一场比武');
        if (s.wins >= 10) growthPush(s, 'win_10', '小有名气', '累计胜利 10 场');
        if (s.wins >= 50) growthPush(s, 'win_50', '威震一方', '累计胜利 50 场');
        if (s.wins >= 100) growthPush(s, 'win_100', '名动江湖', '累计胜利 100 场');
        if (s.streak >= 5) growthPush(s, 'streak_5', '连战连捷', '取得 5 连胜');
        if (s.streak >= 10) growthPush(s, 'streak_10', '势如破竹', '取得 10 连胜');
      }
    }

    /* ------------------------------------------------------------------ */
    /* Locale                                                              */
    /* ------------------------------------------------------------------ */

    const ZH = {
      title: '桌面江湖', subtitle: '桌面小江湖',
      exp: '修为', stamina: '体力', silver: '银两', potential: '潜能',
      power: '战力', hp: '气血', def: '防御', spd: '身法', record: '战绩',
      trainingOn: '修炼中', trainingOff: '已停修',
      battle: '比武', explore: '游历', log: '江湖传闻', logEmpty: '江湖平静，暂无风波。',
      reset: '重置', collapse: '收起', expand: '展开',
      con: '体质', int: '智力', str: '力量', end: '耐力', agi: '敏捷',
      win: '胜', lose: '负', levelShort: '级',
      tabHome: '首页', tabSect: '门派', tabGrowth: '成长册', tabSettings: '设置',
    };

    const EN = {
      title: 'Jingwu Hall', subtitle: 'Desktop Jianghu',
      exp: 'Cultivation', stamina: 'Stamina', silver: 'Silver', potential: 'Potential',
      power: 'Power', hp: 'Vitality', def: 'Defense', spd: 'Agility', record: 'Record',
      trainingOn: 'Cultivating', trainingOff: 'Resting',
      battle: 'Duel', explore: 'Explore', log: 'Jianghu Rumors', logEmpty: 'All quiet in the jianghu.',
      reset: 'Reset', collapse: 'Collapse', expand: 'Expand',
      con: 'Con', int: 'Int', str: 'Str', end: 'End', agi: 'Agi',
      win: 'W', lose: 'L', levelShort: 'Lv',
      tabHome: 'Home', tabSect: 'Sect', tabGrowth: 'Journal', tabSettings: 'Settings',
    };

    let t = function (key) {
      return ZH[key] !== undefined ? ZH[key] : key;
    };

    /* ------------------------------------------------------------------ */
    /* Styles                                                              */
    /* ------------------------------------------------------------------ */

    const CSS = [
      '.jwpet-card{display:flex;flex-direction:column;gap:6px;padding:10px 12px;',
      'border-radius:14px;background:var(--dsw-alias-bg-overlay);',
      'color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);',
      'box-shadow:0 14px 38px rgba(0,0,0,.3);font-size:12px;line-height:1.5;}',
      '.jwpet-card.jwpet-dock-left{border-top-left-radius:4px;border-bottom-left-radius:4px;}',
      '.jwpet-card.jwpet-dock-right{border-top-right-radius:4px;border-bottom-right-radius:4px;}',
      '.jwpet-head{display:flex;align-items:center;justify-content:space-between;gap:8px;',
      'cursor:grab;touch-action:none;padding-bottom:6px;border-bottom:1px solid var(--dsw-alias-border-l1);}',
      '.jwpet-head:active{cursor:grabbing;}',
      '.jwpet-title{font-family:"KaiTi","STKaiti",serif;font-size:17px;font-weight:700;',
      'letter-spacing:2px;color:#c8a45d;}',
      '.jwpet-sub{color:var(--dsw-alias-label-secondary);font-size:11px;max-width:220px;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.jwpet-icon-btn{width:22px;height:22px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);',
      'background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;',
      'line-height:1;display:flex;align-items:center;justify-content:center;flex:none;}',
      '.jwpet-icon-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}',
      '.jwpet-tabs{display:flex;gap:4px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:4px;}',
      '.jwpet-tab{flex:1;padding:4px 2px;border-radius:6px;border:none;background:transparent;',
      'color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;position:relative;}',
      '.jwpet-tab:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}',
      '.jwpet-tab.jwpet-tab-on{background:var(--dsw-alias-bg-layer-2);color:#c8a45d;font-weight:600;}',
      '.jwpet-tab-dot{position:absolute;top:2px;right:6px;width:5px;height:5px;border-radius:50%;background:#e06c5a;}',
      '.jwpet-body{overflow-y:auto;max-height:calc(80vh - 150px);padding-right:2px;',
      'display:flex;flex-direction:column;gap:7px;}',
      '.jwpet-body::-webkit-scrollbar{width:5px;}',
      '.jwpet-body::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l2);border-radius:3px;}',
      '.jwpet-bar-row{display:flex;align-items:center;gap:6px;}',
      '.jwpet-bar-label{width:34px;color:var(--dsw-alias-label-secondary);font-size:11px;flex:none;}',
      '.jwpet-bar-track{position:relative;flex:1;height:8px;border-radius:999px;',
      'background:var(--dsw-alias-bg-layer-2);overflow:hidden;}',
      '.jwpet-bar-fill{position:absolute;left:0;top:0;bottom:0;border-radius:999px;',
      'background:#c8a45d;opacity:.9;}',
      '.jwpet-bar-fill.jwpet-bar-sta{background:var(--dsw-alias-state-success-primary);}',
      '.jwpet-bar-text{width:88px;text-align:right;color:var(--dsw-alias-label-secondary);',
      'font-size:10px;flex:none;font-variant-numeric:tabular-nums;}',
      '.jwpet-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:4px 6px;}',
      '.jwpet-stat{display:flex;align-items:baseline;justify-content:space-between;gap:4px;',
      'padding:2px 6px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);}',
      '.jwpet-stat-k{color:var(--dsw-alias-label-secondary);font-size:10px;}',
      '.jwpet-stat-v{font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;}',
      '.jwpet-actions{display:flex;gap:6px;}',
      '.jwpet-btn{flex:1;padding:6px 4px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);',
      'background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:12px;',
      'cursor:pointer;transition:background .15s ease,border-color .15s ease;}',
      '.jwpet-btn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2);}',
      '.jwpet-btn:disabled{opacity:.45;cursor:not-allowed;}',
      '.jwpet-btn.jwpet-btn-active{border-color:#c8a45d;color:#c8a45d;}',
      '.jwpet-btn.jwpet-btn-wide{flex:none;width:100%;}',
      '.jwpet-btn.jwpet-btn-ghost{flex:none;width:100%;text-align:left;padding:5px 8px;font-size:11px;}',
      '.jwpet-btn.jwpet-btn-sm{flex:none;padding:3px 8px;font-size:11px;}',
      '.jwpet-potential{display:flex;align-items:center;gap:6px;}',
      '.jwpet-pot-label{color:var(--dsw-alias-label-secondary);font-size:10px;flex:none;}',
      '.jwpet-attrs{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;flex:1;}',
      '.jwpet-attr{display:flex;flex-direction:column;align-items:center;gap:1px;',
      'padding:3px 2px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);}',
      '.jwpet-attr-k{font-size:10px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-attr-v{font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;}',
      '.jwpet-plus{width:100%;border:none;border-radius:4px;background:transparent;',
      'color:#c8a45d;font-size:11px;cursor:pointer;line-height:1.4;}',
      '.jwpet-plus:hover:not(:disabled){background:var(--dsw-alias-bg-layer-1);}',
      '.jwpet-plus:disabled{opacity:.25;cursor:not-allowed;}',
      '.jwpet-card-box{border-radius:10px;padding:8px 9px;background:var(--dsw-alias-bg-layer-2);',
      'border-left:2px solid #c8a45d;display:flex;flex-direction:column;gap:5px;}',
      '.jwpet-box-title{font-weight:600;color:#c8a45d;font-size:12px;}',
      '.jwpet-box-text{color:var(--dsw-alias-label-secondary);font-size:11px;}',
      '.jwpet-options{display:flex;flex-direction:column;gap:4px;}',
      '.jwpet-log{max-height:100px;overflow-y:auto;border-top:1px solid var(--dsw-alias-border-l1);padding-top:6px;}',
      '.jwpet-log-title{color:var(--dsw-alias-label-secondary);font-size:10px;margin-bottom:2px;}',
      '.jwpet-log-line{font-size:11px;color:var(--dsw-alias-label-secondary);padding:1px 0;}',
      '.jwpet-log-empty{font-size:11px;color:var(--dsw-alias-label-secondary);opacity:.7;}',
      '.jwpet-foot{display:flex;justify-content:flex-end;gap:10px;padding-top:2px;}',
      '.jwpet-link{border:none;background:transparent;color:var(--dsw-alias-label-secondary);',
      'font-size:10px;cursor:pointer;padding:0;}',
      '.jwpet-link:hover{color:var(--dsw-alias-label-primary);}',
      '.jwpet-pill{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;',
      'border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay);',
      'color:var(--dsw-alias-label-primary);font-size:12px;cursor:grab;touch-action:none;',
      'box-shadow:0 6px 18px rgba(0,0,0,.25);opacity:.86;transition:opacity .18s ease;}',
      '.jwpet-pill:hover{opacity:1;}',
      '.jwpet-pill.jwpet-pill-hidden{opacity:.42;}',
      '.jwpet-pill-dot{width:8px;height:8px;border-radius:50%;background:#c8a45d;',
      'box-shadow:0 0 6px #c8a45d;flex:none;}',
      '.jwpet-pill-lv{color:var(--dsw-alias-label-secondary);font-size:11px;}',
      '.jwpet-pill-badge{min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#c8a45d;',
      'color:#2b2118;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}',
      '.jwpet-opponents{display:flex;flex-direction:column;gap:6px;}',
      '.jwpet-opponent{border-radius:10px;padding:7px 9px;background:var(--dsw-alias-bg-layer-2);',
      'border:1px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:4px;}',
      '.jwpet-opp-row{display:flex;align-items:center;justify-content:space-between;gap:6px;}',
      '.jwpet-opp-name{font-size:12px;font-weight:600;}',
      '.jwpet-opp-tag{font-size:10px;padding:0 5px;border-radius:6px;background:var(--dsw-alias-bg-layer-1);',
      'color:var(--dsw-alias-label-secondary);}',
      '.jwpet-opp-tag.jwpet-tag-elite{color:#e0b45a;border:1px solid #e0b45a;}',
      '.jwpet-opp-meta{font-size:10px;color:var(--dsw-alias-label-secondary);',
      'display:flex;gap:8px;font-variant-numeric:tabular-nums;}',
      '.jwpet-opp-rate{font-size:11px;color:#c8a45d;font-variant-numeric:tabular-nums;}',
      '.jwpet-grid2{display:grid;grid-template-columns:1fr 1fr;gap:6px;}',
      '.jwpet-dest{border-radius:10px;padding:7px 8px;background:var(--dsw-alias-bg-layer-2);',
      'border:1px solid var(--dsw-alias-border-l1);cursor:pointer;text-align:left;',
      'color:var(--dsw-alias-label-primary);font-size:12px;display:flex;flex-direction:column;gap:2px;}',
      '.jwpet-dest:hover{background:var(--dsw-alias-bg-layer-1);border-color:#c8a45d;}',
      '.jwpet-dest-name{font-weight:600;}',
      '.jwpet-dest-desc{font-size:10px;color:var(--dsw-alias-label-secondary);line-height:1.4;}',
      '.jwpet-sect{border-radius:10px;padding:8px 9px;background:var(--dsw-alias-bg-layer-2);',
      'border:1px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:4px;}',
      '.jwpet-sect.jwpet-sect-on{border-color:#c8a45d;}',
      '.jwpet-sect-head{display:flex;align-items:center;justify-content:space-between;gap:6px;}',
      '.jwpet-sect-name{font-size:13px;font-weight:700;color:#c8a45d;}',
      '.jwpet-sect-icon{font-size:15px;}',
      '.jwpet-skill{display:flex;align-items:center;justify-content:space-between;gap:6px;',
      'padding:4px 6px;border-radius:8px;background:var(--dsw-alias-bg-layer-1);}',
      '.jwpet-skill-main{display:flex;flex-direction:column;gap:1px;min-width:0;}',
      '.jwpet-skill-name{font-size:12px;font-weight:600;}',
      '.jwpet-skill-desc{font-size:10px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-skill-meta{font-size:10px;color:var(--dsw-alias-label-secondary);flex:none;}',
      '.jwpet-title-track{display:flex;flex-wrap:wrap;gap:4px;}',
      '.jwpet-title-step{font-size:10px;padding:1px 6px;border-radius:8px;',
      'background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);}',
      '.jwpet-title-step.jwpet-title-on{background:#c8a45d;color:#2b2118;font-weight:700;}',
      '.jwpet-row{display:flex;align-items:center;justify-content:space-between;gap:8px;',
      'padding:4px 0;border-bottom:1px dashed var(--dsw-alias-border-l1);}',
      '.jwpet-row:last-child{border-bottom:none;}',
      '.jwpet-row-k{color:var(--dsw-alias-label-secondary);font-size:11px;}',
      '.jwpet-row-v{font-size:11px;display:flex;align-items:center;gap:4px;}',
      '.jwpet-input{flex:1;min-width:0;padding:4px 7px;border-radius:7px;',
      'border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);',
      'color:var(--dsw-alias-label-primary);font-size:12px;outline:none;}',
      '.jwpet-input:focus{border-color:#c8a45d;}',
      '.jwpet-seg{display:flex;gap:3px;}',
      '.jwpet-seg-btn{padding:2px 7px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);',
      'background:transparent;color:var(--dsw-alias-label-secondary);font-size:10px;cursor:pointer;}',
      '.jwpet-seg-btn.jwpet-seg-on{background:#c8a45d;color:#2b2118;border-color:#c8a45d;}',
      '.jwpet-ach{display:grid;grid-template-columns:1fr 1fr;gap:5px;}',
      '.jwpet-ach-item{padding:5px 6px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);',
      'border:1px solid transparent;display:flex;flex-direction:column;gap:1px;}',
      '.jwpet-ach-item.jwpet-ach-on{border-color:#c8a45d;}',
      '.jwpet-ach-off{opacity:.42;}',
      '.jwpet-ach-title{font-size:11px;font-weight:600;}',
      '.jwpet-ach-desc{font-size:10px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-growth{display:flex;flex-direction:column;gap:4px;}',
      '.jwpet-growth-item{padding:4px 6px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);}',
      '.jwpet-growth-title{font-size:11px;color:#c8a45d;font-weight:600;}',
      '.jwpet-growth-text{font-size:10px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-result{border-radius:10px;padding:9px 10px;display:flex;flex-direction:column;gap:3px;}',
      '.jwpet-result.jwpet-win{background:rgba(105,150,105,.18);border:1px solid rgba(105,150,105,.5);}',
      '.jwpet-result.jwpet-lose{background:rgba(150,90,90,.15);border:1px solid rgba(150,90,90,.45);}',
      '.jwpet-result-title{font-size:13px;font-weight:700;}',
      '.jwpet-result-text{font-size:11px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-onboard{display:flex;flex-direction:column;gap:8px;padding-top:4px;}',
      '.jwpet-onboard-title{font-size:14px;color:#c8a45d;font-weight:700;letter-spacing:1px;}',
      '.jwpet-onboard-desc{font-size:11px;color:var(--dsw-alias-label-secondary);}',
      '.jwpet-toast{position:fixed;padding:6px 10px;border-radius:8px;background:#3a2f1e;',
      'color:#f0d9a8;font-size:11px;box-shadow:0 8px 20px rgba(0,0,0,.4);z-index:70;',
      'pointer-events:none;white-space:nowrap;}',
      '.jwpet-view-head{display:flex;align-items:center;justify-content:space-between;gap:6px;}',
      '.jwpet-view-title{font-size:13px;font-weight:700;color:#c8a45d;}',
      '.jwpet-battle-lines{max-height:150px;overflow-y:auto;font-size:10px;',
      'color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);',
      'border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:1px;}',
      '.jwpet-empty{font-size:11px;color:var(--dsw-alias-label-secondary);opacity:.7;}',
    ].join('');

    const CARD_WIDTH = { compact: 320, standard: 360, large: 400 };

    function cardWidth(settings) {
      return CARD_WIDTH[settings.size] || CARD_WIDTH.standard;
    }

    /* ------------------------------------------------------------------ */
    /* Reactive plumbing                                                   */
    /* ------------------------------------------------------------------ */

    let S = null;

    const UI = {
      tab: 'home',
      view: 'home',
      battle: null,
      travel: null,
      toast: null,
      onboardName: '',
      onboardGender: 'male',
      settingsName: '',
    };

    function clampPos() {
      if (!S) return;
      const W = window.innerWidth || 1280;
      const H = window.innerHeight || 800;
      const w = S.collapsed ? 160 : cardWidth(S.settings);
      const h = S.collapsed ? 40 : Math.min(580, H - 60);
      if (!S.pos) {
        S.pos = { x: Math.max(12, W - w - 18), y: Math.max(64, H - h - 20) };
      }
      S.pos.x = Math.max(-w + 64, Math.min(W - 64, S.pos.x));
      S.pos.y = Math.max(2, Math.min(H - 42, S.pos.y));
    }

    function snapPos(el) {
      if (!S) return;
      if (!S.settings.snap) { S.dock = null; return; }
      const W = window.innerWidth || 1280;
      const H = window.innerHeight || 800;
      const th = 26;
      const w = el && el.offsetWidth ? el.offsetWidth : (S.collapsed ? 160 : cardWidth(S.settings));
      const hgt = el && el.offsetHeight ? el.offsetHeight : (S.collapsed ? 40 : 420);
      let dock = null;
      if (S.pos.x <= th) { S.pos.x = 6; dock = 'left'; }
      else if (S.pos.x + w >= W - th) { S.pos.x = W - w - 6; dock = 'right'; }
      if (!dock) {
        if (S.pos.y <= th) { S.pos.y = 6; dock = 'top'; }
        else if (S.pos.y + hgt >= H - th) { S.pos.y = H - hgt - 6; dock = 'bottom'; }
      }
      S.dock = dock;
    }

    /* ------------------------------------------------------------------ */
    /* Component                                                           */
    /* ------------------------------------------------------------------ */

    function JianghuPet() {
      const hasState = useState(0);
      const force = hasState[1];
      const rerender = useCallback(function () {
        force(function (v) { return (v + 1) % 1000000; });
      }, [force]);
      const dragRef = useRef(null);
      const cardRef = useRef(null);

      if (!S) {
        S = load();
        clampPos();
        const r = tick(S, Date.now());
        if (r && r.gains && r.gains.minutes >= 1) {
          logPush(S, '离线修炼 ' + Math.round(r.gains.minutes) + ' 分钟：修为 +'
            + Math.round(r.gains.exp) + '，银两 +' + Math.round(r.gains.silver));
        }
        UI.onboardName = S.name && S.name !== '少侠' ? S.name : '';
        UI.settingsName = S.name;
        save();
      }

      useEffect(function () {
        let ticks = 0;
        const id = window.setInterval(function () {
          if (!S) return;
          const r = tick(S, Date.now());
          if (r) {
            if (r.ups > 0) logPush(S, '突破至 ' + S.level + ' 级，潜能 +' + r.ups * 3);
            ticks += 1;
            if (S.settings.autosave && ticks % 5 === 0) save();
          }
          rerender();
        }, 1000);
        return function () {
          window.clearInterval(id);
          save();
        };
      }, [rerender]);

      useEffect(function () {
        function onResize() {
          clampPos();
          rerender();
        }
        window.addEventListener('resize', onResize);
        return function () {
          window.removeEventListener('resize', onResize);
        };
      }, [rerender]);

      const s = S;
      const d = derived(s);
      const need = expNeed(s.level);
      const maxSta = maxStamina(s.level);
      const sec = sectOf(s);
      const p = skillPass(s);
      if (!s.pos) clampPos();
      const pos = s.pos || { x: 16, y: 72 };

      function commit() {
        save();
        rerender();
      }

      function toast(text) {
        UI.toast = { text: text, until: Date.now() + 2600 };
        rerender();
        window.setTimeout(function () { rerender(); }, 2750);
      }

      function setTab(tab) {
        UI.tab = tab;
        UI.view = 'home';
        rerender();
      }

      function onPointerDown(e) {
        if (e.button !== 0) return;
        let node = e.target;
        while (node && node !== e.currentTarget) {
          if (node.tagName === 'BUTTON' || node.tagName === 'INPUT' || node.tagName === 'SELECT') return;
          node = node.parentNode;
        }
        const base = s.pos || { x: 0, y: 0 };
        dragRef.current = { dx: e.clientX - base.x, dy: e.clientY - base.y, moved: false };
        try {
          if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) { /* best effort */ }
        e.preventDefault();
      }

      function onPointerMove(e) {
        if (!dragRef.current) return;
        s.pos = {
          x: Math.round(e.clientX - dragRef.current.dx),
          y: Math.round(e.clientY - dragRef.current.dy),
        };
        dragRef.current.moved = true;
        clampPos();
        rerender();
      }

      function onPointerUp(e) {
        if (!dragRef.current) return;
        const moved = dragRef.current.moved;
        dragRef.current = null;
        snapPos(cardRef.current || (e.currentTarget && e.currentTarget.parentNode));
        save();
        rerender();
        try {
          if (e.currentTarget.releasePointerCapture) e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) { /* best effort */ }
        return moved;
      }

      function onPillUp(e) {
        if (!dragRef.current) return;
        const moved = dragRef.current.moved;
        dragRef.current = null;
        snapPos(e.currentTarget);
        save();
        rerender();
        try {
          if (e.currentTarget.releasePointerCapture) e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) { /* best effort */ }
        if (!moved) {
          s.collapsed = false;
          save();
          rerender();
        }
      }

      function collapse() {
        s.collapsed = true;
        clampPos();
        commit();
      }

      function expand() {
        s.collapsed = false;
        clampPos();
        commit();
      }

      function resetPos() {
        s.pos = null;
        s.dock = null;
        clampPos();
        commit();
      }

      function addPotential(key) {
        if (s.potential <= 0) return;
        s.potential -= 1;
        s[key] += 1;
        commit();
      }

      function toggleTrain() {
        s.training = !s.training;
        commit();
      }

      /* --- onboarding ------------------------------------------------- */

      function actStart() {
        const name = (UI.onboardName || '').trim();
        if (!name) { toast('先给自己取个名字吧'); return; }
        s.name = name.slice(0, 12);
        s.gender = UI.onboardGender;
        s.setup = true;
        growthPush(s, 'join_world', '初入江湖', '你以「' + s.name + '」之名踏入江湖');
        logPush(s, '【初入江湖】' + s.name + ' 踏入江湖，且看今朝');
        commit();
        toast('江湖路远，少侠珍重');
      }

      /* --- sect ------------------------------------------------------- */

      function actJoinSect(id) {
        const target = SECTS[id];
        if (!target) return;
        if (s.sect) { toast('已经拜入师门，不可再投别派'); return; }
        if (target.gender !== 'any' && target.gender !== s.gender) {
          toast(target.name + '只收' + (target.gender === 'male' ? '男' : '女') + '弟子');
          return;
        }
        s.sect = id;
        growthPush(s, 'sect_' + id, '拜入' + target.name, '你于今日正式拜入' + target.name + '门下');
        logPush(s, '【拜师】你拜入' + target.name + '，成为' + sectTitleOf(s));
        commit();
        toast('自今往后，你便是' + target.name + '弟子');
      }

      function actLearnSkill(skill) {
        if (!sec) return;
        if (!s.sect) return;
        if (s.skills[skill.id]) { toast('此武学已经习得'); return; }
        if (s.level < skill.lv) { toast('需要 ' + skill.lv + ' 级方可修习'); return; }
        if (s.skillPoints < skill.sp) { toast('技能点不足，还需 ' + (skill.sp - s.skillPoints)); return; }
        s.skillPoints -= skill.sp;
        s.skills[skill.id] = true;
        growthPush(s, 'learn_' + skill.id, '习得「' + skill.name + '」', '你参悟' + skill.name + '，武学更进一步');
        const learned = sec.skills.filter(function (sk) { return s.skills[sk.id]; }).length;
        if (learned >= sec.skills.length) {
          growthPush(s, 'learn_all', '一脉相承', '你已学全' + sec.name + '所有武学');
        }
        logPush(s, '【武学】习得「' + skill.name + '」：' + skill.desc);
        commit();
        toast('习得「' + skill.name + '」');
      }

      /* --- battle ----------------------------------------------------- */

      function openBattle() {
        UI.view = 'battle';
        UI.battle = { opponents: makeOpponents(s), result: null, enemy: null };
        rerender();
      }

      function refreshOpponents() {
        UI.battle = { opponents: makeOpponents(s), result: null, enemy: null };
        rerender();
      }

      function challenge(idx) {
        const b = UI.battle;
        if (!b) return;
        const opponent = b.opponents[idx];
        if (!opponent) return;
        if (s.stamina < 10) { toast('体力不足，先歇息片刻'); return; }
        s.stamina -= 10;
        const res = battle(s, opponent.enemy);
        checkBattleGrowth(s, res);
        logPush(s, (res.win ? '⚔ 你击败了 ' : '⚔ 你不敌 ') + opponent.enemy.name
          + '（' + opponent.enemy.level + ' 级，' + res.rounds + ' 回合）');
        if (res.win) {
          logPush(s, '战利品：修为 +' + res.exp + '，银两 +' + res.silver);
        } else {
          logPush(s, '修为 +' + res.exp + '，回山再练');
        }
        if (res.ups > 0) logPush(s, '突破至 ' + s.level + ' 级，潜能 +' + res.ups * 3 + '，技能点 +' + res.ups);
        UI.battle = { opponents: b.opponents, result: res, enemy: opponent.enemy };
        save();
        rerender();
      }

      function closeBattle() {
        UI.view = 'home';
        UI.battle = null;
        rerender();
      }

      /* --- travel ----------------------------------------------------- */

      function openTravel() {
        UI.view = 'travel';
        UI.travel = { phase: 'select', destId: null, event: null, result: null };
        rerender();
      }

      function chooseDestination(id) {
        const dest = DESTINATIONS[id];
        if (!dest) return;
        if (s.stamina < 15) { toast('体力不足，走不动了'); return; }
        s.stamina -= 15;
        recordTravel(s);
        const pool = dest.events;
        const ev = pool[rndInt(0, pool.length - 1)];
        UI.travel = { phase: 'event', destId: id, event: ev, result: null };
        save();
        rerender();
      }

      function pickTravelOption(opt) {
        if (!UI.travel || !UI.travel.event) return;
        const r = resolveTravelOption(s, opt);
        if (!r.ok) { toast(r.text); return; }
        if (r.next) {
          UI.travel = {
            phase: 'event',
            destId: UI.travel.destId,
            event: r.next,
            result: r.text,
          };
        } else {
          UI.travel = {
            phase: 'done',
            destId: UI.travel.destId,
            event: null,
            result: r.text,
          };
        }
        save();
        rerender();
      }

      function travelAgain() {
        UI.travel = { phase: 'select', destId: null, event: null, result: null };
        rerender();
      }

      function closeTravel() {
        UI.view = 'home';
        UI.travel = null;
        rerender();
      }

      /* --- settings --------------------------------------------------- */

      function actSaveProfile() {
        const name = (UI.settingsName || '').trim();
        if (!name) { toast('名字不能为空'); return; }
        const nextGender = s.gender;
        s.name = name.slice(0, 12);
        if (sec && sec.gender !== 'any' && sec.gender !== nextGender) {
          toast('性别与当前门派不符');
          return;
        }
        commit();
        toast('名号已更新');
      }

      function actSetGender(g) {
        if (sec && sec.gender !== 'any' && sec.gender !== g) {
          toast(sec.name + '只收' + (sec.gender === 'male' ? '男' : '女') + '弟子，需先离开门派');
          return;
        }
        s.gender = g;
        commit();
      }

      function actSetSetting(key, value) {
        s.settings[key] = value;
        if (key === 'snap' && value === false) s.dock = null;
        clampPos();
        commit();
      }

      function actExport() {
        try {
          const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'desktop-jianghu-save.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          toast('存档已导出');
        } catch (err) {
          toast('导出失败：' + (err && err.message ? err.message : '未知错误'));
        }
      }

      function actImportFile(e) {
        const file = e.target && e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const parsed = JSON.parse(String(reader.result));
            const next = parsed && parsed.v === 1 ? migrateV1(parsed) : normalizeV2(parsed);
            S = next;
            UI.tab = 'home';
            UI.view = 'home';
            save();
            rerender();
            toast('存档已导入');
          } catch (err) {
            toast('导入失败：存档格式不正确');
          }
        };
        reader.readAsText(file);
      }

      function actReset() {
        if (!window.confirm('确定要重置整个江湖吗？此操作不可撤销。')) return;
        S = newState();
        S.setup = false;
        UI.tab = 'home';
        UI.view = 'home';
        UI.onboardName = '';
        save();
        rerender();
      }

      /* --- render helpers --------------------------------------------- */

      function barRow(key, label, value, max, cls) {
        return h('div', { key: key, className: 'jwpet-bar-row' },
          h('span', { className: 'jwpet-bar-label' }, label),
          h('div', { className: 'jwpet-bar-track' },
            h('div', {
              className: 'jwpet-bar-fill' + (cls ? ' ' + cls : ''),
              style: { width: Math.max(0, Math.min(100, (value / max) * 100)) + '%' },
            })
          ),
          h('span', { className: 'jwpet-bar-text' }, fmt(value) + ' / ' + max)
        );
      }

      function statCell(key, label, value) {
        return h('div', { key: key, className: 'jwpet-stat' },
          h('span', { className: 'jwpet-stat-k' }, label),
          h('span', { className: 'jwpet-stat-v' }, value)
        );
      }

      function attrCell(key, label) {
        return h('div', { key: key, className: 'jwpet-attr' },
          h('span', { className: 'jwpet-attr-k' }, label),
          h('span', { className: 'jwpet-attr-v' }, s[key]),
          h('button', {
            className: 'jwpet-plus',
            disabled: s.potential <= 0,
            onClick: function () { addPotential(key); },
          }, '+')
        );
      }

      function renderToast() {
        if (!UI.toast || Date.now() > UI.toast.until) return null;
        return h('div', {
          className: 'jwpet-toast',
          style: { left: Math.max(8, pos.x) + 'px', top: Math.max(8, pos.y - 34) + 'px' },
        }, UI.toast.text);
      }

      function renderOnboarding() {
        return h('div', { className: 'jwpet-onboard' },
          h('div', { className: 'jwpet-onboard-title' }, '初入江湖'),
          h('div', { className: 'jwpet-onboard-desc' },
            '二〇〇九年的那个江湖，如今只剩在记忆里。今日重新踏进去，先给自己立个名号。'),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '名号'),
            h('input', {
              className: 'jwpet-input',
              value: UI.onboardName,
              maxLength: 12,
              placeholder: '取个侠名（最多 12 字）',
              onChange: function (e) { UI.onboardName = e.target.value; rerender(); },
            })
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '性别'),
            h('div', { className: 'jwpet-seg' },
              h('button', {
                className: 'jwpet-seg-btn' + (UI.onboardGender === 'male' ? ' jwpet-seg-on' : ''),
                onClick: function () { UI.onboardGender = 'male'; rerender(); },
              }, '男'),
              h('button', {
                className: 'jwpet-seg-btn' + (UI.onboardGender === 'female' ? ' jwpet-seg-on' : ''),
                onClick: function () { UI.onboardGender = 'female'; rerender(); },
              }, '女')
            )
          ),
          h('button', { className: 'jwpet-btn jwpet-btn-wide jwpet-btn-active', onClick: actStart }, '踏入江湖')
        );
      }

      function renderHome() {
        const nodes = [];
        nodes.push(h('div', { key: 'bars' },
          barRow('exp', t('exp'), s.exp, need),
          barRow('sta', t('stamina'), s.stamina, maxSta, 'jwpet-bar-sta')
        ));
        nodes.push(h('div', { key: 'stats', className: 'jwpet-stats' },
          statCell('power', t('power'), Math.round(d.atk)),
          statCell('hp', t('hp'), d.maxHp),
          statCell('def', t('def'), Math.round(d.def)),
          statCell('spd', t('spd'), Math.round(d.spd)),
          statCell('silver', t('silver'), fmt(s.silver)),
          statCell('record', t('record'), s.wins + t('win') + s.losses + t('lose'))
        ));
        nodes.push(h('div', { key: 'actions', className: 'jwpet-actions' },
          h('button', {
            className: 'jwpet-btn' + (s.training ? ' jwpet-btn-active' : ''),
            onClick: toggleTrain,
          }, (s.training ? t('trainingOn') : t('trainingOff')) + ' · ' + Math.round(trainRate(s.level) * (1 + p.trainPct)) + '/分'),
          h('button', { className: 'jwpet-btn', onClick: openBattle }, t('battle') + ' · 10'),
          h('button', { className: 'jwpet-btn', onClick: openTravel }, t('explore') + ' · 15')
        ));
        nodes.push(h('div', { key: 'potential', className: 'jwpet-potential' },
          h('span', { className: 'jwpet-pot-label' }, t('potential') + ' ' + s.potential),
          h('div', { className: 'jwpet-attrs' },
            attrCell('con', t('con')),
            attrCell('int', t('int')),
            attrCell('str', t('str')),
            attrCell('end', t('end')),
            attrCell('agi', t('agi'))
          )
        ));
        const logLines = s.log.slice(-6).reverse();
        nodes.push(h('div', { key: 'log', className: 'jwpet-log' },
          h('div', { className: 'jwpet-log-title' }, t('log')),
          logLines.length
            ? logLines.map(function (line, idx) {
              return h('div', { key: idx, className: 'jwpet-log-line' }, line);
            })
            : h('div', { className: 'jwpet-log-empty' }, t('logEmpty'))
        ));
        return nodes;
      }

      function renderBattle() {
        const b = UI.battle;
        if (!b) return null;
        if (b.result) {
          const res = b.result;
          return h('div', { key: 'battle-result', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            h('div', { className: 'jwpet-view-head' },
              h('span', { className: 'jwpet-view-title' }, res.win ? '得胜而归' : '负伤而归'),
              h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: closeBattle }, '返回首页')
            ),
            h('div', { className: 'jwpet-result ' + (res.win ? 'jwpet-win' : 'jwpet-lose') },
              h('div', { className: 'jwpet-result-title' },
                (res.win ? '胜 ' : '负 ') + (b.enemy ? b.enemy.name : '对手') + '（' + res.rounds + ' 回合）'),
              h('div', { className: 'jwpet-result-text' },
                '修为 +' + res.exp + (res.silver ? '，银两 +' + res.silver : '')
                + (res.ups > 0 ? '，突破至 ' + s.level + ' 级' : '')
                + '，气血余 ' + res.php)
            ),
            h('div', { className: 'jwpet-battle-lines' },
              res.lines.map(function (line, idx) {
                return h('div', { key: idx }, line);
              })
            ),
            h('div', { className: 'jwpet-actions' },
              h('button', { className: 'jwpet-btn', onClick: refreshOpponents }, '再战一批'),
              h('button', { className: 'jwpet-btn', onClick: closeBattle }, '收势')
            )
          );
        }
        return h('div', { key: 'battle-select', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
          h('div', { className: 'jwpet-view-head' },
            h('span', { className: 'jwpet-view-title' }, '择人比武 · 10 体力'),
            h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: closeBattle }, '返回首页')
          ),
          h('div', { className: 'jwpet-opponents' },
            b.opponents.map(function (op, idx) {
              return h('div', { key: idx, className: 'jwpet-opponent' },
                h('div', { className: 'jwpet-opp-row' },
                  h('span', { className: 'jwpet-opp-name' }, op.enemy.name),
                  h('span', { className: 'jwpet-opp-tag' + (op.enemy.elite ? ' jwpet-tag-elite' : '') },
                    op.tag + (op.enemy.elite ? ' · 精英' : ''))
                ),
                h('div', { className: 'jwpet-opp-meta' },
                  h('span', null, '等级 ' + op.enemy.level),
                  h('span', null, '气血 ' + op.enemy.maxHp),
                  h('span', null, '攻击 ' + op.enemy.atk)
                ),
                h('div', { className: 'jwpet-opp-row' },
                  h('span', { className: 'jwpet-opp-rate' }, '预估胜算 ' + op.rate + '%'),
                  h('button', {
                    className: 'jwpet-btn jwpet-btn-sm',
                    disabled: s.stamina < 10,
                    onClick: function () { challenge(idx); },
                  }, '挑战')
                )
              );
            })
          ),
          h('div', { className: 'jwpet-actions' },
            h('button', { className: 'jwpet-btn jwpet-btn-wide', onClick: refreshOpponents }, '换一批对手')
          )
        );
      }

      function renderTravel() {
        const tr = UI.travel;
        if (!tr) return null;
        if (tr.phase === 'select') {
          return h('div', { key: 'travel-select', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            h('div', { className: 'jwpet-view-head' },
              h('span', { className: 'jwpet-view-title' }, '游历 · 15 体力'),
              h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: closeTravel }, '返回首页')
            ),
            h('div', { className: 'jwpet-grid2' },
              DEST_ORDER.map(function (id) {
                const dest = DESTINATIONS[id];
                return h('button', {
                  key: id,
                  className: 'jwpet-dest',
                  disabled: s.stamina < 15,
                  onClick: function () { chooseDestination(id); },
                },
                  h('span', { className: 'jwpet-dest-name' }, dest.icon + ' ' + dest.name),
                  h('span', { className: 'jwpet-dest-desc' }, dest.desc)
                );
              })
            )
          );
        }
        const ev = tr.event;
        return h('div', { key: 'travel-event', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
          h('div', { className: 'jwpet-view-head' },
            h('span', { className: 'jwpet-view-title' },
              DESTINATIONS[tr.destId] ? DESTINATIONS[tr.destId].icon + ' ' + DESTINATIONS[tr.destId].name : '游历'),
            h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: closeTravel }, '返回首页')
          ),
          tr.result ? h('div', { className: 'jwpet-box-text', style: { color: '#c8a45d' } }, tr.result) : null,
          ev ? h('div', { className: 'jwpet-card-box' },
            h('div', { className: 'jwpet-box-title' }, ev.title),
            h('div', { className: 'jwpet-box-text' }, ev.text),
            h('div', { className: 'jwpet-options' },
              ev.options.map(function (opt, idx) {
                const disabled = opt.can ? !opt.can(s) : false;
                return h('button', {
                  key: idx,
                  className: 'jwpet-btn jwpet-btn-ghost',
                  disabled: disabled,
                  onClick: function () { pickTravelOption(opt); },
                }, opt.label);
              })
            )
          ) : null,
          tr.phase === 'done' ? h('div', { className: 'jwpet-actions' },
            h('button', { className: 'jwpet-btn', onClick: travelAgain }, '再走一趟'),
            h('button', { className: 'jwpet-btn', onClick: closeTravel }, '回首页')
          ) : null
        );
      }

      function renderSect() {
        if (!s.sect) {
          const cards = ['shaolin', 'emei', 'gaibang'].map(function (id) {
            const target = SECTS[id];
            const ok = target.gender === 'any' || target.gender === s.gender;
            return h('div', { key: id, className: 'jwpet-sect' },
              h('div', { className: 'jwpet-sect-head' },
                h('span', { className: 'jwpet-sect-name' }, target.icon + ' ' + target.name),
                h('span', { className: 'jwpet-sect-icon' }, ok ? '' : '性别不符')
              ),
              h('div', { className: 'jwpet-box-text' }, target.desc),
              h('div', { className: 'jwpet-skill-desc' },
                '门规：' + (target.gender === 'male' ? '只收男弟子' : target.gender === 'female' ? '只收女弟子' : '男女皆收')),
              h('button', {
                className: 'jwpet-btn jwpet-btn-wide',
                disabled: !ok,
                onClick: function () { actJoinSect(id); },
              }, ok ? '拜入' + target.name : '无法拜入')
            );
          });
          return h('div', { key: 'sect-none', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            h('div', { className: 'jwpet-box-text' }, '尚未拜师。加入门派可修习本门武学、获得门派称谓。'),
            cards
          );
        }
        const nextTitle = nextSectTitle(s);
        const learned = sec.skills.filter(function (sk) { return s.skills[sk.id]; }).length;
        return h('div', { key: 'sect-joined', style: { display: 'flex', flexDirection: 'column', gap: 6 } },
          h('div', { className: 'jwpet-sect jwpet-sect-on' },
            h('div', { className: 'jwpet-sect-head' },
              h('span', { className: 'jwpet-sect-name' }, sec.icon + ' ' + sec.name),
              h('span', { className: 'jwpet-skill-meta' }, sectTitleOf(s))
            ),
            h('div', { className: 'jwpet-box-text' }, sec.desc),
            h('div', { className: 'jwpet-skill-desc' },
              '武学 ' + learned + '/' + sec.skills.length
              + (nextTitle ? ' · 下一称谓「' + nextTitle.name + '」需 ' + nextTitle.lv + ' 级' : ' · 已至最高称谓')
              + ' · 技能点 ' + s.skillPoints)
          ),
          h('div', { className: 'jwpet-title-track' },
            sec.titles.map(function (tier, idx) {
              return h('span', {
                key: idx,
                className: 'jwpet-title-step' + (s.level >= tier.lv ? ' jwpet-title-on' : ''),
              }, tier.lv + '级 ' + tier.name);
            })
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
            sec.skills.map(function (sk) {
              const know = !!s.skills[sk.id];
              const canLearn = !know && s.level >= sk.lv && s.skillPoints >= sk.sp;
              return h('div', { key: sk.id, className: 'jwpet-skill' },
                h('div', { className: 'jwpet-skill-main' },
                  h('span', { className: 'jwpet-skill-name' }, sk.name + (know ? ' ✓' : '')),
                  h('span', { className: 'jwpet-skill-desc' }, sk.desc)
                ),
                h('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
                  h('span', { className: 'jwpet-skill-meta' },
                    know ? '已习得' : sk.lv + ' 级 · ' + sk.sp + ' 点'),
                  know ? null : h('button', {
                    className: 'jwpet-btn jwpet-btn-sm',
                    disabled: !canLearn,
                    onClick: function () { actLearnSkill(sk); },
                  }, '修习')
                )
              );
            })
          )
        );
      }

      function renderGrowth() {
        const achNodes = ACHIEVEMENTS.map(function (a) {
          const on = !!s.ach[a.id];
          return h('div', {
            key: a.id,
            className: 'jwpet-ach-item' + (on ? ' jwpet-ach-on' : ' jwpet-ach-off'),
          },
            h('span', { className: 'jwpet-ach-title' }, (on ? '✦ ' : '◇ ') + a.title),
            h('span', { className: 'jwpet-ach-desc' }, a.desc)
          );
        });
        const records = s.growth.slice(-20).reverse();
        return h('div', { key: 'growth', style: { display: 'flex', flexDirection: 'column', gap: 7 } },
          h('div', { className: 'jwpet-box-title' }, '江湖成就'),
          h('div', { className: 'jwpet-ach' }, achNodes),
          h('div', { className: 'jwpet-box-title' }, '江湖纪事'),
          records.length
            ? h('div', { className: 'jwpet-growth' },
              records.map(function (rec, idx) {
                return h('div', { key: idx, className: 'jwpet-growth-item' },
                  h('div', { className: 'jwpet-growth-title' }, rec.title),
                  h('div', { className: 'jwpet-growth-text' }, rec.text)
                );
              })
            )
            : h('div', { className: 'jwpet-empty' }, '还没有值得记下的事。')
        );
      }

      function renderSettings() {
        return h('div', { key: 'settings', style: { display: 'flex', flexDirection: 'column', gap: 7 } },
          h('div', { className: 'jwpet-box-title' }, '角色'),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '名号'),
            h('input', {
              className: 'jwpet-input',
              value: UI.settingsName,
              maxLength: 12,
              onChange: function (e) { UI.settingsName = e.target.value; rerender(); },
            }),
            h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: actSaveProfile }, '保存')
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '性别'),
            h('div', { className: 'jwpet-seg' },
              h('button', {
                className: 'jwpet-seg-btn' + (s.gender === 'male' ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetGender('male'); },
              }, '男'),
              h('button', {
                className: 'jwpet-seg-btn' + (s.gender === 'female' ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetGender('female'); },
              }, '女')
            )
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '门派'),
            h('span', { className: 'jwpet-row-v' }, sec ? sec.name + ' · ' + sectTitleOf(s) : '未拜师'),
            h('button', {
              className: 'jwpet-btn jwpet-btn-sm',
              onClick: function () { setTab('sect'); },
            }, '前往门派')
          ),
          h('div', { className: 'jwpet-box-title' }, '界面参数'),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '卡片尺寸'),
            h('div', { className: 'jwpet-seg' },
              ['compact', 'standard', 'large'].map(function (size) {
                return h('button', {
                  key: size,
                  className: 'jwpet-seg-btn' + (s.settings.size === size ? ' jwpet-seg-on' : ''),
                  onClick: function () { actSetSetting('size', size); },
                }, size === 'compact' ? '紧凑' : size === 'standard' ? '标准' : '舒展');
              })
            )
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '贴边吸附'),
            h('div', { className: 'jwpet-seg' },
              h('button', {
                className: 'jwpet-seg-btn' + (s.settings.snap ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('snap', true); },
              }, '开'),
              h('button', {
                className: 'jwpet-seg-btn' + (!s.settings.snap ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('snap', false); },
              }, '关')
            )
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '折叠时淡出'),
            h('div', { className: 'jwpet-seg' },
              h('button', {
                className: 'jwpet-seg-btn' + (s.settings.autoHide ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('autoHide', true); },
              }, '开'),
              h('button', {
                className: 'jwpet-seg-btn' + (!s.settings.autoHide ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('autoHide', false); },
              }, '关')
            )
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '自动保存'),
            h('div', { className: 'jwpet-seg' },
              h('button', {
                className: 'jwpet-seg-btn' + (s.settings.autosave ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('autosave', true); },
              }, '开'),
              h('button', {
                className: 'jwpet-seg-btn' + (!s.settings.autosave ? ' jwpet-seg-on' : ''),
                onClick: function () { actSetSetting('autosave', false); },
              }, '关')
            )
          ),
          h('div', { className: 'jwpet-box-title' }, '存档'),
          h('div', { className: 'jwpet-actions' },
            h('button', { className: 'jwpet-btn', onClick: actExport }, '导出存档'),
            h('label', { className: 'jwpet-btn', style: { textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' } },
              '导入存档',
              h('input', {
                type: 'file',
                accept: '.json,application/json',
                style: { display: 'none' },
                onChange: actImportFile,
              })
            )
          ),
          h('div', { className: 'jwpet-row' },
            h('span', { className: 'jwpet-row-k' }, '位置'),
            h('button', { className: 'jwpet-btn jwpet-btn-sm', onClick: resetPos }, '回到默认角落')
          ),
          h('div', { className: 'jwpet-foot' },
            h('button', { className: 'jwpet-link', onClick: actReset }, '重置整个江湖')
          ),
          h('div', { className: 'jwpet-box-text', style: { opacity: 0.65 } },
            '存档保存在本机浏览器（key: desktop-jianghu.save.v1），每 5 秒自动保存。'
            + '提示：网页插件无法绘制到 DSH 窗口之外，贴边吸附作用于窗口四边。')
        );
      }

      /* --- shell ------------------------------------------------------ */

      const tabDefs = [
        { id: 'home', label: t('tabHome') },
        { id: 'sect', label: t('tabSect') },
        { id: 'growth', label: t('tabGrowth') },
        { id: 'settings', label: t('tabSettings') },
      ];

      let bodyNodes = null;
      if (!s.setup) {
        bodyNodes = renderOnboarding();
      } else if (UI.view === 'battle') {
        bodyNodes = renderBattle();
      } else if (UI.view === 'travel') {
        bodyNodes = renderTravel();
      } else if (UI.tab === 'sect') {
        bodyNodes = renderSect();
      } else if (UI.tab === 'growth') {
        bodyNodes = renderGrowth();
      } else if (UI.tab === 'settings') {
        bodyNodes = renderSettings();
      } else {
        bodyNodes = renderHome();
      }

      const tabs = s.setup ? h('div', { key: 'tabs', className: 'jwpet-tabs' },
        tabDefs.map(function (tab) {
          const hasDot = (tab.id === 'home' && s.potential > 0)
            || (tab.id === 'sect' && s.sect && s.skillPoints > 0);
          return h('button', {
            key: tab.id,
            className: 'jwpet-tab' + (UI.tab === tab.id && UI.view === 'home' ? ' jwpet-tab-on' : ''),
            onClick: function () { setTab(tab.id); },
          },
            tab.label,
            hasDot ? h('span', { className: 'jwpet-tab-dot' }) : null
          );
        })
      ) : null;

      const card = h('div', {
        key: 'card',
        ref: cardRef,
        className: 'jwpet-card' + (s.dock ? ' jwpet-dock-' + s.dock : ''),
        style: {
          position: 'fixed',
          left: pos.x + 'px',
          top: pos.y + 'px',
          width: cardWidth(s.settings) + 'px',
          zIndex: 60,
          pointerEvents: 'auto',
          userSelect: 'none',
        },
      },
        h('style', { key: 'style' }, CSS),
        h('div', {
          key: 'head',
          className: 'jwpet-head',
          onPointerDown: onPointerDown,
          onPointerMove: onPointerMove,
          onPointerUp: onPointerUp,
          onPointerCancel: onPointerUp,
          onDoubleClick: resetPos,
        },
          h('div', { key: 'main', style: { minWidth: 0 } },
            h('div', { className: 'jwpet-title' }, t('title')),
            h('div', { className: 'jwpet-sub' },
              s.name + ' · ' + (s.gender === 'female' ? '女' : '男')
              + ' · ' + (sec ? sec.name + '·' + sectTitleOf(s) : titleOf(s.level))
              + ' · ' + t('levelShort') + ' ' + s.level)
          ),
          h('div', { key: 'head-actions', style: { display: 'flex', gap: 4 } },
            h('button', {
              key: 'collapse',
              className: 'jwpet-icon-btn',
              title: t('collapse'),
              onClick: function (e) { e.stopPropagation(); collapse(); },
            }, '—')
          )
        ),
        tabs,
        h('div', { key: 'body', className: 'jwpet-body' }, bodyNodes)
      );

      if (s.collapsed) {
        return h(React.Fragment, null,
          h('style', { key: 'style' }, CSS),
          h('button', {
            key: 'pill',
            className: 'jwpet-pill' + (s.settings.autoHide ? ' jwpet-pill-hidden' : ''),
            style: {
              position: 'fixed',
              left: pos.x + 'px',
              top: pos.y + 'px',
              zIndex: 60,
              pointerEvents: 'auto',
              userSelect: 'none',
            },
            onPointerDown: onPointerDown,
            onPointerMove: onPointerMove,
            onPointerUp: onPillUp,
            onPointerCancel: onPillUp,
            title: t('expand'),
          },
            h('span', { key: 'dot', className: 'jwpet-pill-dot' }),
            h('span', { key: 'name' }, s.name || t('title')),
            h('span', { key: 'lv', className: 'jwpet-pill-lv' }, t('levelShort') + ' ' + s.level),
            s.potential > 0
              ? h('span', { key: 'badge', className: 'jwpet-pill-badge' }, s.potential)
              : null
          )
        );
      }

      return h(React.Fragment, null, card, renderToast());
    }

    /* ------------------------------------------------------------------ */
    /* Client plugin                                                       */
    /* ------------------------------------------------------------------ */

    /* ================================================================== */
    /* V3 · data                                                           */
    /* ================================================================== */

    const V3_VERSION = 3;
    const V3_TABS = ['home', 'quest', 'sect', 'equip', 'growth', 'settings'];
    const HIDDEN_NEED = { int: 60, agi: 60 };
    const SECT_KEYS = ['shaolin', 'emei', 'gaibang'];

    /* 五式武学：10 级入门、25 级第二式（随晋级自得），45 / 70 级需技能点，
       100 级终式由终局分支决定。 */
    const SKILL_TREE = {
      shaolin: {
        base: [
          { id: 'sl_jinzhong', name: '金钟罩', lv: 10, sp: 0, desc: '被动 · 防御 +18%', pass: { defPct: 0.18 } },
          { id: 'sl_fumo', name: '伏魔棍法', lv: 25, sp: 0, desc: '战斗 · 伤害 +10%', pass: { dmgPct: 0.10 } },
          { id: 'sl_yijin', name: '易筋经', lv: 45, sp: 5, desc: '被动 · 修炼 +25%，气血 +12%', pass: { trainPct: 0.25, hpPct: 0.12 } },
          { id: 'sl_wuxiang', name: '无相劫指', lv: 70, sp: 8, desc: '战斗 · 15% 破防，暴击伤害 +20%', pass: { armorPenChance: 0.15, critDmg: 0.2 } },
        ],
        finals: [
          { id: 'sl_hongchen', name: '红尘禅杖', desc: '战斗 · 伤害 +20%，气血 +15%', pass: { dmgPct: 0.20, hpPct: 0.15 } },
          { id: 'sl_rulai', name: '如来神掌', desc: '战斗 · 暴击 +12%，破防 +10%', pass: { critAdd: 0.12, armorPenChance: 0.10 } },
        ],
      },
      emei: {
        base: [
          { id: 'em_qingxin', name: '清心诀', lv: 10, sp: 0, desc: '战斗 · 每 3 回合回复 4% 气血', pass: { regenPct: 0.04 } },
          { id: 'em_feixu', name: '飞絮剑法', lv: 25, sp: 0, desc: '战斗 · 伤害 +8%，身法 +6%', pass: { dmgPct: 0.08, spdPct: 0.06 } },
          { id: 'em_miejuejian', name: '灭绝剑意', lv: 45, sp: 5, desc: '战斗 · 暴击 +8%', pass: { critAdd: 0.08 } },
          { id: 'em_foguang', name: '佛光普照', lv: 70, sp: 8, desc: '战斗 · 气血低于 40% 时回复 12%（每场一次）', pass: { emergencyHeal: 0.12 } },
        ],
        finals: [
          { id: 'em_yitian', name: '倚天剑诀', desc: '战斗 · 伤害 +18%，暴击伤害 +25%', pass: { dmgPct: 0.18, critDmg: 0.25 } },
          { id: 'em_yunv', name: '玉女心经', desc: '战斗 · 每 3 回合回复 8%，气血 +12%', pass: { regenPct: 0.08, hpPct: 0.12 } },
        ],
      },
      gaibang: {
        base: [
          { id: 'gb_dagou', name: '打狗棒法', lv: 10, sp: 0, desc: '战斗 · 暴击 +6%', pass: { critAdd: 0.06 } },
          { id: 'gb_xianglong', name: '降龙十八掌', lv: 25, sp: 0, desc: '战斗 · 伤害 +12%', pass: { dmgPct: 0.12 } },
          { id: 'gb_qigai', name: '乞丐功', lv: 45, sp: 5, desc: '被动 · 体力恢复 +40%，银两 +20%', pass: { staPct: 0.4, silverPct: 0.2 } },
          { id: 'gb_xiaoyao', name: '逍遥游', lv: 70, sp: 8, desc: '战斗 · 闪避 +8%', pass: { dodgeAdd: 0.08 } },
        ],
        finals: [
          { id: 'gb_jinbang', name: '金榜题名', desc: '战斗 · 暴击 +10%，伤害 +10%', pass: { critAdd: 0.10, dmgPct: 0.10 } },
          { id: 'gb_kuihua', name: '葵花宝典', desc: '战斗 · 伤害 +25%，身法 +20%', pass: { dmgPct: 0.25, spdPct: 0.20 } },
        ],
      },
    };

    /* 100 级终局：7 个选择（少林 2、峨嵋 2、丐帮 3——含非隐藏的屠龙） */
    const ENDINGS = {
      shaolin: [
        { id: 'shaolin_rush', name: '遁入红尘', desc: '还俗入世，杖走天涯', skill: 'sl_hongchen', weapon: 'jue_hongchen' },
        { id: 'shaolin_monk', name: '得道高僧', desc: '青灯古佛，普度众生', skill: 'sl_rulai', weapon: 'jue_rulai' },
      ],
      emei: [
        { id: 'emei_forget', name: '忘情入谷', desc: '绝情断念，剑心如冰', skill: 'em_yitian', weapon: 'jue_yitian' },
        { id: 'emei_love', name: '生死相随', desc: '执手江湖，剑侣同归', skill: 'em_yunv', weapon: 'jue_qingshuang' },
      ],
      gaibang: [
        { id: 'gaibang_jinbang', name: '金榜题名', desc: '文武登科，庙堂江湖', skill: 'gb_jinbang', weapon: 'jue_jinbang', need: { stat: 'int', n: HIDDEN_NEED.int } },
        { id: 'gaibang_kuihua', name: '葵花宝典', desc: '阴阳倒转，身化葵花', skill: 'gb_kuihua', weapon: 'jue_xiuhua', need: { stat: 'agi', n: HIDDEN_NEED.agi } },
        { id: 'gaibang_tulong', name: '屠龙之志', desc: '不履庙堂，不堕魔道，长刀屠龙', skill: null, weapon: 'jue_tulong', fallback: true },
      ],
    };

    const HIDDEN_ENDINGS = {
      gaibang_jinbang: { id: 'gaibang_jinbang', name: '金榜题名', desc: '朝中来使，以布防图换功名。你提笔写下「兵者，止戈也」', stat: 'int' },
      gaibang_kuihua: { id: 'gaibang_kuihua', name: '葵花宝典', desc: '城破之夜，阿棠失踪，只留半部《葵花宝典》。练成后阴阳倒转', stat: 'agi' },
    };

    const JUE_WORLD = {
      jue_hongchen: { name: '红尘禅杖', atk: 158, hp: 240 },
      jue_rulai: { name: '如来佛杖', atk: 176, hp: 300 },
      jue_yitian: { name: '倚天', atk: 184, hp: 200 },
      jue_qingshuang: { name: '青霜', atk: 170, hp: 260 },
      jue_jinbang: { name: '金榜笔', atk: 166, hp: 220 },
      jue_xiuhua: { name: '绣花针', atk: 150, hp: 180, spd: 90 },
      jue_tulong: { name: '屠龙', atk: 190, hp: 280 },
    };

    const WEAPON_NAMES = {
      shaolin: ['木棍', '齐眉棍', '镔铁棍', '行者棍', '伏魔杖', '降魔杵', '禅杖', '盘龙杖', '韦陀杵',
        '罗汉杖', '般若杵', '达摩杖', '菩提杖', '伏虎禅杖', '降龙禅杖', '金刚降魔杵', '大光明杖', '无相禅杖', '大雄宝杖'],
      emei: ['木剑', '竹剑', '青锋剑', '轻云剑', '飞絮剑', '落英剑', '流云剑', '霜华剑', '秋水剑',
        '明月剑', '清霜剑', '玉女剑', '金顶剑', '铁莲剑', '莲花剑', '寒玉剑', '冰魄剑', '天罡剑', '金顶倚天剑'],
      gaibang: ['竹棒', '木棒', '铁棒', '打狗棒', '青竹棒', '狼牙棒', '熟铜棒', '混铁棒', '钢杖',
        '龙头杖', '盘龙杖', '铁拐', '竹节杖', '破风棍', '伏魔棍', '降龙棍', '打狗神杖', '青龙杖', '龙头破天杖'],
    };

    const ARMOR_NAMES = {
      shaolin: ['布衣', '短打', '粗布僧衣', '灰僧袍', '罗汉衫', '铁线僧衣', '达摩衣', '青布僧袍', '锦襕袈裟',
        '紫金袈裟', '金线袈裟', '盘龙袈裟', '般若禅衣', '大悲禅衣', '伏魔袈裟', '金刚禅衣', '五彩织锦袈裟', '无相法衣', '大雄法衣'],
      emei: ['素衣', '青裙', '剑袖衫', '罗裙', '云纹衣', '水袖衫', '轻罗衣', '飞霞衫', '雪羽衣',
        '青鸾衣', '月华衣', '玉女衫', '金顶羽衣', '莲花法衣', '寒玉衣', '冰绡衣', '天罡道袍', '紫霞仙衣', '金顶霞衣'],
      gaibang: ['破衣', '补丁衫', '百衲衣', '粗布褂', '牛皮褂', '铁片衣', '护心褂', '鱼鳞甲', '锁子甲',
        '铁线衣', '玄铁甲', '百炼甲', '龙鳞甲', '盘龙甲', '伏虎甲', '降龙甲', '打狗神甲', '青龙宝甲', '屠龙战甲'],
    };

    const EQUIP_QUALITIES = [
      { id: 'broken', name: '损坏', mul: 0.70, price: 0.45 },
      { id: 'private', name: '私制', mul: 1.00, price: 1.00 },
      { id: 'official', name: '官制', mul: 1.35, price: 1.90 },
    ];

    /* 主线：1~10 级共用，10 级拜师后按门派分支 */
    const QUEST_COMMON = [
      {
        id: 'c1', lv: 1, title: '第一章 · 风起洛阳',
        text: '大朔末年，北虏叩关，江湖传言《武穆遗书》残卷入洛。你这日进城，正撞见丐帮弟子与黑衣人争夺一只木匣；一名白衣女侠自檐上出剑，少林僧人合十拦在巷口。匣子碎开，残页四散，四人各得一片。',
        reward: { silver: 120, exp: 0.5 },
      },
      {
        id: 'c2', lv: 5, title: '第二章 · 山门拜师',
        text: '残页上只有半句话：「兵者，止戈也。」你带着它走遍三山五岳。少林说禅，峨嵋论剑，丐帮讲的是一个「义」字。师父领进门，修行在个人——先选一个山门，再谈江湖。',
        reward: { silver: 180, exp: 0.8, skillPoint: 1 },
      },
    ];

    const QUEST_SECT = {
      shaolin: [
        {
          id: 's1', lv: 15, title: '第三章 · 无尘下山',
          text: '方丈命无尘携残页下山，查「黑衣人」来历。无尘在黄河渡口撞见苏青霜，她身后跟着个笑嘻嘻的丐帮少年陆九霄，和个总与他拌嘴的姑娘阿棠。残页拼合，缺的正是北境边防图。',
          reward: { silver: 220, exp: 0.4 },
        },
        {
          id: 's2', lv: 25, title: '第四章 · 古刹夜火',
          text: '少林下院夜半失火，经阁被翻得狼藉。无尘追至后山，见黑衣首领袖口绣着一枚狼头——北虏细作。苏青霜赶到替他挡下一掌。陆九霄蹲在墙头啃鸡腿：「欠我一条命，记账。」',
          reward: { silver: 300, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 's3', lv: 40, title: '第五章 · 遗书残卷',
          text: '遗书原是前朝将军所留：北境十三城布防，与一句「山河未复，吾辈何以为家」。阿棠从丐帮分舵带回消息：细作已在少林埋下暗桩。无尘沉默半日，把经书锁进塔里。',
          reward: { silver: 460, exp: 0.5 },
        },
        {
          id: 's4', lv: 55, title: '第六章 · 血河渡',
          text: '血河渡一战，各派围剿细作。苏青霜为救无尘坠入激流，陆九霄断后重伤，阿棠背着他走了三十里夜路。细作首领大笑：「你们守的是残卷，还是心里那点不甘？」',
          reward: { silver: 620, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 's5', lv: 70, title: '第七章 · 佛前灯',
          text: '少林重开山门。方丈问无尘：残卷已合，你是留下守灯，还是下山入世？他望着山门外三个身影，灯焰晃了晃。',
          reward: { silver: 800, exp: 0.5 },
        },
        {
          id: 's6', lv: 80, title: '第八章 · 佛前一问', choice: true,
          text: '山门口的雪落了整夜。苏青霜在阶下等，陆九霄在马上等，阿棠把酒温了又凉。无尘跪下磕了三个头。方丈叹道：「红尘与青灯，都在这条路上。」',
          reward: { silver: 1000, exp: 0.6 },
        },
      ],
      emei: [
        {
          id: 'e1', lv: 15, title: '第三章 · 金顶来客',
          text: '峨嵋金顶封山三年，苏青霜第一次下山，为查师父之死。她在洛水边遇见少林和尚无尘——他竟认得她手中那半页残卷。同行的丐帮陆九霄嘴欠：「女侠，剑借我摸摸？」阿棠揪住他耳朵。',
          reward: { silver: 220, exp: 0.4 },
        },
        {
          id: 'e2', lv: 25, title: '第四章 · 师门血案',
          text: '峨嵋旧案卷宗被烧，唯一的证人是个疯癫更夫。苏青霜守在破庙三日，等来的是黑衣人灭口。她一剑刺出，却见对方袖口狼头——与灭门凶手同源。无尘替她按住剑：「留活口。」',
          reward: { silver: 300, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 'e3', lv: 40, title: '第五章 · 断情崖',
          text: '断情崖上，师太留下遗书：当年为护遗书，师门二十三口尽灭。苏青霜坐到崖边，像要把自己坐成一块石头。阿棠递来一碗酒：「姐姐，我陪你骂一夜。」陆九霄难得没笑，无尘远远站到天明。',
          reward: { silver: 460, exp: 0.5 },
        },
        {
          id: 'e4', lv: 55, title: '第六章 · 剑雪同归',
          text: '北虏细作约战千雪峰。苏青霜以一人一剑破阵，无尘的禅杖替她挡下背后冷箭。事后无尘问她：此间事了，你往何处去？她把剑横在膝上，没答。',
          reward: { silver: 620, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 'e5', lv: 70, title: '第七章 · 剑心',
          text: '峨嵋掌门将死，衣钵与「忘情」心法一并交给苏青霜。修忘情，则剑心通明，须断尽牵挂；不修，此生剑上永远缺一分。她看着腕上那串旧佛珠，一夜无眠。',
          reward: { silver: 800, exp: 0.5 },
        },
        {
          id: 'e6', lv: 80, title: '第八章 · 崖上问剑', choice: true,
          text: '千雪峰顶，三人在等她。无尘说：「你说去哪，我便去哪。」陆九霄把酒壶一扔：「我丐帮兄弟都听你的。」阿棠别过脸去。苏青霜闭目，再睁眼时剑光映着雪。',
          reward: { silver: 1000, exp: 0.6 },
        },
      ],
      gaibang: [
        {
          id: 'g1', lv: 15, title: '第三章 · 叫花子的规矩',
          text: '丐帮分舵的规矩：讨来的钱，一半给饿肚子的，另一半给更饿的。陆九霄把弟子令牌塞给你时，正撞见阿棠偷藏了只烧鸡——给城外流民。残卷的事，就从这档子鸡毛蒜皮里漏了出来。',
          reward: { silver: 220, exp: 0.4 },
        },
        {
          id: 'g2', lv: 25, title: '第四章 · 市井消息',
          text: '丐帮耳目遍天下。你在茶楼听来个消息：北边皮货商年年来往，把边关布防当货物卖。陆九霄拍桌去查，阿棠悄悄跟在后头，被他一枚铜钱弹中脑门：「回去！」',
          reward: { silver: 300, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 'g3', lv: 40, title: '第五章 · 分舵夜宴',
          text: '北虏细作混进分舵，在酒里下了药。陆九霄替阿棠喝下那碗酒，倒地前还笑：「你欠我九十三只烧鸡。」阿棠背着他闯出三条街，你在后死死挡住追兵。',
          reward: { silver: 460, exp: 0.5 },
        },
        {
          id: 'g4', lv: 55, title: '第六章 · 山河一诺',
          text: '遗书合在你手中。陆九霄把布防图摊在破庙地上：「咱们叫花子不懂打仗，但懂谁家孩子饿过肚子。」阿棠问这一路值不值。你说：值。',
          reward: { silver: 620, exp: 0.5, skillPoint: 1 },
        },
        {
          id: 'g5', lv: 70, title: '第七章 · 帮主之令',
          text: '老帮主战死，遗命陆九霄接任。他却在夜里把打狗棒塞给你：「这根棒子我拿不稳了。」阿棠笑他怂，笑着笑着红了眼。远处火光，是北虏前锋。江湖与庙堂，该选了。',
          reward: { silver: 800, exp: 0.5 },
        },
        {
          id: 'g6', lv: 80, title: '第八章 · 叫花子的江湖', noChoice: true,
          text: '北境告急。丐帮召集天下分舵，陆九霄在城头摆下一百只破碗：「此去边关，有死的没有退的。」阿棠把最后一碗酒递给你，正要接过，身后马蹄声起——朝中有人来了。',
          reward: { silver: 1000, exp: 0.6, skillPoint: 1 },
        },
      ],
    };

    /* 100 级终章（终局分支 / 丐帮隐藏分支共用） */
    const FINAL_TEXT = {
      shaolin: '北境十三城重归版图。少林钟声里，你已是方丈口中的「那个人」。红尘与青灯，你终究只选了一条。',
      emei: '千雪峰的雪化了又落。峨嵋金顶重开，剑上那分缺与不缺，都由你自己补全。',
      gaibang: '叫花子的破碗摆到了边关城头。江湖没有散，只是换了种活法。',
    };

    /* 主线委托：每章若干要求，全部完成后才能领取章节。t = win/elite/travel/dest/equip */
    const QUEST_TASKS = {
      c1: [{ t: 'win', n: 1 }, { t: 'travel', n: 1 }],
      c2: [{ t: 'win', n: 2 }, { t: 'travel', n: 2 }],
      s1: [{ t: 'win', n: 3 }, { t: 'travel', n: 2 }],
      s2: [{ t: 'win', n: 4 }, { t: 'elite', n: 1 }],
      s3: [{ t: 'win', n: 5 }, { t: 'dest', n: 2, dest: 'shenshan' }, { t: 'equip', n: 2 }],
      s4: [{ t: 'win', n: 6 }, { t: 'elite', n: 2 }, { t: 'travel', n: 3 }],
      s5: [{ t: 'win', n: 8 }, { t: 'equip', n: 3 }],
      s6: [{ t: 'win', n: 10 }, { t: 'elite', n: 3 }, { t: 'travel', n: 5 }],
      e1: [{ t: 'win', n: 3 }, { t: 'travel', n: 2 }],
      e2: [{ t: 'win', n: 4 }, { t: 'elite', n: 1 }],
      e3: [{ t: 'win', n: 5 }, { t: 'dest', n: 2, dest: 'hupo' }, { t: 'equip', n: 2 }],
      e4: [{ t: 'win', n: 6 }, { t: 'elite', n: 2 }, { t: 'travel', n: 3 }],
      e5: [{ t: 'win', n: 8 }, { t: 'equip', n: 3 }],
      e6: [{ t: 'win', n: 10 }, { t: 'elite', n: 3 }, { t: 'travel', n: 5 }],
      g1: [{ t: 'win', n: 3 }, { t: 'travel', n: 2 }],
      g2: [{ t: 'win', n: 4 }, { t: 'elite', n: 1 }],
      g3: [{ t: 'win', n: 5 }, { t: 'dest', n: 2, dest: 'shijing' }, { t: 'equip', n: 2 }],
      g4: [{ t: 'win', n: 6 }, { t: 'elite', n: 2 }, { t: 'travel', n: 3 }],
      g5: [{ t: 'win', n: 8 }, { t: 'equip', n: 3 }],
      g6: [{ t: 'win', n: 10 }, { t: 'elite', n: 3 }, { t: 'travel', n: 5 }],
    };

    /* 商铺随机品质权重（每 5 分钟刷新一次） */
    const SHOP_QUALITY_WEIGHTS = [
      { id: 'broken', w: 0.30 },
      { id: 'private', w: 0.50 },
      { id: 'official', w: 0.20 },
    ];

    /* 每章委托的「提交方式」：银子打点或交出一件装备，二选一。
       选择会影响后续主线的口风与章节奖励（银两线偏财，装备线偏修为）。 */
    const QUEST_ALT = {
      c1: null,
      c2: { silver: 150 },
      s1: { silver: 200 }, s2: { silver: 280 }, s3: { silver: 420 },
      s4: { silver: 560 }, s5: { silver: 720 }, s6: { silver: 900 },
      e1: { silver: 200 }, e2: { silver: 280 }, e3: { silver: 420 },
      e4: { silver: 560 }, e5: { silver: 720 }, e6: { silver: 900 },
      g1: { silver: 200 }, g2: { silver: 280 }, g3: { silver: 420 },
      g4: { silver: 560 }, g5: { silver: 720 }, g6: { silver: 900 },
    };

    const TASK_INTRO = {
      c1: '初入江湖，先在擂台上让人记住你的名字。',
      c2: '山门未定，先交一份投名状。',
      s1: '下山第一程，风吹的都是陌生的名字。',
      s2: '古刹火起，禅心也要见血。',
      s3: '残卷在手，江湖人都盯着你的行囊。',
      s4: '血河渡口，退一步便是万丈深渊。',
      s5: '佛前灯下，总要有人提刀。',
      s6: '雪落山门，红尘与青灯只隔一步。',
      e1: '金顶封山三年，你第一次走下石阶。',
      e2: '旧案重提，证人的血还未冷。',
      e3: '断情崖上，风比剑更冷。',
      e4: '千雪峰头，一剑要挡三面来风。',
      e5: '剑心蒙尘，需以血拭之。',
      e6: '崖上雪落，故人都在等你一句话。',
      g1: '叫花子的规矩，是先把肚子填饱。',
      g2: '市井耳目遍天下，消息比银子值钱。',
      g3: '分舵夜宴，酒里有毒，刀在桌下。',
      g4: '破庙摊开布防图，江山压在一群叫花子肩上。',
      g5: '帮主战死，打狗棒递到你面前。',
      g6: '城头一百只破碗，盛的是江湖最后一口气。',
    };

    const ALT_FLAVOR = {
      silver: '（你以银两打点，官府与镖行都记下这份人情，往后办事顺畅许多。）',
      equip: '（你以兵器相赠，江湖渐传你仗义疏财之名，豪客愿与你结交。）',
    };

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
          if (!S) return;
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
          refresh();
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
                className: 'jw3-input', value: UI3.onboardName,
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
                const nm = (UI3.onboardName || '').trim().slice(0, 12);
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

    return {
      inject: ['slots', 'locale'],
      apply: function apply(ctx) {
        const disposers = [];
        function tryRegister(locale, dict) {
          try {
            disposers.push(ctx.locale.register('desktop-jianghu', locale, dict));
          } catch (err) {
            /* an unavailable locale registration keeps the built-in dictionary */
          }
        }
        tryRegister('zh-CN', ZH);
        tryRegister('zh', ZH);
        tryRegister('en', EN);
        tryRegister('en-US', EN);
        try {
          const bound = ctx.locale.bind('desktop-jianghu');
          t = function (key) {
            const value = bound(key);
            return value === key && ZH[key] !== undefined ? ZH[key] : value;
          };
        } catch (err) {
          t = function (key) { return ZH[key] !== undefined ? ZH[key] : key; };
        }
        ctx.slots.inject('shell.overlay', function () {
          return ctx.slots.register({
            name: 'shell.overlay',
            id: 'desktop-jianghu',
            order: 100,
          }, JianghuPetV3);
        });
        ctx.effect(function () {
          return function () {
            for (let i = 0; i < disposers.length; i += 1) {
              try { disposers[i](); } catch (err) { /* already removed */ }
            }
          };
        });
      },
    };
  },
});
