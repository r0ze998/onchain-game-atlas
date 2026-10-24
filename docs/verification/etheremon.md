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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 7 / 11（etheremon/smartcontract を clone して最初のコミット e537095 を読み、CriptoNoticias、emchat、CoinDesk、BlockchainGamer、TechNews を WebFetch で再読。Medium は遮断で snippet のまま、eGamers・arXiv・現サイトは再読せず）
- 「同種購入時に以前の所有者へ ETH 還元」をコントラクトで確認したという調査役の記述について: 部分的にのみ確認できた。リポジトリの最初のコミット（2017-12-24、v.beta.0.02）の EtheremonWorld.sol は、gen0 の 24 クラスに「Gen0 has return price & no longer can be caught when this contract is deployed」とコメントし、価格・returnPrice（多くは元の価格の 1%）・捕獲済み総数（計 8,479 体）を定数で固定している。保有者は自分の後に捕獲された数 × returnPrice を cashOut で引き出せ、移転時も清算される（EtheremonTrade.sol）。つまり確認できるのは、払い戻しを固定した数で清算する後継コントラクトであり、12-18〜12-24 に実際に動いていた最初のコントラクトはリポジトリになく、捕獲のたびの積み上げは直接確認していない。仕組みの存在は CriptoNoticias（12-23）の開発者説明とも一致する
- 直したこと:
  - summary: 「買われるほど上がる価格が早く買う動機になった」→ 価格上昇（0.1% / 体）はリポジトリ版の gen0 以外のクラスの規則なので外し、払い戻しの根拠（報道とコントラクト）を明記
  - steps（2017-12-24）: 「各モンスターは同じクラスで後から捕獲された数 × returnPrice の残高を受け取れる」→ gen0 の固定値での清算であることを具体的に記述し q を追加。価格上昇と 1 アドレス 500 体の上限を別の step に分離
  - channels viral-mechanic: k fact → analysis、拡散を示す資料がないことを明記
  - metrics 追加: m-etheremon-gen0-caught-2017-12（8,479 体。人数ではない、nature: reported）
  - unknowns: Medium snippet の gen0 9,516 体とコントラクト定数 8,479 体の不一致、最初のコントラクトのアドレスとソースを追加
- 追加した反証: 8,479 体はモンスターの数で、1 アドレス最大 500 体、早い捕獲ほど払い戻しが大きい（クラス 1 の最初の捕獲者は約 1.12 ETH、代金の約 3.7 倍）ため、少数アドレスのまとめ買いの可能性があり、人気を人数と読めない（src-etheremon-code）
- 確認できなかったこと: ベータ期のプレイヤー数・アドレス数、CriptoNoticias の「1 種 22 体」の規則がコントラクトのどこに当たるか（e537095 の定数には見当たらない）
- 判定: 修正済み（調査役のコントラクト確認は範囲が過大だったため記述を限定）
