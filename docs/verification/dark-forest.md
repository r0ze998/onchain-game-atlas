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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 12 / 25（新出典の ZK Podcast 141・225 の書き起こしを raw で全文取得、announce、v3-rules、v4-recap、v05、announce-v6、r1-wrapup、r5-wrapup、holiday、df04-faq、df05-faq、naavik、hardmode を取り直し）
- 新出典（書き起こし 2 本）: 実在し内容も一致。引用 4 件（"I met Wei Jie and Kobi and Barry…"、"We did run one play test earlier in, …"、"a number of our community members who have discovered either crypto or specifically ZK through Dark Forest"、他）は逐語一致。Kobi の並列ハッシュ、8/7 開始予定、Twitter 告知、学部生を EF ワークショップに連れて行く話、0xPARC は "fully funded by donations and grants"、Blaine が v0.4 上位 2 人の一人も一致。番組ページの公開日表記は再確認していない
- 直したこと:
  - steps（内部 alpha の pre）: date "2020-08" → 削除。2020-08 はポッドキャストの公開月で、プレイテストの日付ではない
  - channels community-server: Telegram の質問対応と Discord 8000 人超を獲得チャネルとして挙げていた → 獲得経路として確認できるのは v0.6 の Discord での無作為な鍵配布だけと書き直し、規模の数字は参加後の場と明記（出典に announce-v6 を追加）
  - cost: バーナーウォレットへの xDAI 送付の出典に announce-v6 が入っていた（同記事に記載なし）→ v0.4/v0.5 FAQ に限定し、約 0.05 ドル分と具体化。「後から来た参加者が先行者に払う構造はない」は出典に書かれていないため別項にして k: analysis に格下げ
  - after: 「orden_gg 系の集団は R2〜R5 で上位を続けた」→ R5 振り返りの記述どおり「R5 時点で 1 位 4 回（同点 1 回を含む）」に。どのラウンドで勝ったかは記事に書かれていない
- 追加した反証: gubsheep（ZK Podcast 225）が参加者の正体は運営も完全には把握していないと述べ（"No one knows if you're a bot or if you're a smart contract…"）、初期は単独プレイヤーが主で後に DAO・コントラクト口座が加わったとしている。「players」の数は人数ではなく口座数に近く、構成も版ごとに変わる（claim）
- 確認できなかったこと: v0.3 で配った鍵の数、待機リストの規模、賞金の拠出者。範囲外の注記として、acquisition 外の article（135 行目付近）にも「orden_gg 系が R2〜R5 で上位」の同じ表現が残っている（担当範囲外のため未修正）
- 判定: 修正済み（軽微な修正 4 件）。数値・引用の捏造はなし
- 統合時の追補（2026-10-24）: article・questions・insights に残っていた「R2〜R5 で上位」も、R5 振り返りの記述（1 位 4 回、同点 1 回を含む）に合わせて修正
