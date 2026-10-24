# 検証記録: daydreams

- 確認日: 2026-10-23
- 確認した出典: 9 / 9（daydreamsai/daydreams を blobless clone し履歴を確認、Eternum 側は eternum clone で確認、Bankless 3 本は本文取得）。

## 直したこと
- open_source: 「当初は dojoengine/daydreams として開発」→ dojoengine/daydreams からのマージが 2025-01〜09 に繰り返しあること、Bankless の「part of @ohayo_dojo」を根拠に書き換え。開始組織は未確認。
- extensibility・compare.extensibility・persistence: ゲーム例（Gigaverse・Loot Survivor・Ponziland）が現在もあるかのような記述 → 2025-08-17 に examples/games ごと main から削除済みと修正（陳腐化告知より約半年前）。イベント追加。
- 1,000 エージェント発言: 2025-01-06（Bankless 掲載日）→ 発言は 2025-01-03 の Loaf の X 投稿で、Bankless が埋め込み引用。who を修正。
- counter_evidence: 「継続的なプレイ実績を残さないまま形を変えた」（fact 内の評価）→ fact と analysis に分割。

## 確認できたこと
- 初回コミット 2024-12-21（ponderingdemocritus「readme」）、2025-01-10 以前の README の「currently the only supported game is Eternum」、2026-02-06 の陳腐化告知（逐語確認）、MIT（licence.md、Copyright 2025 Loaf）、Dreams Router・x402 の記載、Ponziland の RuneLabsxyz PR（2025-06）。
- examples/tasks/eternum.ts（コミット 40fdb4a、2025-05-06）の trade_systems プレースホルダ 0x1234…。
- Bankless: 逐語引用、2,000 DREAMS（約 7 ドル）、Gigaverse が最初の対応ゲーム、S1 のエージェントは NPC という発言。

## 追加した反証・矛盾
- Eternum が 2026-09 から Daydreams を使わない別のエージェントランナー（apps/agent-runner）を開発中で、構想自体は継続している点。
- 起動器の費用: Bankless 本文は 2,000 DREAMS（約 7 ドル）、同記事に埋め込まれた利用者の投稿は 5,000 DREAMS（14.5 ドル）。

## 確認できなかったこと
- S1 のエージェント軍が Daydreams のコード・LLM で動いたか。DREAMS トークンの発行・配分。

## 総合判定
修正済み。ゲーム例の削除を見落としていた点が実質的な誤りで、それ以外の主張は出典と一致した。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 3 / 5（リポジトリを clone し直して履歴を集計、Bankless の 2025-01 と 2025-05 の記事。S1 の契約コードと Bankless S1 は今回未再取得）
- 直したこと:
  - growth の step と metrics m-daydreams-early-authors: 2025-02-28 までのコミット「619 件」→「620 件（うち dependabot 20 件、ボットを除くと 600 件）」。作者名 21 種（ボットを除く）と、2025-01-13 までは ponderingdemocritus の 52 件だけであることは一致
- 追加した反証: 作者名 21 種は広がりを大きく見せる。ボットを除く 600 件のうち 447 件（約 75%）は作者の 2 つの名義で、外部からのマージ元には z-korp・underware-gg などの Starknet のゲーム開発チームが含まれる。初期の外部協力者は報道で新しく来た人より、作者が既にいた Starknet / Dojo の開発者だった可能性がある
- 照合済み: X 投稿 2025-01-03「We are pushing to have 1000 agents in the upcoming season」、Bankless の Dojo スタック・Eliza の主要コントリビュータという紹介、2,000 DREAMS（約 7 ドル）と埋め込まれた投稿の 5,000 DREAMS（既存の矛盾）、Gigaverse、Ponziland の PR（RuneLabsxyz、2025-06）、2025-08-17 のゲーム例削除、2026-02-06 の「features are already obsolete」の告知、README の「Join 1,000+ Developers」
- 確認できなかったこと: DREAMS の発行経緯、起動器の利用者数
- 判定: 修正済み（数値を 1 件訂正）
