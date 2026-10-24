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

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 9 / 12（コミット履歴・リポジトリ・GitHub 組織ページは今回未再取得）
- 調査役メモの確認（CoinDesk の 1,000 万ドルシードと compare.money_flow）: CoinDesk（2023-06-06、Cam Thompson）を再取得した。「$10 million seed round」、Haun Ventures 主導、Robot Ventures・Anagram・Dispersion Capital・Alchemy が参加、資金の用途「scale the team and build out its studio and tooling infrastructure」、同日の World Engine の発表はすべて原文と一致する。money_flow の書き換えは妥当。ただし冒頭の「未確認。」は調達額も未確認のように読めるので、「収益の流れは未確認。」に直した（k: unknown はそのまま）
- 直したこと:
  - pre の step（2023-10-26）: 「World Engine を使って開発中のゲームは約 3 本と見られる」→「Argus のサイトの記載として "about three" と記した（外部スタジオの採用数ではない）」。Four Pillars は Argus のサイトを出典にしているため
  - compare.money_flow: 上記の言い回し
- 追加した反証: Dark Frontier の「70 万件超の取引」は期間も人数も示さない取引件数で、上位 10 人に賞金が出るプレイテストで少数が大量に送った場合も同じ数字になる。プレイヤーの規模の根拠にはならない
- 照合済み: Modular Fellows（2022-10-06、3 か月・月額 3,000 ドル、「crypto gaming skunkworks」）、private beta の q（原文どおり）、直接のサポート窓口（技術・ゲームデザイン・GTM）、Gubsheep・Alan Luo、DBA Research Day、2024-02-29 の「under 15 minutes」とビルダープログラムの予告、Dark Frontier の 2023-12 稼働、ゲームキー 12/5・X フォロワー 1,899、2 週間のプレイテストと上位 10 人で約 7,500 ドル、「first on-production game running on World Engine Devnet」、0xResearch（2023-12-20、エピソード説明のみ）
- 確認できなかったこと: プライベートベータの参加チーム、ビルダープログラムの実施、プレイテスト賞金を誰が払ったか
- 判定: 修正済み（軽微。CoinDesk の件は問題なし）
