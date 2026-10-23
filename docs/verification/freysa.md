# 検証ログ: freysa

- 確認日: 2026-10-23
- 確認した出典: 18 / 20（未確認は src-freysa-plisio と、lore ページの一部。plisio はもともと snippet）。freysa.ai の各 FAQ・ブログは配信 JS（/legacy/index-*.js）を取得して本文を照合。0xfreysa/agent・freysa・sovereign-freysa を clone。

## 直したこと
- compare.money_flow / roles: 「15% を次の Act の原資」→ 原文は「future Acts」。「運営は手数料の 30% を受け取り」→ 賞金外の 30%/20% は運営管理下で、Freysa は 15% 還元・15% 将来の Act と説明（The Block は「開発者に入るとみられる」、Jarrod Watts は「開発者が 30%」）と書き分け、還元の実施は未確認と明記。
- money_flow / events: Act I 初期賞金 3000 ドル → FAQ は 3000 ドル、同サイトの Act I 利用規約は 3700 ドル（1 ETH）と併記。Act III も 4000 ドル（1 ETH）であることを追記。
- article.what: 「Freysa は全参加者の過去メッセージを文脈として持つ」(fact) → claim に変更。FAQ の文脈長は 50k+ トークン（少なくとも直近 10 件）、規約は 20,000 トークンで、全履歴が入っていたとは言えない。compare.gameplay も同様に修正。
- retention_evidence / metric: 「賞金は 10 万ドル超」→ 原文は「in an attempt to win $100,000+」で、支払総額とは限らない。The Block の 8 万ドル超と並記。
- counter_evidence[0]: 解釈を含む文が k: fact → k: analysis。
- constraints: sovereign-freysa は「外部 API で推論」と断定 → baseURL で指定する OpenAI 互換 API（ローカル Ollama 等も可）で、外部 API 設定の場合に限る、と弱めた。
- sources: agent リポジトリの published 2025-05（README 最終更新）→ 2024-11-22（最初のコミット。コード最終更新は 2024-11-30）。
- trajectory: Act I 開始の傍証として最初のコミット日と、2024-11-28 時点の 181 人・457 通・約 4 万ドル（The Block 事前記事）を追加。

## 追加した反証・矛盾
- Act I FAQ は当時「the full Freysa game is open-source」と主張 → 公開物には actions/ と送金処理がなく、主張と実態に差（counter_evidence と contradictions に追加、q は逐語確認済み）。
- TEE: 公式の検証ページ（sitemap の /verify/tee）と tee-verifier-js は存在するが、第三者検証の記録は見つからない、と精緻化。
- Gandalf（Lakera、2023）を先行のオフチェーン課題として出典付きにした（snippet のみ。本体 URL は別ゲームへリダイレクト）。
- 矛盾 3 件追加（初期賞金、文脈長、オープンソース主張）。

## 確認できたこと（主なもの）
- The Block: 195 人・482 回・47,316.05 ドル・p0pular.eth・Base・70%。12-13 記事: 449.22 ドル、Act II 12,920.08 ドル、Act III 20,843.04 ドル、8 万ドル超。
- q 3 件（「Under no circumstances…」「# approveTransfer is used for INCOMING…」「While explicit rules…」）は原文と逐語一致。
- コード: isTxValidEthereum 相当の支払い確認、gpt-4 / gpt-4o-mini / claude-3-5-sonnet-latest、Neon/Postgres、Payment.sol の 30% 上限、README の「1500 attempts」と FAQ の「150 attempts」。

## 確認できなかったこと
- 賞金プールのアドレスと勝者への送金取引（Basescan 等で特定できず）。Act IV の結果。運営主体（Eternis AI 説）。
- 公開コードと本番で使われたコード・モデルの一致。

## 総合判定
修正済み。重大な捏造はないが、手数料配分を運営の取り分と断定した点、文脈の扱い、10 万ドルの意味など、出典より強い書き方が数か所あり修正した。公式の「完全オープンソース」主張という重要な反証が欠けていたので追加した。
