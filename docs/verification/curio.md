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

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 9 / 9（tech-tricks、community-sept、phase1、treaty-guide、diplomat、keystone、theblock-seed、theblock-2024 を取り直し。seed は既存記録）
- 照合: 引用（"Thank you to the 500+ players who tried it out!"、"we will soon onboard a group of core community members…"、"Winners are guaranteed with $150 USD."、"thousands of players interacted with our game"）は逐語一致。290 万ドル・570 万ドル・累計 870 万ドル、Duper の 5 人、Discord とニュースレターへの誘導も一致
- 調査役が追加した contradictions（初期の人数）について: 3 つの数字は実在する。ただし対象が違う可能性がある。tech-tricks の「500+ players who tried it out」の "it" は、2 つのデモの合計かどちらか一方かを書いていない。The Block の 200〜300 人はゲーム名を書かないまま、同じ記事で Treaty を「最初のゲーム」と呼んでいる。Keystone の「数千人」は 2022 年夏に専用のアプリチェーンで公開した海戦 RTS についての記述。contradictions はそのまま残し、反証と metrics の定義に注記した
- 直したこと:
  - steps 2022-08-11:「最初の 2 つのデモについて 500 人超が試した」→ 2 つのデモのフィードバックを集めていると述べつつ、500 人超への謝意は対象を明示していない、と書き直し
  - metrics m-curio-demo-players-2022 と m-curio-trial-players-2023 の definition に、上の対象の不明確さを追記
- 追加した反証: 3 つの数字は別のゲーム・期間を数えている可能性がある。「数千人」は Keystone への転換を告げる記事での運営の振り返りで、独立した計測ではない
- 確認できなかったこと: 中核コミュニティの人数と選び方、コンテストの応募数、Treaty の参加者数。ボットや多重アカウントに関する資料は見つからなかった
- 判定: 修正済み（軽微）
