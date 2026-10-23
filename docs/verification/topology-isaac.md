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
