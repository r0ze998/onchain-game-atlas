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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 5 / 5（back-2025、future-2026、p2e-alpha2 を取り直し、handbook を clone、Gnosis RPC でイベントログを再計測）
- 照合: 引用 3 件（"Conquest had 4 versions prior to this one…"、"There will be at least $2000 in prizes up for grabs."、"We also had a lot of multi-accounting issues…" ほか）は逐語一致。「DEFCON 版だけが設計どおり許可不要・永続」は "Only the latter was launched as designed, that is permissionless and persistent." で裏付け。金額（1〜12 xDai、200 ドル、500 ドル相当、1000 ドル）も一致
- 直したこと:
  - channels platform-distribution（Blockscout・Soccerverse のスポンサー賞品）→ 削除して prize-competition に統合。提携先が自分の配信網や告知で参加者を送ったという記述はなく、チャネル定義に合わない
  - channels community-server: Discord・ニュースレターの案内があることしか示せないと明記（Discord 経由の参加数は不明）
  - steps 2025-01-21:「期限も人数上限もない世界」→ 告知は最初に 1 か月のセッションを置き、その後に無期限モードへ移る設計と補足
  - cost:「ステークは奪われ得るため後から来た参加者の資金が先行者に移る」（fact）→ ハンドブックは攻略した惑星のステークを exit で回収できると述べるだけで、移る方向は先行・後発と関係ない。別項にして analysis に格下げ。2021 年 alpha の賞品については、報道が受け付けていたのはスポンサー惑星だけと補足
  - after: 区間「2024-11〜2025-03」→ 最初のログは 2025-01-31（ブロック 38,326,402）と明記。2026-10-24 の再計測（区切りをずらして 14,250 / 1,772 / 60 / 27 / 0 / 1 件）でも同じ形
- 追加した反証: ログが開始後約 5 週間に集中して減ったことの一部は、関心が失われたからではなく、予定されていた 1 か月セッションの終了で説明できる（back-2025 と再計測）
- 確認できなかったこと: 開発ログ（conquest.eth.limo/devlog/）、各版の参加者数、Faction 版のコントラクト
- 判定: 修正済み（チャネルの分類 1 件、fact から analysis への格下げ 1 件）
