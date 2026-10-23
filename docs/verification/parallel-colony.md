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
