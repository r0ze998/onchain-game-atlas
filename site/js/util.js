/* 共通ユーティリティと研究データの索引。グローバル A に載せる（file:// でも動くようクラシックスクリプト） */
(function () {
  'use strict';
  const A = (window.A = window.A || {});
  const D = window.ATLAS_DATA;
  A.D = D;

  A.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  A.$ = (sel, root = document) => root.querySelector(sel);
  A.$$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  A.L = {
    category: {
      assets: '資産所有・売買', p2e: 'P2E・金融インセンティブ', 'onchain-rules': 'ルールと状態のオンチェーン実行',
      aw: 'Autonomous Worlds・拡張可能な世界', zk: 'ZK・秘匿情報', ai: 'AI エージェント', infra: 'エンジン・基盤・思想・研究',
    },
    categoryShort: { assets: '資産', p2e: 'P2E', 'onchain-rules': 'オンチェーン実行', aw: 'AW・拡張', zk: 'ZK・秘匿', ai: 'AI', infra: '基盤・研究' },
    kind: { game: 'ゲーム', engine: 'エンジン', platform: 'プラットフォーム', research: '研究', essay: '論考', protocol: 'プロトコル' },
    depth: { deep: '深掘り', index: '索引' },
    status: { active: '稼働中', ended: '終了', dormant: '休止・停滞', pivoted: '転換', archived: 'アーカイブ（コード公開のみ）', unknown: '不明' },
    onchain: { all: 'ほぼ全て', 'core-rules': '中核ルール', 'partial-rules': '一部のルール', 'assets-only': '資産のみ', none: 'なし', unknown: '不明' },
    admin: { 'none-known': '確認されず', limited: '限定的', significant: '大きい', unknown: '不明' },
    open_source: { full: '公開', partial: '一部公開', none: '非公開', unknown: '不明' },
    extensibility: { 'permissionless-onchain': '許可不要のオンチェーン拡張', 'client-mods': 'クライアント拡張', 'official-api': '公式 API', none: 'なし', unknown: '不明' },
    k: { fact: '事実', claim: '当事者の主張', analysis: '分析', unknown: '未確認' },
    nature: { measured: '実測', reported: '運営発表', estimated: '推定' },
    metric_type: { tvl: 'TVL', volume: '取引高', wallets: 'ウォレット数', dau: 'DAU', mau: 'MAU', players: 'プレイヤー数', token_price: 'トークン価格', market_cap: '時価総額', funding: '資金調達', grants: '助成金', revenue: '収益', retention: '継続率', transactions: '取引件数', nft_sales: 'NFT 売上', other: 'その他' },
    event_type: { announce: '発表', testnet: 'テスト公開', launch: '公開', round: 'ラウンド', 'spec-change': '仕様変更', end: '終了', pivot: '転換', incident: '事件', funding: '資金調達', release: 'リリース', paper: '論文・論考', other: 'その他' },
    relation_type: { 'influenced-by': '影響を受けた', 'forked-from': 'フォーク元', 'built-with': '基盤として使用', 'successor-of': '後継', 'same-team': '同じチーム', 'similar-to': '類似', 'contrasts-with': '対照的', 'responds-to': '応答・批判' },
    basis: { confirmed: '確認された関係', analytic: '分析上の類似' },
    source_type: { 'official-docs': '公式ドキュメント', 'official-blog': '公式ブログ・発表', code: 'コード', paper: '論文', 'onchain-data': 'オンチェーンデータ', retrospective: '振り返り', interview: 'インタビュー', talk: '講演', news: '報道', analysis: '分析記事', wiki: 'Wiki', archive: 'アーカイブ', forum: 'フォーラム', social: 'SNS' },
    access: { fetched: '参照済み', snippet: '検索要約のみ', unreachable: '到達不能' },
    concept_kind: { tech: '技術', mechanic: 'メカニクス', econ: '経済設計', infra: '開発基盤', idea: '思想' },
    confidence: { high: '確信度 高', medium: '確信度 中', low: '確信度 低' },
    stance: { support: '支持', counter: '反例', context: '文脈' },
    gap_type: { 'unsolved-gap': '未解決の空白', 'no-demand': '需要が確認されていない', 'chain-unnecessary': 'チェーン不要の可能性', 'now-feasible': '今なら成立し得る', established: '確立した知見' },
    section: {
      what: 'どんなゲームか', loop: 'プレイの一巡', before_after: '何が難しく、何を変えたか', onchain_tradeoffs: 'オンチェーン化で生まれた遊びと増えたコスト',
      roles: '役割と動機', trajectory: '成長・継続・終了・設計変更', retention_evidence: '定着の証拠と、示されていない指標', extensions: '第三者による拡張と創発',
      constraints: '制約・失敗条件・未解決課題', principles: '持ち込める原理と適用条件', counter_evidence: '反証・別の説明',
    },
    axis: { gameplay: 'ゲームプレイ', necessity: 'オンチェーン化の必然性', information: '情報公開・秘匿', persistence: '永続性', extensibility: '拡張性', money_flow: '資金循環', entry_barrier: '参加障壁' },
  };

  // 精度を保った日付表示。「2020」「2020年8月」「2020年8月7日」
  A.fmtDate = (d) => {
    if (!d) return '日付不明';
    const [y, m, day] = String(d).split('-');
    if (day) return `${y}年${+m}月${+day}日`;
    if (m) return `${y}年${+m}月`;
    return `${y}年`;
  };
  A.precision = (d) => (!d ? 'none' : String(d).split('-').length === 3 ? 'day' : String(d).split('-').length === 2 ? 'month' : 'year');
  A.fmtNum = (n) => (typeof n === 'number' ? n.toLocaleString('ja-JP') : A.esc(n));
  A.norm = (s) => String(s ?? '').normalize('NFKC').toLowerCase();

  // 索引
  const idx = (A.I = {
    game: new Map(D.games.map((g) => [g.id, g])),
    concept: new Map(D.concepts.map((c) => [c.id, c])),
    source: new Map(D.sources.map((s) => [s.id, s])),
    insight: new Map(D.insights.map((i) => [i.id, i])),
    question: new Map(D.questions.map((q) => [q.id, q])),
    hypothesis: new Map(D.hypotheses.map((h) => [h.id, h])),
    eventsByGame: new Map(),
    metricsByGame: new Map(),
    relationsByNode: new Map(),
    gamesByConcept: new Map(),
    insightsByGame: new Map(),
    questionsByGame: new Map(),
    hypothesesByGame: new Map(),
  });
  const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
  for (const e of D.events) for (const g of e.games) push(idx.eventsByGame, g, e);
  for (const m of D.metrics) push(idx.metricsByGame, m.game, m);
  for (const r of D.relations) { push(idx.relationsByNode, r.from, r); push(idx.relationsByNode, r.to, r); }
  for (const g of D.games) for (const c of g.concepts || []) push(idx.gamesByConcept, c, g);
  for (const i of D.insights) for (const e of i.evidence || []) push(idx.insightsByGame, e.game, i);
  for (const q of D.questions) for (const e of q.cases || []) push(idx.questionsByGame, e.game, q);
  for (const h of D.hypotheses) for (const e of h.evidence || []) push(idx.hypothesesByGame, e.game, h);

  A.nodeName = (id) => idx.game.get(id)?.name || idx.concept.get(id)?.name || id;
  A.nodeHref = (id) => (idx.game.has(id) ? `#/entry/${id}` : idx.concept.has(id) ? `#/concept/${id}` : '#/');
  A.nodeLink = (id) => (idx.game.has(id) || idx.concept.has(id) ? `<a href="${A.nodeHref(id)}">${A.esc(A.nodeName(id))}</a>` : `<span class="muted" title="未収録">${A.esc(id)}（未収録）</span>`);

  // 出典参照（脚注風の小さなリンク）。番号は所属エントリ内の出典番号。別エントリの出典ならエントリ名を前置
  A.srcNum = (s) => {
    const g = s.ownerId && idx.game.get(s.ownerId);
    return g ? (g.sources || []).findIndex((x) => x.id === s.id) + 1 : 0;
  };
  A.cites = (ids) => {
    if (!ids || !ids.length) return '';
    return `<span class="cite">${ids.map((id) => {
      const s = idx.source.get(id);
      if (!s) return `<span class="muted">[?${A.esc(id)}]</span>`;
      const cls = s.access === 'snippet' ? 'snip' : '';
      const t = `${s.title}${s.publisher ? ' — ' + s.publisher : ''}（${A.L.source_type[s.type] || s.type}${s.primary ? '・一次' : '・二次'}${s.access !== 'fetched' ? '・' + A.L.access[s.access] : ''}）`;
      const n = A.srcNum(s);
      const label = n ? (s.ownerId === A.ctxEntry ? `${n}` : `${A.nodeName(s.ownerId)} ${n}`) : A.srcShort(s);
      return `<a class="${cls}" href="#/source/${encodeURIComponent(id)}" title="${A.esc(t)}" aria-label="出典: ${A.esc(t)}">[${A.esc(label)}]</a>`;
    }).join('')}</span>`;
  };
  A.kBadge = (k) => `<span class="k k-${A.esc(k)}">${A.esc(A.L.k[k] || k)}</span>`;
  A.stmt = (st) => {
    if (!st) return '<span class="muted">未記入</span>';
    const who = st.k === 'claim' && st.who ? `<span class="who">（主張者: ${A.esc(st.who)}）</span>` : '';
    const q = st.q ? ` <q>${A.esc(st.q)}</q>` : '';
    return `${A.kBadge(st.k)}${A.esc(st.t)}${who}${q}${A.cites(st.s)}`;
  };
  A.stmts = (arr) => `<ul class="stmts">${(arr || []).map((st) => `<li class="${st.k === 'unknown' ? 'unknown' : ''}">${A.stmt(st)}</li>`).join('')}</ul>`;

  A.catTags = (g) => (g.categories || []).map((c) => `<a class="tag ${c.role === 'primary' ? 'primary' : ''}" href="#/entries?cat=${c.id}" title="${A.esc(c.reason)}">${A.esc(A.L.categoryShort[c.id])}</a>`).join('');
  A.yearOf = (g) => (g.dates?.launched?.date || g.dates?.announced?.date || '').slice(0, 4);
  A.periodText = (g) => {
    const d = g.dates || {};
    const a = d.launched?.date || d.announced?.date;
    const b = d.ended?.date;
    if (!a && !b) return '時期不明';
    return `${a ? A.fmtDate(a) : '?'}${b ? ' – ' + A.fmtDate(b) : ''}`;
  };

  A.toast = (msg) => {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(A._toastT);
    A._toastT = setTimeout(() => t.classList.remove('show'), 2200);
  };

  // URL のクエリ（#/path?x=1）
  A.parseHash = () => {
    const h = location.hash.replace(/^#/, '') || '/';
    const [p, q] = h.split('?');
    const parts = p.split('/').filter(Boolean).map(decodeURIComponent);
    const params = new URLSearchParams(q || '');
    return { parts, params, path: p };
  };
  A.setParams = (params) => {
    const { path } = A.parseHash();
    const qs = params.toString();
    history.replaceState(null, '', `#${path}${qs ? '?' + qs : ''}`);
  };
  A.download = (filename, text) => {
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  };
})();
