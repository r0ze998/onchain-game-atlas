# 検証記録: sky-strife

- 確認日: 2026-10-23
- 確認した出典: 25／26（Lattice ブログ 10 本・Winding Down・redstone.xyz・skystrife.xyz は curl で本文取得、Notion Wiki 7 ページは Notion API で本文取得、skystrife-public は clone、BlockchainGamer は本文取得。evmts/skystrife-tevm は git ls-remote で実在のみ確認）。追加出典 3 件。

## Winding Down Lattice（2026-04）の実際の記述
- Redstone 停止は「May 15, 2026 (23:59 UTC)」。停止後は L1 の引き出しコントラクトで EOA の ETH/WETH のみ回収可、コントラクト内資金は不可。エントリの記述と一致。
- Sky Strife の今後（終了・移行・継続）には一切触れていない。登場は「Kooshaba, who built Sky Strife and our first in-house game studio」という謝辞と、遊んだゲームの列挙（zkDungeon, OPCraft, Sky Strife, DUST）のみ。
- 移行ツールで移ったのは DUST（DUST Chain / Conduit）のみと明記。

## 直したこと
- status.note: 「チェーン停止で状態は失われた」は判断であり一次資料の明言はない旨を明記 → 追加。配信中クライアントが既定で chain 690・rpc.redstonechain.com を参照し、参照日に RPC が名前解決不可・インデクサが HTTP 530 であることを実測して追記（新出典 src-sky-strife-play-client）。
- autonomous mode の日付: 「2024（Season 3 以降）」→「2024-07-10（Season 3 コミット）以後、2024-09-07（Wayback 最古保存）以前」（trajectory と event）。
- trajectory: Season 0 告知が Season 1 を「2024 年初め」と予告していたが実際は 2024-05-01 だった事実、Season 0.1 の予定期間（2024-01-08〜30、二次資料）、0.2/0.3 のコミット日を追加。
- contradictions（報酬算定期間 2 日 vs 1 週間）: WINDOW 定数は初期値で、LibSkyPool は実行時に SkyPoolConfig.window を読むため本番値は設定次第、と補足。
- src-sky-strife-winding-down の note に「Sky Strife には触れない」を追記。
- unknowns: シーズン期間、Redstone 停止の実行記録を追記。

## 追加した反証・矛盾
- 公開リポジトリ最終コミット（2024-07-23）は autonomous mode 前で、移譲後の World の実態は公開コードで再現できない（open_source: full の限界）。
- Lattice は DUST を移行ツールで移しており、Sky Strife の「世界喪失」は基盤の宿命ではなく移行主体の不在・選択の結果の可能性。

## 照合して問題なかった主な点
- 355 人・307 試合・ユーザー作成 178 / 管理者 129・目標 100 人を 2 日目に突破（逐語確認）。
- 4500 万ガス・MetaMask 3000 万上限・2 日強の停止、引用 "In general, our attitude towards gas optimization on Sky Strife has been lax." 逐語一致。
- Season 0 = 11/27〜12/15、テストネット 4 シーズン、mainnet 2024-05-01（Redstone 公開日・Worlds Expo 初日）。
- 定数 COST_CREATE_MATCH=100、MATCHES_PER_DAY_HARD_CAP=2000、SKYPOOL_SUPPLY=1 億、報酬 <1000 で 150%、worlds.json の chain 690 = 0x9d05…（Wiki の Sky Pool アドレスと一致）。
- Wiki 引用（Sky Key の “owner”、"No more orbs will ever be minted..."）逐語一致。

## 確認できなかったこと
- autonomous mode の正確な日付、mainnet 各シーズンの期間・参加者数。
- Redstone 停止後に Sky Strife の World が他チェーンへ移行されたか（検索では見つからず）。
- ルート名前空間の所有権の扱い。

## 総合判定
修正済み — 事実誤りは小さいが、status「ended」の根拠が推論である点の明示、autonomous mode の日付範囲の絞り込み、検証役の実測による根拠強化を行った。
