# 公式リンクと外部データ ID の調査ブリーフ

各エントリ（`data/games/<id>.yaml`）に、**確認できた公式リンク**と、市場データ取得用の **CoinGecko / DefiLlama の ID** を追加する。
推測で書かない。確認できなかったものは書かない（空欄でよい）。

## 追加する形式

`updated:` の行の直後に、次の 2 つのトップレベルキーを追加する（既存の行は変えない。`updated:` は今日の日付 2026-10-23 のままでよい）。

```yaml
links:
  website: https://axieinfinity.com/              # 公式サイト（現在アクセスできるもの）
  play: https://app.axieinfinity.com/             # 遊べる場所（あれば）
  docs: https://whitepaper.axieinfinity.com/      # 公式ドキュメント・ホワイトペーパー
  x: https://x.com/AxieInfinity                   # 公式 X（Twitter）。x.com の URL で
  discord: https://discord.gg/axie                # 公式 Discord の招待
  github: https://github.com/axieinfinity          # 公式 GitHub（組織またはリポジトリ）
  blog: https://blog.axieinfinity.com/            # 公式ブログ
  # 終了・閉鎖したサイトは次の形で残す（歴史的に公式だったことを出典で示す）
  # website: {url: https://example.com/, status: defunct, note: "2024 年に閉鎖", s: [src-xxx]}
ids:
  coingecko: axie-infinity        # ゲームの主要トークンの CoinGecko ID（複数なら配列 [axie-infinity, smooth-love-potion]）
  defillama: axie-infinity        # DefiLlama のプロトコル slug（TVL が実在する場合のみ）
```

使えるキー: `links` は website / play / docs / whitepaper / x / discord / telegram / github / blog。`ids` は coingecko / defillama。

## 確認の方法（必須）

- **公式であることの確認**: 公式サイト本体（フッターやヘッダー）、公式ドキュメント、またはエントリに既にある一次資料のどれかに、そのリンクが載っていることを確認する。CoinGecko や DefiLlama の掲載情報だけでは公式とみなさない（補助的な照合には使ってよい）。
- **到達性**: WebFetch か curl で開けることを確認。x.com・discord.gg は自動取得できないことが多いので、公式サイトにリンクがあることで確認とする。github.com は WebFetch で開ける。
- **CoinGecko ID**: `curl -s "https://api.coingecko.com/api/v3/coins/<id>?localization=false&tickers=false&community_data=false&developer_data=false"` で取得し、`links.homepage` が公式サイトと一致する、またはコントラクトアドレスが公式ドキュメントと一致することを確認。レート制限があるので連続アクセスは 3 秒以上空ける。トークンのないプロジェクトには書かない。
- **DefiLlama slug**: `curl -s https://api.llama.fi/protocol/<slug>` の `name`・`url` がプロジェクトと一致し、TVL の系列が実在することを確認（ゲームの多くは DefiLlama に無い。無ければ書かない）。候補探しには `https://api.llama.fi/protocols`（大きい JSON、`category: "Gaming"` など）を使ってよい。
- 研究論文・論考（kind: research / essay）は、論文ページや著者の公式ページを `website` に入れてよい。トークンや TVL は書かない。
- 終了したプロジェクトのサイトが別の内容（ドメイン売却など）になっている場合は載せないか、`status: defunct` と出典付きで残す。

## 完了時

1. `cd /home/user/onchain-game-atlas && node scripts/validate.mjs --only <id>` でエラーがないこと。
2. 担当外のファイルや、`links` / `ids` 以外の行は変更しない。
3. 最終報告（200 語以内）: 追加できた件数、確認できずに省いたもの、CoinGecko・DefiLlama の照合で迷ったもの。
