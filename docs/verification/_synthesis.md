# 検証記録: 統合層（insights / questions / hypotheses / eras）

- 確認日: 2026-10-23
- 対象: data/insights.yaml（15 件・修正後の証拠 90 件）、data/questions.yaml（8 問・修正後の事例 50 件）、data/hypotheses.yaml（5 件）、data/eras.yaml（5 時代・changes 15 件）
- 方法: 全 evidence / cases / changes の出典 id について、現行（検証後）のエントリの sources[].note と、その出典を引く本文・metrics・counter_evidence・contradictions を抽出して照合（スクリプトで一覧化）。各エントリの検証ログ（docs/verification/*.md）の「直したこと」と突き合わせた。原 URL は Lattice「Winding Down」を curl で再取得し、Sky Strife への言及が謝辞と列挙だけであることを確認。その他は検証役が取得済みの記述に依拠した。
- 追加の機械検査: 各 evidence の出典 id が、その `game` のエントリの sources に実在するか（不一致 0）、access が fetched か（不一致 0）。`node scripts/validate.mjs --quiet-warnings` は 0 errors（警告 9 件はいずれも各エントリの未引用出典で、統合層とは無関係）。

## 直したこと（before → after）

### insights.yaml
- ins-permissionless-ext-unused claim: 「確認できた拡張の多くは運営チームや出資・提携先の作」→ 運営自身の作が大半、Downstream の外部 3 作は作者が Playmint 外（1kx のみシード投資家）だが運営リポジトリに取り込まれ本番利用の記録なし
- 同 biomes: 「PR はほぼ同一開発者」「マージされなかった」→ 全 34 件が同一開発者、Biocash は未マージのまま open
- 同 downstream: 「外部作例 3 件は投資家・提携先の作」→ 作者は Playmint 外、1kx のみ投資家、Tonk・RockawayX の関係は未確認、元リポジトリはメインネット前で停止
- 同 loot（counter）: 「多くは告知やミントで止まった」→ 1 年後も主要派生は開発・提案段階（Decrypt）。100 超の根拠として src-loot-nonfungible-2022 を追加
- ins-trust-boundary downstream（counter）: 「CEO は god mode がないと述べた」→ 報道の地の文の言い換え＋CEO 寄稿の「digital physics are immutable」と明記
- ins-trust-boundary: pixelaw の counter を追加（呼び出し元偽装の可能性でフックが境界として働かない恐れ。未実行の推定）
- ins-host-dependency claim: 「Sky Strife と Downstream は…世界ごと失われた」→ Redstone は 2026-05-15 停止（告知 2026-04-14 の X 投稿）、両世界は移行記録がないことから失われたとみられる（終了を明言する一次資料なし）。DUST は別チェーンへ移したと追記
- 同 sky-strife: 「終了の直接要因は…（Lattice の説明）」→ Winding Down は Sky Strife に触れず、喪失はクライアントの参照先と停止からの推論（出典に redstone-claim・play-client を追加）
- 同 downstream: 「停止で世界と拡張が失われた」→ 「失われたとみられる（移行記録なし）」、出典に lattice-x・repo を追加
- 同 pirate-nation: 金額の食い違いは 1 チェーンあたりと合計の差で説明し得ると補足
- 同 conquest-eth: stance counter「2022 年から版を重ねて続いている」→ context「コントラクトは残るが 2025-10 以降ほぼゼロ（dormant）」、出典に gnosis-logs
- 同: biomes context を追加（DUST は 2026-04-06 に同アドレスで DUST Chain へ移行、移行先も停止告知）
- 同 confidence_reason: Sky Strife・Downstream の喪失が推論である旨を追記（high は維持）
- ins-public-state-automation fomo3d: 「複数の独立分析」→ Solmaz と、それを引用する SoK（独立でない）
- 同 sunflower-land: 「全行動をオンチェーンにした初期版」→ 旧作の設計は資料間で食い違う旨を明記
- 同 pixels: 「約 7 割」に「見出し 69%、本文の数値で約 72%」「回復はボット適応と GamesTX が推測」を明記
- 同: dark-forest counter を追加（R1 2 位はほぼ手動）。confidence_reason に Fomo3D 分析の相互引用・SFL の資料食い違いを追記
- ins-reward-metrics-misread claim: STEPN「運営発表と第三者推定が大きく動いた」→ Dune の MAU が 9 割以上減少
- 同 pixels: 「約 69% 減少」→「90 万超→25.2 万（見出し 69%、本文約 72%）」、運営→運営 CMO
- 同 sunflower-land: DappRadar と DAU の比較は Naavik の記述で、DAU は同期取引ベースと明記
- 同 stepn: 「運営発表と Dune が別系列で…連動して見える」→ Dune MAU 70 万超→4.5 万弱、GST 下落、連動は時期の一致からの推測
- 同 ai-arena: 「確認できる最大の参加」→「確認できた参加の数値」
- 同 axie（counter）: 「Origins と Classic のシーズンは 2026 年まで」→ Origins の S19（2026-09）まで。報酬（bAXS）が残るため報酬と無関係な層の証拠とまでは言えないと追記（Classic のシーズン継続は検証で出典なしとされた）
- 同 confidence_reason: ボット除去と人間の離脱を区別できないこと、急落幅の起点差を追記
- ins-sink-new-asset confidence: high → medium（数値の裏付けは実質 Axie 1 事例、CK は論文の解釈、価格には市場要因も重なる）
- ins-ordering-fairness fomo3d: 「独立分析が複数」→ Solmaz と SoK（独立でない）。confidence_reason も同様に修正
- ins-llm-judge-trust claim: 「参加と賞金は伸びており」→ Act I の 195 人・482 回・約 4.7 万ドル、後半は推測と明記
- 同: freysa support を追加（FAQ の「全体がオープンソース」主張と公開コードの欠落）
- 同 confidence_reason: 中心の主張は確認済みだが事例 2 件、後半は推測と明記（high は維持）
- ins-human-decision-preparation claim/freysa: 「全員の過去メッセージがエージェントの文脈に入り」→ 全メッセージ公開、文脈への取り込みは運営の説明で文脈長は FAQ と規約で食い違う
- 同 realms-eternum: 1,000 エージェントは Loaf の X 投稿（Bankless 埋め込み）と明記、2026-09 の agent-runner を追記
- 同 project-sid: 「規模の上限はサーバー資源」→ 1000 人超で応答しなくなったと報告、出典を src-sid-paper に
- 同 confidence_reason: Colony の判断根拠（公式ページにチェーン要素なし）を追記
- ins-agent-society-offchain project-sid: 出典に src-sid-paper を追加（司祭・キーワードは本文の記述で要旨にない）
- 同 freysa（counter）: Act III 以降のカード購入対応と決済代行でも成立し得る分析を追記
- ins-long-season-shrinks claim/realms: 「S0 は約 2 週間、S1 は約 3 週間で決着」→ S0 は 12-11 開始・12-27 優勝発表、S1 はコミット履歴からの推定
- 同: conquest-eth support を追加（無限ゲームでも 2025-1 版の活動は公開直後に集中し 2025-10 以降ほぼゼロ）
- 同 axie（counter）: 「Classic・Origins の競技シーズン」→ Origins の 60 日シーズンが S19 まで
- ins-minimal-primitive claim: 「取引高は 1 か月で 95% 減」→ 2021-09→10 の月次比較、同時期の市場全体の冷え込みを併記。「最も遊ばれた派生の Loot Survivor」→「後に作られた派生ゲーム」（根拠なし）
- 同 loot: 100 超は NonFungible、一覧 95 件と出典を分離。Decrypt の記述を Eternum・Loot 2 の段階に修正
- 同 loot-survivor: 「独自のトークンで運営」→ 参加料は LORDS、袋の保有は参加条件ではない
- 同: loot counter を追加（The Block: 同月に他の NFT も 44〜82% 減）。保有者数に 2022-01 の 2541 を明記。confidence_reason に市場要因を追記
- ins-ownership-layer-only claim/pixels: Stacked への移行は CEO の示した方針（予定）と明記
- ins-veteran-concentration claim/realms: 「検索結果の要約にある」→ 公式発表（X 記事本文を検証時に取得）で @orden_gg。confidence_reason を更新（low は維持）

### questions.yaml
- q-public-bluffing answer/primodium: 社会的な駆け引きは「プレイヤー記事（WASD）に記録」と明記
- 同 dark-forest（counter）: 「上位は計算と自動化で決まった」→「大きく左右された（R1 2 位はほぼ手動）」
- q-late-entry realms: S0 は 2 週間余り、S1 は推定と明記、出典に X 記事を追加
- 同 primodium: 「不在のプレイヤーが一方的に狙われた」→ WASD の記録（首位直後に一晩 18 回襲撃）に即した記述
- q-no-reward pixels: 「約 69%」→ 90 万超→25.2 万（見出し 69%、本文約 72%）
- 同 sunflower-land: DAU は同期取引ベースでピーク比 83% 減と具体化
- 同 stepn: 「価格と連動して大きく動いた」→ Dune MAU の推移と GST 下落、連動は推測。出典に GST を追加
- q-reuse-fun biomes / downstream: 上記の訂正を反映
- q-ai-human-decision answer: Eternum は S1 の NPC、2026-09 の作り直しを追記
- 同 freysa: 「共有文脈で影響し合った」→ 公開メッセージを読んで手を変えた、文脈取り込みは運営の説明
- q-chain-necessary freysa（support）: Act III 以降のカード購入対応を追記
- q-survive-operator answer: 「ホストの停止で拡張ごと失われた（Sky Strife、Downstream、Biomes の後継、Pirate Nation）」→ Sky Strife・Downstream は推論、DUST は移行後に停止告知、移行主体の有無と Conquest.eth の例を追記
- 同 sky-strife / downstream / pirate-nation: 推論である旨と 2026-04-14 告知・2026-05-15 停止を明記。biomes・conquest-eth の context を追加

### hypotheses.yaml
- hyp-owner-scoped-facilities downstream（support）: owner の Rule 追加権の保持を追記
- 同 biomes / downstream（counter）: 上記訂正を反映
- 同 relation_to_current: 否定側のみ → 支持材料（Downstream・Primodium の実装、Dark Forest のプラグイン）と反対材料を併記
- hyp-short-season-civ dark-forest（support）: 「各ラウンドに再参加の鍵を配った」→ 得点者に招待鍵（実際の再参加数ではない）、出典を R1 振り返りに
- 同 realms（counter）: エントリの分析である旨と運営依存の増加を追記
- 同 relation_to_current: 支持（Eternum・Conquest.eth）と反証（Dark Forest）、14 日を直接示す事例がない旨
- hyp-ai-lieutenants realms（counter）: 3 つの試みの削除は運営文書の説明、2026-09 の agent-runner を追記
- 同 relation_to_current: 支持材料と反対・未確認材料を併記、部下型にも長期実証がないと明記
- hyp-offchain-first relation_to_current: 支持（Pixels・SFL・AI 研究）と反対（Lobbies・Freysa）、Redstone の依存を併記
- hyp-automation-league huntercoin: 「禁止より公認の方が現実的とする根拠」→ 禁止する仕組みのない公開盤面ではボットが避けにくいことを示す
- 同 relation_to_current: 支持（Dark Forest）と反対（同一集団の支配、SFL の禁止）、部門分けの事例がない旨

### eras.yaml
- era-prehistory: SatoshiDice の change が SatoshiDice に言及しない 0.8.2 リリースノートだけを根拠にしていた → 取引比率の資料（FEDS、Bitcoin Wiki）を追加し、0.8.2 は言及なしと明記
- era-collectibles: 「手数料の高騰」→ 混雑と出産手数料の引き上げ、占有率は報道 11〜25%・標本計測 約 6〜21%
- era-p2e-zk: 「換金価値が地域の賃金を上回る期間」→ Reuters の例は最低賃金をやや下回る。賃金と比べられる水準と弱め、価格下落で離脱と追記
- era-engines-aw: 「標準化された」→「（MUD など）が共通の仕組みとして提供した」
- era-agents-retreat summary: 「試作の多くが失われ」→「いくつかは失われたとみられ（Sky Strife・Downstream）、移行先も停止告知（DUST）」
- 同 change: Sky Strife の Winding Down だけを根拠に「世界が拡張ごと失われた」→ Redstone 停止（X 告知・L2BEAT）、移行されなかった世界は失われたとみられる、DUST の移行も併記
- 同 change: Eternum と明示し git-history を出典に追加

## 反例の有無
15 件すべてに stance: counter が 1 件以上ある。ins-host-dependency は Conquest.eth を context に移したが CryptoKitties の反例が残る。追加した反例: ins-trust-boundary（PixeLAW）、ins-public-state-automation（Dark Forest R1）、ins-minimal-primitive（The Block の市場全体の下落）。

## 未検証として残るもの
- 各 evidence の原 URL の再取得は Winding Down のみ。他は各エントリの検証役の取得記録に依拠（medium・dune・dappradar 等は元々再確認不可）。
- Sky Strife・Downstream の世界が別チェーンへ移行されたか（両エントリとも未確認のまま）。
- Dark Forest の orden_gg と Eternum の @orden_gg が同一集団か。
- Parallel Colony・Project Sid・Generative Agents・AI Town には個別の検証ログがなく、エントリ記述のみに依拠。
- ins-ownership-layer-only の「多くの事例で」は収録事例の選び方に依存する頻度の主張で、母集団に対する検証はしていない。

## 総合判定
修正済み — 統合層は検証前のエントリに基づく強い言い切りが多く、特に (1) Sky Strife の世界喪失を Lattice の説明として扱っていた点、(2) 休眠した Conquest.eth を「続いている」反例としていた点、(3) Pixels の 69%/72%、(4) Downstream の god mode と外部作例の作者、(5) Freysa の文脈共有と参加規模、(6) Fomo3D 分析の独立性、(7) Loot の派生・取引高の原因を訂正した。確信度は 1 件を high → medium に下げ、他は理由を補強して維持。仮説の relation_to_current は支持・反対の両方を書く形に揃えた。

## ゼロイチのインサイト・問いの検証（2026-10-24）

対象: data/insights.yaml の ins-acq-*（7 件）、data/questions.yaml の q-acq-first-100・q-acq-paid-stay。各 evidence/case を参照エントリの acquisition 節・metrics・sources と照合し、Gods Unchained（BlockchainGamer.biz 2 本）と Pixels（BlockchainGamer.biz の Chapter 2 記事）は出典本体を WebFetch で再確認した。

### 数え直した値
- `node` で scripts/lib.mjs の loadAll() を読み直した: 全 55 件、acquisition.applies: false は 3 件（generative-agents、mental-poker、project-sid）、対象 52 件、channels に existing-community を含むもの 35 件 → **統合役の「52 件中 35 件」は一致**。
- ただし 35 件の existing-community の記述の性質は fact 19・claim 12・analysis 4 で、Ubisoft Quartz・Spells of Genesis のように「対象にした」だけで移入が確認できない例、開発者のみを対象にしたエンジン・研究 6 件（autonomous-worlds-essay、daydreams、dojo、magicblock、mud、zkhunt）を含む。「移入が確認または主張された 35 件」は強すぎるため言い換えた。
- 残り 17 件の扱い: 統合役は「出どころ不明の事例（Conquest.eth、Curio、Sorare、Sunflower Land）」としていたが、Sorare（サッカーファン）と Sunflower Land（Polygon の P2E 利用者）は出どころが記録されている。出どころ不明と書かれているのは Conquest.eth・Curio・Freysa・Fren Pet。

### 直したこと（before → after）
**ins-acq-borrowed-crowd**
- title「最初の集団は「ゼロ」から作られず、暗号資産側の既存の集まりから借りられた」→「記録に残った事例の多くは、最初の集団を暗号資産側の既存の集まりに求めた」（一般化を弱めた）
- claim「35 件で既存コミュニティからの移入が確認または主張された」→「35 件で existing-community が分類された。対象にした記録を含み、fact 19・claim 12・analysis 4、Quartz・SoG は移入未確認、開発者のみの 6 件を含む」
- conditions「出どころ不明の事例（Conquest.eth、Curio、Sorare、Sunflower Land）」→ 不明は Conquest.eth・Curio・Freysa・Fren Pet、残り 17 件は別経路の記録も混在、と訂正。既存 IP（NBA Top Shot・Sorare）の例を追記。
- confidence_reason に再集計の結果と「35 件は移入確認件数ではない」を追記。alternative に生存者バイアスと Web2 IP の反例を追記。

**ins-acq-ownership-first**
- claim「Gods Unchained は 100 万枚のカードを売った時期に日次ウォレットが数百」→ **別時期の数値の流用**。100 万枚は 2018-10、日次ウォレットのピーク 700 は 2019-10 中旬（Genesis 完売時、出典本体で確認。2018 年の値は出典にない）。「2019-10 の Genesis 完売時にも日次ウォレットのピークが 700」に訂正し、evidence の「同時期」も削除。
- claim で Dope Wars を「所有権を売った」例に含めていた → DOPE はガス代のみの無料ミントで一次販売の代金がない。「売らずに配った例」と区別。evidence note も同様に修正。
- conditions「Axie の Community Alpha、DeFi Kingdoms では保有者が最初のプレイヤー・勧誘者になったと運営は述べる」→ DFK の運営は保有者が勧誘したとは述べていない。Axie のテスター増は AXS 配布予告とも重なる旨を添え、DFK は召喚数の主張だけに限定。
- 「現金で入れる Village」→「NFT なしで現金・ステーブルコインで入れる Village」。
- Decentraland の note「保有者の多くは値上がりを期待」はエントリの分析である旨を明記。
- alternative に生存者バイアス（公開に至らなかった先行販売は含まれない）を追記。

**ins-acq-paid-surge**
- **confidence: high → medium**。急増を誘因が起こしたこと・縮小が誘因の終了によることは時期の一致からの推定で、STEPN・Sunflower Farmers は価格急落と、Pirate Nation はピークの時期の特定ができず重なる。報道に残る大きな急増に偏る選択の問題もある。
- title「誘因が止まると数分の一以下に縮んだ。続いたのは入口を絞って作り直した小さな集団」→「誘因の終了・価値の下落とともに縮んだ。続いたのは、確認できた範囲では入口・報酬を絞った後の小さな集団」
- Pixels: 「約 7 割減」に 90 万超→25.2 万→42.8 万（一部回復）と、記事自身がボット除去を「presumption」とする点を追記（出典本体で確認）。
- Conquest.eth: 「過去最多のトークン配布で想定外の複数アカウント」→ 運営は固定の参加費が原因と述べる。急増の規模は示されていないと明記。
- Pirate Nation: ピークの時期が特定できない旨、「ガス無料」→「運営負担のガス」。
- STEPN: 縮小は報酬の停止ではなく GST・GMT の価値の下落と同時、と明記。
- Sunflower Land「2026 年まで継続」→「開発は 2026 年まで継続。現在の DAU は非公開」。
- AI Arena「倍率を大きく振る」→「チーム成績の倍率で配分を動かしボット農場の採算を下げる（運営の説明）」。

**ins-acq-invite-throttle**
- title「希少性の演出より、容量・質・不正の管理に使われた」→「目的が資料で分かる例では管理に使われたが、保有者特典や販売の付録としても使われた」
- NBA Top Shot・Illuvium は段階的開放の事実のみで目的の説明が資料にない旨を明記。NBA Top Shot の「ボット対策の販売延期」は一般公開後のパック販売で、招待制の目的ではないと明記。Topology は「資本ではなく知識で配る」選抜と補った。

**ins-acq-borrowed-distribution**
- claim「OPCraft では流入の規模を示す数字はほとんど出ず」→ **誤り**。Lattice は約 2000 人・約 350 万 tx を申告している（自己申告、2 週間限定デモ）。数字が出ていないのは Downstream・Parallel Colony と訂正。
- 「露出の日程はチェーン側が決め」→「チェーン側の日程に合わせたとみられ（誰が決めたかを示す資料はない）」。
- DeFi Kingdoms の TVL 95% 減に、市場全体の下落期・JEWEL 価格効果と重なり因果は示されていない旨を追記。
- alternative に生存者バイアス（配信網に乗って何も起きなかった作品が比較に入らない）を追記。

**ins-acq-engine-dogfood**
- confidence_reason「6 つのエンジン・基盤で確認」→ MagicBlock は自社ゲームから始まっていないため 5 つに訂正。alternative に、非公開の採用は数えられない（過小評価の方向）旨を追記。

**ins-acq-round-reacquire**
- alternative に、ラウンド制をやめた作品との比較ができていない旨を追記。

**q-acq-first-100 / q-acq-paid-stay**
- answer の「35 件で既存の集まりから借りられた」を上と同じく言い換えた。
- paid-stay の answer に Axie（絞らずに残った例）と、縮小と価格下落の重なりを追記。Pixels・Pirate Nation・STEPN・Conquest.eth の case note を上と同じ方針で修正。

**experiment（7 件）**
- design/signal/kill は具体的だったが、チェーン不要で試せるかの記載がなかった。cost にチェーン要否を追記（engine-dogfood 以外はオフチェーンで可）。invite-throttle の「コントラクト側で強制する」→「サーバーまたはコントラクトで強制する（入口を緩くしない）」。

### 追加した反例・文脈（すべてエントリ側の出典 id）
- ins-acq-borrowed-crowd: NBA Top Shot（counter: 既存 IP からの登録 100 万超、ただし外から来た割合は不明）、Sorare（counter: クラブのライセンスによるサッカーファン、有料利用者 500→5.5 万）
- ins-acq-paid-surge: Axie Infinity（counter: 入口を絞らずに 2024 Q3 も DAA 8.7 万）
- ins-acq-invite-throttle: Axie Infinity（counter: 保有者限定 Alpha で最安値が倍）、Influence（counter: early access を販売の付録に）
- ins-acq-borrowed-distribution: OPCraft（context: 約 2000 人の自己申告、期間限定）
- ins-acq-engine-dogfood: MagicBlock（counter: 最初の開発者は Unity SDK 利用者とジャム参加者）
- ins-acq-round-reacquire: Loot Survivor（context: 前版の実績を SURVIVOR 配分に持ち越し）
- q-acq-paid-stay: Axie Infinity（support）

### 判定
修正済み。重大な問題は 3 点: (1) Gods Unchained の別時期の数値の流用（2019-10 の日次ウォレットを 2018 年の販売期に当てていた）、(2) OPCraft に数字がないという誤り、(3) 「35 件で移入が確認・主張」の過大表現（件数は一致するが中身は「対象にした」記録を含む）。ins-acq-paid-surge は high → medium に下げた。他 6 件は medium を維持。`node scripts/validate.mjs` は ERROR 0（WARN 9 は既存の未引用出典で、今回の変更とは無関係）。
