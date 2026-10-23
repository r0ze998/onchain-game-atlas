// 市場データとアイコンを取得して data/market.json と site/icons/ に保存する。
// 研究データ（data/games/*.yaml の metrics）とは別物として扱う: 取得日時点の市場の値で、ゲームの利用状況を示すものではない。
// 使い方: node scripts/fetch-market.mjs [--only <entry-id>] [--no-icons]
// 取得元: CoinGecko API（トークン価格・時価総額・最高値・ロゴ）、DefiLlama API（TVL の推移・ロゴ）、公式サイト（favicon）
import fs from 'node:fs';
import path from 'node:path';
import { loadAll, ROOT } from './lib.mjs';

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const withIcons = !args.includes('--no-icons');
const OUT = path.join(ROOT, 'data', 'market.json');
const ICON_DIR = path.join(ROOT, 'site', 'icons');
fs.mkdirSync(ICON_DIR, { recursive: true });
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { entries: {} };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastCg = 0;
async function getJson(url, { cg = false, tries = 4 } = {}) {
  for (let i = 0; i < tries; i++) {
    if (cg) { const wait = lastCg + 3500 - Date.now(); if (wait > 0) await sleep(wait); lastCg = Date.now(); }
    try {
      const r = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'onchain-game-atlas (research; github.com/r0ze998/onchain-game-atlas)' } });
      if (r.status === 429) { console.warn('  429, waiting'); await sleep(45000); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      if (i === tries - 1) throw new Error(`${url}: ${e.message}`);
      await sleep(3000 * (i + 1));
    }
  }
  throw new Error(`${url}: gave up`);
}
async function download(url, dest) {
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (onchain-game-atlas icon fetch)' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const type = r.headers.get('content-type') || '';
  if (!/image|octet-stream|icon/.test(type)) throw new Error(`not an image: ${type}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 100) throw new Error('too small');
  fs.writeFileSync(dest, buf);
  return buf.length;
}
const extOf = (url, fallback = '.png') => (url.match(/\.(png|jpe?g|webp|svg|ico|gif)(\?|$)/i)?.[0].replace(/\?$/, '') || fallback).toLowerCase();

// 月次（各月の最終値）に間引く
function monthly(series) {
  const m = new Map();
  for (const [t, v] of series) m.set(new Date(t).toISOString().slice(0, 7), [t, v]);
  return [...m.values()];
}
function weekly(series) {
  const out = [];
  let last = 0;
  for (const p of series) if (p[0] - last >= 6.5 * 864e5) { out.push(p); last = p[0]; }
  if (series.length && out[out.length - 1] !== series[series.length - 1]) out.push(series[series.length - 1]);
  return out;
}
const round = (v, d = 6) => (typeof v === 'number' ? Number(v.toPrecision(d)) : v);

// /coins/markets で全トークンを 1 回で取得し、価格の推移だけ個別に取る（レート制限を避けるため）
const MARKETS = new Map();
async function prefetchMarkets(ids) {
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const rows = await getJson(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${chunk.join(',')}&per_page=250`, { cg: true });
    for (const r of rows) MARKETS.set(r.id, r);
  }
}
async function coin(id) {
  const base = `https://api.coingecko.com/api/v3/coins/${id}`;
  const r = MARKETS.get(id);
  if (!r) throw new Error(`${id}: not in /coins/markets`);
  const d = { symbol: r.symbol, name: r.name, image: { large: r.image }, links: {} };
  const md = { current_price: { usd: r.current_price }, market_cap: { usd: r.market_cap }, fully_diluted_valuation: { usd: r.fully_diluted_valuation }, ath: { usd: r.ath }, ath_date: { usd: r.ath_date }, atl: { usd: r.atl }, atl_date: { usd: r.atl_date } };
  let chart = [];
  try {
    const c = await getJson(`${base}/market_chart?vs_currency=usd&days=365`, { cg: true, tries: 2 });
    chart = weekly(c.prices || []).map(([t, v]) => [t, round(v, 5)]);
  } catch (e) { console.warn('  chart failed', id, e.message); }
  const price = md.current_price?.usd ?? null;
  const ath = md.ath?.usd ?? null;
  return {
    id, symbol: (d.symbol || '').toUpperCase(), name: d.name,
    price: round(price), market_cap: md.market_cap?.usd ?? null, fdv: md.fully_diluted_valuation?.usd ?? null,
    ath: round(ath), ath_date: md.ath_date?.usd?.slice(0, 10) ?? null, atl: round(md.atl?.usd ?? null), atl_date: md.atl_date?.usd?.slice(0, 10) ?? null,
    from_ath_pct: price != null && ath ? round(((price - ath) / ath) * 100, 4) : null,
    chart_365d: chart,
    image: d.image?.large || d.image?.small || null,
    homepage: (d.links?.homepage || []).filter(Boolean)[0] || null,
    source_url: `https://www.coingecko.com/en/coins/${id}`,
    api_url: base,
  };
}

