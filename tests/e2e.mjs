// 実ブラウザ（Chromium）で主要導線を検査する。
// 使い方: node tests/e2e.mjs   （事前に npm run build。サーバーは自動で起動）
// 環境変数 CHROMIUM_PATH で実行ファイルを指定可能。SHOTS=<dir> でスクリーンショットを保存。
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PORT = 8123;
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}/`; // 例: BASE_URL=https://r0ze998.github.io/onchain-game-atlas/ で公開サイトを検査
const SHOTS = process.env.SHOTS;
const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);

const server = spawn(process.execPath, [path.join(ROOT, 'scripts/serve.mjs'), String(PORT)], { stdio: 'pipe' });
await new Promise((r) => server.stdout.once('data', r));
const data = (() => {
  const src = fs.readFileSync(path.join(ROOT, 'site/data.generated.js'), 'utf8');
  return JSON.parse(src.slice(src.indexOf('=') + 1).trim().replace(/;$/, ''));
})();

const browser = await chromium.launch({ executablePath: exe });
const results = [];
const errors = [];
async function step(name, fn) {
  try { await fn(); results.push(['PASS', name]); } catch (e) { results.push(['FAIL', name, e.message.split('\n').slice(0, 4).join(' | ')]); }
}
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ acceptDownloads: true, ...opts });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(`${p.url()} pageerror: ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && errors.push(`${p.url()} console: ${m.text()}`));
  return p;
}
const shot = async (p, name) => SHOTS && p.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: false });

const deep = data.games.filter((g) => g.depth === 'deep');
const p = await newPage({ viewport: { width: 1280, height: 900 } });

await step('全ルートが例外なく描画される', async () => {
  const routes = ['', 'timeline', 'entries', 'compare', 'graph', 'questions', 'insights', 'hypotheses', 'notebook', 'sources', 'quality', 'about', 'search?q=ZK',
    ...data.games.map((g) => `entry/${g.id}`), ...data.concepts.map((c) => `concept/${c.id}`), ...data.insights.map((i) => `insight/${i.id}`), ...data.questions.map((q) => `question/${q.id}`)];
  for (const r of routes) {
    await p.goto(BASE + '#/' + r);
    const h1 = await p.locator('main h1').first().textContent();
    assert.ok(h1 && !h1.includes('見つかりません'), `route ${r} rendered not-found`);
  }
});

await step('年表: 出来事が表示され、種類の絞り込みで件数が変わる', async () => {
  await p.goto(BASE + '#/timeline');
  const before = await p.locator('.tl li:not(.year)').count();
  assert.ok(before > 20, `only ${before} events`);
  await p.locator('#tl-filter input[value=launch]').uncheck();
  const after = await p.locator('.tl li:not(.year)').count();
  assert.ok(after < before, 'filter did not reduce');
  assert.ok(p.url().includes('types='), 'filter not reflected in URL');
  await shot(p, 'timeline');
});

await step('索引: 検索とフィルタ、URL への反映', async () => {
  await p.goto(BASE + '#/entries');
  const all = await p.locator('.entry-item').count();
  assert.equal(all, data.games.length);
  await p.fill('#entry-filter input[name=q]', 'zk');
  const q = await p.locator('.entry-item').count();
  assert.ok(q > 0 && q < all, `search zk -> ${q}`);
  await p.fill('#entry-filter input[name=q]', '');
  await p.selectOption('#entry-filter select[name=depth]', 'deep');
  assert.equal(await p.locator('.entry-item').count(), deep.length);
  assert.ok(p.url().includes('depth=deep'));
  await p.goto(BASE + '#/entries?status=ended');
  const ended = data.games.filter((g) => g.status?.value === 'ended').length;
  assert.equal(await p.locator('.entry-item').count(), ended);
});

