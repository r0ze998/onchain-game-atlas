# 検証ログ: mental-poker

- 確認日: 2026-10-23
- 確認した出典: 4 / 4（DSpace の OCR テキストと項目メタデータを API で取得、Rivest の bibtex、Goldwasser–Micali の PDF を pdftotext、Wikipedia の wikitext）

## 書誌の照合
- 技術報告: 表紙「MIT/LCS/TM-125」「February 1979」、内表紙「January 29, 1979」、本文冒頭「November 29, 1978」。DSpace 項目 1721.1/148953 のメタデータは dc.date.issued 1979-02、シリーズ MIT-LCS-TM-125（タイトルが「Metal Poker」と誤記）。取得したファイルは PDF ではなく OCR テキスト（MIT-LCS-TM-125.pdf.txt）
- 書籍収録: The Mathematical Gardner, David A. Klarner 編, Prindle, Weber, and Schmidt, 1981, pp. 37–43（bibtex と一致）
- Goldwasser–Micali: STOC 1982（ACM 0-89791-067-2/82/005/0365）。SRA を「MIT Technical Report, 1978」と参照。Lipton [10] は「How to Cheat at Mental Poker, Proceedings of the AMS short course on Cryptology, January 1981」
- 本文: Floyd による問題提起、Rabin の錠前の比喩、性質 (4)(5)、多人数化は「Details left to the reader」、結論のヒント、謝辞（Floyd・Rabin・Meyer）、いずれも一致

## 直したこと
- src-mp-tm125 note: OCR テキストであること、DSpace のハンドルとメタデータ（タイトル誤記を含む）を明記
- src-mp-gm82 note: 会議名・ACM 表記・Lipton の書誌を追記
- counter_evidence: 「元のプロトコルの具体的な暗号関数に弱点があったことを示す」→ GM 論文は「部分情報の非漏洩を証明できず、実装上の問題を Lipton が指摘した」と書いている、という記述に限定（Lipton の本文は未確認）
- unknowns: Lipton の書誌を追記

## 追加した矛盾
- contradictions: Wikipedia の脚注は「Technical Memo LCS/TM-125, MIT, April 1979」と記すが、表紙と DSpace は February 1979。DTIC 版（AD-A066331）は 403 で未確認（検索要約では January / March の受付印のみで April は見当たらない）

## 確認できなかったこと
- Lipton (1981) の本文、DTIC 版の書誌情報

## 総合判定
修正済み — 書誌は一次資料と一致。反証の言い過ぎを GM 論文の記述範囲に限定し、刊行月の資料間の矛盾を追加した。
