# 検証記録: the-sandbox

- 確認日: 2026-10-23
- 確認した出典: 3 / 4（CoinDesk、Wikipedia、Cointelegraph。未確認: 2020 ホワイトペーパー PDF）

## 直したこと
- m-tsb-mau-claim-2022: 「定義は 1 日 1 回以上の接続に基づくと CEO が説明」「出典 CoinDesk」→ CoinDesk に MAU の数値はなく、約 20 万 MAU は Wikipedia（Bloomberg 2022-10-23 を出典）による。CEO が CoinDesk で定義したのは DAU（1 日 1 回以上接続）のみ。MAU の定義は不明
- counter_evidence: 約 20 万 MAU の出典を修正し、Yat Siu（Animoca）の「約 500 DAU は実態を表さない」という発言を追記
- counter_evidence（再編）: 「約 250 人のうち半数超」→ The Big Whale の「少なくとも従業員の 50%」（Cointelegraph に総従業員数の記載なし）
- contradictions: Wikipedia の約 500 DAU（出典不明の報告）を追加
- source notes 2 件を具体化

## 追加した反証・矛盾
- Wikipedia の約 500 DAU と CoinDesk の 522（DappRadar）は時点・出典が別。会社側 MAU は定義不明のまま。

## 確認できなかったこと
- ホワイトペーパー本文（166,464 区画、5% 手数料）の再読。Polygon 移行、コントラクト管理権限。

## 総合判定
修正済み。MAU の出典と定義が取り違えられていた（CoinDesk の DAU 定義を MAU に当てていた）ので直した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 4 / 4（Decrypt 2020-02 先行販売、ForkLog Alpha、Wikipedia、ホワイトペーパー PDF を curl＋pdftotext で再確認）。追加 1 件（PocketGamer.biz 2022-03-03）を取得
- 直したこと:
  - steps growth 2021-12: 「Alpha 期間の利用者は 20 万超」(fact, Wikipedia のみ) → 運営の発表として PocketGamer.biz が「visitors」と書く claim に変更、500 万超の SAND 配布を追加。m-tsb-alpha-users の unit を visitors、定義を更新。m-tsb-alpha-sand-distributed を追加
  - steps pre（Foundation の助成）: ホワイトペーパーの 2 回の先行販売売上計 1,400 ETH、Discord 1 万超、マーケットのアカウント 3,500 超を追記（claim）。m-tsb-presale-revenue-wp を追加
  - cost: 1,400 ETH と 500 万 SAND 配布を追記
  - contradictions: 最初の先行販売の所要時間（Decrypt「約 4 時間」vs ホワイトペーパー「最初の 2 回がほぼ 1 時間で完売」）を追加
- 確認した主張: 3,000 超区画・約 4 時間、6,192 区画・800 ETH（Animoca）、初期購入者の名前、Alpha Pass 5,000（抽選 1,000・コンテスト 2,250）、最大 1,000 SAND、ハブは誰でも入れる、4000 万ダウンロード・MAU 120 万（ピーク 260 万）、15 超のゲーム・100 人のアーティスト、手数料 50% を Foundation
- 追加した反証: SAND 報酬は最大 5,000 枚の Alpha Pass 保有者に限られ、ハブは誰でも入れたため、20 万超の「訪問者」の大半は報酬対象外。トークン報酬だけでは流入規模を説明できない（既存の「報酬目当ての一時流入」説への逆方向の反証）
- 確認できなかったこと: Alpha Pass 残り 1,750 枚の配布経路、Alpha の 20 万の定義、先行販売の購入者数
- 判定: 修正済み（Wikipedia のみを根拠にした fact を claim に格下げ）
