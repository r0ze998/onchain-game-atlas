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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 8 / 10（Vice 2021-09-09、dopewars.gg、Optimism フォーラム post 6、Nurstar の Tarrence 取材、AW Research 2023-06、itch.io の Dojo Holiday Game Jam #3 を再取得。cartridge-gg/rollyourown は再度 404・git ls-remote も認証要求で、github.com/dopewars も公開リポジトリ 0。ChainCatcher・Cairo 0 リポジトリは既存検証で確認済みのため本節では再取得せず）。
- 直したこと:
  - Discord の人数: 「約 5,000 人に達していた」「約 5,000 人規模」→ 原文は「nearly 5,000 members」なので「5,000 人近く」（調査役メモの「約 5,000 人」は上限側に丸めていた）。
  - channels community-server: 「ゲーム開発者とアーティストを集めた」→ Vice が書くのは参加の呼びかけのリツイートだけで、集まった結果は書いていないため「呼びかけた」に。作り手の人数は資料なしと明記。
  - channels crypto-social: 「リツイートとアーティストの投稿で拡散した」→ リツイートの事実のみに（拡散規模の資料なし）。
  - Game Jam #3 のトラック: 優勝者の DOPE 2 個に加えて準優勝にも 2 個（原文「2 for the runner-ups」）を追記。
- 追加した反証: Vice で Tarrence 自身が「People minted it for free and for fun without any expectations of the future.」と述べており、DOPE の初期分布はゲームを求めた人ではなかった。後のゲーム（RYO）の最初のプレイヤーを集めた施策とは言いにくい。
- 追加した矛盾: PAPER の配布方法。公式サイトは「one-time claimable」、AW Research は 2021-09-04 に各保有者へエアドロップと記載。
- 確認した（変更なし）: 「Nearly $9 million ... in four days」、「I think the community is working on various games on top of it.」（逐語）、「gas-only mint」「125,000 per DOPE」、post 6 の「partially funded by DopeDAO and Stakware in Sep 2021」「only recently been launched due to the upgrades to Starknet」（2023-10-03、Luckyhooman.eth）、Tarrence の「we are beginning the developmet of our own game called Roll Your Own (RYO).」、AW Research の q は逐語・ロードマップも一致、Jam は 5,000 ドル＋3 万 STRK・1.6 万ドル、2023-12-15〜2024-01-03。
- 確認できなかったこと: Dojo 版 RYO の mainnet 公開日とプレイヤー数（リポジトリ非公開）。ecosyste.ms の検索要約では cartridge-gg/rollyourown の最終 push は 2024-04 とあるが本文未確認のため採用しない。Vice の 900 万ドルの集計方法（ミントはガス代のみのため実質は二次流通と考えられる）。
- 判定: 修正済み（人数の丸めと、呼びかけを「集めた」とした結果の断定を修正）。
