/* 研究ノートのローカル保存（localStorage）。JSON でエクスポート・インポートする */
(function () {
  'use strict';
  const A = window.A;
  const KEY = 'onchain-game-atlas.notebook.v1';
  const SCHEMA = 'onchain-game-atlas/notebook@1';

  const empty = () => ({ schema: SCHEMA, saved: {}, notes: {}, compareSets: [], hypotheses: [], tray: [] });
  let mem = empty();
  let storageOk = true;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      mem = raw ? normalize(JSON.parse(raw)) : empty();
    } catch (e) {
      storageOk = false;
      mem = empty();
    }
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(mem));
      storageOk = true;
    } catch (e) {
      storageOk = false;
      A.toast('ブラウザに保存できませんでした（プライベートモードや容量制限の可能性）。エクスポートで退避してください。');
    }
    A.onStoreChange && A.onStoreChange();
  }
  const now = () => new Date().toISOString();
  const uid = (p) => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  // 外部 JSON を受け入れ可能な形に整える。未知のキーは捨てる
  function normalize(o) {
    if (!o || typeof o !== 'object') throw new Error('JSON オブジェクトではありません');
    if (o.schema && o.schema !== SCHEMA) throw new Error(`未対応の形式です: ${o.schema}`);
    const out = empty();
    const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
    if (isObj(o.saved)) for (const [k, v] of Object.entries(o.saved)) out.saved[String(k)] = { savedAt: String(v?.savedAt || now()) };
    if (isObj(o.notes)) for (const [k, v] of Object.entries(o.notes)) if (v && typeof v.text === 'string') out.notes[String(k)] = { text: v.text, updated: String(v.updated || now()) };
    if (Array.isArray(o.compareSets)) out.compareSets = o.compareSets.filter((s) => s && Array.isArray(s.ids)).map((s) => ({ id: String(s.id || uid('set')), name: String(s.name || '無題の比較'), ids: s.ids.map(String).slice(0, 4), note: String(s.note || ''), created: String(s.created || now()) }));
    if (Array.isArray(o.hypotheses)) out.hypotheses = o.hypotheses.filter((h) => h && h.title).map((h) => ({
      id: String(h.id || uid('h')), title: String(h.title), statement: String(h.statement || ''), basedOn: Array.isArray(h.basedOn) ? h.basedOn.map(String) : [],
      experiment: String(h.experiment || ''), signal: String(h.signal || ''), kill: String(h.kill || ''),
      status: ['idea', 'testing', 'supported', 'refuted', 'abandoned'].includes(h.status) ? h.status : 'idea',
      results: Array.isArray(h.results) ? h.results.filter((r) => r && r.text).map((r) => ({ date: String(r.date || now().slice(0, 10)), text: String(r.text) })) : [],
      created: String(h.created || now()), updated: String(h.updated || now()),
    }));
    if (Array.isArray(o.tray)) out.tray = o.tray.map(String).slice(0, 4);
    return out;
  }

  const S = (A.store = {
    get ok() { return storageOk; },
    data: () => mem,
    isSaved: (id) => !!mem.saved[id],
    toggleSaved(id) {
      if (mem.saved[id]) delete mem.saved[id]; else mem.saved[id] = { savedAt: now() };
      persist();
      return !!mem.saved[id];
    },
    note: (key) => mem.notes[key]?.text || '',
    setNote(key, text) {
      if (text.trim()) mem.notes[key] = { text, updated: now() }; else delete mem.notes[key];
      persist();
    },
    tray: () => mem.tray.slice(),
    inTray: (id) => mem.tray.includes(id),
    toggleTray(id) {
      if (mem.tray.includes(id)) mem.tray = mem.tray.filter((x) => x !== id);
      else {
        if (mem.tray.length >= 4) { A.toast('比較は最大 4 件です。先に外してください。'); return false; }
        mem.tray.push(id);
      }
      persist();
      return mem.tray.includes(id);
    },
    setTray(ids) { mem.tray = ids.slice(0, 4); persist(); },
    saveCompareSet(name, ids) {
      const s = { id: uid('set'), name: name || '無題の比較', ids: ids.slice(0, 4), note: '', created: now() };
      mem.compareSets.unshift(s);
      persist();
      return s;
    },
    deleteCompareSet(id) { mem.compareSets = mem.compareSets.filter((s) => s.id !== id); persist(); },
    addHypothesis(h) {
      const x = normalize({ schema: SCHEMA, hypotheses: [{ ...h, id: uid('h'), created: now(), updated: now() }] }).hypotheses[0];
      mem.hypotheses.unshift(x);
      persist();
      return x;
    },
    updateHypothesis(id, patch) {
      const h = mem.hypotheses.find((x) => x.id === id);
      if (!h) return;
      Object.assign(h, patch, { updated: now() });
      persist();
    },
    addResult(id, text) {
      const h = mem.hypotheses.find((x) => x.id === id);
      if (!h || !text.trim()) return;
      h.results.push({ date: now().slice(0, 10), text });
      h.updated = now();
      persist();
    },
    deleteHypothesis(id) { mem.hypotheses = mem.hypotheses.filter((h) => h.id !== id); persist(); },
    exportJSON() {
      return JSON.stringify({ ...mem, exportedAt: now(), datasetUpdated: A.D.lastUpdated }, null, 2);
    },
    // mode: 'merge'（既存に追加・同じキーは取り込み側で上書き）| 'replace'
    importJSON(text, mode = 'merge') {
      const inc = normalize(JSON.parse(text));
      if (mode === 'replace') mem = inc;
      else {
        Object.assign(mem.saved, inc.saved);
        Object.assign(mem.notes, inc.notes);
        const setIds = new Set(mem.compareSets.map((s) => s.id));
        mem.compareSets = [...inc.compareSets.filter((s) => !setIds.has(s.id)), ...mem.compareSets];
        const hmap = new Map(mem.hypotheses.map((h) => [h.id, h]));
        for (const h of inc.hypotheses) hmap.set(h.id, h);
        mem.hypotheses = [...hmap.values()].sort((a, b) => b.updated.localeCompare(a.updated));
        mem.tray = [...new Set([...mem.tray, ...inc.tray])].slice(0, 4);
      }
      persist();
      return { saved: Object.keys(inc.saved).length, notes: Object.keys(inc.notes).length, compareSets: inc.compareSets.length, hypotheses: inc.hypotheses.length };
    },
    clearAll() { mem = empty(); persist(); },
  });
  S._normalize = normalize;
  load();
})();
