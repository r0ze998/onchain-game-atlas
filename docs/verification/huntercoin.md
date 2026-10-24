# 検証ログ: huntercoin

- 確認日: 2026-10-23
- 確認した出典: 15 / 16（ledger.pitt.edu の論文は 503 / TLS エラーで再取得できず、snippet のまま。WebSearch で要旨の該当文を再確認）
- 方法: bitcointalk 3 スレッド・PR・各記事を本文で照合。chronokings/huntercoin・huntercore を clone してコードで照合。The Block は curl では 403 だが WebFetch で本文確認

## 直したこと
- summary「ボット軍団と投機に支配されたことを開発者自身が認め」→ 投機化は BlockchainGamer の記者の地の文で、Colosimo 本人の発言は「換金できれば搾取が起きる」とボット軍団の話。「Xaya の設計に直結」も、記事で確認できる Game Channels・Xaya の自己記述に合わせて弱めた
- compare.necessity「開発者自身が、全状態のチェーン計算が規模の限界とボット支配を招いたと述べ」→ そう述べた資料はない。論文要旨（snippet）と「1 年の拡張性実験」発言に置き換え、当事者の因果の発言は未確認と明記
- article.constraints「単純なゲーム性と価格上昇で投機の場になったと開発者自身が述べている」(who: Colosimo) → 記者の地の文と Colosimo の発言を分けた（誤帰属）
- counter_evidence「開発者も原因を『単純な設計』と価格上昇と述べている」→「記事の地の文も」（誤帰属）
- counter_evidence「2014-03 の案内の『blockchain will not be needed』は全オンチェーンへの内部の疑問の可能性」→ 削除。文脈はフルチェーンのダウンロード不要化（同期の話）で、過剰解釈
- article.extensions「Huntercore と Unity 製 UI（いずれも開発チーム側）」→ NewsBTC は Unity クライアントを第三者製と書く。BetterQT（wiggi）・MithrilMan クライアントを追加
- article.constraints の災害:「ランダムな全員死亡」→ コード上は全員に毒をかけ 1〜50 ブロック後に死亡。NewsBTC は「dominators」への対策と記す
- events.ev-huntercoin-ann の題名: 現在の題名は 2018-10-15 編集後のもの。当時の題名「Huntercoin Release - Approx 7 days - Human Mine-able Dual Algo」に直し、出典 note にも記載
- trajectory「1 年の実験」に Colosimo の発言（BlockchainGamer）を出典として追加
- compare.entry_barrier の「チェーン肥大」の根拠が snippet の論文だけだったので NewsBTC を追加
- src-huntercoin-xaya-games-doc の note「Huntercoin を例示」→ 本文に Huntercoin の言及はない（誤り）
- src-huntercoin-newsbtc: published を 2016-02-02 に確定（「2016 年頃」→ JSON-LD で確認）
- contradictions の「1 ブロックの時間」項目は中身が配分案の違いだったので「発行配分」に書き直した

## 追加した反証・矛盾
- counter_evidence: 2013 年の構想スレッド冒頭に「(or maybe bots will take over..)」— ボット支配は設計者が予期していた（ただし 2014-06 編集）
- counter_evidence: 主要開発者の急死（2014-02）・公開 1 か月後の価格暴落・チェーン肥大という別の衰退要因（NewsBTC）
- counter_evidence: 第三者クライアントが他者の手を事前表示し、ボットの優位を減らした — 人間とボットの差の一部は情報・ツールの非対称
- trajectory: Sindeyev の死去と価格暴落（2015 年に当初の 1% 未満）
- contradictions: 90% と 80% の差は公開スレッド自身の「採掘者は長期的に 20%＋課税」で説明できる可能性を追記。ジェネラル表記（.1 か「General」か）の資料差を追加

## 確認できたこと（主なもの）
- コード: GetBlockValue（10 HUC、2,100,000 ブロックで半減、総量 4200 万）、TOTAL_HARVEST 900 / CROWN_BONUS 25、フォーク高 255000 / 500000 / 590000 / 795000 / 1521500、GetNameCoinAmount 1→10→200→100、同時 20・生涯 1000 体、死亡時 4% 課税、初期キャラクター 3 体（FORK_POISON 以降 1 体）。最終コミット 2018-10-15 / Huntercore 2018-11-27、MIT
- GameLogicChanges.txt の Life-Steal 内容（200 HUC、運搬上限 100、75 の銀行）
- PR の「約 5000 人」「3 日で 100 万ドル」、The Block の「数万人」「100 万ドル超」「1 年の実験とフォーク」「2019 年の上場廃止」、BlockchainGamer の 5000 体×2・1 日 1 万ドル、Xaya の limited support・80%・Kraft の保守は本文で一致
- q 引用 6 件は逐語一致

## 確認できなかったこと
- Kraft 論文の本文（要旨の該当文のみ検索結果で確認）
- 各フォークの実施日、「1 年」の期限を外したフォーク
- 公開スレッドの記述（課税率、配分）が 2014 年当時のままかどうか（2018 年に編集）
- Unity クライアントの作者（開発チームか第三者か、資料により異なる）

## 総合判定
修正済み — 誤帰属 3 件（記者の評価を開発者の発言としていた）、出典 note の誤り 1 件、過剰解釈 1 件、編集後の題名を当時のものとしていた 1 件を修正し、反証 3 件を追加。数値の捏造は見つからなかった。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 7 / 9（bitcointalk 構想・ベータ・公開の 3 スレッド、PR Newswire、NewsBTC、Xaya Legacy、Bitcoin Magazine 2014 を WebFetch で再読。chronokings/huntercoin のコードと BlockchainGamer 2018 は再読せず）
- 直したこと:
  - steps（2014-01-27）: 「最初の 1 時間の返信の多くは『待っていた』『公開を楽しみにしている』」→ 実際は約 14 件で「注目している」「待っていた」「革新的」「分かりにくいが面白い」「Scrypt 対応を歓迎」などが混在、と正確化
  - channels existing-community: 「公開スレッドは採掘者の大半がマージマイニングしていると記す」→ 冒頭投稿は 2018-10-15 最終編集で、2014 年の状態か確かめられないと注記
  - after: wiggi が BetterQT を「作った」→ 2015 年に「開発を始めた」（NewsBTC の表現に合わせた）
  - counter: 「ゲームの内容への言及はほとんどなく」→ 期待表明が中心でゲームプレイの具体的な話はほとんどない、に修正
- 追加した反証: テストネットベータ初日の返信者（o3u、wiggi、cryptohunter、phelix など数人）はクラッシュ・同期・採掘コマンド・ASIC への不満・コイン要求が中心で、初期の担い手は採掘者・オルトコイン愛好者だった（src-huntercoin-beta-2013）
- 確認できなかったこと: ベータ参加者数、上位 5 人への配布の実施、Poloniex の取引開始日。プレスリリースの約 5000 人の定義
- 判定: 修正済み（重大な問題なし）
