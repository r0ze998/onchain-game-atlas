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
