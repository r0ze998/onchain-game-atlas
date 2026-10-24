# 検証ログ: defi-kingdoms

- 確認日: 2026-10-23
- 確認した出典: 5 / 5（docs 4 件は curl、The Block は WebFetch）＋ 追加 3 件（公式 X スレッドの Thread Reader 転載、EGamers、DefiLlama API）
- 方法: 公式ドキュメントの日付を本文照合、DefiLlama の TVL 系列を取得、2026 年の動向を検索

## 照合結果
- Serendale 2021-08-22（Harmony）、Crystalvale 2022-03-30（DFK Chain）、Harmony 閉鎖 2022-10-12、Serendale 2.0 2022-12-07（Kaia）、Colosseum 2024-10-04（Metis）、すべて一致
- DFK Chain: JEWEL をガスにして「ガス価格を管理」、手数料の 25% をバリデータ、DFK 所有のバリデータあり、一致
- The Block（2022-08-23）: 離脱理由は「Harmony との協業の難しさ」（記者の要約）、Horizon 攻撃（約 1 億ドル）にも言及、q「this is another major chain paying for a collaboration with DFK」は Dreamer の AMA 発言として一致

## 重大な追加事実
- 運営は 2026-07-31 に「DFK Chain を 2026-08-28 で終了し Avalanche C-Chain へ資産を移す」と告知（公式 X スレッド）。entry の chains・status note（DFK Chain・Kaia・Metis で稼働）は古くなっていた
- DefiLlama の DFK Chain TVL は 2026-08 に約 63 万ドルから流出し、2026-09-01 以降ほぼ 0（50 ドル台）

## 直したこと
- chains: DFK Chain に「2026-08-28 終了予定と告知」、Avalanche C-Chain を移行先として追加
- status note: 終了告知と TVL の推移を追記（status は「ゲームは終わりではない」との告知に従い active のまま、移行完了は未確認と明記）
- summary: 2026-07 の告知を 1 文追加
- events: 2026-07-31 告知、2026-08-28 終了予定日を追加
- metrics 追加（measured）: プロトコル TVL ピーク約 9.0 億ドル（2022-01-14）、約 4,400 万ドル（2022-06-01）、DFK Chain TVL 約 63 万ドル（2026-07 下旬）

## 追加した反証
- counter_evidence: TVL は Horizon 攻撃（2022-06）以前にピーク比 95% 減っており、ブリッジ攻撃が離脱・縮小の主因という読みを弱める（fact、DefiLlama）
- counter_evidence: 専用チェーンを 2026 年に自ら畳んだことは、ゲーム専用チェーンの維持可能性への反証（analysis）

## 確認できなかったこと
- 2026-08-28 に実際に停止したか（DFK Chain の公開 RPC は 405 で判定不能）、Avalanche C-Chain での再開範囲
- 費用削減が目的という EGamers の記述は公式スレッド本文では確認できず（報道の説明として扱った）
- コントラクトのソース公開、利用者数

## 総合判定
修正済み — 既存の記述に誤りはなかったが、2026-07 の DFK Chain 終了告知が反映されておらず status・chains が古かった。オンチェーン TVL の計測値と反証 2 件を追加。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 8 / 10（acquisition から参照される出典）。Dreamer の Notion 資料（WebFetch では本文が空のため Notion の公開 API loadCachedPageChunk で本文を取得）、Jason Pagoulatos、0xGregH、M6 Labs の助成一覧、The Block（Multiverse）、Docs の Realms・Gardens を開き直した。DefiLlama・The Block（Klaytn 移転）は前回検証分に依拠。
- 確認できたこと: q「Hero sale - 2000 in 11 minutes, $4.5mm, ~55k summoned since, with in-game marketplace active.」は逐語一致。初期チーム 4 人・数週間後に Gen0 2,000 体、19 プール、AVAX/FTM の流動性、APR 500%〜約 1,000%、32 人＋26 人、Serendale 2021-08-22・Crystalvale 2022-03-30、Epoch 1 から 95% ロック、TVL 70M→115M（10/7〜11）・Discord 8K 超・AMA 350 人超（10/11）、Discord 3 万→9.1 万。
- 直したこと:
  - steps 2021-12「第三者の分析は 100 万ドルとする」→ M6 の一覧には金額がなく、0xGregH が運営の 2021-12-20 の投稿「approved for a $1MM grant」を引いている、と出所を明記（逐語 q 付き）。
  - steps・channels・cost「最大 1,500 万ドル」→ The Block の原文は「$15 million in incentives has been set aside」で「最大」ではない。確保額であり実際の支払額は未確認と明記。
- 追加した反証: CoinGecko の JEWEL 最高値（22.52 ドル、2022-01-05）は TVL の頂点（2022-01-14）の 9 日前で、ドル建て TVL の伸びの一部は価格効果の可能性がある（新出典 src-defi-kingdoms-coingecko-jewel、counter に追加）。プールの JEWEL 比率は Docs に記載がなく未確認。
- 確認できなかったこと: Gen0 販売の日付（どの取得資料にもない）、初期エアドロップの有無、0xGregH が引く X フォロワー「2 万→12.3 万」のツイートの日付、Harmony 助成の一次資料（運営の投稿本文は未取得）。
- 判定: 修正済み（金額表現の誇張 2 件を是正。捏造なし）。
