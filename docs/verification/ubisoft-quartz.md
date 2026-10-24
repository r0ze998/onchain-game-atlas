# 検証ログ: ubisoft-quartz

- 確認日: 2026-10-23
- 確認した出典: 5 / 5（すべて curl で本文取得）
- 方法: 日付・対象国・発言・終了の記述を本文照合

## 照合結果
- 2021-12-07 発表、Tezos、通し番号、対象 9 か国、Didier Genevois の発言、FAQ の「energy consumption is equal to that of a standard database」（TheSixthAxis）、一致
- 最後の Digit 2022-03-17（Quartz サイトの文言を GamesBeat・Decrypt が引用）、サーバー維持、他作（Rainbow Six Siege 等）へ持ち込む予定なし（Destructoid）、一致
- KitGuru（2026-08-03）「didn't garner a significant userbase」、一致

## 直したこと
- money_flow: k unknown →  claim。GamesBeat（本文取得済み）が Ars Technica を引いて「数千個の Digits の転売成立は 96 件」と伝えていたため（Ars 原記事は未読と明記）
- unknowns: 販売実績の項を更新
- source note 2 件（GamesBeat の 2025-06-19 更新表記、KitGuru の矛盾点）

## 追加した反証・矛盾
- counter_evidence: Ubisoft は後続の NFT 系タイトル Champions Tactics を 2026 年まで運営し、ブロックチェーン要素の支援をやめて 2026-10 末にサーバー停止（KitGuru）。「短期間で撤退」は Quartz の Breakpoint 展開に限った話で、Ubisoft のブロックチェーン事業全体ではない
- contradictions: KitGuru は Quartz が Rainbow Six Siege と統合したと書くが、Destructoid は他作に持ち込む予定なしとし、配布先として確認できるのは Breakpoint のみ

## 確認できなかったこと
- Quartz プラットフォーム自体の終了日、Digits の発行数・売上
- Champions Tactics の詳細（本エントリの範囲外。KitGuru の要約のみ）

## 総合判定
修正済み — 重大な誤りなし。取得済み資料にあった販売実績の情報を反映し、反証 1 件と矛盾 1 件を追加した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 4 / 4（プレスリリース、NME、VGC、GamesBeat を再取得）
- 直したこと:
  - summary・steps・metric: 「最初の約 2 週間で 15 件」→ Liz Edwards の 2021-12-20 の投稿までの約 11 日間に、2 つの第三者マーケットで 15 個（一次・転売の区別なし）。step の日付を 2021-12-22（NME の公開日）→ 2021-12-20（集計の日）に修正
  - 調査役メモ「最初の 2 週間で約 15 個販売」は期間が不正確だったため上記のとおり修正
  - contradictions: 参加条件（プレスリリースの XP レベル 5 vs GamesBeat の「600 時間以上遊んだプレイヤー」）を追加
- 追加した反証: 15 件（2021-12-20 時点、2 マーケット）と 96 件（Ars Technica、GamesBeat 2022-04 経由）は期間・範囲が違い、初期 11 日の数字を全期間の需要と読むのは誤り
- 確認できなかったこと: 無料 Digit の受取人数、600 時間条件の出どころ（Ars Technica 原文は未取得）
- 判定: 修正済み（期間の誤り 1 件）
