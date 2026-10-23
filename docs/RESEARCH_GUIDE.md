# 調査ガイド（調査役・検証役共通）

このプロジェクトは、オンチェーンゲームの歴史から **設計上の洞察** を得るための研究データベースです。
1 ゲーム（またはエンジン・研究・思想）＝ 1 YAML ファイル `data/games/<id>.yaml` です。

## 絶対ルール

1. **実際に取得して読んだ資料だけを出典にする。** WebFetch / curl / git clone で中身を確認したものだけを `access: fetched` にする。検索結果の要約だけで見たものは `access: snippet` とし、事実の唯一の根拠にしない。URL を推測で作らない。
2. **架空の数値・引用・日付を書かない。** 分からない項目は `unknown` と書くか `unknowns:` に列挙する。件数合わせで説明を水増ししない。
3. **引用 (`q`) は原文の逐語コピーで 200 文字以内。** 言い換えたら `q` に入れない。長文転載はしない。画像は使わない。
4. **事実 (fact)・当事者の主張 (claim)・分析上の仮説 (analysis) を分ける。** 運営の「〜のために変更した」は claim。成功・失敗の因果は原則 analysis。
5. **数値は期間・定義・出典・性質を付ける。** TVL、取引高、ウォレット数、DAU、トークン価格、資金調達、補助金、継続率を混同しない。性質は `measured`（オンチェーンや独立計測）/`reported`（運営発表）/`estimated`（第三者推定）。
6. **日付は分かる精度だけ書く。** `"2020"`、`"2020-08"`、`"2020-08-07"` のいずれか。推測の日は書かない。発表日（出典の `published`）、出来事の日（event の `date`）、参照日（出典の `accessed`）を区別する。
7. **強い表現（世界初・影響を与えた・失敗した・分散化されている）には直接の根拠を付ける。** 根拠がなければ使わない。「似ている」と「影響を受けた」を分け、影響は当事者の言及やコードのフォークなど直接証拠がある場合だけ `basis: confirmed`。
8. **活動が見えないだけで「失敗」と書かない。** status は確認できた事実だけで決める（`unknown` 可）。
9. **一次資料を優先**: 公式ドキュメント、GitHub、当時の発表、論文、開発者の振り返り、オンチェーンデータ。二次資料（報道・分析・Wikipedia）は `primary: false`。
10. 本文は **日本語**。固有名詞・原題は原語のまま。出典リンクは原文へ。

## ファイル形式

