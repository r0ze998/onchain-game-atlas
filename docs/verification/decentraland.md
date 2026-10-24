# 検証記録: decentraland

- 確認日: 2026-10-23
- 確認した出典: 4 / 6（CoinDesk、CryptoSlate、Naavik、Wikipedia。未確認: whitepaper PDF、decentraland.org）

## 直したこと
- retention_evidence（運営発表）: 財団の「アクティブ」定義「ログインして区画の外へ移動した人」（CoinDesk）を追記
- m-dcl-mau-2022-09 definition: 同定義を追記
- counter_evidence: 8000 人・56,697 MAU は運営自身の定義による数で、ゲスト・ボット・重複の扱いは非公表と明記
- counter_evidence（Naavik）: 「88 万ドル」→ 2021-12 ピーク 2200 万ドルから 2022-08 の約 87.9 万ドル
- dates.launched note: Wikipedia 情報ボックスの 2020-02-20 を追記
- src-dcl-coindesk-2022 note: DappRadar の定義、更新日（記事内 10-10、バイライン 10-13）
- src-dcl-wikipedia note: 「2022 年の利用者論争」は Wikipedia 本文で確認できず削除

## 利用者数の定義（照合結果）
- DappRadar 38 / 675: 「スマートコントラクトと取引した一意アドレス」（24 時間）
- Dapp.com 312（10-05）: コントラクトと取引したウォレット、7 月以降の中央値約 600
- 運営 8000（1 日平均）、ダッシュボード 6,999（10/3〜9 の一意訪問者）、56,697 MAU（ログイン＋区画外へ移動）、1,074（コントラクトと取引した利用者）
- Naavik: DCL Metrics の DAU 12,304→7,800、共同創業者の 2021-12 発言（DAU 18,000 / MAU 30 万）

## 追加した反証・矛盾
- 運営側の定義自体が「区画外への移動」で、チェーン操作もウォレットも要らない。オンチェーン指標とは測る対象が別、という点を反証に明記。

## 確認できなかったこと
- ホワイトペーパー本文の再読、Polygon の利用、DAO 権限の一次資料。

## 総合判定
修正済み。数値は出典どおり。運営側 MAU の定義が欠けていたので補った。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 4 / 4（acquisition で新規の Decrypt 2020-02-20、NonFungible 沿革・2 回目オークション、CriptoNoticias 2018 をすべて WebFetch で再取得）。追加 2 件（CriptoNoticias 2020-02-21、Ryan Schultz 2020-02-24）も取得
- 直したこと:
  - steps 2017-12-15: NonFungible 由来の「1 時間足らず」「残りは道路・共有地」に出典 src-dcl-nonfungible-history が付いていなかった → 出典追加、「引き渡しは数か月後と約束」「運営チームの共有インフラ（道路・Genesis Plaza）」と原文どおりに修正
  - steps 2019: 「招待を順に送り」→「7 月を通じて多くの招待を送り」（原文 "Throughout the month of July, many invitations were sent"）
  - steps 2021-12: 「これが公開後の最大規模の運営発表として残っている数字である」→ 削除（出典なし）
  - channels token-incentive: 「賞品の中心は MANA」→「賞品には 125 万 MANA と他のトークンが含まれ」（中心かどうかは記事にない）
  - cost: 「賞品は Decentraland 自身が出した」(fact) → 「Decentraland による配布と報じられた。原資の内訳は記事にない」
  - after: 「どの定義でも縮小している」(fact) → 定義が揃わない旨を加え analysis に格下げ
  - steps に launch 2 件追加: DappRadar の日次一意ウォレット 675（7 日で 800% 増、理由は一般公開と宝探し、fact）、運営提供の新規利用者 1 万人超（「複数の場所を訪れた人」、claim）。metrics m-dcl-dappradar-launch-2020 / m-dcl-new-users-launch-2020 を追加
  - contradictions: ICO 額（Wikipedia・NonFungible 2600 万ドル vs Decrypt 2000 万ドル）を追加
  - 調査役メモの「最初の土地販売の矛盾」は contradictions に既にあり、内容を原資料で確認（NonFungible は Terraform の名を出さない）
- 追加した反証: DappRadar の日次ウォレットは公開直後の宝探し期間に 675 に達し、2022-10 の CoinDesk はこの指標の過去最高を 675 とする。宝探しの賞品受け取りには少額の ETH が必要だった（Ryan Schultz）ため、オンチェーンの最大の山は賞品目当ての一時的な取引だった可能性（同一時点かは CoinDesk に明記なし → analysis）
- 確認できなかったこと: Terraform Event の入札者数（検索で見つからず）、公開初日の訪問者数の一次資料（公式ブログ）
- 判定: 修正済み（重大な捏造はなし。出典の付け漏れ 1 件、出典にない強い表現 2 件を修正）
