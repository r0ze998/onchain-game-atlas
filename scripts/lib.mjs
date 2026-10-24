// データ読み込みと整合性検査。build.mjs と validate.mjs、テストから共有する。
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const DATA = path.join(ROOT, 'data');

export const ENUMS = {
  kind: ['game', 'engine', 'platform', 'research', 'essay', 'protocol'],
  depth: ['deep', 'index'],
  category: ['assets', 'p2e', 'onchain-rules', 'aw', 'zk', 'ai', 'infra'],
  status: ['active', 'ended', 'dormant', 'pivoted', 'archived', 'unknown'],
  onchain: ['all', 'core-rules', 'partial-rules', 'assets-only', 'none', 'unknown'],
  admin: ['none-known', 'limited', 'significant', 'unknown'],
  open_source: ['full', 'partial', 'none', 'unknown'],
  extensibility: ['permissionless-onchain', 'client-mods', 'official-api', 'none', 'unknown'],
  k: ['fact', 'claim', 'analysis', 'unknown'],
  metric_type: ['tvl', 'volume', 'wallets', 'dau', 'mau', 'players', 'token_price', 'market_cap', 'funding', 'grants', 'revenue', 'retention', 'transactions', 'nft_sales', 'other'],
  nature: ['measured', 'reported', 'estimated'],
  event_type: ['announce', 'testnet', 'launch', 'round', 'spec-change', 'end', 'pivot', 'incident', 'funding', 'release', 'paper', 'other'],
  relation_type: ['influenced-by', 'forked-from', 'built-with', 'successor-of', 'same-team', 'similar-to', 'contrasts-with', 'responds-to'],
  basis: ['confirmed', 'analytic'],
  source_type: ['official-docs', 'official-blog', 'code', 'paper', 'onchain-data', 'retrospective', 'interview', 'talk', 'news', 'analysis', 'wiki', 'archive', 'forum', 'social'],
  access: ['fetched', 'snippet', 'unreachable'],
  concept_kind: ['tech', 'mechanic', 'econ', 'infra', 'idea'],
  confidence: ['low', 'medium', 'high'],
  stance: ['support', 'counter', 'context'],
  audience: ['players', 'developers', 'creators', 'holders', 'researchers'],
  acq_phase: ['pre', 'launch', 'growth'],
  // ゼロイチ（最初のユーザー獲得）のチャネル。docs/ACQUISITION_BRIEF.md に定義
  acq_channel: ['existing-community', 'crypto-social', 'community-server', 'invite-gating', 'hackathon', 'builder-grants', 'prize-competition', 'token-incentive', 'free-mint', 'scholarship-guild', 'referral', 'platform-distribution', 'ip-brand', 'press', 'creator-stream', 'content-research', 'composability', 'viral-mechanic', 'paid-ads'],
};
export const ACQ_SECTIONS = ['steps', 'cost', 'after', 'counter', 'lessons'];

export const ARTICLE_SECTIONS = ['what', 'loop', 'before_after', 'onchain_tradeoffs', 'roles', 'trajectory', 'retention_evidence', 'extensions', 'constraints', 'principles', 'counter_evidence'];
export const COMPARE_AXES = ['gameplay', 'necessity', 'information', 'persistence', 'extensibility', 'money_flow', 'entry_barrier'];

const DATE_RE = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
export function isValidDate(d) {
  if (typeof d !== 'string' || !DATE_RE.test(d)) return false;
  if (d.length === 10) {
    const dt = new Date(d + 'T00:00:00Z');
    return dt.toISOString().slice(0, 10) === d;
  }
  return true;
}

export function readYaml(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'), { filename: file });
}

export function loadAll() {
  const gamesDir = path.join(DATA, 'games');
  const games = fs.readdirSync(gamesDir).filter((f) => f.endsWith('.yaml')).sort()
    .map((f) => ({ file: `data/games/${f}`, ...readYaml(path.join(gamesDir, f)) }));
  const opt = (name) => {
    const p = path.join(DATA, name);
    return fs.existsSync(p) ? (readYaml(p) || []) : [];
  };
  return {
    games,
    concepts: opt('concepts.yaml'),
    eras: opt('eras.yaml'),
    questions: opt('questions.yaml'),
    insights: opt('insights.yaml'),
    hypotheses: opt('hypotheses.yaml'),
    globalSources: opt('sources.yaml'),
    globalRelations: opt('relations.yaml'),
  };
}

