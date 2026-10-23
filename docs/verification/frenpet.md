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
