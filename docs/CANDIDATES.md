# 調査対象の洗い出しと選定理由

選定方針: (1) 7 領域それぞれの起点・転換点、(2) 成功例だけでなく終了・停滞・転換した例、(3) 規模は小さくても設計上の発明がある例、(4) Wylls の関心（生産・戦闘・文明・AI・他者が作った機能の再利用）に関係する例と、それに **反する根拠** になり得る例、を均等に含める。
関係（relations）を書くときは下の id を使う（まだファイルがなくてもよい）。

| id | 名前 | 深さ | 主な選定理由 |
|---|---|---|---|
| huntercoin | Huntercoin | deep | 2014 年、ゲームのルール自体をブロックチェーンのコンセンサスに組み込んだ初期の例 |
| satoshi-dice | SatoshiDice | index | 2012 年、Bitcoin 上の賭けゲーム。オンチェーン「ゲーム」の取引量問題の起点 |
| spells-of-genesis | Spells of Genesis | index | 2015 年前後、Counterparty 上のカード資産。資産所有型の初期例 |
| rare-pepe | Rare Pepe | index | 2016 年、Counterparty 上の収集カード文化。運営不在の資産流通 |
| cryptokitties | CryptoKitties | deep | 2017 年、ERC-721 普及とネットワーク混雑。繁殖経済の発明と限界 |
| etheremon | Etheremon | index | 2017–18 年、オンチェーン対戦・モンスター収集の初期例 |
| etherization | Etherization | index | 2018 年頃の Ethereum 上の文明ゲーム（資料が乏しければ未確認と明示） |
| fomo3d | Fomo3D | deep | 2018 年、最終購入者タイマーと配当。ブロック詰めによる決着という戦略の発見 |
| decentraland | Decentraland | index | 土地所有型の仮想世界。DAO と LAND |
| the-sandbox | The Sandbox | index | 既存 IP の Web3 転換、土地・制作ツール |
| gods-unchained | Gods Unchained | index | カード所有をチェーンに載せ、ルールはサーバー |
| sorare | Sorare | index | 実スポーツ連動のファンタジー＋NFT。規制・ライセンス |
| nba-top-shot | NBA Top Shot | index | Flow。一般層向けの収集。取引高の急増と減少 |
| aavegotchi | Aavegotchi | index | DeFi 担保と収集ペットの結合 |
| axie-infinity | Axie Infinity | deep | P2E とスカラーシップ、Ronin、経済設計の変更 |
| stepn | STEPN | index | Move-to-earn。報酬トークン経済の急伸と減速 |
| defi-kingdoms | DeFi Kingdoms | index | DEX をゲーム化。チェーン移転 |
| wolf-game | Wolf Game | index | 盗みのリスクを組み込んだステーキングゲーム |
| loot | Loot (for Adventurers) | deep | 最小プリミティブを公開し派生を第三者に委ねた |
| ubisoft-quartz | Ubisoft Quartz | index | 大手パブリッシャーの NFT 導入と終了 |
| illuvium | Illuvium | index | 大型資金調達型 Web3 ゲーム |
| dark-forest | Dark Forest | deep | ZK による戦場の霧、プラグイン文化、フルオンチェーン RTS |
| conquest-eth | Conquest.eth | index | Dark Forest 系の無期限オンチェーン戦略ゲーム（コミット・リビール） |
| zkhunt | zkHunt | index | ZK による秘匿移動の小型実験 |
| mental-poker | Mental Poker | index | 1979–81 年の秘匿情報ゲーム理論（研究） |
| opcraft | OPCraft | index | MUD による Autonomous World の初期デモ |
| sky-strife | Sky Strife | deep | フルオンチェーン RTS、Redstone、終了の経緯 |
| primodium | Primodium | deep | 生産・自動化型のフルオンチェーンゲーム |
| words3 | Words3 | index | 拡張可能なオンチェーン単語ゲーム |
| downstream | Downstream | deep | プレイヤーが建物のロジックを書けるオンチェーン世界 |
| biomes | Biomes | deep | 第三者がスマートコントラクトで世界を拡張するボクセル AW |
| mud | MUD | index | オンチェーン ECS フレームワーク |
| curio | Curio | index | スマートオブジェクトと合成可能性を掲げたオンチェーン RTS |
| frenpet | Frenpet | index | Base 上のフルオンチェーン育成。ボット・先回り |
| pirate-nation | Pirate Nation | index | 専用チェーンを持つオンチェーン RPG の終了・転換 |
| autonomous-worlds-essay | Autonomous Worlds（ludens） | index | Autonomous Worlds という考え方の原典 |
| argus-world-engine | World Engine（Argus） | index | シャード型ゲーム用ロールアップ基盤 |
| dojo | Dojo | index | Starknet 上のオンチェーンゲームエンジン |
| realms-eternum | Realms: Eternum | deep | 文明・生産・戦争のシーズン制オンチェーン MMO |
| pixelaw | PixeLAW | deep | 第三者がピクセル上のアプリを追加できる共有世界 |
| influence | Influence | index | Starknet 上の宇宙経済シミュレーション |
| dope-wars-roll-your-own | Roll Your Own（Dope Wars） | index | オンチェーン取引ゲーム。Loot 派生の系譜 |
| daydreams | Daydreams | index | オンチェーンゲームを遊ぶ AI エージェントの枠組み |
| loot-survivor | Loot Survivor | deep | フルオンチェーンのローグライク。Loot の派生 |
| topology-isaac | Isaac（Topology） | index | オンチェーン物理演算パズル |
| magicblock | MagicBlock | index | Solana 上の一時ロールアップ |
| pixels | Pixels | deep | 農業ゲーム、Ronin への移転と大量ユーザー、報酬設計の変更 |
| sunflower-land | Sunflower Land | deep | オープンソースの農業ゲーム。ボット対策と経済調整 |
| hamster-kombat | Hamster Kombat | index | Telegram タップゲームとエアドロップ |
| freysa | Freysa | deep | AI エージェントを攻略対象にした賞金ゲーム |
| ai-arena | AI Arena | deep | プレイヤーが AI を訓練して戦わせる |
| generative-agents | Generative Agents（Smallville） | index | 言語モデルによる社会シミュレーション研究（オフチェーン） |
| project-sid | Project Sid | index | 多数の AI エージェントによる文明シミュレーション研究（オフチェーン） |
| ai-town | AI Town | index | エージェント社会シミュレーションのオープンソース実装 |
| parallel-colony | Parallel Colony | index | AI エージェントと共に遊ぶオンチェーンゲーム |