await step('詳細: 深掘りの全 11 節・出典表・出典リンク', async () => {
  for (const g of deep) {
    await p.goto(BASE + `#/entry/${g.id}`);
    assert.equal(await p.locator('section[id^=sec-]').count(), 11, `${g.id} sections`);
    const rows = await p.locator('#sources tbody tr').count();
    assert.equal(rows, g.sources.length, `${g.id} source rows`);
  }
  await p.goto(BASE + `#/entry/${deep[0].id}`);
  await p.locator('.cite a').first().click();
  assert.ok(p.url().includes('#/source/'), 'cite did not navigate');
  assert.ok((await p.locator('main h1').textContent()).length > 0);
});

await step('比較: 3 件を追加して表を描画し、比較セットを保存', async () => {
  const ids = deep.slice(0, 3).map((g) => g.id);
  await p.goto(BASE + '#/entries?depth=deep');
  for (const id of ids) await p.locator(`[data-act=tray][data-id="${id}"]`).click();
  assert.equal(await p.locator('#tray-count').textContent(), '3');
  await p.click('nav#nav a[data-nav=compare]');
  await p.waitForSelector('.cmp-table');
  assert.equal(await p.locator('.cmp-table thead th').count(), 4);
  await p.fill('#cmp-save-name', 'テスト比較');
  await p.click('#cmp-save');
  await p.goto(BASE + '#/notebook');
  assert.ok((await p.locator('main').textContent()).includes('テスト比較'));
  await shot(p, 'compare');
});

