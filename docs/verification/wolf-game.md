# 検証ログ: wolf-game

- 確認日: 2026-10-23
- 確認した出典: 7 / 8（Sourcify API 3 件でソース取得、公式サイト・Decrypt 2025・nobumei・The Defiant を WebFetch）。src-wolf-herdsman（medium.com）は WebFetch 403、Wayback Machine も接続失敗で本文未取得（snippet のまま）＋ 追加 1 件（Ethereum RPC 照会）
- 方法: Barn.sol / Woolf.sol / WOOL.sol / Traits.sol を読み、公開 RPC（eth.drpc.org）でブロック時刻・プロキシのスロット・paused() を照会

## 照合結果（一致）
- MINT_PRICE 0.069420 ETH、PAID_TOKENS = max/5、DAILY_WOOL_RATE 1 万、税 20%、引き揚げ時 50% 没収、MINIMUM_TO_EXIT 2 日、MAXIMUM_GLOBAL_WOOL 24 億、tx.origin・blockhash・timestamp の乱数、mint は EOA 限定、所有者専用関数（pause、rescue、controller 追加、uploadTraits）
- Barn の引き揚げは safeTransferFrom の後に delete barn[tokenId]（コード上の順序は確認）。claim 系に EOA 制限なし
- 0x7f36…be2f は TransparentUpgradeableProxy、展開者同一。RPC で name() = "Wolf Game"
- Decrypt 2025: 2023-08 Pixel Vault 買収（非公開額）、Blast 移行は「1 年後」、2.0 停止は 2025-04-14、CEO GFunk 退任

## 直したこと（スニペット依存の主張）
- summary: 再入可能性バグによる停止・移行を「関係者の報告ではとされる」→ 報告本文・運営告知とも未取得の未検証情報と明記
- selection_reason: 「ステーキング契約に再入可能性があり」→ コード上の呼び出し順序（再入を許し得る）までが確認範囲と限定
- ev-wolf-migration: date 2021-11 → 2021-11-28（展開ブロック 02:38 UTC、RPC で確認）、理由は未検証と明記し、s から snippet 出典を外した
- ev-wolf-deploy: date 2021-11 → 2021-11-18（展開ブロック時刻）
- ev-wolf-v2: date 2025-04-09 → 2025-04（出典は「先週水曜」と書くのみ）
- m-wolf-sales-5d: 見出しのみが根拠で、一次販売か二次流通か不明と note 追加
- admin: ProxyAdmin（0x9d84…a329）の owner() が初期展開者 EOA と参照日に確認、と追記。status: 初期 Woolf が paused() = true と追記
- src-wolf-sourcify-proxy: Sourcify にあるのはプロキシのソースだけで NFT 本体の実装ではない、と note 修正

## 追加した反証・矛盾
- counter_evidence: 「再入バグで移行」はスニペットにしか依拠しない。コードからは再入順序と EOA 制限なし（乱数を見て revert 可能）の両方が見え、移行の直接原因は特定できない
- contradictions: 検索要約の移行日 11-27 と展開ブロック時刻 11-28 UTC

## 確認できなかったこと
- Herdsman's report の本文、運営の移行告知、悪用の有無（検証役はコード読解のみで再現はしていない）
- 移行後の実装コントラクト（0x2211…5e93）と移行後 Barn・WOOL の権限、Blast・Abstract 版

## 総合判定
修正済み — スニペットだけに依拠した「再入バグによる停止・移行」が要約・選定理由で事実寄りに書かれていたため格下げし、日付をオンチェーンの時刻で確定させた。
