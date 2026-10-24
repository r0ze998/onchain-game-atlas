# 検証ログ: influence

- 確認日: 2026-10-23
- 確認した出典: 9 / 9（snippet だった Tokenomics Overview を本文取得して fetched に変更、SDK は clone、他は WebFetch）。追加 1 件（Substack archive）

## 直したこと
- status.note「2025-12 更新のページが Sepolia の pre-release に言及」→ それは 2024-02-23 公開・2025-12-02 更新の games.gg 記事で、mainnet 前のテストを指す（新たなテストの証拠ではない）と訂正
- status.note「SDK は 2026-10-22 に更新」→ 最新コミットは 2026-10-20（組織ページの表示は 10-22）。game.influenceth.io が応答すること、公式 Substack の最新投稿が 2024-09-12 の物語記事であることを追記
- architecture: SWAY の L1 発行を offchain から onchain 詳細へ移動（L1 Ethereum 上の処理でありオフチェーンではない）。admin の SWAY 管理者役割を本文で確認し、運営の計画（実行は未確認）として記述
- src-influence-tokenomics: access snippet → fetched、published 2023-03-16、文書版 v3.0（2024-06-22）
- src-influence-bankless: 著者がコミュニティ・スチュワードのゲスト寄稿で独立報道でないことを note に付記

## 追加した反証・矛盾
- counter_evidence: active の根拠は導線と SDK コミットのみで、利用規模や 2024-09 以降の運営報告がない
- counter_evidence: 「unstoppable」の主張に対し、SWAY は管理者役割付きで展開、ゲームコントラクトのソースと Dispatcher 権限は未確認
- contradictions: 製品数（Starknet 公式 nearly 200 / Bankless over 240 / 公式サイト 250）

## 確認できたこと
- 2024-06-27 ローンチ、22 原料・11 種の小惑星・5 職種、q 引用は逐語一致、2021 年に Starknet へコミット、StarkWare の株式出資（額非公表）と 2023 夏予定、Dojo 記事が Influence を Dojo 製と列挙、Starter Pack 30 ドルから、投資家割当ゼロ、SDK のアドレス・Dispatcher・ReadComponent、Dojo への言及なし、組織 19 リポジトリ

## 確認できなかったこと
- プレイヤー数、Dispatcher のアップグレード権限、SWAY 管理者役割の取り消しの実行

## 総合判定
修正済み — status の根拠に誤読 1 件（Sepolia）と日付のずれ 1 件があり修正。主要事実は出典と一致。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 9 / 10（PlayToEarn 2021-04、Games Press 2022-03、Bankless 2024-06、Starknet ブログ 2024-06、Etherscan の INFA、loot-survivor の deploy_mainnet.sh（loot-survivor の検証で clone）、削除済みの公式 Substack 2 件は Wayback Machine で本文を再取得。BlockchainGamer.biz 2021-10 は既存検証で確認済みのため再取得せず）。新たに 3 件を追加して全文確認（下記）。
- 調査役メモ「既存出典 2 件が 404」について: src-influence-starkware-invest と src-influence-tokenomics は元 URL が 302 → 404 で、Substack の archive（現存 5 件）にも残っておらず削除と判断。ただし Wayback Machine のスナップショット（2024-04-20、2026-05-13）で本文を取得でき、StarkWare の equity investment・「set to launch this summer」、トークノミクス文書の存在を再確認したため access: fetched を維持し、note にスナップショットを記録。
- 直したこと:
  - summary: 「3 年以上前（2021-04 と 2021-09）」→「約 3 年前」（2021-09 から 2024-06 は 3 年未満）。2021-09 の販売には出典がなかったため、Publish0x の告知記事（2021-09-09、Wayback で取得）を src-influence-p0x-2021-09 として追加し、2021-09-12 の 2 回目の販売の step を追加。「開発費を全額賄い…と述べる」は 2022 年時点の主張で、その後 StarkWare の出資と 3 回目の販売が加わったと明記。調査役メモどおり「半数が初利用・全額賄った」は claim（step は既に claim、summary は analysis で主張として記述）。
  - channels referral: 削除。Bankless のゲスト記事が SWAY の用途に「referrals」を挙げただけで実装を確認できず、「使ったと確認できたチャネルだけ」の基準に合わない。unknowns へ移した。
  - channels existing-community（fact）: 「2021 年の購入者が 2024 年の最初の保有者層になった」→ 転売で入れ替わり得るため、販売で保有者層をつくり公開前に early access・SWAY 請求権・保有者限定販売を与えた事実に限定。
  - channels token-incentive: 公開前の Early Community SWAY（公式）を加え、Bankless の初日配布の説明と合わせて claim（who 付き）のまま統合。
- 追加した出典（すべて実際に本文を取得）: src-influence-p0x-2021-09（第三者、primary: false）、src-influence-early-sway（公式 2023-03-16）、src-influence-pfl-sale（公式 2023-04-11）。これにより steps に 2021-09-12・2023-03-16・2023-04-11 の 3 件、cost に 2023-04 の販売を追加。
- 追加した反証: Bankless のゲスト記事は SWAY の「初日にコミュニティへ配る」フェアローンチを強調するが、公開前に既存保有者への SWAY 請求権（Arvad クルーメイト分 300 億）と保有者限定の SWAY 販売が済んでいた。公開時の配布は既存保有者に厚く、新規プレイヤー獲得の施策としての効果は割り引く必要がある。
- 確認した（変更なし）: 「100% funded Influence via player blockchain purchases」（逐語）、「50% of the asteroid buyers used blockchain for the first time」、2 万ドル・6 組、0.028 ETH から・5 月 1 日終了・early adopter rewards・「more sales events will happen」、Bankless の著者は Influence community steward の Jean-Paul Faraj（Guest Author）・Starter Pack 30 ドルから・zero investor allocations、INFA 保有アドレス 1,765、LS1.5 の influence_claims_per_token=1。
- 確認できなかったこと: 2021 年の 2 回の販売と 2023-04 の販売の販売数・売上。Starknet ブログ（2024-06-25）は 06-27 の公開を予告形で書いており、当日の稼働を独立に示す資料は未確認（既存の記述を維持）。
- 判定: 修正済み（出典のない日付、未確認チャネル、転売を無視した fact を修正。公開前の SWAY 請求権と保有者限定販売という重要な獲得・維持施策の欠落を補った）。
