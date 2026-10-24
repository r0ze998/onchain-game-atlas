# 検証記録: realms-eternum

- 確認日: 2026-10-23
- 確認した出典: 33 / 33（新規追加 3 件を含む）。eternum は blobless clone（16,763 コミット）で、引用されたファイル・コミットの実在と内容を確認。docs サイト・Bankless・Sovereign Frontier・X 記事は curl / WebFetch で本文取得。

## 内部文書・コミットの実在確認（すべて実在、記述内容も一致）
- docs/plans/realms-value-plane-design.md（追加 2026-08-29）: 「`pointsForWin = 0` everywhere, so no configured Eternum has a win condition」、L2/L3 分割、operator 中継（stage 1）。
- docs/plans/value-plane-loop-audit-2026-08-31.md: blocker の逐語引用一致、create_game の permissionless 指摘。
- docs/plans/hired-agents-architecture-brief.md（追加 2026-09-12）: 3 つの削除された試み、「Died with Cartridge.」逐語一致、96 ボット。
- deploy/athanor/README.md、docs 各ページ（introduction・disclaimer・lords・key-concepts・agora・frontier・contracts）。
- コミット 42c4104（2025-05-20、main の祖先）: assert_caller_is_admin 33 箇所、AgentOwner/AgentConfig、agent_controller_address。config の 5%・1,000・10,000・10〜35 LORDS。コミット d2282fe の S0 rewards（48 時間・END_GAME・部族長へ送金）。
- 2026-08-26「Cartridge out」、2026-09-12 sozo → ネイティブ・デプロイヤ、2024-12-02 Season Pass mainnet、2025-06-04「fix season end」、2026-03-15 eternum-season-2 マージ、2023-02-13 初回コミット。

## 直したこと
- Frontier の日付: 2026-10-07 実装 → 2026-09（2026-09-21〜22 に preset・シーズン作成・docs ページ追加）。status note・trajectory・entry_barrier・出典 published も修正。
- launched の note: 出典のない「Starknet 公式告知 2024-12-10」→ 削除し、Bankless の "went live Wednesday, December 11" と公式 X の「mainnet preview」に置換。
- retention_evidence: 「Bankless は S0 に『数百人』が参加」→ 引用元 Bankless 記事に見当たらないため削除し unknowns へ。残りの数値文は fact → claim（who 付き）。
- trajectory S0: 「X 投稿は検索要約のみ」→ X 記事本文を取得（access: snippet → fetched）。2024-12-27 発表、ブリッジ締切 12-28 21:30 GMT、申請締切 12-30 を追加。800 登録の発言を claim に分離。
- trajectory S1 終了: 推測を含む fact → コミット事実（fact）と「6 月上旬終了とみられる」（analysis）に分割。
- trajectory Blitz: 「2 時間」の根拠を llm.txt（現行は 60 分のみで 2 時間の記述なし）→ 2025-09 時点の repo docs（コミット 72502c0）に差し替え。contradictions も同様。
- roles: 「開発者は手設計していないと述べた」を fact から claim に分離（逐語引用付き）。
- counter_evidence: 1,000 エージェント発言を fact → claim（2025-01-03 の Loaf の X 投稿、Bankless に埋め込み）と、実装事実の fact に分割。イベント日付 2025-01-06 → 2025-01-03。
- counter_evidence: 「歩留まり」の文を fact → claim（理由は運営文書の説明）。
- 持ち出し期限: S0 のみ 48 時間 → S0・S1 とも 48 時間（S1 当時の免責事項で確認）、現行 7 日。
- 「不変のコントラクト」との矛盾: 2026-08 追加の現行免責事項と 2025 年の S1 コードを比べていた時期のずれを、S1 当時の免責事項（42c4104）で補強。
- Herald の時期: 2026-09 以降 → 2026-08-27 にコード追加。Katana 自前化 2026-08-06、Madara 2026-08-24 を明記。
- admin: 監査 blocker の修正状況は未確認と明記。
- 出典追加: disclaimer-s1、blitz-docs-2025-09、agent-runner。

