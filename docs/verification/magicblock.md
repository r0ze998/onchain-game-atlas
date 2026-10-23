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
