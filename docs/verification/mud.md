# 検証記録: mud

- 確認日: 2026-10-23
- 確認した出典: 11／11（Lattice ブログ 4 本・Winding Down を取得、latticexyz/mud を clone して docs・CHANGELOG・監査ページ・全ブランチ履歴を確認、npm registry の time / dist-tags を取得）

## 直したこと
- status.note: 「公開リポジトリの最終コミット 2025-09-30」→ main は 2025-09-30 だが、非 main ブランチでは 2026-04-10 まで DUST 向けの entrykit・store-sync・cli（mirror 移行ツール）の更新が続き、npm にもブランチ名タグの 2.2.24 系スナップショットが 2026-04-10 まで公開された旨を追記。コア world/store は 2025-10 以降変更なし。
- offchain（ERC-4337 バンドラ等の標準化表明）: 出典 winding-down には該当記述がない → src-mud-standardizing を追加（同記事に ERC-4337 と標準化方針の記述あり）。
- src-mud-repo / src-mud-npm の note を更新。

## 追加した反証・矛盾
- contradictions: Winding Down の「DUST 開発中に MUD を変更する必要がなかった」と、2026-01〜04 の周辺パッケージ改修の併存（コアは無変更）。
- counter_evidence: 「機能完成」は周辺ツール込みの保守不要を意味しない。

## 照合して問題なかった主な点
- npm: solecs/recs 作成 2022-09-13、1.0.0 は 2022-09-27、world 作成 2023-03-03、2.0.0 は 2024-03-21。CHANGELOG の 2.0.0 = Thu Mar 21 2024、2.2.23 = Mon Aug 25 2025。
- 監査 2024-02-11 OpenZeppelin。address(0) への所有権移転で凍結（プロキシ除く）の逐語確認。
- registerSystem 脆弱性: 2023-09-12 発見、2.0.0-next.8 で修正、既知チームへ非公開連絡。
- v1 の Go 製インデクサ・ストリーミングサービス（engine ブログ）。

## 確認できなかったこと
- MUD World の総数、所有権を放棄した本番 World の例、解散後の保守体制。

## 総合判定
修正済み — 日付・数値は正確。リポジトリ活動の記述と出典の付け違い 1 件を修正。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 11 / 14（ETHGlobal 告知・prizes、Lattice RetroPGF 3 申請 JSON、Winding Down、MUD from zero to v2、Devcon 6 講演概要、OP in Bogotá、OPCraft 発表、Race to Mainnet、MUD v2 is ready、Redstone is Live、Composability Day Wiki を Notion API で再取得。engine-blog・devcon6-sls・リポジトリは今回再確認せず）
- 直したこと:
  - steps（pre）: 「Dark Forest を中心とするコミュニティ（後の 0xPARC）」→ 括弧を削除（出典は 0xPARC と同一視していない）
  - steps（2024-04）: 「Small Brain Games…GG Quest などが公開前に mainnet へ展開した」→ 「5 月に Redstone に来る」作品として挙げた（記事は各チームの事前展開を書いていない）。Composability Day は「ハッカソン」ではなく Wiki で、ハッカソンの案内は Downstream の欄のみと明記
  - channels.hackathon: 「MUD を指定フレームワークにし」→ 告知は MUD を参加要件にしておらず、Optimism・Lattice の部門賞が名称に MUD を掲げた
  - lessons: 「フレームワーク指定のハッカソン」→「フレームワーク推奨のハッカソン」
  - unknowns: 作品一覧に 100 件超がある旨を追記
  - 調査役の contradictions（総額 5 万ドル vs 部門賞合計 2.5 万ドル、RetroPGF 申請のスポンサー表記）は原資料どおり。維持
- 追加した反証: ETHGlobal の作品一覧（新出典 src-mud-ethglobal-aw-showcase、4 ページ取得）には 100 件超が並び、ToDo アプリ・学習用デモ・非ゲームが多い。Lattice 申告の「69 作品」と定義が合わず、提出数を獲得した開発者数として読めない
- 確認できなかったこと: 69 件の根拠の表計算シート、作品一覧の正確な件数（ページ境界の重複があり 108〜111 件程度）、Devcon 講演動画本編
- 判定: 修正済み（強い表現 2 件と出典の読み違い 1 件を訂正。数値の誤りなし）
