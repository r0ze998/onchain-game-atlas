/* ゼロイチ（最初のユーザーをどこから・どう集めたか）: 詳細の節、横断ページ、図 */
(function () {
  'use strict';
  const A = window.A;
  const { D, I, L, esc } = A;
  const V = A.views;
  const C = A.charts;

  L.acq_phase = { pre: '公開前', launch: '公開時', growth: '初期の伸び', none: '段階不明' };
  L.audience = { players: 'プレイヤー', developers: '開発者', creators: '制作者', holders: '保有者', researchers: '研究者' };
  L.acq_channel = {
    'existing-community': '既存コミュニティ', 'platform-distribution': '提携・配信網', 'ip-brand': '既存 IP・ブランド',
    'crypto-social': 'X・フォーラム', press: '報道', 'creator-stream': '配信者・インフルエンサー', 'content-research': '論文・技術ブログ・講演', 'paid-ads': '有料広告',
    'community-server': 'Discord・Telegram', 'invite-gating': '招待制・段階的開放', hackathon: 'ハッカソン・ジャム',
    'prize-competition': '賞金・大会', 'token-incentive': 'トークン・ポイント', 'free-mint': '無料配布・ミント', 'scholarship-guild': 'スカラーシップ・ギルド', referral: '紹介報酬', 'builder-grants': '開発者助成・懸賞',
    composability: '上に作れること', 'viral-mechanic': '仕組みの拡散力',
  };
  L.acq_channel_desc = {
    'existing-community': '前作・同じチーム・特定の NFT やトークンの保有者・研究者など、すでにある集まりから人が移った',
    'platform-distribution': 'Telegram ミニアプリ、Ronin、Steam、ウォレット、チェーンの公式施策など、他者の配信網に乗った',
    'ip-brand': 'スポーツリーグや有名企業など、既存の IP・ブランドの知名度を使った',
    'crypto-social': 'X/Twitter・Reddit・フォーラムなど暗号資産界隈の SNS での発信と拡散',
    press: '報道・メディアでの露出', 'creator-stream': '配信者・YouTuber・インフルエンサー',
    'content-research': '論文・技術ブログ・講演・研究デモで知られた', 'paid-ads': '有料広告',
    'community-server': 'Discord・Telegram グループなど自前の集まる場', 'invite-gating': '招待制・ホワイトリスト・待機リスト・段階的な開放',
    hackathon: 'ハッカソン・ゲームジャム・ビルダー向けイベント',
    'prize-competition': '賞金や順位報酬のある大会・ラウンド', 'token-incentive': 'トークン・ポイント・将来のエアドロップへの期待',
    'free-mint': '無料（ガス代のみ等）での配布・ミント', 'scholarship-guild': 'スカラーシップ・ギルドによる貸与と勧誘', referral: '紹介報酬・紹介リンクの仕組み',
    'builder-grants': '開発者向け助成・懸賞・エコシステム資金',
    composability: '第三者が上に作れること自体が人を呼んだ（派生プロジェクト、プラグイン）', 'viral-mechanic': '繁殖・共有・タップ・残り時間の競争など、仕組みそのものが拡散を生んだ',
  };
  // 系列色は 5 つの「獲得の型」にだけ割り当てる（19 チャネルに色を振らない）
  const GROUPS = [
    { id: 'flow', name: '既存の人の流れを借りる', color: '--s1', ch: ['existing-community', 'platform-distribution', 'ip-brand'] },
    { id: 'voice', name: '発信して知ってもらう', color: '--s2', ch: ['crypto-social', 'press', 'creator-stream', 'content-research', 'paid-ads'] },
    { id: 'gate', name: '場をつくり、入口を絞る', color: '--s3', ch: ['community-server', 'invite-gating', 'hackathon'] },
    { id: 'money', name: 'お金で誘う', color: '--s4', ch: ['prize-competition', 'token-incentive', 'free-mint', 'scholarship-guild', 'referral', 'builder-grants'] },
    { id: 'mech', name: '仕組みそのものが広める', color: '--s5', ch: ['composability', 'viral-mechanic'] },
  ];
  const CH_ORDER = GROUPS.flatMap((g) => g.ch);
  const groupOf = new Map(GROUPS.flatMap((g) => g.ch.map((c) => [c, g])));
  A.ACQ_GROUPS = GROUPS;

  const hasAcq = (g) => g.acquisition && g.acquisition.applies !== false;
  const acqGames = () => D.games.filter(hasAcq);
  const chIds = (g) => (g.acquisition?.channels || []).map((c) => c.id);
  const startDate = (g) => g.dates?.launched?.date || g.dates?.announced?.date || (g.acquisition?.steps || []).find((s) => s.date)?.date || '';
  const pad = (d, end) => (d.length === 4 ? `${d}-${end ? '12' : '01'}` : d.slice(0, 7));
  const eraOf = (g) => {
    const d = startDate(g);
    if (!d) return null;
    const k = pad(d, false);
    return D.eras.find((e) => pad(e.from, false) <= k && (e.to == null || k <= pad(e.to, true))) || null;
  };
  const byStart = (a, b) => (startDate(a) || '9999').localeCompare(startDate(b) || '9999') || a.name.localeCompare(b.name);
  const listNames = (gs) => gs.map((g) => esc(g.name)).join('、');

  A.chChip = (id, href = true) => {
    const g = groupOf.get(id);
    const inner = `<span class="sw" style="background:var(${g ? g.color : '--s-other'})"></span>${esc(L.acq_channel[id] || id)}`;
    return href ? `<a class="chip-ch" href="#/acquisition?ch=${esc(id)}" title="${esc(L.acq_channel_desc[id] || '')}">${inner}</a>` : `<span class="chip-ch" title="${esc(L.acq_channel_desc[id] || '')}">${inner}</span>`;
  };
  A.chChips = (g) => chIds(g).sort((x, y) => CH_ORDER.indexOf(x) - CH_ORDER.indexOf(y)).map((c) => A.chChip(c)).join('');
  A.acqText = (g) => {
    const q = g.acquisition;
    if (!q) return [];
    return [q.note, q.summary?.t, ...ACQ_SECS.flatMap((s) => (q[s] || []).map((st) => st.t)), ...(q.channels || []).map((c) => c.t), ...(q.unknowns || [])].filter(Boolean);
  };
  const ACQ_SECS = ['steps', 'cost', 'after', 'counter', 'lessons'];

  // ---------- 詳細ページの節 ----------
  // 公開前 → 公開時 → 初期の伸び の 3 列。各段階のカードは古い順
  C.acqFlow = (g) => {
    const steps = g.acquisition?.steps || [];
    const phases = ['pre', 'launch', 'growth', ...(steps.some((s) => !s.phase) ? ['none'] : [])];
    return `<ol class="acq-flow" aria-label="ゼロイチの経過">${phases.map((p, i) => {
      const ss = steps.filter((s) => (s.phase || 'none') === p);
      return `<li class="acq-col acq-${p}"><div class="acq-col-h"><span class="acq-n mono">${String(i + 1).padStart(2, '0')}</span><b>${esc(L.acq_phase[p])}</b><span class="small muted">${ss.length} 件</span></div>
        ${ss.length ? ss.map((s) => `<div class="acq-step"><div class="acq-date mono">${s.date ? A.fmtDate(s.date) : '日付不明'}</div><div>${A.stmt(s)}</div></div>`).join('') : '<p class="small muted acq-empty">この段階の記録は見つからなかった</p>'}</li>`;
    }).join('')}</ol>`;
  };
  A.acqSection = (g) => {
    const q = g.acquisition;
    if (!q) return '';
    const head = '<h2><span class="secno">0→1</span>ゼロイチ：最初のユーザーをどう集めたか</h2>';
    if (q.applies === false) return `<section id="acq">${head}<p class="note-box">${esc(q.note)}</p></section>`;
    const ms = (q.metrics || []).map((id) => D.metrics.find((m) => m.id === id)).filter(Boolean);
    const blk = (key, title, hint) => ((q[key] || []).length ? `<h3>${title}</h3>${hint ? `<p class="small muted">${hint}</p>` : ''}${A.stmts(q[key])}` : '');
    return `<section id="acq">${head}
      <div class="acq-summary">${A.stmt(q.summary)}</div>
      <p class="small">対象: ${(q.audience || []).map((a) => `<span class="tag">${esc(L.audience[a] || a)}</span>`).join('')} <a class="small" href="#/acquisition">ほかの事例と比べる →</a></p>
      ${C.acqFlow(g)}
      <h3>使ったチャネル（${(q.channels || []).length}）</h3>
      <ul class="acq-chs">${(q.channels || []).slice().sort((x, y) => CH_ORDER.indexOf(x.id) - CH_ORDER.indexOf(y.id)).map((c) => `<li>${A.chChip(c.id)}<div>${A.stmt(c)}</div></li>`).join('')}</ul>
      ${blk('cost', '獲得の原資：誰が払ったか')}
      ${blk('after', '集まった後：残ったか', '示されている指標と、示されていない指標を分けて書いています。')}
      ${ms.length ? `<h3>初期の数値</h3>${A.metricTable(ms)}` : ''}
      ${blk('counter', '反証・別の説明', '「この施策で集まった」という説明を否定し得る事実や、ほかの要因。')}
      ${blk('lessons', '持ち込める点と条件')}
      ${q.unknowns?.length ? `<h3>確認できなかったこと</h3><ul>${q.unknowns.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}
    </section>`;
  };

  // ---------- 図 1: チャネル別の件数（横棒・型ごとに色） ----------
  C.channelBars = (gs) => {
    const cnt = (c) => gs.filter((g) => chIds(g).includes(c));
    const max = Math.max(1, ...CH_ORDER.map((c) => cnt(c).length));
    const rows = GROUPS.map((gr) => `<div class="cb-group"><div class="cb-gh"><span class="sw" style="background:var(${gr.color})"></span>${esc(gr.name)}</div>
      ${gr.ch.map((c) => { const n = cnt(c).length; return `<a class="cb-row" href="#/acquisition?ch=${c}" data-tip="${c}" aria-label="${esc(L.acq_channel[c])}: ${n} 件"><span class="cb-l">${esc(L.acq_channel[c])}</span><span class="cb-t"><span class="cb-f" style="width:${(n / max) * 100}%;background:var(${gr.color})"></span></span><span class="cb-n mono">${n}</span></a>`; }).join('')}</div>`).join('');
    return {
      html: `<figure class="viz-fig" id="viz-acq-ch"><figcaption><b>最初のユーザーを、何で集めたか</b><span>${gs.length} 事例で確認できたチャネルを数えた（1 事例が複数を使う）。行を押すとその事例に絞り込む。</span></figcaption>
        <div class="cb">${rows}</div>
        <details class="viz-table"><summary>表で見る</summary><div class="table-wrap"><table><thead><tr><th>型</th><th>チャネル</th><th>件数</th><th>事例</th></tr></thead><tbody>${CH_ORDER.map((c) => `<tr><td>${esc(groupOf.get(c).name)}</td><td>${esc(L.acq_channel[c])}</td><td class="num">${cnt(c).length}</td><td class="small">${listNames(cnt(c))}</td></tr>`).join('')}</tbody></table></div></details></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-acq-ch'), (c) => `<b>${esc(L.acq_channel[c])}：${cnt(c).length} 件</b><div class="small">${esc(L.acq_channel_desc[c])}</div><div class="muted">${listNames(cnt(c)) || 'なし'}</div>`),
    };
  };

  // ---------- 図 2: 時代 × 獲得の型（その時代の事例のうち何割が使ったか） ----------
  C.eraGroupHeat = (gs) => {
    const eras = D.eras.map((e) => ({ e, gs: gs.filter((g) => eraOf(g)?.id === e.id) }));
    const use = (g, gr) => chIds(g).some((c) => gr.ch.includes(c));
    const rows = GROUPS.map((gr) => `<tr><th scope="row"><span class="sw" style="background:var(${gr.color})"></span> ${esc(gr.name)}</th>${eras.map(({ e, gs: eg }) => {
      const hit = eg.filter((g) => use(g, gr));
      const r = eg.length ? hit.length / eg.length : 0;
      const s = !hit.length ? 0 : Math.min(6, 1 + Math.floor(r * 5.99));
      return `<td class="hm-cell"><a class="hm s${s}" href="#/acquisition?group=${gr.id}&era=${e.id}" data-tip="${gr.id}|${e.id}" aria-label="${esc(e.name)} × ${esc(gr.name)}: ${eg.length} 件中 ${hit.length} 件">${eg.length ? Math.round(r * 100) + '%' : '–'}</a></td>`;
    }).join('')}</tr>`).join('');
    return {
      html: `<figure class="viz-fig" id="viz-acq-era"><figcaption><b>時代ごとに、集め方の型はどう変わったか</b><span>開始時期で時代に分け、その時代の事例のうち各型のチャネルを 1 つ以上使った割合。マスを押すと該当事例へ。</span></figcaption>
        <div class="table-wrap hm-wrap"><table class="hm-table acq-hm"><thead><tr><th></th>${eras.map(({ e, gs: eg }) => `<th scope="col">${esc(e.name)}<div class="mono small">${esc(e.from.slice(0, 4))}–${e.to ? esc(e.to.slice(0, 4)) : ''} · n=${eg.length}</div></th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
        <p class="viz-note">n は各時代の事例数で、小さい時代の割合は 1 件で大きく動く。記録に残りやすい施策（発表された賞金や配布）ほど多く数えられる偏りがある。</p></figure>`,
      after: (root) => C.bindTips(root.querySelector('#viz-acq-era'), (k) => {
        const [gid, eid] = k.split('|');
        const gr = GROUPS.find((x) => x.id === gid);
        const e = D.eras.find((x) => x.id === eid);
        const eg = gs.filter((g) => eraOf(g)?.id === eid);
        const hit = eg.filter((g) => use(g, gr));
        return `<b>${esc(e.name)} × ${esc(gr.name)}</b><div>${eg.length} 件中 ${hit.length} 件</div><div class="muted">${listNames(hit) || 'なし'}</div>`;
      }),
    };
  };

  // ---------- 図 3: 事例 × チャネルの一覧（開始順） ----------
  C.acqMatrix = (gs) => {
    const sorted = gs.slice().sort(byStart);
    return `<figure class="viz-fig" id="viz-acq-mx"><figcaption><b>事例ごとの組み合わせ</b><span>開始の古い順。点はその事例で確認できたチャネル。どの事例も単独のチャネルではなく、組み合わせで集めている。</span></figcaption>
      <div class="table-wrap acq-mx-wrap"><table class="acq-mx"><thead><tr><th class="acq-mx-name">事例</th>${CH_ORDER.map((c) => `<th scope="col" class="vh" title="${esc(L.acq_channel_desc[c])}"><span>${esc(L.acq_channel[c])}</span></th>`).join('')}<th class="num">計</th></tr></thead>
      <tbody>${sorted.map((g) => { const ids = chIds(g); return `<tr><th scope="row" class="acq-mx-name"><a href="#/entry/${esc(g.id)}?s=acq">${esc(g.name)}</a><span class="mono small muted"> ${esc(startDate(g).slice(0, 4))}</span></th>${CH_ORDER.map((c) => `<td>${ids.includes(c) ? `<span class="dot" style="background:var(${groupOf.get(c).color})" title="${esc(L.acq_channel[c])}"></span><span class="sr">${esc(L.acq_channel[c])}</span>` : ''}</td>`).join('')}<td class="num mono">${ids.length}</td></tr>`; }).join('')}</tbody></table></div></figure>`;
  };

  // ---------- 横断ページ ----------
  V.acquisition = ({ params }) => {
    const all = acqGames();
    const na = D.games.filter((g) => g.acquisition?.applies === false);
    const missing = D.games.filter((g) => !g.acquisition);
    const f = Object.fromEntries(['ch', 'group', 'era', 'aud', 'status'].map((k) => [k, params.get(k) || '']));
    const opt = (pairs, cur) => `<option value="">すべて</option>` + pairs.map(([k, v]) => `<option value="${esc(k)}" ${cur === k ? 'selected' : ''}>${esc(v)}</option>`).join('');
    const shown = all.filter((g) => (!f.ch || chIds(g).includes(f.ch))
      && (!f.group || chIds(g).some((c) => groupOf.get(c)?.id === f.group))
      && (!f.era || eraOf(g)?.id === f.era)
      && (!f.aud || (g.acquisition.audience || []).includes(f.aud))
      && (!f.status || g.status?.value === f.status)).sort(byStart);
    const bars = C.channelBars(all);
    const heat = C.eraGroupHeat(all);
    V.acquisition._after = [bars.after, heat.after];
    const ins = D.insights.filter((i) => i.topic === 'acquisition');
    const qs = D.questions.filter((q) => q.topic === 'acquisition');
    const filtered = Object.values(f).some(Boolean);
    return `<div class="read wide">
      <p class="eyebrow mono">ZERO TO ONE · ACQUISITION</p>
      <h1>ゼロイチ：最初のユーザーはどこから来たか</h1>
      <p class="lede">新しいオンチェーンゲームは、誰もいない世界から始まる。${all.length} の事例について、最初のユーザーが誰で、どこから、どんな仕掛けと費用で集まり、その後残ったかを、出典付きで記録した。</p>
      <div class="note-box small"><b>読み方の注意</b>：ここにあるのは記録が残った事例だけで、同じ施策で人が集まらなかったプロジェクトはほとんど含まれない（生存者バイアス）。施策と増加の因果は ${A.kBadge('analysis')} として書き、運営の「〜で集めた」は ${A.kBadge('claim')} として区別している。各事例には反証・別の説明を付けた。</div>
      <div class="viz-grid">${bars.html}${heat.html}</div>
      ${ins.length ? `<section class="home-sec"><div class="sec-head"><h2>ゼロイチのインサイト</h2><a href="#/insights">すべてのインサイト</a></div><ul class="ins-list">${ins.map((i) => { const n = (s) => (i.evidence || []).filter((e) => e.stance === s).length; return `<li><a href="#/insight/${esc(i.id)}"><span class="ins-title">${esc(i.title)}</span><span class="ins-meta"><span class="conf conf-${esc(i.confidence)}">${esc(L.confidence[i.confidence])}</span><span class="small muted">支持 ${n('support')}・反例 ${n('counter')}</span></span></a></li>`; }).join('')}</ul></section>` : ''}
      ${qs.length ? `<p>関連する問い: ${qs.map((q) => `<a href="#/question/${esc(q.id)}">${esc(q.q)}</a>`).join('、')}</p>` : ''}
      <section class="home-sec"><h2>事例を絞り込む</h2>
      <form class="toolbar" id="acq-filter" aria-label="ゼロイチの絞り込み">
        <label>チャネル<select name="ch">${opt(CH_ORDER.map((c) => [c, L.acq_channel[c]]), f.ch)}</select></label>
        <label>型<select name="group">${opt(GROUPS.map((g) => [g.id, g.name]), f.group)}</select></label>
        <label>時代<select name="era">${opt(D.eras.map((e) => [e.id, e.name]), f.era)}</select></label>
        <label>対象<select name="aud">${opt(Object.entries(L.audience), f.aud)}</select></label>
        <label>現在の状態<select name="status">${opt(Object.entries(L.status), f.status)}</select></label>
        ${filtered ? '<a class="btn" href="#/acquisition">条件を外す</a>' : ''}
      </form>
      <p class="small muted" aria-live="polite">${shown.length} / ${all.length} 件${f.ch ? `・${esc(L.acq_channel_desc[f.ch])}` : ''}</p>
      <ul class="acq-cards">${shown.map((g) => `<li class="card"><div class="ei-head">${C.icon(g, 32)}<div><h3><a href="#/entry/${esc(g.id)}?s=acq">${esc(g.name)}</a></h3>
        <div class="meta small muted">${A.statusDot(g)}${esc(A.periodText(g))}・${esc(L.status[g.status?.value] || '不明')}・対象: ${(g.acquisition.audience || []).map((a) => esc(L.audience[a] || a)).join('・')}</div></div></div>
        <div class="acq-summary">${A.stmt(g.acquisition.summary)}</div><div>${A.chChips(g)}</div></li>`).join('') || '<li class="muted">該当なし</li>'}</ul></section>
      <section class="home-sec">${C.acqMatrix(all)}</section>
      <section class="home-sec"><h2>チャネルの定義</h2><div class="table-wrap"><table><thead><tr><th>型</th><th>チャネル</th><th>意味</th></tr></thead><tbody>${CH_ORDER.map((c) => `<tr><td><span class="sw" style="background:var(${groupOf.get(c).color})"></span> ${esc(groupOf.get(c).name)}</td><td>${esc(L.acq_channel[c])}</td><td class="small">${esc(L.acq_channel_desc[c])}</td></tr>`).join('')}</tbody></table></div>
      ${na.length ? `<p class="small muted">利用者獲得の対象ではないため除いた項目（${na.length}）: ${na.map((g) => `<a href="#/entry/${esc(g.id)}?s=acq">${esc(g.name)}</a>`).join('、')}</p>` : ''}
      ${missing.length ? `<p class="small muted">まだ調査していない項目（${missing.length}）: ${missing.map((g) => `<a href="#/entry/${esc(g.id)}">${esc(g.name)}</a>`).join('、')}</p>` : ''}</section>
    </div>`;
  };
  V.acquisition.after = () => {
    const root = document.getElementById('main');
    for (const fn of V.acquisition._after || []) fn(root);
    const form = document.getElementById('acq-filter');
    form?.addEventListener('change', () => {
      const p = new URLSearchParams();
      for (const [k, v] of new FormData(form)) if (v) p.set(k, v);
      location.hash = `#/acquisition${p.toString() ? '?' + p : ''}`;
    });
  };
})();
