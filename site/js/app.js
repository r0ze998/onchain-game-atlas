/* ルーターと共通イベント */
(function () {
  'use strict';
  const A = window.A;
  const V = A.views;
  const main = document.getElementById('main');
  const routes = {
    '': V.home, timeline: V.timeline, entries: V.entries, entry: V.entry, compare: V.compare, graph: V.graph, concept: V.concept,
    questions: V.questions, question: V.question, insights: V.insights, insight: V.insight, hypotheses: V.hypotheses,
    notebook: V.notebook, sources: V.sources, source: V.source, search: V.search, quality: V.quality, about: A.aboutHtml, acquisition: V.acquisition,
  };
  const navKey = { entry: 'entries', concept: 'graph', question: 'questions', insight: 'insights' };
  const titles = { timeline: '年表', entries: '索引', compare: '比較', graph: 'つながり', questions: '問い', insights: 'インサイト', hypotheses: '設計仮説', notebook: '研究ノート', sources: '出典', quality: 'データ品質', about: '方法と定義', search: '検索', acquisition: 'ゼロイチ' };

  let lastPath = null;
  function render() {
    const ctx = A.parseHash();
    const key = ctx.parts[0] || '';
    const view = routes[key];
    A.ctxEntry = null;
    main.innerHTML = view ? view(ctx) : A.notFound();
    if (view && view.after) view.after(ctx);
    const nk = navKey[key] || key;
    A.$$('nav#nav a').forEach((a) => (a.dataset.nav === nk ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    let t = titles[key];
    if (key === 'entry' || key === 'concept') t = A.nodeName(ctx.parts[1]);
    if (key === 'insight') t = A.I.insight.get(ctx.parts[1])?.title;
    if (key === 'question') t = A.I.question.get(ctx.parts[1])?.q;
    document.title = (t ? `${t} — ` : '') + 'オンチェーンゲーム設計アトラス';
    // パスが変わったときだけ先頭へ移動しフォーカスを本文へ（絞り込み中は維持）
    if (ctx.path !== lastPath) {
      window.scrollTo(0, 0);
      if (lastPath !== null) main.focus({ preventScroll: true });
      lastPath = ctx.path;
    }
    document.getElementById('nav').classList.remove('open');
    document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
    updateTray();
  }
  A.rerender = () => { const y = window.scrollY; render(); window.scrollTo(0, y); };
  function updateTray() {
    const n = A.store.tray().length;
    const el = document.getElementById('tray-count');
    el.hidden = !n;
    el.textContent = n;
    el.setAttribute('aria-label', `比較中 ${n} 件`);
  }
  A.onStoreChange = updateTray;

  window.addEventListener('hashchange', render);
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('search-input').value.trim();
    location.hash = `#/search?q=${encodeURIComponent(q)}`;
  });
  document.getElementById('menu-btn').addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    const open = nav.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('nav').addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;
    document.getElementById('nav').classList.remove('open');
    document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
  });
  // 委譲: 保存・比較・目次スクロール・実験の採用
  main.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (b) {
      const id = b.dataset.id;
      if (b.dataset.act === 'save') { const on = A.store.toggleSaved(id); A.toast(on ? '研究ノートに保存しました' : '保存を外しました'); A.rerender(); }
      if (b.dataset.act === 'tray') { A.store.toggleTray(id); A.rerender(); }
      if (b.dataset.act === 'adopt-hyp') A.adoptHypothesis(id);
      if (b.dataset.act === 'adopt-insight') A.adoptInsight(id);
      return;
    }
    const s = e.target.closest('[data-scroll]');
    if (s) {
      e.preventDefault();
      const t = document.getElementById(s.dataset.scroll);
      if (t) { t.scrollIntoView(); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
    }
  });
  // メモの自動保存
  let noteT;
  main.addEventListener('input', (e) => {
    const ta = e.target.closest('textarea[data-note]');
    if (!ta) return;
    clearTimeout(noteT);
    const st = document.querySelector(`[data-note-status="${CSS.escape(ta.dataset.note)}"]`);
    if (st) st.textContent = '入力中…';
    noteT = setTimeout(() => { A.store.setNote(ta.dataset.note, ta.value); if (st) st.textContent = A.store.ok ? '保存しました' : '保存できませんでした'; }, 400);
  });
  document.getElementById('foot-updated').textContent = `データ更新: ${A.fmtDate(A.D.lastUpdated)}（${A.D.games.length} 件）`;
  render();
})();
