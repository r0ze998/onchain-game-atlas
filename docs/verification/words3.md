# 検証記録: words3

- 確認日: 2026-10-23
- 確認した出典: 5／5（Notion Wiki を Notion API で取得、words3-contracts を clone、Lattice ブログ 2 本と Winding Down を取得）。追加出典 1 件（オンチェーン実測）。

## 直したこと
- dates.launched: "2023"（未確認）→ "2022-11-23"。Wiki がリンクする Optimism のコントラクト 0x1b16…f9f が初めて存在するブロック 41072050 の日付を公式 RPC の二分探索で実測。Wiki の最終編集日も 2022-11-23。event ev-words3-optimism を追加。
- summary / status: 「v2 は 2024-05 に Base と Redstone に展開」→ Base mainnet へは 2023-08-06（block 2283039）に初展開、2024-02-01（block 10010490）に再展開した現行アドレス、Redstone は 2024-05-15 のコミット。worlds.json の履歴とブロック時刻で確認。event ev-words3-base を追加、ev-words3-v2-mainnet を 2024-05-20 → 2024-05-15。
- summary: 初期 Optimism 版は現リポジトリ（2023-03-20 開始の MUD 版）より前のコントラクトで、MUD 使用の有無は未確認と明記。
- status / persistence: Base の現行 World に参照日もコードが存在、words3.xyz のクライアントは 8453 と 690 の両 World を参照（実測）。
- src-words3-lattice-winding-down の note: 「作品一覧に words3.xyz へのリンク」は Winding Down の記述ではなく lattice.xyz トップの内容 → 訂正。

## 追加した反証
- Base 版は 2023-08〜2024-02 に少なくとも 3 つの World アドレスで展開し直されており、「他人の単語の上に積み上げる」累積が再展開で途切れ得た。

## 照合して問題なかった主な点
- Wiki: 未監査・2 週間で作成、報酬 1/4 と賞金庫 3/4、「1/3 is split evenly」の不整合、手数料なし、VRGDA 目標 0.0005 ETH・1 日 20 個。

## 確認できなかったこと
- 参加者数・賞金庫総額、Optimism 版の終了日、Redstone 版の停止前後の扱い。

## 総合判定
修正済み — 公開日と展開時期の誤り（Base への展開を約 9 か月遅く記載）を実測で訂正。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 5 / 7（Small Brain Games の RetroPGF 3 申請 JSON、The Core Loop の体験記、Introducing Redstone、words3-contracts を clone、Redstone is Live。Wiki・オンチェーン RPC は前回検証で確認済みのため再取得せず）
- 直したこと:
  - summary: 「賭けの構造が参加の動機だった」→「動機の一つだったとみられる」。「8 割超が初めて OP 系チェーンへブリッジ」はユーザーインタビューに基づく運営の自己申告（規模不明）と明記
  - channels.existing-community: 「他作品 Ape's Gambit・Network States 等のプレイヤー」→ 申請はコミュニティの構成を書いていない。チームが両作を公開したことと、Gaul・Dark Seas・Underverse のプレイテストに使ったことだけを残した
  - channels.free-mint を削除: エアドロップ（後に transfer と改名）用スクリプトは 2024-05-21 にあるが、配布先の CSV も実行の記録もなく、「使ったチャネル」と確認できない（steps の記述は維持）
  - after: 「Base では少なくとも 3 回 World を展開し直し」→「少なくとも 3 つの World アドレスで」（前回の検証の記述に合わせた）
  - article.counter_evidence（調査役の置き換え）: 本文は申請書の内容どおりだが、k: claim / who: Small Brain Games → k: analysis（自己申告であることを指摘する当方の評価文のため）
- 追加した反証: 申請書自身が「プレイヤーがスクリプトを書いた」と記し、Base 版 124 人の根拠は第三者の Dune ダッシュボード（この環境で再確認不可）。124 はアドレス数で、人数としては上限
- 確認できなかったこと: ローンチスレッド本文、Dune ダッシュボード、ユーザーインタビューの件数
- 判定: 修正済み（「80% 超」は claim として扱われていることを確認。チャネル 1 件を削除）
