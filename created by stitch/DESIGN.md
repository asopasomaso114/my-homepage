# Design System Document: Academic Mysticism

## 1. Overview & Creative North Star: "The Arcane Editorial"
This design system is a transition from the mundane to the magical. It rejects the "app-like" density of modern SaaS in favor of a high-end, editorial experience inspired by the atmosphere of *Mahoutsukai no Yoru*. 

**The Creative North Star: "The Arcane Editorial"**
The goal is to make every screen feel like a page from a rare, modern grimoire. We achieve this by balancing the cold, vast depth of the Prussian Blue (`surface`) with the warmth of Antique White (`on-surface`) and the authoritative weight of Newsreader. To break the "template" look, we use intentional asymmetry—wide margins, off-center headings, and overlapping "glass" containers—to create a sense of curated mystery rather than industrial efficiency.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in high contrast to ensure that "mystical" never translates to "unreadable."

### The Palette
*   **Primary (Aged Brass):** `#f7bd48` (Primary) / `#ba880f` (Container). Used for illumination—CTAs, active states, and critical highlights.
*   **Surface (Prussian Blue):** `#0c1420`. The foundational "void" of the application.
*   **On-Surface (Antique White):** `#dbe2f4`. High-legibility text that feels aged, not sterile.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** 
Standard UI uses lines to separate content; this system uses *tonal shifts*. Boundaries must be defined by placing a `surface-container-low` section against the `surface` background. If you need to separate two pieces of content, use a background shift or a vertical jump of `spacing-8` (2.75rem).

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers:
1.  **Base:** `surface` (#0c1420) – The furthest depth.
2.  **Sections:** `surface-container-low` (#141c28) – Broad content areas.
3.  **Components:** `surface-container-high` (#232a37) – Modals or focused cards.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat," use **Glassmorphism** for floating elements (like navigation bars or hovering tooltips). Use the `surface-variant` color with a 60% opacity and a `backdrop-blur` of 12px. For main CTAs, apply a subtle linear gradient from `primary` (#f7bd48) to `primary-container` (#ba880f) at a 135-degree angle to simulate the sheen of polished brass.

---

## 3. Typography: The Scholarly Voice
Typography is our primary vehicle for the "Academic" feel. We pair the elegant, variable-serif **Newsreader** with the utilitarian **Inter** for functional metadata.

*   **Display (Newsreader):** Use for hero moments. `display-lg` (3.5rem) should be used sparingly, often set in *italic* to emphasize the "Witch" aesthetic.
*   **Headlines (Newsreader):** `headline-md` (1.75rem) provides the structural authority of a textbook.
*   **Body (Newsreader):** `body-lg` (1rem) is the workhorse. The high x-height of Newsreader ensures exceptional legibility against the dark background.
*   **Labels (Inter):** `label-md` (0.75rem) is used for technical data, bilingual sub-labels (English/Japanese), and small UI buttons.

**Bilingual Strategy:** When displaying Japanese alongside English, the Japanese characters should be set at 90% of the English font size to maintain visual optical balance, as Kanji often appears heavier than Latin glyphs.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We use **Ambient Shadows** and **Tonal Stacking**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The slight darkening creates a "recessed" look, like an inset bookplate.
*   **Ambient Shadows:** For elevated elements (modals), use a shadow color of `#070e1a` (the background tint) with a blur of `32px` and an opacity of `8%`. It should feel like a soft glow of darkness, not a hard shadow.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. A 100% opaque border is a failure of the system.

---

## 5. Components

### Buttons (The "Brass" Standard)
*   **Primary:** Solid `primary` background with `on-primary` text. Use `rounded-sm` (0.125rem) for a sharp, chiseled look. No rounded "pills."
*   **Secondary:** `outline-variant` ghost border (20% opacity) with `primary` text.
*   **Tertiary:** Text only in `primary`, using `label-md` for a scholarly look.

### Input Fields
*   **Style:** Underline-only or subtle `surface-container-highest` fills. 
*   **States:** The "Focus" state should swap the underline to `primary` (Aged Brass) and introduce a 2px `primary` left-border accent to the container.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing-4` (1.4rem) between list items.
*   **Interaction:** On hover, a card should shift from `surface-container-low` to `surface-container-high` rather than growing in size.

### Custom Component: "The Manuscript Header"
For bilingual support, every major section should have a `headline-sm` in English, with a `label-sm` in Japanese placed 0.5rem above it in `primary` (Aged Brass). This creates a vertical "stamp" effect.

---

## 6. Do's and Don'ts

### Do
*   **DO** use ample white space. The layout should feel like it has room to breathe, mimicking a premium print magazine.
*   **DO** use italics in Newsreader to emphasize key "mystical" terms or secondary headers.
*   **DO** leverage the `surface-container` tiers to create a "nested" layout.

### Don't
*   **DON'T** use pure white (#FFFFFF). It will vibrate against the Prussian Blue and cause eye strain. Stick to `on-surface` (Antique White).
*   **DON'T** use `rounded-full`. This system is academic and structured; use `sm` (2px) or `md` (6px) corners only.
*   **DON'T** use standard 1px borders. If a section needs to be separated, use a background color shift or a large spacing gap.