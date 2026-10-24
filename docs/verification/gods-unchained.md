# 検証記録: gods-unchained

- 確認日: 2026-10-23
- 確認した出典: 4 / 5（MIT TR、公式 zkEVM FAQ、Wikipedia、Decrypt。samoaobserver は 404 のまま snippet）

## 直したこと
- compare.persistence: Wikipedia の「カードは更新できないがオフラインでも使える」は Wikipedia 本文で確認できず削除。根拠を MIT TR（対戦はオフチェーン）に変更
- dates.launched / contradictions: MIT TR（2019-07-11）の「今週、非公開テストを経てベータ版が一般公開された」を追加
- source notes: FAQ の日付は「Latest as of April 11, 2025」の改訂表記である点、Wikipedia の内容（「2022-07 の人員削減」は未確認のため note から外した）

## 確認した主張
- オンチェーンはカードと所有者のみ、予約販売 400 万ドル、Ferguson の引用、手数料 9%、プレーンカードは対象外、Forge 停止、IMX ガス、NFT 売上約 3.5 億ドル（CryptoSlam）、ESRB AO（2023-12）、シード 240 万ドル

## 追加した反証・矛盾
- 公開時期の矛盾に MIT TR を追加（2018 は予約販売、2019-07 はベータ一般公開）。

## 確認できなかったこと
- zkEVM 移行の完了、Genesis 販売額（snippet）。

## 総合判定
修正済み。出典にない Wikipedia 引用を 1 件削除した。重大な問題なし。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 4 / 5（CryptoSlate 2018、BlockchainGamer.biz 2 本、MIT TR を再取得。samoaobserver の Business Wire は snippet のまま）。追加 2 件（BlockchainGamer.biz 2018-08-21、Unchained ポッドキャストの書き起こし 2019-10-25）を取得
- 直したこと:
  - metrics m-gu-genesis-sale（調査役が「要確認」とした点）: value 6,200,000 USD は snippet のみの値だった → value 33,333 ETH（記事執筆時点で 600 万ドル超、BlockchainGamer.biz で確認）に変更、期間を 2018-07〜2019-10 の累計とし、620 万ドルは根拠にしないと定義に明記
  - channels viral-mechanic（Mythic の抽選・競売）: 削除。仕組みそのものによる拡散ではなく、記事にも「話題になった」根拠がない
  - channels に press を追加（Blitzchung の賞金補填の申し出、claim）
  - steps に 2018-08（最初の販売約 4,402 ETH・50 万枚超、大会パス 2 万枚をパックに同梱）と 2019-10（Blitzchung 対応で登録が約 3 万→6 万、CEO の claim）を追加。metrics 2 件追加
  - summary に 2019-10 の登録倍増を追記
  - contradictions: 世界大会賞金の目標額（160 万→130 万ドル、2019-10 時点で 50 万ドル）を追加
- 追加した反証: Genesis 完売と DappRadar 日次ウォレットのピーク（2019-10 中旬〜下旬）は、Blitzchung 騒動で登録が倍増した時期と重なり、予約販売の仕掛けではなく外部の話題が 2019-10 の山を作った可能性
- 確認できなかったこと: 予約販売の購入者数、非公開テストの参加者数、世界大会で実際に支払われた賞金、「登録」の定義
- 判定: 修正済み（snippet を根拠にした数値 1 件、チャネル分類の誤り 1 件）
