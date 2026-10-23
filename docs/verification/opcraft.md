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
