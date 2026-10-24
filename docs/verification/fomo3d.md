# 検証ログ: fomo3d

- 確認日: 2026-10-23
- 確認した出典: 17 / 18（未確認は src-fomo3d-survey-ponzi-snippet。もともと snippet 扱い）。加えて公開 RPC（eth.drpc.org）でブロック時刻・作成取引・引き出し取引・残高を照合し、reedhong/fomo3d_clone を clone してパラメータ（rndInit_/rndInc_/rndMax_、48%/2%、fees_、potSplit_、airdrop の乱数、activate の 5 アドレス、1 ETH 制限）を確認した。

## 直したこと
- before_after: 「Reddit の The Button」→ 削除。引用元（Hackernoon・ethresear.ch）に The Button の言及がない。消耗戦・ドル・オークション（Hackernoon の脚注）に置き換え。
- counter_evidence[0]: 「複数の独立分析（Solmaz、SECBIT、SoK）」→ SoK は Solmaz・SECBIT・匿名ブログを引用しており独立ではない、と修正。Vice の開発者発言だけを取り出すと誤解を招くため、同記事が伝える運営 Discord 告知（「ブロックチェーンを詰まらせて締め出した」）も併記。
- counter_evidence: ethresear.ch の流動性懸念「実際にはそうならなかった」(k: fact、出典は 2018-07 の議論のみ) → k: analysis にし、根拠に Vice・Solmaz を追加。
- counter_evidence: INSIDE「P3D が下落」→ 原文どおり「P3D 側の ETH 残高が約 8 万から約 5.5 万 ETH に減った」。
- trajectory: 第 2・3 ラウンドについて Solmaz の表がブロック詰め用コントラクトを挙げている点を追記。第 3 ラウンドの終了をブロック 6507774（2018-10-13 14:12:45 UTC）と特定し、event `ev-fomo3d-r3-end` と metric の period を更新。unknowns から「第 3 ラウンドの終了日」を外した。
- unknowns: 第三者リポジトリと Etherscan 検証済みソースの同一性が未照合であることを追加。
- sources: src-fomo3d-yacn の題 「The Tale of Fomo3D」→ 「Front Running Ethereum（節 The Tale of Fomo3D）」。contradictions の「架空の人物」→「実在の勝者を仮名 Mallory で呼ぶ」。
- sources: SoK の note に依拠資料と v3（2019-04）を追記。

## 追加した反証・矛盾
- BTC-Echo（2018-09-04）: 該当ブロックは複数のプール（SparPool、BitClubPool、Nanopool、Ethermine）が採掘 → TNW の「採掘者が検閲」説と Justin Drake の「採掘者が勝つ」予想に反する。
- 矛盾: SECBIT は 10-09 に第 3 ラウンドのプール約 103 ETH、Solmaz は 10-13 終了の賞金 376 ETH（48% なら終了時プール約 780 ETH）。4 日で 7 倍以上となり、定義の違いの可能性。

## 確認できたこと（主なもの）
- 10,469.66 ETH の withdraw（ブロック 6191962、送信者 0xa169…）、デプロイ（ブロック 5915466、2018-07-06 11:17:45 UTC、作成者 0xF39e…）、残高 1,094.46 ETH、取引 246,135 件（Etherscan と RPC）。
- 第 2 ラウンド 3,264.668 ETH・33 日（SECBIT）、終了取引ブロック 6391548 = 2018-09-24 15:35 UTC（RPC）。SECBIT の「北京時間 11:32」は PM と読めば整合。
- Vice 21,811 ETH、Finance Magnates 21,515 ETH と q の逐語、ethresear.ch 17,000 ETH 超、Hackernoon の 8/2 時点未検証の注記。

## 確認できなかったこと
- Etherscan のソースタブを直接読めず、第三者リポジトリと実デプロイの一致は未照合。
- F3DexternalSettings の中身、Team JUST の受取総額、SECBIT の 18,000 / 40,000 の定義（Hackernoon 版は「persons」、Odaily 版は「participations」）。
- TNW が伝える Team JUST の祝福ツイートの本文（記事に引用なし）。

## 総合判定
修正済み。重大な捏造はなく、数値・日付・ブロック番号はオンチェーンと一致した。ただし反証欄に、出典に無い内容（The Button、流動性懸念の帰結を fact 扱い）と独立性の過大評価があり、修正した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 9 / 11（acquisition から参照される出典）。reedhong/fomo3d_clone を再 clone して FoMo3Dlong.sol の distributeExternal（紹介料 `_eth / 10`、名前未登録・自己紹介なら P3D へ）、PlayerBook の registrationFee_ = 10 finney、buyCore の「early round eth limiter」（round eth < 100 ETH の間、1 人 1 ETH）、Hourglass の masternode（100 トークン保有、配当手数料の 1/3）を確認。BTC-Echo 07-24（5,200 超・2,700 ETH・22.17 ETH）、ethresear.ch、SECBIT（Hackernoon）、Finance Magnates、Hackernoon 07-23、exitscam.me を再取得。INSIDE は 403 で再確認不可、Etherscan・Vice・TNW・Solmaz は前回検証済みのため今回は開き直していない。
- 直したこと:
  - summary: 「ethresear.ch・報道が 2018-07 下旬の急増を重ねたと見られる」→ 急増（07-19〜21）は議論・報道より前で、両者は急増への反応だった可能性が高い、急増の原因は特定できない、に変更。
  - counter[0]: 「議論と重なるがどちらが先か判別できない」→ ethresear.ch の初投稿自体が「mostly in last two days」と書いており議論は急増の後、と修正（逐語 q 付き）。
  - steps launch: 「最初の 100 ETH まで 1 人 1 ETH、大口独占を防ぐ」→ コードどおり「各ラウンドで」100 ETH まで、超過分は本人残高に戻る、狙いはコードに書かれていない、に修正（狙いは lessons の analysis にのみ残す）。
  - channels referral: 出典に exitscam.me（逐語 q「Clever players can recruit others.」）と Finance Magnates（shill kit への言及）を追加。
  - channels prize-competition: 「賞金そのものが参加理由になった」(fact) → 賞金があった事実のみ fact とし、動機は測れないと明記。
  - metric m-fomo3d-r1-participations の definition: Hackernoon 版の「18,000 persons and 40,000 ethers」の表現と、日次か累計かも不明である点を追記。
- 追加した反証: ethresear.ch 初投稿の「mostly in last two days」により、議論が流入を起こしたという説明は否定される（counter に統合）。BTC-Echo は勧誘・紹介の仕組みを書いておらず、Finance Magnates も紹介制度の効果を示していない。紹介制度の寄与は依然 unknown。
- 確認できなかったこと: INSIDE（403）の 07-28 短期版 9,800 ETH（claim のまま）、中国語圏 SNS での拡散時期、紹介経由購入の比率。
- 判定: 修正済み（調査役のコード確認は正しい。因果の表現を analysis 側に寄せ、ethresear.ch との前後関係を原文で確定した）。
