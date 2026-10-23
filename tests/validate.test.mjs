// 検査ロジック自体のテスト（壊れたデータを確実に弾くか）と、実データがエラーなしで通るか
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDataset, loadAll, isValidDate } from '../scripts/lib.mjs';

const src = (id, extra = {}) => ({ id, title: 't', url: 'https://example.org/' + id, publisher: 'p', type: 'official-docs', primary: true, accessed: '2026-10-01', access: 'fetched', ...extra });
const st = (k = 'fact', s = ['s1']) => ({ t: 'x', k, s });
const axes = Object.fromEntries(['gameplay', 'necessity', 'information', 'persistence', 'extensibility', 'money_flow', 'entry_barrier'].map((a) => [a, st()]));
const lvl = (level) => ({ level, s: ['s1'] });
const game = (over = {}) => ({
  file: 'data/games/g1.yaml', id: 'g1', name: 'G1', kind: 'game', depth: 'index', summary: 's', selection_reason: 'r', updated: '2026-10-01',
  categories: [{ id: 'assets', role: 'primary', reason: 'r' }], status: { value: 'active', s: ['s1'] },
  architecture: { onchain: lvl('assets-only'), admin: lvl('limited'), open_source: lvl('none'), extensibility: lvl('none') },
  compare: axes, sources: [src('s1')], ...over,
});
const raw = (games, extra = {}) => ({ games, concepts: [], eras: [], questions: [], insights: [], hypotheses: [], globalSources: [], globalRelations: [], ...extra });

test('date precision validation', () => {
  for (const d of ['2020', '2020-08', '2020-08-07', '2024-02-29']) assert.ok(isValidDate(d), d);
  for (const d of ['2020-13', '2020-02-30', '20', '2020/08/07', '2023-02-29', '']) assert.ok(!isValidDate(d), d);
});

test('valid minimal entry passes', () => {
  const { errors } = buildDataset(raw([game()]), { today: '2026-10-23' });
  assert.deepEqual(errors, []);
});

test('fact without source is an error', () => {
  const g = game({ compare: { ...axes, gameplay: { t: 'x', k: 'fact' } } });
  const { errors } = buildDataset(raw([g]), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('fact without source')));
});

test('unknown source reference, future date, bad enum are errors', () => {
  const g = game({
    status: { value: 'bogus' },
    events: [{ id: 'e1', date: '2027-01', type: 'launch', title: 't', s: ['nope'] }],
  });
  const { errors } = buildDataset(raw([g]), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('unknown source nope')));
  assert.ok(errors.some((e) => e.includes('future')));
  assert.ok(errors.some((e) => e.includes('bad status')));
});

test('confirmed relation needs a source; analytic needs a note; target must exist', () => {
  const g = game({ relations: [{ to: 'g2', type: 'influenced-by', basis: 'confirmed' }, { to: 'g1', type: 'similar-to', basis: 'analytic' }, { to: 'zzz', type: 'similar-to', basis: 'analytic', note: 'n' }] });
  const g2 = game({ file: 'data/games/g2.yaml', id: 'g2' });
  const { errors } = buildDataset(raw([g, g2]), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('confirmed relation without source')));
  assert.ok(errors.some((e) => e.includes('analytic relation without note')));
  assert.ok(errors.some((e) => e.includes('unknown target')));
});

test('fact backed only by unreachable source is an error; snippet-only is a warning', () => {
  const g = game({
    sources: [src('s1'), src('s2', { access: 'unreachable' }), src('s3', { access: 'snippet' })],
    compare: { ...axes, gameplay: st('fact', ['s2']), necessity: st('fact', ['s3']) },
  });
  const { errors, warnings } = buildDataset(raw([g]), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('unreachable')));
  assert.ok(warnings.some((w) => w.includes('snippet')));
});

test('insight requires a supporting case and evidence sources', () => {
  const ins = [{ id: 'i1', title: 't', claim: 'c', conditions: 'c', confidence: 'medium', confidence_reason: 'r', experiment: { design: 'd' }, gap_type: 'unsolved-gap', evidence: [{ game: 'g1', stance: 'counter', note: 'n' }] }];
  const { errors } = buildDataset(raw([game()], { insights: ins }), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('no supporting case')));
  assert.ok(errors.some((e) => e.includes('without source')));
});

test('deep entry needs every article section', () => {
  const { errors } = buildDataset(raw([game({ depth: 'deep', article: { what: [st()] } })]), { today: '2026-10-23' });
  assert.ok(errors.some((e) => e.includes('article.loop empty')));
});

test('real research data has no errors', () => {
  const { errors, dataset } = buildDataset(loadAll());
  assert.deepEqual(errors, []);
  assert.ok(dataset.games.length > 0);
});
