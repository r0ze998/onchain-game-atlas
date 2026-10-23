/* データから生成する図。すべて SVG/HTML で描き、ホバー（とキーボードのフォーカス）で詳細、表でも読めるようにする */
(function () {
  'use strict';
  const A = window.A;
  const { esc, L, I, D } = A;
  const C = (A.charts = {});

  // 状態の並び（凡例・積み上げの順序）。色は CSS のトークン（--s1..--s5、不明はグレー）
  C.STATUS_ORDER = ['active', 'pivoted', 'dormant', 'archived', 'ended', 'unknown'];
  C.STATUS_VAR = { active: '--s1', pivoted: '--s2', dormant: '--s3', archived: '--s4', ended: '--s5', unknown: '--s-other' };
  const col = (v) => `var(${v})`;

  // ---------- 共通: ツールチップ ----------
  let tip;
  function ensureTip() {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'viz-tip';
      tip.setAttribute('role', 'tooltip');
      tip.hidden = true;
      document.body.appendChild(tip);
    }
    return tip;
  }
  function showTip(html, x, y) {
    const t = ensureTip();
    t.innerHTML = html;
    t.hidden = false;
    const r = t.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    let left = x + 14;
    if (left + r.width > vw - 8) left = Math.max(8, x - r.width - 14);
    let top = y + 14;
    if (top + r.height > window.innerHeight - 8) top = Math.max(8, y - r.height - 14);
    t.style.left = `${left + window.scrollX}px`;
    t.style.top = `${top + window.scrollY}px`;
  }
  function hideTip() { if (tip) tip.hidden = true; }
  // data-tip を持つ要素にホバーとフォーカスの両方でツールチップを出す
  C.bindTips = (root, getHtml) => {
    root.addEventListener('pointermove', (e) => {
      const el = e.target.closest('[data-tip]');
      if (!el || !root.contains(el)) return hideTip();
      showTip(getHtml(el.dataset.tip), e.clientX, e.clientY);
    });
    root.addEventListener('pointerleave', hideTip);
    root.addEventListener('focusin', (e) => {
      const el = e.target.closest('[data-tip]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      showTip(getHtml(el.dataset.tip), r.left + r.width / 2, r.top + r.height / 2);
    });
    root.addEventListener('focusout', hideTip);
  };
  window.addEventListener('hashchange', hideTip);

  const yearOfDate = (d) => (d ? Number(String(d).slice(0, 4)) : null);
  const startYear = (g) => yearOfDate(g.dates?.launched?.date || g.dates?.announced?.date);
  const niceMax = (m) => { const steps = [2, 4, 5, 6, 8, 10, 12, 14, 16, 20, 25, 30, 40, 50]; return steps.find((s) => s >= m) || Math.ceil(m / 10) * 10; };
  const legend = (items) => `<ul class="viz-legend">${items.map(([label, v]) => `<li><span class="sw" style="background:${col(v)}"></span>${esc(label)}</li>`).join('')}</ul>`;
  const listNames = (gs) => gs.map((g) => esc(g.name)).join('、');

  // ---------- 1. 開始年 × 現在の状態（積み上げ縦棒） ----------
  C.statusByYear = () => {
    const games = D.games.filter((g) => g.kind === 'game' || g.kind === 'platform' || g.kind === 'protocol');
    const known = games.filter((g) => startYear(g));
    const years = [];
    const y0 = Math.min(...known.map(startYear));
    const y1 = Math.max(...known.map(startYear));
    for (let y = y0; y <= y1; y++) years.push(y);
    const by = new Map(years.map((y) => [y, Object.fromEntries(C.STATUS_ORDER.map((s) => [s, []]))]));
    for (const g of known) by.get(startYear(g))[g.status?.value || 'unknown'].push(g);
    const totals = years.map((y) => C.STATUS_ORDER.reduce((n, s) => n + by.get(y)[s].length, 0));
    const max = niceMax(Math.max(...totals));
    const W = 720, H = 260, ml = 30, mr = 8, mt = 12, mb = 28;
    const bw = (W - ml - mr) / years.length;
    const barW = Math.min(24, bw - 6);
    const ys = (v) => mt + (H - mt - mb) * (1 - v / max);
    let svg = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="開始年ごとの事例数と現在の状態の積み上げ縦棒グラフ">`;
    const stepT = [1, 2, 5, 10, 20].find((k) => max / k <= 5);
    for (let t = 0; t <= max; t += stepT) svg += `<line class="grid" x1="${ml}" x2="${W - mr}" y1="${ys(t)}" y2="${ys(t)}"></line><text class="tick" x="${ml - 6}" y="${ys(t) + 4}" text-anchor="end">${t}</text>`;
    years.forEach((y, i) => {
      const x = ml + i * bw + (bw - barW) / 2;
      let acc = 0;
      const stack = C.STATUS_ORDER.filter((s) => by.get(y)[s].length);
      stack.forEach((s, j) => {
        const n = by.get(y)[s].length;
        const yTop = ys(acc + n);
        const yBot = ys(acc);
        const h = Math.max(0, yBot - yTop - (j > 0 ? 2 : 0));
        const isTop = j === stack.length - 1;
        // 4px の角丸は最上段のデータ端だけ。下端は四角のまま
        svg += isTop
          ? `<path d="M${x},${yTop + h} V${yTop + 4} Q${x},${yTop} ${x + 4},${yTop} H${x + barW - 4} Q${x + barW},${yTop} ${x + barW},${yTop + 4} V${yTop + h} Z" fill="${col(C.STATUS_VAR[s])}"></path>`
          : `<rect x="${x}" y="${yTop}" width="${barW}" height="${h}" fill="${col(C.STATUS_VAR[s])}"></rect>`;
        acc += n;
      });
      if (totals[i]) svg += `<text class="val" x="${x + barW / 2}" y="${ys(totals[i]) - 5}" text-anchor="middle">${totals[i]}</text>`;
      if (y % 2 === 0 || years.length < 10) svg += `<text class="tick" x="${x + barW / 2}" y="${H - 10}" text-anchor="middle">${y}</text>`;
      svg += `<rect class="hit" data-tip="${y}" tabindex="0" x="${ml + i * bw}" y="${mt}" width="${bw}" height="${H - mt - mb}" aria-label="${y}年 ${totals[i]} 件"></rect>`;
    });
    svg += `<line class="axis" x1="${ml}" x2="${W - mr}" y1="${ys(0)}" y2="${ys(0)}"></line></svg>`;
    const unknownN = games.length - known.length;
    const table = `<details class="viz-table"><summary>表で見る</summary><div class="table-wrap"><table><thead><tr><th>開始年</th>${C.STATUS_ORDER.map((s) => `<th>${esc(L.status[s])}</th>`).join('')}<th>計</th></tr></thead><tbody>
      ${years.map((y, i) => `<tr><td>${y}</td>${C.STATUS_ORDER.map((s) => `<td class="num">${by.get(y)[s].length || ''}</td>`).join('')}<td class="num">${totals[i]}</td></tr>`).join('')}</tbody></table></div></details>`;
    return {
      html: `<figure class="viz-fig" id="viz-status"><figcaption><b>いつ始まり、今どうなっているか</b><span>ゲーム・プラットフォーム ${known.length} 件を公開（不明なら発表）年で数え、2026 年 10 月時点の状態で塗り分け。開始年不明 ${unknownN} 件と、研究・論考・エンジンは除く。</span></figcaption>
        ${legend(C.STATUS_ORDER.map((s) => [L.status[s], C.STATUS_VAR[s]]))}<div class="viz-scroll">${svg}</div>${table}</figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-status'), (y) => {
        const b = by.get(Number(y));
        return `<b>${y}年に開始</b>${C.STATUS_ORDER.filter((s) => b[s].length).map((s) => `<div><span class="sw" style="background:${col(C.STATUS_VAR[s])}"></span>${esc(L.status[s])} ${b[s].length}：<span class="muted">${listNames(b[s])}</span></div>`).join('')}`;
      }),
    };
  };

  // ---------- 2. 領域 × オンチェーンの範囲（ヒートマップ） ----------
  const ONCHAIN_ORDER = ['all', 'core-rules', 'partial-rules', 'assets-only', 'none', 'unknown'];
  C.domainMatrix = () => {
    const cats = Object.keys(L.category);
    const cell = (c, o) => D.games.filter((g) => (g.categories || []).some((x) => x.id === c) && g.architecture?.onchain?.level === o);
    const max = Math.max(...cats.flatMap((c) => ONCHAIN_ORDER.map((o) => cell(c, o).length)));
    const step = (n) => (n === 0 ? 0 : Math.min(6, 1 + Math.floor(((n - 1) / Math.max(1, max - 1)) * 5)));
    const rows = cats.map((c) => `<tr><th scope="row">${esc(L.categoryShort[c])}</th>${ONCHAIN_ORDER.map((o) => {
      const gs = cell(c, o);
      const s = step(gs.length);
      return `<td class="hm-cell"><a class="hm s${s}" href="#/entries?cat=${c}&onchain=${o}" data-tip="${c}|${o}" aria-label="${esc(L.categoryShort[c])} × ${esc(L.onchain[o])}: ${gs.length} 件">${gs.length || '·'}</a></td>`;
    }).join('')}</tr>`).join('');
    return {
      html: `<figure class="viz-fig" id="viz-matrix"><figcaption><b>何をチェーンに載せたか</b><span>領域（重複所属あり）ごとに、ルールと状態のどこまでがオンチェーンかを数えた。マスを押すとその事例の一覧へ。</span></figcaption>
        <div class="table-wrap hm-wrap"><table class="hm-table"><thead><tr><th></th>${ONCHAIN_ORDER.map((o) => `<th scope="col">${esc(L.onchain[o])}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
        <p class="viz-note">色が濃いほど件数が多い。「資産のみ」はアイテムや通貨の所有だけをチェーンに置き、遊びのルールはサーバー側にある事例。</p></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-matrix'), (k) => {
        const [c, o] = k.split('|');
        const gs = cell(c, o);
        return `<b>${esc(L.categoryShort[c])} × ${esc(L.onchain[o])}：${gs.length} 件</b><div class="muted">${listNames(gs) || 'なし'}</div>`;
      }),
    };
  };

  // ---------- 3. 年ごとの公開と終了（上下の縦棒、共通の 1 軸） ----------
  C.launchesEnds = () => {
    const launches = new Map();
    const ends = new Map();
    // 研究・論考は「公開」ではなく発表なので除く（1979 年の論文などで軸が伸びるのも防ぐ）
    for (const g of D.games.filter((x) => x.kind !== 'research' && x.kind !== 'essay')) {
      const ly = yearOfDate(g.dates?.launched?.date);
      const ey = yearOfDate(g.dates?.ended?.date);
      if (ly) { if (!launches.has(ly)) launches.set(ly, []); launches.get(ly).push(g); }
      if (ey) { if (!ends.has(ey)) ends.set(ey, []); ends.get(ey).push(g); }
    }
    const allY = [...launches.keys(), ...ends.keys()];
    const y0 = Math.min(...allY), y1 = Math.max(...allY, 2026);
    const years = [];
    for (let y = y0; y <= y1; y++) years.push(y);
    const maxUp = niceMax(Math.max(...years.map((y) => launches.get(y)?.length || 0)));
    const maxDn = niceMax(Math.max(2, ...years.map((y) => ends.get(y)?.length || 0)));
    const W = 720, H = 240, ml = 30, mr = 8, mt = 14, mb = 26;
    const plotH = H - mt - mb;
    const zero = mt + plotH * (maxUp / (maxUp + maxDn));
    const sc = plotH / (maxUp + maxDn);
    const bw = (W - ml - mr) / years.length;
    const barW = Math.min(20, bw - 6);
    let svg = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="年ごとの公開数（上）と終了数（下）">`;
    svg += `<text class="tick" x="${ml - 6}" y="${zero - maxUp * sc + 4}" text-anchor="end">${maxUp}</text><text class="tick" x="${ml - 6}" y="${zero + maxDn * sc + 4}" text-anchor="end">${maxDn}</text>`;
    svg += `<line class="grid" x1="${ml}" x2="${W - mr}" y1="${zero - maxUp * sc}" y2="${zero - maxUp * sc}"></line><line class="grid" x1="${ml}" x2="${W - mr}" y1="${zero + maxDn * sc}" y2="${zero + maxDn * sc}"></line>`;
    years.forEach((y, i) => {
      const x = ml + i * bw + (bw - barW) / 2;
      const u = launches.get(y)?.length || 0;
      const d = ends.get(y)?.length || 0;
      if (u) { const h = u * sc; svg += `<path d="M${x},${zero} V${zero - h + 4} Q${x},${zero - h} ${x + 4},${zero - h} H${x + barW - 4} Q${x + barW},${zero - h} ${x + barW},${zero - h + 4} V${zero} Z" fill="var(--s1)"></path><text class="val" x="${x + barW / 2}" y="${zero - h - 4}" text-anchor="middle">${u}</text>`; }
      if (d) { const h = d * sc; svg += `<path d="M${x},${zero + 1} V${zero + h - 4} Q${x},${zero + h} ${x + 4},${zero + h} H${x + barW - 4} Q${x + barW},${zero + h} ${x + barW},${zero + h - 4} V${zero + 1} Z" fill="var(--s2)"></path><text class="val" x="${x + barW / 2}" y="${zero + h + 12}" text-anchor="middle">${d}</text>`; }
      if (y % 2 === 0) svg += `<text class="tick" x="${x + barW / 2}" y="${H - 8}" text-anchor="middle">${y}</text>`;
      svg += `<rect class="hit" data-tip="${y}" tabindex="0" x="${ml + i * bw}" y="${mt}" width="${bw}" height="${plotH}" aria-label="${y}年 公開 ${u} 件・終了 ${d} 件"></rect>`;
    });
    svg += `<line class="axis" x1="${ml}" x2="${W - mr}" y1="${zero}" y2="${zero}"></line></svg>`;
    const table = `<details class="viz-table"><summary>表で見る</summary><div class="table-wrap"><table><thead><tr><th>年</th><th>公開</th><th>終了</th></tr></thead><tbody>${years.map((y) => `<tr><td>${y}</td><td class="num">${launches.get(y)?.length || ''}</td><td class="num">${ends.get(y)?.length || ''}</td></tr>`).join('')}</tbody></table></div></details>`;
    return {
      html: `<figure class="viz-fig" id="viz-launch"><figcaption><b>公開と終了の波</b><span>各事例（研究・論考を除く）の「公開日」と「終了日」が分かるものだけを年で数えた（上: 公開、下: 終了）。活動停止や転換は終了に含めない。</span></figcaption>
        ${legend([['公開', '--s1'], ['終了', '--s2']])}<div class="viz-scroll">${svg}</div>${table}</figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-launch'), (y) => {
        const u = launches.get(Number(y)) || [];
        const d = ends.get(Number(y)) || [];
        return `<b>${y}年</b><div><span class="sw" style="background:var(--s1)"></span>公開 ${u.length}：<span class="muted">${listNames(u) || 'なし'}</span></div><div><span class="sw" style="background:var(--s2)"></span>終了 ${d.length}：<span class="muted">${listNames(d) || 'なし'}</span></div>`;
      }),
    };
  };

  // ---------- 4. 段階のメーター（色だけに頼らず文字でも示す） ----------
  C.meter = (order, labels, value, hint) => {
    const known = value && value !== 'unknown';
    const steps = order.filter((x) => x !== 'unknown');
    return `<div class="meter" role="img" aria-label="${esc(hint)}: ${esc(labels[value] || '不明')}">
      <div class="meter-bar">${steps.map((s) => `<span class="${known && s === value ? 'on' : ''}" title="${esc(labels[s])}"></span>`).join('')}</div>
      <div class="meter-ends"><span>${esc(labels[steps[0]])}</span><span>${esc(labels[steps[steps.length - 1]])}</span></div>
      <div class="meter-val">${known ? esc(labels[value]) : '<span class="muted">不明</span>'}</div></div>`;
  };
  C.ORDERS = {
    onchain: ['all', 'core-rules', 'partial-rules', 'assets-only', 'none', 'unknown'],
    admin: ['none-known', 'limited', 'significant', 'unknown'],
    open_source: ['full', 'partial', 'none', 'unknown'],
    extensibility: ['permissionless-onchain', 'client-mods', 'official-api', 'none', 'unknown'],
  };

  // ---------- 5. 構造図（詳細画面） ----------
  C.archDiagram = (g) => {
    const a = g.architecture || {};
    const off = a.offchain || [];
    return `<figure class="arch" aria-label="${esc(g.name)} の構造図">
      <div class="arch-row">
        <div class="arch-box on"><div class="arch-h">チェーン上</div>${C.meter(C.ORDERS.onchain, L.onchain, a.onchain?.level, 'オンチェーンの範囲')}
          <p>${esc(a.onchain?.detail || '未記入')}${A.cites(a.onchain?.s)}</p></div>
        <div class="arch-link" aria-hidden="true"><span>状態の読み書き</span></div>
        <div class="arch-box off"><div class="arch-h">チェーン外（依存しているもの）</div>
          ${off.length ? `<ul>${off.map((o) => `<li>${esc(o.item)}${A.cites(o.s)}</li>`).join('')}</ul>` : '<p class="muted">記録なし</p>'}</div>
      </div>
      <div class="arch-row three">
        <div class="arch-box"><div class="arch-h">運営が変えられること（管理者権限）</div>${C.meter(C.ORDERS.admin, L.admin, a.admin?.level, '管理者権限')}<p>${esc(a.admin?.detail || '')}${A.cites(a.admin?.s)}</p></div>
        <div class="arch-box"><div class="arch-h">ソースの公開</div>${C.meter(C.ORDERS.open_source, L.open_source, a.open_source?.level, 'ソース公開')}<p>${esc(a.open_source?.detail || '')}${a.open_source?.url ? ` <a href="${esc(a.open_source.url)}" target="_blank" rel="noopener">ソース</a>` : ''}${A.cites(a.open_source?.s)}</p></div>
        <div class="arch-box"><div class="arch-h">第三者が拡張できること</div>${C.meter(C.ORDERS.extensibility, L.extensibility, a.extensibility?.level, '第三者の拡張')}<p>${esc(a.extensibility?.detail || '')}${A.cites(a.extensibility?.s)}</p></div>
      </div></figure>`;
  };

  // ---------- 6. 出来事のライフライン（詳細画面） ----------
  const EVENT_GROUP = { announce: 'start', testnet: 'start', launch: 'start', round: 'change', 'spec-change': 'change', pivot: 'change', release: 'change', end: 'end', incident: 'end', funding: 'other', paper: 'other', other: 'other' };
  const GROUP_VAR = { start: '--s1', change: '--s4', end: '--s2', other: '--s-other' };
  const GROUP_LABEL = { start: '発表・公開', change: '仕様変更・ラウンド・転換', end: '終了・事件', other: 'その他' };
  C.lifeline = (g) => {
    const evs = (I.eventsByGame.get(g.id) || []).filter((e) => e.games[0] === g.id || e.games.includes(g.id)).slice().sort((a, b) => a.date.localeCompare(b.date));
    if (evs.length < 2) return '';
    const t = (d) => { const [y, m = '07', day = '15'] = d.split('-'); return Number(y) + (Number(m) - 1) / 12 + (Number(day) - 1) / 365; };
    const y0 = Math.floor(t(evs[0].date));
    const y1 = Math.max(Math.ceil(t(evs[evs.length - 1].date) + 0.01), y0 + 2);
    const W = 720, H = 92, ml = 12, mr = 12, base = 44;
    const xs = (v) => ml + ((v - y0) / (y1 - y0)) * (W - ml - mr);
    let svg = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(g.name)} の出来事の時系列">`;
    svg += `<line class="axis" x1="${ml}" x2="${W - mr}" y1="${base}" y2="${base}"></line>`;
    const span = y1 - y0;
    const every = span > 12 ? 4 : span > 6 ? 2 : 1;
    for (let y = y0; y <= y1; y++) if ((y - y0) % every === 0) svg += `<line class="grid" x1="${xs(y)}" x2="${xs(y)}" y1="${base - 26}" y2="${base + 6}"></line><text class="tick" x="${xs(y)}" y="${H - 8}" text-anchor="middle">${y}</text>`;
    const g0 = g.dates || {};
    if (g0.launched?.date) { const x0 = xs(t(g0.launched.date)); const x1 = g0.ended?.date ? xs(t(g0.ended.date)) : xs(Math.min(y1, 2026.8)); svg += `<rect class="life" x="${x0}" y="${base - 3}" width="${Math.max(2, x1 - x0)}" height="6" rx="3"></rect>`; }
    // 同じ位置の点は少し上へずらす
    const placed = [];
    evs.forEach((e, i) => {
      const x = xs(t(e.date));
      let lvl = 0;
      while (placed.some((p) => p.lvl === lvl && Math.abs(p.x - x) < 11)) lvl++;
      placed.push({ x, lvl });
      const grp = EVENT_GROUP[e.type] || 'other';
      svg += `<circle data-tip="${i}" tabindex="0" cx="${x}" cy="${base - lvl * 11}" r="5" fill="var(${GROUP_VAR[grp]})" stroke="var(--surface)" stroke-width="2" aria-label="${esc(A.fmtDate(e.date))} ${esc(L.event_type[e.type])}: ${esc(e.title)}"></circle>`;
    });
    svg += `</svg>`;
    const groups = [...new Set(evs.map((e) => EVENT_GROUP[e.type] || 'other'))];
    return {
      html: `<figure class="viz-fig" id="viz-life"><figcaption><b>出来事のライフライン</b><span>点は出来事、帯は公開から終了（または現在）まで。点にカーソルを合わせると内容と日付。下の「出来事」に全件。</span></figcaption>
        ${legend(groups.map((k) => [GROUP_LABEL[k], GROUP_VAR[k]]))}<div class="viz-scroll">${svg}</div></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-life'), (i) => {
        const e = evs[Number(i)];
        return `<b>${esc(A.fmtDate(e.date))}・${esc(L.event_type[e.type])}</b><div>${esc(e.title)}</div>`;
      }),
    };
  };

  // ---------- 7. 支持と反例の天秤（インサイト） ----------
  C.balance = (evidence) => {
    const s = evidence.filter((e) => e.stance === 'support');
    const c = evidence.filter((e) => e.stance === 'counter');
    const x = evidence.filter((e) => e.stance === 'context');
    const n = Math.max(1, s.length, c.length);
    const chips = (arr) => arr.map((e) => `<a class="chip-link" href="#/entry/${esc(e.game)}">${esc(A.nodeName(e.game))}</a>`).join('');
    return `<figure class="balance" aria-label="支持 ${s.length} 件、反例 ${c.length} 件、文脈 ${x.length} 件">
      <div class="bal-side sup"><div class="bal-n"><b>${s.length}</b> 支持</div><div class="bal-bar"><span style="width:${(s.length / n) * 100}%"></span></div><div class="bal-chips">${chips(s)}</div></div>
      <div class="bal-side cnt"><div class="bal-n"><b>${c.length}</b> 反例</div><div class="bal-bar"><span style="width:${(c.length / n) * 100}%"></span></div><div class="bal-chips">${chips(c)}</div></div>
      ${x.length ? `<div class="bal-ctx small muted">文脈として参照: ${chips(x)}</div>` : ''}</figure>`;
  };

  // ---------- 8. 読み方の流れ図（ホーム） ----------
  C.flow = () => {
    const steps = [
      ['questions', '問い', '開発中に迷う問いから始める', '#/questions'],
      ['insights', 'インサイト', '支持事例・反例・成立条件を読む', '#/insights'],
      ['hypotheses', '設計仮説', '破綻条件と実験のコストを比べる', '#/hypotheses'],
      ['notebook', '研究ノート', '実験を選び、結果を記録する', '#/notebook'],
    ];
    return `<ol class="flow">${steps.map(([k, t, d, h], i) => `<li><a href="${h}"><span class="flow-step">${i + 1}</span><b>${t}</b><span>${d}</span></a></li>`).join('')}</ol>`;
  };
})();

/* 時代区分をブロックの連なりとして描く（ホームの冒頭）。数値は研究データから数える */
(function () {
  'use strict';
  const A = window.A;
  const { esc, D } = A;
  A.charts.eraChain = () => {
    const inEra = (date, era) => date >= era.from && (!era.to || date.slice(0, era.to.length) <= era.to);
    const blocks = D.eras.map((era, i) => {
      const evs = D.events.filter((e) => inEra(e.date, era));
      const starts = D.games.filter((g) => { const d = g.dates?.launched?.date || g.dates?.announced?.date; return d && inEra(d, era); });
      const ends = evs.filter((e) => e.type === 'end').length;
      const [head, tail] = era.title.split(/\s*—\s*/);
      return `<li class="blk"><a href="#/timeline?era=${esc(era.id)}" aria-label="時代 ${i + 1}: ${esc(era.title)}">
        <span class="blk-h"><span>BLOCK ${String(i + 1).padStart(2, '0')}</span><span>${esc(era.from.slice(0, 4))}–${era.to ? esc(era.to.slice(0, 4)) : 'now'}</span></span>
        <b class="blk-t">${esc(head)}</b>${tail ? `<span class="blk-s">${esc(tail)}</span>` : ''}
        <span class="blk-k"><span><em>${starts.length}</em>事例が開始</span><span><em>${evs.length}</em>出来事</span><span><em>${ends}</em>終了</span></span>
        <span class="blk-prev">${i ? `prev ← BLOCK ${String(i).padStart(2, '0')}` : 'genesis'}</span></a></li>`;
    });
    return `<ol class="chain" aria-label="時代区分（ブロックごとに 1 つの時代）">${blocks.join('')}</ol>`;
  };
})();

/* 公式リンク・アイコン・市場データ・利用者指標 */
(function () {
  'use strict';
  const A = window.A;
  const { esc, L, I, D } = A;
  const C = A.charts;

  // 記録ハッシュから決まる 5×5 の対称パターン（アイコンが無い事例の代わり）
  C.identicon = (g, size = 40) => {
    const h = g.hash || g.id.split('').map((c) => c.charCodeAt(0).toString(16)).join('').padEnd(64, '0');
    const bits = h.slice(0, 15).split('').map((c) => parseInt(c, 16) % 2 === 0);
    let cells = '';
    for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) if (bits[y * 3 + x]) {
      cells += `<rect x="${x}" y="${y}" width="1" height="1"></rect>`;
      if (x < 2) cells += `<rect x="${4 - x}" y="${y}" width="1" height="1"></rect>`;
    }
    return `<svg class="eicon ident" width="${size}" height="${size}" viewBox="-0.5 -0.5 6 6" aria-hidden="true"><title>記録ハッシュから生成した識別用パターン</title>${cells}</svg>`;
  };
  C.icon = (g, size = 40) => (g.market?.icon ? `<img class="eicon" src="${esc(g.market.icon.file)}" width="${size}" height="${size}" alt="" loading="lazy" decoding="async">` : C.identicon(g, size));

  const GLYPH = {
    website: '<circle cx="8" cy="8" r="6.2"/><path d="M1.8 8h12.4M8 1.8c2 2 2 10.4 0 12.4M8 1.8c-2 2-2 10.4 0 12.4"/>',
    play: '<rect x="1.8" y="1.8" width="12.4" height="12.4" rx="1"/><path d="M6.4 5.2v5.6l4.4-2.8z" fill="currentColor"/>',
    docs: '<path d="M3.5 1.8h6l3 3v9.4h-9z"/><path d="M9.5 1.8v3h3M5.5 8h5M5.5 10.6h5"/>',
    whitepaper: '<path d="M3.5 1.8h6l3 3v9.4h-9z"/><path d="M9.5 1.8v3h3M5.5 8h5M5.5 10.6h3"/>',
    x: '<path d="M2.5 2.5l11 11M13.5 2.5l-11 11"/>',
    discord: '<path d="M2 4.5c0-1.2 1-2 2.2-2h7.6c1.2 0 2.2.8 2.2 2v5c0 1.2-1 2-2.2 2H7l-3 2.5v-2.5h0C2.8 11.5 2 10.7 2 9.5z"/>',
    telegram: '<path d="M14 2.5L1.8 7.4l4.4 1.5 1.5 4.6 2.3-3 3.2 2.4z"/>',
    github: '<path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5M9 3l-2 10"/>',
    blog: '<path d="M2.5 13.5l1-3.5 7.5-7.5 2.5 2.5-7.5 7.5z"/><path d="M9.5 4l2.5 2.5"/>',
  };
  const LINK_LABEL = { website: '公式サイト', play: '遊ぶ', docs: 'ドキュメント', whitepaper: 'ホワイトペーパー', x: 'X', discord: 'Discord', telegram: 'Telegram', github: 'GitHub', blog: 'ブログ' };
  const glyph = (k) => `<svg class="glyph" viewBox="0 0 16 16" aria-hidden="true">${GLYPH[k] || GLYPH.website}</svg>`;
  C.linkBar = (g) => {
    const items = Object.entries(g.links || {}).map(([k, v]) => {
      const url = typeof v === 'string' ? v : v.url;
      const dead = typeof v === 'object' && v.status && v.status !== 'active';
      return `<a class="lnk ${dead ? 'dead' : ''}" href="${esc(url)}" target="_blank" rel="noopener" title="${esc(url)}${dead ? '（閉鎖・休止）' : ''}">${glyph(k)}<span>${esc(LINK_LABEL[k] || k)}</span>${dead ? '<small>閉鎖</small>' : ''}</a>`;
    });
    return items.length ? `<nav class="lnks" aria-label="${esc(g.name)} の公式リンク">${items.join('')}</nav>` : '';
  };

  const usd = (v) => {
    if (v == null) return '—';
    const a = Math.abs(v);
    if (a >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (a >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    if (a >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
    if (a >= 1) return `$${v.toFixed(2)}`;
    return `$${v.toPrecision(3)}`;
  };
  C.usd = usd;
  const pct = (v) => (v == null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(v > -10 && v < 10 ? 1 : 0)}%`);
  C.pct = pct;

  // 小さな折れ線（面）。series: [[x(ts or 'YYYY-MM'), value], ...]
  function spark(series, { w = 320, h = 70, label = '' } = {}) {
    if (!series || series.length < 2) return '';
    const vals = series.map((p) => p[1]);
    const max = Math.max(...vals), min = 0;
    const xs = (i) => 2 + (i / (series.length - 1)) * (w - 4);
    const ys = (v) => h - 4 - ((v - min) / (max - min || 1)) * (h - 10);
    const d = series.map((p, i) => `${i ? 'L' : 'M'}${xs(i).toFixed(1)},${ys(p[1]).toFixed(1)}`).join('');
    const last = series[series.length - 1];
    const pk = vals.indexOf(max);
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"><path class="area" d="${d}L${xs(series.length - 1)},${h - 4}L2,${h - 4}Z"></path><path class="ln" d="${d}"></path>
      <circle cx="${xs(pk)}" cy="${ys(max)}" r="3.5" class="pk"></circle><circle cx="${xs(series.length - 1)}" cy="${ys(last[1])}" r="3.5" class="end"></circle></svg>`;
  }

  // 詳細画面: 市場データ（自動取得）
  C.marketBlock = (g) => {
    const m = g.market;
    if (!m || (!m.coins?.length && !m.tvl)) return '';
    const fetched = D.market?.fetchedAt?.slice(0, 10);
    const coins = (m.coins || []).map((c) => `<div class="mk-card">
      <div class="mk-h"><b>${esc(c.symbol)}</b><span class="muted small">${esc(c.name)}</span><a class="small" href="${esc(c.source_url)}" target="_blank" rel="noopener">CoinGecko</a></div>
      <dl class="mk-kv"><div><dt>価格</dt><dd>${usd(c.price)}</dd></div><div><dt>時価総額</dt><dd>${usd(c.market_cap)}</dd></div>
      <div><dt>最高値</dt><dd>${usd(c.ath)}<small>${esc(c.ath_date || '')}</small></dd></div><div><dt>最高値から</dt><dd class="${(c.from_ath_pct ?? 0) < -50 ? 'neg' : ''}">${pct(c.from_ath_pct)}</dd></div></dl>
      ${spark(c.chart_365d, { label: `${c.symbol} の直近 365 日の価格` })}<p class="mk-cap">直近 365 日の価格（週次）。● 期間内の最高・最新</p></div>`).join('');
    const t = m.tvl;
    const tvl = t ? `<div class="mk-card">
      <div class="mk-h"><b>TVL</b><span class="muted small">${esc(t.name)}</span><a class="small" href="${esc(t.source_url)}" target="_blank" rel="noopener">DefiLlama</a></div>
      <dl class="mk-kv"><div><dt>現在</dt><dd>${usd(t.current)}<small>${esc(t.current_date)}</small></dd></div><div><dt>ピーク</dt><dd>${usd(t.peak)}<small>${esc(t.peak_date)}</small></dd></div>
      <div><dt>ピークから</dt><dd class="${(t.from_peak_pct ?? 0) < -50 ? 'neg' : ''}">${pct(t.from_peak_pct)}</dd></div></dl>
      ${spark(t.series_monthly, { label: `${t.name} の TVL の月次推移` })}<p class="mk-cap">TVL の月次推移（${esc(t.series_monthly[0]?.[0] || '')}〜）。● 最高・最新</p></div>` : '';
    return `<section id="market"><h2>市場データ <span class="mono small muted">auto · ${esc(fetched || '')}</span></h2>
      <p class="small muted">CoinGecko と DefiLlama の公開 API から ${esc(fetched || '')} に自動取得した値です。トークン価格や TVL は投機や市場全体の動きも含むため、遊ばれているかどうかの指標ではありません。研究上の数値は下の「数値」を参照してください。</p>
      <div class="mk-grid">${coins}${tvl}</div></section>`;
  };

  // 詳細画面: アカウント・利用者に関する指標（研究データの metrics から）
  const ACCT_TYPES = ['wallets', 'dau', 'mau', 'players', 'transactions', 'retention'];
  C.accountMetrics = (g) => {
    const ms = (I.metricsByGame.get(g.id) || []).filter((m) => ACCT_TYPES.includes(m.type));
    if (!ms.length) return '';
    const byType = new Map();
    for (const m of ms) { if (!byType.has(m.type)) byType.set(m.type, []); byType.get(m.type).push(m); }
    const cards = [...byType.entries()].map(([t, arr]) => {
      const sorted = arr.slice().sort((a, b) => String(b.period).localeCompare(String(a.period)));
      const m = sorted[0];
      return `<div class="acct"><span class="acct-t">${esc(L.metric_type[t])}</span><b>${m.value_text ? esc(m.value_text) : A.fmtNum(m.value)} <small>${esc(m.unit)}</small></b>
        <span class="acct-p">${esc(m.period)}・<span class="k ${m.nature === 'measured' ? 'k-fact' : m.nature === 'reported' ? 'k-claim' : 'k-analysis'}">${esc(L.nature[m.nature])}</span>${A.cites(m.s)}</span>
        ${arr.length > 1 ? `<span class="acct-more">ほか ${arr.length - 1} 件</span>` : ''}</div>`;
    }).join('');
    return `<div class="accts" aria-label="アカウント・利用者に関する指標">${cards}</div><p class="small muted">アカウント・利用者に関する指標（最新期間の 1 件を表示。定義・性質は下の「数値」に全件）。運営発表の数字は検証されていません。</p>`;
  };

  // ホーム: トークンは最高値からどれだけ下がったか
  C.drawdownChart = () => {
    const rows = [];
    for (const g of D.games) for (const c of g.market?.coins || []) if (c.from_ath_pct != null) rows.push({ g, c });
    if (rows.length < 3) return null;
    rows.sort((a, b) => a.c.from_ath_pct - b.c.from_ath_pct);
    const W = 720, rowH = 24, ml = 190, mr = 70, mt = 22;
    const H = mt + rows.length * rowH + 10;
    const xs = (v) => ml + ((-v) / 100) * (W - ml - mr);
    let svg = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="各トークンの価格が最高値から何パーセント下がったか">`;
    for (const t of [0, 25, 50, 75, 100]) svg += `<line class="grid" x1="${xs(-t)}" x2="${xs(-t)}" y1="${mt - 6}" y2="${H - 6}"></line><text class="tick" x="${xs(-t)}" y="${mt - 10}" text-anchor="middle">−${t}%</text>`;
    rows.forEach(({ g, c }, i) => {
      const y = mt + i * rowH + 4;
      const w = Math.max(2, xs(c.from_ath_pct) - ml);
      svg += `<text class="tick lbl" x="${ml - 8}" y="${y + 12}" text-anchor="end">${esc(c.symbol)} · ${esc(g.name.length > 18 ? g.name.slice(0, 17) + '…' : g.name)}</text>`;
      svg += `<path d="M${ml},${y} H${ml + w - 4} Q${ml + w},${y} ${ml + w},${y + 4} V${y + 12} Q${ml + w},${y + 16} ${ml + w - 4},${y + 16} H${ml} Z" fill="var(--s2)"></path>`;
      svg += `<text class="val" x="${ml + w + 6}" y="${y + 12}">${pct(c.from_ath_pct)}</text>`;
      svg += `<rect class="hit" data-tip="${i}" tabindex="0" x="0" y="${y - 4}" width="${W}" height="${rowH}" aria-label="${esc(c.symbol)}: 最高値から ${pct(c.from_ath_pct)}"></rect>`;
    });
    svg += `<line class="axis" x1="${ml}" x2="${ml}" y1="${mt - 6}" y2="${H - 6}"></line></svg>`;
    const date = D.market?.fetchedAt?.slice(0, 10);
    return {
      html: `<figure class="viz-fig" id="viz-dd"><figcaption><b>トークンは最高値からどれだけ下がったか</b><span>各ゲームの主要トークンの現在価格と過去最高値の差（CoinGecko、${esc(date || '')} 取得）。価格は投機と市場全体の動きを含み、遊ばれているかの指標ではない。</span></figcaption><div class="viz-scroll">${svg}</div>
        <details class="viz-table"><summary>表で見る</summary><div class="table-wrap"><table><thead><tr><th>トークン</th><th>事例</th><th>最高値</th><th>最高値の日</th><th>現在</th><th>最高値から</th></tr></thead><tbody>${rows.map(({ g, c }) => `<tr><td>${esc(c.symbol)}</td><td><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a></td><td class="num">${usd(c.ath)}</td><td>${esc(c.ath_date || '')}</td><td class="num">${usd(c.price)}</td><td class="num">${pct(c.from_ath_pct)}</td></tr>`).join('')}</tbody></table></div></details></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-dd'), (i) => {
        const { g, c } = rows[Number(i)];
        return `<b>${esc(c.symbol)}（${esc(g.name)}）</b><div>最高値 ${usd(c.ath)}（${esc(c.ath_date || '')}）</div><div>現在 ${usd(c.price)}・時価総額 ${usd(c.market_cap)}</div><div>最高値から ${pct(c.from_ath_pct)}</div>`;
      }),
    };
  };

  // ホーム: TVL のピークと現在（ダンベル）
  C.tvlChart = () => {
    const rows = D.games.filter((g) => g.market?.tvl?.peak).map((g) => ({ g, t: g.market.tvl })).sort((a, b) => b.t.peak - a.t.peak);
    if (rows.length < 2) return null;
    const W = 720, rowH = 30, ml = 160, mr = 20, mt = 24;
    const H = mt + rows.length * rowH + 8;
    const maxV = Math.max(...rows.map((r) => r.t.peak));
    const lg = (v) => Math.log10(Math.max(v, 1e3));
    const lo = 3, hi = Math.ceil(lg(maxV));
    const xs = (v) => ml + ((lg(v) - lo) / (hi - lo)) * (W - ml - mr);
    let svg = `<svg class="viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="TVL のピークと現在（対数軸）">`;
    for (let e = lo; e <= hi; e++) svg += `<line class="grid" x1="${xs(10 ** e)}" x2="${xs(10 ** e)}" y1="${mt - 6}" y2="${H - 6}"></line><text class="tick" x="${xs(10 ** e)}" y="${mt - 10}" text-anchor="middle">${usd(10 ** e).replace('.0', '').replace('.00', '')}</text>`;
    rows.forEach(({ g, t }, i) => {
      const y = mt + i * rowH + 12;
      svg += `<text class="tick lbl" x="${ml - 10}" y="${y + 4}" text-anchor="end">${esc(g.name.length > 18 ? g.name.slice(0, 17) + '…' : g.name)}</text>`;
      svg += `<line x1="${xs(t.current)}" x2="${xs(t.peak)}" y1="${y}" y2="${y}" stroke="var(--axis)" stroke-width="2"></line>`;
      svg += `<circle cx="${xs(t.peak)}" cy="${y}" r="5" fill="var(--s1)" stroke="var(--surface)" stroke-width="2"></circle><circle cx="${xs(t.current)}" cy="${y}" r="5" fill="var(--s2)" stroke="var(--surface)" stroke-width="2"></circle>`;
      svg += `<rect class="hit" data-tip="${i}" tabindex="0" x="0" y="${y - rowH / 2}" width="${W}" height="${rowH}" aria-label="${esc(g.name)}: ピーク ${usd(t.peak)}、現在 ${usd(t.current)}"></rect>`;
    });
    svg += `</svg>`;
    const date = D.market?.fetchedAt?.slice(0, 10);
    return {
      html: `<figure class="viz-fig" id="viz-tvl"><figcaption><b>TVL のピークと現在</b><span>DefiLlama に TVL があるゲームだけ（対数軸、${esc(date || '')} 取得）。TVL はゲームに預けられた資産の評価額で、プレイヤー数ではない。</span></figcaption>
        <ul class="viz-legend"><li><span class="sw" style="background:var(--s1)"></span>ピーク</li><li><span class="sw" style="background:var(--s2)"></span>現在</li></ul><div class="viz-scroll">${svg}</div>
        <details class="viz-table"><summary>表で見る</summary><div class="table-wrap"><table><thead><tr><th>事例</th><th>ピーク</th><th>ピークの日</th><th>現在</th><th>ピークから</th></tr></thead><tbody>${rows.map(({ g, t }) => `<tr><td><a href="#/entry/${esc(g.id)}">${esc(g.name)}</a></td><td class="num">${usd(t.peak)}</td><td>${esc(t.peak_date)}</td><td class="num">${usd(t.current)}</td><td class="num">${pct(t.from_peak_pct)}</td></tr>`).join('')}</tbody></table></div></details></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-tvl'), (i) => {
        const { g, t } = rows[Number(i)];
        return `<b>${esc(g.name)}</b><div><span class="sw" style="background:var(--s1)"></span>ピーク ${usd(t.peak)}（${esc(t.peak_date)}）</div><div><span class="sw" style="background:var(--s2)"></span>現在 ${usd(t.current)}（${esc(t.current_date)}）</div><div>ピークから ${pct(t.from_peak_pct)}</div>`;
      }),
    };
  };
})();
