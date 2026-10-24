# 検証ログ: topology-isaac

- 確認日: 2026-10-23
- 確認した出典: 4 / 5（Topology の記事 3 本を WebFetch、topology-gg/isaac を clone）。src-isaac-community-call は再取得していない ＋ 追加 1 件（guiltygyoza/isaac を clone）

## 照合結果（一致）
- 「What happened to Isaac?」(2022-12-13): S2M2 で 50 問・48 時間以内、アルファ 2 ラウンド約 13 人（謝辞に 13 名）、ブロック 574 で Ev が Boyuk に衝突、ブロック時間 2 分〜1 時間超、"shelved"、非決定性をアルファで無効化、「効果的な反復」の式
- 「Topology presents Isaac」(2022-05-01): DEFCON '22、RK4、Fiat–Shamir、"Information asymmetry without hidden information"、client agnostic、Isaac Protocol、"fully open source at launch"
- 「What happened after Isaac?」(2022-12-14): エンジニア 3 人以下、Shoshin、MovyMovy→MuMu、`q`（"Complexity at the birth of a project..."）は逐語（この記事が出典）
- topology-gg/isaac は無関係な面接質問集で一致

## 直したこと
- open_source: unknown → full。ゲームのソースは guiltygyoza/isaac（Cairo コントラクト、ビュー、Apibara バックエンド、S2M2、Isaac 部分は Apache 2.0）に公開されている
- admin: unknown → significant。主要コントラクトは Goerli でプロキシ経由で展開され、change_implementation_hash は定数アドレス GYOZA のみ
- dates.launched: "2022" → "2022-08"（2022-08-02 クローズド・アルファ設定、08-19 オープン・アルファ展開、09-10 alpha2、いずれもコミット）。event ev-isaac-open-alpha を追加
- unknowns: 「ソースが公開されたか」を削除し、ガバナンス（CarseDAO）の運用有無・ラウンドの正確な期間に置き換え

## 追加した反証
- counter_evidence: アルファ参加者はオンチェーン・パズル（S2M2）の解答者から選ばれており、協力不成立の一般化には選抜の偏りがある

## 確認できなかったこと
- 各ラウンドの公式な開始・終了日、展開アドレスとラウンドの対応、CarseDAO が運用されたか

## 総合判定
修正済み — 「ソース未公開」は誤りで、実際は公開されており、プロキシによる運営の差し替え権限があった。運営の振り返りの引用・数値は一致。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 5 / 6（「What happened after Isaac?」は今回未再取得。リポジトリとロビー契約は clone で確認）
- 直したこと:
  - launch の step（2 回のアルファ）: 「2 回のアルファ（2022-08-02 クローズド、2022-08-19 オープン）」と決めていたのをやめた。履歴には 2022-08-25 の「contract-changes-after-alpha1」と 2022-09-10〜12 の alpha2 の準備もあり、2 回のラウンドがどの展開に当たるかは特定できない、と書き直した
  - counter（運営の総括）: 「参加者が少なかったのは獲得の失敗というより、ゲームの中核が魅力的でなかったと運営は総括」は原文にない。原文は、時間帯の違う匿名のプレイヤーが協調の問題を悪化させたこと、中止の理由はコアループが魅力に欠けたことなどを挙げるだけで、50 人から約 13 人への減少は説明していない。この内容に合わせて claim を直した
  - lessons の破綻条件を原文（協調用の UI がない、時間帯が違う）に合わせた
- 追加した反証: 「50 人」は問題数（50 問）で決まる上限で、需要の大きさではない。ロビー契約は運営（GYOZA）が個別・一括で招待を与えられるので、約 13 人が全員パズル経由だったとは限らない
- 照合済み: Community Call #11（2022-03-29、knowledge over capital）、2022-05-01 の DEFCON '22 の記事と Discord での告知、「All 50 distinct puzzles were solved less than 48 hours after the announcement tweet」、「an overly optimistic assumption」、約 13 人、ブロック 574、ロビー契約の read_s2m_solver_record と gyoza_give_invitation_to_account
- 確認できなかったこと: S2M2 の告知ツイートの日付、配った招待の数
- 判定: 修正済み（運営の発言の書きすぎを 1 件直した）
