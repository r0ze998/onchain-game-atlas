# 検証記録: etherization

- 確認日: 2026-10-23
- 確認した出典: 4 / 4（bitcointalk、about.etherization.org、Etherscan のコントラクトと作成 tx）＋新規 2（Sourcify のソース、JSON-RPC）

## デプロイ日の検証
- アーカイブ RPC（eth.drpc.org）の eth_getTransactionReceipt で、作成 tx 0x640c…bc0f が contractAddress 0xb40d…358B を作成し、ブロック 2269698 = 2016-09-16 11:33:53 UTC であることを確認。
- デプロイ者 0x060b…283F（EOA）の最初の取引がこの作成で、同アドレスからの他の作成はない（Etherscan）。
- bitcointalk の初投稿（2016-06-24）はタイトルと Reddit リンクのみ。ルールは返信 #2 の引用部分。メインネット公開を告げる投稿はない。したがって「2016-09-16 デプロイ」は確認済みだが、プレイ開始日・先行版の有無は未確認のまま。

## 直したこと
- architecture.onchain: 「ソースは未確認」→ Sourcify で本体ソースを確認。価格定数（開始 1 ETH・都市 0.8・建物 0.5・ユニット 0.2・維持 0.02）、WAIT_TIME 14400 秒、34×34 地図、出金 1% 留保、移動・攻撃は utils 2 コントラクトが本体の setter を呼ぶ構成
- admin: unknown → significant。デプロイ者が setUtils で utils を差し替えられ、utils は setTreasury・setOwner で全プレイヤーの国庫・都市所有を書き換え可能。「100% decentralized」は 2016 年コントラクトについて根拠なし
- summary / gameplay: 待ち時間は告知 30 分、コードは 4 時間と併記。隣接規則の記述を本体コードに合わせて修正
- entry_barrier: 開始費用はコード上 1 ETH（二次資料の 2 ETH と不一致）
- metrics 追加: numPlayers 29、numCities 296、totalBalances 約 1.826 ETH（eth_call）。1156 町＝34×34 と一致を注記
- status note: Etherscan の最新取引 2026-06-25、29 人・296 都市を追記
- contradictions 追加: 待ち時間（30 分 vs 4 時間）、分散性の主張 vs コード
- unknowns を更新（地図・価格は解決、utils のソースは未確認）
- src-etherization-bitcointalk note: 初投稿はリンクのみである点を明記

## 追加した反証・矛盾
- 公式の「100% decentralized」に対し、2016 年コントラクトはデプロイ者が状態を書き換えられる（counter_evidence と contradictions に追加）。
- 登録プレイヤーは累計 29 人で、大規模に遊ばれた証拠はない。

## 確認できなかったこと
- utils / utils2 のアドレスとソース（移動・攻撃の実装）、Polygon 版の権限と活動量、開発者の実名。

## 総合判定
修正済み。デプロイ日は一次データで確認できた。管理者権限が「不明」から「重大」に変わり、公式の分散性の主張と矛盾することが分かった。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 6 / 7（acquisition から参照される出典）。Pullpush の r/ethereum コメント（q は逐語一致、前に「Yep, I agree.」が付く）、bitcointalk（2 投稿、「yaya fishing for reddit hits/upboats」の批判、メインネット公開の告知なし）、Blockscout txlist（外部取引 192・失敗 2、開始関数 0x9f35d3b2 の一意送信者 30・うち 2 ETH 付き 28、月別 11/5/1/7/4/2）、Sourcify のソース（START_PRICE = 1 ETH、start() は不足額で何もせず return）を再取得・再集計。Etherscan は前回検証分に依拠。
- 調査役の「約 30 アドレス」と contradictions 2 件（取引数 145 vs 192、START_PRICE 1 ETH vs 実送金 2 ETH）は再現した。
- 直したこと:
  - steps launch「09-17 の 10:12〜10:28 に 7 アドレス」→ 再集計では 09-17 は 10:12〜10:29 に 9 アドレス（10:28 までなら 8）、09-16 にはデプロイ者以外にもう 1 アドレス。7 は誤り。
  - steps growth: 2021-08 の 2 件は 0 ETH の呼び出しで、コード上 START_PRICE 未満は何もせず戻るため開始ではない、と追記。実際の開始は 28。
  - summary・metric: 「約 30 が始めた」→ 呼び出し 30・開始条件を満たした 28、うち 14 がデプロイ者の資金に連なる、に変更。新 metric m-etherization-starters-deployer-funded（14）を追加。
- 追加した反証（重大）: 開始資金を辿ると、2016-09 の 11 の開始はすべてデプロイ者本人か、開始の数分前にデプロイ者から 2.0〜2.1 ETH を受け取ったアドレス（09-17 10:00〜10:04 に 9 件の送金）で、さらにデプロイ者が 09-18 に資金を渡した 0xf1fb… が 12 月に 2 アドレスへ資金を回した。28 のうち 14 がデプロイ者系、全体でも最初の入金元は 8 系統にまとまる。告知（2016-06 の Reddit・bitcointalk）による外部からの獲得は、多く見ても 14 アドレス・7 系統程度。新出典 src-etherization-blockscout-funding。デプロイ者が資金を渡した相手が別人か本人の別アドレスかは区別できない。
- 矛盾の追加: 開始条件を満たした一意アドレス 28 に対し numPlayers() は 29（内部取引経由の開始か集計漏れか未確認）。
- 確認できなかったこと: bspend.com/etherization の当時の内容、メインネット公開の告知の有無、デプロイ者が資金を渡した相手の正体。
- 判定: 修正済み（数え違い 1 件と、獲得規模を過大に見せる構造を反証で是正。最初の利用者の半数は開発者自身の資金によるもので、獲得の説明として重要）。
