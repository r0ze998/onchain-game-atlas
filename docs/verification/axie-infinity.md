# 検証ログ: axie-infinity

- 確認日: 2026-10-23
- 確認した出典: 52 / 52（検証時に Naavik を 1 件追加して 53 件）。運営ブログ 35 本・白書 9 ページ・Rekt・BleepingComputer・Gulf News（Reuters）・Forkast・CoinGecko PDF / API は curl で本文取得。The Block 2 本と GitHub 組織ページは curl では 403 だが WebFetch で本文確認
- 方法: 運営ブログの公開日を JSON-LD で照合（全件一致）。CoinGecko API を再取得して価格を照合

## 直したこと
- status.note「Classic は競技シーズン 16 のオフシーズン」→ 出典（lounge 2026-10 ほか）に記述がない。同記事にある「Classic の IP を Axie Foundation に移す手続き中」に置き換え（出典にない内容）
- retention_evidence「Classic は競技シーズン 16 まで続いており」→ 同上の理由でシーズン番号を削除し、未確認と明記
- before_after「Ronin 以後、Axie の移転・繁殖・SLP 請求の頻度が上がった」(fact) → Ronin 公開記事は Land・アイテム移行の告知で、頻度の記述はない。削除し、データ未確認と明記
- retention_evidence / metric m-axie-dau-peak-reuters「元データの出所は記事内で不明」→ 記事は Cryptogambling.tv と明記している。nature を reported → estimated（第三者推定）に
- constraints の MMR:「オフシーズン中も MMR が上がり続けたため」→ 運営の説明は「プレイヤー数の増加に伴う MMR インフレ」で、40% はシーズン 19 の初日から最終日の変化。告知前のリセットを運営が誤りと認めた点も追記
- constraints のトレジャリー「2025 年時点でもコミュニティが資金を使う仕組みはない」→ 2025-06 時点の記述。2025-12 までに AIP-003 / 004 でトレジャリー資産のステーキングが投票にかけられており、古くなっていた
- counter_evidence「AXS・SLP の最高値は市場全体のピークと近い」→ SLP の最高値（2021-07-13）は AXS より約 4 か月早く、市場上昇中に SLP だけが下落していた。市場要因説への反証として書き直した（市場ピークの日付自体は出典なし）
- metric m-axie-scholar-split の value_text「スカラー 50〜70%」→ Reuters の例はスカラー 40% で範囲外。並記に修正
- relations pixels の note「Pixels は Ronin に移転した」→ 出典に記述なし。削除し、原文の「Pixel's free-to-play onboarding」を記載
- unknowns の bAXS 導入時期: S19 告知が「bAXS で報酬を配る 3 シーズン目」と書くので S17 からと判断できる旨を追記
- unknowns / offchain の対戦判定: 第三者の Naavik が「Sky Mavis のサーバーが戦闘結果を計算する」と書く記述を追加（src-axie-naavik-df）

## 追加した反証・矛盾
- retention_evidence（analysis）＋ metric m-axie-ronin-daa-2021-10: 同じ 2021-10 の運営発表で、DAU 200 万超に対し Ronin 日次アクティブアドレスは最高 428,536。DAU の大半はチェーン上に現れない活動。ただし水増しの証拠ではないことも明記
- compare.persistence: Ronin Waypoint ウォレットの終了で、移さない資産はアクセス不能になり得るという運営の告知（「NFT はチェーンに残る」の限界）
- contradictions: Reuters 配信記事の「SLP は 2022-02 のピークから 99% 下落」と、CoinGecko の最高値 2021-07-13 の矛盾

