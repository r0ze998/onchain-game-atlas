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
