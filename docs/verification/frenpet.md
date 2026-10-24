# 検証記録: frenpet

- 確認日: 2026-10-23
- 確認した出典: 12／12（docs.frenpet.xyz 9 ページ、Paragraph、Bankless、Super Fren Pet を取得）。追加出典 1 件（オンチェーン実測）。

## 直したこと
- status.note: 「Super Fren Pet のページはステーキングが数週間前まで機能していたことを示す」→ 誤り。参照日の同ページはペット #84373（約 11 日前に誕生）が DEAD、ステーク 0、キーパー最終確認 11 日前と表示。活動の根拠を、Base 公開 RPC で V2 Diamond のログを標本調査した実測（直近 300 ブロック≒10 分で 324 件）に差し替え（src-frenpet-onchain）。status: active は維持。
- extensibility: Super Fren Pet を「自動化する」から「自動化する設計だが参照日は停止表示」に修正。
- src-frenpet-superfrenpet の note を実態に合わせて更新。

## 追加した反証
- 第三者拡張の唯一の確認例（Super Fren Pet）が誕生から約 11 日で停止表示。許可制 Facet と公開 API の下で持続的な第三者オンチェーン拡張が育った証拠は見つからない（fact）。

## 照合して問題なかった主な点
- 4% 税（2% 報酬・1% 開発・1% 流動性）、請求でスコアと成長がリセット、uniV3 プールのブロック権、30 分（パス 10 分）・1 時間・1 日 32 回・0.5% 上限、1 日 10 tx まで運営負担、V2 の Diamond・Facet ホワイトリスト・招待制・鋳造 100 $FP・V1 からのエアドロップ、引用 "so far it hasn't been consistent to sustain ourselves" 逐語、pGOLD 1000 万・12/8 開始、2 人の自己資金チーム、Bankless の 10 $FP。

## 確認できなかったこと
- プレイヤー数・ボット比率（ログ数はプレイヤー数ではない）、コントラクトのソース公開、Diamond 所有者権限の範囲。

## 総合判定
修正済み — status の根拠に使われていた第三者ページの読み違いを訂正し、実測で置き換えた。

## ゼロイチ節の検証（2026-10-24）
- 確認した出典: 8 / 9（src-frenpet-onchain の RPC 計測は再実行していない）。ほかに The Defiant を 1 件追加（本文は描画されず snippet）
- Coinbase Wallet・Base の投稿の扱い: 元の X 投稿は検索でも見つからず、英語の主要報道（The Defiant の見出し・副題、Bankless）にも言及がない。TechFlow（11/18 に Coinbase Wallet が「ツイートした」とだけ書き、内容は書かない）と Foresight News（原文「Base 官推和 Coinbase Wallet 官推的關注」）だけが伝える。既に claim で、fact にはなっていなかった
- 直したこと:
  - channels: platform-distribution（Coinbase Wallet・Base 公式の言及） → crypto-social に移し、Pranksy の件と 1 件にまとめた。X 投稿 1 本はウォレットの掲載・特集のような配信面の施策ではなく、そうだった証拠もないため
  - steps 2023-11-21: 「公式アカウントの言及」 → 原文の「關注」（注目・言及）を明記
  - cost: 「ドキュメント時点で 4%」「運営が報酬を新規発行していない」 → 2023-11 の Foresight は BaseSwap で 5%（2/2/1）と記すこと、ETH 報酬は取引税の再分配だが Season 1 の pGOLD は新たに配るポイントであることを明記
  - contradictions: 取引税の率（5% / 4%）を追加
- 追加した反証: The Defiant（検索要約のみ、access: snippet）は 11/17 の約 0.05 ドルから 11/20 の最高 1.9 ドルへ週末で 38 倍超とする。TechFlow の 0.1→1.4 と並べて counter に入れた（snippet だけを根拠にした記述はない）
- 確認できなかったこと: Coinbase Wallet と Base の元の投稿の本文と日付、招待経由の人数、Fren Pet 側の流入データ
- 判定: 修正済み（チャネルの分類 1 件・税率の時点 1 件。重大な捏造はない）
