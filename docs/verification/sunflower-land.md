# 検証ログ: sunflower-land

- 確認日: 2026-10-23
- 確認した出典: 25 / 25（公式ドキュメント 13 件・web3isgoinggreat・Decrypt・Naavik は curl、Polygon フォーラムは Discourse JSON、GitHub は blobless clone と WebFetch。CODE_CONTRIBUTING・OFFCHAIN_API は curl 403 のため clone した HEAD で確認）
- 方法: Fair Play Policy 本文から AI 条項を抽出、git log で日付・作者数・コミット数を再集計、コード（network.ts / Withdrawals.ts / reputation.ts / README）を HEAD で照合

## AI エージェント禁止条項（逐語）
Prohibited Conduct & Bans（「Last update: 21 August 2026」）の「1. Automation & Tooling — You must not:」の第 1 項:
> use any artificial intelligence tool, agent, model or assistant to automate, execute or materially assist any part of gameplay;
同節は bot・script・macro・auto-clicker、内部 API への直接アクセス、ヘッドレス／改造クライアントも禁止。entry の q は逐語一致。

## 照合結果（主なもの）
- 43.4 万（DappRadar 7 日）、764 gwei、ガス使用の 3 分の 2 超、SFF 5.75 ドル→89% 減（Decrypt）、100→5 万人・35 万アカウント・「abused by bots」（助成申請、2022-01-12）、Naavik の 112,183→49,362 / 42,999→7,209 / 1.5 万 BAN / 0.30 ドル→73% 減 / 10,160 DAW、すべて一致
- 11,326 コミット・作者名 148・年別作者数（76/34/39/49/32）・1.6k スター・665 フォーク・No Licence の理由、一致。中心 8 表記で約 74%（9 表記なら約 75%）
- 機能導入日: ブラックリスト 2022-03-14、キャプチャ 2022-04-05、Ronin Welcome Pack 2025-02-19、顔認証 2025-03-10、一致
- FLOWER 2.56 億 / 流通 2,000 万 / 留保 2.36 億、チーム収入 Gem 50%・市場 5%、出金手数料 30%→10%、資源手数料 100%→15%、評判点、すべて一致
- Chapter 1 の日付矛盾（Chapters ページ 2023-02 / Chapter 1 ページ「March 8th -> April 30th 2023」）を確認

## 直したこと
- summary・selection_reason「ほぼ全ての行動がオンチェーン」「すべてをオンチェーン」→ 資料間で記述が異なる旨を付けて弱めた
- before_after の旧作設計: fact → claim（web3isgoinggreat）に変更し、Naavik の異なる記述を併記
- retention_evidence「Naavik、出典の計測方法は不明」→ Naavik が Dune データで同期取引を代理指標に集計と明記（原文に方法の説明あり）
- m-sunflower-land-dau-2022 / mau-2022: nature estimated → measured、定義を同期取引ベースに修正
- event 追加: 2022-04-07 段階的再開（Naavik）。Portal 競技会に年の根拠（コミット 2023-11-30）と「2,000 ドル相当」表記を追記。顔認証 event に 2022-09〜2023-07 の先行する本人確認の試み（Anima は同日 revert）を追記
- unknowns: 再開日を部分的に更新、助成の採否を追加

## 追加した反証・矛盾
- extensions + counter_evidence: 運営自身が 2026-03-24〜04-24 にプロンプトから Portal のミニゲームを生成する実験的 AI Builder を出して削除し、2026-10 には LLM テストシナリオも導入。AI は制作側で使われ、プレイヤー側の代理としてだけ禁止されている
- contradictions: 旧作の設計（web3isgoinggreat「ほぼ全行動が取引」/ Naavik「ブラウザのローカル状態を定期同期」）

## 確認できなかったこと
- AI 禁止条項が規約に初めて入った時期（Wayback は 429 で取得できず）
- Polygon 助成が支払われたか、「VC なし」を外部資料で裏付けること
- 現在の DAU・MAU

## 総合判定
修正済み — AI 禁止条項は逐語で実在。数値・日付・コード記述に捏造はなかったが、旧作の「全行動オンチェーン」を単一の二次資料で fact にしていた点と、Naavik の計測方法を「不明」とした誤りを修正。AI Builder の実験という重要な反証を追加。
