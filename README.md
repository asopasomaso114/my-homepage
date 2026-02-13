# Portfolio — 研究者/就活向けポートフォリオサイト

ビルド不要の 1 ページ静的サイトです。  
`index.html` をブラウザで開くだけで動作します。

---

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `index.html` | ページ構造・SEO メタ・favicon リンク |
| `styles.css` | デザイン・レスポンシブ・アニメーション |
| `script.js` | **データ定義** + DOM 生成 + ナビ制御 |
| `README.md` | このファイル |

---

## デスクトップ / モバイルの表示

- **デスクトップ（≥768px）**: 横並びナビバー、Works カードは2〜3列グリッド
- **モバイル（<768px）**: 開閉式メニュー（`<details>`/`<summary>`）、1列レイアウト
- `prefers-reduced-motion` 有効時はすべてのアニメーションが無効化されます

---

## コンテンツの更新方法

### Works（プロジェクト）

`script.js` 冒頭の **`works`** 配列を編集します:

```js
const works = [
  {
    title: "プロジェクト名",
    description: "概要テキスト",
    tags: ["Python", "機械学習"],
    url: "https://github.com/...",   // 省略可
  },
  // ← ここにオブジェクトを追加するだけ
];
```

### Publications（論文）

同じく `script.js` の **`publications`** 配列を編集します:

```js
const publications = [
  {
    authors: "著者名",
    title: "論文タイトル",
    journal: "掲載誌, 巻(号), ページ",
    year: 2025,
    doi: "https://doi.org/...",   // 省略可
  },
];
```

### プロフィール・自己紹介

`index.html` 内の以下を直接書き換えてください:
- **Hero**: `YOUR NAME` / 研究分野 / 一言メッセージ
- **About**: 自己紹介文・スキルタグ
- **Contact**: Google Form の URL（`YOUR_FORM_ID` を差し替え）

---

## 追加済みの SEO メタ / アイコン

### `<head>` 内メタタグ

| タグ | 用途 |
|------|------|
| `<title>` | ページタイトル |
| `meta description` | 検索結果の説明文 |
| `meta robots` | `index,follow` |
| `link canonical` | 正規 URL |
| `og:title / og:description / og:image / og:url` | OGP（SNS シェア） |
| `twitter:card / twitter:title / twitter:description / twitter:image` | Twitter Card |

### Favicon / アイコン

| タグ | ファイル |
|------|---------|
| `<link rel="icon">` | `favicon.ico` / `favicon.svg` |
| `<link rel="apple-touch-icon">` | `apple-touch-icon.png` |

> **Note:** favicon ファイルは同ディレクトリに配置してください（プレースホルダーのみ設定済み）。
