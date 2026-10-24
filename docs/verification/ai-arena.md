# 検証ログ: ai-arena

- 確認日: 2026-10-23
- 確認した出典: 14 / 16（src-aiarena-notion-nrn-rewards と src-aiarena-notion-merging は Notion API が 400 を返し再取得できず）。監査リポジトリを clone、Notion の Introduction・Training・Ranking・Project Overview・Project Primer は公開 API で本文と最終編集日を確認。

## 直したこと
- team: 「COO Wei Xie」→「共同創業者 Wei Xie」。出典（Decrypt）は co-founder とだけ記し、COO の肩書きは確認できない。extensions の who も同様に修正。
- summary: 「人間とエージェントの分業を実装した数少ない商用例」（根拠なし）→ トークン経済付き商用ゲームとしての例と弱め、NERO（2005）の先例を明記。
- compare.necessity / onchain_tradeoffs / counter_evidence: 「無料のオフチェーン版を計画」→ 出典は「誰でも遊べる無料版がある」とだけ書く。「オフチェーン」「計画」を削り「NFT 不要の無料版を提供」に。
- trajectory: GamesBeat を改名・ロボティクスの出典にしていた → GamesBeat は 2024-04 の ARC SDK / SAI 発表の出典として使い分け。
- events: 「累計 1100 万ドル」→ 記事に合計の記載はなく、2 ラウンドの和であると明記。
- status.note: aiarena.io が HTTP 200（ウォレット接続付き SPA の外枠）を返すことを追記。稼働は未確認のまま。
- sources: Introduction（2022-09）・Training（2022-08）に published を追加。rewards / merging の note に「検証役は再取得できず」を追記。

## 追加した反証・矛盾
- NERO（UT Austin、2005-06 公開、AIIDE 2006 デモ論文）: プレイヤーが訓練役となりエージェント部隊を学習させて他プレイヤーと戦わせる → 公式の「in-the-loop の初のゲーム」主張への反例。
- ARC SDK の外販は 2024-04（トークン配布前）に発表済み → 「ゲーム不振ゆえの転換」と読む解釈への反証。
- loop の根拠の Notion 文書は 2022 年の最終編集で、2024 年の Arbitrum 版仕様と一致するかは不明（文書自身が「ローンチ前に確定」と書く）。

## 確認できたこと（主なもの）
- 監査 README: 賞金プール 60,500 USDC、2024-02-09〜02-21、「core game logic runs off-chain… game server as the oracle」、Elo の計算をオフチェーンで調整できる旨、平方根ステーク、ボルテージ 100・1 試合 10。Neuron.sol の MAX_SUPPLY 10 億、財務 2 億・貢献者 5 億。updateBattleRecord。
- 監査報告: High 8・Medium 9、2024-05-14。H-01（ロック中ファイターの転送）、H-05（リスク下ステーク 0 で報酬は同等）。
- BetaKit 2024-01-12（600 万ドル、Framework 主導、Paradigm 主導 500 万ドルのシード、2021 創業、「Ethereum-native」）。Decrypt 2024-03-19（約 8000 人、8 チーム）、2024-06-21（6-24 07:00 UTC 請求、8000 万 NRN、Arbitrum）。
- q 2 件（human in-the-loop、bot farms）は逐語一致。

## 確認できなかったこと
- Merging Pool の VRF / オフチェーン選定計画、NRN Rewards の式（Notion 再取得不可。式の要素は監査 README で部分的に確認）。
- 展開済みコントラクトのアドレス、トークン配布後の活動量、現在の稼働状況。

## 総合判定
修正済み。数値・日付は出典と一致したが、肩書き（COO）、「オフチェーン版を計画」、「数少ない商用例」など出典を超えた記述と、2022 年の文書を 2024 年の仕様として扱う時期のずれがあり、修正・注記した。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 4 / 7（Decrypt 2 本・CoinDesk 転載・BetaKit を再取得。Gateway to the Arena 公式ページは再度 HTTP 404 で、検索要約を 3 回取り直した。Notion と ArenaX のサイトは今回未再取得）
- 直したこと:
  - pre の step: 「Discord での事前登録・2024-01 中旬のスナップショット時点の NFT 保有がアクセス倍率に効く」→「専用の紹介リンクの利用または NFT 保有でアクセス倍率、総得点は個人得点×倍率」（Discord 事前登録とスナップショット日は再検索の要約に出てこず、要約だけを根拠にした記述を削った）
  - channels: community-server（Discord 事前登録）を削除。根拠は検索要約だけで再現できず、Discord があること自体は獲得チャネルにならないため
  - channels.referral の文言を要約の表現（unique referral code links）に合わせた。existing-community から「2024-01 中旬のスナップショット」を削除
  - metrics m-aiarena-seed: period「2024-01 以前（時期未確認）」→「2021-10（2021-10-27 発表）」、出典に CoinDesk を追加
  - src-aiarena-gtarena-snippet の note を、再検索で確認できた範囲に合わせて直した。unknowns に Discord 事前登録・スナップショット日が未確認であることを追加
- 追加した反証: 「70 万回超の試合」は AI ファイター同士をサーバーで自動対戦させた回数（Cycle 3 は約 1 秒に 1 試合）で、人間の活動量や参加者数の裏付けにはならない（Decrypt）
- 照合済み: 8,000 人はチーム定員（8 チーム × 1,000 人）と一致するという既存の反証は、Decrypt の「each of whom managed a team of 1,000 players」で裏付けられる。エアドロップ 8000 万 NRN（半分がプレイ施策）、請求開始 2024-06-24、CEX 上場は請求開始の 1 時間後、隊長向けの成績連動の報酬プール、ボット対策の倍率についての COO の発言も原文と一致
- 確認できなかったこと: Gateway の公式ルールの一次資料、Discord 事前登録が条件だったか、隊長への報酬額、配布後の継続
- 判定: 修正済み（要約だけを根拠にしたチャネル 1 件を削除、資金調達の時期を訂正）
