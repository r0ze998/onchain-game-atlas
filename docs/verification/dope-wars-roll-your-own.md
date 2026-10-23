# 検証ログ: dope-wars-roll-your-own

- 確認日: 2026-10-23
- 確認した出典: 9 / 10（cartridge-gg/rollyourown は WebFetch でも 404 で unreachable のまま。dopedao/RYO は clone）

## 直したこと
- compare.gameplay「取り締まりや盗難など」→「盗難や供給ショックのような確率的・市場全体のイベント」（設計メモに取り締まりの記述なし）
- counter_evidence「4 日で約 900 万ドル売れた」→「約 900 万ドルが費やされた」（Vice の "spent"。一次販売は gas のみのミント）。「稼働は約 2 年後」→「『最近ローンチ』と書かれたのが約 2 年後（2023-10）」に限定
- ev-ryo-dope-nft: タイトルから「Loot の翌日」を外し、日付の食い違いを detail に記載
- src-op-forum note: Butterbum の Discord 投稿の転載であること、原文の綴り「Stakware」を付記

## 追加した反証・矛盾
- contradictions: DOPE の公開時期（公式サイト「September 2021」/ Tarrence「Loot の翌日」＝2021-08-28）

## 確認できたこと
- Cairo 0 版の初回コミット 2021-09-15（perama-v）、コミット数 perama-v 55・Tarrence van As 28・guiltygyoza 3、goerli.deployments.txt、ModuleController とガバナンス、5% を DOPE DAO へ向ける規範、「fork of the Loot protocol with a GTA spin」(2022-06-19)、Optimism を本拠とする記述、dopewars.gg の Cartridge・Starknet・Dojo 記述とプレビュー URL、Nurstar インタビュー（2023-04-06）、ChainCatcher のバーナーウォレット・PvP 取引、q「The Dope Wars NFT is artwork.」は逐語一致

## 確認できなかったこと
- Dojo 版のローンチ日・規模・継続状況、リポジトリ非公開化の理由（第三者索引は最終 push 2024-04 と記す）、DOPE の正確な公開日

## 総合判定
修正済み — 出典にない語（取り締まり）1 件、販売額の言い換え 1 件、日付の断定 1 件を修正し、矛盾 1 件を追加。
