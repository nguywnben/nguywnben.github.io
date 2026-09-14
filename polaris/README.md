# Polaris landing page

Static landing page for `https://nguywnben.github.io/polaris/`. No framework, build step, analytics, backend, or npm dependencies.

From the parent website repository, preview with:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/polaris/?lang=vi`. Keep the server running while previewing. JSON translations require HTTP, rather than opening `index.html` with `file://`.

## Source review

Based on the local `omni-gateway` repository at commit `83e37e0`, which already identifies the product as **Polaris**. The old directory name is not the current brand.

- `README.md` and `docs/architecture.md`: FastAPI backend; standalone management console; routing, protocol translation, credential orchestration, fallback, usage and cost visibility. Built for an individual or trusted team, one worker and one replica.
- `frontend/css/foundation.css` and `frontend/index.html`: Google Sans, monochrome light/dark tokens, thin borders, 8px control corners, four-point star. The existing console screenshot still carries the old name; the landing page uses a clearly labelled illustrative console, not that outdated screenshot.
- `frontend/js/core/locales.js` and `backend/core/i18n.py`: exactly 15 locales. All landing-page text and control labels are independently translated, including light/dark labels, copy feedback and page metadata. English and Vietnamese semantic review is a statement about the source project's console, not a claim of external review of these new translations.
- `docs/installation.md`: canonical Docker Compose commands pinned to release `1.5.0`, Windows PowerShell variant, Linux/amd64 deployment limitation, local first-run setup. Recheck the source guide before changing release pins.
- `frontend/assets/`: logo, favicon and all nine provider logos copied unchanged. Their brand names remain untranslated.
- `LICENSE`: MIT; source attribution belongs to nguywnben, 2026. See the included asset notice.

## Languages and interactions

`en`, `zh-CN`, `zh-TW`, `de`, `es`, `fr`, `id`, `it`, `ja`, `ko`, `pt`, `ru`, `th`, `tr`, `vi`.

Resolution order: valid `?lang=` → saved choice → supported browser language → English. Chinese regional/script variants are mapped to simplified/traditional Chinese. The header language menu supports arrows, Home/End, type-ahead, Escape, Tab and outside-click dismissal. Selection updates the document language, metadata and shareable query string. Storage is optional. Theme follows the system until explicitly selected.

The preview's Routing, Credentials and Activity tabs are illustrative. They never call the gateway or use real account data. Tabs support arrow keys, Home and End. The install tabs switch platform-specific commands; the copy button copies the displayed commands and offers a manual-selection fallback if the clipboard is unavailable.

## Verification

```powershell
python polaris/tests/check_site.py
node --check polaris/app.js
node --check polaris/preferences.js
```

The static check validates all locale key sets, required page strings, asset paths, fragment links, unique IDs, branding and compatibility with the `/polaris/` subdirectory. Browser verification covers all 15 locales on mobile, representative long translations at 320/768/1024/1440px, both themes, tab keyboard navigation, persistence, installation commands, copy and browser errors. Local review screenshots live in ignored `.review/`.

## Files

- `index.html`: accessible page structure and English fallback.
- `styles.css`: responsive layout and inherited Polaris design tokens.
- `preferences.js`: theme applied before paint.
- `app.js`: language, theme, tabs and clipboard interactions.
- `locales/*.json`: complete per-language dictionaries.
- `assets/`: source project's brand assets.

Google Sans uses the same Google Fonts URL as the console, with a sans-serif fallback if unavailable. All other page assets are local. External links use the Polaris repository coordinates documented by the source repo; no remote repository content was changed.
