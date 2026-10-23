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
