# 开发指南

仓库使用「源码拆分 + 单文件产物」的方式组织：`client.js` 是提交进仓库的
**构建产物**，由 `scripts/build.cjs` 从 `src/` 拼接生成。修改游戏请改 `src/`，
然后重新 build。

## 环境

- Node.js ≥ 18
- npm（安装开发依赖；仓库含 `package-lock.json`，推荐 `npm ci`）

```bash
npm ci
```

开发依赖：`jsdom`（UI 冒烟）、`react` / `react-dom`（预览页与冒烟测试使用
React 18 UMD / CJS 版本，运行时由 DSH 的浏览器模块表提供，不需要打包进产物）。

## 常用命令

```bash
npm run build     # 从 src/ 生成 client.js（带完整性校验）
npm test          # jsdom 冒烟测试（70 项）
npm run dev:preview   # 本地静态预览服务 http://localhost:5173/dev/preview.html
node dev/balance.cjs 200   # 平衡采样（三门派 × 7 等级 × 3 套配置）
```

## 目录

```
src/
  shell.js      宿主外壳：模块加载、通用工具、旧版组件与 apply()
  v3-data.js    静态数据：门派/称号/武学/事件/任务/装备/绝世
  v3-core.js    游戏逻辑：状态、修炼、比武、任务、装备、商店、平衡
  v3-ui.js      React UI：注册组件 JianghuPetV3（shell.overlay）
scripts/
  build.cjs     src/ → client.js 拼接与校验
tests/
  smoke.cjs     在 jsdom 中挂载真实 client.js，驱动 UI 断言
dev/
  preview.html  离线预览页（支持 ?scene=&theme=light）
  serve.cjs     预览用静态服务器
  balance.cjs   胜率采样脚本
```

## 预览页

`dev/preview.html` 通过 `<script src="../client.js">` 直接加载构建产物，并用
`window.__ModuleLoader__` 的 stub 捕获模块，因此不需要启动 DSH 就能调 UI。

```bash
npm run dev:preview
# 打开 http://localhost:5173/dev/preview.html
# 场景：?scene=home|onboard|battle0|battle|battle2|travel|travel2|travel3|
#              quest|questalt|sect|equip|equip2|shop|shop2|settings|growth|
#              gaibang|ending|collapsed|pill|max|female|low|interact
# 明暗主题：追加 &theme=light
```

## 冒烟测试

`tests/smoke.cjs` 用 jsdom 挂载真实模块，覆盖：引导/六页签/加点/长按加点/
比武（初始满血、结算、战后回血）/游历（单次选择、方向计数）/门派技能与六阶
称号/装备购买/穿戴/出售/主线委托与人情二选一/大力丸与忘忧丹/设置只读/
100 级满级等 70 项断言。

## 平衡采样

`dev/balance.cjs` 通过注入钩子读取工厂闭包内的游戏函数，对
强/中/弱三套 build 在 15–100 级分别模拟三档对手胜率，用于调整 `v3MakeEnemy`
的系数。修改系数后建议跑一次对比。

## Client 模块约定

- `client.js` 必须且只能包含一个 `window.__ModuleLoader__.load({ id, factory })`，
  其中 `id` 必须等于 `package.json` 的包名 `dsh-desktop-jianghu`。
- React 通过 `require('react')` 获取；不要打包 React。
- 悬浮卡注册在 `shell.overlay`（list 槽），条目自行开启 `pointerEvents`。
- 不写组件外的 DOM、不使用 iframe；样式继承 DSH 主题 token（`--dsw-alias-*`）。
- 修改 `src/shell.js` 或 `src/v3-*.js` 后务必 `npm run build && npm test`。
