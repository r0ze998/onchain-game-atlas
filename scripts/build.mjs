// データを検査し、site/data.generated.js を生成する。エラーがあれば失敗する。
// 使い方: node scripts/build.mjs [--allow-errors]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { loadAll, buildDataset, ROOT } from './lib.mjs';

const allowErrors = process.argv.includes('--allow-errors');
const raw = loadAll();
const { dataset, errors, warnings } = buildDataset(raw);

// 項目の dates から年表用の出来事を補う（同じ種類・同じ日付の出来事が既にあれば作らない）
const map = { announced: 'announce', launched: 'launch', ended: 'end' };
for (const g of dataset.games) {
  for (const [k, d] of Object.entries(g.dates || {})) {
    const type = map[k];
    const exists = dataset.events.some((e) => e.games[0] === g.id && (e.type === type || (type === 'launch' && e.type === 'testnet')) && (e.date.startsWith(d.date) || d.date.startsWith(e.date)));
    if (!exists) dataset.events.push({ id: `auto-${g.id}-${k}`, date: d.date, type, title: { announced: '発表', launched: '公開', ended: '終了' }[k] + (d.note ? `（${d.note}）` : ''), s: d.s, games: [g.id], derived: true });
  }
}
dataset.events.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

const lc = path.join(ROOT, 'data', 'linkcheck.json');
if (fs.existsSync(lc)) {
  const r = JSON.parse(fs.readFileSync(lc, 'utf8'));
  dataset.linkcheck = { summary: r.summary, checked: r.checked };
  const byUrl = new Map(r.results.map((x) => [x.url, x.status]));
  for (const s of dataset.sources) s.link = byUrl.get(s.url) || null;
}
// 検証役の記録（docs/verification/<id>.md）を項目に添付
const vdir = path.join(ROOT, 'docs', 'verification');
if (fs.existsSync(vdir)) {
  for (const g of dataset.games) {
    const f = path.join(vdir, `${g.id}.md`);
    if (fs.existsSync(f)) g.verification = fs.readFileSync(f, 'utf8');
  }
}
const sv = path.join(vdir, '_synthesis.md');
if (fs.existsSync(sv)) dataset.synthesisVerification = fs.readFileSync(sv, 'utf8');
// 市場データ（自動取得。研究データとは別）とアイコン
const mk = path.join(ROOT, 'data', 'market.json');
if (fs.existsSync(mk)) {
  const m = JSON.parse(fs.readFileSync(mk, 'utf8'));
  dataset.market = { fetchedAt: m.fetchedAt, note: m.note };
  for (const g of dataset.games) {
    const e = m.entries[g.id];
    if (!e) continue;
    if (e.icon && !fs.existsSync(path.join(ROOT, 'site', e.icon.file))) { warnings.push(`icon missing ${e.icon.file}`); delete e.icon; }
    g.market = e;
  }
}
// 記録の指紋: 各 YAML ファイルの SHA-256 と、それらを葉とするマークル木の根。
// 内容が 1 文字でも変わればハッシュが変わるので、引用・保存した版との照合に使える
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const dataFiles = [
  ...dataset.games.map((g) => ({ path: g.file, game: g })),
  ...['concepts.yaml', 'eras.yaml', 'questions.yaml', 'insights.yaml', 'hypotheses.yaml'].map((f) => ({ path: `data/${f}` })),
].filter((x) => fs.existsSync(path.join(ROOT, x.path)));
const leaves = dataFiles.map((x) => {
  const h = sha(fs.readFileSync(path.join(ROOT, x.path)));
  if (x.game) x.game.hash = h;
  return { path: x.path, hash: h };
}).sort((a, b) => a.path.localeCompare(b.path));
let level = leaves.map((l) => l.hash);
while (level.length > 1) {
  const next = [];
  for (let i = 0; i < level.length; i += 2) next.push(sha(level[i] + (level[i + 1] ?? level[i])));
  level = next;
}
dataset.integrity = { algorithm: 'sha256', root: level[0], leaves };
dataset.quality = { errors, warnings };

for (const w of warnings) console.log('WARN ', w);
for (const e of errors) console.log('ERROR', e);
console.log(`\n${dataset.games.length} entries / ${dataset.events.length} events / ${dataset.sources.length} sources / ${errors.length} errors / ${warnings.length} warnings`);
if (errors.length && !allowErrors) {
  console.error('Build failed: fix errors above (or pass --allow-errors for a draft build).');
  process.exit(1);
}
fs.writeFileSync(path.join(ROOT, 'site', 'data.generated.js'), `/* 自動生成: scripts/build.mjs。直接編集しないこと */\nwindow.ATLAS_DATA = ${JSON.stringify(dataset)};\n`);
console.log('wrote site/data.generated.js');
