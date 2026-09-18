# Polaris landing page

Static landing page for `https://nguywnben.github.io/polaris/`. No framework, build step, analytics, backend, or npm dependencies.

From the parent website repository, preview with:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/polaris/?lang=vi`. Keep the server running while previewing. JSON translations require HTTP, rather than opening `index.html` with `file://`.

## Source review

Updated for **[Polaris 1.0.0](https://github.com/nguywnben/polaris/releases/tag/v1.0.0)**, published on 2026-09-18. The release tag resolves to `5dd45f9`; the local source was reviewed through `027c6d7`, which adds the current console screenshots and documentation. The local directory remains named `omni-gateway`; the product is Polaris.

- `README.md` and `docs/architecture.md`: FastAPI backend; standalone management console; routing, protocol translation, credential orchestration, fallback, usage and cost visibility. Built for an individual or trusted team, one worker and one replica.
- `frontend/css/foundation.css` and `frontend/index.html`: Google Sans, monochrome light/dark tokens, thin borders, 8px control corners, four-point star. Primary hover follows the current console (`#2f2f2f` light; `#ffffff` dark). The preview retains the approved compact interactive sidebar and schematic diagram, using localized HTML rather than screenshots.
- `frontend/js/core/locales.js` and `backend/core/i18n.py`: exactly 15 locales. All landing-page text and control labels are independently translated, including light/dark labels, copy feedback and page metadata. English and Vietnamese semantic review is a statement about the source project's console, not a claim of external review of these new translations.
- `docs/installation.md`: canonical Docker Compose commands pinned to `v1.0.0`, Windows PowerShell variant, readiness checks, Linux/amd64 deployment limitation, local first-run setup. Standard deployment is one worker, one replica and SQLite; PostgreSQL, team identity and external services are advanced options, not default requirements. macOS requires manual verification; native ARM64 images are not published.
- `docs/backup-and-restore.md` and `docs/updating.md`: backup, restore, health-checked updates and rollback. Existing installations should follow these guides instead of treating the clone command as an upgrade procedure.
- AI Quality: token-aware conversation cleanup, optional guardrails and exact-response caching. Cleanup preserves system instructions, tool-call relationships and recent messages.
- `frontend/assets/`: logo, favicon and all 23 provider logos. Provider and product names remain untranslated. Asset pixels are unchanged; provenance is documented in [assets/SOURCES.md](assets/SOURCES.md) and embedded in the copied PNGs.
- `LICENSE`: MIT; source attribution belongs to nguywnben, 2026. See the included asset notice.

## Languages and interactions

`en`, `zh-CN`, `zh-TW`, `de`, `es`, `fr`, `id`, `it`, `ja`, `ko`, `pt`, `ru`, `th`, `tr`, `vi`.

Resolution order: valid `?lang=` → saved choice → supported browser language → English. Chinese regional/script variants are mapped to simplified/traditional Chinese. The header language menu supports arrows, Home/End, type-ahead, Escape, Tab and outside-click dismissal. Selection updates the document language, metadata and shareable query string. Storage is optional. Theme follows the system until explicitly selected.

The preview’s Models & routing, Credentials and Activity tabs are illustrative HTML, not a live console. Their shared grid rows reserve space for every translated panel, keeping the frame and notes stationary. The schematic, sample credential rows and request trace adapt to the page’s language and theme. Tabs support arrow keys, Home and End; hidden panels are invisible and unfocusable. The install tabs switch platform-specific commands; the copy button copies the displayed commands and offers a manual-selection fallback if the clipboard is unavailable.

## Verification

```powershell
python polaris/tests/check_site.py
node --check polaris/app.js
node --check polaris/preferences.js
node --check polaris/release.js
node --check polaris/social/banner.js
```

The static check validates 15 locale dictionaries, required page strings, asset paths, fragment links, unique IDs, branding and `/polaris/` compatibility. It also checks the release pin, 23 provider assets, both platform readiness commands. Browser verification for this update covers desktop and mobile, all 15 locales at 390px without horizontal page overflow, both themes, tab keyboard navigation, stationary frame and notes across all three preview panels, the Windows copy action and browser errors. Local review screenshots live in ignored `.review/`.

## Files

- `index.html`: accessible page structure and English fallback.
- `styles.css`: responsive layout and inherited Polaris design tokens.
- `preferences.js`: theme applied before paint.
- `app.js`: language, theme, tabs and clipboard interactions.
- `release.js`: release version and provider catalog.
- `locales/*.json`: complete per-language dictionaries.
- `assets/`: source project's brand assets.
- `social/`: bilingual HTML banner, shared copy and direct high-resolution PNG renderer. See [social/README.md](social/README.md).

Google Sans uses the same Google Fonts URL as the console, with a sans-serif fallback if unavailable. All other page assets are local. External links use the Polaris repository coordinates documented by the source repo; no remote repository content was changed.
