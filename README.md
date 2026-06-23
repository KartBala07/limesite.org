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
├── about.html             # core / informational pages
├── leadership.html        # (subteams, recruitment, sponsors, contact, etc.)
├── our_robots.html        # index of every competition robot
├── 2026_robot.html        # current-season robot
├── history.html           # team history / season index
│
├── robots/                # one detail page per competition robot
│   └── robot_<year>_<name>.html      (2009–2025)
├── seasons/               # per-season recap pages
│   └── season_<year>.html            (2016–2025)
├── blog/                  # build blogs / newsletters
│   └── blog_<year>.html              (2022–2025)
│
└── pictures/              # all images (robots, people, logos, covers)
```

## Conventions

- **No build step.** Every page is plain HTML with an inline `<style>` block;
  open any file directly in a browser to preview it.
- **Relative links.** Pages in the root link to subfolders with
  `robots/…`, `seasons/…`, `blog/…`; pages inside a subfolder reach the root
  and images with `../`.
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
