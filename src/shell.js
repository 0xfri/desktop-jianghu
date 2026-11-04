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
          }, JianghuPet);
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
