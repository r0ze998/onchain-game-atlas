# 検証ログ: magicblock

- 確認日: 2026-10-23
- 確認した出典: 7 / 8（docs 2 ページを WebFetch と .md で取得、arXiv API、bolt・magicblock-validator を clone、Pulse 2.0 を WebFetch）。src-mb-docs-whitepaper と src-mb-github-org は今回再取得していない
- 方法: 主張（10 ms、手数料、バイトコード互換、Security Committee）を本文と照合、BOLT の非推奨化の日付を git 履歴で確認

## 照合結果（一致）
- arXiv 2311.02650: 初版 2023-11-05、v4 2025-02-14、著者 Picco・Fortugno
- ER の流れ（Delegation Program への所有者変更、operator によるコミット、委任解除）、公開バリデータ（Asia/EU/US/TEE）、Security Committee の文言
- 「down to the bytecode」互換、10 ms、minimal or zero-fee、毎秒数百万取引（いずれも計測なしの主張）
- 資金調達: 750 万ドル（2025-04-24、Lightspeed Faction）、前回 300 万ドル（2024-09、a16z CSX）、Supersize 等の例
- BOLT: 非推奨・保守停止、MIT。validator: BSL 1.1

## 直したこと
- src-mb-docs-intro の title を実際のページ名「Why MagicBlock?」に修正し、note に主張の原文と計測根拠なしを追記
- BOLT の非推奨告知の日付（2026-05-28 の README コミット、以前の最終コード変更 2025-10-19）を確認し、event ev-mb-bolt-deprecated を追加、unknowns を「理由」に限定

## 追加した反証
- counter_evidence: 論文要旨は「信頼の仮定を妥協しない」と述べるが、現行文書は確定を構成不明の Security Committee に委ね、公開バリデータは MagicBlock のエンドポイント。委任中は基盤層と同じ信頼モデルとは言えない

## 確認できなかったこと
- Delegation Program の権限、Security Committee の構成と不正証明の実装状況、ER 上のゲーム数・利用者数、創業時期

## 総合判定
修正済み — 軽微（出典名の誤り、日付の追加）。数値・資金調達・ライセンスは出典と一致。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 18 / 20（itch.io の第 1 回ジャムページとブログ一覧は今回未再取得）
- 直したこと:
  - pre の step（arXiv）: 「技術的な関心を集めた」を削除（因果の根拠がない）→「問題設定とした（論文が開発者を呼んだ資料はない）」
  - growth の step（Speedrun 3）: メイン賞金の条件は「公式サイトの作り方」ではなく、公式サイトがリンクする MagicBlock のドキュメント（docs.magicblock.gg/Forever Games）の作り方だった
  - counter: 「MagicBlock の利用は必須ではなかった」→「MagicBlock のドキュメントにある作り方に沿うことが条件だったが、リンク先は今の文書に替わっていて、技術の利用が必須だったかは確認できない」
  - counter（Supersize）: 「ハッカソン前から MagicBlock を選び」は記事の Lewis の発言にない。「開始前に作るものを決め devnet で MVP を動かしていた。MagicBlock の採用時期は記事に明記がないが、2024-10-04 に採用事例として紹介済み」に直した
  - cost（第 1 回 Speedrun）: 「一部は Cubik のマッチングプールで管理された」→「賞金の一部と提出物は Cubik で管理され、寄付には 8,000 ドル相当のプールからマッチングが付いた（2.5 万ドルに含まれるかは不明）」
  - growth の step（Solana Blitz）: 「週末ハッカソン」→「短期ハッカソン（V7 は 8/3〜9。ページは week-long とも weekend とも書く）」
- 追加した反証: 第 3 回 Speedrun では他社の特別部門の賞金（Gameshift 4 万ドル相当、Metaplex 5 万 MPLX など）がメインの 1 万 USDC を上回り、MagicBlock 自身の部門はアクセラレーター枠 1 件だった。参加者を呼んだのは他社の賞金だった可能性がある
- 照合済み: Unity SDK の q（原文どおり）、Speedrun を「first-ever Game Jam on Solana」とする記述、22 件・2.5 万ドル、Luma の 2 部門、itch 3 の 29 件、Radar（1 万人超・1,359 件、MagicBlock はスポンサー、Supersize に 3 万 USDC）、プレシード 300 万ドル・a16z CSX 2024 春期・開発者アウトリーチ、Pulse 2.0 の 750 万ドル、Incubator の日程、BOLT の 2026-05-28 の非推奨告知（clone で確認）、arXiv v1 2023-11-05
- 確認できなかったこと: 第 3 回メイン部門の要件の中身、ER を使ったゲームの総数
- 判定: 修正済み（強い表現と出典の読み違いを 6 件直した）
