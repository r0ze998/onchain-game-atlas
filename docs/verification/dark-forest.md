# 検証ログ: dark-forest

- 確認日: 2026-10-23
- 確認した出典: 34 / 34（blog.zkga.me 27 本は curl で本文取得。GitHub 4 件は git clone と WebFetch。zkga.me はタイトルのみで記載どおり。Naavik・Hard Mode First・Frontier Gaming Watch は本文取得）
- 方法: 各ブログ記事の数値・日付・引用を本文で照合、公開日を `article:published_time` で照合（全件一致）、darkforest-eth/eth・circuits・plugins を clone してコードで照合

## 直したこと
- article.what「宇宙は中心からの距離で領域に分かれ」→「Perlin ノイズで配置された領域（NEBULA/SPACE/DEEP SPACE/DEAD SPACE）」。v0.4 FAQ に中心距離の記述はなく、Naavik は Perlin ノイズと明記（誤り）
- architecture.admin「移動以外の主要操作は whitelist 済みアドレスに限定」→ コード上 onlyWhitelisted は initializePlayer・revealLocation・捕獲系・giveSpaceShips のみ。move・withdrawSilver・アーティファクト操作には付かない（過大表現）
- article.constraints の minting exploit:「revert でき JS 側の対策では防げないと指摘」(fact) → claim（Blaine Bublitz）に格下げ。筆者は「If my understanding is correct」と推測で書き、未実装と明記
- article.onchain_tradeoffs の同件: 惑星 ID の二重使用バグを補い、筆者が後の公式メンバー Blaine Bublitz であることを明記。source に author を追加
- article.loop「上位プレイヤーはこの一巡を手作業ではなく…自動化」→「多くは」に弱め、R1 の 2 位 Ner0nzz はほぼ手動だったことを追記
- article.roles「ボイスチャットでの協調」は dfdao/orden ではなく P_DAO（R5）の記述なので、集団名と回を対応づけた
- compare.money_flow: Ethereum Foundation の助成（Lobbies 記事）を追記
- src-df-github-org の note「GPL-3.0、最終更新 2022〜2024」→ GPL 表示は 5 リポジトリのみ、残り 3 件は表示なし、更新 2021〜2024、developer-guides はアーカイブ

## 追加した反証・矛盾
- counter_evidence: R1 2 位はほぼ手動（自動化＝勝利の一般化への例外）
- counter_evidence: R4 で dropswap.gg が全ラウンドのアーティファクトを閲覧・送付可能に（Naavik の「ラウンド間で孤立」への部分的反証。ゲーム内で使えたかは未確認）
- counter_evidence: Ivan Chub「フォークされて当初は腹を立てた」— 拡張文化は当初の方針ではなく事後の受容だった可能性（Hard Mode First 内の引用）
- contradictions: Astral Colossus の順位（公式 38 位 / Naavik 34 位）、v0.3 賞金対象（ルール 15 名 / 受賞者記事 16 名）

## 確認できたこと（主なもの）
- 全 metrics（300 / 600 / 25 万 tx / 1000 招待鍵 / 1700 強・200 万 tx / 1900 / 2500 超 / 1700 超 / 約 2000 / 招待鍵獲得数 / 17.5 万ドル / Discord 8000 / 1024 DAI / 0.06 xDai / プラグイン 57）は出典本文と一致。57 は clone で再計数して一致
- events の日付はすべて記事本文・公開日と一致。R5 は「final round of v0.6」と公式が明記
- q 引用 9 件はすべて逐語一致
- DFAdminFacet の pause/unpause/setOwner/addScore/deductScore/createPlanet/adminSetWorldRadius/withdraw、move 回路の距離・半径・MiMC 検証、プラグイン README の秘密鍵警告はコードで確認
- blog.zkga.me の記事一覧に 2022-07-25（Nightmarket）より後の記事はなく、status: dormant と整合

## 確認できなかったこと
- 2022-07 以降の公式・コミュニティ（DF ARES 等）の動き。アーティファクトが別ラウンドで「使えた」かどうか
- Arena: Grand Prix の正確な期間（FGW は 5 週間とのみ記載。entry の「2022-06〜07」は概算）
- 「players」の定義、ボット比率（変わらず unknowns）

## 総合判定
修正済み — 事実誤り 1 件（領域の決まり方）、コード照合での過大表現 1 件（whitelist の範囲）、推測の fact 扱い 1 件を修正し、反証 3 件と矛盾 2 件を追加。数値・日付・引用に捏造は見つからなかった。
