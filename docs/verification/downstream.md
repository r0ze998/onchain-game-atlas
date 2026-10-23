# 検証記録: downstream

- 確認日: 2026-10-23
- 確認した出典: 25 / 28（新規追加 2 件を含む）。未再確認: src-downstream-retropgf（WebFetch で本文描画されず、snippet のまま）、src-downstream-site（名前解決不可、unreachable のまま）、src-downstream-signalbase（集約サイト。検索で同内容のみ確認、一次資料なし）。
- 方法: playmint/ds と外部作例 3 リポジトリを git clone、Downstream.sol / BuildingRule / CheatsRule / Zones721 を読解、各記事を WebFetch、Lattice の X 投稿を X 公開埋め込み API で取得、redstone.xyz と Redstone RPC を直接確認。

## 直したこと
- Redstone 停止の告知日: 「Lattice が 2026-04-15 に告知」→ X 投稿は 2026-04-14 17:20 UTC（報道・L2BEAT は 04-15）。一次出典 src-downstream-lattice-x を追加。
- 停止の事後確認: redstone.xyz が「Reclaim your Redstone balance」ページに置き換わり、RPC が応答しないことを status に追記（src-downstream-redstone-claim 追加）。
- dates.launched: 「Decrypt は公式 X 投稿を引用」→ 引用元は ggQuest の X 投稿（2024-04-18）。
- god mode: 「CEO は god mode がないと述べた」→ GamesTX では「As David says」に続く記者の地の文（直接引用ではない）。Amor 自身の寄稿の「those digital physics are immutable」を一次根拠として併記（q 付き）。
- onchain_tradeoffs: 「建物の制約で第三者が無から資源を生む建物を作ることを防いでいる」→ 保存則は建物レシピに限られ、ゾーン所有者は CheatsRule の DEV_SPAWN_BAG で任意アイテム・数量を生成できる、と分割・訂正。コード冒頭の「Cheats はワールド展開後まもなく無効化」というコメントと実装（所有者チェックのみ）の食い違いも記載。
- 外部チーム: 「投資家・提携先」→ 1kx のみシード投資家と確認。Tonk・RockawayX と Playmint の資本・提携関係は未確認。元リポジトリの作者は Playmint 外（Playmint 社員は Hexcraft の 1 コミットのみ）で、「第三者」であることは確認できたが、最終コミットはいずれもメインネット公開前（2024-01〜03）、RockawayX の README はローカル適用のみ。
- money_flow: シード資金を Downstream の開発資金と記載 → 報道の用途は The Crypt、Downstream への充当は未確認。
- trajectory: 「2023-06〜2024-04 に月 100〜360 件」→ 115〜364 件（2023-12 のみ 14 件）。2025-11 の 3 件は「ライセンス追加」だけでなく継続デプロイ無効化を含む。croissant 統合時期を 2024-02-21〜03-07 に。
- relation → autonomous-worlds-essay: basis confirmed → analytic（Amor の寄稿は AW の語を使うが論考・0xPARC・ludens に言及もリンクもない）。

## 追加した反証・矛盾
- counter_evidence: ゾーン所有者の任意アイテム生成により、建物側の保存則は世界経済の保護として不完全（analysis）。
- contradictions: Redstone 停止の告知日（X 04-14 vs 報道 04-15）。god mode の矛盾を Amor 寄稿（一次）で補強。

## 確認できなかったこと
- owner が本番で registerRule / autorizeStateMutation を実行したか、CheatsRule が本番で開放されていたか（Redstone 停止でチェーン履歴を参照不可）。
- 外部 3 作がメインネットに展開・稼働していたか。Cartridge による Playmint 買収の一次資料（検索で Signalbase 以外見つからず）。RetroPGF 申請本文。

## 総合判定
修正済み。主要な事実（Redstone 停止日、owner 権限、外部作例の作者）は一次資料で裏付けられた。告知日・引用の性質・保存則の範囲・投資関係の表現に誤りや過剰な一般化があり訂正した。
