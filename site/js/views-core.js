/* 基本画面: ホーム、索引、詳細、概念、出典、検索、品質、方法 */
(function () {
  'use strict';
  const A = window.A;
  const { esc, L, I, D } = A;
  const V = (A.views = A.views || {});

  const entryActions = (id) => `
    <button class="btn ${A.store.isSaved(id) ? 'on' : ''}" data-act="save" data-id="${esc(id)}" aria-pressed="${A.store.isSaved(id)}">${A.store.isSaved(id) ? '保存済み' : '保存'}</button>
    <button class="btn ${A.store.inTray(id) ? 'on' : ''}" data-act="tray" data-id="${esc(id)}" aria-pressed="${A.store.inTray(id)}">${A.store.inTray(id) ? '比較に追加済み' : '比較に追加'}</button>`;
  A.entryActions = entryActions;

  // ---------- ホーム ----------
  V.home = () => {
    const deep = D.games.filter((g) => g.depth === 'deep').length;
    const facts = countStatements();
    const st = A.charts.statusByYear();
    const mx = A.charts.domainMatrix();
    const dd = A.charts.drawdownChart();
    const tv = A.charts.tvlChart();
    V.home._after = [st.after, mx.after, dd?.after, tv?.after].filter(Boolean);
    const cards = [
      ['timeline', '#/timeline', '歴史をたどる', '5 つの時代区分と 300 件を超える出来事。何の制約が変わったかで区切っています。'],
      ['entries', '#/entries', '索引から探す', `${D.games.length} 事例を、領域・状態・オンチェーンの範囲・拡張性で絞り込み。`],
      ['compare', '#/compare', '設計を比較する', '2〜4 件を 7 つの軸で並べます。総合点やランキングは付けません。'],
      ['graph', '#/graph', '発明のつながり', '確認された影響と分析上の類似を、線の種類で分けて辿ります。'],
    ];
    const ins = D.insights.slice().sort((x, y) => ({ high: 0, medium: 1, low: 2 }[x.confidence] - { high: 0, medium: 1, low: 2 }[y.confidence]));
    const root = D.integrity?.root || '';
    return `<section class="hero">
      <div class="hero-text">
        <p class="eyebrow">ONCHAIN GAME DESIGN ATLAS · 公開台帳のように、出典まで辿れる設計史</p>
        <h1>オンチェーンゲーム設計アトラス</h1>
        <p class="lede">何が発明され、何が成立せず、どこにまだ可能性が残っているか。2012 年の賭けゲームから 2026 年の AI エージェントまで、成功例だけでなく終了・停滞・転換した事例も同じ重さで記録した研究ツールです。すべての記述は出典に、すべての記録は内容ハッシュに結びついています。</p>
        <div class="btn-row"><a class="btn primary" href="#/questions">問いから始める</a><a class="btn" href="#/insights">主な知見を読む</a><a class="btn" href="#/entries">事例を一覧する</a></div>
      </div>
      ${A.charts.eraChain()}
      <p class="root-hash"><span>dataset root</span><code title="${esc(root)}">sha256:${esc(root.slice(0, 16))}…${esc(root.slice(-8))}</code><a href="#/about?s=integrity">この値の意味</a></p>
    </section>
    <dl class="stats">
      <div><dt>ENTRIES<span>事例</span></dt><dd>${D.games.length}<small>深掘り ${deep}</small></dd></div>
      <div><dt>EVENTS<span>出来事</span></dt><dd>${D.events.length}</dd></div>
      <div><dt>SOURCES<span>出典</span></dt><dd>${D.sources.length}<small>一次資料 ${D.sources.filter((x) => x.primary).length}</small></dd></div>
      <div><dt>INSIGHTS<span>インサイト</span></dt><dd>${D.insights.length}</dd></div>
      <div><dt>HYPOTHESES<span>設計仮説</span></dt><dd>${D.hypotheses.length}</dd></div>
      <div><dt>VERIFIED<span>独立検証</span></dt><dd>${D.games.filter((g) => g.verification).length}<small>/ ${D.games.length} 事例</small></dd></div>
    </dl>
    <section class="home-sec">
      <h2>使い方: 問いから実験まで</h2>
      ${A.charts.flow()}
    </section>
    <section class="home-sec">
      <h2>全体像</h2>
      <div class="viz-grid">${st.html}${mx.html}</div>
    </section>
    ${dd || tv ? `<section class="home-sec">
      <div class="sec-head"><h2>市場に残った記録</h2><span class="mono small muted">auto · CoinGecko / DefiLlama · ${esc(D.market?.fetchedAt?.slice(0, 10) || '')}</span></div>
      <p class="small muted">公開 API から自動取得した市場の値です。研究上の数値（運営発表・実測・推定）とは分けて扱い、遊ばれているかどうかの指標としては使いません。</p>
      <div class="viz-grid">${dd ? dd.html : ''}${tv ? tv.html : ''}</div>
    </section>` : ''}
    <section class="home-sec">
      <div class="sec-head"><h2>主な知見</h2><a href="#/insights">すべてのインサイト（${D.insights.length}）</a></div>
      <p class="small muted">確信度は証拠の量と質の評価で、正しさの保証ではありません。どのインサイトにも反例と、次に試す小さな実験が付いています。</p>
      <ul class="ins-list">${ins.map((i) => {
        const n = (s) => (i.evidence || []).filter((e) => e.stance === s).length;
        return `<li><a href="#/insight/${esc(i.id)}"><span class="ins-title">${esc(i.title)}</span><span class="ins-meta"><span class="conf conf-${esc(i.confidence)}">${esc(L.confidence[i.confidence])}</span><span class="tag">${esc(L.gap_type[i.gap_type] || i.gap_type)}</span><span class="small muted">支持 ${n('support')}・反例 ${n('counter')}</span></span></a></li>`;
      }).join('')}</ul>
    </section>
    <section class="home-sec">
      <h2>探し方</h2>
      <div class="home-grid">${cards.map(([k, h, t, d]) => `<a class="nav-card" href="${h}"><span><b>${t}</b><span class="muted">${d}</span></span></a>`).join('')}</div>
    </section>
    <section class="home-sec read">
      <h2>読み方の約束</h2>
      <p>本文の各文には ${A.kBadge('fact')}${A.kBadge('claim')}${A.kBadge('analysis')}${A.kBadge('unknown')} のラベルがあります（事実 ${facts.fact}・主張 ${facts.claim}・分析 ${facts.analysis}・未確認 ${facts.unknown} 文）。文末の小さな番号は出典で、押すと資料の詳細と、その資料を引用している箇所が開きます。黄色の番号は検索結果の要約しか確認できなかった資料です。</p>
      <p class="small muted">データ更新日: ${A.fmtDate(D.lastUpdated)}。調査と検証の方法は<a href="#/about">方法と定義</a>、出典の内訳と未確認事項は<a href="#/quality">データ品質</a>にあります。</p>
    </section>`;
  };
  V.home.after = (ctx) => { for (const f of V.home._after || []) f(document.getElementById('main')); };
  function countStatements() {
    const c = { fact: 0, claim: 0, analysis: 0, unknown: 0 };
    for (const g of D.games) {
      for (const arr of Object.values(g.article || {})) for (const st of arr || []) c[st.k] = (c[st.k] || 0) + 1;
      for (const st of Object.values(g.compare || {})) c[st.k] = (c[st.k] || 0) + 1;
    }
    return c;
  }
  A.countStatements = countStatements;

  // ---------- 索引 ----------
  const searchText = new Map();
  A.entryText = (g) => {
    if (!searchText.has(g.id)) {
      const parts = [g.name, g.name_ja, ...(g.aliases || []), g.team, ...(g.chains || []), g.summary, g.selection_reason];
      for (const arr of Object.values(g.article || {})) for (const st of arr || []) parts.push(st.t);
      for (const st of Object.values(g.compare || {})) parts.push(st?.t);
      searchText.set(g.id, A.norm(parts.filter(Boolean).join(' \n ')));
    }
    return searchText.get(g.id);
  };
  V.entries = ({ params }) => {
    const f = Object.fromEntries(['q', 'cat', 'status', 'onchain', 'ext', 'depth', 'kind', 'os', 'sort'].map((k) => [k, params.get(k) || '']));
    const opts = (map, cur) => `<option value="">すべて</option>` + Object.entries(map).map(([k, v]) => `<option value="${k}" ${cur === k ? 'selected' : ''}>${esc(v)}</option>`).join('');
    const tb = `<form class="toolbar" id="entry-filter" aria-label="索引の絞り込み">
      <label>キーワード<input type="search" name="q" value="${esc(f.q)}" placeholder="名前・本文"></label>
      <label>領域<select name="cat">${opts(L.categoryShort, f.cat)}</select></label>
      <label>状態<select name="status">${opts(L.status, f.status)}</select></label>
      <label>オンチェーンの範囲<select name="onchain">${opts(L.onchain, f.onchain)}</select></label>
      <label>拡張性<select name="ext">${opts(L.extensibility, f.ext)}</select></label>
      <label>ソース公開<select name="os">${opts(L.open_source, f.os)}</select></label>
      <label>種類<select name="kind">${opts(L.kind, f.kind)}</select></label>
      <label>深さ<select name="depth">${opts(L.depth, f.depth)}</select></label>
      <label>並び順<select name="sort"><option value="year" ${f.sort !== 'name' ? 'selected' : ''}>年代順</option><option value="name" ${f.sort === 'name' ? 'selected' : ''}>名前順</option></select></label>
      <button type="button" class="btn" id="reset-filter">条件をクリア</button>
    </form>`;
    return `<header class="page-head"><div class="page-head-text"><h1>索引</h1><p class="lede">分類は「NFT があるからフルオンチェーン」といった判断を避け、オンチェーンの範囲・オフチェーン依存・管理者権限・ソース公開・第三者が実際に拡張できた範囲を別々に記録しています。</p></div></header>
      ${tb}<p id="entry-count" class="muted small" aria-live="polite"></p><ul class="entry-list" id="entry-list"></ul>`;
  };
  V.entries.after = ({ params }) => {
    const form = A.$('#entry-filter');
    const render = () => {
      const fd = new FormData(form);
      const p = new URLSearchParams();
      for (const [k, v] of fd.entries()) if (v && !(k === 'sort' && v === 'year')) p.set(k, v);
      A.setParams(p);
      const q = A.norm(fd.get('q'));
      let list = D.games.filter((g) => {
        if (q && !q.split(/\s+/).every((t) => A.entryText(g).includes(t))) return false;
        if (fd.get('cat') && !(g.categories || []).some((c) => c.id === fd.get('cat'))) return false;
        if (fd.get('status') && g.status?.value !== fd.get('status')) return false;
        if (fd.get('onchain') && g.architecture?.onchain?.level !== fd.get('onchain')) return false;
        if (fd.get('ext') && g.architecture?.extensibility?.level !== fd.get('ext')) return false;
        if (fd.get('os') && g.architecture?.open_source?.level !== fd.get('os')) return false;
        if (fd.get('kind') && g.kind !== fd.get('kind')) return false;
        if (fd.get('depth') && g.depth !== fd.get('depth')) return false;
        return true;
      });
      if (fd.get('sort') === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
      else list.sort((a, b) => (A.yearOf(a) || '9999').localeCompare(A.yearOf(b) || '9999') || a.name.localeCompare(b.name));
      A.$('#entry-count').textContent = `${list.length} 件 / 全 ${D.games.length} 件`;
      A.$('#entry-list').innerHTML = list.map(entryItem).join('') || '<li class="muted">該当なし。条件を緩めてください。</li>';
    };
    form.addEventListener('input', render);
    form.addEventListener('submit', (e) => e.preventDefault());
    A.$('#reset-filter').addEventListener('click', () => { form.reset(); A.$$('select', form).forEach((s) => (s.value = s.name === 'sort' ? 'year' : '')); A.$('input[name=q]', form).value = ''; render(); });
    render();
  };
  function entryItem(g) {
    const a = g.architecture || {};
    const c0 = g.market?.coins?.[0];
    const chips = [c0 && c0.from_ath_pct != null ? `<span class="mchip" title="${esc(c0.symbol)} の現在価格（最高値からの変化、CoinGecko）">${esc(c0.symbol)} ${A.charts.usd(c0.price)} · 最高値から ${A.charts.pct(c0.from_ath_pct)}</span>` : '', g.market?.tvl ? `<span class="mchip" title="DefiLlama の TVL">TVL ${A.charts.usd(g.market.tvl.current)}</span>` : ''].join('');
    return `<li class="entry-item">
      <div class="ei-head">${A.charts.icon(g, 36)}<div><h3><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a> ${g.depth === 'deep' ? '<span class="tag primary">深掘り</span>' : ''}</h3>
      <div class="meta">${A.statusDot(g)}${esc(L.kind[g.kind])}・${esc(A.periodText(g))}・状態: ${esc(L.status[g.status?.value] || '不明')}・オンチェーン: ${esc(L.onchain[a.onchain?.level] || '不明')}・拡張: ${esc(L.extensibility[a.extensibility?.level] || '不明')}</div>
      <div>${A.catTags(g)}${chips}</div></div></div>
      <div class="acts">${entryActions(g.id)}</div>
      <p>${esc(g.summary)}</p></li>`;
  }

  // ---------- 詳細 ----------
  V.entry = ({ parts }) => {
    const g = I.game.get(parts[1]);
    if (!g) return notFound();
    A.ctxEntry = g.id;
    const a = g.architecture || {};
    const life = A.charts.lifeline(g);
    V.entry._after = life ? life.after : null;
    const dates = Object.entries(g.dates || {}).map(([k, d]) => `<dt>${{ announced: '発表', launched: '公開', ended: '終了' }[k]}</dt><dd>${A.fmtDate(d.date)}${d.note ? '（' + esc(d.note) + '）' : ''}${A.cites(d.s)}</dd>`).join('');
    const secs = g.depth === 'deep' || g.article ? A.ARTICLE_ORDER.filter((s) => g.article?.[s]?.length) : [];
    const events = (I.eventsByGame.get(g.id) || []).slice().sort((x, y) => x.date.localeCompare(y.date));
    const metrics = I.metricsByGame.get(g.id) || [];
    const rels = I.relationsByNode.get(g.id) || [];
    const ins = [...new Set(I.insightsByGame.get(g.id) || [])];
    const qs = [...new Set(I.questionsByGame.get(g.id) || [])];
    const hs = [...new Set(I.hypothesesByGame.get(g.id) || [])];
    const srcs = (g.sources || []).map((s) => I.source.get(s.id)).filter(Boolean);
    const toc = [['overview', '概要'], life && ['life', 'ライフライン'], ['arch', '構造'], ...secs.map((s) => [`sec-${s}`, L.section[s]]), ['axes', '比較軸'], g.market && (g.market.coins?.length || g.market.tvl) && ['market', '市場データ'], metrics.length && ['metrics', '数値'], events.length && ['events', '出来事'], rels.length && ['rels', 'つながり'], (g.unknowns?.length || g.contradictions?.length) && ['unknowns', '未確認・矛盾'], ['verification', '検証'], ['sources', '出典']].filter(Boolean);
    return `<div class="detail"><article>
      <p class="small muted"><a href="#/entries">索引</a> / ${esc(L.kind[g.kind])}</p>
      <div class="e-title">${A.charts.icon(g, 56)}<h1>${esc(g.name)}${g.name_ja ? ` <span class="muted small">${esc(g.name_ja)}</span>` : ''}</h1></div>
      <div>${A.catTags(g)} <span class="tag">${esc(L.depth[g.depth])}</span> <span class="tag">状態: ${esc(L.status[g.status?.value] || '不明')}${g.status?.as_of ? '（' + A.fmtDate(g.status.as_of) + '時点）' : ''}</span></div>
      <p class="rec-meta"><span class="vbadge ${g.verification ? 'ok' : 'no'}">${g.verification ? '✓ 独立検証済み' : '未検証'}</span><span class="mono">id: ${esc(g.id)}</span>${g.hash ? `<span class="mono" title="元データ ${esc(g.file)} の SHA-256">sha256:${esc(g.hash.slice(0, 12))}…</span>` : ''}<span class="mono">sources: ${(g.sources || []).length}</span><span class="mono">updated: ${esc(g.updated)}</span></p>
      <div class="btn-row">${entryActions(g.id)}<a class="btn" href="#/graph/${esc(g.id)}">つながりを見る</a></div>
      ${A.charts.linkBar(g)}
      <section id="overview"><p class="lede">${esc(g.summary)}</p>
      ${A.charts.accountMetrics(g)}
      <dl class="kv"><dt>選定理由</dt><dd>${esc(g.selection_reason)}</dd>
      ${g.team ? `<dt>開発主体</dt><dd>${esc(g.team)}</dd>` : ''}
      ${g.chains?.length ? `<dt>チェーン</dt><dd>${g.chains.map(esc).join('、')}</dd>` : ''}
      ${dates}
      <dt>状態</dt><dd>${esc(L.status[g.status?.value] || '不明')}${g.status?.note ? '：' + esc(g.status.note) : ''}${A.cites(g.status?.s)}</dd>
      <dt>分類の根拠</dt><dd>${(g.categories || []).map((c) => `<div><b>${esc(L.category[c.id])}</b>${c.role === 'primary' ? '（主）' : ''}：${esc(c.reason)}</div>`).join('')}</dd>
      <dt>最終調査日</dt><dd>${A.fmtDate(g.updated)}</dd></dl></section>
      ${life ? `<section id="life">${life.html}</section>` : ''}
      <section id="arch"><h2>構造：何がオンチェーンで、誰が何を変えられるか</h2>
      ${A.charts.archDiagram(g)}
      ${g.concepts?.length ? `<p class="small">関連する概念: ${g.concepts.map((c) => `<a class="tag" href="#/concept/${esc(c)}">${esc(A.nodeName(c))}</a>`).join('')}</p>` : ''}</section>
      ${secs.map((s, i) => `<section id="sec-${s}"><h2><span class="secno">§${i + 1}</span>${esc(L.section[s])}</h2>${A.stmts(g.article[s])}</section>`).join('')}
      ${g.depth === 'index' ? '<p class="note-box">この項目は索引レベルです。深掘り記事はまだありません。</p>' : ''}
      <section id="axes"><h2>比較軸</h2><dl class="kv">${A.AXES.map((ax) => `<dt>${esc(L.axis[ax])}</dt><dd>${A.stmt(g.compare?.[ax])}</dd>`).join('')}</dl>
      <p><a class="btn" href="#/compare/${esc(g.id)}">この項目から比較を始める</a></p></section>
      ${A.charts.marketBlock(g)}
      ${metrics.length ? `<section id="metrics"><h2>数値（定義・期間・性質つき）</h2>${A.metricTable(metrics)}</section>` : ''}
      ${events.length ? `<section id="events"><h2>出来事</h2><ul class="tl">${events.map(A.eventLi).join('')}</ul></section>` : ''}
      ${rels.length ? `<section id="rels"><h2>つながり</h2>${A.relTable(rels, g.id)}</section>` : ''}
      ${g.unknowns?.length || g.contradictions?.length ? `<section id="unknowns"><h2>未確認・矛盾</h2>
        ${g.unknowns?.length ? `<h3>確認できなかったこと</h3><ul>${g.unknowns.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}
        ${g.contradictions?.length ? `<h3>資料間の矛盾</h3><ul>${g.contradictions.map((c) => `<li>${esc(c.t)}${A.cites(c.s)}</li>`).join('')}</ul>` : ''}</section>` : ''}
      <section id="verification"><h2>検証</h2>${A.verifBox(g)}</section>
      <section id="sources"><h2>出典（${srcs.length}）</h2>${A.sourceTable(srcs)}</section>
    </article>
    <aside><div class="sticky">
      <nav class="toc card" aria-label="目次"><b>目次</b>${toc.map(([id, t]) => `<a href="#/entry/${esc(g.id)}" data-scroll="${id}">${esc(t)}</a>`).join('')}</nav>
      ${ins.length || qs.length || hs.length ? `<div class="card"><b>この事例が使われている所</b>
        ${ins.map((i) => `<div><a href="#/insight/${esc(i.id)}">インサイト: ${esc(i.title)}</a></div>`).join('')}
        ${qs.map((q) => `<div><a href="#/question/${esc(q.id)}">問い: ${esc(q.q)}</a></div>`).join('')}
        ${hs.map((h) => `<div><a href="#/hypotheses?focus=${esc(h.id)}">仮説: ${esc(h.title)}</a></div>`).join('')}</div>` : ''}
      ${A.noteBox(`entry:${g.id}`)}
    </div></aside></div>`;
  };
  V.entry.after = () => { if (V.entry._after) V.entry._after(document.getElementById('main')); };
  A.statusDot = (g) => `<span class="sdot" style="background:var(${A.charts.STATUS_VAR[g.status?.value || 'unknown']})" aria-hidden="true"></span>`;
  A.ARTICLE_ORDER = ['what', 'loop', 'before_after', 'onchain_tradeoffs', 'roles', 'trajectory', 'retention_evidence', 'extensions', 'constraints', 'principles', 'counter_evidence'];
  A.AXES = ['gameplay', 'necessity', 'information', 'persistence', 'extensibility', 'money_flow', 'entry_barrier'];

  A.noteBox = (key) => `<div class="card notes-area"><label for="note-${esc(key)}"><b>自分のメモ</b></label>
    <textarea id="note-${esc(key)}" data-note="${esc(key)}" placeholder="このブラウザにだけ保存されます">${esc(A.store.note(key))}</textarea>
    <div class="small muted" data-note-status="${esc(key)}">${A.store.note(key) ? '保存済み' : '入力すると自動保存'}</div></div>`;

  A.metricTable = (ms) => `<div class="table-wrap"><table><thead><tr><th>指標</th><th>値</th><th>期間・時点</th><th>性質</th><th>定義・注記</th><th>出典</th></tr></thead><tbody>
    ${ms.map((m) => `<tr><td>${esc(L.metric_type[m.type] || m.type)}${m.game && !A._inEntry ? `<div class="small"><a href="#/entry/${esc(m.game)}">${esc(A.nodeName(m.game))}</a></div>` : ''}</td>
    <td class="num">${m.value_text ? esc(m.value_text) : A.fmtNum(m.value)} ${esc(m.unit)}</td><td>${esc(m.period)}</td>
    <td><span class="k ${m.nature === 'measured' ? 'k-fact' : m.nature === 'reported' ? 'k-claim' : 'k-analysis'}">${esc(L.nature[m.nature])}</span></td>
    <td>${esc(m.definition)}${m.note ? `<div class="small muted">${esc(m.note)}</div>` : ''}</td><td>${A.cites(m.s)}</td></tr>`).join('')}</tbody></table></div>`;

  A.eventLi = (e) => `<li class="t-${esc(e.type)}"><span class="date">${A.fmtDate(e.date)}</span><span class="etype"><span class="tag">${esc(L.event_type[e.type] || e.type)}</span></span>
    <span>${e.games.map((g) => `<a href="#/entry/${esc(g)}">${esc(A.nodeName(g))}</a>`).join('・')}：${esc(e.title)}${e.derived ? ' <span class="derived">（項目の日付欄から生成）</span>' : ''}${e.detail ? `<div class="small muted">${esc(e.detail)}</div>` : ''}${A.cites(e.s)}</span></li>`;

  A.relTable = (rels, self) => `<div class="table-wrap"><table><thead><tr><th>起点</th><th>関係</th><th>対象</th><th>根拠の種類</th><th>説明</th><th>出典</th></tr></thead><tbody>
    ${rels.map((r) => `<tr><td>${r.from === self ? `<b>${esc(A.nodeName(r.from))}</b>` : A.nodeLink(r.from)}</td><td>${esc(L.relation_type[r.type] || r.type)}</td>
    <td>${r.to === self ? `<b>${esc(A.nodeName(r.to))}</b>` : A.nodeLink(r.to)}</td>
    <td><span class="k ${r.basis === 'confirmed' ? 'k-fact' : 'k-analysis'}">${esc(L.basis[r.basis])}</span></td><td>${esc(r.note || '')}</td><td>${A.cites(r.s)}</td></tr>`).join('')}</tbody></table></div>`;

  A.sourceTable = (srcs) => `<div class="table-wrap"><table><thead><tr><th>#</th><th>資料</th><th>種類</th><th>公開日</th><th>参照日</th><th>状態</th><th>リンク検査</th></tr></thead><tbody>
    ${srcs.map((s) => `<tr id="src-${esc(s.id)}"><td class="num">${A.srcNum(s) ? (s.ownerId === A.ctxEntry ? A.srcNum(s) : esc(A.nodeName(s.ownerId)) + ' ' + A.srcNum(s)) : ''}</td><td><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a><div class="small muted">${esc(s.publisher || '')}${s.author ? '・' + esc(s.author) : ''}${s.note ? '・' + esc(s.note) : ''} <a href="#/source/${esc(s.id)}">参照箇所</a></div></td>
    <td>${esc(L.source_type[s.type] || s.type)}<div class="small muted">${s.primary ? '一次資料' : '二次資料'}</div></td><td>${s.published ? A.fmtDate(s.published) : '<span class="muted">不明</span>'}</td><td>${A.fmtDate(s.accessed)}</td>
    <td>${s.access === 'fetched' ? esc(L.access[s.access]) : `<span class="k k-claim">${esc(L.access[s.access])}</span>`}</td>
    <td class="small">${A.linkLabel(s.link)}</td></tr>`).join('')}</tbody></table></div>`;

  A.LINK = { ok: '到達', 'repo-ok': 'リポジトリ確認', 'missing-repo': 'リポジトリなし', 'env-blocked': '検査環境で遮断', refused: 'サイトが自動検査を拒否', missing: '404', 'network-error': '接続不可' };
  A.linkLabel = (st) => {
    if (!st) return '<span class="muted">未検査</span>';
    const bad = ['missing', 'missing-repo', 'network-error'].includes(st) || st.startsWith('http-');
    return bad ? `<span class="k k-claim">${esc(A.LINK[st] || st)}</span>` : esc(A.LINK[st] || st);
  };
  A.verifBox = (g) => {
    if (!g.verification) return `<p class="note-box">この項目は独立した検証役による再確認をまだ受けていません。調査役の記述のみです。</p>`;
    const verdict = (g.verification.match(/総合判定[^\n]*\n?[^\n]*/) || [''])[0].replace(/[#*]/g, '').trim();
    return `<details class="card"><summary><b>検証記録</b>（独立した検証役による原資料との照合）${verdict ? '：' + esc(verdict.slice(0, 120)) : ''}</summary>
      <div class="small" class="pre" style="margin-top:.5rem">${esc(g.verification)}</div></details>`;
  };

  // ---------- 概念 ----------
  V.concept = ({ parts }) => {
    const c = I.concept.get(parts[1]);
    if (!c) return notFound();
    const games = (I.gamesByConcept.get(c.id) || []).slice().sort((a, b) => (A.yearOf(a) || '9999').localeCompare(A.yearOf(b) || '9999'));
    const rels = I.relationsByNode.get(c.id) || [];
    return `<div class="read"><p class="small muted"><a href="#/graph">つながり</a> / 概念</p><h1>${esc(c.name)}</h1>
      <p><span class="tag">${esc(L.concept_kind[c.kind])}</span></p><p class="lede">${esc(c.desc)}</p>
      <p><a class="btn" href="#/graph/${esc(c.id)}">つながりの図で見る</a></p>
      <h2>この概念を使う事例（年代順・${games.length} 件）</h2>
      <p class="small muted">年代順の並びは時期の前後を示すだけで、影響関係を意味しません。影響は下の「確認された関係」を参照してください。</p>
      <ul>${games.map((g) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a> <span class="muted small">${esc(A.periodText(g))}</span></li>`).join('') || '<li class="muted">なし</li>'}</ul>
      ${rels.length ? `<h2>関係</h2>${A.relTable(rels, c.id)}` : ''}</div>`;
  };

  // ---------- 出典 ----------
  V.sources = ({ params }) => {
    const t = params.get('type') || '';
    const ac = params.get('access') || '';
    const pr = params.get('primary') || '';
    let list = D.sources.slice();
    if (t) list = list.filter((s) => s.type === t);
    if (ac) list = list.filter((s) => s.access === ac);
    if (pr) list = list.filter((s) => String(s.primary) === pr);
    list.sort((a, b) => (a.published || '0').localeCompare(b.published || '0'));
    const opts = (map, cur) => `<option value="">すべて</option>` + Object.entries(map).map(([k, v]) => `<option value="${k}" ${cur === k ? 'selected' : ''}>${esc(v)}</option>`).join('');
    return `<h1>出典一覧</h1><p class="lede read">各資料の公開日と参照日を区別して表示します。「検索要約のみ」は本文を直接確認できなかった資料で、事実の唯一の根拠にはしていません（データ品質ページで検査）。</p>
      <form class="toolbar" id="src-filter"><label>種類<select name="type">${opts(L.source_type, t)}</select></label>
      <label>一次/二次<select name="primary"><option value="">すべて</option><option value="true" ${pr === 'true' ? 'selected' : ''}>一次資料</option><option value="false" ${pr === 'false' ? 'selected' : ''}>二次資料</option></select></label>
      <label>参照状態<select name="access">${opts(L.access, ac)}</select></label></form>
      <p class="muted small">${list.length} 件</p>${A.sourceTable(list)}`;
  };
  V.sources.after = () => {
    const f = A.$('#src-filter');
    f.addEventListener('change', () => { const p = new URLSearchParams(); for (const [k, v] of new FormData(f)) if (v) p.set(k, v); location.hash = `#/sources?${p}`; });
  };
  V.source = ({ parts }) => {
    const s = I.source.get(parts[1]);
    if (!s) return notFound();
    const refs = s.citedBy.map((r) => {
      if (r.type === 'game') return `<li><a href="#/entry/${esc(r.id)}">${esc(A.nodeName(r.id))}</a>（本文・構造・比較軸など）</li>`;
      if (r.type === 'metric') return `<li>数値 ${esc(r.id)}（<a href="#/entry/${esc(r.game)}">${esc(A.nodeName(r.game))}</a>）</li>`;
      if (r.type === 'event') return `<li>出来事 ${esc(r.id)}（<a href="#/entry/${esc(r.game)}">${esc(A.nodeName(r.game))}</a>）</li>`;
      if (r.type === 'relation') return `<li>関係: ${A.nodeLink(r.from)} → ${A.nodeLink(r.to)}</li>`;
      if (r.type === 'insight') return `<li><a href="#/insight/${esc(r.id)}">インサイト ${esc(I.insight.get(r.id)?.title || r.id)}</a></li>`;
      if (r.type === 'question') return `<li><a href="#/question/${esc(r.id)}">問い ${esc(I.question.get(r.id)?.q || r.id)}</a></li>`;
      if (r.type === 'hypothesis') return `<li><a href="#/hypotheses?focus=${esc(r.id)}">設計仮説 ${esc(I.hypothesis.get(r.id)?.title || r.id)}</a></li>`;
      return `<li>${esc(r.type)} ${esc(r.id || '')}</li>`;
    });
    const uniq = [...new Set(refs)];
    return `<div class="read"><p class="small muted"><a href="#/sources">出典一覧</a></p><h1>${esc(s.title)}</h1>
      <dl class="kv"><dt>URL</dt><dd><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></dd>
      <dt>発行者</dt><dd>${esc(s.publisher || '不明')}${s.author ? '・' + esc(s.author) : ''}</dd>
      <dt>種類</dt><dd>${esc(L.source_type[s.type])}（${s.primary ? '一次資料' : '二次資料'}）</dd>
      <dt>公開日</dt><dd>${s.published ? A.fmtDate(s.published) : '不明'}</dd><dt>参照日</dt><dd>${A.fmtDate(s.accessed)}</dd>
      <dt>参照状態</dt><dd>${esc(L.access[s.access])}</dd>${s.note ? `<dt>内容</dt><dd>${esc(s.note)}</dd>` : ''}
      <dt>ID</dt><dd><code>${esc(s.id)}</code></dd></dl>
      <h2>この資料を引用している箇所（${uniq.length}）</h2><ul>${uniq.join('') || '<li class="muted">なし</li>'}</ul></div>`;
  };

  // ---------- 全体検索 ----------
  V.search = ({ params }) => {
    const q = A.norm(params.get('q') || '');
    const terms = q.split(/\s+/).filter(Boolean);
    const hit = (txt) => terms.length && terms.every((t) => A.norm(txt).includes(t));
    const games = D.games.filter((g) => hit(A.entryText(g)));
    const ins = D.insights.filter((i) => hit([i.title, i.claim, i.conditions, i.experiment?.design].join(' ')));
    const qs = D.questions.filter((x) => hit([x.q, x.why].join(' ')));
    const hs = D.hypotheses.filter((h) => hit([h.title, h.summary, ...(h.mechanics || [])].join(' ')));
    const cs = D.concepts.filter((c) => hit([c.name, c.desc].join(' ')));
    const ss = D.sources.filter((s) => hit([s.title, s.publisher, s.note].join(' ')));
    const sec = (t, arr, f) => (arr.length ? `<h2>${t}（${arr.length}）</h2><ul>${arr.map(f).join('')}</ul>` : '');
    return `<div class="read"><h1>検索: ${esc(params.get('q') || '')}</h1>
      ${!terms.length ? '<p>上の検索欄に語句を入力してください。</p>' : ''}
      ${sec('事例', games, (g) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a> <span class="small muted">${esc(g.summary.slice(0, 80))}…</span></li>`)}
      ${sec('インサイト', ins, (i) => `<li><a href="#/insight/${esc(i.id)}">${esc(i.title)}</a></li>`)}
      ${sec('問い', qs, (x) => `<li><a href="#/question/${esc(x.id)}">${esc(x.q)}</a></li>`)}
      ${sec('設計仮説', hs, (h) => `<li><a href="#/hypotheses?focus=${esc(h.id)}">${esc(h.title)}</a></li>`)}
      ${sec('概念', cs, (c) => `<li><a href="#/concept/${esc(c.id)}">${esc(c.name)}</a></li>`)}
      ${sec('出典', ss, (s) => `<li><a href="#/source/${esc(s.id)}">${esc(s.title)}</a></li>`)}
      ${terms.length && !(games.length + ins.length + qs.length + hs.length + cs.length + ss.length) ? '<p>該当なし。</p>' : ''}</div>`;
  };

  // ---------- データ品質 ----------
  V.quality = () => {
    const Q = D.quality || { errors: [], warnings: [] };
    const c = countStatements();
    const snippetFacts = [];
    const noPrimary = [];
    for (const g of D.games) {
      const srcs = (g.sources || []).map((s) => I.source.get(s.id)).filter(Boolean);
      if (!srcs.some((s) => s.primary && s.access === 'fetched')) noPrimary.push(g);
      for (const [sec, arr] of Object.entries(g.article || {})) for (const st of arr || []) {
        if (st.k === 'fact' && st.s?.length && st.s.every((id) => I.source.get(id)?.access !== 'fetched')) snippetFacts.push({ g, sec, st });
      }
    }
    const unknownCount = D.games.reduce((n, g) => n + (g.unknowns?.length || 0), 0);
    const contra = D.games.flatMap((g) => (g.contradictions || []).map((x) => ({ g, x })));
    const byAccess = D.sources.reduce((m, s) => ((m[s.access] = (m[s.access] || 0) + 1), m), {});
    const primary = D.sources.filter((s) => s.primary).length;
    const unresolved = D.relations.filter((r) => !I.game.has(r.to) && !I.concept.has(r.to));
    return `<div class="read"><header class="page-head"><div class="page-head-text"><h1>データ品質</h1><p class="lede">ビルド時の自動検査（日付形式、参照 ID、出典の有無、分類の列挙値、未来日付など）の結果と、出典の性質の内訳です。エラーが 1 件でもあるとビルドは失敗します。</p></div></header>
      <h2>自動検査</h2><p>エラー <b>${Q.errors.length}</b> 件・警告 <b>${Q.warnings.length}</b> 件（${A.fmtDate(D.generated)} ビルド）</p>
      ${Q.warnings.length ? `<details><summary>警告の一覧</summary><ul class="small">${Q.warnings.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></details>` : ''}
      <h2>文の性質</h2><p>事実 ${c.fact}・当事者の主張 ${c.claim}・分析 ${c.analysis}・未確認 ${c.unknown}</p>
      <h2>出典</h2><p>全 ${D.sources.length} 件（一次資料 ${primary}・二次資料 ${D.sources.length - primary}）。参照済み ${byAccess.fetched || 0}・検索要約のみ ${byAccess.snippet || 0}・到達不能 ${byAccess.unreachable || 0}。</p>
      <h2>参照済みの一次資料がない項目（${noPrimary.length}）</h2><ul>${noPrimary.map((g) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a></li>`).join('') || '<li>なし</li>'}</ul>
      <h2>参照済みでない資料だけに依拠する「事実」（${snippetFacts.length}）</h2><ul class="small">${snippetFacts.map(({ g, sec, st }) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a>・${esc(L.section[sec])}：${esc(st.t.slice(0, 80))}</li>`).join('') || '<li>なし</li>'}</ul>
      <h2>未収録の項目を指す関係（${unresolved.length}）</h2><ul class="small">${unresolved.map((r) => `<li>${esc(r.from)} → ${esc(r.to)}</li>`).join('') || '<li>なし</li>'}</ul>
      <h2>資料間の矛盾（${contra.length}）</h2><ul>${contra.map(({ g, x }) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a>：${esc(x.t)}${A.cites(x.s)}</li>`).join('') || '<li>なし</li>'}</ul>
      <h2>確認できなかった事項（${unknownCount}）</h2>
      ${D.games.filter((g) => g.unknowns?.length).map((g) => `<details><summary>${esc(g.name)}（${g.unknowns.length}）</summary><ul>${g.unknowns.map((u) => `<li>${esc(u)}</li>`).join('')}</ul></details>`).join('')}
      <h2>独立検証の状況</h2><p>深掘り ${D.games.filter((g) => g.depth === 'deep').length} 件中 ${D.games.filter((g) => g.depth === 'deep' && g.verification).length} 件、索引 ${D.games.filter((g) => g.depth === 'index').length} 件中 ${D.games.filter((g) => g.depth === 'index' && g.verification).length} 件が検証役の再確認を受けています。</p>
      ${D.synthesisVerification ? `<details><summary>インサイト・問い・設計仮説・時代区分（統合層）の検証記録</summary><div class="small pre">${esc(D.synthesisVerification)}</div></details>` : '<p>統合層（インサイト等）は未検証です。</p>'}
      <details><summary>未検証の項目</summary><ul class="small">${D.games.filter((g) => !g.verification).map((g) => `<li><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a>（${esc(L.depth[g.depth])}）</li>`).join('') || '<li>なし</li>'}</ul></details>
      ${D.linkcheck ? `<h2>リンク検査</h2><p>${esc(D.linkcheck.summary)}</p><p class="small muted">「サイトが自動検査を拒否」は自動の HTTP 検査が 403/429 で拒否されたもので、調査時は閲覧用の経路で参照しています。GitHub はこの環境では HTTP が遮断されるため、git でリポジトリの存在だけを確かめています（ファイル単位は未確認）。</p>
        <h3>到達できなかった URL</h3><ul class="small">${D.sources.filter((s) => s.link && (['missing', 'missing-repo', 'network-error'].includes(s.link) || s.link.startsWith('http-'))).map((s) => `<li><a href="#/source/${esc(s.id)}">${esc(s.title)}</a> — ${A.linkLabel(s.link)}・資料の参照状態: ${esc(L.access[s.access])}</li>`).join('') || '<li>なし</li>'}</ul>` : ''}
    </div>`;
  };

  V.about = () => document.getElementById('about-tpl') ? '' : A.aboutHtml();

  function notFound() { return `<div class="read empty-state"><h1>見つかりません</h1><p>URL の項目が存在しないか、名前が変わった可能性があります。</p><p><a class="btn" href="#/entries">索引から探す</a> <a class="btn" href="#/">ホームへ</a></p></div>`; }
  A.notFound = notFound;
})();
