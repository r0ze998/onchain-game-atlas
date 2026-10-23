# 検証記録: satoshi-dice

- 確認日: 2026-10-23
- 確認した出典: 4 / 8（Bitcoin Wiki、SEC 命令 PDF（pdftotext）、Fed 論文要旨、Habr。未再読: bitcoin.org 0.8.2、uibk、arXiv サーベイ。99bitcoins は 403 で snippet）

## 照合結果
- SEC 命令: Voorhees が 2012-04 に立ち上げ、2012-08〜2013-02 の 2 回の売り出しで 50,600 BTC（当時約 72.3 万ドル）、2013-07 に 1 株 0.0035 BTC・計 45,500 BTC（約 380 万ドル）で買い戻し。一致。
- Bitcoin Wiki: FireDuck、2012-04-24 告知、1.90%、0〜65,535、2013-05 米国遮断、2014 年のオフチェーンのセッション、「spams the p2p network…」逐語一致。
- Habr: 126,315 BTC（約 1150 万ドル）、530 万件、390 万件超が当たり。一致。
- Fed: 小額取引の大半が同サービス関連（データ期間内）。一致。

## 直したこと
- src-satoshidice-sec-order note: 読み方（pdftotext）と USD 額を追記

## 追加した反証・矛盾
- 取引比率の矛盾: Wiki「他の全用途より多い」、サーベイ「半分超」、99bitcoins（snippet）は 2013-06 について 25%〜50% 超の幅で推計。出典 src-satoshidice-99bitcoins（snippet）を追加。

## 確認できなかったこと
- 秘密値ハッシュの事前公開、売却後の運営。比率の独立した一次計測。

## 総合判定
重大な問題なし。反証を 1 件追加した。
