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
