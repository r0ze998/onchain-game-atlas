# 検証ログ: argus-world-engine

- 確認日: 2026-10-23
- 確認した出典: 5 / 6（repo・commits・loop.mdx は clone で、Four Pillars・argus.gg は WebFetch。web3.career 求人は snippet のまま）。追加 1 件（snapshots.mdx）

## 直したこと
- architecture.onchain.level: partial-rules → unknown。v2（参照日）の go.mod に Celestia・Rollkit・go-ethereum 等の依存がなく、状態はメモリ上で S3／NATS JetStream へのスナップショットのみ。v1 の検証範囲も不明
- summary・status.note: v2 のコードにチェーン依存がないこと、文書だけが「verifiable on the blockchain」と述べること、2026-09〜10 は月約 50 コミットで開発は活発なこと、アーキテクチャ文書が作成中であることを追記
- offchain: v2 のスナップショット方式（非同期・ベストエフォート、クラッシュで直近分が失われ得る）を追加
- money_flow: 公式サイトの投資家ロゴ（Haun 等）を追記。額は引き続き未確認
- relations(dark-forest) note: Four Pillars（二次・取得済み）の「Scott co-created Dark Forest」と、公式サイトの投資家 Alan Luo（DF 共同制作者）を追記。一次資料はないので analytic のまま

## 追加した反証・矛盾
- contradictions: 公式サイトは「EVM-compatible」と説明するが、EVM 依存は 2024-12-10 に削除済み
- contradictions: docs/introduction の「verifiable on the blockchain」と v2 コードの永続化方式の不一致
- counter_evidence（analysis）: 参照日の World Engine は実装上ティック駆動の ECS ゲームサーバーに近く、オンチェーン基盤の代表例とするには v2 の検証機構の確認が必要

## 確認できたこと
- LGPL-3.0、README「rewriting the World Engine from the ground up」、plugin（data/lobby/physics2d）、community plugins の文言、EVM 依存削除（2024-12-10）、v2 準備（2025-10-21）、2022-12 の EVM フック・Nakama、2023-03〜04 の Cardinal/ECS、Four Pillars の Polaris・Rollkit・Celestia・最大 20 ティック/秒・非同期シャード

## 確認できなかったこと
- 誰が何を検証するか、Dark Frontier の稼働期間と規模、資金調達額、70 万件のトランザクション主張

## 総合判定
修正済み — 「オンチェーン」の水準が v1 の資料に依存し、現行コードと食い違っていたため unknown に変更し矛盾を明記。
