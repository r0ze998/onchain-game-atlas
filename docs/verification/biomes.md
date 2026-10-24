# 検証記録: biomes

- 確認日: 2026-10-23
- 確認した出典: 25 / 29（新規追加 2 件を含む）。未再確認: src-biomes-docs-site（unreachable のまま）、src-biomes-experience-docs・src-biomes-app-registration・src-biomes-program-registration は本文個別には未再読（同リポジトリの clone で関連箇所のみ確認）。
- 方法: dustproject/dust を git clone（全ブランチ）、worlds.json の全履歴を追跡、AdminHook／Migration コミット・GuardianSystem・CHANGELOG・README を読解、PR 一覧 2 ページを取得、DUST Chain の公開 RPC を直接照会、dustproject.org の HTML を取得。

## 直したこと
- DUST Chain の 2026-12-31 停止: dustproject.org トップのバナーと /withdraw の meta description で逐語確認（「DUST CHAIN IS SHUTTING DOWN ON DECEMBER 31, 2026.」）。主張は正しい。外部報道は見つからず、一次告知はサイトのみ。
- Redstone 停止: 一次告知（Lattice の X 投稿、2026-04-14 17:20 UTC）を src-biomes-lattice-x として追加。告知日の食い違い（報道は 04-15）を contradictions に追加。
- ワールドアドレス: 「2024-04-28 から 2025-05 まで同一」→ worlds.json 上は 2024-04-28〜2025-02-18 に同一（0xf75b…）、2025-02-18 に記録から外れた。
- README の「アドレス不変」約束との矛盾: 2026-04 の移行で DUST Chain（55378）に同じアドレス 0x253e… が記録され、RPC でコードの存在も確認。アドレスは維持された、と constraints・contradictions を訂正（チェーン変更・停止告知との緊張は維持）。
- PR 作者: 「表示 25 件すべて dhvanipa」→ 全 34 件すべて dhvanipa（2 ページ確認）。
- Biocash PR: 「マージされていない」→ 未マージのまま open。
- レート制限: 「2025-09 導入」→ 2025-09-01 導入、09-30 にタイムスタンプ基準へ変更。
- trajectory: 「Lattice の最後のプロジェクト」は ChainCatcher の記述で TechFlow ではない → 出典を付け替え。TechFlow の原見出しを取得し title を更新。

## 追加した反証・矛盾
- counter_evidence: dustproject.org/what の「No admins. Just physics.」（q）と GuardianSystem（Guardian が一時停止、ROOT が再開・任免）の食い違い。contradictions にも追加。
- trajectory: main 外の base-deploy ブランチに 2026-07-27 のコミット 2 件があり、Base Sepolia（84532）上のワールドを記録（DUST Chain 停止後の移転計画の有無は未説明）。

## 確認できなかったこと
- Biomes 期ワールドの資産が DUST ワールドへ移されたか。DUST Chain 停止後の扱い。tenetxyz と Lattice の関係。DUST Chain の実利用量（RPC は稼働を確認したのみ）。

## 総合判定
修正済み。DUST Chain の停止日は一次資料で確認。ワールドアドレスの経緯に事実誤認があり、README の約束との矛盾の書き方を実データに合わせて訂正した。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 6 / 15（BuidlGuidl の作業記録、Bankless、Race to Mainnet、Redstone is Live、Winding Down、Composability Day Wiki。PR 一覧・Devcon 7・DUST 関連・報道は今回再取得せず）
- 直したこと:
  - steps（2024-04）: 「開発者プレビューに Biomes チームが参加し」→ 開発者が「5/1 の mainnet 公開に向けた準備」を作業記録に書き、Lattice は Biomes を「5 月に来る」作品に挙げた（プレビュー中の展開は明記なし）
  - steps（2024-05）・channels.platform-distribution: 「Worlds Expo に公開／初期タイトル枠（Worlds Expo）」→ 2024-05 に公開。Expo での特集日は未確認。作業記録の「Launched Biome-1 to Redstone mainnet with 4 experiences」は 2024-05-22 付
  - channels.existing-community: 「OPCraft の世界とファン（開発者自身を含む）」→ OPCraft を引き継いだ開発者自身（OPCraft プレイヤーの移入は未確認）
  - 15 ETH（8＋7、17 回・14 回）、Bankless の 0.01 ETH・Settlers Union・2024-10 アルファは原文どおり
- 追加した反証: 「OPCraft fans」は開発者チームを指し、OPCraft の約 2000 人が 1 年半後の Biomes に移った資料はない。既存コミュニティからの移入は開発者側でしか確認できない
- 確認できなかったこと: 2024-03 のプレイテスト参加者数、Settlers Union の作り手
- 判定: 修正済み（Redstone 関連の過剰な記述と、既存コミュニティの範囲を訂正）
