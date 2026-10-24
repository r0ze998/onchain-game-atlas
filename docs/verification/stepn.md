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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 9 / 15（acquisition から参照される出典）。公開ベータのプレスリリース（2021-12-20、SYDNEY）、TechCrunch（2022-05-22）、Solana Ignition 結果、Whitepaper Change Log、Decrypt 2022-06 と 2023-03、ForkLog、CoinCodex を開き直した。Activation Code・Energy・GMT Vesting・CoinGecko・Blockcrunch・CoinPost は前回までの取得に依拠。
- dates.launched の変更（"2021" → "2021-12-20"）: プレスリリースの日付 12/20/2021 と「public beta launch」の文言、TechCrunch の「Since its launch in December」で裏付けられ、妥当。ただしハッカソン（〜2021-10-15）の後に最初のベータ利用者がいたことを note に追記した。
- 直したこと:
  - steps 2022-06「CMO は月間アクティブ 300 万人…とし」→ 300 万は Decrypt 記事の地の文で発言者・出典の明示がない。CMO の発言は「3 分の 1 が non-crypto natives」と招待コードの説明のみ、に分けた。
  - metric m-stepn-mau-2022-06-cmo の definition を同様に修正（id は参照維持のため据え置き）。
  - counter「CMO の月間 300 万人」→「Decrypt 記事の 300 万（出所不明）」。
  - summary「招待制で広がり」→ 招待制に移った（需要を生んだというより流入を絞った可能性）に。
- 確認できたこと: q「After coming in fourth…first batch of beta users.」と「funnel the inflow of users so that the new users don't end up…」は逐語一致。568 件・Gaming 4 位・8/31〜10/15、500 万ドル・11 月・Sequoia、2022-01-09 の Activation Code、ForkLog の運営投稿「We have also achieved 300k DAU this week.」（2022-04-17）、CoinCodex の 4.2 億 GMT・0.01 ドル（Raised 欄は n/a、本文は 420 万ドル）、Dune 経由の 70 万超・4.5 万弱。
- 追加した反証: TechCrunch によれば、公開前から評判が広がり広告なしで登録が殺到し、数週間で 1 日の登録数に上限を設けた。需要は招待制（2022-01-09）より先にあり、招待コードは獲得チャネルというより流入制限として働いた可能性がある（counter に追加、逐語 q 付き）。
- 確認できなかったこと: Binance Launchpad の一次告知、ベータ利用者の初期人数、Dune ダッシュボード本体（遮断）。
- 判定: 修正済み（数値の発言者の取り違え 1 件を是正。dates.launched の変更は妥当）。
