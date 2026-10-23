/* 探索画面: 年表、比較、つながり */
(function () {
  'use strict';
  const A = window.A;
  const { esc, L, I, D } = A;
  const V = A.views;

  // ---------- 年表 ----------
  const TYPE_GROUPS = [
    ['announce', '発表'], ['testnet', 'テスト公開'], ['launch', '公開'], ['round', 'ラウンド'], ['spec-change', '仕様変更'], ['pivot', '転換'],
    ['end', '終了'], ['incident', '事件'], ['funding', '資金調達'], ['release', 'リリース'], ['paper', '論文・論考'], ['other', 'その他'],
  ];
  V.timeline = ({ params }) => {
    const types = (params.get('types') || 'announce,testnet,launch,round,spec-change,pivot,end,incident,release,paper,other').split(',');
    const cat = params.get('cat') || '';
    const deepOnly = params.get('deep') === '1';
    return `<header class="page-head"><div class="page-head-text"><h1>年表</h1><p class="lede">発表・テスト公開・公開・仕様変更・終了を区別しています。日付は資料で確認できた精度のまま表示し（年のみ・月まで・日まで）、仮の日付は置きません。時代区分は「何の制約が変わったか」で切っています。</p></div></header>
      ${(V.timeline._chart = A.charts.launchesEnds()).html}
      <form class="toolbar" id="tl-filter" aria-label="年表の絞り込み">
        <fieldset class="chips"><legend>出来事の種類</legend>${TYPE_GROUPS.map(([k, v]) => `<label class="chip"><input type="checkbox" name="types" value="${k}" ${types.includes(k) ? 'checked' : ''}>${v}</label>`).join('')}</fieldset>
        <label>領域<select name="cat"><option value="">すべて</option>${Object.entries(L.categoryShort).map(([k, v]) => `<option value="${k}" ${cat === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
        <label class="chip" style="align-self:center"><input type="checkbox" name="deep" value="1" ${deepOnly ? 'checked' : ''}>深掘り項目のみ</label>
      </form>
      <p class="muted small" id="tl-count" aria-live="polite"></p>
      <div id="tl-body"></div>`;
  };
  V.timeline.after = () => {
    V.timeline._chart.after(document.getElementById('main'));
    const f = A.$('#tl-filter');
    const render = () => {
      const fd = new FormData(f);
      const types = fd.getAll('types');
      const cat = fd.get('cat');
      const deep = fd.get('deep') === '1';
      const p = new URLSearchParams();
      p.set('types', types.join(','));
      if (cat) p.set('cat', cat);
      if (deep) p.set('deep', '1');
      A.setParams(p);
      const okGame = (gid) => {
        const g = I.game.get(gid);
        if (!g) return false;
        if (cat && !(g.categories || []).some((c) => c.id === cat)) return false;
        if (deep && g.depth !== 'deep') return false;
        return true;
      };
      const evs = D.events.filter((e) => types.includes(e.type) && e.games.some(okGame));
      A.$('#tl-count').textContent = `${evs.length} 件の出来事`;
      const eras = D.eras.length ? D.eras : [{ id: 'all', title: '全期間', from: '0000', to: null, changes: [] }];
      const inEra = (e, era) => e.date >= era.from && (!era.to || e.date.slice(0, era.to.length) <= era.to);
      A.$('#tl-body').innerHTML = eras.map((era, ei) => {
        const list = evs.filter((e) => inEra(e, era));
        let lastYear = '';
        const items = list.map((e) => {
          const y = e.date.slice(0, 4);
          const head = y !== lastYear ? `<li class="year" aria-hidden="true" style="display:block">${y}</li>` : '';
          lastYear = y;
          return head + A.eventLi(e);
        }).join('');
        return `<section class="era" id="era-${esc(era.id)}"><div class="era-head"><div class="era-text"><p class="blk-label">BLOCK ${String(ei + 1).padStart(2, '0')} · ${ei ? `prev ← BLOCK ${String(ei).padStart(2, '0')}` : 'genesis'}</p><h2>${esc(era.title)} <span class="muted small">${A.fmtDate(era.from)} – ${era.to ? A.fmtDate(era.to) : '現在'}</span></h2>
          ${era.summary ? `<p>${esc(era.summary)}</p>` : ''}
          ${era.changes?.length ? `<details><summary>何が変化したか（${era.changes.length}）</summary>${A.stmts(era.changes)}</details>` : ''}
          ${era.unchanged ? `<p class="small"><b>変わらなかったこと：</b>${esc(era.unchanged)}</p>` : ''}
          ${era.key_games?.length ? `<p class="small">主な事例: ${era.key_games.map((g) => A.nodeLink(g)).join('、')}</p>` : ''}</div></div>
          ${list.length ? `<ul class="tl">${items}</ul>` : '<p class="muted small">この条件の出来事はありません。</p>'}</section>`;
      }).join('');
    };
    f.addEventListener('change', render);
    render();
    const era = A.parseHash().params.get('era');
    if (era) document.getElementById(`era-${era}`)?.scrollIntoView();
  };

  // ---------- 比較 ----------
  V.compare = ({ parts }) => {
    let ids = (parts[1] || '').split(',').filter((x) => I.game.has(x));
    if (!ids.length) ids = A.store.tray().filter((x) => I.game.has(x));
    const pickOpts = D.games.slice().sort((a, b) => a.name.localeCompare(b.name)).map((g) => `<option value="${esc(g.id)}">${esc(g.name)}${g.depth === 'deep' ? '（深掘り）' : ''}</option>`).join('');
    const sets = A.store.data().compareSets;
    const head = `<header class="page-head"><div class="page-head-text"><h1>設計を比較する</h1><p class="lede">2〜4 件を同じ軸で並べます。軸ごとの記述には事実・主張・分析のラベルと出典が付きます。総合点やランキングは意図的に作っていません。差の意味は自分で判断し、メモに残してください。</p></div></header>
      <div class="toolbar"><label>項目を追加<select id="cmp-add"><option value="">選択…</option>${pickOpts}</select></label>
      <div class="cmp-pick" id="cmp-current">${ids.map((id) => `<span class="tag primary">${esc(A.nodeName(id))} <button class="btn" style="padding:0 .3em" data-rm="${esc(id)}" aria-label="${esc(A.nodeName(id))} を外す">×</button></span>`).join('') || '<span class="muted small">未選択（索引や詳細の「比較に追加」でも選べます）</span>'}</div>
      ${ids.length >= 2 ? `<form id="cmp-save-form" class="cmp-save"><label>比較セットの名前<input type="text" id="cmp-save-name" value="${esc(ids.map(A.nodeName).join(' / '))}"></label><button class="btn" id="cmp-save">この組み合わせを保存</button></form>` : ''}
      <a class="btn" href="#/compare/dark-forest,axie-infinity" ${I.game.has('dark-forest') && I.game.has('axie-infinity') ? '' : 'hidden'}>例: Dark Forest と Axie Infinity</a></div>
      ${sets.length ? `<p class="small">保存した比較: ${sets.map((s) => `<a class="tag" href="#/compare/${esc(s.ids.join(','))}">${esc(s.name)}</a>`).join('')}</p>` : ''}`;
    if (ids.length < 2) return head + `<p class="note-box">比較するには 2 件以上を選んでください。</p>`;
    const gs = ids.map((id) => I.game.get(id));
    const row = (label, f) => `<tr><th scope="row" class="rowh">${label}</th>${gs.map((g) => `<td>${f(g)}</td>`).join('')}</tr>`;
    const arch = (key, map) => (g) => { const x = g.architecture?.[key]; return x ? `${A.charts.meter(A.charts.ORDERS[key], map, x.level, '')}<div class="small">${esc(x.detail || '')}${A.cites(x.s)}</div>` : '<span class="muted">未記入</span>'; };
    const metricsOf = (g) => (I.metricsByGame.get(g.id) || []).slice(0, 6).map((m) => `<div class="small">${esc(L.metric_type[m.type])}: ${m.value_text ? esc(m.value_text) : A.fmtNum(m.value)} ${esc(m.unit)}（${esc(m.period)}・${esc(L.nature[m.nature])}）${A.cites(m.s)}</div>`).join('') || '<span class="muted small">登録なし</span>';
    return head + `<div class="table-wrap"><table class="cmp-table"><thead><tr><th class="rowh">項目</th>${gs.map((g) => `<th><span class="cmp-h">${A.charts.icon(g, 24)}<a href="#/entry/${esc(g.id)}">${esc(g.name)}</a></span></th>`).join('')}</tr></thead><tbody>
      ${row('概要', (g) => `<div class="small">${esc(g.summary)}</div>`)}
      ${row('時期・状態', (g) => `${esc(A.periodText(g))}<div class="small">${esc(L.status[g.status?.value] || '不明')}</div>`)}
      ${row('領域', (g) => A.catTags(g))}
      ${A.AXES.map((ax) => row(esc(L.axis[ax]), (g) => `<div class="small">${A.stmt(g.compare?.[ax])}</div>`)).join('')}
      ${row('オンチェーンの範囲', arch('onchain', L.onchain))}
      ${row('オフチェーン依存', (g) => (g.architecture?.offchain || []).map((o) => `<div class="small">・${esc(o.item)}${A.cites(o.s)}</div>`).join('') || '<span class="muted small">未記入</span>')}
      ${row('管理者権限', arch('admin', L.admin))}
      ${row('ソース公開', arch('open_source', L.open_source))}
      ${row('第三者の拡張', arch('extensibility', L.extensibility))}
      ${row('公式リンク', (g) => A.charts.linkBar(g) || '<span class="muted small">未登録</span>')}
      ${row('市場データ（自動取得）', (g) => { const c = g.market?.coins?.[0]; const t = g.market?.tvl; return [c ? `<div class="small mono">${esc(c.symbol)} ${A.charts.usd(c.price)}・時価総額 ${A.charts.usd(c.market_cap)}・最高値から ${A.charts.pct(c.from_ath_pct)}</div>` : '', t ? `<div class="small mono">TVL ${A.charts.usd(t.current)}（ピーク ${A.charts.usd(t.peak)}・${esc(t.peak_date)}）</div>` : ''].join('') || '<span class="muted small">トークン・TVL なし</span>'; })}
      ${row('数値（定義が異なるため横比較に注意）', metricsOf)}
      ${row('持ち込める原理', (g) => g.article?.principles ? A.stmts(g.article.principles.slice(0, 3)) : '<span class="muted small">深掘りなし</span>')}
      ${row('反証・別の説明', (g) => g.article?.counter_evidence ? A.stmts(g.article.counter_evidence.slice(0, 3)) : '<span class="muted small">深掘りなし</span>')}
      </tbody></table></div>
      <div class="read" style="margin-top:1rem">${A.noteBox(`compare:${ids.slice().sort().join(',')}`)}</div>`;
  };
  V.compare.after = ({ parts }) => {
    let ids = (parts[1] || '').split(',').filter((x) => I.game.has(x));
    if (!ids.length) ids = A.store.tray().filter((x) => I.game.has(x));
    const go = (next) => { A.store.setTray(next); location.hash = `#/compare/${next.join(',')}`; };
    A.$('#cmp-add')?.addEventListener('change', (e) => {
      const v = e.target.value;
      if (!v || ids.includes(v)) return;
      if (ids.length >= 4) { A.toast('比較は最大 4 件です'); e.target.value = ''; return; }
      go([...ids, v]);
    });
    A.$$('[data-rm]').forEach((b) => b.addEventListener('click', () => go(ids.filter((x) => x !== b.dataset.rm))));
    A.$('#cmp-save-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = A.$('#cmp-save-name').value.trim() || ids.map(A.nodeName).join(' / ');
      A.store.saveCompareSet(name, ids);
      A.toast('比較セットを研究ノートに保存しました');
      A.rerender();
    });
  };

  // ---------- つながり ----------
  V.graph = ({ parts, params }) => {
    const center = parts[1] && (I.game.has(parts[1]) || I.concept.has(parts[1])) ? parts[1] : (I.game.has('loot') ? 'loot' : D.games[0]?.id);
    const showTags = params.get('tags') !== '0';
    const basisF = params.get('basis') || '';
    const nodes = [...D.games.map((g) => ({ id: g.id, name: g.name, t: 'game' })), ...D.concepts.map((c) => ({ id: c.id, name: c.name, t: 'concept' }))].sort((a, b) => a.name.localeCompare(b.name));
    return `<header class="page-head"><div class="page-head-text"><h1>発明のつながり</h1><p class="lede">中心に選んだ項目と、それに直接つながる項目だけを描きます（全体を一枚に描くと読めないため）。実線は当事者の言及やコードのフォークなど直接の証拠がある関係、破線は分析上の類似、点線は「その概念を使っている」というタグです。線の向きや配置に意味はありません。</p></div></header>
      <div class="toolbar"><label>中心<select id="g-center">${nodes.map((n) => `<option value="${esc(n.id)}" ${n.id === center ? 'selected' : ''}>${n.t === 'concept' ? '［概念］' : ''}${esc(n.name)}</option>`).join('')}</select></label>
        <label>関係の根拠<select id="g-basis"><option value="">すべて</option><option value="confirmed" ${basisF === 'confirmed' ? 'selected' : ''}>確認された関係のみ</option><option value="analytic" ${basisF === 'analytic' ? 'selected' : ''}>分析上の類似のみ</option></select></label>
        <label class="chip" style="align-self:center"><input type="checkbox" id="g-tags" ${showTags ? 'checked' : ''}>概念タグも表示</label></div>
      <div class="legend" aria-label="凡例">
        <span><svg width="40" height="10" aria-hidden="true"><line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" stroke-width="2"/></svg> 確認された関係</span>
        <span><svg width="40" height="10" aria-hidden="true"><line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 4"/></svg> 分析上の類似</span>
        <span><svg width="40" height="10" aria-hidden="true"><line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 3"/></svg> 概念タグ</span>
        <span><svg width="12" height="12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" fill="var(--accent-soft)" stroke="var(--accent)"/></svg> 事例</span><span><svg width="12" height="12" aria-hidden="true"><polygon points="6,0.5 11,3.25 11,8.75 6,11.5 1,8.75 1,3.25" fill="var(--surface-2)" stroke="var(--muted)"/></svg> 概念</span></div>
      <div class="graph-wrap"><div id="g-svg"></div><div id="g-side"></div></div>
      <h2>関係の一覧</h2>
      <form class="toolbar" id="rel-filter" aria-label="関係の絞り込み"><label>キーワード<input type="search" name="q" placeholder="名前・説明"></label>
        <label>根拠<select name="basis"><option value="">すべて</option><option value="confirmed">確認された関係</option><option value="analytic">分析上の類似</option></select></label>
        <label>種類<select name="type"><option value="">すべて</option>${Object.entries(L.relation_type).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></label></form>
      <p class="muted small" id="rel-count"></p><div id="rel-table"></div>`;
  };
  V.graph.after = ({ parts, params }) => {
    const sel = A.$('#g-center');
    const go = () => {
      const p = new URLSearchParams();
      if (!A.$('#g-tags').checked) p.set('tags', '0');
      if (A.$('#g-basis').value) p.set('basis', A.$('#g-basis').value);
      location.hash = `#/graph/${sel.value}${p.toString() ? '?' + p : ''}`;
    };
    sel.addEventListener('change', go);
    A.$('#g-basis').addEventListener('change', go);
    A.$('#g-tags').addEventListener('change', go);
    drawEgo(sel.value, params.get('tags') !== '0', params.get('basis') || '');
    const rf = A.$('#rel-filter');
    const renderRel = () => {
      const fd = new FormData(rf);
      const q = A.norm(fd.get('q'));
      const list = D.relations.filter((r) => (!fd.get('basis') || r.basis === fd.get('basis')) && (!fd.get('type') || r.type === fd.get('type'))
        && (!q || A.norm([A.nodeName(r.from), A.nodeName(r.to), r.note].join(' ')).includes(q)));
      A.$('#rel-count').textContent = `${list.length} 件 / 全 ${D.relations.length} 件`;
      A.$('#rel-table').innerHTML = A.relTable(list, null);
    };
    rf.addEventListener('input', renderRel);
    rf.addEventListener('submit', (e) => e.preventDefault());
    renderRel();
  };

  function drawEgo(center, showTags, basisF) {
    const edges = [];
    for (const r of I.relationsByNode.get(center) || []) {
      if (basisF && r.basis !== basisF) continue;
      const other = r.from === center ? r.to : r.from;
      edges.push({ other, kind: r.basis, label: L.relation_type[r.type], r });
    }
    if (showTags && !basisF) {
      if (I.game.has(center)) for (const c of I.game.get(center).concepts || []) edges.push({ other: c, kind: 'tagged', label: '' });
      if (I.concept.has(center)) for (const g of I.gamesByConcept.get(center) || []) edges.push({ other: g.id, kind: 'tagged', label: '' });
    }
    // 同じ相手への複数の線はまとめる（確認 > 分析 > タグ の優先）
    const rank = { confirmed: 0, analytic: 1, tagged: 2 };
    const byOther = new Map();
    for (const e of edges) {
      const prev = byOther.get(e.other);
      if (!prev) byOther.set(e.other, { ...e, labels: e.label ? [e.label] : [] });
      else {
        if (e.label && !prev.labels.includes(e.label)) prev.labels.push(e.label);
        if (rank[e.kind] < rank[prev.kind]) prev.kind = e.kind;
      }
    }
    const list = [...byOther.values()].sort((a, b) => rank[a.kind] - rank[b.kind] || A.nodeName(a.other).localeCompare(A.nodeName(b.other)));
    const n = list.length;
    const R = Math.max(170, Math.min(300, 90 + n * 9));
    const W = 2 * R + 420;
    const H = 2 * R + 120;
    const cx = W / 2, cy = H / 2;
    const isConcept = (id) => I.concept.has(id);
    const shape = (id, x, y, big) => {
      const name = A.nodeName(id);
      const short = name.length > 16 ? name.slice(0, 15) + '…' : name;
      const r = big ? 13 : 9;
      const hex = (cx, cy, k) => [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${(cx + k * Math.cos(a)).toFixed(1)},${(cy + k * Math.sin(a)).toFixed(1)}`; }).join(' ');
      const s = isConcept(id) ? `<polygon class="concept" points="${hex(x, y, 10)}"></polygon>` : `<rect class="game" x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" rx="1.5"></rect>`;
      const anchor = big ? 'middle' : x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle';
      const tx = big ? x : x + (anchor === 'end' ? -14 : anchor === 'start' ? 14 : 0);
      const ty = big ? y + 30 : y + 4 + (anchor === 'middle' ? (y < cy ? -16 : 20) : 0);
      return `${s}<text x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(short)}</text>`;
    };
    let svg = `<svg class="ego" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(A.nodeName(center))} を中心とした ${n} 件のつながり">`;
    list.forEach((e, i) => {
      const ang = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(n, 1);
      e.x = cx + R * Math.cos(ang);
      e.y = cy + R * Math.sin(ang);
      svg += `<line class="${e.kind}" x1="${cx}" y1="${cy}" x2="${e.x}" y2="${e.y}"></line>`;
    });
    list.forEach((e) => {
      if (e.labels.length) svg += `<text class="elabel" x="${cx + (e.x - cx) * 0.62}" y="${cy + (e.y - cy) * 0.62 - 3}" text-anchor="middle">${esc(e.labels.join('・'))}</text>`;
    });
    list.forEach((e) => {
      svg += `<g class="node" tabindex="0" role="link" data-go="${esc(e.other)}" aria-label="${esc(A.nodeName(e.other))}（${esc(e.kind === 'tagged' ? '概念タグ' : L.basis[e.kind])}${e.labels.length ? '・' + esc(e.labels.join('・')) : ''}）を中心にする">${shape(e.other, e.x, e.y, false)}</g>`;
    });
    svg += `<g class="center">${shape(center, cx, cy, true)}</g></svg>`;
    A.$('#g-svg').innerHTML = n ? svg : `<p class="note-box">${esc(A.nodeName(center))} にはまだ関係が登録されていません。</p>`;
    A.$$('#g-svg .node').forEach((el) => {
      const go = () => { location.hash = `#/graph/${el.dataset.go}${location.hash.includes('?') ? '?' + location.hash.split('?')[1] : ''}`; };
      el.addEventListener('click', go);
      el.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } });
    });
    const side = list.map((e) => `<li><span class="k ${e.kind === 'confirmed' ? 'k-fact' : e.kind === 'analytic' ? 'k-analysis' : 'k-unknown'}">${e.kind === 'tagged' ? 'タグ' : esc(L.basis[e.kind])}</span>${A.nodeLink(e.other)} ${e.labels.length ? `<span class="small muted">${esc(e.labels.join('・'))}</span>` : ''} <a class="small" href="#/graph/${esc(e.other)}">中心にする</a></li>`).join('');
    A.$('#g-side').innerHTML = `<div class="card"><h3><a href="${A.nodeHref(center)}">${esc(A.nodeName(center))}</a></h3>
      <p class="small muted">${I.concept.has(center) ? esc(I.concept.get(center).desc) : esc(I.game.get(center)?.summary || '')}</p>
      <ul class="small" style="padding-left:0;list-style:none">${side || '<li class="muted">なし</li>'}</ul></div>`;
  }
})();
