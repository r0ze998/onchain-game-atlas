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
