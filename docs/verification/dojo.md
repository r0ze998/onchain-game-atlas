# 検証記録: dojo

- 確認日: 2026-10-23
- 確認した出典: 8 / 8（dojoengine/dojo と katana は blobless clone、Starknet ブログ・Cartridge インタビュー・ChainCatcher は本文取得）。contradictions が参照する src-influence-sdk は influence エントリの出典で、ここでは未確認。

## 直したこと
- status.note: 「最終コミット 2026-05-06（v1.8.0）」→ 2026-05-06 は sozo v1.8.7 準備、v1.8.0 タグは 2025-10-31。dojo 本体の年別コミット数（2023: 1,264 / 2024: 938 / 2025: 513 / 2026: 12）を追記。Katana の最終コミット 2026-07-21。
- summary・compare.gameplay: Loot Survivor を Dojo 製として断定していた → 引用出典（Starknet ブログ・ChainCatcher）に根拠がないため削除・未確認と明記。
- event ev-dojo-katana: 「2023-05 Katana・sozo の World 移行機能をマージ」→ 2023-05-18 の Katana ブランチのマージ（migrate は 2023-02〜03 から）。
- constraints: Eternum 現行の contracts/l3 の Scarb.toml に dojo 依存がないことを追記。離脱理由は未確認（unknown）を追加。

## 確認できたこと
- 初回コミット 2023-01-08（Tarrence van As「dojo init」）、v0.1.0 2023-07-24、v1.0.0 2024-11-10、2025-04-22 の katana・torii 依存除去。Apache-2.0、README の監査記載（Nethermind 2024-02、OpenZeppelin 2024-11）。
- world_contract.cairo: register_namespace は未登録なら誰でも呼べ、呼び出し者が owner。grant_writer・upgrade_contract・upgrade_model は owner 検査。
- Starknet ブログ（2023-07-13）が Influence・Realms・Dope Wars を挙げること。インタビューで Cartridge が Controller・Dojo・RYO を並行開発と述べたこと。

## 追加した反証
- dojo 本体の 2026 年のコミットは 12 件のみで、「active」判定には katana 依存の面がある（analysis）。

## 総合判定
修正済み。重大な誤りは Loot Survivor の断定と版・日付の取り違え程度。
