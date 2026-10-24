# ゼロイチ（最初のユーザー獲得）調査ブリーフ

各エントリに `acquisition:` 節を追加し、**最初のユーザーが誰で、どこから、どんな仕掛けと費用で集まり、その後残ったか** を出典付きで記録します。
目的は、新しいオンチェーンゲームの開発者が「最初の 100 人・1000 人をどう集めるか」を、成功例の宣伝文ではなく、条件と反証つきで判断できるようにすることです。

## 必読
- `docs/RESEARCH_GUIDE.md` の「絶対ルール」（すべてここでも適用。架空の数値・引用・日付・出典を入れない。実際に開いて読んだ資料だけ `access: fetched`）
- 担当エントリの YAML（既存の sources・metrics・events・article をまず読み、使える既存出典は再利用する）

## 調べること（優先順）
1. **最初のユーザーは誰だったか**: 既存のどのコミュニティ（前作のプレイヤー、特定 NFT の保有者、ZK 研究者、DeFi 利用者、Web2 ゲームのプレイヤー、Telegram 利用者…）か。開発者向けのもの（エンジン・プラットフォーム）は最初の開発者は誰だったか。
2. **公開前（pre）**: テスト、招待制、ホワイトリスト、ハッカソン、Discord 立ち上げ、事前登録、先行販売、論文・ブログ・講演での露出。
3. **公開時（launch）**: 無料配布、賞金ラウンド、トークン報酬、紹介報酬、提携プラットフォームでの配信、報道、配信者。
4. **初期の伸び（growth）**: 最初の拡大を起こした出来事（例：スカラーシップ、価格上昇、バイラルな仕組み、取引所上場、Ronin/Telegram 等への移転）。数値は `metrics` に登録し（RESEARCH_GUIDE の形式。type・period・definition・nature 必須）、`acquisition.metrics` に id を並べる。
5. **獲得の原資（cost）**: 誰が払ったか。賞金（誰が出したか）、トークン放出、VC 資金、助成金、プレイヤー同士の資金移転（後から入った人が先に入った人に払う構造）など。不明なら `k: unknown`。
6. **その後（after）**: 集まった人が残ったか。示されている指標と示されていない指標（継続率は非公開など）を分けて書く。
7. **反証（counter）**: 「この施策で集まった」という説明を否定し得る事実・別の説明（例：相場全体の上昇期だった、報道の後に伸びた、ボット・多重アカウント、賞金目当ての一時流入）。必須。
8. **持ち込める点（lessons）**: `k: analysis`。「コミュニティが大事」のような一般論は禁止。**施策名・効く条件・破綻条件**を書く。

## 形式

```yaml
acquisition:
  audience: [players]            # players | developers | creators | holders | researchers（複数可）
  summary: {t: "1〜2 文で、最初のユーザーがどこから来たか", k: analysis, s: [src-..]}
  steps:                         # 時系列（古い順）。各 1〜2 文
    - {phase: pre, date: "2020-06", t: "...", k: fact, s: [src-..]}
    - {phase: launch, date: "2020-08-07", t: "...", k: fact, s: [src-..]}
    - {phase: growth, date: "2021-07", t: "...", k: claim, who: "運営 (Sky Mavis)", s: [src-..], q: "逐語引用（任意・200字以内）"}
  channels:                      # 使ったと確認できたチャネルだけ。各 1 文で具体的に
    - {id: invite-gating, t: "招待鍵を 1000 本配布し、参加者を段階的に増やした", k: fact, s: [src-..]}
  cost: [{t: "...", k: fact, s: [..]}]
  after: [{t: "...", k: fact, s: [..]}]
  counter: [{t: "...", k: analysis, s: [..]}]
  lessons: [{t: "...", k: analysis}]
  metrics: [m-..]                # この節で根拠に使う metrics の id（同じファイルの metrics に存在すること）
  unknowns: ["調べたが分からなかったこと"]
```

