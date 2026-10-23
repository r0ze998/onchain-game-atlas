/* 研究画面: 問い、インサイト、設計仮説、研究ノート、方法と定義 */
(function () {
  'use strict';
  const A = window.A;
  const { esc, L, I, D } = A;
  const V = A.views;

  const evItem = (e) => `<li class="${esc(e.stance)}"><b>${A.nodeLink(e.game)}</b> <span class="small muted">${esc(L.stance[e.stance])}</span><div>${esc(e.note)}${A.cites(e.s)}</div></li>`;
  const evGroups = (list, labels = L.stance) => ['support', 'counter', 'context'].map((st) => {
    const xs = (list || []).filter((e) => e.stance === st);
    return xs.length ? `<h3>${esc(labels[st])}（${xs.length}）</h3><ul class="ev-list">${xs.map(evItem).join('')}</ul>` : '';
  }).join('');

  // ---------- 問い ----------
  V.questions = () => `<header class="page-head"><div class="page-head-text"><h1>問いから探す</h1><p class="lede">開発中に出てくる問いから、複数の事例へ進みます。各問いには「はい」に寄る事例と「いいえ」に寄る事例の両方を置き、関連するインサイトと設計仮説につなげています。</p></div></header>
    <div class="cards">${D.questions.map((q) => {
      const c = (st) => (q.cases || []).filter((e) => e.stance === st).length;
      return `<div class="card"><h3><a href="#/question/${esc(q.id)}">${esc(q.q)}</a></h3><p class="muted">${esc(q.why || '')}</p>
        <p class="small">${q.labels?.support || '支持'} ${c('support')}・${q.labels?.counter || '反例'} ${c('counter')}・文脈 ${c('context')}</p></div>`;
    }).join('')}</div>`;
  V.question = ({ parts }) => {
    const q = I.question.get(parts[1]);
    if (!q) return A.notFound();
    const labels = { support: q.labels?.support || '支持する事例', counter: q.labels?.counter || '反する事例', context: '文脈・条件付き' };
    return `<div class="detail"><article><p class="small muted"><a href="#/questions">問い</a></p><header class="page-head compact"><div class="page-head-text"><h1>${esc(q.q)}</h1></div></header>
      ${q.why ? `<p class="lede">${esc(q.why)}</p>` : ''}
      ${q.answer ? `<div class="note-box"><b>現時点の暫定回答：</b>${esc(q.answer)}</div>` : ''}
      ${evGroups(q.cases, labels)}
      ${q.open ? `<h2>まだ分からないこと</h2><p>${esc(q.open)}</p>` : ''}
      ${q.cases?.length >= 2 ? `<p><a class="btn" href="#/compare/${esc([...new Set(q.cases.map((c) => c.game))].slice(0, 4).join(','))}">事例を並べて比較（先頭 4 件）</a></p>` : ''}
    </article><aside><div class="sticky">
      ${(q.insights || []).length ? `<div class="card"><b>関連インサイト</b>${q.insights.map((i) => `<div><a href="#/insight/${esc(i)}">${esc(I.insight.get(i)?.title || i)}</a></div>`).join('')}</div>` : ''}
      ${(q.hypotheses || []).length ? `<div class="card"><b>関連する設計仮説</b>${q.hypotheses.map((h) => `<div><a href="#/hypotheses?focus=${esc(h)}">${esc(I.hypothesis.get(h)?.title || h)}</a></div>`).join('')}</div>` : ''}
      ${A.noteBox(`question:${q.id}`)}</div></aside></div>`;
  };

  // ---------- インサイト ----------
  V.insights = ({ params }) => {
    const gt = params.get('gap') || '';
    const cf = params.get('conf') || '';
    const list = D.insights.filter((i) => (!gt || i.gap_type === gt) && (!cf || i.confidence === cf));
    return `<header class="page-head"><div class="page-head-text"><h1>インサイトを検証する</h1><p class="lede">各インサイトは「主張・支持事例・反例・成立条件・確信度とその理由・次に試す小さな実験」で構成しています。「未解決の空白」と「需要が確認されていない領域」、「ブロックチェーンが不要な可能性」を区別しています。</p></div></header>
      <form class="toolbar" id="ins-filter"><label>種類<select name="gap"><option value="">すべて</option>${Object.entries(L.gap_type).map(([k, v]) => `<option value="${k}" ${gt === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
      <label>確信度<select name="conf"><option value="">すべて</option>${['high', 'medium', 'low'].map((k) => `<option value="${k}" ${cf === k ? 'selected' : ''}>${esc(L.confidence[k])}</option>`).join('')}</select></label></form>
      <div class="cards">${list.map((i) => {
        const n = (st) => (i.evidence || []).filter((e) => e.stance === st).length;
        return `<div class="card"><h3><a href="#/insight/${esc(i.id)}">${esc(i.title)}</a></h3>
          <p><span class="conf conf-${esc(i.confidence)}">${esc(L.confidence[i.confidence])}</span> <span class="tag">${esc(L.gap_type[i.gap_type] || i.gap_type)}</span></p>
          <p>${esc(i.claim)}</p><p class="small muted">支持 ${n('support')}・反例 ${n('counter')}・文脈 ${n('context')}</p></div>`;
      }).join('') || '<p class="muted">該当なし</p>'}</div>`;
  };
  V.insights.after = () => {
    const f = A.$('#ins-filter');
    f.addEventListener('change', () => { const p = new URLSearchParams(); for (const [k, v] of new FormData(f)) if (v) p.set(k, v); location.hash = `#/insights?${p}`; });
  };
  V.insight = ({ parts }) => {
    const i = I.insight.get(parts[1]);
    if (!i) return A.notFound();
    const ex = i.experiment || {};
    const hs = (i.hypotheses || []).map((h) => I.hypothesis.get(h)).filter(Boolean);
    const qs = D.questions.filter((q) => (q.insights || []).includes(i.id));
    return `<div class="detail"><article><p class="small muted"><a href="#/insights">インサイト</a></p><header class="page-head compact"><div class="page-head-text"><h1>${esc(i.title)}</h1></div></header>
      <p><span class="conf conf-${esc(i.confidence)}">${esc(L.confidence[i.confidence])}</span> <span class="tag">${esc(L.gap_type[i.gap_type] || i.gap_type)}</span></p>
      <h2>主張</h2><p class="lede">${esc(i.claim)}</p>
      ${A.charts.balance(i.evidence || [])}
      <h2>成立条件</h2><p>${esc(i.conditions)}</p>
      ${i.changed ? `<h2>何の制約が変わったか</h2><p>${esc(i.changed)}</p>` : ''}
      ${i.unchanged ? `<h2>まだ変わっていないこと</h2><p>${esc(i.unchanged)}</p>` : ''}
      <h2>事例</h2>${evGroups(i.evidence)}
      <h2>確信度の理由</h2><p>${esc(i.confidence_reason)}</p>
      ${i.alternative ? `<h2>別の説明</h2><p>${esc(i.alternative)}</p>` : ''}
      ${D.synthesisVerification ? '<p class="small muted">このインサイトの事例と出典の対応は、独立した検証役が照合しています（<a href="#/quality">データ品質</a>の統合層の検証記録）。</p>' : ''}
      <h2>次に試す小さな実験</h2><dl class="kv"><dt>やること</dt><dd>${esc(ex.design || i.experiment)}</dd>
        ${ex.signal ? `<dt>見る指標</dt><dd>${esc(ex.signal)}</dd>` : ''}${ex.kill ? `<dt>撤退・反証の基準</dt><dd>${esc(ex.kill)}</dd>` : ''}${ex.cost ? `<dt>規模の目安</dt><dd>${esc(ex.cost)}</dd>` : ''}</dl>
      <button class="btn primary" data-act="adopt-insight" data-id="${esc(i.id)}">この実験を研究ノートに記録</button>
    </article><aside><div class="sticky">
      ${hs.length ? `<div class="card"><b>この知見を使う設計仮説</b>${hs.map((h) => `<div><a href="#/hypotheses?focus=${esc(h.id)}">${esc(h.title)}</a></div>`).join('')}</div>` : ''}
      ${qs.length ? `<div class="card"><b>関連する問い</b>${qs.map((q) => `<div><a href="#/question/${esc(q.id)}">${esc(q.q)}</a></div>`).join('')}</div>` : ''}
      ${A.noteBox(`insight:${i.id}`)}</div></aside></div>`;
  };

  // ---------- 設計仮説 ----------
  V.hypotheses = ({ params }) => {
    const focus = params.get('focus');
    const sel = (params.get('ids') || '').split(',').filter((x) => I.hypothesis.has(x));
    // 既定は 3 件（表が横に長くなりすぎないように）。focus 指定があればそれを含める
    const defaults = [...new Set([focus, ...D.hypotheses.map((h) => h.id)].filter((x) => x && I.hypothesis.has(x)))].slice(0, 3);
    const ids = sel.length ? sel : defaults;
    const hs = ids.map((id) => I.hypothesis.get(id));
    const li = (arr) => `<ul>${(arr || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    const row = (label, f) => `<tr><th scope="row" class="rowh">${label}</th>${hs.map((h) => `<td ${h.id === focus ? 'style="background:var(--accent-soft)"' : ''}>${f(h)}</td>`).join('')}</tr>`;
    const evs = (h, st) => (h.evidence || []).filter((e) => e.stance === st).map((e) => `<li>${A.nodeLink(e.game)}：${esc(e.note)}${A.cites(e.s)}</li>`).join('') || '<li class="muted">なし</li>';
    return `<header class="page-head"><div class="page-head-text"><h1>設計仮説を比べる</h1><p class="lede">事例とインサイトから組み立てた具体的な設計仮説です。組み合わせるメカニクス、プレイヤーの選択、衝突するインセンティブ、破綻条件、チェーンが本当に必要か、最初の実験を同じ表で比べられます。どれも検証前の仮説であり、推奨ではありません。</p></div></header>
      <div class="hyp-cards">${D.hypotheses.map((h) => {
        const n = (st) => (h.evidence || []).filter((e) => e.stance === st).length;
        const need = { yes: '必要', partial: '一部のみ', no: '不要の可能性', unknown: '未判定' }[h.needs_chain?.answer] || '未判定';
        return `<article class="hyp-card ${h.id === focus ? 'focus' : ''}" id="hc-${esc(h.id)}"><h3>${esc(h.short || h.title)}</h3>
          <p class="small">${esc(h.title)}</p>
          <dl><div><dt>チェーン</dt><dd><span class="need need-${esc(h.needs_chain?.answer || 'unknown')}">${esc(need)}</span></dd></div>
          <div><dt>事例</dt><dd>支持 ${n('support')}・反例 ${n('counter')}</dd></div>
          <div><dt>実験の規模</dt><dd>${esc(h.experiment?.cost || '—')}</dd></div></dl>
          <p class="small"><b>撤退基準：</b>${esc(h.experiment?.kill || '—')}</p>
          <div class="btn-row"><button class="btn primary" data-act="adopt-hyp" data-id="${esc(h.id)}">この実験を選ぶ</button><a class="btn" href="#/hypotheses?ids=${esc([h.id, ...ids.filter((x) => x !== h.id)].slice(0, 3).join(','))}&focus=${esc(h.id)}">詳しく比べる</a></div></article>`;
      }).join('')}</div>
      <h2 class="hyp-h2">詳しく比べる</h2>
      <div class="toolbar"><fieldset class="chips" id="hyp-pick"><legend>比較する仮説</legend>${D.hypotheses.map((h) => `<label class="chip"><input type="checkbox" value="${esc(h.id)}" ${ids.includes(h.id) ? 'checked' : ''}>${esc(h.short || h.title)}</label>`).join('')}</fieldset></div>
      <div class="table-wrap"><table class="cmp-table hyp-table"><thead><tr><th class="rowh">項目</th>${hs.map((h) => `<th id="h-${esc(h.id)}">${esc(h.title)}</th>`).join('')}</tr></thead><tbody>
        ${row('要約', (h) => esc(h.summary || ''))}
        ${row('組み合わせるメカニクス', (h) => li(h.mechanics))}
        ${row('プレイヤーが取る選択', (h) => li(h.player_choices))}
        ${row('衝突するインセンティブ', (h) => li(h.incentive_conflicts))}
        ${row('破綻条件', (h) => li(h.failure_conditions))}
        ${row('チェーンは必要か', (h) => `<b class="need need-${esc(h.needs_chain?.answer)}">${esc({ yes: '必要', partial: '一部のみ', no: '不要の可能性が高い', unknown: '未判定' }[h.needs_chain?.answer] || h.needs_chain?.answer)}</b><div class="small">${esc(h.needs_chain?.reason || '')}</div>`)}
        ${row('支持する事例', (h) => `<ul class="small">${evs(h, 'support')}</ul>`)}
        ${row('反する事例', (h) => `<ul class="small">${evs(h, 'counter')}</ul>`)}
        ${row('根拠のインサイト', (h) => (h.insights || []).map((i) => `<div class="small"><a href="#/insight/${esc(i)}">${esc(I.insight.get(i)?.title || i)}</a></div>`).join(''))}
        ${row('最初の実験', (h) => `<div class="small"><b>やること：</b>${esc(h.experiment?.design)}</div><div class="small"><b>見る指標：</b>${esc(h.experiment?.signal || '')}</div><div class="small"><b>撤退基準：</b>${esc(h.experiment?.kill || '')}</div><div class="small"><b>規模：</b>${esc(h.experiment?.cost || '')}</div>`)}
        ${row('既存の構想との関係', (h) => `<div class="small">${esc(h.relation_to_current || '—')}</div>`)}
        ${row('', (h) => `<button class="btn primary" data-act="adopt-hyp" data-id="${esc(h.id)}">この実験を選ぶ</button>`)}
      </tbody></table></div>
      <p class="small muted">「この実験を選ぶ」を押すと、研究ノートに状態「検証中」の仮説として記録されます。結果は研究ノートで追記できます。</p>`;
  };
  V.hypotheses.after = ({ params }) => {
    A.$$('#hyp-pick input').forEach((cb) => cb.addEventListener('change', () => {
      const ids = A.$$('#hyp-pick input:checked').map((x) => x.value);
      const p = new URLSearchParams();
      if (ids.length) p.set('ids', ids.join(','));
      location.hash = `#/hypotheses${p.toString() ? '?' + p : ''}`;
    }));
    const f = params.get('focus');
    if (f) setTimeout(() => document.getElementById(`h-${f}`)?.scrollIntoView({ block: 'nearest', inline: 'center' }), 0);
  };

  // ---------- 研究ノート ----------
  const STATUS = { idea: '構想', testing: '検証中', supported: '支持された', refuted: '反証された', abandoned: '中止' };
  V.notebook = () => {
    const d = A.store.data();
    const saved = Object.entries(d.saved).sort((a, b) => b[1].savedAt.localeCompare(a[1].savedAt));
    const notes = Object.entries(d.notes).sort((a, b) => b[1].updated.localeCompare(a[1].updated));
    const noteLink = (key) => {
      const [t, id] = key.split(/:(.+)/);
      if (t === 'entry') return `<a href="#/entry/${esc(id)}">${esc(A.nodeName(id))}</a>`;
      if (t === 'insight') return `<a href="#/insight/${esc(id)}">インサイト: ${esc(I.insight.get(id)?.title || id)}</a>`;
      if (t === 'question') return `<a href="#/question/${esc(id)}">問い: ${esc(I.question.get(id)?.q || id)}</a>`;
      if (t === 'compare') return `<a href="#/compare/${esc(id)}">比較: ${esc(id.split(',').map(A.nodeName).join(' / '))}</a>`;
      return esc(key);
    };
    return `<header class="page-head"><div class="page-head-text"><h1>研究ノート</h1><p class="lede">気になった事例の保存、メモ、比較セット、自分の設計仮説と検証結果をここに集めます。ログインは不要です。</p></div></header>
      <div class="warnbox read small"><b>保存場所について：</b>ノートはこのブラウザの localStorage にだけ保存されます。別のブラウザ・別の端末・プライベートウィンドウからは見えません。ブラウザのサイトデータ削除、ストレージの自動削除（例: Safari は長期間訪問しないサイトのデータを消すことがあります）、別のポートやドメインでの起動でも失われます。大事な記録は定期的に「JSON を書き出す」で保存してください。${A.store.ok ? '' : '<br><b>現在、このブラウザではノートを保存できていません。</b>'}</div>
      <div class="btn-row"><button class="btn primary" id="nb-export">JSON ファイルに書き出す</button>
        <button class="btn" id="nb-copy">JSON をコピー</button>
        <label class="btn" for="nb-import-file">JSON ファイルを読み込む</label><input type="file" id="nb-import-file" accept="application/json,.json" class="vh">
        <label class="small muted" style="align-self:center"><input type="checkbox" id="nb-replace"> 読み込み時に現在のノートを置き換える（既定は統合）</label>
        <button class="btn danger" id="nb-clear" data-armed="0">ノートをすべて消去</button></div>
      <p class="small muted">書き出したデータには、保存した項目・メモ・比較セット・仮説と検証記録・比較中の項目が含まれます。研究データ本体は含みません。ファイルの保存が使えない環境（埋め込み表示など）では「JSON をコピー」か下の欄を使ってください。</p>
      <details class="card"><summary>JSON を表示・貼り付けて読み込む</summary>
        <label for="nb-json" class="small">ノートの JSON（全選択してコピーできます。別の JSON を貼り付けて読み込むこともできます）</label>
        <textarea id="nb-json" rows="8" style="width:100%;font-family:var(--mono);font-size:.8rem">${esc(A.store.exportJSON())}</textarea>
        <div class="btn-row"><button class="btn" id="nb-json-import">この欄の JSON を読み込む</button></div></details>

      <h2>自分の仮説と検証記録（${d.hypotheses.length}）</h2>
      <details ${d.hypotheses.length ? '' : 'open'}><summary>新しい仮説を書く</summary>
        <form id="nb-new-h" class="card" style="display:grid;gap:.5rem;margin-top:.5rem">
          <label>タイトル<input name="title" required style="width:100%"></label>
          <label>仮説（何がどうなると考えるか）<textarea name="statement" rows="3" style="width:100%"></textarea></label>
          <label>根拠にした事例やインサイトの ID（カンマ区切り・任意）<input name="basedOn" style="width:100%" placeholder="dark-forest, ins-..."></label>
          <label>実験<textarea name="experiment" rows="2" style="width:100%"></textarea></label>
          <label>見る指標<input name="signal" style="width:100%"></label>
          <label>撤退・反証の基準<input name="kill" style="width:100%"></label>
          <div><button class="btn primary">追加</button></div></form></details>
      <div style="display:grid;gap:.8rem;margin-top:.8rem">${d.hypotheses.map((h) => `<div class="card" id="nb-${esc(h.id)}">
        <h3>${esc(h.title)} <span class="status-pill">${esc(STATUS[h.status])}</span></h3>
        ${h.statement ? `<p>${esc(h.statement)}</p>` : ''}
        ${h.basedOn.length ? `<p class="small">根拠: ${h.basedOn.map((b) => I.game.has(b) || I.concept.has(b) ? A.nodeLink(b) : I.insight.has(b) ? `<a href="#/insight/${esc(b)}">${esc(I.insight.get(b).title)}</a>` : I.hypothesis.has(b) ? `<a href="#/hypotheses?focus=${esc(b)}">${esc(I.hypothesis.get(b).title)}</a>` : esc(b)).join('、')}</p>` : ''}
        ${h.experiment ? `<p class="small"><b>実験：</b>${esc(h.experiment)}</p>` : ''}${h.signal ? `<p class="small"><b>指標：</b>${esc(h.signal)}</p>` : ''}${h.kill ? `<p class="small"><b>撤退基準：</b>${esc(h.kill)}</p>` : ''}
        ${h.results.length ? `<ul class="small">${h.results.map((r) => `<li>${A.fmtDate(r.date)}：${esc(r.text)}</li>`).join('')}</ul>` : ''}
        <div class="btn-row"><label class="small">状態 <select data-h-status="${esc(h.id)}">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${h.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
          <form data-h-result="${esc(h.id)}" style="display:flex;gap:.3rem;flex:1;min-width:14rem"><label class="vh" for="r-${esc(h.id)}">結果を追記</label><input id="r-${esc(h.id)}" name="r" placeholder="結果・観察を追記" style="flex:1"><button class="btn">追記</button></form>
          <button class="btn danger" data-h-del="${esc(h.id)}" data-armed="0">削除</button></div></div>`).join('')}</div>

      <h2>保存した項目（${saved.length}）</h2>
      <ul>${saved.map(([id, v]) => `<li>${A.nodeLink(id)} <span class="small muted">${esc(v.savedAt.slice(0, 10))}</span> <button class="btn" data-act="save" data-id="${esc(id)}">外す</button></li>`).join('') || '<li class="muted">なし（各項目の「保存」で追加）</li>'}</ul>
      <h2>比較セット（${d.compareSets.length}）</h2>
      <ul>${d.compareSets.map((s) => `<li><a href="#/compare/${esc(s.ids.join(','))}">${esc(s.name)}</a> <span class="small muted">${esc(s.ids.map(A.nodeName).join(' / '))}</span> <button class="btn danger" data-set-del="${esc(s.id)}">削除</button></li>`).join('') || '<li class="muted">なし（比較画面で保存）</li>'}</ul>
      <h2>メモ（${notes.length}）</h2>
      <ul>${notes.map(([k, v]) => `<li>${noteLink(k)} <span class="small muted">${esc(v.updated.slice(0, 10))}</span><div class="small pre">${esc(v.text)}</div></li>`).join('') || '<li class="muted">なし</li>'}</ul>`;
  };
  V.notebook.after = () => {
    A.$('#nb-export').addEventListener('click', () => {
      A.download(`onchain-game-atlas-notebook-${new Date().toISOString().slice(0, 10)}.json`, A.store.exportJSON());
      A.toast('書き出しました');
    });
    const doImport = (text) => {
      try {
        const r = A.store.importJSON(text, A.$('#nb-replace').checked ? 'replace' : 'merge');
        A.rerender();
        A.toast(`読み込みました（保存 ${r.saved}・メモ ${r.notes}・比較 ${r.compareSets}・仮説 ${r.hypotheses}）`);
      } catch (err) {
        A.toast(`読み込めませんでした: ${err.message}`);
      }
    };
    A.$('#nb-import-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      doImport(await file.text());
      e.target.value = '';
    });
    A.$('#nb-json-import').addEventListener('click', () => doImport(A.$('#nb-json').value));
    A.$('#nb-copy').addEventListener('click', async () => {
      const text = A.store.exportJSON();
      try { await navigator.clipboard.writeText(text); A.toast('JSON をコピーしました'); }
      catch (err) {
        const d = A.$('#nb-json').closest('details'); d.open = true;
        const ta = A.$('#nb-json'); ta.value = text; ta.focus(); ta.select();
        A.toast('コピーできない環境です。欄の JSON を選択したので、手動でコピーしてください');
      }
    });
    // 確認ダイアログを使わず、2 回押しで実行する（埋め込み表示では confirm() が使えないため）
    const armed = (btn, label, run) => btn.addEventListener('click', () => {
      if (btn.dataset.armed === '1') return run();
      btn.dataset.armed = '1';
      btn.textContent = label;
      setTimeout(() => { if (btn.isConnected && btn.dataset.armed === '1') { btn.dataset.armed = '0'; btn.textContent = btn.dataset.orig; } }, 5000);
    });
    const clr = A.$('#nb-clear'); clr.dataset.orig = clr.textContent;
    armed(clr, 'もう一度押すと全消去（先に書き出しを）', () => { A.store.clearAll(); A.rerender(); A.toast('研究ノートを消去しました'); });
    A.$('#nb-new-h').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      A.store.addHypothesis({ title: fd.get('title'), statement: fd.get('statement'), basedOn: String(fd.get('basedOn') || '').split(',').map((x) => x.trim()).filter(Boolean), experiment: fd.get('experiment'), signal: fd.get('signal'), kill: fd.get('kill'), status: 'idea' });
      A.toast('仮説を追加しました');
      A.rerender();
    });
    A.$$('[data-h-status]').forEach((s) => s.addEventListener('change', () => { A.store.updateHypothesis(s.dataset.hStatus, { status: s.value }); A.toast('状態を更新しました'); }));
    A.$$('[data-h-result]').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); A.store.addResult(f.dataset.hResult, f.r.value); A.rerender(); }));
    A.$$('[data-h-del]').forEach((b) => { b.dataset.orig = b.textContent; armed(b, 'もう一度押すと削除', () => { A.store.deleteHypothesis(b.dataset.hDel); A.rerender(); }); });
    A.$$('[data-set-del]').forEach((b) => b.addEventListener('click', () => { A.store.deleteCompareSet(b.dataset.setDel); A.rerender(); }));
  };

  // 仮説やインサイトの実験をノートへ
  A.adoptHypothesis = (id) => {
    const h = I.hypothesis.get(id);
    const x = A.store.addHypothesis({ title: h.title, statement: h.summary, basedOn: [h.id, ...(h.insights || [])], experiment: h.experiment?.design, signal: h.experiment?.signal, kill: h.experiment?.kill, status: 'testing' });
    A.toast('研究ノートに「検証中」として記録しました');
    return x;
  };
  A.adoptInsight = (id) => {
    const i = I.insight.get(id);
    A.store.addHypothesis({ title: `検証: ${i.title}`, statement: i.claim, basedOn: [i.id], experiment: i.experiment?.design, signal: i.experiment?.signal, kill: i.experiment?.kill, status: 'testing' });
    A.toast('研究ノートに記録しました');
  };

  // ---------- 方法と定義 ----------
  A.aboutHtml = () => `<div class="read"><h1>方法と定義</h1>
    <h2>このサイトの目的</h2><p>オンチェーンゲームの開発者が「何が発明され、何が成立せず、どこにまだ可能性が残っているか」を調べ、自分の設計仮説を比較して次の実験を選ぶための研究ツールです。特定の構想を正当化するためではなく、反証や「ブロックチェーンは不要」という結論も得られるように作っています。</p>
    <h2>分類（7 領域）</h2><dl class="kv">${Object.entries(L.category).map(([k, v]) => `<dt>${esc(L.categoryShort[k])}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
    <p>一つの事例は複数の領域に属し得ます。主領域を一つ選び、各領域への分類理由を記録しています。分類とは別に、オンチェーンの範囲・オフチェーン依存・管理者権限・ソース公開・第三者が実際に拡張できた範囲を個別に記録しています。</p>
    <h2>文のラベル</h2><dl class="kv"><dt>${A.kBadge('fact')}</dt><dd>出典で直接確認できる事実。</dd><dt>${A.kBadge('claim')}</dt><dd>運営・開発者など当事者の主張。主張者を併記。因果の説明（「〜のために変更した」）は原則ここに入ります。</dd>
      <dt>${A.kBadge('analysis')}</dt><dd>このサイトの分析・仮説。出典は根拠がある場合のみ。</dd><dt>${A.kBadge('unknown')}</dt><dd>調べたが確認できなかったこと。</dd></dl>
    <h2>数値</h2><p>TVL、取引高、ウォレット数、DAU、トークン価格、資金調達、助成金、継続率は別の指標として扱い、期間・定義・出典を付けます。性質は「実測（オンチェーン・独立計測）」「運営発表」「推定（第三者）」に分けます。異なる定義の数値を横に並べて比較しないでください。</p>
    <h2>日付</h2><p>日付は資料で確認できた精度のまま（年・年月・年月日）保持します。出来事の日、資料の公開日、参照日は別々に記録しています。年表で「項目の日付欄から生成」と書かれた行は、項目の発表日・公開日・終了日から自動で作った出来事です。</p>
    <h2>関係</h2><p>「確認された関係」は当事者の言及やコードのフォークなど直接証拠がある場合だけです。似ているだけのものは「分析上の類似」として破線で区別します。</p>
    <h2>出典の扱い</h2><p>実際に内容を確認した資料は「参照済み」、検索結果の要約だけで見た資料は「検索要約のみ」とし、後者だけを根拠にした事実はデータ品質ページに一覧化しています。引用は 200 文字以内の逐語引用に限り、画像は転載していません。</p>
    <h2 id="integrity">記録の指紋（内容ハッシュとマークルルート）</h2>
    <p>各事例の詳細画面と、このサイトの冒頭に表示している <code>sha256:…</code> は、研究データの元ファイル（YAML）から計算した指紋です。各ファイルの SHA-256 を葉として、隣り合う 2 つを連結して SHA-256 を取ることを繰り返したマークル木の根を「dataset root」と呼んでいます（葉が奇数のときは最後の葉を複製）。記述が 1 文字でも変わると、その事例のハッシュと root が変わります。</p>
    <p>使い道は、引用・保存した版と今の版が同じかを確かめることです。リポジトリを取得して <code>node scripts/verify-integrity.mjs [root]</code> を実行すると、手元のデータから再計算して公開値と照合できます。</p>
    <p class="note-box">このハッシュはどのブロックチェーンにも記録していません（タイムスタンプの証明にはなりません）。改ざん検知の手がかりであって、内容の正しさを保証するものではありません。現在の root: <code style="overflow-wrap:anywhere">${esc(D.integrity?.root || '')}</code>（葉 ${D.integrity?.leaves.length || 0} 件）</p>
    <h2 id="market">市場データ・公式リンク・アイコン</h2>
    <p>各事例の「市場データ」と、ホームの「市場に残った記録」は、CoinGecko（トークン価格・時価総額・最高値）と DefiLlama（TVL の推移）の公開 API から自動取得した値です（取得日時: ${esc(D.market?.fetchedAt?.replace('T', ' ').slice(0, 16) || '未取得')} UTC）。取得元の ID は研究データの <code>ids</code> に記録し、公式サイトとの一致を確認したものだけを使っています。これらは投機や市場全体の動きを含むため、遊ばれているかどうかの指標ではなく、研究上の数値（運営発表・実測・推定）とは分けて表示しています。</p>
    <p>公式リンク（サイト・X・Discord・GitHub など）は、公式サイトや公式ドキュメント、既存の一次資料に載っていることを確認したものです。閉鎖・休止したものは取り消し線で示します。</p>
    <p>アイコンは CoinGecko・DefiLlama・公式サイト（favicon）から取得した各プロジェクトのロゴで、リンク先を見分けるためだけに表示しています。ロゴの権利は各プロジェクトに帰属します。取得できなかった事例には、記録ハッシュから生成した 5×5 のパターンを表示しています。</p>
    <h2>研究ノートの保存</h2><p>ログイン不要で、このブラウザの localStorage に保存します。別のブラウザや端末とは共有されず、サイトデータの削除で消えます。JSON の書き出し・読み込みで移行・バックアップしてください。</p>
    <h2>データの追加</h2><p>研究データはリポジトリの <code>data/</code> にある YAML です。1 事例 1 ファイル（<code>data/games/&lt;id&gt;.yaml</code>）で、形式は <code>docs/RESEARCH_GUIDE.md</code> にあります。<code>npm run build</code> で検査とサイト用データの生成を行い、参照切れ・日付形式・出典の欠落があるとビルドが失敗します。</p>
    <p class="small muted">データ更新日: ${A.fmtDate(D.lastUpdated)}・ビルド日: ${A.fmtDate(D.generated)}</p></div>`;
})();

(function () {
  const A = window.A;
  A.aboutHtml.after = ({ params }) => { const id = params.get('s'); if (id) document.getElementById(id)?.scrollIntoView(); };
})();
