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

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 3 / 4（リポジトリは clone と WebFetch、CryptoSlate、Convex の v2 記事。src-ga-arxiv は今回未再取得）
- 直したこと:
  - pre の step: 「リポジトリでの開発がこの日のコミットから始まった」→「AI Town 固有の開発は 2023-07-15 の Yoko Li のコミットから」。履歴には 2018〜2020 年の別テンプレートのコミット（最初は 2018-06-04）が含まれるため
  - channels.community-server: Discord のチャンネルは受け皿として確認できるだけで、ここから人が集まった資料はない、と明記した
- 追加した反証: a16z-infra は 2023-06 から JS/TS の AI スターターキット（ai-getting-started 4,137 スター、companion-app 5,980 スター。どちらも最初のコミットは 2023-06-16）を出しており、AI Town の初期のスターは同じ組織が既に持っていた開発者の注目に乗った可能性がある（新しい出典 src-aitown-a16zinfra-org を追加）
- 照合済み: 「over 5k stars」「mere weeks ago」「we were surprised at how much attention the project gained」（q は原文どおり）、クローン 3 件、v2 で人間が歩ける、地図エディタ、AI Stack Devs、スター 10.7k・フォーク 1.2k、README の「deployable starter kit」と JS/TS を選んだ理由、CryptoSlate 2023-08-16 の見出しと Convex との協業。MIT は CryptoSlate には書かれておらず、リポジトリで確認（step は両方の出典を挙げているので問題なし）
- 確認できなかったこと: デモの利用者数、v2 記事の日付
- 判定: 修正済み（軽微）