await step('つながり: 中心の切り替えと一覧の絞り込み', async () => {
  await p.goto(BASE + '#/graph');
  const nodes = await p.locator('svg.ego .node').count();
  assert.ok(nodes > 0, 'no nodes');
  await p.locator('svg.ego .node').first().focus();
  await p.keyboard.press('Enter');
  await p.waitForTimeout(100);
  assert.ok(/#\/graph\/./.test(p.url()), 'keyboard recentering failed');
  const total = await p.locator('#rel-table tbody tr').count();
  await p.selectOption('#rel-filter select[name=basis]', 'confirmed');
  const conf = await p.locator('#rel-table tbody tr').count();
  assert.ok(conf <= total && conf > 0, `confirmed ${conf} / ${total}`);
  await shot(p, 'graph');
});

await step('インサイト: 支持事例・反例・原資料へ辿れる', async () => {
  assert.ok(data.insights.length > 0, 'no insights');
  for (const i of data.insights) {
    await p.goto(BASE + `#/insight/${i.id}`);
    assert.ok(await p.locator('.ev-list li.support').count() > 0, `${i.id} no support`);
  }
  const withCounter = data.insights.find((i) => i.evidence.some((e) => e.stance === 'counter'));
  await p.goto(BASE + `#/insight/${withCounter.id}`);
  await p.locator('.ev-list li.counter .cite a').first().click();
  assert.ok(p.url().includes('#/source/'));
  await p.locator('main a[target=_blank]').first().waitFor();
});

await step('問い: 事例から比較へ進める', async () => {
  const q = data.questions[0];
  await p.goto(BASE + `#/question/${q.id}`);
  assert.ok(await p.locator('.ev-list li').count() >= 2);
});

await step('設計仮説: 3 件以上を比較し、実験を研究ノートに記録', async () => {
  assert.ok(data.hypotheses.length >= 3, 'fewer than 3 hypotheses');
  await p.goto(BASE + '#/hypotheses');
  assert.ok(await p.locator('.hyp-table thead th').count() >= 4);
  await p.locator('[data-act=adopt-hyp]').first().click();
  await p.goto(BASE + '#/notebook');
  assert.ok((await p.locator('.status-pill').first().textContent()).includes('検証中'));
  await shot(p, 'hypotheses');
});

await step('研究ノート: メモ保存→再読み込みで保持→エクスポート→消去→インポートで復元', async () => {
  const g = deep[0];
  await p.goto(BASE + `#/entry/${g.id}`);
  await p.locator('[data-act=save]').first().click();
  await p.fill(`textarea[data-note="entry:${g.id}"]`, 'E2E メモ: 公開状態での駆け引き');
  await p.waitForTimeout(700);
  await p.reload();
  assert.equal(await p.inputValue(`textarea[data-note="entry:${g.id}"]`), 'E2E メモ: 公開状態での駆け引き');
  await p.goto(BASE + '#/notebook');
  const h = p.locator('[data-h-result]').first();
  await h.locator('input').fill('結果: 小規模テストで仮説を棄却');
  await h.locator('button').click();
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#nb-export')]);
  const file = await dl.path();
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.equal(json.schema, 'onchain-game-atlas/notebook@1');
  assert.ok(json.notes[`entry:${g.id}`]);
  assert.ok(json.saved[g.id]);
  assert.ok(json.hypotheses[0].results.length === 1);
  await p.click('#nb-clear');
  assert.ok((await p.locator('main').textContent()).includes('E2E メモ'), 'cleared on first click');
  await p.click('#nb-clear');
  assert.ok((await p.locator('main').textContent()).includes('保存した項目（0）'));
  await p.setInputFiles('#nb-import-file', file);
  await p.waitForTimeout(300);
  const txt = await p.locator('main').textContent();
  assert.ok(txt.includes('E2E メモ'), 'note not restored');
  assert.ok(txt.includes('保存した項目（1）'), 'saved not restored');
  // 壊れた JSON は拒否され、既存データは消えない
  const bad = path.join(path.dirname(file), 'bad.json');
  fs.writeFileSync(bad, '{"schema":"other@9"}');
  await p.setInputFiles('#nb-import-file', bad);
  await p.waitForTimeout(300);
  assert.ok((await p.locator('#toast').textContent()).includes('読み込めませんでした'));
  assert.ok((await p.locator('main').textContent()).includes('E2E メモ'));
  // 貼り付けによる読み込み（ファイル保存が使えない環境向け）
  await p.locator('#nb-json').evaluate((el) => { el.closest('details').open = true; });
  await p.fill('#nb-json', fs.readFileSync(file, 'utf8').replace('E2E メモ', 'E2E 貼付メモ'));
  await p.click('#nb-json-import');
  assert.ok((await p.locator('main').textContent()).includes('E2E 貼付メモ'), 'paste import failed');
  await shot(p, 'notebook');
});

await step('キーボード操作: スキップリンク、Tab でナビ、Enter で遷移', async () => {
  await p.goto('about:blank');
  await p.goto(BASE + '#/');
  await p.keyboard.press('Tab');
  assert.equal(await p.evaluate(() => document.activeElement.className), 'skip');
  await p.keyboard.press('Tab');
  await p.keyboard.press('Tab');
  let found = false;
  for (let i = 0; i < 6; i++) {
    const t = await p.evaluate(() => document.activeElement.textContent);
    if (t.trim() === '索引') { found = true; break; }
    await p.keyboard.press('Tab');
  }
  assert.ok(found, 'nav link not reachable by Tab');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(100);
  assert.ok(p.url().includes('#/entries'));
  // 全体検索
  await p.focus('#search-input');
  await p.keyboard.type('農業');
  await p.keyboard.press('Enter');
  assert.ok(p.url().includes('#/search?q='));
  // フォーカスが見える（outline）
  await p.goto(BASE + '#/entries');
  await p.focus('#entry-filter select[name=cat]');
  const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(outline, 'none');
});

await step('スマホ幅 (375px): 横スクロールなし、メニュー開閉', async () => {
  const m = await newPage({ viewport: { width: 375, height: 780 }, isMobile: true, hasTouch: true });
  for (const r of ['', 'timeline', 'entries', `entry/${deep[0].id}`, 'insights', 'notebook', 'graph', 'quality']) {
    await m.goto(BASE + '#/' + r);
    const over = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(over <= 1, `horizontal overflow ${over}px on ${r}`);
  }
  await m.goto(BASE + '#/');
  assert.equal(await m.locator('nav#nav').isVisible(), false);
  await m.click('#menu-btn');
  assert.equal(await m.locator('nav#nav').isVisible(), true);
  await m.click('nav#nav a[data-nav=insights]');
  assert.ok(m.url().includes('#/insights'));
  assert.equal(await m.locator('nav#nav').isVisible(), false);
  if (SHOTS) { await m.goto(BASE + `#/entry/${deep[0].id}`); await m.screenshot({ path: path.join(SHOTS, 'mobile-entry.png') }); }
});

await step('file:// でも開ける', async () => {
  const f = await newPage();
  await f.goto('file://' + path.join(ROOT, 'site/index.html') + '#/entries');
  assert.equal(await f.locator('.entry-item').count(), data.games.length);
});

await step('図とイラスト: ホームの図が描画され、ホバーで詳細、マスから一覧へ、画像はすべて読み込まれる', async () => {
  await p.goto('about:blank');
  await p.goto(BASE + '#/');
  assert.ok(await p.locator('#viz-status svg path, #viz-status svg rect:not(.hit)').count() > 5, 'status chart empty');
  const hit = p.locator('#viz-status .hit').nth(10);
  await hit.hover();
  assert.ok(await p.locator('.viz-tip').isVisible(), 'tooltip not shown on hover');
  assert.ok((await p.locator('.viz-tip').textContent()).includes('年に開始'));
  await hit.focus();
  assert.ok(await p.locator('.viz-tip').isVisible(), 'tooltip not shown on focus');
  const cell = p.locator('#viz-matrix a.hm.s6').first();
  await cell.click();
  await p.waitForSelector('.entry-item');
  assert.ok(/#\/entries\?cat=.+&onchain=/.test(p.url()), 'heatmap cell did not link to filtered list');
  const n = await p.locator('.entry-item').count();
  assert.ok(n > 0, 'filtered list empty');
  for (const r of ['', 'timeline', 'hypotheses', 'about', 'insight/' + data.insights[0].id, 'entry/' + deep[0].id]) {
    await p.goto('about:blank');
    await p.goto(BASE + '#/' + r);
    await p.waitForLoadState('networkidle');
    const imgs = await p.$$eval('main img', (xs) => xs.map((x) => { x.loading = 'eager'; return x.src; }));
    await p.waitForFunction(() => [...document.querySelectorAll('main img')].every((x) => x.complete), null, { timeout: 15000 });
    const broken = await p.$$eval('main img', (xs) => xs.filter((x) => !x.naturalWidth).map((x) => x.src));
    assert.deepEqual(broken, [], `broken images on ${r}`);
    assert.ok(imgs.length > 0 || r.startsWith('entry'), `no illustration on ${r}`);
  }
  assert.ok(data.illustrations.length <= 20, 'more than 20 illustrations (いらすとや terms)');
  await p.goto(BASE + '#/about');
  assert.equal(await p.locator('#credits + p + .table-wrap tbody tr').count(), data.illustrations.length, 'credit list incomplete');
  await p.goto(BASE + '#/entry/' + deep[0].id);
  assert.ok(await p.locator('.arch .meter').count() >= 4, 'architecture meters missing');
  await shot(p, 'entry-arch');
});

await step('ダークモード: 主要画面で横スクロールなし・図が描画される', async () => {
  const dpage = await newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
  for (const r of ['', 'timeline', 'entry/' + deep[0].id, 'hypotheses']) {
    await dpage.goto(BASE + '#/' + r);
    const over = await dpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(over <= 1, `overflow ${over} on ${r}`);
  }
  const bg = await dpage.evaluate(() => getComputedStyle(document.body).backgroundColor);
  assert.notEqual(bg, 'rgb(244, 247, 246)', 'dark tokens not applied');
});

await step('ブラウザのエラーなし', async () => {
  assert.deepEqual(errors, []);
});

await browser.close();
server.kill();
for (const r of results) console.log(r.join('  '));
const failed = results.filter((r) => r[0] === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
