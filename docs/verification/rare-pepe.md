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