- `date` は分かる精度だけ（`"2020"` / `"2020-08"` / `"2020-08-07"`）。不明なら省略。`phase` は pre / launch / growth。
- deep エントリは steps・cost・after・counter・lessons をすべて 1 件以上。index エントリは summary・steps・channels が必須で、他は分かる範囲（ただし counter はできるだけ書く）。
- 研究・論文・エッセイなど「ユーザーを集める対象ではない」ものは、無理に書かず次のようにする:
  `acquisition: {applies: false, note: "研究論文であり、利用者獲得の対象ではない。読者・後続研究への広がりは relations を参照"}`
  ただし、研究でも公開デモに利用者を集めた（例：AI Town のデモ）なら書く。エンジン・プラットフォームは「最初の開発者・ゲームをどう集めたか」を書く（audience: developers）。
- 新しい出典は既存の `sources:` に追記（id は `src-<entry-id>-<短い名前>`、他と衝突させない）。新しい数値は `metrics:` に、新しい出来事は必要なら `events:` に追加してよい。
- 既存の記述と矛盾する資料を見つけたら `contradictions:` に追加する。既存の記述は消さない（明白な誤りは直してよいが、最終報告に書く）。

## チャネル id の定義（混同しない）
| id | 意味 |
|---|---|
| existing-community | 既存コミュニティからの移入（前作・同じチーム・特定 NFT/トークン保有者・研究者コミュニティ） |
| crypto-social | X/Twitter・Reddit・フォーラムなど暗号資産界隈の SNS での発信と拡散 |
| community-server | Discord・Telegram グループなど自前のコミュニティ場 |
| invite-gating | 招待制・ホワイトリスト・段階的開放・待機リスト |
| hackathon | ハッカソン・ゲームジャム・ビルダー向けイベント |
| builder-grants | 開発者向け助成・懸賞・エコシステム資金 |
| prize-competition | 賞金・順位報酬のある大会・ラウンド |
| token-incentive | トークン・ポイント・将来のエアドロップ期待による報酬 |
| free-mint | 無料・ほぼ無料での配布・ミント（ガス代のみ等） |
| scholarship-guild | スカラーシップ・ギルドによる貸与と勧誘 |
| referral | 紹介報酬・紹介リンクの仕組み |
| platform-distribution | 既存の配信網・提携（Telegram ミニアプリ、Ronin、Steam、ウォレット、ストア、チェーンの公式施策） |
| ip-brand | 既存 IP・ブランド（スポーツリーグ、有名企業） |
| press | 報道・メディア露出 |
| creator-stream | 配信者・YouTuber・インフルエンサー |
| content-research | 論文・技術ブログ・講演・研究デモ |
| composability | 第三者が上に作れること自体が人を呼んだ（派生プロジェクト、プラグイン） |
| viral-mechanic | 仕組みそのものが拡散を生んだ（繁殖・共有・タップ・残り時間の競争など。referral とは別） |
| paid-ads | 有料広告 |

## 調査の手段と制約
- WebSearch と WebFetch を使う。github.com は WebFetch で読める（curl は遮断、`git clone --depth 1` はスクラッチ領域で可、clone したものは読むだけで実行しない）。
- medium.com, dune.com, dappradar.com, mirror.xyz はプロキシで遮断。web.archive.org は不安定（取得できなかったら参照済み扱いしない）。代わりに公式ブログ・ドキュメント・当時の報道・開発者インタビュー・ポッドキャストの書き起こし・講演・Naavik 等の分析を探す。
- 引用 `q` は逐語・200 字以内。運営の「〜で集めた」は claim（who 付き）。施策と増加の因果は原則 analysis。
- 本文は日本語、固有名詞は原語。

## 完了時
1. `cd /home/user/onchain-game-atlas && node scripts/validate.mjs --only <id>` で ERROR がないこと（"no acquisition" の WARN が消えていること）。
2. 担当外のファイルは触らない。
3. 最終報告（200 語以内）: エントリごとに、最初のユーザーの出どころを 1 行、追加した出典数、見つからなかった重要事項。
