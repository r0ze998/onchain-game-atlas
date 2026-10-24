# 検証記録: autonomous-worlds-essay

- 確認日: 2026-10-23
- 確認した出典: 5 / 5（新規追加 1 件を含む）。
- 方法: 0xPARC サイトの JS バンドルから base64 埋め込みの記事本文を復号（Part 1 と AW Network 記事）、Metalabel を WebFetch、作者特定のため Web 検索。

## 作者・日付の確認
- Part 1: front matter に `date: August 3, 2022`、本文冒頭に「by ludens（twitter.com/l_udens）」。主張どおり。
- AW Network 記事: `date: August 9, 2023`、`hidden: true`、著者 arb, caroline, ludens。主張どおり。
- 引用 2 件（「Autonomous Worlds have hard diegetic boundaries…」「Of course, autonomy is something you can only measure in retrospect.」）は逐語（原文は太字マークアップ付き）。

## 直したこと
- summary: 「誰も AW を止められない」→ 原文は「Nobody can unplug Autonomous Worlds.」。「MUD・Redstone・Biomes/DUST・Downstream など多くのプロジェクトが掲げる理念の参照点」→ 論考への直接リンクを確認できたのは DUST の README のみで、Downstream（Amor の寄稿）・Etherplay は AW の語を使うが論考に言及しない、と弱めた。
- persistence: 「誰も止められない」→「誰も電源を抜けない（unplug）」。

## 追加した反証・矛盾
- counter_evidence: 論考の条件は「少なくとも一人がコンセンサスに参加する限り」で、単一運営者の L2 はその前提を満たさない、という論考側からの反論を追記（Redstone 停止の一次告知 src-awe-lattice-x を追加）。
- contradictions: 論集 N1 の初出時期（AW Network 記事は 2023-08 時点で release を過去形、Devconnect で re-print 配布を予告。Metalabel は最初の部数を Istanbul の Assembly 参加者限定と記す）。

## 確認できなかったこと
- ludens の実名（Lattice CEO Justin Glibert とする一次資料は見つからず。ポッドキャスト題「From Economicus to Ludens」のみ）。Part 2 の公開有無（バンドル内に Part 2 の記事は見当たらなかったが網羅確認ではない）。

## 総合判定
修正済み（軽微）。作者・日付・引用は正しい。影響範囲の表現が根拠より強かったため弱めた。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 7 / 9（0xparc-part1、aw-residency、aw-hackathon、aw-network の 4 本は 0xparc.org の JS バンドル内の base64 の Markdown を独自に復号して確認。zkpodcast-225 の書き起こし、metalabel、ethglobal-aw は取り直し。lattice-x と l2beat は acquisition 節では使っていないため対象外）
- 照合: 謝辞（gubsheep、Will Robinson、Arthur Röing Baer ほか）、引用 "we recommend reading both links before applying"、"Ludens on Twitter, who is now building Lattice"、確定参加者、経験不要、30 人超、Words3・Asphodel・Primodium、日程（5/18〜26）、賞金 5 万ドル超とスポンサー、AW Network の役割、Devconnect での再版配布、印刷 1000 部（第 2 版 333 部）は一致
- 直したこと: なし
- 追加した反証: 開発者の集団は論考より前からあった。2022-04 の ZK Podcast 225 で gubsheep は、ludens が Dark Forest の実験的機能を作った後に Lattice で実験を進め、Devconnect で発表予定だと述べている。論考は既存の集団に名前を与えた面が強い。Residency の募集も、論考を読むことは推奨にとどめ、経験は不要とした
- 確認できなかったこと: 論考の閲覧数、Residency の応募者数、ハッカソンの提出数
- 判定: 重大な問題なし
