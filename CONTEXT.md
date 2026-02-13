# プロジェクトコンテキスト — My Homepage

> Antigravity（または他のAIツール）に読み込ませるための文脈ファイル。
> 新しいセッション開始時に「このファイルを読んでから作業してください」と伝えてください。

---

## プロジェクト概要

- **目的**: 研究者/就活向けの1ページ静的ポートフォリオサイト
- **公開先**: Cloudflare Pages（Git連携・ビルド不要）
- **リポジトリ**: https://github.com/asopasomaso114/my-homepage
- **ローカルパス**: `C:\Users\hymet\.gemini\antigravity\scratch\portfolio-site\`

## 技術スタック

- HTML / CSS / JS のみ（npm不要・ビルド不要）
- Google Fonts (Inter)
- 外部ライブラリなし

## ファイル構成

```
my-homepage/
├── index.html        ← ページ本体（SEO/OGPメタ含む）
├── styles.css        ← ライトテーマ（白+薄グレー, アクセント青 #2563EB）
├── script.js         ← Works データ配列 + DOM生成 + ナビ制御
├── _routes.json      ← Cloudflare Pages Functions を無効化
├── README.md         ← デプロイ手順 + トラブルシュート
└── CONTEXT.md        ← このファイル
```

## デザイン方針

- ライトテーマ（学術系・落ち着いたトーン）
- アクセントカラー: `#2563EB`（青）1色のみ
- 本文 16px 以上、line-height 1.8、余白多め
- レスポンシブ（モバイル < 768px で1カラム）
- prefers-reduced-motion 対応

## セクション構成

1. **Hero**: 名前・肩書き・キャッチ・主要リンク（GitHub/Scholar/X）
2. **About**: キャッチコピー1行 + 自己紹介 + スキルタグ
3. **Works**: script.js の works[] 配列から JS でカード生成
4. **Publications**: Google Scholar / ORCID / ResearchGate へのリンク
5. **Contact**: Google Form リンクボタン
6. **Footer**: SNSリンク + コピーライト

## Cloudflare Pages 設定

| 項目 | 値 |
|------|-----|
| Framework | None |
| Build command | `exit 0` |
| Build output directory | `/` |
| _routes.json | Functions 全無効化 |

## 過去に遭遇した問題と解決策

1. **git push エラー（src refspec main does not match any）**
   → ホームディレクトリに誤って `.git` が作られていた。削除して portfolio-site/ 内で `git init` し直して解決。

2. **Cloudflare Pages で「Hello World」が表示される**
   → Workers の Custom Domain / Routes が競合。Workers 側のドメイン設定を外して解決。

3. **デプロイエラー「Failed to publish your Function」**
   → Cloudflare が script.js を Pages Functions として解釈。`_routes.json` で Functions を無効化して解決。

## プレースホルダー（差し替え箇所）

index.html 内で `★差し替え` を検索すると全箇所が見つかります。
主なプレースホルダー: `YOUR_NAME`, `YOUR_DOMAIN`, `YOUR_GOOGLE_FORM_ID`, `YOUR_USERNAME`, `YOUR_HANDLE`, `YOUR_ORCID` 等。

## 制約事項

- APIキー・秘密情報は一切置かない
- 連絡手段は Google Form リンクのみ（iframe不使用）
- 外部リンクには `rel="noopener noreferrer"` を徹底
- サーバー・DB は使わない
