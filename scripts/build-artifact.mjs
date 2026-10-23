// claude.ai Artifact 用に site/index.html から文書の骨格（doctype/html/head/body）を外した版を作る。
// 出力: dist/artifact/index.html と、同じ相対パスの style.css・js/・data.generated.js
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const site = path.join(ROOT, 'site');
const out = path.join(ROOT, 'dist', 'artifact');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'js'), { recursive: true });
const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset[^>]*>\n?/, '')
  .replace(/<meta name="viewport"[^>]*>\n?/, '');
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
const rest = head.replace(title, '').trim();
fs.writeFileSync(path.join(out, 'index.html'), `${title}\n<meta name="claude:viewport-fit-sides" content="cover">\n${rest}\n${body.trim()}\n`);
for (const f of ['style.css', 'data.generated.js']) fs.copyFileSync(path.join(site, f), path.join(out, f));
for (const f of fs.readdirSync(path.join(site, 'js'))) fs.copyFileSync(path.join(site, 'js', f), path.join(out, 'js', f));
fs.cpSync(path.join(site, 'img'), path.join(out, 'img'), { recursive: true });
console.log('wrote', path.relative(ROOT, out));
