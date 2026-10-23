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
