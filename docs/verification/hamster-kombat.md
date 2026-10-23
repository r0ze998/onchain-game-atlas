# 検証ログ: hamster-kombat

- 確認日: 2026-10-23
- 確認した出典: 6 / 6（既存。すべて curl で本文取得）＋ 追加 3 件（ForkLog S2、BitPinas、tonapi）
- 方法: 利用者数を運営発表・プラットフォーム統計・オンチェーンに分けて照合。tonapi で HMSTR jetton を直接照会

## 利用者数: 報告値と計測値
- 3 億超（累計プレイヤー）: 運営主張（Cointelegraph・Decrypt）。reported
- 1.31 億（Cointelegraph・ForkLog）/ 約 1.29 億（Decrypt）/ 1.3 億（BitPinas）がエアドロップ対象。reported
- 230 万 BAN、68 億 HMSTR 没収（半分再配分・残り焼却）、400 アカウント→1 つの Binance アドレス: 運営の X 投稿（Decrypt 引用）。一致
- 月間: ForkLog「アプリ統計で 4,090 万（9 月末の 3 億から）」、Decrypt「Telegram のデータで 4,400 万未満（9 月下旬の 1 億超から）」。どちらもプラットフォーム側の統計（reported）
- 運営代表「our MAU remains above 30 million」: ForkLog（AI 翻訳、Cointelegraph 経由）で逐語一致
- 計測値（追加）: tonapi の holders_count 1,350,945（2026-10-23）。取引所預かりを含まないため人数ではない。運営の「1,100 万超の保有者」（2024-11）とは定義が違う

## 直したこと
- m-hamster-kombat-mau-2024-11: value_text「3 億（9 月末）→ 4,090 万」→ 月間同士の比較（Decrypt の 1 億超→4,400 万未満）に修正。3 億は累計で月間値ではない（数値の混同）
- counter_evidence「月間利用者が約 86% 減った」→ 削除し、同定義の比較に置換（86% は累計と月間の比から出た誤り）
- status note「2025 年初めに Season 2 を開始したと報じられた」: 引用元の Decrypt（2025-01-02 更新）は計画段階の記述だったため、ForkLog（2025-02-19 開始）を出典に追加
- admin: HMSTR jetton が mintable=true で admin がウォレットであることを追記（tonapi）
- unknowns: 1,168 万（2025-02）は BitPinas の本文で確認したため削除し、metric 化。Season 2 エアドロップの実施有無を追加

## 追加した反証・矛盾
- metrics: 2025-02 の月間 1,168 万（reported）、2026-10 の保有アドレス 135 万（measured）
- contradictions: 月間減少の起点（ForkLog は累計 3 億と比較）、対象者数（1.31 億 / 1.29 億 / 1.3 億）
- event: 2025-02-19 Season 2 開始

## 確認できなかったこと
- 2025 年夏予定の Season 2 エアドロップの実施、2026 年の利用者数
- 3 億の定義と重複・ボット比率、運営の収益源

## 総合判定
修正済み — 累計（3 億）と月間（4,090 万）を比べて「86% 減」とした数値の混同を修正。運営発表・プラットフォーム統計・オンチェーン計測を区別し、計測値を 1 件追加した。
