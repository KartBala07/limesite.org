# limesite.org

Static website for **FRC Team 1678 — Citrus Circuits**, the FIRST Robotics
Competition team based in Davis, California.

The site is a collection of hand-authored static HTML pages (each with its own
embedded styles) and is deployed to **GitHub Pages** from the [`pages/`](pages)
directory via [`.github/workflows/static.yml`](.github/workflows/static.yml).

## Project structure

```
pages/                     # site root (served by GitHub Pages)
├── index.html             # home page
├── resources.html         # standalone top-level pages
├── sponsors.html
├── support.html
├── capital_city_classic.html
│
├── about/                 # "About" nav section
│   ├── about.html  leadership.html  subteams.html
│   ├── recruitment.html  first_leadership.html
│   └── faq.html  contact.html  1857.html
├── outreach/              # "Outreach" nav section
│   └── outreach.html  dyr.html
├── robots/                # robot index + per-robot detail pages
│   ├── our_robots.html  2026_robot.html
│   └── robot_<year>_<name>.html      (2009–2025)
├── seasons/               # team history + per-season recaps
│   ├── history.html
│   └── season_<year>.html            (2016–2025)
├── blog/                  # build blogs / newsletters
│   └── blog_<year>.html              (2022–2025)
│
└── pictures/              # all images (robots, people, logos, covers)
```

The folders mirror the site's navigation: pages live next to the nav section
they belong to. `index.html` and a few standalone pages stay at the root.

## Conventions

- **No build step.** Every page is plain HTML with an inline `<style>` block;
  open any file directly in a browser to preview it.
- **Relative links.** Pages reference each other and images with paths relative
  to their own folder — siblings by bare name, other folders and `pictures/`
  via `../`.
- **Theming.** Colors are driven by CSS variables on `:root[data-theme]`
  (dark/light), toggled by the theme button and persisted in `localStorage`.
- **Robot pages** share a common layout: a hero image, detail sections
  (Drivetrain, Scoring, etc.), an achievements list, and a contact CTA.

## Local preview

```sh
cd pages
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Pushing to `main` triggers the GitHub Pages workflow, which publishes the
contents of `pages/` automatically.
