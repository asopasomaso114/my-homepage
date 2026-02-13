# My Homepage — 研究者ポートフォリオ

ビルド不要の1ページ静的サイト。`index.html` をブラウザで開くだけで動作します。

---

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `index.html` | ページ構造・SEO メタ・favicon リンク |
| `styles.css` | デザイン・レスポンシブ・アクセシビリティ |
| `script.js` | **Works データ定義** + DOM 生成 + ナビ制御 |
| `README.md` | このファイル |

---

## Cloudflare Pages デプロイ設定

### 初回セットアップ

1. [Cloudflare Pages](https://pages.cloudflare.com/) にログイン
2. 「Create a project」→「Connect to Git」→ このリポジトリを選択
3. 以下の設定を入力：

| 項目 | 値 |
|------|-----|
| **Framework preset** | `None` |
| **Build command** | `exit 0` |
| **Build output directory** | `/` |
| **Root directory** | `/`（デフォルト） |

4. 「Save and Deploy」で完了

### カスタムドメイン

1. Pages プロジェクトの「Custom domains」タブを開く
2. Cloudflare で取得したドメインを追加
3. DNS が自動設定され、数分で HTTPS が有効になります

### よくある失敗と対策

| 失敗パターン | 対策 |
|-------------|------|
| 404 になる | `index.html` がリポジトリ直下にあるか確認 |
| サブフォルダに入れた | ファイルをルートに移動する |
| `wrangler deploy` を使った | **使わない**。Pages は Git 連携のみ |
| Build command が空欄 | `exit 0` を入力する（空欄だとエラー） |

### 「Hello World」や別のページが表示される場合

Workers の設定がこのドメインに競合している可能性があります。

**確認手順：**

1. **Workers の Routes を確認**
   - Cloudflare ダッシュボード → Workers & Pages → 対象の Worker を選択
   - Settings → Domains & Routes を開く
   - 自分のドメイン（例: `example.com/*`）が Routes に登録されていたら **削除**

2. **Workers の Custom Domain を確認**
   - Workers & Pages → 対象の Worker → Settings → Domains & Routes
   - Custom domain にこのドメインが設定されていたら **削除**

3. **Pages の Custom Domain を確認**
   - Workers & Pages → Pages タブ → 対象のプロジェクトを選択
   - Custom domains タブでドメインが**追加されているか**確認
   - 追加されていなければ「Set up a custom domain」から追加

4. **DNS レコードを確認**
   - Cloudflare ダッシュボード → DNS → Records
   - ドメインの CNAME レコードが `<project-name>.pages.dev` を向いているか確認
   - Workers 用の A/AAAA レコードが残っていたら削除

> **ポイント**: Workers と Pages で同じドメインを使うと Workers が優先されます。Pages で公開するなら Workers 側のドメイン設定を全て外してください。

---

## デスクトップ / モバイルの表示

- **デスクトップ（≥768px）**: 横並びナビバー、Works カードは2〜3列グリッド
- **モバイル（<768px）**: 開閉式メニュー（`<details>`/`<summary>`）、1列レイアウト
- `prefers-reduced-motion` 有効時はすべてのアニメーションが無効化されます

---

## コンテンツの更新方法

### Works（プロジェクト）

`script.js` 冒頭の **`works`** 配列を編集します：

```js
const works = [
  {
    title: "問いや成果物が伝わるタイトル",
    description: "概要テキスト",
    tags: ["Python", "因果推論"],
    url: "https://github.com/...",   // 省略可
  },
  // ← ここにオブジェクトを追加するだけ
];
```

### Publications（プロフィールリンク）

`index.html` 内の Publications セクションを直接編集：
- URL を自分のプロフィールページに差し替え
- 「準備中」のテキストを削除して有効なリンクにする

### プロフィール・自己紹介

`index.html` 内の以下を直接書き換え：
- **Hero**: `YOUR_NAME` / 肩書き / 一言メッセージ
- **About**: 自己紹介文・スキルタグ・キャッチコピー
- **Contact**: Google Form URL（`YOUR_GOOGLE_FORM_ID` を差し替え）

### SNS リンク

`index.html` 内の Hero セクションと Footer の各リンク URL を差し替え。
不要なリンクは該当の `<a>` タグごと削除してください。

---

## 追加済みの SEO メタ / アイコン

### `<head>` 内メタタグ

| タグ | 用途 |
|------|------|
| `<title>` | ページタイトル |
| `meta description` | 検索結果の説明文 |
| `meta robots` | `index,follow` |
| `link canonical` | 正規 URL（独自ドメインに差し替え） |
| `og:title / og:description / og:image / og:url` | OGP（SNS シェア用） |
| `twitter:card / twitter:title / ...` | Twitter Card |

### Favicon / アイコン

| タグ | ファイル |
|------|---------:|
| `<link rel="icon">` | `favicon.ico` / `favicon.svg` |
| `<link rel="apple-touch-icon">` | `apple-touch-icon.png` |

> **Note:** favicon ファイルは同ディレクトリに配置してください（プレースホルダーのみ設定済み）。

---

## ローカルでの確認方法

### 方法 1: ダブルクリック

`index.html` をブラウザにドラッグ＆ドロップ、またはダブルクリック。

### 方法 2: 簡易サーバ（Python）

```bash
cd path/to/this/directory
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開く。
