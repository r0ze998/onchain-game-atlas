# 検証記録: pixelaw

- 確認日: 2026-10-23
- 確認した出典: 26 / 27（新規追加 1 件を含む）。コードは git clone（pixelaw/core・examples・vanilla・server・book、themetacat/pixelaw_core、dopedao/RYO、pixelaw/p_war）で読んだ。実行はしていない。github.com は curl では 403 だが clone・WebFetch で確認。p_war・RYO は存在と README 程度の確認。
- pixelaw.xyz・demo.pixelaw.xyz・mainnet.pixelaw.xyz は検証時も接続不可（unreachable のまま）。

## 直したこと
- admin.detail: 「validate_callers は常に成立するように見える」→ 実行箇所（core actions 内で get_contract_address() が core 自身になる）を明記し、add_area にも検査がないことを追加。未実行である旨を維持。
- constraints: validate_callers の記述（analysis 1 件）→ コード上の事実（fact）と悪用可能性の推定（analysis、未実行・デプロイ版未照合と明記）に分割。
- 出典追加: src-pixelaw-core-actions（actions.cairo。外部エントリポイントが検査なしで委譲していることの根拠）。
- money_flow: 「資金調達もしていない」→「資金調達をしない方針」（原文は "We won’t raise funds to build the planet."）。逐語引用を追加。
- extensions: Dojo Holiday Game Jam を検索要約 → 本文取得に格上げ（access: snippet → fetched）。作者 k1ic、PixeLAW 枠賞金 250 ドルを追記。
- roles: MCP リポジトリ「2025-12 に作られた」→「最終更新 2025-12-05、作成日は未確認」。
- contradictions: README の版表記（0.8.0-dev / Dojo 1.8.5）と Scarb.toml（0.7.9 / dojo 1.8.0）の食い違いを追加。

## 確認できたこと（主なもの）
- can_update_pixel の判定順、Paint と examples 7 アプリの on_pre_update（Paint は snake のみ・所有者/アプリ変更不可、rps・tictactoe は自アプリ名のみ、chest・hunter・minesweeper・pix2048 は常に拒否、maze は player のみ）。
- core の初回コミット 2023-11-12、最終 2026-01-10、年別コミット数 189/318/213/4。MAX_DIMENSION 32,767。
- vanilla の worlds.json の mainnet は katana.mainnet.pixelaw.xyz。
- shora 記事の逐語引用 2 件、2023-07 Paris・2023-11 テストネット予定・2023-04 に AW を知った、30 分・非公開テスト 3 本。ETHGlobal の "Winner of 🥇 Starknet — Best Use"。ChainCatcher の「2023-09」記載。
- ISSUES.md の内容（ただし呼び出し元検査の問題は ISSUES.md に挙がっていない）。

## 追加した反証・矛盾
- for_system が呼び出し側指定で app_caller の偽装が可能に見えるため、「フックによる調停」が悪意ある呼び出しに対する境界として働かない可能性（analysis）。
- Book が MUD/Redstone 版を公式の「2 つの実装」の一つとして扱っており、「第三者移植」の評価が揺れる点。
- 版表記の矛盾。

## 未検証として残るもの
- validate_callers・add_area・remove_area の問題が実際に悪用可能か（テスト実行・デプロイ済みコントラクトとの照合なし）。
- 公開世界の稼働状況・利用者数。

## 総合判定
修正済み。研究者のセキュリティ上の疑いはコード上で裏付けられたが、実行確認はしていないため analysis のまま保守的に表現した。他の重大な事実誤りはなかった。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 9 / 18（構想記事・開発記事・ETHGlobal・Starknet 週報・Holiday Game Jam 3・gj4 README（dojoengine/game-jams を clone）・Propulsion 2024・The Herald・p_war。コード系の出典と demo（到達不能）は今回未再取得）
- 調査役メモの確認（1,000 ドルの部門に応募があったか）: 未確認のままだが、今回は確認の範囲を広げた。game-jams リポジトリで「pixelaw」を含むのは gj4/README.md の部門表だけ。gj4 の提出ファイル 10 件、itch.io のジャムページの提出 3 件（Degen Battleground・AbyssX・moving-mountains-with-yu）のどれにも PixeLAW への言及はない。issue #1「Game Jam Win Pixelaw」（2024-03-27、本文 1 行、即日クローズ）はジャム開始前のもので、応募の証拠にはならない
- 直したこと:
  - growth の step（Game Jam #4）: itch.io のページは懸賞部門を「$16.5K」と表示していることを追記し、contradictions に README（$36.5K）との食い違いを追加した（新しい出典 src-pixelaw-itch-gj4 を追加）
  - channels.existing-community: 構想記事の「follow dojo's cultures」はチャンネル名（wakusei）の由来の説明で、開発者を集める文脈ではない。引用での根拠付けをやめ、「Dojo の上に作り、Dojo のジャムへの参加を呼びかけた（何人来たかは不明）」に書き直した
- 追加した反証: Game Jam #4 は賞金総額 3.65〜5.65 万ドルに対して提出が 3〜10 件で、ジャム全体の参加が少なかった。PixeLAW 部門に応募がないのは、PixeLAW の設計より Dojo 圏の開発者が少なかったことで説明できる可能性がある
- 照合済み: ETHGlobal Paris の「Starknet — Best Use」と 3 アプリ、構想記事の q（原文どおり）・資金調達しない・借金で暮らしている、という記述、Stark Cafe の X スペースと Discord 開設（2023-07-31 号）、非公開テストの 1 週間で 3 本・環境構築とデプロイ各約 1 分、Holiday Game Jam 3 の 250 ドルと PixeLAW2048、Propulsion（「A $20M initiative」と配分先の一覧、6/18 発表、20 件・最大 100 万ドルをガス使用量に応じて）、p_war の目的
- 確認できなかったこと: Devconnect でデモを実施したか、PixeLAW 部門の受賞者、Propulsion で受け取った額
- 判定: 修正済み（引用の文脈の誤用を 1 件直し、矛盾を 1 件追加）
