# 検証ログ: aavegotchi

- 確認日: 2026-10-23
- 確認した出典: 9 / 9（The Block は curl 403 だが WebFetch で本文確認し snippet→fetched。GitHub は raw の LICENSE/README と ls-remote）＋ 追加 1 件（aavegotchi-geist）
- 方法: 公式ブログ・ドキュメントの数値・権限記述を本文照合、リポジトリのブランチと README で Base 版の所在を確認

## 照合結果
- 2021-03-02 Haunt 1（Polygon、Chainlink VRF）、Rarity Farming 1.5M GHST/シーズン（「not a fixed amount」）、親密度 50 開始・1 日 1 減・channel で -2、REALM 最大 420,069・発行 5 万、diamondCut はマルチシグで「gradual decentralization」、SvgFacet での SVG 保存、Base 移転（2025-07-25、凍結・スナップショット・再 mint、所有者のいないコントラクト内の資産は移せず、REALM 等は後続）、すべて一致
- The Block: Snapshot で 95% 超の賛成（2025-04-08）

## 直したこと
- ev-aavegotchi-base-vote detail「95% 超または 93%」→ 93% の出典が見当たらないため削除し、95% 超と Geist 終了が投票結果にかかわらず決まっていた点を記載
- src-aavegotchi-theblock-vote: access snippet → fetched、note を本文に合わせ更新
- open_source: 「Base 版リポジトリは未確認」→ aavegotchi-geist（README「Aavegotchi Base Contracts」、MIT）で公開と確認。unknowns を更新
- admin: 凍結後も担保の引き出しと出品取り消しは可能と追記（公式 FAQ）
- necessity:「DAO 自身が『停滞』と書いている」→ 公式ドキュメントが「stale」と書いている（主体の誤り）

## 追加した反証
- counter_evidence: The Block は移転提案の背景として Pixelcraft の人員削減・資金の延命、L3 不振、Polygon PoS の TVL 停滞を挙げ、Geist 終了は投票と無関係に決まっていたと報道。公式ブログの説明（Base のインフラ・配布力）とは別の、経営判断としての説明

## 確認できなかったこと
- Base 版 Diamond のアップグレード権限の保有者（DAO 移管の有無）
- 利用者数・継続率

## 総合判定
修正済み — 重大な誤りはないが、出典のない「93%」を削除し、Base 版ソースの所在と移転の経営的背景（反証）を追加した。