// 全データを一つの正規化済みオブジェクトにまとめ、エラーと警告を返す。
export function buildDataset(raw, { today = new Date().toISOString().slice(0, 10) } = {}) {
  const errors = [];
  const warnings = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  const sources = new Map();
  const addSource = (s, owner) => {
    const where = `${owner} source ${s?.id}`;
    if (!s || !s.id) return err(owner, 'source without id');
    if (sources.has(s.id)) {
      const prev = sources.get(s.id);
      if (prev.url !== s.url) err(where, `duplicate source id with different url (${prev.owner})`);
      return;
    }
    if (!s.url || !/^https?:\/\//.test(s.url)) err(where, 'missing/invalid url');
    if (!s.title) err(where, 'missing title');
    if (!ENUMS.source_type.includes(s.type)) err(where, `bad type ${s.type}`);
    if (typeof s.primary !== 'boolean') err(where, 'primary must be boolean');
    if (!ENUMS.access.includes(s.access)) err(where, `bad access ${s.access}`);
    if (s.published != null && !isValidDate(String(s.published))) err(where, `bad published date ${s.published}`);
    if (!isValidDate(String(s.accessed))) err(where, `bad accessed date ${s.accessed}`);
    else if (String(s.accessed) > today) err(where, `accessed date in future ${s.accessed}`);
    if (s.published && String(s.published) > today) err(where, `published date in future ${s.published}`);
    sources.set(s.id, { ...s, ownerId: owner.startsWith('data/games/') ? owner.slice(11, -5) : null, published: s.published != null ? String(s.published) : null, accessed: String(s.accessed), owner, citedBy: [] });
  };

  for (const s of raw.globalSources) addSource(s, 'data/sources.yaml');
  for (const g of raw.games) for (const s of g.sources || []) addSource(s, g.file);

  // URL 重複は警告（同じ資料を別 id で登録している）
  const byUrl = new Map();
  for (const s of sources.values()) {
    const key = s.url.replace(/\/$/, '').replace(/^http:/, 'https:');
    // 別エントリが同じ資料を各自の出典として登録するのは許容。同じエントリ内の重複だけ警告する
    const prev = byUrl.get(key);
    if (prev && sources.get(prev).owner === s.owner) warn(`source ${s.id}`, `same url as ${prev} in the same entry`);
    else if (!prev) byUrl.set(key, s.id);
  }

  const gameIds = new Set();
  for (const g of raw.games) {
    if (gameIds.has(g.id)) err(g.file, `duplicate game id ${g.id}`);
    gameIds.add(g.id);
    if (`data/games/${g.id}.yaml` !== g.file) err(g.file, `id ${g.id} does not match filename`);
  }
  const conceptIds = new Set();
  for (const c of raw.concepts) {
    if (conceptIds.has(c.id)) err('concepts', `duplicate ${c.id}`);
    conceptIds.add(c.id);
    if (!ENUMS.concept_kind.includes(c.kind)) err(`concept ${c.id}`, `bad kind ${c.kind}`);
    if (gameIds.has(c.id)) err(`concept ${c.id}`, 'collides with game id');
  }
  const nodeExists = (id) => gameIds.has(id) || conceptIds.has(id);

  const cite = (ids, where, ref) => {
    if (ids == null) return [];
    if (!Array.isArray(ids)) { err(where, 's must be an array'); return []; }
    for (const id of ids) {
      const s = sources.get(id);
      if (!s) err(where, `unknown source ${id}`);
      else s.citedBy.push(ref);
    }
    return ids;
  };
  const checkStmt = (st, where, ref, { needSourceForFact = true } = {}) => {
    if (!st || typeof st.t !== 'string' || !st.t.trim()) return err(where, 'statement without text');
    if (!ENUMS.k.includes(st.k)) err(where, `bad k ${st.k}`);
    cite(st.s, where, ref);
    if ((st.k === 'fact' || st.k === 'claim') && needSourceForFact && !(st.s && st.s.length)) err(where, `${st.k} without source: "${st.t.slice(0, 40)}"`);
    if (st.k === 'claim' && !st.who) warn(where, 'claim without who');
    if (st.q && st.q.length > 240) err(where, 'quote too long');
    if ((st.k === 'fact') && st.s && st.s.length && st.s.every((id) => sources.get(id)?.access === 'snippet')) warn(where, `fact supported only by snippet-level sources: "${st.t.slice(0, 40)}"`);
    if ((st.k === 'fact' || st.k === 'claim') && st.s && st.s.length && st.s.every((id) => sources.get(id)?.access === 'unreachable')) err(where, 'fact supported only by unreachable sources');
  };

  const events = [];
  const metrics = [];
  const relations = [];
  const eventIds = new Set();
  const metricIds = new Set();

  for (const g of raw.games) {
    const W = g.file;
    const ref = { type: 'game', id: g.id };
    for (const f of ['id', 'name', 'kind', 'depth', 'summary', 'selection_reason', 'updated']) if (!g[f]) err(W, `missing ${f}`);
    if (!ENUMS.kind.includes(g.kind)) err(W, `bad kind ${g.kind}`);
    if (!ENUMS.depth.includes(g.depth)) err(W, `bad depth ${g.depth}`);
    if (g.updated && !isValidDate(String(g.updated))) err(W, `bad updated ${g.updated}`);
    g.updated = String(g.updated);
    const cats = g.categories || [];
    if (!cats.length) err(W, 'no categories');
    if (cats.filter((c) => c.role === 'primary').length !== 1) err(W, 'need exactly one primary category');
    for (const c of cats) {
      if (!ENUMS.category.includes(c.id)) err(W, `bad category ${c.id}`);
      if (!c.reason) err(W, `category ${c.id} without reason`);
    }
    if (!g.status || !ENUMS.status.includes(g.status.value)) err(W, `bad status ${g.status?.value}`);
    else {
      if (g.status.as_of && !isValidDate(String(g.status.as_of))) err(W, 'bad status.as_of');
      g.status.as_of = g.status.as_of ? String(g.status.as_of) : null;
      cite(g.status.s, `${W} status`, ref);
      if (g.status.value !== 'unknown' && !(g.status.s && g.status.s.length)) warn(W, 'status without source');
    }
    for (const [k, d] of Object.entries(g.dates || {})) {
      if (!['announced', 'launched', 'ended'].includes(k)) err(W, `unknown dates key ${k}`);
      if (!isValidDate(String(d.date))) err(W, `bad date dates.${k}=${d.date}`);
      d.date = String(d.date);
      cite(d.s, `${W} dates.${k}`, ref);
      if (!(d.s && d.s.length)) err(W, `dates.${k} without source`);
    }
    const dd = g.dates || {};
    if (dd.announced && dd.launched && dd.announced.date.slice(0, Math.min(dd.announced.date.length, dd.launched.date.length)) > dd.launched.date.slice(0, Math.min(dd.announced.date.length, dd.launched.date.length))) warn(W, 'announced after launched');
    if (dd.launched && dd.ended && dd.launched.date > dd.ended.date) err(W, 'launched after ended');
    if (g.status?.value === 'ended' && !dd.ended) warn(W, 'status ended but no dates.ended');

    const a = g.architecture || {};
    const chk = (key, en) => {
      if (!a[key]) return err(W, `architecture.${key} missing`);
      if (!ENUMS[en].includes(a[key].level)) err(W, `architecture.${key}.level bad ${a[key].level}`);
      cite(a[key].s, `${W} architecture.${key}`, ref);
      if (a[key].level !== 'unknown' && !(a[key].s && a[key].s.length)) warn(W, `architecture.${key} without source`);
    };
    chk('onchain', 'onchain'); chk('admin', 'admin'); chk('open_source', 'open_source'); chk('extensibility', 'extensibility');
    for (const o of a.offchain || []) cite(o.s, `${W} architecture.offchain`, ref);

    for (const ax of COMPARE_AXES) {
      const st = g.compare?.[ax];
      if (!st) { err(W, `compare.${ax} missing`); continue; }
      checkStmt(st, `${W} compare.${ax}`, ref);
    }
    for (const c of g.concepts || []) if (!conceptIds.has(c)) err(W, `unknown concept ${c}`);

    if (g.depth === 'deep') {
      if (!g.article) err(W, 'deep entry without article');
      for (const sec of ARTICLE_SECTIONS) {
        const arr = g.article?.[sec];
        if (!Array.isArray(arr) || !arr.length) { err(W, `article.${sec} empty`); continue; }
        arr.forEach((st, i) => checkStmt(st, `${W} article.${sec}[${i}]`, ref));
      }
    } else if (g.article) {
      for (const [sec, arr] of Object.entries(g.article)) (arr || []).forEach((st, i) => checkStmt(st, `${W} article.${sec}[${i}]`, ref));
    }
    if (g.article) for (const sec of Object.keys(g.article)) if (!ARTICLE_SECTIONS.includes(sec)) err(W, `unknown article section ${sec}`);

    for (const m of g.metrics || []) {
      const w = `${W} metric ${m.id}`;
      if (!m.id || metricIds.has(m.id)) err(w, 'missing/duplicate id');
      metricIds.add(m.id);
      if (!ENUMS.metric_type.includes(m.type)) err(w, `bad type ${m.type}`);
      if (!ENUMS.nature.includes(m.nature)) err(w, `bad nature ${m.nature}`);
      if (m.value == null && !m.value_text) err(w, 'no value');
      if (!m.unit) err(w, 'no unit');
      if (!m.period) err(w, 'no period');
      if (!m.definition) err(w, 'no definition');
      if (!(m.s && m.s.length)) err(w, 'no source');
      cite(m.s, w, { type: 'metric', id: m.id, game: g.id });
      metrics.push({ ...m, period: String(m.period), game: g.id });
    }
    for (const e of g.events || []) {
      const w = `${W} event ${e.id}`;
      if (!e.id || eventIds.has(e.id)) err(w, 'missing/duplicate id');
      eventIds.add(e.id);
      if (!isValidDate(String(e.date))) err(w, `bad date ${e.date}`);
      else if (String(e.date) > today) err(w, `event date in future ${e.date}`);
      if (!ENUMS.event_type.includes(e.type)) err(w, `bad type ${e.type}`);
      if (!e.title) err(w, 'no title');
      if (!(e.s && e.s.length)) err(w, 'no source');
      cite(e.s, w, { type: 'event', id: e.id, game: g.id });
      events.push({ ...e, date: String(e.date), games: [g.id, ...(e.also || [])] });
    }
    for (const r of g.relations || []) {
      const w = `${W} relation ->${r.to}`;
      if (!nodeExists(r.to)) err(w, 'unknown target');
      if (!ENUMS.relation_type.includes(r.type)) err(w, `bad type ${r.type}`);
      if (!ENUMS.basis.includes(r.basis)) err(w, `bad basis ${r.basis}`);
      if (r.basis === 'confirmed' && !(r.s && r.s.length)) err(w, 'confirmed relation without source');
      if (r.basis === 'analytic' && !r.note) err(w, 'analytic relation without note');
      if (r.type === 'similar-to' && r.basis === 'confirmed') warn(w, 'similar-to is analytic by nature');
      cite(r.s, w, { type: 'relation', from: g.id, to: r.to });
      relations.push({ from: g.id, ...r });
    }
    for (const c of g.contradictions || []) cite(c.s, `${W} contradiction`, ref);
    // 公式リンクと外部データの ID
    const LINK_KEYS = ['website', 'play', 'docs', 'whitepaper', 'x', 'discord', 'telegram', 'github', 'blog'];
    for (const [k, v] of Object.entries(g.links || {})) {
      if (!LINK_KEYS.includes(k)) err(W, `unknown links key ${k}`);
      const url = typeof v === 'string' ? v : v?.url;
      if (!url || !/^https:\/\//.test(url)) err(W, `links.${k} must be an https url`);
      if (v && typeof v === 'object') { cite(v.s, `${W} links.${k}`, ref); if (v.status && !['active', 'defunct', 'archived'].includes(v.status)) err(W, `links.${k}.status bad`); }
    }
    // ゼロイチ: 最初のユーザーをどこから、どう集めたか
    const q = g.acquisition;
    if (q) {
      const w = `${W} acquisition`;
      if (q.applies === false) { if (!q.note) err(w, 'applies:false without note'); }
      else {
        for (const a of q.audience || []) if (!ENUMS.audience.includes(a)) err(w, `bad audience ${a}`);
        if (!(q.audience || []).length) err(w, 'no audience');
        if (!q.summary) err(w, 'no summary'); else checkStmt(q.summary, `${w}.summary`, ref);
        if (!(q.steps || []).length) err(w, 'no steps');
        if (!(q.channels || []).length) err(w, 'no channels');
        for (const k of Object.keys(q)) if (![...ACQ_SECTIONS, 'applies', 'audience', 'summary', 'channels', 'metrics', 'unknowns', 'note'].includes(k)) err(w, `unknown key ${k}`);
        for (const sec of ACQ_SECTIONS) (q[sec] || []).forEach((st, i) => checkStmt(st, `${w}.${sec}[${i}]`, ref));
        if (g.depth === 'deep') for (const sec of ACQ_SECTIONS) if (!(q[sec] || []).length) err(w, `deep entry: acquisition.${sec} empty`);
        let prevDate = '';
        for (const st of q.steps || []) {
          if (st.phase && !ENUMS.acq_phase.includes(st.phase)) err(w, `bad phase ${st.phase}`);
          if (st.date != null) {
            st.date = String(st.date);
            if (!isValidDate(st.date)) err(w, `bad step date ${st.date}`);
            else if (st.date > today) err(w, `step date in future ${st.date}`);
            if (prevDate && st.date.slice(0, 7) < prevDate.slice(0, 7)) warn(w, `steps not in date order (${st.date})`);
            prevDate = st.date;
          }
        }
        const seen = new Set();
        for (const c of q.channels || []) {
          if (!ENUMS.acq_channel.includes(c.id)) err(w, `bad channel ${c.id}`);
          if (seen.has(c.id)) err(w, `duplicate channel ${c.id}`);
          seen.add(c.id);
          checkStmt(c, `${w}.channels.${c.id}`, ref);
        }
        const mids = new Set((g.metrics || []).map((m) => m.id));
        for (const m of q.metrics || []) if (!mids.has(m)) err(w, `unknown metric ${m}`);
      }
    } else if (['game', 'platform', 'protocol'].includes(g.kind)) warn(W, 'no acquisition');
    for (const [k, v] of Object.entries(g.ids || {})) {
      if (!['coingecko', 'defillama'].includes(k)) err(W, `unknown ids key ${k}`);
      const arr = Array.isArray(v) ? v : [v];
      if (!arr.every((x) => typeof x === 'string' && /^[a-z0-9-]+$/.test(x))) err(W, `ids.${k} must be slug strings`);
    }
  }
  for (const r of raw.globalRelations) {
    const w = `relations.yaml ${r.from}->${r.to}`;
    if (!nodeExists(r.from) || !nodeExists(r.to)) err(w, 'unknown node');
    if (!ENUMS.relation_type.includes(r.type)) err(w, `bad type ${r.type}`);
    if (!ENUMS.basis.includes(r.basis)) err(w, `bad basis ${r.basis}`);
    if (r.basis === 'confirmed' && !(r.s && r.s.length)) err(w, 'confirmed relation without source');
    if (r.basis === 'analytic' && !r.note) err(w, 'analytic relation without note');
    cite(r.s, w, { type: 'relation', from: r.from, to: r.to });
    relations.push(r);
  }
  // 概念↔ゲームの所属は games[].concepts から派生

  const eraIds = new Set();
  for (const e of raw.eras) {
    eraIds.add(e.id);
    if (!isValidDate(String(e.from))) err(`era ${e.id}`, 'bad from');
    if (e.to != null && !isValidDate(String(e.to))) err(`era ${e.id}`, 'bad to');
    e.from = String(e.from); e.to = e.to != null ? String(e.to) : null;
    for (const gid of e.key_games || []) if (!gameIds.has(gid)) err(`era ${e.id}`, `unknown game ${gid}`);
    for (const st of e.changes || []) checkStmt(st, `era ${e.id}`, { type: 'era', id: e.id });
  }

  const insightIds = new Set(raw.insights.map((i) => i.id));
  const hypIds = new Set(raw.hypotheses.map((h) => h.id));
  const checkEvidence = (ev, where, ref) => {
    if (!gameIds.has(ev.game)) err(where, `unknown game ${ev.game}`);
    if (!ENUMS.stance.includes(ev.stance)) err(where, `bad stance ${ev.stance}`);
    if (!ev.note) err(where, 'evidence without note');
    cite(ev.s, where, ref);
    if (ev.stance !== 'context' && !(ev.s && ev.s.length)) err(where, `evidence (${ev.game}) without source`);
  };
  for (const q of raw.questions) {
    const w = `question ${q.id}`;
    if (!q.q) err(w, 'no q');
    if (q.topic && !['acquisition'].includes(q.topic)) err(w, `bad topic ${q.topic}`);
    for (const c of q.cases || []) checkEvidence(c, w, { type: 'question', id: q.id });
    for (const i of q.insights || []) if (!insightIds.has(i)) err(w, `unknown insight ${i}`);
    for (const h of q.hypotheses || []) if (!hypIds.has(h)) err(w, `unknown hypothesis ${h}`);
  }
  for (const ins of raw.insights) {
    const w = `insight ${ins.id}`;
    for (const f of ['claim', 'conditions', 'confidence', 'confidence_reason', 'experiment', 'gap_type']) if (!ins[f]) err(w, `missing ${f}`);
    if (ins.topic && !['acquisition'].includes(ins.topic)) err(w, `bad topic ${ins.topic}`);
    if (!ENUMS.confidence.includes(ins.confidence)) err(w, `bad confidence ${ins.confidence}`);
    const ev = ins.evidence || [];
    if (!ev.some((e) => e.stance === 'support')) err(w, 'no supporting case');
    if (!ev.some((e) => e.stance === 'counter')) warn(w, 'no counterexample');
    for (const e of ev) checkEvidence(e, w, { type: 'insight', id: ins.id });
    for (const h of ins.hypotheses || []) if (!hypIds.has(h)) err(w, `unknown hypothesis ${h}`);
  }
  for (const h of raw.hypotheses) {
    const w = `hypothesis ${h.id}`;
    for (const f of ['title', 'mechanics', 'player_choices', 'incentive_conflicts', 'failure_conditions', 'experiment', 'needs_chain']) if (!h[f]) err(w, `missing ${f}`);
    for (const i of h.insights || []) if (!insightIds.has(i)) err(w, `unknown insight ${i}`);
    for (const e of h.evidence || []) checkEvidence(e, w, { type: 'hypothesis', id: h.id });
  }

  for (const s of sources.values()) if (!s.citedBy.length) warn(`source ${s.id}`, 'never cited');

  const dataset = {
    generated: today,
    lastUpdated: [...raw.games.map((g) => g.updated)].sort().pop() || today,
    games: raw.games.map(({ file, ...g }) => ({ ...g, file })),
    concepts: raw.concepts,
    eras: raw.eras,
    questions: raw.questions,
    insights: raw.insights,
    hypotheses: raw.hypotheses,
    events: events.sort((a, b) => a.date.localeCompare(b.date)),
    metrics,
    relations,
    sources: [...sources.values()],
  };
  return { dataset, errors, warnings };
}
