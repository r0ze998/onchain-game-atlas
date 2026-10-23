# 検証ログ: influence

- 確認日: 2026-10-23
- 確認した出典: 9 / 9（snippet だった Tokenomics Overview を本文取得して fetched に変更、SDK は clone、他は WebFetch）。追加 1 件（Substack archive）

## 直したこと
- status.note「2025-12 更新のページが Sepolia の pre-release に言及」→ それは 2024-02-23 公開・2025-12-02 更新の games.gg 記事で、mainnet 前のテストを指す（新たなテストの証拠ではない）と訂正
- status.note「SDK は 2026-10-22 に更新」→ 最新コミットは 2026-10-20（組織ページの表示は 10-22）。game.influenceth.io が応答すること、公式 Substack の最新投稿が 2024-09-12 の物語記事であることを追記
- architecture: SWAY の L1 発行を offchain から onchain 詳細へ移動（L1 Ethereum 上の処理でありオフチェーンではない）。admin の SWAY 管理者役割を本文で確認し、運営の計画（実行は未確認）として記述
- src-influence-tokenomics: access snippet → fetched、published 2023-03-16、文書版 v3.0（2024-06-22）
- src-influence-bankless: 著者がコミュニティ・スチュワードのゲスト寄稿で独立報道でないことを note に付記

## 追加した反証・矛盾
- counter_evidence: active の根拠は導線と SDK コミットのみで、利用規模や 2024-09 以降の運営報告がない
- counter_evidence: 「unstoppable」の主張に対し、SWAY は管理者役割付きで展開、ゲームコントラクトのソースと Dispatcher 権限は未確認
- contradictions: 製品数（Starknet 公式 nearly 200 / Bankless over 240 / 公式サイト 250）

## 確認できたこと
- 2024-06-27 ローンチ、22 原料・11 種の小惑星・5 職種、q 引用は逐語一致、2021 年に Starknet へコミット、StarkWare の株式出資（額非公表）と 2023 夏予定、Dojo 記事が Influence を Dojo 製と列挙、Starter Pack 30 ドルから、投資家割当ゼロ、SDK のアドレス・Dispatcher・ReadComponent、Dojo への言及なし、組織 19 リポジトリ

## 確認できなかったこと
- プレイヤー数、Dispatcher のアップグレード権限、SWAY 管理者役割の取り消しの実行

## 総合判定
修正済み — status の根拠に誤読 1 件（Sepolia）と日付のずれ 1 件があり修正。主要事実は出典と一致。
