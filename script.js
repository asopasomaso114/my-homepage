/* ============================================================
   Portfolio — script.js
   ============================================================
   ★ コンテンツを更新するには、下の works[] 配列を
     編集してください。HTML を直接触る必要はありません。
   ============================================================ */

// ─── Works データ ───────────────────────────────────────────
// 各オブジェクトがカード 1 枚になります。
// title は「問い・成果物」が伝わる表現にしてください。
const works = [
  {
    title: "流域の土地利用は沿岸生態系をどう変えるか？ — 多変量データによる因果解析",
    description:
      "陸域からの栄養塩負荷が沿岸ベントスに与える影響を、ベイジアンネットワークで定量化。流域スケールの環境管理に示唆を与える研究。",
    tags: ["ベイジアンネットワーク", "沿岸生態学", "GIS"],
    url: "https://github.com/YOUR_USERNAME/project-watershed",
  },
  {
    title: "マガキの成長は水温でどこまで予測できるか？ — DEBモデルの適用",
    description:
      "Dynamic Energy Budget モデルを用いて、水温変動下におけるマガキの成長・繁殖パラメータを推定。養殖管理への応用可能性を検討。",
    tags: ["DEB モデル", "マガキ", "数理生態学"],
    url: "https://github.com/YOUR_USERNAME/project-deb-oyster",
  },
  {
    title: "環境データから因果構造を学習する — ベイジアンネットワーク構造学習の比較",
    description:
      "スコアベース・制約ベース・ハイブリッドの3手法を環境データに適用し、推定精度と計算コストを比較した方法論研究。",
    tags: ["Python", "因果推論", "構造学習"],
    url: "https://github.com/YOUR_USERNAME/project-bn-learning",
  },
];

// ============================================================
//  DOM 生成
// ============================================================

/**
 * Works カードを生成して #works-grid に挿入
 */
function renderWorks() {
  const grid = document.getElementById("works-grid");
  if (!grid) return;

  grid.innerHTML = works
    .map(
      (w) => `
    <article class="work-card reveal">
      <h3>${escapeHtml(w.title)}</h3>
      <p>${escapeHtml(w.description)}</p>
      ${
        w.tags && w.tags.length
          ? `<div class="work-tags">${w.tags
              .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
              .join("")}</div>`
          : ""
      }
      ${
        w.url
          ? `<a href="${escapeAttr(w.url)}" class="card-link" target="_blank" rel="noopener noreferrer">詳しく見る</a>`
          : ""
      }
    </article>`
    )
    .join("");
}

// ============================================================
//  ユーティリティ
// ============================================================

/** XSS 対策: HTML エスケープ */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/** 属性値のエスケープ */
function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ============================================================
//  ナビゲーション制御
// ============================================================

/**
 * モバイルナビ: Escape キーで閉じる & リンクタップで閉じる
 */
function initMobileNav() {
  const details = document.getElementById("mobile-nav");
  if (!details) return;

  // Escape で閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && details.open) {
      details.open = false;
      details.querySelector("summary").focus();
    }
  });

  // メニュー内リンクをクリックしたら閉じる
  details.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      details.open = false;
    });
  });

  // メニュー外クリックで閉じる
  document.addEventListener("click", (e) => {
    if (details.open && !details.contains(e.target)) {
      details.open = false;
    }
  });
}

// ============================================================
//  スクロール演出 (IntersectionObserver)
// ============================================================

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

// ============================================================
//  アクティブナビリンク (aria-current)
// ============================================================

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    ".nav-desktop a, .nav-list-mobile a"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// ============================================================
//  初期化
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  renderWorks();
  initMobileNav();
  initScrollReveal();
  initActiveNav();
});