## 追加した反証・矛盾
- apps/agent-runner（2026-09-13 追加、2026-10-20 まで更新）: エージェント路線は放棄ではなく作り直し中とも読める。
- S0 終了時の「Some calculations were updated」（再申請要求）、S1 賞金の手動配布、S1 docs の「将来は自動配布」が現行でも operator 中継止まりである点。
- S0 の「burned」（X）と「permanently locked」（docs）の表現差。

## 確認できなかったこと
- S1 の公式終了日・優勝者・参加者数。S0 の参加者数（約 800 は開発者発言のみ）。
- 36% の Starknet tx シェアの元データ。
- 監査 blocker の修正状況、S1 中の管理者関数の実際の呼び出し。
- Bankless 以外に S1 の賞金を USD 換算した一次資料（検索結果に「約 4 万ドル」とあったが本文で確認できず、記載しなかった）。

## 総合判定
修正済み。内部文書・コミットは実在し、内容も記述どおりだった。日付誤り（Frontier）、出典にない記述（「数百人」、Starknet 告知）、運営発言の fact 表記が数件あり修正した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 12 / 14（LootRealms の Sourcify ソース、展開 tx、Realms コントラクトの eth_call、eternum リポジトリを partial clone して key-concepts.mdx・frontier/introduction.mdx・コミット履歴、Bankless S0 ガイド・S1 記事、Nurstar 2023、Sovereign Frontier、docs.realms.world の S1 prize-pool、S0 優勝告知（api.fxtwitter.com）。bankless-returns と changelog 2 件は既存検証で確認済みのため本節では再取得せず）。github.com/BibliothecaDAO/eternum/blob/main/... の URL は WebFetch で 404 を返したが、既定ブランチが next で clone では同じパスにファイルがあるため access は維持。
- 直したこと:
  - 2021-08-31 の step と cost: 「保有者 0.03 ETH / 一般 0.15 ETH」→ どちらもコントラクトの初期値で onlyOwner が変更可能。eth_call で publicPrice が 0.1 ETH に変わっていることを確認し、変更時期と実売価格は未確認と明記。新出典 src-realms-eternum-lootrealms-rpc を追加。
  - Nurstar の step と cost（claim）: 「コミュニティ向け資金調達（BIP7）」→ 原文どおり「BIP7 で可決した LORDS トークン販売、コミュニティラウンドで完売・6 倍超」。資金の用途（Eternum と Adventurers の次の開発段階）と「創業以来コミュニティ資金」の主張、調達額の記載なしを追記。
  - Season Pass の step: 「二次市場で売買されたため保有者以外は保有者から買って参加した」→ S0 ガイドの入手経路（Discord で部族に入ると無料／Realms Market で約 6 ドル相当）を追加し、逐語の q を付けた。「保有者から買って参加した」は人数の裏付けがないため「参加できた」に。
  - channels: community-server を追加（S0 では Discord の部族が無料 Pass の配り手だった、と S0 ガイドが明記）。press の S0 ガイドの署名は Guest Author（heynejc・OExcess が協力）と正確化。
- 追加した反証: S0 開始翌日に Season Pass のフロアが約 6 ドル相当で、Discord 経由でも無料配布されていた。8,000 枠が制約になっていなかったことを示唆し、「Realms 保有者が最初のプレイヤー」という説明を弱める（S0 の約 800 登録とも整合）。
- 確認した（変更なし）: Season Pass の mainnet 展開コミット 2024-12-02（Credence「season pass: mainnet deployment」、PR #2181）、S0 開始 12-11、100 万 LORDS の 4 区分と 28 資源トークンの TGE、Loaf の「about 800 sign-ups」、「almost 36% of transactions on Starknet」（出典の記載なし）、S1 の 4 区分と手動配布、10 万 STRK の拠出者が prize-pool に書かれていないこと、S1 の Village は NFT なしで現金・ステーブルコイン参加、Nurstar の q は逐語、優勝部族 @orden_gg と「mainnet preview」、Frontier の free to play・2026-09-22 追加。
- 確認できなかったこと: Realms 先行販売の販売数と publicPrice 変更の時期（publicnode がアーカイブの getLogs を拒否）。S0 の Pass のうち Discord 経由で無料配布された枚数。BIP7 の調達額。
- 判定: 修正済み（初期値を実売価格として断定していた点、資金調達の性格の書き換え、配布経路の欠落を修正）。
