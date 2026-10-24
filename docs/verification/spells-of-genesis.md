# 検証記録: spells-of-genesis

- 確認日: 2026-10-23
- 確認した出典: 4 / 4

## 照合結果
- 公式サイト: 2015-03-11 の FDCARD、2017-04-20 の公開と Blockchainize、2023 年からの ChainChronicles、BCY ステーキング、「1st NFTs mobile game ever made, since 2015」（主張）。ページ内に読み手への指示文が埋め込まれていたが、データとして無視した。
- Counterparty フォーラム（2015-02-16、edshnin）: カードへのトークン割当、ロック、7000 万 BCY の販売、焼却。総発行 1 億はこの投稿にはない。
- Bitcoin Magazine（2015-05-09）: 1 億 BCY、うち 7000 万を販売、焼却・再利用、Moonga 25 万 DL。
- Bitcoin Magazine（2015-08-04）: セール開始、Swarm から移行、ShapeShift。

## 直したこと
- src-sog-counterparty-forum note: 「1 億」は Bitcoin Magazine 由来と明記
- metrics 追加: m-sog-mau-projection-2015（CEO の MAU 5 万の見込み。実績ではない）
- src-sog-btcmag-sale note: 見込み値を追記

## 追加した反証・矛盾
- トークンセール時の需要試算（MAU 5 万・有料 2,500 人）は公開 2 年前の見込みで、実績は公表されていない。

## 確認できなかったこと
- トークンセールの実際の調達額、プレイヤー数。

## 総合判定
重大な問題なし。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 5 / 7（Counterparty フォーラム、Brave New Coin 2 本、SiliconANGLE、Bitcoin Magazine 2015-08-04 を WebFetch で再読。公式サイトと Bitcoin Magazine 2015-05-09 は 2026-10-23 の検証で確認済み）
- 照合: 「1000 USD 超」の q 逐語一致。登録者への無料 BitCrystals（"Free BitCrystals are being rewarded to early supporters"）、7000 万枚、240 BTC / 2 時間、約 630 BTC / 72 時間未満、マルチシグと 25% × 4 段階、934 BTC・約 1360.3 万 BCY・終身会員 181 / 39、Alpha 0.1、SiliconANGLE の約 730 BTC（目標の 90%）・930 BTC 超・34.6 万ドル超、iOS は出資者に自動配布、MAU 5 万の見込み、すべて一致
- 直したこと:
  - steps（2015-08-04）: 「ShapeShift 経由で開始」→ ShapeShift と提携して自社の BitCrystals サイトで開始。開始日を Brave New Coin 09-15 記事は 08-03 と記すことを併記
- 追加した反証: 出資者数は非公表で、人数が分かるのは終身会員 220 件のみ。934 BTC が少数の大口に偏っていた可能性、開始 1 時間は DNS 障害で米国からしか見えなかったこと（src-sog-bnc-milestone-2015, src-sog-bnc-sale-2015）
- 確認できなかったこと: セール参加者数、登録者数、2016 ベータと 2017 公開時のプレイヤー数。なお entry 全体の unknowns「トークンセールの実際の調達額」は、報道値（934 BTC）が見つかっているので、運営の一次発表・オンチェーン確認がないという意味に読み替えが必要（acquisition 外なので未変更）
- 判定: 修正済み（重大な問題なし）
