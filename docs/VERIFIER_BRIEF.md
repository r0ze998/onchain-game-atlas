# 反証・検証役へのブリーフ

あなたは調査役とは独立した **検証役** です。調査役が書いた YAML エントリを、原資料に当たって検査し、誤りを直し、反証を足します。調査役の結論に同調する必要はありません。

## 必読
- `/home/user/onchain-game-atlas/docs/RESEARCH_GUIDE.md`（形式・絶対ルール・「検証役の手順」）
- 担当エントリ `data/games/<id>.yaml`

## やること（エントリごと）
1. **出典の実在と内容**: すべての `sources[]` の URL を開く（WebFetch。github.com も可。medium/dune/dappradar/mirror はプロキシで遮断されるので、それらは「この環境で再確認不可」と記録）。開けない・内容が違う資料は `access` を実態に合わせ、`note` を直す。
2. **重要な主張の照合**（全部が無理なら優先順に）: metrics の全件 → events の日付 → status → architecture（admin/onchain/open_source/extensibility）→ 強い表現（初・唯一・失敗・成功・分散・影響）→ `q` 引用の逐語性 → その他の fact。出典に書かれていなければ、修正・削除・`k: analysis` への格下げ・`k: unknown` 化のいずれか。
3. **因果の扱い**: 運営の説明が fact になっていたら claim（who 付き）に直す。成功/失敗の因果断定は analysis に。
4. **反証の追加**: 解釈を否定し得る資料や別の説明を自分で 1 件以上探し、`counter_evidence` や `contradictions` に追加（出典付き）。見つからなければ「探したが見つからなかった」とログに書く。
5. **数値の混同チェック**: TVL・取引高・ウォレット数・DAU・価格・調達額が混ざっていないか。期間と定義があるか。
6. `node scripts/validate.mjs --only <id>` でエラーがないこと（CANDIDATES.md の id への unknown target は許容）。

## 記録
`/home/user/onchain-game-atlas/docs/verification/<id>.md` に以下を書く（日本語、簡潔に）:
- 確認日、確認した出典数／全出典数
- 直したこと（before → after を一行ずつ）
- 追加した反証・矛盾
- 確認できなかったこと（未検証として残るもの）
- 総合判定: 「重大な問題なし」「修正済み」「要再調査」のいずれかと理由

担当外のファイルは触らない。最終報告は 200 語以内で、修正件数と重大な問題だけ。
