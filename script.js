/* ============================================================
   Portfolio — script.js
   ============================================================
   ★ コンテンツを更新するには、下の works[] と publications[] を
     編集してください。HTML を直接触る必要はありません。
   ============================================================ */

// ─── Works データ ───────────────────────────────────────────
// 各オブジェクトがカード 1 枚になります。
const works = [
  {
    title: "プロジェクト A",
    description: "プロジェクトの概要をここに書きます。目的・手法・成果などを簡潔にまとめてください。",
    tags: ["Python", "機械学習"],
    url: "https://github.com/YOUR_USERNAME/project-a",
  },
  {
    title: "プロジェクト B",
    description: "2つ目のプロジェクトの説明です。使用技術や成果物へのリンクを記載します。",
    tags: ["R", "統計分析", "可視化"],
    url: "https://github.com/YOUR_USERNAME/project-b",
  },
  {
    title: "プロジェクト C",
    description: "3つ目のプロジェクトです。カードは配列に追加するだけで自動生成されます。",
    tags: ["GIS", "環境科学"],
    url: "https://github.com/YOUR_USERNAME/project-c",
  },
];

// ─── Publications データ ────────────────────────────────────
// 各オブジェクトが論文 1 件になります。
const publications = [
  {
    authors: "Yamada, T., Suzuki, H., & Tanaka, K.",
    title: "A Novel Approach to Environmental Data Analysis Using Bayesian Networks",
    journal: "Journal of Environmental Science, 45(2), 123–135",
    year: 2025,
    doi: "https://doi.org/10.1234/example.2025.001",
  },
  {
    authors: "Yamada, T. & Suzuki, H.",
    title: "Effects of Land Use Change on Coastal Ecosystems: A Meta-Analysis",
    journal: "Marine Ecology Progress Series, 612, 45–60",
    year: 2024,
    doi: "https://doi.org/10.1234/example.2024.002",
  },
  {
    authors: "Suzuki, H., Yamada, T., & Sato, A.",
    title: "Statistical Modeling of Species Distribution Under Climate Change",
    journal: "Ecological Modelling, 401, 78–91",
    year: 2023,
    doi: "https://doi.org/10.1234/example.2023.003",
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

/**
 * Publications リストを生成して #publications-list に挿入
 */
function renderPublications() {
  const list = document.getElementById("publications-list");
  if (!list) return;

  list.innerHTML = publications
    .map(
      (p) => `
    <article class="pub-item reveal">
      <span class="pub-year">${escapeHtml(String(p.year))}</span>
      <h3 class="pub-title">${escapeHtml(p.title)}</h3>
      <p class="pub-authors">${escapeHtml(p.authors)}</p>
      <p class="pub-journal">${escapeHtml(p.journal)}</p>
      ${
        p.doi
          ? `<a href="${escapeAttr(p.doi)}" class="pub-doi" target="_blank" rel="noopener noreferrer">DOI →</a>`
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
  // reduced-motion が有効ならスキップ（CSS 側で即表示される）
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // 全要素を即座に表示
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
  renderPublications();
  initMobileNav();
  initScrollReveal();
  initActiveNav();
});