## 確認できたこと（主なもの）
- 運営発表の数値（3.8 万→200 万超→250 万超、22 億ドル、45 億ドル TVL・200 万ウォレット、1.52 億ドル、1.5 億→1,100 万ドル、173,600 ETH＋2,550 万 USDC、MAU 220 万、保有アドレス 260 万、30 日 18 万人、DAA 8.7 万・MAA 15.5 万（21 万超）、App.axie 2,560 万ドル、トレジャリー月 30 万ドル、約 2,300 万 AXS・9.6 万 RON、SLP 約 414 億・上限 440 億、2.8% デフレ、発行 4 倍、1.3 億＋4,500 万 SLP 削減、MMR 別 SLP 18 / 6）は本文で一致
- The Block の 1 日約 1.87 億 SLP（330 万ドル）、Zirlin の「we're acting as the bankers」、CoinGecko 調査の 1,500 ドル・50〜70%、YGG 70/20/10、Rekt の 9 中 5 署名・4 鍵・6 日・許可の未取り消し、FBI の Lazarus / APT38 帰属は一致
- CoinGecko API の再取得値（SLP 0.00055352 / 最高値 0.399727 2021-07-13、AXS 1.019 / 最高値 164.9 2021-11-06）は一致
- q 引用 12 件は逐語一致
- 白書: 2018-10 の放置型バトル、2019-12 の Classic、「first game ever to distribute in-game resources as ERC20 tokens」、P2E に完全分散は不要、2.7 億 AXS、DAO 移行基準（1,000 万 DAU・週 5%・外部 3 チーム各 10 万 DAU）は一致
- GitHub 組織: 64 リポジトリ。表示された 30 件にゲームサーバー・戦闘ロジックはなく、open_source: partial と整合

## 確認できなかったこと
- 運営ブログの 2025-12〜2026-06 の欠落分（調査役の記載どおり）
- GitHub 組織の 2〜3 ページ目（34 件）の内容
- Ronin の公式事後報告（roninchain.com）
- 「DAU」の定義、スカラー総数、ボット比率（変わらず unknowns）

## 総合判定
修正済み — 出典にない記述 3 件（Classic のシーズン 16、Ronin 後の頻度増、Pixels の Ronin 移転）、出典の読み違い 2 件（Reuters の数値の出所、MMR の原因）、古くなった記述 1 件（トレジャリー）を修正し、反証・矛盾を 3 件追加。重大な捏造は見つからなかったが、補った記述が出典の範囲を超える傾向があった。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 15 / 26（acquisition から参照される出典のうち、新規追加分を中心に再取得）。Lunacian #1（2019-03-11）、Community Alpha（2019-12-19）、Zima Red 要約、Rise Of A Nation（2020-12-30）、Unchained 書き起こし、a16z（2021-08-19）、BlockchainGamer.biz 2 本、Series A・B、Season 20、Funding Secured（2019-11-07）、PvP Season 1（2020-02-16）、Friends and Family（2020-02-06）を開き直した。数値（3,284→27,716、594→18,790、523→23,224、4.1 万・4.5 万、1,465,000 ドル、1,200 ETH、900 体・293 ETH、400 人近く、4,700+・860 万ドル超）と逐語引用 2 件はすべて原文と一致。
- 直したこと:
  - steps pre「2018-02 にプレセール」→ date を "2018" に。Series B は Axie の誕生を 2018-02 とするだけで、プレセールの月はどの出典にもない。
  - steps 2019-03「Discord で Axie Scholarship を案内」→ 原文の逐語 q を付け、語の中身が未定義で 2020 年以降の貸与型と同じかは確認できないと明記。channels scholarship-guild・community-server も同様に弱めた。
  - channels existing-community「プレセール購入者もこの層だった」→ 削除（Zima Red 要約は「original Axie community came from the CryptoKitties community」のみ）。
  - channels invite-gating「段階的な開放だった」→ 原文どおり「3 体以上の保有者のみ、6 か月の反応を見て一般層へ、紹介機構と無料 Axie を開発中」に。
  - steps 2020-02「上位 25%・ドロップ 75%」→ 賞金の 25% を順位表・75% を試合ドロップ（プレイヤーの上位 25% ではない）。
  - steps 2019-11「シードを調達」→ 原文は seed の語を使わないため「調達」に。
- 追加した反証: 2020 年後半の Alpha テスター増は、2020-10-26 発表の AXS の「過去のプレイ実績スナップショット配布」への期待とも重なり、報道・スカラーシップ由来の流入と運営の週間テスター数からは区別できない（counter に追加）。
- 確認できなかったこと: 2020-08 の CoinDesk 記事本文（検索でも本文に到達せず、ETHDenver 等の本人側プロフィールが「当時 DAU 500 未満」と書く自己申告のみ）、プレセールの開始月・販売数・紹介トークン配布数、2019 年の「Axie Scholarship」の実態。
- 判定: 修正済み（重大な捏造なし。2019-03 の「Scholarship」を後のスカラーシップと同一視しかねない書き方を是正）。