```yaml
id: dark-forest                # 小文字ケバブケース。ファイル名と一致
name: Dark Forest
name_ja: ダーク・フォレスト     # 任意
aliases: []
kind: game                     # game | engine | platform | research | essay | protocol
depth: deep                    # deep（深掘り記事あり）| index（索引のみ）
updated: "2026-10-23"          # このエントリを最後に調査した日
chains: [Ethereum Ropsten (testnet), xDai]   # 確認できたもの
team: "..."                    # 開発主体（分かる範囲）
summary: >-                    # 2〜4 文。何であり、なぜ設計史上重要か
  ...
selection_reason: >-           # このアトラスに入れた理由（成功例でなくてもよい）
  ...
categories:                    # 7 領域から複数可。primary は 1 つ
  - {id: onchain-rules, role: primary,   reason: "移動・資源・戦闘の判定がコントラクト内で行われる"}
  - {id: zk,            role: secondary, reason: "..."}
  # 領域 id: assets | p2e | onchain-rules | aw | zk | ai | infra
status:
  value: ended                 # active | ended | dormant | pivoted | archived | unknown
  as_of: "2026-10"
  note: "..."
  s: [src-id]
dates:                         # 不明は省略。精度は文字列で表す
  announced: {date: "2020-02", s: [src-id], note: "..."}
  launched:  {date: "2020-08-07", s: [src-id], note: "Ropsten テストネットで v0.3"}
  ended:     {date: "...", s: [...]}

architecture:                  # 「NFT があるからフルオンチェーン」を避けるための欄
  onchain:
    level: core-rules          # all | core-rules | partial-rules | assets-only | none | unknown
    detail: "何がチェーン上で実行され、何がそうでないか"
    s: [src-id]
  offchain: [{item: "ZK 証明の生成はブラウザ", s: [src-id]}]   # サーバー、インデクサ、乱数、マッチング等
  admin:
    level: significant         # none-known | limited | significant | unknown
    detail: "アップグレード権限、停止、ホワイトリスト等"
    s: [src-id]
  open_source:
    level: full                # full | partial | none | unknown
    detail: "..."
    url: "https://github.com/..."
    s: [src-id]
  extensibility:
    level: client-mods         # permissionless-onchain | client-mods | official-api | none | unknown
    detail: "第三者が実際に何を拡張できたか（例があれば具体名）"
    s: [src-id]

compare:                       # 比較画面の 7 軸。各 1〜3 文。分からなければ k: unknown
  gameplay:      {t: "...", k: fact, s: [..]}
  necessity:     {t: "オンチェーン化の必然性", k: analysis, s: [..]}
  information:   {t: "情報公開/秘匿", k: fact, s: [..]}
  persistence:   {t: "永続性（運営停止後も遊べるか等）", k: fact, s: [..]}
  extensibility: {t: "...", k: fact, s: [..]}
  money_flow:    {t: "資金循環（誰が払い誰が受け取るか）", k: fact, s: [..]}
  entry_barrier: {t: "参加障壁（ウォレット、ガス、初期費用、知識）", k: fact, s: [..]}

concepts: [c-zk-hidden-info, m-fog-of-war]   # data/concepts.yaml の id。無ければ proposed_concepts に

article:                       # depth: deep のときのみ。各節は文（statement）の配列
  what:            []          # どんなゲームか。プレイヤーは何を見て、何を選び、何を得るか
  loop:            []          # 具体的なプレイの一巡（実プレイ/公式デモ/ルールから再構成。どれか明記）
  before_after:    []          # それ以前に何が難しく、何を変えたか
  onchain_tradeoffs: []        # オンチェーンで生まれた遊び / 増えた不便・コスト
  roles:           []          # ユーザー・運営・開発者・エージェントの役割と動機
  trajectory:      []          # 成長・継続・終了・設計変更の確認できる事実
  retention_evidence: []       # 定着を示す証拠と、示していない指標
  extensions:      []          # 第三者による拡張・創発的な遊びの実例
  constraints:     []          # 設計上の制約・失敗し得る条件・未解決課題
  principles:      []          # 他のゲームに持ち込める原理と適用条件
  counter_evidence: []         # 上の解釈を否定し得る証拠・別の説明
# statement の形式:
#   - {t: "本文（日本語）", k: fact, s: [src-id]}
#   - {t: "...", k: claim, who: "運営 (Sky Mavis)", s: [src-id], q: "原文の逐語引用（任意・200字以内）"}
#   - {t: "...", k: analysis}            # 分析。s は任意（根拠があれば付ける）
#   - {t: "...", k: unknown}             # 調べたが確認できなかったこと

metrics:                       # 数値は必ずここに（本文に書く場合もここに登録）
  - id: m-axie-dau-2021-11
    type: dau                  # tvl | volume | wallets | dau | mau | players | token_price | market_cap | funding | grants | revenue | retention | transactions | nft_sales | other
    value: 2700000             # 数値。範囲なら value_text も
    value_text: "約 270 万"
    unit: players              # players | wallets | USD | ETH | tx | % | ...
    period: "2021-11"          # 期間または時点
    definition: "運営が公表した日次アクティブユーザー（定義は非公開）"
    nature: reported           # measured | reported | estimated
    s: [src-id]
    note: "..."

events:
  - id: ev-df-v03
    date: "2020-08-07"
    type: launch               # announce | testnet | launch | round | spec-change | end | pivot | incident | funding | release | paper | other
    title: "v0.3 をテストネットで公開"
    detail: "..."
    s: [src-id]

relations:
  - to: loot                   # 他エントリの id または concept id
    type: influenced-by        # influenced-by | forked-from | built-with | successor-of | same-team | similar-to | contrasts-with | responds-to
    basis: confirmed           # confirmed（当事者言及・コード等の直接証拠）| analytic（分析上の類似）
    note: "..."
    s: [src-id]                # confirmed では必須

unknowns:                      # 調べたが確認できなかった重要事項
  - "..."
contradictions:                # 資料同士の矛盾
  - {t: "A は 8/7、B は 8/8 と記載", s: [src-a, src-b]}

sources:
  - id: src-df-blog-2020-launch   # src-<entry>-<短い名前>
    title: "原題をそのまま"
    url: "https://..."
    publisher: "Dark Forest blog"
    author: "gubsheep"            # 不明なら省略
    type: official-blog           # official-docs | official-blog | code | paper | onchain-data | retrospective | interview | talk | news | analysis | wiki | archive | forum | social
    primary: true
    published: "2020-08"          # 資料の公開日（精度保持。不明なら省略）
    accessed: "2026-10-23"        # 実際に参照した日
    access: fetched               # fetched | snippet | unreachable
    lang: en
    note: "何が書いてあるか一行"
```

## 深掘り記事の品質基準

- 各節 2〜6 文。`what` と `loop` は、遊んだことのない開発者がプレイを想像できる具体性で。
- `principles` は「UX が大切」「コミュニティが重要」のような一般論を禁止。**メカニクス名・適用条件・破綻条件**を書く。
- `retention_evidence` では、示されている指標と **示されていない指標**（例：継続率は非公開）を両方書く。
- `counter_evidence` は必須。自分の解釈を否定し得る事実や別の説明を書く。
- オンチェーンの範囲・オフチェーン依存・管理者権限・公開ソースの有無・第三者の実際の拡張範囲は、可能なら公式ドキュメントやコードで確認する（git clone は可能。github.com は WebFetch で読める）。
- AI・エージェントの観点（エージェントが参加できるか、実際に参加したか、ボットの扱い）も可能なら書く。

## 検証役の手順

1. 各 `sources[]` の URL を開き、`access` を実態に合わせる。到達不能なら `unreachable` にし、それに依存する文を `unknown` か別出典に置き換える。
2. `k: fact` と `metrics` を 1 件ずつ出典と照合。出典にない内容は修正・削除・`k: analysis` に格下げ。
3. `q` が原文の逐語であることを確認。違えば削除。
4. 日付・数値の精度、強い表現、`basis: confirmed` の根拠を確認。
5. 反証・矛盾を探して `counter_evidence` / `contradictions` に追加。
6. 変更点を `docs/verification/<id>.md` に記録（何を確認し、何を直し、何が未検証か）。
