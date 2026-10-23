# 検証記録: mud

- 確認日: 2026-10-23
- 確認した出典: 11／11（Lattice ブログ 4 本・Winding Down を取得、latticexyz/mud を clone して docs・CHANGELOG・監査ページ・全ブランチ履歴を確認、npm registry の time / dist-tags を取得）

## 直したこと
- status.note: 「公開リポジトリの最終コミット 2025-09-30」→ main は 2025-09-30 だが、非 main ブランチでは 2026-04-10 まで DUST 向けの entrykit・store-sync・cli（mirror 移行ツール）の更新が続き、npm にもブランチ名タグの 2.2.24 系スナップショットが 2026-04-10 まで公開された旨を追記。コア world/store は 2025-10 以降変更なし。
- offchain（ERC-4337 バンドラ等の標準化表明）: 出典 winding-down には該当記述がない → src-mud-standardizing を追加（同記事に ERC-4337 と標準化方針の記述あり）。
- src-mud-repo / src-mud-npm の note を更新。

## 追加した反証・矛盾
- contradictions: Winding Down の「DUST 開発中に MUD を変更する必要がなかった」と、2026-01〜04 の周辺パッケージ改修の併存（コアは無変更）。
- counter_evidence: 「機能完成」は周辺ツール込みの保守不要を意味しない。

## 照合して問題なかった主な点
- npm: solecs/recs 作成 2022-09-13、1.0.0 は 2022-09-27、world 作成 2023-03-03、2.0.0 は 2024-03-21。CHANGELOG の 2.0.0 = Thu Mar 21 2024、2.2.23 = Mon Aug 25 2025。
- 監査 2024-02-11 OpenZeppelin。address(0) への所有権移転で凍結（プロキシ除く）の逐語確認。
- registerSystem 脆弱性: 2023-09-12 発見、2.0.0-next.8 で修正、既知チームへ非公開連絡。
- v1 の Go 製インデクサ・ストリーミングサービス（engine ブログ）。

## 確認できなかったこと
- MUD World の総数、所有権を放棄した本番 World の例、解散後の保守体制。

## 総合判定
修正済み — 日付・数値は正確。リポジトリ活動の記述と出典の付け違い 1 件を修正。
