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
