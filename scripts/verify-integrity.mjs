// 研究データの指紋を検証する。使い方: node scripts/verify-integrity.mjs [期待するルートハッシュ]
// site/data.generated.js に記録されたハッシュと、手元の data/ を再計算した値を比べる
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT } from './lib.mjs';

const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const src = fs.readFileSync(path.join(ROOT, 'site', 'data.generated.js'), 'utf8');
const D = JSON.parse(src.slice(src.indexOf('=') + 1).trim().replace(/;$/, ''));
let bad = 0;
for (const l of D.integrity.leaves) {
  const p = path.join(ROOT, l.path);
  const h = fs.existsSync(p) ? sha(fs.readFileSync(p)) : '(missing)';
  if (h !== l.hash) { bad++; console.log('MISMATCH', l.path, l.hash.slice(0, 12), '->', h.slice(0, 12)); }
}
let level = D.integrity.leaves.map((l) => l.hash);
while (level.length > 1) { const n = []; for (let i = 0; i < level.length; i += 2) n.push(sha(level[i] + (level[i + 1] ?? level[i]))); level = n; }
console.log(`leaves ${D.integrity.leaves.length}, mismatches ${bad}`);
console.log(`root (recomputed from leaves) ${level[0]}`);
console.log(`root (published)              ${D.integrity.root}`);
const expected = process.argv[2];
const ok = level[0] === D.integrity.root && !bad && (!expected || expected === D.integrity.root);
console.log(ok ? 'OK' : 'NG');
process.exit(ok ? 0 : 1);
