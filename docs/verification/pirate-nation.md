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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 9 / 9（piratenation-contracts は scratchpad に clone し、StarterPirateSystemV2.sol の API_MINTER_ROLE による付与と AlreadyMintedStarterPirate、StarterPirateNFTBeforeTokenTransferHandler.sol の TokenIsSoulbound を確認）。ほかに反証用に 2 件追加
- 調査役メモの照合: 提携コミュニティ 60 は TPan の「12, 16, and then 32 communities (60 total!)」と一致し、Discord サーバー単位であることも確認
- 直したこと:
  - channels crypto-social（X の「いいね」・RT と Discord の課題に BOOTY） → X の「いいね」・RT への付与は TPan に書かれていない（記事はむしろ「いいね・RT だけ」でなく遊ばせる設計と書く）。Discord のプロフィール画像・名前の課題と提携 Discord サーバーの対抗戦として community-server に移した
  - steps 2024-05: 「連続ログインの倍率」「X・Discord の課題」 → 「連続プレイ日数（1 日 1 エネルギー以上）」「Discord のプロフィール画像・名前の課題」
  - after の who: 「Proof of Play（BG 経由）」 → DAUW 10 万→1 万は BG の記述で出典・時期の記載なし。終了理由だけが Proof of Play の X 声明
  - counter: 「最初の利用者の多くは NFT 保有者と暗号資産利用者だった」 → 「と見られる（内訳の資料はない）」
- 追加した反証: BitPinas（2024-06-17）の「公開以来のユニークウォレット 12 万」と BG の「ピーク DAUW 10 万超」は定義上噛み合わず、ピークが上場後か数え方が違う。The Defiant の見出し「トークン上場を前に活動が急増」（本文は描画されず、検索要約にあった 6/8 の 146 万件は未確認のため不使用）
- 確認できなかったこと: ピーク DAUW の時期とデータ源、BOOTY シーズンの参加ウォレット数、Founder's Pirates の販売時期・価格
- 判定: 修正済み（原資料にない課題を書いていた 1 件、チャネルの分類 1 件）
