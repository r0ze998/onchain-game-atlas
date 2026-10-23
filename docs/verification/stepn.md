# 検証ログ: stepn

- 確認日: 2026-10-23
- 確認した出典: 17 / 17（ホワイトペーパー 10 ページを .md で取得、CoinGecko API、ForkLog・Blockcrunch・Decrypt 2 件・Motley Fool を WebFetch）＋ 追加 2 件（GMT Earning Advanced、The Block）
- Dune ダッシュボード（Decrypt の引用元）は dune.com がこの環境で遮断され再確認不可

## 数値の照合（性質ごと）
- 運営発表（reported）: 300k DAU は運営の 2022-04-17 投稿「We have also achieved 300k DAU this week.」（ForkLog 経由）で一致。Q1 2022 収入 192,635 SOL（約 2,681 万ドル）は FSL の報告として ForkLog が記載、一致。Blockcrunch の DAU 40 万・MAU 170 万は「peak record」で、StepN の Twitter 投稿のスクリーンショットとして掲載、一致（日付不明のため period を修正）
- 第三者推定（Dune）: 2022-05 ピーク 70 万超・最終月（12 月）4.5 万弱、Decrypt 本文と一致。ダッシュボード名を追記
- 出典の性質不明: Motley Fool の MAU 9.9 万・DAU 5,800 は「STEPN now lists ...」という文言で、運営の掲示か第三者集計か確定できない。Dune 群から分離し、注記を付けた（nature は保守的に estimated のまま）
- 市場価格（CoinGecko API を検証役が再取得）: GMT ATH 4.11（2022-04-27）、ATL 0.00583（2026-08-18）、現在 0.00721。GST ATH 8.51（2022-04-28）、現在 0.000788（同日 ATL）。一致
- Decrypt の下落幅 GST 2.08→1.53、GMT 1.24→0.83、ATH 9.03/4.11（CoinMarketCap 参照）一致

## 直したこと
- m-stepn-dau-mau-twitter-reported: period「2022 年前半（公開から約 6 か月）」→「2022-06-30 以前のピーク（日付不明）」、定義に peak を明記
- m-stepn-mau-dau-2022-10: 「最新のデータ（出典名なし）」→ 原文の文言と性質の不確定を明記し、別グループへ
- m-stepn-gst-supply-growth: 「+2500%（1 日 20%）」が約 3 か月の期間と換算上整合しない点を note に追記
- ev-stepn-rainbow: 「エネルギー要件の撤廃」→「GMT 報酬の 3 エネルギー要件を撤廃」（一般のエネルギー制ではない）
- ev-stepn-china: 出典は「木曜」の発表と書くのみで、2022-05-26 は暦からの換算と明記。The Block を追加
- 2% 手数料の記載日を 2022-02 → 2022-02-19 に精密化
- counter_evidence: Motley Fool は中国に触れていないことを明記
- 新規 event: ev-stepn-halving-back（2026-01-01、GMT 半減の再導入）

## 追加した反証・矛盾
- contradictions: 変更履歴の「2024-04-04 半減撤廃」と GMT Earning Advanced の「2026-01-01 半減再導入」
- contradictions: GMT の ETH 版を Tokenomic は inactive とするが、Governance ページは 2023-06-17 に残り 30.85 億 GMT を Ethereum のマルチシグへ移したと記す
- unknowns: 変更履歴の日付はホワイトペーパー更新日であり、アプリでの実施日とは限らない

## 確認できなかったこと
- 運営の元投稿（X）そのもの、Dune の集計定義、2022-09 の「472 万ユーザー」

## 総合判定
修正済み — 運営発表・Dune 推定・市場価格は分離されていたが、性質不明の数値の分類、期間の誤り、仕様変更の過大な要約、半減再導入の見落としを直した。
