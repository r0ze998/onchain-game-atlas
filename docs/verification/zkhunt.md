# 検証ログ: zkhunt

- 確認日: 2026-10-23
- 確認した出典: 5 / 6（zk-hunt を clone、ethresear.ch・ETHGlobal を WebFetch）。src-zkhunt-0xparc-blog は JS 描画で本文なし（バンドル内にも本文なし）、unreachable のまま ＋ 追加 1 件（2023-05-18 版 README）

## 照合結果（一致）
- 40 コミット、2022-09-22〜2023-10-10、初期実装 2022-09-28、遅延応答 2022-12-30、永続追跡とナリファイア・キュー 2023-05-14、MUD 0.16.4、MIT（個別ファイルは Unlicense）、RESPONSE_PERIOD = 5 秒、System 一覧（ComponentDevSystem を含む）
- ethresear.ch（2024-01-23、Mirror）: 平原は公開、ジャングル内は秘匿、潜在位置集合、Poseidon コミットメント
- ETHGlobal: ETHOnline 2024、「old version (1.2) of mud.dev」をフォーク、新しい移動規則の回路

## 直したこと
- team / 出典の author: 「Flynn Swainston-Calcutt」→ GitHub の表示名「Flynn Calcutt」。「Swainston」を裏付ける資料は見つからなかった
- money_flow: 「トークン・資産・賞金は確認できない」→ コントラクトにデポジット等はないが、2023-05 版 README の解説はデポジットと没収（slash）を前提に説明していたと追記。清算は全ユニットの死亡として実装
- src-zkhunt-liquidation の note に LiquidationLib の挙動（操作者の全ユニットを殺す）を追記
- unknowns: 0xPARC ブログの代替として、2023-10-10 に削除された README の長文解説を参照したと追記

## 追加した反証・矛盾
- contradictions: README 解説の「デポジットによる金銭的保証」と、デポジットのない実装
- counter_evidence: RESPONSE_PERIOD 5 秒はローカル anvil 用の値で、公開ネットワーク向けではない可能性。principles の破綻条件の根拠としては弱い

## 確認できなかったこと
- 0xPARC ブログの本文と公開日、公開ネットワークでの展開・プレイテスト、0xPARC の助成

## 総合判定
修正済み — 開発者名の誤り（裏付けのない姓）と、解説と実装の差（デポジット）を直した。
