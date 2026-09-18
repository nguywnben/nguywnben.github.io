# nguywnben.github.io

The homepage and landing-page repository for projects by **nguywnben**. Each project has its own directory, URL and visual identity. The homepage serves as a directory for discovering these projects.

**Website:** [nguywnben.github.io](https://nguywnben.github.io/)

## Projects

| Project | Description | Landing page | Source code |
| --- | --- | --- | --- |
| Polaris 1.0.0 | A self-hosted AI gateway with 23 providers, routing, protocol translation and fallback. Its landing page supports 15 languages. | [Explore Polaris](https://nguywnben.github.io/polaris/) | [nguywnben/polaris](https://github.com/nguywnben/polaris) |

This repository contains project websites. Each application's source code is maintained in a separate repository.

## Repository language

Use English for repository documentation, README files, code comments, commit messages, pull requests, issue templates and repository metadata. Visitor-facing page content may be multilingual when requested for that page. Keep localized content and accessibility labels in the page's translation resources; do not translate repository documentation into additional languages.

## Structure

```text
.
├── index.html              # Homepage: project directory
├── home.css                # Homepage styles
├── home.js                 # English/Vietnamese content and language selection
├── assets/home/            # Homepage assets
├── README.md
└── polaris/                # Landing page at /polaris/
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── release.js          # Release version and provider catalog
    ├── preferences.js
    ├── assets/
    ├── locales/            # 15 translations
    ├── tests/
    ├── social/             # English/Vietnamese banners and PNG exports
    └── README.md
```

The website uses static HTML, CSS and JavaScript, with no framework, package installation or build step required for local development. The homepage includes English content in its HTML and remains readable without JavaScript. JavaScript adds Vietnamese translations and the EN/VI switch. Each landing page keeps its own assets and styles in its project directory so it can evolve independently.

## Local preview

With Python 3 installed, run this command from the repository root:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

- Homepage: <http://127.0.0.1:4173/>
- Polaris in English: <http://127.0.0.1:4173/polaris/?lang=en>
- Polaris in Vietnamese: <http://127.0.0.1:4173/polaris/?lang=vi>

Keep the terminal running while previewing. Use HTTP instead of opening HTML files directly so landing pages can load their assets and JSON translations correctly.

## Homepage languages

The homepage supports English and Vietnamese. Selection priority is: `?lang=en` or `?lang=vi`, then a saved preference, then the first supported browser language, then English. A browser that prefers Vietnamese opens the Vietnamese version automatically when no explicit preference exists. The header's EN/VI switch remembers the selection and updates the title, description and accessibility labels. Links to Polaris carry the current language.

Both language dictionaries are defined in `home.js`. When adding page content, update both dictionaries and the English fallback in `index.html`.

## Adding a landing page

1. Create a project directory, such as `project-name/`, with an `index.html` entry point.
2. Keep its CSS, JavaScript, images and translations in that directory. Use relative paths such as `./assets/logo.svg` so the page works under `/project-name/`.
3. Add a project entry to `#projects` in the root `index.html`, update the project count in both homepage dictionaries and link to `./project-name/`.
4. Update the project table in this README. Add a project-specific README if further instructions are needed.
5. Check the page locally on desktop and mobile, including keyboard navigation, links and assets. Links within this website open in the same tab; external links use `target="_blank" rel="noopener noreferrer"`.
6. Commit and push when ready to publish.

After deployment, the new page is available at `https://nguywnben.github.io/project-name/`.

## Verification

```sh
node --check home.js
python polaris/tests/check_site.py
node --check polaris/app.js
node --check polaris/preferences.js
```

Node.js is needed only for the JavaScript syntax checks. See the [Polaris README](polaris/README.md) for translation coverage, interactions and design sources.

## Deployment

GitHub Pages is configured under **Settings → Pages**:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Pushing to `main` triggers deployment. Monitor the result in [Actions](https://github.com/nguywnben/nguywnben.github.io/actions). The homepage is served at `/`; each project directory is served at its corresponding path. A separate `gh-pages` branch is not required.

## Assets

The homepage uses the Polaris logo from `polaris/assets/logo.png`. Polaris asset attribution and licensing are documented in [polaris/assets/LICENSE](polaris/assets/LICENSE). New landing pages should document the sources and licenses of their assets.
