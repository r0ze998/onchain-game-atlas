# 検証記録: etheremon

- 確認日: 2026-10-23
- 確認した出典: 4 / 6（smartcontract リポジトリ（git clone）、BlockchainGamer、eGamers、arXiv サーベイ。未確認: GitHub org ページ、etheremon.com）

## 照合結果
- コード: getRandom は block.blockhash(block.number-1)＋アドレス、withdrawEther・removeCastleFromActive は onlyModerators、isMaintaining あり。最初のコミット 2017-12-24（v.beta.0.02）、ERC-721 追加 2018-02-23。一致。
- BlockchainGamer: Nedrick Ngo、2017-12 開始、4 モード、Decentraland 提携 2018-02、DappRadar の MAU 465。一致。
- eGamers: 「6.5000 users」35,000 超の Mon、15 万対戦、EMONT 2000 万の 70%、0.03 ETH から、185 人（DappRadar 2 位）。一致。

## 直したこと
- admin detail: モデレーターが任意のモンスターを作成・上書きできる（addMonsterObj / setMonsterObj、EtheremonData）ことを追記
- status note: GitHub 表示の 2024-08 とは別に、コミット履歴の最終は 2018-03-13 と明記

## 追加した反証・矛盾
- 管理者がモンスター自体を作成・上書きできる点は、「対戦判定をオンチェーンに載せた」評価を弱める（admin に反映）。

## 確認できなかったこと
- デプロイアドレスと日付、Ethermon への移行。

## 総合判定
重大な問題なし（管理者権限の記述を補強）。
