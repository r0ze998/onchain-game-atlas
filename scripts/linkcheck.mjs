// 全出典 URL の到達性を検査し data/linkcheck.json に書く。
// この実行環境の外向きプロキシが遮断するホスト（github.com など）は「環境で遮断」と区別して記録する。
// 使い方: node scripts/linkcheck.mjs [--concurrency 8]
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { loadAll, buildDataset, ROOT } from './lib.mjs';

const { dataset } = buildDataset(loadAll());
const urls = [...new Set(dataset.sources.map((s) => s.url))];
const conc = Number(process.argv[process.argv.indexOf('--concurrency') + 1]) || 8;

function check(url) {
  return new Promise((resolve) => {
    execFile('curl', ['-sS', '-L', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '25', '-A', 'Mozilla/5.0 (research link check)', url], { timeout: 40000 }, (err, stdout, stderr) => {
      const code = Number(stdout) || 0;
      let status;
      if (/CONNECT tunnel failed, response 40[37]/.test(stderr)) status = 'env-blocked';
      else if (code >= 200 && code < 400) status = 'ok';
      else if (code === 403 || code === 429) status = 'refused';
      else if (code === 404 || code === 410) status = 'missing';
      else if (code) status = `http-${code}`;
      else status = 'network-error';
      resolve({ url, code, status, err: stderr.trim().slice(0, 160) || undefined });
    });
  });
}

const results = [];
let i = 0;
await Promise.all(Array.from({ length: conc }, async () => {
  while (i < urls.length) {
    const u = urls[i++];
    results.push(await check(u));
  }
}));
results.sort((a, b) => a.url.localeCompare(b.url));
const count = results.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
const label = { ok: '到達', 'env-blocked': 'この検査環境のプロキシで遮断（調査時は別経路で参照）', refused: 'サイトがボットを拒否 (403/429)', missing: '404/410', 'network-error': '接続エラー' };
const summary = `${new Date().toISOString().slice(0, 10)} に ${urls.length} 件の URL を検査: ` + Object.entries(count).map(([k, v]) => `${label[k] || k} ${v}`).join('、');
fs.writeFileSync(path.join(ROOT, 'data', 'linkcheck.json'), JSON.stringify({ checked: new Date().toISOString(), summary, results }, null, 2));
console.log(summary);
for (const r of results.filter((r) => ['missing', 'network-error'].includes(r.status) || r.status.startsWith('http-'))) console.log(r.status, r.url);
