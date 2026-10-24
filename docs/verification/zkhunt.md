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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 6 / 6（0xparc-blog、aw-residency、ezkl-hackmd、ethresearch、ethglobal を取り直し。repo・readme-2023-05 は既存の clone 記録を引用照合のみ）
- 調査役の unreachable→fetched 変更の妥当性: 妥当。0xparc.org/blog/zk-hunt の HTML は /index.d05e47c4.js だけを読み込み、そのバンドル内の `from("LS0t…","base64")` に記事 Markdown が埋め込まれている。検証役が独自に curl で取得・復号し、タイトル「ZK Hunt: an exploration into the unknown」、front matter（date: October 10, 2023 / hidden: true）、引用 2 件（"The game was built during the 0xPARC 2022 Autonomous Worlds Residency"、"I realised the project better served…educational resource."）の逐語一致、デモ再生リストと作者のデモ録画へのリンク、デポジット未実装の明記、0xPARC と Lattice への謝辞を確認。aw-residency（2022-08-11）の £600 / 月 £1,500、裁量助成、成果物、確定参加者も同じ方法で一致
- 直したこと:
  - channels existing-community:「0xPARC と Lattice が主催」「Lattice の Justin」→ 主催は 0xPARC（募集記事の表記）、Lattice は作者の謝辞での表記と明記。記事は Justin の所属を書いていないので「Lattice の」を削除。レビュー協力者を記事の謝辞どおり 5 人に
- 追加した反証: 記事は hidden: true で、現行サイトのコードは /blog 一覧と「NEW!」欄から hidden の記事を除外する（バンドル内の `Nb.filter(e=>!e.attributes.hidden)` で確認）。直接リンク以外では読者に届きにくく、「0xPARC ブログの読者経路」の効果は言い切れない（2023 年当時の表示は未確認）
- 確認できなかったこと: デモ録画の公開日・再生数（YouTube 未取得）、0xPARC の支援額
- 判定: 修正済み（軽微）。fetched への変更は正当で、引用・日付・金額に捏造なし
