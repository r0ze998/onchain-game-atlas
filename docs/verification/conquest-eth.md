# 検証記録: conquest-eth

- 確認日: 2026-10-23
- 確認した出典: 6 / 7（新規追加 1 件を含む）。src-conquest-mcp は clone で README と期間のみ確認。
- 方法: conquest-eth・player handbook・mcp-conquest-eth を git clone、Infinite Games 記事・conquest.game・GitHub 検索を WebFetch、Gnosis Chain 公開 RPC で 2025-1 版 OuterSpace のイベントログ件数を計測。

## 直したこと
- status: unknown → dormant。2025-1 版 OuterSpace のログ件数（200 万ブロック毎）: 2024-11〜2025-03 に 14,157 件 → 2025-03〜07 に 1,859 件 → 2025-07〜10 に 66 件 → 2025-10〜2026-02 に 27 件 → 2026-02 以降 1 件。
- ev-conquest-infinite-games: 「許可不要・永続・不変・プログラム可能・相互運用可能」→ 記事の挙げる性質は相互運用可能・許可不要・永続・不変の 4 つ（プログラム可能はブロックチェーン側の性質）。
- relation → autonomous-worlds-essay: README が「Autonomous Worlds, or what we like to call Infinite Games」と両者を同一視している点を note に追加（論考への言及はなく analytic を維持）。

## 追加した反証・矛盾
- counter_evidence: yonadaa/conquest.eth-stats は 2025-02 まで更新があり、「第三者拡張は 2022 年で止まった」は一部不正確 → 版の活動期に連動、と修正。
- counter_evidence（analysis）: 無期限設計でも活動は版の公開直後に集中し、期間制と大差ない可能性（ログ計測に基づく）。

## 確認できなかったこと
- プレイヤー数・ステーク総額。MCP 経由の AI エージェント参加の実績。版をまたぐ資産の扱い。

## 総合判定
修正済み。主要な記述（コミット・リビール、12 時間、Agent Service、AGPL-3.0、Defcon 開始）は一次資料どおり。status をオンチェーン計測に基づき更新した。
