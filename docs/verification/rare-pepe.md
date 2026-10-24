# 検証記録: rare-pepe

- 確認日: 2026-10-23
- 確認した出典: 5 / 9（Directory の投稿ページ（curl）、TokenScan の asset / issuances、Wikipedia、新規の PEPECASH issuances。未確認: Directory の About・PepeCash ページ、rarepepewallet.com、Daily Dot）

## 照合結果
- 投稿ページ: 「SUBMISSIONS ARE CLOSED FOR THE FORSEEABLE FUTURE」「OVER 1700 RARES」、ロック・分割不可・100〜100k 枚、0.5 XCP、申請料 200 PEPECASH（週次調整）、半分を焼却、Telegram の @cardsubmitbot。一致。
- TokenScan: RAREPEPE はブロック 428919（2016-09-09 01:46 UTC）に 300 枚、428997 でロック、供給 298。一致。
- Wikipedia: 2016-09 に最初の Rare Pepe、36 シリーズ 1,774 枚、2018-01-13 のオークション 38,500 ドル。一致。

## 直したこと
- events 追加: PEPECASH 10 億枚発行（2016-09-17、ブロック 430263、09-27 ロック）と出典 src-rarepepe-tokenscan-pepecash。Directory の「流通約 7 億・約 3 億焼却」と整合

## 追加した反証・矛盾
- 探したが見つからなかった（RAREPEPE より前の「Rare Pepe」認定資産の有無も一次資料では確認できず）。参考: ERC-721 草案 #721 は Rare Pepe を「非代替性トークンではない」と区別しており、cryptokitties 側の関係注記を修正した。

## 確認できなかったこと
- 投稿締め切り日、Joe Looney の役割。

## 総合判定
重大な問題なし。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 7 / 11（Directory の PepeCash ページ（WebFetch は空のため curl で本文確認）と投稿ページ、TokenScan の RAREPEPE・PEPECASH 発行記録、Daily Dot、Wikipedia、CriptoNoticias。nft now の Looney インタビューは 403 で snippet のまま。acquisition は Looney インタビューを根拠に使っていないことを確認）
- 照合: PEPECASH 配布の q 逐語一致、約 3 億焼却、FoldingCoin、Twitter・Telegram での配布。RAREPEPE はブロック 428919（2016-09-09 01:46 UTC）に 300 枚、PEPECASH はブロック 430263（2016-09-17）に 10 億。Daily Dot（2017-02-21、Jay Hathaway）の 500 超・4,000 PEPECASH（約 13 ドル）・「Rare Pepe Traders」・q（Django Bates の発言）一致。Directory の「over 1700 rares」、Series 1〜36 一致。Wikipedia の 2018-01-13・38,500 ドル・MoMA / Met 関係者の来場一致
- 直したこと:
  - steps（2015）: Peppening が「ミームの希少性を壊す目的」の放出だったことを追記（Daily Dot）
  - src-rarepepe-tokenscan-issuances note: 発行アドレスと説明欄を追記
- 追加した反証: RAREPEPE と PEPECASH は同じアドレス 1GQhaWqejcGJ4GhQar7SjcCfadxvf5DNBD から発行されており、PEPECASH の初期配布は最初のカードの発行者側が自分の買い手に配ったものと読める（自然発生的な共同体形成という説明への対抗仮説。k: analysis）
- 確認できなかったこと: 「Mike」の身元、最初の 3 種の販売方法と買い手数、Telegram グループの開設日と参加者数（Wikipedia は「shortly after」とのみ）
- 判定: 修正済み（重大な問題なし）