async function tvl(slug) {
  const d = await getJson(`https://api.llama.fi/protocol/${slug}`);
  const s = (d.tvl || []).map((x) => [x.date * 1000, x.totalLiquidityUSD]).filter((x) => typeof x[1] === 'number');
  if (!s.length) return null;
  const peak = s.reduce((a, b) => (b[1] > a[1] ? b : a));
  const cur = s[s.length - 1];
  return {
    slug, name: d.name, current: Math.round(cur[1]), current_date: new Date(cur[0]).toISOString().slice(0, 10),
    peak: Math.round(peak[1]), peak_date: new Date(peak[0]).toISOString().slice(0, 10),
    from_peak_pct: peak[1] ? round(((cur[1] - peak[1]) / peak[1]) * 100, 4) : null,
    series_monthly: monthly(s).map(([t, v]) => [new Date(t).toISOString().slice(0, 7), Math.round(v)]),
    logo: d.logo || null, url: d.url || null,
    source_url: `https://defillama.com/protocol/${slug}`, api_url: `https://api.llama.fi/protocol/${slug}`,
  };
}

async function favicon(site) {
  const r = await fetch(site, { headers: { 'user-agent': 'Mozilla/5.0 (onchain-game-atlas icon fetch)' }, redirect: 'follow' });
  const html = r.ok ? await r.text() : '';
  const cands = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/rel=["'][^"']*(apple-touch-icon|icon)[^"']*["']/i.test(tag)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (!href || href.startsWith('data:')) continue;
    const size = Number(tag.match(/sizes=["'](\d+)x/i)?.[1] || (/apple-touch-icon/i.test(tag) ? 180 : 32));
    cands.push({ url: new URL(href, r.url || site).href, size });
  }
  cands.sort((a, b) => Math.abs(a.size - 128) - Math.abs(b.size - 128));
  cands.push({ url: new URL('/favicon.ico', r.url || site).href, size: 16 });
  return cands;
}

const { games } = loadAll();
await prefetchMarkets([...new Set(games.flatMap((g) => [].concat(g.ids?.coingecko || [])))]);
console.log(`markets: ${MARKETS.size} tokens`);
const out = { fetchedAt: new Date().toISOString(), note: '市場データは取得日時点の値。研究データの数値（運営発表・実測・推定）とは別に扱う。', entries: {} };
for (const g of games) {
  if (only && g.id !== only) { if (prev.entries[g.id]) out.entries[g.id] = prev.entries[g.id]; continue; }
  const e = { coins: [], tvl: null, icon: null, errors: [] };
  const cgIds = [].concat(g.ids?.coingecko || []);
  for (const id of cgIds) {
    try { e.coins.push(await coin(id)); process.stdout.write(`. ${g.id} ${id}\n`); } catch (err) { e.errors.push(err.message); console.warn('  coin failed', g.id, err.message); }
  }
  if (g.ids?.defillama) {
    try { e.tvl = await tvl(g.ids.defillama); process.stdout.write(`. ${g.id} tvl\n`); } catch (err) { e.errors.push(err.message); console.warn('  tvl failed', g.id, err.message); }
  }
  if (withIcons) {
    const site = typeof g.links?.website === 'string' ? g.links.website : (g.links?.website?.status === 'defunct' ? null : g.links?.website?.url);
    const cands = [
      ...(e.coins[0]?.image ? [{ url: e.coins[0].image, from: 'CoinGecko' }] : []),
      ...(e.tvl?.logo ? [{ url: e.tvl.logo, from: 'DefiLlama' }] : []),
    ];
    // 論文サーバーや大学のページなど、プロジェクト固有でない場所の favicon は使わない
    const GENERIC = /(^|\.)(arxiv\.org|mit\.edu|github\.com|github\.io|notion\.site|substack\.com|medium\.com|acm\.org|youtube\.com)$/;
    if (site && !GENERIC.test(new URL(site).hostname)) { try { for (const c of await favicon(site)) cands.push({ url: c.url, from: '公式サイト' }); } catch (err) { /* サイトに届かない */ } }
    for (const c of cands) {
      const file = `icons/${g.id}${extOf(c.url)}`;
      const tmp = path.join(ICON_DIR, `.${g.id}.tmp`);
      try {
        await download(c.url, tmp);
        for (const f of fs.readdirSync(ICON_DIR)) if (f.startsWith(g.id + '.')) fs.unlinkSync(path.join(ICON_DIR, f));
        fs.renameSync(tmp, path.join(ROOT, 'site', file));
        e.icon = { file, from: c.from, url: c.url };
        break;
      } catch (err) { if (fs.existsSync(tmp)) fs.unlinkSync(tmp); /* 次の候補へ */ }
    }
  }
  // 取得に失敗した部分は、前回の保存値をそのまま使う（取得日を残して古い値だと分かるようにする）
  const old = prev.entries[g.id];
  if (old) {
    for (const id of cgIds) if (!e.coins.some((c) => c.id === id)) { const oc = old.coins?.find((c) => c.id === id); if (oc) e.coins.push({ ...oc, stale_since: oc.stale_since || prev.fetchedAt }); }
    if (g.ids?.defillama && !e.tvl && old.tvl) e.tvl = { ...old.tvl, stale_since: old.tvl.stale_since || prev.fetchedAt };
    if (!e.icon && old.icon && fs.existsSync(path.join(ROOT, 'site', old.icon.file))) e.icon = old.icon;
  }
  if (!e.errors.length) delete e.errors;
  if (e.coins.length || e.tvl || e.icon) out.entries[g.id] = e;
  fs.writeFileSync(OUT, JSON.stringify({ ...out, partial: true }, null, 1));
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const n = Object.values(out.entries);
console.log(`wrote data/market.json: ${n.filter((x) => x.coins.length).length} with tokens, ${n.filter((x) => x.tvl).length} with TVL, ${n.filter((x) => x.icon).length} with icons`);
