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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 10 / 10（Naavik・Polygon 助成申請・Decrypt・ドキュメント 4 ページを WebFetch、コードは scratchpad に blobless clone して git show / git log で照合）
- コードで確認したこと: d1b786d の Farm.sol の createFarm は `msg.value >= 1 * 10**(decimals - 1)`（0.1 MATIC、コメントは「$0.10」）と 3 団体の慈善アドレスに限定、getMarketRate は総供給 10 万・50 万…の段階制。031e099（2022-02-14）の「Beta testers only!」「We are launching soon. Join us on Discord…」、6513b18（2022-03-13）の「Only one address can be used during beta testing.」「Minumum of 1 MATIC」、2021-06-18〜30 の寄付コミット、2021-05-30 Ropsten・06-07 Matic testnet、2025-02-19 Ronin Welcome Packs はすべて一致
- 直したこと:
  - steps 2021-10: Naavik の「初期参加者ほど大きな報酬」を旧作 SFF の根拠に使用 → Naavik のその文は作り直し後の SFL についてのものと明記し、出典から外した。channels token-incentive の出典からも Naavik を外した（コードのみで成立）
  - steps 2022-04-07: 「2022-05-22 に SFL トークンを開始」 → Naavik の原文は「新しい Sunflower Land が 5/22 に Polygon で公開」（トークン開始日ではない）
  - steps 2023-12-05: ドキュメントに年の記載がない → 年はポータル機能のコミット（2023-11-30〜12-05）との照合による推定と明記。賞金は 11/29 時点で 2,000 ドル相当と追記
  - cost: 「VC 資金を受けていない」「事前発行をしていない」 → 公式は「外部 VC 投資なし」、Naavik は「投資家からの資金調達は発表されていない」「大規模な事前発行・開始前の大規模 NFT 販売なし」と原文に合わせた
  - counter（SFF 価格）: k: fact で「可能性を否定できない」 → analysis。Naavik の「SFF は 2022-01-03 に開始し急騰」を足し、急増ピーク（12/31〜1/5）とトークン取引開始が重なることを反証として明記
  - unknowns: ハッカソン起源説 → RugDoc Wiki の検索要約のみ（本文取得不可）で、Naavik・助成申請・Decrypt にも言及なし、と明記
- 追加した反証: SFF の取引開始（Naavik: 2022-01-03）と急増ピークの重なり（上記）。contradictions に SFF の高値の不一致（Decrypt 1/4 の 5.75 ドル / Naavik 4.64 ドル）を追加
- 確認できなかったこと: ハッカソン（DoraHacks）起源の一次資料。DappRadar ブログ（検索要約では「2021-09 公開」）は遮断で、公式の「2021-08」との差は確かめられなかった。急増期のボット比率
- 判定: 修正済み（出典の取り違え 2 件・日付の意味の取り違え 1 件。調査役メモの「0.1 MATIC の寄付で参加」「2021-12 の急増は主にボット」「ハッカソン起源説は未確認」はいずれも原資料どおり）
