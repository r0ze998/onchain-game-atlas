# 検証記録: cryptokitties

- 確認日: 2026-10-23
- 確認した出典: 19 / 26（WebFetch・curl・git clone・JSON-RPC で本文を確認。未確認: hackernoon、decrypt-flow-2020、kittyhats、etherscan-code、etherscan-genescience-current、sourcify-genescience、crowdfund（snippet のまま）。bloomberg は 403 で snippet のまま）

## 再現した on-chain 値
- publicnode で eth_call を再実行（2026-10-23 07:57 UTC、ブロック 26253974）。totalSupply 2,025,808 / gen0CreatedCount 34,928 / promoCreatedCount 3,087 / paused false / autoBirthFee 0.008 ETH / secondsPerBlock 12 / geneScience 0x4fcf…04fa / newContractAddress 0x0 / saleAuction 0xb169…7d8c の ownerCut 375。全値一致。
- Etherscan の累計 5,042,215 件、直近の Breed With Auto を確認。
- Sourcify の KittyCore ソースで GEN0 45000・PROMO 5000・secondsPerBlock 15・autoBirthFee 2 finney・クールダウン表・「50k」コメントを確認。bounty リポジトリのライセンス（review and educational purposes ONLY）を確認。

## 直したこと
- src-ck-rpc-state note: 値のみ → 再現方法（セレクタ、latest、ブロック番号・時刻）を追記
- m-ck-total-supply-2026 definition: 再現ブロックを追記
- admin detail: 「ownerCut 375 に更新されていた」→ TechCrunch 2017-12 も 3.75% と報じており当初値とみられる、と修正（secondsPerBlock のみ 15→12 の変更）
- contradictions 公開日: Bloomberg（snippet）の「11/28 デビュー」、Frontiers のデータ期間開始 11-23 を追記し、ConsenSys の「2017-10」は ETHWaterloo の可能性と注記
- contradictions 運営収入（TechCrunch は最初の 100 匹だけ）→ 削除。TechCrunch は「25 分ごとに生成される猫」と 3.75% 手数料も挙げており矛盾ではなかった
- contradictions 追加: Flow 移行の発表時期（報道 2020-05 vs Wikipedia 2021-03）
- network share: 検証役の標本計測 m-ck-share-sample-2017-12 と出典 src-ck-rpc-share-sample を追加。counter_evidence・contradictions・unknowns を更新
- src-ck-wikipedia note: 「2022 年の取引減少」→「販売減少（1 日 100 件未満）」等に具体化
- src-ck-eip721-issue note / relation rare-pepe note: 草案は Rare Pepe を「非代替性トークンではない」と区別していた点を反映（「先行例として挙げた」は不正確）

## 追加した反証・矛盾
- 標本計測（各日 200 ブロック、KittyCore と 2 オークションへの直接取引）: 12/2 約 6.5%、12/3 約 11.9%、12/4 約 17.2%、12/5 約 20.7%、12/6 約 11.4%、12/9 約 20.3%、12/10 約 17.4%。報道の 11〜15% と整合、Wikipedia の約 25% は再現せず（ただし内部呼び出し除外・標本のため過小の可能性）。
- Flow 発表時期の矛盾。

## 確認できなかったこと
- Wikipedia の約 25% の出典、ETH Gas Station の原データ。
- 現行 GeneScience への差し替え時期。Hacker Noon の画像ホスト記述は再確認していない。
- 標本計測は全ブロック集計ではない。

## 総合判定
修正済み。数値（eth_call）は再現でき重大な誤りはなかったが、TechCrunch に関する矛盾の誤記と ownerCut の「更新」表現、EIP 草案の Rare Pepe の扱いを修正した。
