# 検証記録: pirate-nation

- 確認日: 2026-10-23
- 確認した出典: 8 / 8（新規追加 1 件を含む）。
- 方法: 報道 5 本を WebFetch、piratenation-contracts を git clone（449 .sol、MIT、ロール・バリデーター関数を確認）、GitHub 組織ページ、Proof of Play の X 投稿を X 公開埋め込み API で取得。

## 直したこと
- L3 費用: 月 15 万ドルの出典は 2025-09-08 の記事（src-pn-bcg-shutdown-date）で、「チェーンとゲーム」の合計（Proof of Play の説明）。money_flow が src-pn-bcg-kill（費用の記載なし）を根拠にしていた → 付け替え。
- 費用の矛盾: 2026-08 記事の「1 チェーン月約 6 万ドル」（CEO の説明）と 15 万ドルは、2 チェーン約 12 万ドル＋ゲーム費と読めば両立し得る、と contradictions を補足。
- 開始時期: 「BlockchainGamer.biz は 2023 年夏」→ 記事は「has been live since 2023」で夏の記載なし。
- money_flow: 「収益源は NFT 販売と PIRATE トークン」は出典に記載なし → 削除し unknowns へ。
- necessity: 「運営は『ほぼすべてのゲームロジックと状態がオンチェーン』と述べた」→ Decrypt の地の文「nearly entirely on-chain」（アートのみ IPFS）。
- entry_barrier: The Block はガス肩代わりに触れていない → 出典ごとに主張を分けた。
- architecture.onchain: 戦闘バリデーターの根拠に 2026-08 記事を挙げていた（記事に記載なし）→ コードのみに。
- 会社終了: 一次告知（X、2026-08-04T17:55Z）を src-pn-pop-x として追加。summary の「2026-08 にコントラクトをオープンソース化」→ コントラクトのリポジトリは 2025-09-18 公開済み、と補足。

## 追加した反証・矛盾
- 費用の両立可能性（上記）。The Block の「約 3 か月前に開始」は既存の矛盾として維持。

## 確認できなかったこと
- X 投稿の全文（冒頭のみ取得）。Plunder Certificate の PIRATE 交換の実施。収益構成。Apex の開始日と RaaS 事業者。

## 総合判定
修正済み。数値自体（日 3000〜4000 ドル、月 15 万ドル、月約 6 万ドル/チェーン、250 万 tx/日、DAUW 10 万→1 万、3300 万ドル）は出典どおりだが、出典の付け違いと出典にない記述を訂正した。
