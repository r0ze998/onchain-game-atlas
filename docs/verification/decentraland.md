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
