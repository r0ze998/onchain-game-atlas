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
