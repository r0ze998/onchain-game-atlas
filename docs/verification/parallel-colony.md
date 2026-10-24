# 検証ログ: parallel-colony

- 確認日: 2026-10-23
- 確認した出典: 6 / 7（公式ページ・Wayfinder PDF・BCG 2 本・eGamers・MobileGamer を取得。X 投稿は snippet のまま）。追加 3 件（公式ゲームガイド、blockchaingames.fun、PANews）

## 直したこと
- summary「公式ページは…一切触れず」→ 公式ページと公式ガイド本文は触れないが、サイト共通フッターに OpenSea の Parallel コレクションへのリンクが残ること、除去か非表示かは未確認であることを明記
- status.note: pivoted の根拠を「設計の変化（自律取引するアバター → 人間が指示する 4X）＋公開面からの消失」に限定し、チェーン要素の除去は未確認と明記。第三者 DB の「Avatar NFT 保有者は Colony で使える」も未確認情報として記載
- dates.launched / ev-colony-global「2026-09」→「2026-09-03」（BCG 本文の 3rd September）
- architecture.onchain: アルファの報道表現「deep blockchain simulation experience」を追記（具体的処理は不明のまま）
- counter_evidence の「チェーンが必須要素にならなかった例である」(fact) → 事実部分と analysis に分割し、analysis 側に「チェーン不要の証明ではない」を明記
- BCG 2 本の note: 表示は「Last updated」であり原公開日でないことを付記

## 追加した反証・矛盾
- contradictions: Solana の X 投稿（snippet）はアルファを 2025 Q1 と予告、実際は 2025-09-22
- contradictions: 第三者 DB は Avatar NFT 連携・Ethereum/Solana を記すが、公式ページ・ガイド本文に記述なし

## 確認できたこと
- 公式ページ・ガイド（overview/gameplay/FAQ）本文に blockchain/Solana/wallet/PRIME/NFT/crypto/token/web3 の語はない（ページの共有翻訳文字列には Parallel TCG 用の PRIME・ウォレット表記があるが Colony の説明ではない）
- 2024 年の構想（専用 web3 ウォレットで自律取引、Solana、PRIME で支払い、Avatars 11,001 基盤、2025 年まで公開されない見込み）、Wayfinder 論文（2024-03-14 作成、Colony の中核インフラ）、アルファ 2025-09-22・Seeker 限定・約 500 ドル・10 ドルのクレート、世界公開 9/3・基本無料・NFT/ウォレットなしで開始可能、MobileGamer の silent launch、Colony 論文 PDF は 404

## 確認できなかったこと
- 現行版内部でのチェーン利用、Avatar NFT・PRIME の扱い、運営の説明、プレイヤー数

## 総合判定
修正済み — 「チェーン要素が消えた」を公開面の事実に限定し、除去は未確認と明示。重大な捏造はなし。

## ゼロイチ節の検証（2026-10-24）
- 確認できた出典: 7 / 8（Solana の X 投稿は要約のみのまま）
- 直したこと:
  - launch の step（2025-09-22）: 「アルファを開始」→「開始すると報じられた（開始当日付けの予告記事）」、クレートも「販売するとされた」に直した
  - channels.invite-gating: 「事前登録を経て段階的に開放した」→「無料登録を受け付けた（その後の段階的な開放の経過は確認できない）」。段階的な開放は出典に書かれていない
  - growth の step（2026-09-03）: MobileGamer.biz の原文「silent launch, with a marketing push to come」に合わせ、マーケティングの本格化はこれから、と追記した
- 追加した反証: Seeker は 2025-08 に世界出荷が始まり、端末上の活動（Seeker Season 1）のスナップショットで SKR がエアドロップされた（Decrypt 2026-01-07）。Seeker 限定のアルファには、ゲームへの関心ではなく活動実績を積む目的の参加者がいた可能性がある（新しい出典 src-colony-decrypt-skr を追加）
- 照合済み: 11,001 体、2025 年まで公開しない見込み、PRIME 史上最高値 28.00 ドル、無料版は PRIME 報酬なし・所持品を保持できない、Seeker 保有者を主要なテスト対象にする、Avatar 保有者もモバイル・PC で遊べる、Seeker 500 ドル、10 ドルのクレート、NFT やウォレットなしで始められる、公式ページの「Free to download, with optional in-app purchases」とサブスクリプション
- 確認できなかったこと: アルファと世界公開版のプレイヤー数
- 判定: 修正済み（軽微）
