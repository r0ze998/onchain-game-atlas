# 検証記録: loot

- 確認日: 2026-10-23
- 確認した出典: 13 / 18（未確認: sourcify（Loot）、AGLD sourcify は eth_call で間接確認のみ、agld-source のソース本文は未読。cryptonews・tokeninsight は 403 で snippet のまま。etherscan-token は WebFetch で確認）

## 再現した on-chain 値
- eth_call（publicnode）: Loot totalSupply 7779、owner 0xbf7e…995e、AGLD totalSupply 92,840,001、AGLD owner 0xed4f…7ef9、season 0、Realms (for Adventurers)（0x7AFe…e18d）totalSupply 8000、name 確認。全値一致。Etherscan 保有者 2326・24h 移転 0 も一致。

## 直したこと
- status note: 「取引高は 2021-09 から 95% 減少していた（2022-08 時点）」→ 95% 減は 2021-09→2021-10 の月次比較と明記
- admin detail: 「鍵の焼却が投票にかけられたと報じられた」→ 取得できた The Defiant の本文に投票の記載はなく、検索要約のみと明記
- extensions: 「Loot MMO や Loot 2 を未リリース・構想段階と記した」→ Decrypt は Eternum を「テスト段階に近い」、Loot 2 を提案、Loot MMO の状況は明記なし
- counter_evidence: 「主要なゲーム（Eternum、Loot MMO）は開発・テスト段階」→ 上記に合わせて修正
- m-loot-volume-2021-09 definition: CryptoSlam の集計を Decrypt が引用、ウォッシュトレード除外は不明と追記
- ev-loot-royalty-grant: NonFungible は年を明記していない旨を detail に追記
- src-loot-survivor-repo: 最終コミット「2025-05-06」→ 再確認で main・全ブランチとも 2024-08-08。published と trajectory の「2025-05 にも更新」を修正。Pragma VRF は README ではなくコードで確認と注記
- src-loot-rpc-state note: 再現の記録を追記

## 確認した主張（変更なし）
- 派生数: NonFungible「Just one month later, more than 100 derivative projects and tools」、lootproject.com/resources の掲載 95 件（全件を数えた）、「community submitted / not audited」
- 95% 減の出典: Decrypt 2022-08-26 が CryptoSlam を引用（221M→12M 未満）。累計 2.8 億ドル、平均売価ピーク 21 ETH 超、フロア 0.93 ETH
- q 引用（サイト説明文、CoinDesk のツイート、Platformer、Decrypt、Kohli、Defiant、Loot Survivor README）は逐語を確認

## 追加した反証・矛盾
- The Block（2021-09-10、CryptoSlam）: Loot・Punks・BAYC・Art Blocks の週次取引高が 44〜82% 減。95% 減は市場全体の冷え込みでも説明でき、設計の帰結と断定できない。

## 確認できなかったこと
- AGLD 統治投票の票数（snippet のみ）、鍵焼却の投票の有無。
- CryptoSlam の月次値そのもの（dune/dappradar は遮断）。
- validate の警告（loot-survivor への similar-to が basis: confirmed）は初版から存在。関係型の選択は調査役に委ねる。

## 総合判定
修正済み。数値は再現できたが、Loot Survivor の更新日と Decrypt の Loot MMO 記述の読み違い、95% 減の期間表現を直した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 12 / 13（CoinDesk 2021-09、Platformer 2021-09・2022-08、lootproject.com トップ・FAQ・resources、Realms の Sourcify ソース、Realms 展開 tx、AGLD の Sourcify ソース、NonFungible 2022-01、Decrypt 2022-08、The Block 2021-09、Provable Games の Eligible Collections を再取得。Etherscan トークンページは既存検証で確認済みのため再取得せず）。加えて Realms コントラクトの現在値を publicnode の eth_call で取得（lootersPrice 0x4a96974e、publicPrice 0xa945bf80、privateSale 0xba1f879f、saleIsActive 0xeb8d2444、totalSupply 0x18160ddd）。
- 直したこと:
  - Realms 先行販売の step: 「保有者 0.03 ETH / 一般 0.15 ETH だった」→ 両方ともコントラクトの初期値であり、所有者が変更可能。現在値は publicPrice 0.1 ETH・lootersPrice 0.03 ETH・privateSale false で、一般価格の変更時期と実売価格は未確認、と明記（src-loot-rpc-state を追加、Sourcify 出典の note に現在値を追記）。調査役の「0.03 / 0.15 を確認」はソースの初期値としては正しいが、実際の販売価格の証拠ではない。
  - 2021-09-02 の step: 「二次流通 4600 万ドル」「Platformer・Vice などの一般テック媒体が続いた」→ CoinDesk は sales とだけ書くので「売上」に。Platformer 記事中の Vice は SpyFone の別記事の引用で Loot の報道ではないため Vice を削除。m-loot-sales-5d の definition も同様に修正。
  - Synthetic Loot: 「アドレスごとの無料・譲渡不可の仮想袋」→「Ethereum アドレスに紐づく無料の複製袋」（サイトは tied to your Ethereum address と書き、譲渡不可とは明記しない）。
  - channels crypto-social: 「拡散も X 上で起きた」→ 告知が X の 1 投稿で事前宣伝なし、専用 X アカウントができた事実のみに。拡散経路の内訳は資料なし。
  - counter（多重請求）: 2022-01 の 2541 ウォレット・平均 3 袋は 5 か月の転売後の分布で初日の請求分布ではない旨を明記し、「数千人」はアドレス数に近い推定、という断定を「人数・アドレス数のどちらとも確認できない」に弱めた。
- 追加した反証: The Block（2021-09-10）: 他の上位集合が 8 月末にピークを付けた中で Loot は 9 月初めに急増した例外（q: "bar Loot, which took off at the start of this month"）。既存の「NFT 高騰期に引かれた」という反証に対する留保として analysis で追加。
- 確認した（変更なし）: 「no fee, just gas」「a couple thousand people」「Within hours there was a dedicated Discord channel...」は逐語。Platformer は Hofmann が Discord のモデレーターだと書いており step の記述は正しい。4 時間以内の全袋請求（FAQ）、Realms の展開 2021-08-31 17:29:17 UTC・ブロック 13134698、AGLD 10,000/袋と Will Papper の作者表記、2541 ウォレット、Decrypt の 221M→12M 未満と Eternum が「broader testing phase」前・Loot 2 が提案段階、約 200 人の開発者（Hofmann の推計）、LS の 55 集合（Loot 5 ゲーム、スナップショット 2025-08-18）。CoinDesk 記者の初日ミント・転売の注記も確認。
- 確認できなかったこと: Realms の先行販売で何区画が保有者価格で売れたか（eth_getLogs はアーカイブ要求として publicnode に拒否された）。publicPrice を 0.1 ETH に下げた時期。Loot の初日の請求アドレス数。
- 判定: 修正済み（数値の誤りはないが、初期値を販売価格として断定・出典にない媒体名・定義の混同を修正）。
