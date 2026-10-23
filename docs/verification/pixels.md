# 検証ログ: pixels

- 確認日: 2026-10-23
- 確認した出典: 35 / 35（curl で本文取得 34 件。The Block は curl 403 のため WebFetch で本文確認。Ronin RPC は同手順で再計測）
- 方法: 全 metrics・events・q を本文と照合。Ronin 公開 RPC で PIXEL Transfer を 2 日分再集計（eth_getLogs、200 ブロック刻み、日境界は timestamp の二分探索）

## 照合結果（主なもの）
- DAU/ウォレット: 5,000（運営主張）/ DappRadar 2,000〜3,000（2023-09）、4,000→111,000（11/15〜）、VIP 11,247（11/19）、100 万 DAU（2024-05-13、定義なし）、77.9 万（DappRadar 5/20）、75 万 BAN、712,672 DAA、4 万超（2025-06）、すべて本文と一致。nature の付け方（運営値=reported、DappRadar 等=measured）も妥当
- 約 69% 減: BlockchainGamer.biz（2024-07-03）は「6 月中旬の chapter 2」「90 万超→25.2 万→42.8 万」、GamesTX は「5 月」「100 万 DAUW の 69%」「25 万→75 万」。いずれも本文どおり。CMO がボット除去と述べた点も BG 本文にあり
- RORS: 約 0.8（whitepaper の逐語「Currently around ~0.8…」）、3 対 1（2026-03 BG インタビュー、「these games」「過去 3 か月」の文脈）、131%（BitPinas、自己申告）を確認
- 収益: 2024 年 2,000 万ドル（whitepaper Lessons Learned、reported）、2,500 万ドル累計（BitPinas、運営主張）を確認
- q 7 件: 内容は逐語一致。2 件は原文の曲引用符（don’t / it’s）に合わせた
- Ronin RPC 自前計測: 2026-05-20 は 2,716 件・717 アドレス・送信元 427（ブロック 55883207〜55926406）、2026-10-15 は 3,677 件・606 アドレス・送信元 244（62276807〜62320006）を再計測で完全再現。PIXEL コントラクトの symbol() が "PIXEL" であることも確認。トークン移転であり DAU ではない旨は metric・本文とも明記済み

## 直したこと
- q（土地所有者）: "don't" → 原文どおり "don’t"
- q（CEO の DAU 発言）: "it's" → 原文どおり "it’s"
- trajectory「84% 下がると CEO が述べた」→「下げたと述べた（自己申告）」（原文は過去形の達成報告）
- m-pixels-dau-polygon-2023: note 追加（BG は運営値が数か月前のものに見えると注記、DappRadar 値と別系列）
- m-pixels-dauw-2025-06: note 追加（元の計測は BG 側、運営ブログ経由の二次引用で原記事未読）
- PIXEL Transfer の 2 metrics と retention_evidence: ブロック範囲・from/to 和集合・手順を追記し、再現できる記述に
- src-pixels-ronin-rpc note: topic0、日境界の決め方、再実行で同値を明記
- src-pixels-theblock-1m note: curl 403・WebFetch で確認と追記
- src-pixels-help-vip-tier note: 「Updated June 2026」表記とページの dateModified（2026-10-05）を区別

## 追加した反証・矛盾
- counter_evidence: Cointelegraph（DappRadar）は BAN による急減がすぐ戻ると指摘。同記事は人間が 3 分の 1 程度という見方と土地所有者の収入例も伝え、「ほぼボット」説への反証にもなる
- contradictions: BG の見出し「69% 減」と本文「90 万超→25.2 万」（≒72% 以上）が一致しない。69% は GamesTX の 100 万起点と整合
- contradictions: 開始年（Decrypt 2021 / BG インタビュー導入文「2022 年リリース」）、Ronin 移転月（BG 同記事 2023-11 / Ronin ブログ 10/31）

## 確認できなかったこと
- 2025-06 の 4 万 DAUW の BG 原記事（運営ブログ経由のみ）
- Farm Land NFT が Ethereum 上であることの公式記述（Cointelegraph の ETH 建て価格からの推定。PIXEL の Ethereum 版 ERC-20 は存在を確認）
- 現在の DAU、ボット除外後の人数（変わらず unknown）

## 総合判定
修正済み — 数値・日付・RORS・収益の捏造や取り違えはなく、Ronin RPC の自前計測も完全に再現できた。引用符の逐語性 2 件、自己申告の時制 1 件、出典 note の再現性・性質の補足を修正し、反証 1 件・矛盾 2 件を追加。
