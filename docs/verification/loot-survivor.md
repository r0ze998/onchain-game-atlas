# 検証ログ: loot-survivor

- 確認日: 2026-10-23
- 確認した出典: 33 / 34（BibliothecaDAO・Provable-Games の loot-survivor、death-mountain、docs を clone してコードとコミット履歴を照合。Starknet ブログ・Loot Herald・Bankless 2 件・growthepie・itch.io は WebFetch で本文確認）＋ 追加 2 件（src-ls-pg-commits、src-ls-dm-commits）。未確認は src-ls-pg-github-org（組織ページ）のみ
- 方法: 参加料・分配比率をコード版ごと（2023-10-21 以前、2023-11-09、LS1.5 main）に定数と分岐で照合。日付は git log で照合

## 照合結果（一致）
- LS1.5 定数: CLIENT_PROVIDER 270 / 1st 270 / 2nd 160 / 3rd 100 / CREATOR 200（千分率、合計 1000）、DAO と PG に交互、3 位 < 64 で全額 PG、TARGET_PRICE 300 セント、VRF 0.5 ドル、GAME_EXPIRY_DAYS 10。`q`（"this is expected to be a trivial amount..."）は逐語
- LS1（2023-11-09）: 25 LORDS、MINIMUM_SCORE 200 で全額 DAO、3 段階 48/32/20 → IF28・32/24/16 → DAO20・IF24・28/16/12
- 各コミットの日付（commit-reveal 2023-10-11、entropy 2023-10-03、Pragma VRF 2024-05-19、prescience 2024-07-24、40836fd 2024-08-07）、README の逐語引用 2 件、Starknet ブログ（2023-11-07、テストネット、"first truly autonomous onchain game"）、Golden Token（2023-10-31・160 枚 / 2025-09-05・1,120 枚）、SURVIVOR 配分、チケット（132 年・1 億・1 ドル 3 日で半減）、Beast 93,225、CORPSE の遡及、Wanted 10 万 STRK、growthepie（411 アドレス・4.08 万件）

## 直したこと
- 分配段階「最初の 12 週間」→「経過週数 12 以下（約 13 週）」。13〜24 週・25 週以降の比率を明記（contradictions・money_flow）
- 2023-10-20 時点（Loot Herald 記事時点）のコードの比率（上位 100%→80%→64%、ブロック数基準）を追記し、どの版も「半分」と一致しないことを明記
- LS1 参加料: 固定 25 LORDS → 初期値 25 で、誰でも起動できる需要連動の改定（initiate_price_change / update_cost_to_play）があった旨を追記
- 2023-11-08 の停止: 「mainnet で新規ゲームを止め」→ UI 側の停止で、表示文言は "pre-release tournament has concluded"。11-09 の切替は UI・インデクサの参照先変更（ゲーム・Beast）と明記。「理由不明」→ プレリリース扱いの終了と表示（詳細理由は未確認）
- src-ls-hist-v1-lib「2023-11 の mainnet 版」→ 2023-11-09 時点のリポジトリのソース（展開済みバイトコードとの一致は未検証）
- admin: terminal_timestamp（LS1/LS1.5 の constructor）と、LS1.5 の DAO/PG 受取先が冒険者 #2・#3 の NFT 所有者で決まる点を追記
- ガス代 5〜10 ドル: 「コミュニティ記事の推定（estimated）」→ 開発者 Loothero の発言を記事が伝えたもの（reported、claim の who も修正）
- VRF 代: 2024-09-10 に 1 ドル → 0.5 ドルへ引き下げと追記。LS1.5 コントラクトの最終変更日 2024-09-10 を period に追記
- 新規 event: ev-ls-15-mainnet（2024-09、mainnet 有効化・展開スクリプト）。ev-ls-15-promo は「公開」ではなく実装コミットと明記
- ev-ls-ls2: date "2025-10" → "2025"（Bankless は「最近公開」としか書いておらず根拠不足。DM の mainnet 構成は 2025-09-03）
- money_flow の LS2 部分を「公式文書の説明、コード未確認」とし、パラメータがガバナンスで変更可能な点を追記
- src-ls-bankless-daydreams の title を実際の題「LLMs Meet Loot: How Daydreams Is Rewriting Onchain Play」に修正

## 追加した反証・矛盾
- counter_evidence: README の "immutable and permanently hosted" に対し、初版が約 9 日で UI から外されて置き換えられ、展開時の締切設定も可能だった（不変なのは個々のコントラクトで、「現行版」はクライアント運営者が決めた）
- contradictions: SURVIVOR 文書の「immutable code による 80% 買付」と、チケット文書の「分配比率もガバナンスで変更可能」
- contradictions: Dojo バージョン（README 1.5.1 / Scarb 1.6.0 / 文書 1.6.2）

## 確認できなかったこと
- 2023-10-31 初版での terminal_timestamp の値、切替の詳細理由、需要連動で参加料が実際にどう動いたか
- LS1.5・LS2 の公式な公開日、LS2 のチケット分配がコードで文書通りか
- 総プレイ数・一意プレイヤー・継続率（dune 等は遮断）

## 総合判定
修正済み — 分配比率の期間区切りの誤り、ガス代の性質の誤分類、LS2 公開月の根拠不足、2023-11 の停止の性質（UI 側・プレリリース終了）を直した。重大な捏造は見つからなかった。
