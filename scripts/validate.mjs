// 使い方: node scripts/validate.mjs [--quiet-warnings] [--only <game-id>]
import { loadAll, buildDataset } from './lib.mjs';

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
let raw;
try {
  raw = loadAll();
} catch (e) {
  console.error('YAML parse error:', e.message);
  process.exit(1);
}
const { errors, warnings } = buildDataset(raw);
const filt = (list) => (only ? list.filter((m) => m.includes(`/${only}.yaml`) || m.includes(` ${only}`)) : list);
const E = filt(errors);
const W = filt(warnings);
if (!args.includes('--quiet-warnings')) for (const w of W) console.log('WARN ', w);
for (const e of E) console.log('ERROR', e);
console.log(`\n${raw.games.length} entries, ${E.length} errors, ${W.length} warnings`);
process.exit(E.length ? 1 : 0);
