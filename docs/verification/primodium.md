# 検証記録: primodium

- 確認日: 2026-10-23
- 確認した出典: 16／16（developer.primodium.com 10 ページを curl で取得、primodium・empires の両リポジトリを clone、WASD 記事・Lattice ブログ 2 本を取得）

## 直したこと
- summary: 「MUD v2 と Phaser で作られた」→「v0.7 系は MUD v1、2023-11 の v0.8.1 から MUD v2」。v0.7.1 時点の main は @latticexyz/solecs ^1.43（MUD v1）、MUD v2 移植ブランチ release/v0.7.1-mudv2 の main へのマージは 2023-11-06（git で確認）。
- trajectory: 上記と、v0.7.1 の本番既定チェーンが Caldera chain 12523 だったこと、2023-05 に Lattice の skystrife テストネット（4242）へ切り替えたコミットを追加。event ev-primodium-mudv2 を追加。
- what: 「運営と第三者記事は Factorio 型と説明」→ 出典に "Factorio" の語はない。README の「space-based factory-building game」に修正。
- relations(mud) の note を v1→v2 の経緯に修正。

## 追加した反証
- 唯一の参加者数（v0.7.1 の 300 人超、WASD）は MUD v1 時代＝World Extension 以前の数字で、拡張モデルが参加を集めた証拠にはならない。

## 照合して問題なかった主な点
- 「Primodium is no longer available as an official deployment」「released on June 27, 2024 on the Primodium testnet」「The testnet itself no longer available」逐語。
- worlds.json（10017 / 84532）、unitDeathLimit 5,000,000、コミット数 7681、最初のコミット 2022-11-27、最終 2025-02-06。
- Empires: 2025-01-10「release: deployed to base mainnet」、worlds.json に 8453、payable な行動関数（ETH 支払い）。「formerly deployed on Base」逐語。
- WASD 引用 2 件逐語一致、v0.7.1 は 2023-09-29 の金曜公開と整合。
- Footguns（名前長 14/16 バイト、委任の取り消し可能性、2.0.9）、Ideas（CommittedDelegationModule、傭兵・税・カジノ等）、Access Control（名前空間アクセスで ETH 引き出し可）を確認。

## 確認できなかったこと
- 各版の参加者数、v0.7 以前の公開状況、Redstone テストネットで遊ばれた版の有無、終了理由の一次説明。

## 総合判定
修正済み — MUD のバージョンに関する事実誤り（v0.7 系は MUD v1）と、出典にない「Factorio」表現を訂正。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 5 / 11（WASD の記事、AWWeekly #5、BCG 10 選、Introducing Redstone、primodium リポジトリを全履歴で clone。developer.primodium.com の 4 ページと MUD v2 is ready の Primodium の記述は今回再取得せず）
- 直したこと:
  - summary・channels.free-mint・channels.prize-competition: 「ゲストログイン」「ゲストは賞品を得られない」は 2024-02-06 のコミット（488fafa81）以降の機能。v0.7.1（2023-09）時点はブラウザ内でバーナーウォレットを自動生成し、起動時と定期の dripDev で自動配布していた（2023-10-01 時点のコードで確認）。v0.7〜v0.9 に賞品があったかはコードからは確認できないと明記
  - steps（2023-09-29）: 記事が案内するのは「Primodium の Discord と X、WASD の Discord・Telegram」→ Primodium の Discord と WASD の Discord・X・Guild.xyz（X は WASD のもの、Telegram とされたリンクは Guild.xyz）
  - steps（2023-12-21）: who「運営 (Primodium)」→ 投稿者は X の @tax_cuts（文面は「we」でチーム側）。DAU 330 は運営側の発表で reported のまま
- 追加した反証: 「300 人超」は 6 日間の累計プレイヤー、「330」は 5 日間の平均 DAU で別の指標。330 はリセット直後の初週の値で、同じ投稿が Goerli の不調で勢いが落ちたと書いており、定着を示さない
- 確認できなかったこと: @tax_cuts の役職、各ラウンドの賞品
- 判定: 修正済み（後年の機能を初期の獲得手段として書いていた時代錯誤を訂正）
