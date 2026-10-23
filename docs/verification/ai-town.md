# 検証ログ: ai-town

- 確認日: 2026-10-23
- 確認した出典: 1 / 1（git clone で README・ARCHITECTURE.md・LICENSE・convex/crons.ts・constants.ts を照合）。追加 1 件（CryptoSlate 2023-08-16）

## 直したこと
- dates.launched の根拠「README の画面写真の日付から推定」→ リポジトリでの開発開始 2023-07-15 と、2023-08-16 の報道で公開済みを根拠に変更（月精度 2023-08 は維持）
- offchain の LLM: 公開当初の構成（Convex・Pinecone・Clerk・OpenAI・Fly）と現行の既定（Ollama llama3）が違うことを追記
- status.note: 2025-03 以降のコミットは月 0〜4 件の保守的更新であることを追記（active の強さを限定）

## 追加した反証・矛盾
- counter_evidence（analysis）: 「DB で共有状態・決定的ステップを実現」でも、参加者は状態の正しさを検証できず、デプロイ者が任意に停止・変更できる（5 分放置で停止する cron をコードで確認）
- counter_evidence（unknown）: 人間とエージェントが混在する町で長期的な遊びが生まれた資料は見つからなかった

## 確認できたこと
- MIT（Copyright 2023 a16z-infra）、Generative Agents に着想と README に明記、60 ティック/秒を 1 秒ごとのステップにまとめる、人間とエージェントが同じ入力経路、IDLE_WORLD_TIMEOUT＝5 分、Pinokio・Docker/self-hosted Convex、最新コミット 2026-08-25

## 確認できなかったこと
- 正確な公開日、フォーク数（GitHub API はこのセッションで不可）、デモの稼働状況

## 総合判定
重大な問題なし — 日付の根拠を強化し、反証 2 件を追加。
