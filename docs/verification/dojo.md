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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 11 / 12（dojoengine/dojo を blob なしで clone し 2023-08-01 以前の作者を再集計、Nurstar の Tarrence 取材・Realms 取材、Starknet ブログ 2023-07・2024-08、itch.io の Jam #1・#3・#4、The Loot Herald 2024-04、AW Research 2023 年まとめ、Cartridge の Series A プレスリリース。eternum のコミット履歴は realms-eternum の検証で clone 済み）。
- 直したこと:
  - 初期の作者数: 「延べ 37 名（別名の重複を含み得る）」→「作者名 37 種。Kari / Kariy、Fred Tupas / ftupas、Patrice Tisserand / ptisserand など同一人物とみられる別名を含み、実人数は 34 前後」。「延べ」は重複を数える語で意味が逆。再集計では境界の時刻帯によりコミット 721〜726、Ammar 92〜94 と揺れるので note に記載。月別の作者名数 1→6→9→12→18→19→10（7 月は境界で 10〜11）は再現。Realms 関係者の名義（Loaf 17、aymericdelab 2、ponderingdemocritus 1）が計 20 件であることを追記。調査役メモの「37 名」は人数ではなく作者名の数。
  - Jam #4 → L3 Round の step: 「ジャムが Realms 生態系の資金への入口になった」（fact の中の因果）を削除し、「ジャム終了の翌週、投票中の時点で上位」に限定。「1 ゲームあたり 10 万 LORDS」→ 原文「Five new or existing games will be funded 100,000 $LORDS」は 1 ゲームあたりか総額かあいまいなので「5 ゲームに 10 万 LORDS」と併記（channels builder-grants も同様）。
  - counter の「Game Jam #4 の itch.io の提出は 3 件にとどまる」: itch.io の 3 件に入賞作 zKlash・Blob Arena 等が含まれておらず（Loot Herald は 7 作以上の入賞を報じる）、参加規模の指標として誤読を招くため、指標にならない旨に修正。
  - channels existing-community: 「最初の貢献者は Cartridge と Realms」→ エンジンは Tarrence が始め Realms は初期からの提携先・利用者、Realms 名義のコミットは少数、に修正。
- 追加した反証: 2023-01〜07 のコミット約 720 件のうち Realms 名義は 20 件で、Tarrence 以外の上位作者の所属は資料で確認できない。「最初の開発者は Cartridge と Realms」はエンジンの利用者としては正しいが、エンジン開発の担い手がどこから来たかは示されていない。
- 確認した（変更なし）: 初回コミット 2023-01-08「dojo init」、Loaf の初回 2023-02-24、v0.1.0 2023-07-24、Tarrence の「a core contributor to The Dope Wars」と q（逐語）、Starknet ブログ 2023-07-13 の TL;DR に Dope Wars・Influence・Realms・CafeCosmos と Discord への案内、Jam #1 は「The first virtual Dojo Game Jam」・72 時間・5,000 ドル・8 作品・主催者、Jam #3 の賞金と 25 エントリー、Ninja School（2023-11、Devconnect）、Series A の 750 万ドルと q（逐語）・最大 2.5 万 USDC、2024-08 ブログの Dojo 製ゲーム一覧（Starkane はリンクのみ）。
- 確認できなかったこと: 初期の外部コミット作者の所属。Jam ごとの参加者数（itch.io の join 数は未取得）。
- 判定: 修正済み（人数の定義、fact 内の因果、誤読を招く反証の数値を修正）。
