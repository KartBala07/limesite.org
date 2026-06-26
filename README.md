# limesite.org

Official website for **FRC Team 1678 — Citrus Circuits**, the FIRST Robotics Competition team based in Davis, California. Built as a fully static HTML site with no build tools, no frameworks, and no external JavaScript libraries — every feature is hand-coded directly into each page.

Live at: **https://kartbala07.github.io/limesite.org**

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [How Each Page Is Built](#how-each-page-is-built)
3. [Theming System (Dark / Light Mode)](#theming-system-dark--light-mode)
4. [Loading Screen](#loading-screen)
5. [Navigation Bar](#navigation-bar)
6. [Search System (Nav + Footer)](#search-system-nav--footer)
7. [Footer](#footer)
8. [Mobile Responsiveness](#mobile-responsiveness)
9. [Custom Cursor](#custom-cursor)
10. [Robot Pages](#robot-pages)
11. [Season Pages](#season-pages)
12. [Support Pages (DRF, Niklas Murray, etc.)](#support-pages)
13. [Outreach Pages (DYR, WiSE, etc.)](#outreach-pages)
14. [Blog Pages](#blog-pages)
15. [Login / Profile System](#login--profile-system)
16. [Adding a New Page](#adding-a-new-page)
17. [Local Preview](#local-preview)
18. [Deployment](#deployment)

---

## Project Structure

```
limesite.org/
├── .github/
│   └── workflows/
│       └── static.yml         # GitHub Actions: auto-deploys pages/ to GitHub Pages on push to main
│
├── pages/                     # ← Everything inside here is served live
│   ├── index.html             # Home page (hero, CAD viewer, robot showcase, resources)
│   ├── resources.html         # Resources hub (handbook, blogs, training, media)
│   ├── sponsors.html          # Sponsor showcase with tiers and logos
│   ├── support.html           # Support Us overview (DRF, Nik Murray, volunteers, etc.)
│   ├── capital_city_classic.html  # Capital City Classic off-season event
│   ├── build_blogs.html       # Build blogs / newsletters hub
│   ├── team_handbook.html     # Team handbook viewer / links
│   ├── technical_training.html    # Technical training resources
│   ├── media.html             # Media gallery (photos, videos)
│   ├── djusd_cte.html         # DJUSD CTE courses page
│   ├── cheers.html            # Team cheers page
│   ├── login.html             # Firebase-based login page
│   ├── profile.html           # User profile page (Firebase Auth)
│   ├── admin.html             # Admin panel
│   │
│   ├── about/
│   │   ├── about.html         # About the team (history, values, mission)
│   │   ├── leadership.html    # Captains and student leadership
│   │   ├── subteams.html      # Subteam breakdown (Mechanical, Electrical, Software, etc.)
│   │   ├── recruitment.html   # How to join / application info
│   │   ├── first_leadership.html  # FIRST leadership roles held by team members
│   │   ├── faq.html           # Frequently asked questions
│   │   ├── contact.html       # Contact information
│   │   ├── credits.html       # Site and team credits
│   │   └── 1857.html          # 1857 Citrus Sparks (junior team)
│   │
│   ├── outreach/
│   │   ├── outreach.html      # Outreach overview
│   │   ├── dyr.html           # Do Your Research (DYR) main page
│   │   ├── dyr_league.html    # DYR League info
│   │   ├── dyr_school_programs.html  # DYR school programs
│   │   ├── robocamps.html     # RoboCamps registration
│   │   ├── robocamps_about.html   # About RoboCamps
│   │   ├── robocamps_forms.html   # RoboCamps forms
│   │   ├── robocamps_resources.html  # RoboCamps resources
│   │   ├── citrus_service.html    # Citrus Service outreach program
│   │   ├── farmers_market.html    # Farmers Market outreach
│   │   ├── fall_workshops.html    # Fall Workshops program
│   │   ├── lgbtq.html         # LGBTQ+ of FIRST page
│   │   ├── distem.html        # DiSTEM outreach
│   │   ├── wise.html          # WiSE (Women in STEM & Engineering)
│   │   └── robot_demos.html   # Robot Demos info
│   │
│   ├── robots/
│   │   ├── our_robots.html    # All robots overview (2009–2026)
│   │   ├── 2026_robot.html    # Current season robot (Limestone)
│   │   └── robot_<year>_<name>.html  # Per-robot detail pages (2009–2025)
│   │
│   ├── seasons/
│   │   ├── history.html       # Full season history timeline
│   │   ├── steve_harvey.html  # Steve Harvey moment page
│   │   └── season_<year>.html # Per-season recap pages (2016–2025)
│   │
│   ├── support/
│   │   ├── drf.html           # Davis Robotics Foundation
│   │   ├── nik_murray.html    # Niklas Murray Memorial Scholarship
│   │   ├── parent_committee.html  # Parent Logistics Committee
│   │   ├── reimbursements.html    # Reimbursement info
│   │   └── volunteer_opportunities.html  # Volunteer opportunities
│   │
│   ├── blog/
│   │   ├── blog_2022.html     # 2022 build blog entries
│   │   ├── blog_2023.html     # 2023 build blog entries
│   │   ├── blog_2024.html     # 2024 build blog entries
│   │   └── blog_2025.html     # 2025 build blog entries
│   │
│   ├── js/
│   │   └── firebase-config.js # Firebase configuration (Auth setup)
│   │
│   └── pictures/              # All images, organized by subject
│       ├── robots/            # Robot hero shots and CAD images (2009–2026)
│       ├── people/            # Captains, leadership, team photos
│       ├── sponsors/          # Sponsor logos
│       ├── support us/        # DRF, Niklas Murray, parent committee photos
│       ├── outreach/          # Outreach event photos
│       ├── 2026/              # Current season build process photos
│       └── site/              # Logos, favicon, nav/footer branding, misc UI
```

---

## How Each Page Is Built

Every page follows the same self-contained structure — **no shared CSS files, no template engine, no components**. Each `.html` file contains everything it needs:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <!-- Meta, fonts (Google Fonts: Bebas Neue + JetBrains Mono), favicon -->
  <style>
    /* ALL CSS for this page lives here — theme variables, layout, components */
  </style>
</head>
<body>
  <!-- Custom cursor dots -->
  <div id="cdot"></div>
  <div id="cring"></div>

  <!-- Loading screen -->
  <div id="loader"> ... </div>

  <!-- Fixed navigation bar -->
  <header> ... </header>

  <!-- Page content -->
  <main> ... </main>

  <!-- Footer with search -->
  <footer> ... </footer>

  <!-- All JavaScript: theme toggle, loader dismiss, nav toggle, search, etc. -->
  <script> ... </script>
</body>
</html>
```

**Why no shared files?** Keeping each page standalone means you can open any `.html` file directly in a browser with no server, and it works. There's no risk of a shared CSS change breaking unrelated pages.

---

## Theming System (Dark / Light Mode)

### How it works

Every page has two root CSS variable sets:

```css
:root[data-theme="dark"] {
  --bg-darkest: #050606;
  --bg-dark: #0b0d0d;
  --bg-card: #111414;
  --bg-dropdown: #121616;
  --lime: #3CD52E;           /* the signature green accent */
  --lime-soft: #7fe676;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --border: rgba(255,255,255,.06);
  --header-bg: rgba(5,6,6,.9);
}

:root[data-theme="light"] {
  --bg-darkest: #f9fafb;
  --bg-dark: #f3f4f6;
  --bg-card: #ffffff;
  --bg-dropdown: #ffffff;
  --lime: #3CD52E;
  --lime-soft: #2fa824;
  --text-main: #111827;
  --text-muted: #4b5563;
  --border: rgba(0,0,0,.08);
  --header-bg: rgba(255,255,255,.92);
}
```

The `data-theme` attribute on `<html>` switches the active variable set. Every color used in the page references a `var(--...)` so it automatically adapts.

### Theme toggle button

The theme toggle button (sun/moon icon in the nav) runs this JavaScript on every page:

```js
const themeToggleBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

- On page load, it reads the saved preference from `localStorage` (defaults to `dark`).
- On click, it flips between `dark` and `light` and saves the new value to `localStorage`.
- Because `localStorage` persists across pages, the chosen theme is remembered site-wide.

### Sun/Moon icon swap

The CSS handles which icon is visible:

```css
[data-theme="dark"]  .sun-icon  { display: none; }
[data-theme="dark"]  .moon-icon { display: block; }
[data-theme="light"] .sun-icon  { display: block; }
[data-theme="light"] .moon-icon { display: none; }
```

---

## Loading Screen

### What it looks like

Each page shows a full-screen dark overlay with:
- A spinning ring (SVG with a CSS stroke-dashoffset animation)
- The text "1678" in the center of the ring
- A cycling status message below (e.g., "Initializing Circuits", "Loading Systems", etc.)
- A progress bar filling left-to-right

### How it's built

**HTML structure:**
```html
<div id="loader">
  <div class="ld-n">1678</div>            <!-- ring + center text -->
  <div class="ld-sub">Initializing Circuits</div>  <!-- cycling message -->
  <div class="ld-bw"><div class="ld-b"></div></div> <!-- progress bar -->
</div>
```

**CSS animation** for the spinning ring:
```css
@keyframes ldRing { to { stroke-dashoffset: 0; } }
.ld-ring-fg {
  stroke-dasharray: 345;
  stroke-dashoffset: 345;
  animation: ldRing 1.8s ease-in-out forwards;
}
```
The stroke starts fully "hidden" (offset = full circumference) and animates to 0 (fully drawn), creating the fill-in effect.

**JavaScript** dismisses the loader after a fixed time:

```js
// On the index page:
(function(){
  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    document.getElementById('loader').classList.add('out');
  }
  setTimeout(dismiss, 1750);  // always shows for 1.75 seconds
})();

// On all other pages (with cycling messages):
const msgs = ['Loading Systems', 'Calibrating Sensors', 'Engaging Drive', ...];
let mi = 0;
const msgTick = setInterval(() => {
  mi = (mi + 1) % msgs.length;
  subEl.textContent = msgs[mi];
}, 420);

setTimeout(() => {
  clearInterval(msgTick);
  document.getElementById('loader').classList.add('out');
}, 1750);
```

**Fade out CSS:**
```css
#loader { transition: opacity .8s, visibility .8s; }
#loader.out { opacity: 0; visibility: hidden; pointer-events: none; }
```
Adding the `out` class triggers the CSS transition — the loader fades smoothly rather than disappearing instantly.

---

## Navigation Bar

### Structure

Every page has a `<header>` containing a `.navbar` div with:

```
[Logo + Team Name]   [Nav links with dropdowns]   [Search] [Theme] [Sign In] [Apply]
```

### CSS

The navbar is `position:fixed` so it sticks to the top as you scroll:

```css
header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background-color: var(--header-bg);  /* semi-transparent + blur */
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.navbar {
  max-width: 1560px;
  height: 80px;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Pages in subdirectories (`about/`, `outreach/`, etc.) use `max-width:1440px` and `height:95px` — slightly different proportions to match their content layout. The index page uses the wider `1560px` navbar.

### Dropdown panels

Each nav item with sub-pages uses a `.dropdown-panel` that's hidden by default and appears on hover:

```css
.dropdown-panel {
  position: absolute;
  top: 95px;   /* drops right below the navbar */
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease .15s, transform .3s ease .15s;
}
.nav-item:hover .dropdown-panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
```

The `.15s` delay on the `transition` prevents the dropdown from flickering when you accidentally move the mouse through the nav. A `::before` pseudo-element creates an invisible 14px bridge between the nav link and the panel so the mouse can travel without the panel disappearing:

```css
.dropdown-panel::before {
  content: '';
  position: absolute;
  top: -14px;  /* covers the gap between nav link and panel */
  left: 0; right: 0;
  height: 14px;
}
```

### Mobile hamburger menu

At screens ≤ 1100px wide, the standard nav menu is replaced by a slide-in panel:

```css
@media(max-width: 1100px) {
  .nav-toggle { display: flex !important; }  /* show hamburger button */
  .nav-menu {
    position: fixed !important;
    top: 0; right: -100%;     /* starts off-screen to the right */
    width: 82%; max-width: 340px;
    height: 100vh;
    transition: right .3s ease;
  }
  .nav-menu.open { right: 0; }  /* slides in */
}
```

**JavaScript** toggles the menu open/closed:

```js
var nt = document.getElementById('navToggle');
var nm = document.querySelector('.nav-menu');

nt.addEventListener('click', function() {
  nt.classList.toggle('open');   // animates hamburger → X
  nm.classList.toggle('open');   // slides the panel in/out
});

// For nav items with dropdowns on mobile:
// Tapping the chevron SVG arrow toggles the sub-list open/closed.
// Tapping the link text navigates to the page.
nm.querySelectorAll('.nav-item').forEach(function(item) {
  var lk = item.querySelector('.nav-link');
  if (lk && item.querySelector('.dropdown-panel')) {
    var sv = lk.querySelector('svg');
    if (sv) {
      sv.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();      // don't navigate
        item.classList.toggle('open');  // expand/collapse sub-list
      });
    }
  }
});
```

The hamburger button animation is pure CSS — the `<span>` with `::before` and `::after` pseudo-elements rotate into an X when `.open` is added:

```css
.nav-toggle.open span { background: transparent; }
.nav-toggle.open span::before { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open span::after  { transform: translateY(-7px) rotate(-45deg); }
```

---

## Search System (Nav + Footer)

Both search bars share the same `PAGES` data array but are implemented as separate dropdowns.

### The PAGES Data Array

Every page contains a `var PAGES = [...]` array embedded in a `<script>` tag. Each entry describes one page on the site:

```js
var PAGES = [
  {
    "t": "2026 Robot",               // page title (shown in results)
    "u": "/robots/2026_robot.html",  // URL path (appended to base URL)
    "c": "Robots",                   // category (shown as a tag)
    "k": "robot 2026 reefscape machine build limestone"  // keywords for search
  },
  // ... one entry per page on the site
];
window.SITE_PAGES = PAGES;  // expose globally for the footer search script
```

The `"k"` field is the key to smart search — it lets you find a page by describing it in plain words rather than knowing its exact title. For example, typing "limestone" finds the 2026 Robot page, typing "donate" finds the DRF page, typing "scholarship" finds the Niklas Murray page.

### Nav Search Bar

The nav search opens a full-screen overlay when you click the magnifying glass icon:

```html
<div class="nav-search-drop" id="navSearchDrop">
  <div class="nav-search-drop-inner">
    <form class="nav-search-form" id="navSearchForm">
      <input class="nav-search-input" id="navSearchInput" ...>
      <button class="nav-search-go" type="submit">Go</button>
    </form>
    <div class="nav-search-suggs" id="navSearchSuggs"></div>
  </div>
</div>
```

**How the search works:**

```js
navSearchInput.addEventListener('input', function() {
  var q = navSearchInput.value.trim().toLowerCase();
  var terms = q.split(/\s+/).filter(Boolean);

  // Search across title, URL, category, AND keywords
  var results = PAGES.filter(function(p) {
    var haystack = (p.t + ' ' + p.u + ' ' + p.c + ' ' + (p.k || '')).toLowerCase();
    return terms.some(function(t) { return haystack.indexOf(t) > -1; });
  }).slice(0, 6);  // max 6 suggestions

  // Build suggestion links
  results.forEach(function(p) {
    var a = document.createElement('a');
    a.href = BASE + p.u;     // full GitHub Pages URL
    a.innerHTML = p.t + ' <span>' + p.c + '</span>';
    navSearchSuggs.appendChild(a);
  });
});
```

- Typing triggers a live filter — no "search" button needed.
- Results match if ANY of your typed words appear anywhere in the page's title, URL, category, or keywords.
- Up to 6 suggestions are shown.
- Pressing **Enter** navigates to the first result.
- Pressing **Escape** closes the overlay.
- Clicking outside the overlay closes it.
- Keyboard arrow keys cycle through results (highlighted with `.ss-active` class).

### Footer Search Bar

The footer has a compact search input (`id="footerSearchInput"`) at the bottom-left of every page. It uses the same `SITE_PAGES` data and the same search algorithm as the nav bar.

**Key implementation detail:** The suggestion dropdown uses `position: fixed` and is appended directly to `document.body` — NOT inside the footer element. This is intentional: because the footer is at the bottom of the page, a `position: absolute` child would drop off-screen. By using `position: fixed` with dynamically-calculated coordinates, the suggestions always appear correctly above the input regardless of page layout.

```js
var suggs = document.createElement('div');
suggs.style.cssText = 'position:fixed; z-index:9000; ...';
document.body.appendChild(suggs);  // attached to body, not footer

function positionSuggs() {
  var r = fi.getBoundingClientRect();  // get input's actual screen position
  suggs.style.left   = r.left + 'px';
  suggs.style.width  = r.width + 'px';
  suggs.style.bottom = (window.innerHeight - r.top + 4) + 'px';  // appears above
}
```

---

## Footer

Every page shares an identical footer layout:

```
[Search input]          [Quick links]     [FIRST logo | 1678 logo]
[Team email]

© 2026 Citrus Circuits 1678.      Instagram · YouTube · Facebook · LinkedIn
```

The footer uses a 3-column CSS grid:

```css
.footer-grid {
  max-width: 1440px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.5fr;
  gap: 4rem;
}
@media(max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
}
```

---

## Mobile Responsiveness

The site uses CSS media queries to adapt layouts for smaller screens. The two main breakpoints are:

### 1100px — Navigation

```css
@media(max-width: 1100px) {
  /* Nav menu becomes a slide-in panel (see Navigation section above) */
}
```

### 768px — Page content

Most page-specific grid layouts collapse to a single column at 768px:

```css
@media(max-width: 768px) {
  .wrap { padding: 0 1rem; }        /* tighter side padding */
  .page-head { margin: 2rem auto 1.5rem; }
  .info-grid { grid-template-columns: 1fr; }
  .sp-split, .sp-split.reverse { flex-direction: column; gap: 1.5rem; }
  /* etc. — each page has its own set of mobile rules */
}
```

**Important:** `.sp-split.reverse` must be explicitly listed alongside `.sp-split` in the mobile rule — otherwise `.sp-split.reverse { flex-direction: row-reverse; }` has higher CSS specificity and overrides the column layout, causing the reverse sections to stay horizontal on mobile.

---

## Custom Cursor

On desktop (hover-capable) devices, the site replaces the default cursor with two layered dots:

```html
<div id="cdot"></div>   <!-- small filled dot, follows cursor exactly -->
<div id="cring"></div>  <!-- larger ring, follows with a lag -->
```

```css
#cdot  { position:fixed; width:10px;  height:10px;  background:var(--lime); border-radius:50%; }
#cring { position:fixed; width:34px;  height:34px;  border:1.5px solid var(--lime); border-radius:50%; opacity:.7; transition:width .25s, height .25s, opacity .25s; }
@media(hover:none) { #cdot, #cring { display:none; } body { cursor:auto; } }
```

JavaScript moves the dots:

```js
document.addEventListener('mousemove', function(e) {
  cdot.style.left  = e.clientX + 'px';
  cdot.style.top   = e.clientY + 'px';
  // cring uses lerp (smooth follow) in requestAnimationFrame loop
});
```

On touch devices, `@media(hover:none)` hides both dots and restores the default cursor automatically.

---

## Robot Pages

Each robot has its own page at `robots/robot_<year>_<name>.html` (e.g., `robot_2025_sublime.html`).

### Layout

Robot pages use a consistent zigzag layout:

```
[Hero image — full width]
[Specs strip: Game, Weight, Drivetrain, Autonomous]
[Section: Drivetrain — photo left, description right]
[Section: Scoring  — description left, photo right]
[Section: Autonomous — photo left, description right]
[Achievements list]
[CTA: Contact / Apply]
```

The zigzag is achieved with alternating `.detail-row` and `.detail-row.reverse` divs — same CSS technique as the support pages.

### 2026 Robot (Limestone)

The current robot page (`2026_robot.html`) also includes a live **OnShape CAD embed** — a 3D model iframe that lets visitors interact with the CAD directly in the browser.

---

## Season Pages

Each season has a recap page at `seasons/season_<year>.html` (2016–2025). They share a common layout:

- Season header (game name, year)
- Event results table (regional/district name, rank, awards)
- Championship results (if applicable)
- Robot highlights

The `seasons/history.html` page shows an overview timeline of all seasons with brief stats for each year.

---

## Support Pages

Support pages live in `pages/support/` and use a "zigzag" layout — alternating sections of text left/photo right, then photo left/text right. This is built with `.sp-split` and `.sp-split.reverse`:

```css
.sp-split         { display:flex; gap:3rem; align-items:flex-start; }
.sp-split.reverse { flex-direction: row-reverse; }

.sp-photos { flex-shrink:0; width:580px; }  /* fixed-width photo column (DRF) */
.sp-text   { flex:1; }                       /* text fills remaining space */
```

**Pages:**
- `drf.html` — Davis Robotics Foundation: donations, board, grant info
- `nik_murray.html` — Niklas Murray Memorial Scholarship: about, how to apply, past winners, legacy
- `parent_committee.html` — Parent Logistics Committee: roles, how to get involved
- `reimbursements.html` — Expense reimbursement process for team members
- `volunteer_opportunities.html` — Ways to volunteer at events

**Navigation note:** The "Support Us" dropdown in the nav links directly to each subpage (`support/drf.html`, `support/nik_murray.html`, etc.) — not to anchors on `support.html`. This ensures clicking any dropdown option takes you straight to that subpage without an intermediate redirect.

---

## Outreach Pages

Outreach pages live in `pages/outreach/` and cover the team's community programs:

- **DYR (Do Your Research)** — Davis Youth Robotics programs: RoboCamps, DYR League, school programs
- **WiSE** — Women in STEM & Engineering workshops
- **DiSTEM** — Diversity in STEM outreach
- **Citrus Service** — Helping other teams at competitions
- **Farmers Market** — Community presence at the Davis Farmers Market
- **Fall Workshops** — Pre-season robotics workshops for students
- **LGBTQ+ of FIRST** — Inclusion and awareness within the FIRST community
- **Robot Demos** — Public robot demonstration events

---

## Blog Pages

Build blogs live in `pages/blog/blog_<year>.html` (2022–2025). Each blog page lists entries chronologically with date, title, and content. They link to the main `build_blogs.html` hub page.

---

## Login / Profile System

The site has an optional login system backed by **Firebase Authentication**:

- `login.html` — Email/password login form; Firebase handles auth
- `profile.html` — Shows user info when logged in; links to team resources
- `admin.html` — Admin panel (restricted)
- `js/firebase-config.js` — Firebase project config (API key, auth domain, etc.)

The login system is optional — the rest of the site works fully without it.

---

## Adding a New Page

1. **Copy an existing page** that has a similar layout as your starting point.

2. **Update the `<title>` tag** and page heading to match the new page.

3. **Update the `active` class** on the nav link that corresponds to this page's section:
   ```html
   <a href="your-page.html" class="nav-link active">Your Section</a>
   ```

4. **Add an entry to the `PAGES` array** on every page. Find the `var PAGES = [...]` block (it's in the nav search `<script>`) and add:
   ```js
   {"t":"Your Page Title","u":"/path/to/your-page.html","c":"Category","k":"keyword1 keyword2 descriptive words"}
   ```
   - `"t"` — The title shown in search results
   - `"u"` — The URL path (starts with `/`, relative to the site root)
   - `"c"` — Category label shown as a tag (e.g., `"About"`, `"Outreach"`, `"Robots"`)
   - `"k"` — Space-separated keywords that describe the page in plain language

   **You must add this entry to EVERY page's PAGES array** so the new page appears in search results from anywhere on the site. The easiest way is to run a Python script:

   ```python
   import glob, re
   entry = '{"t":"Page Title","u":"/path.html","c":"Category","k":"keyword1 keyword2"},'
   for path in glob.glob('pages/**/*.html', recursive=True):
       with open(path, 'r') as f: content = f.read()
       if 'var PAGES=[' in content:
           content = content.replace('var PAGES=[', 'var PAGES=[' + entry, 1)
           with open(path, 'w') as f: f.write(content)
   ```

5. **Link to the new page** from the navigation bar and any relevant footer links. For a top-level nav item, add a `<li>` to the `<ul class="nav-menu">` in every page. For a dropdown item, add an `<a>` inside the relevant `.dropdown-panel`.

6. **Update links to use the correct relative path.** Pages in `pages/` root use bare filenames (`about/about.html`). Pages in subdirectories use `../` to go up (`../index.html`, `../pictures/site/logo.png`).

---

## Local Preview

No build step needed — just serve the `pages/` directory:

```sh
cd pages
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

Or use any static file server (VS Code Live Server, `npx serve`, etc.).

**Direct file opening** also works for most pages — double-click any `.html` file. The only features that won't work without a server are Firebase Auth (requires a proper origin) and any absolute URL redirects.

---

## Deployment

### Automatic (GitHub Pages)

Pushing any commit to `main` automatically triggers the GitHub Actions workflow at `.github/workflows/static.yml`:

1. **Checkout** — fetches the repo
2. **Setup Pages** — configures the GitHub Pages environment
3. **Upload artifact** — packages the `pages/` directory (only `pages/`, not the whole repo)
4. **Deploy** — publishes to GitHub Pages

The live site is available at: `https://kartbala07.github.io/limesite.org`

Only one deployment runs at a time — if two pushes happen quickly, the second waits for the first to complete (it won't cancel an in-progress deploy).

### Manual trigger

You can also trigger a deploy manually from the GitHub Actions tab → "Deploy static content to Pages" → "Run workflow".

### Workflow file

```yaml
name: Deploy static content to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 'pages'
      - id: deployment
        uses: actions/deploy-pages@v5
```
