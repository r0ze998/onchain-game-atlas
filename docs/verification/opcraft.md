# 検証記録: opcraft

- 確認日: 2026-10-23
- 確認した出典: 6／6（Lattice ブログ 4 本と Winding Down を取得、latticexyz/opcraft を clone）

## 直したこと
- status.note: 閲覧専用 opcraft.mud.dev が参照日も HTTP 200 を返すことを追記（表示内容は未確認）。
- 事実の誤りは見つからなかった。

## 追加した反証
- 区画確保のステークに使うダイヤは、位置がオンチェーンで強制されない抜け穴を使った「ダイヤモンド・ドリル」で大量に掘られたと Lattice は書く。共和国の 13 万 5200 ダイヤとの関係は書かれていないが、「創発的制度」の経済基盤が意図しない自動化と結び付いていた可能性（analysis）。

## 照合して問題なかった主な点
- 10/29 の SupremeLeaderOP の宣言（終了 2 日前）、135,200 ダイヤ、ComradeComponent・GovernmentSystem、ハロウィン 0 時 UTC 終了、10/31 凍結、16x16x16 チャンク、Dark Forest への敬意の惑星（6360 ブロック）、プラグイン審査制の注記。
- P2P による位置配信（mud-zero-to-v2 の "offchain peer-to-peer broadcasting mechanism for player positions"、クライアントの Relay 系コード）。約 2000 人・約 1000 万ブロック、試作 2 日。
- deploy.json の ComponentDevSystem / BulkSetStateSystem（writeAccess "*"）、最終コミット 2022-12-16「upgrade mud to 1.31.2」。

## 確認できなかったこと
- 公開テストの正確な開始日、0xPARC の関与、公開時の ComponentDevSystem の有無。

## 総合判定
重大な問題なし — 主張は出典と一致。反証 1 件と現状確認を追加。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 10 / 11（Optimism の OPCraft 発表、OP in Bogotá、Devcon 6 講演概要、Making of OPCraft Part 3、MUD from zero to v2、Bankless、RetroPGF 3 申請 JSON、Winding Down、Race to Mainnet、opcraft リポジトリを clone。Making of OPCraft Part 1 は今回再取得せず）
- 直したこと:
  - summary・steps・channels.viral-mechanic: 「蛇口がツイートを受け取り条件にしていた」→ 公開クライアントの蛇口画面はツイート＋Verify の作りだが、同じクライアントは残高 0.005 ETH 以下で dripDev（ツイート不要の自動配布）も呼ぶ。dripDev はサーバが dev モードのときだけ動く（MUD v1 の faucet サービスのコードで確認）。本番の設定は不明と明記。新出典 src-opcraft-mud-v1-faucet
  - steps（growth）: 「プレイヤー間の騒動が SNS 上の話題になった」→ 2022-10-29 に SupremeLeaderOP が Discord と X で世界政府を宣言し、APRO を作った（話題の規模を示す数字はない）。日付を 2022-10 → 2022-10-29
  - lessons: 「X アカウント 1 つにつき 1 回」→ アカウントとアドレスを紐付け、配布の間隔と期間あたりの総量を制限（コードは 1 回限りではなく定期的な配布）
- 追加した反証: ツイート蛇口は OPCraft 独自ではなく MUD v1 共通の蛇口サービスの機能（TwitterMode/DevMode）で、本番が dev モードならツイートは参加の条件ではなく、「ツイートで告知が広がった」という説明自体が成り立たない可能性
- 確認できなかったこと: 本番の蛇口サーバの起動フラグ、ツイート数、WIRED 記事
- 判定: 修正済み（調査役の「ツイートを要求」はクライアントの UI としては正しいが、必須条件だったとは言えない）
