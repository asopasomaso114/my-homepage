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
    title: "準備中",
    description:
      "準備中",
    tags: ["準備中", "準備中", "準備中"],
    url: "https://github.com/YOUR_USERNAME/project-watershed",
  },

];

// ─── Presentations (学会発表) データ ────────────────────────
// 各オブジェクトが学会発表 1 件になります。
const presentations = [
  {
    title: "Environmental gradients and feed quality control pacific oyster growth in coastal japan",
    conference: "The International Society for ECOLOGICAL MODELLING GLOBAL CONFERENCE 2025 (ISEM 2025)",
    type: "Poster",
    date: "2025",
  },
  {
    title: "Linking Coastal Environmental Drivers to Pacific Oyster Condition via Causal Analysis with Bayesian Networks",
    conference: "Ocean Science Meeting 2026 (OSM 2026)",
    type: "Poster",
    date: "2026",
  },
  {
    title: "ベイジアンネットワークに基づく、マガキ成育・体組成に対する環境因子の影響の解析",
    conference: "第60回 日本水環境学会年会",
    type: "口頭発表およびポスター発表",
    date: "2026",
    award: "🏆 クリタ賞受賞！！",
  },
];

// ─── Certifications (デジタルバッジ) データ ────────────────────────────
// Open Badges v2 JSON ファイルからのデータ
const certifications = [
  {
    name: "高度情報人材MCプログラム\nAdvanced Information Leader MC Program",
    issuer: "netlearning.co.jp",
    issuedOn: "2026-03-19",
    imageUrl: "https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/Assertion/dmZGRmowN1BiNEdMSytIaGhaQXZrZz09/image",
  },
  {
    name: "JDLA Deep Learning for ENGINEER (E資格)",
    issuer: "日本ディープラーニング協会 (JDLA)",
    issuedOn: "2026",
    imageUrl: "engineer2026%231_regular.svg",
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
      ${w.tags && w.tags.length
          ? `<div class="work-tags">${w.tags
            .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
            .join("")}</div>`
          : ""
        }
      ${w.url
          ? `<a href="${escapeAttr(w.url)}" class="card-link" target="_blank" rel="noopener noreferrer">詳しく見る</a>`
          : ""
        }
    </article>`
    )
    .join("");
}

/**
 * Presentations リストを生成して #presentations-list に挿入
 */
function renderPresentations() {
  const list = document.getElementById("presentations-list");
  if (!list) return;

  list.innerHTML = presentations
    .map(
      (p) => `
    <li class="presentation-item">
      <span class="presentation-date">${escapeHtml(p.date)}</span>
      <div class="presentation-body">
        <p class="presentation-title">${escapeHtml(p.title)}</p>
        <p class="presentation-conference">${escapeHtml(p.conference)}</p>
        <span class="tag presentation-type">${escapeHtml(p.type)}</span>
      </div>
    </li>`
    )
    .join("");
}

/**
 * Certifications カードを生成して #certifications-grid に挿入
 */
function renderCertifications() {
  const grid = document.getElementById("certifications-grid");
  if (!grid) return;

  grid.innerHTML = certifications
    .map(
      (c) => `
    <div class="cert-card">
      <img class="cert-badge-img" src="${escapeAttr(c.imageUrl)}" alt="${escapeAttr(c.name)} バッジ画像" loading="lazy" />
      <div class="cert-info">
        <p class="cert-name">${escapeHtml(c.name).replace(/\n/g, '<br>')}</p>
        <p class="cert-issuer">発行: ${escapeHtml(c.issuer)}</p>
        <p class="cert-date">取得日: ${escapeHtml(c.issuedOn)}</p>
      </div>
    </div>`
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
  renderPresentations();
  renderCertifications();
  initMobileNav();
  initScrollReveal();
  initActiveNav();
});
