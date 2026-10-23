# 検証記録: curio

- 確認日: 2026-10-23
- 確認した出典: 10／10（blog.curio.gg 7 本を取得し公開日を time 要素で確認、treaty-contracts を clone、組織プロフィール README を取得。組織のリポジトリ一覧 API はこの環境で不可）

## 直したこと
- src-curio-tech-overview の published: 2023-01-03 → 2023-01-02（ページの datetime 属性）。
- status.note: treaty-contracts の「2023-05 が最終更新」→ main の最終コミットは 2023-02-06、2023-05 は別ブランチの「improving for LLM codegen」。

## 追加した反証
- Keystone 告知の「Treaty はプレイヤーが政治的・社会的契約をスマートコントラクトとして展開できた最初のゲーム」に対し、2022-10 の OPCraft でプレイヤーが GovernmentSystem 等を展開して共和国を作った記録を対置（出典 src-curio-opcraft-part3 を追加）。

## 照合して問題なかった主な点
- シード 290 万ドル（Bain Capital Crypto, TCG Crypto ほか）、2022 年夏の海戦 RTS と「thousands of players」、EVM の限界の引用逐語、Go のゲームサーバー、受賞者 150 ドル保証、RTS の「clicking competition」と SLG 転換、registerTreatyTemplate に管理者制限なし、「Treaty bugs while launching」（コミッタ時刻 2023-01-30 PST）。
- プロフィール README「Makers of Duper」。

## 確認できなかったこと
- Treaty の本番チェーン・参加者数・展開された条約数、Duper の内容、「smart objects」の一次資料。

## 総合判定
重大な問題なし — 日付の軽微な誤り 2 件を修正し、「最初」主張への反証を追加。
