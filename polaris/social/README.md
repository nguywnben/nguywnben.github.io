# Polaris 1.0.0 social banners

English and Vietnamese banners using the approved Polaris composition: Google Sans, monochrome typography, original brand marks and a light gateway node. Both identify release 1.0.0, 23 providers and 15 interface languages. The fixed 1200 × 630 HTML artboard scales to fit the viewport without reflowing.

## Preview and export

Start the repository's local server and open:

```text
http://127.0.0.1:4173/polaris/social/banner.html?lang=vi
http://127.0.0.1:4173/polaris/social/banner.html?lang=en
```

Use the lossless PNG files in `exports/` for posting. Each language has a **4800 × 2520** original, a **2400 × 1260** export and a **1200 × 630** preview. They are drawn directly at 4× resolution from font outlines, geometry and logos, rather than enlarging a compressed browser screenshot. Source attribution is embedded in PNG metadata.

Edit localized copy in `copy.json`; `banner.js` applies the chosen language to `banner.html`. Keep the HTML's no-JavaScript Vietnamese fallback in sync. Layout is in `banner.css`; `render_banners.py` reproduces the approved composition for PNG output and reads the same copy. Update both layout implementations if the composition changes.

To regenerate, install Python and Pillow, supply Google Sans TTF files named `GoogleSans-400.ttf`, `GoogleSans-500.ttf`, `GoogleSans-600.ttf`, `GoogleSans-700.ttf`, and rasterize the three SVG logos at **at least 100 × 100 px** as `openai-4x.png`, `anthropic-4x.png`, `google-4x.png`. Fonts are obtainable from [Google Fonts](https://fonts.google.com/specimen/Google+Sans); they are not bundled here. The local review cache already contains these inputs:

```powershell
python polaris/social/render_banners.py --language vi --fonts polaris/.review/fonts --logos polaris/.review
python polaris/social/render_banners.py --language en --fonts polaris/.review/fonts --logos polaris/.review
```

Pass `--fonts`, `--logos` and optionally `--output` to use other directories. The Polaris logo uses the existing asset covered by `../assets/LICENSE`. Review captures and font caches stay in ignored `../.review/`; the final banner exports are part of `social/`.

## Provider logos

- `assets/google.svg`: copied unchanged from the user's supplied `google-color.svg`.
- `assets/openai.svg` and `assets/anthropic.svg`: sourced from [Lobe Icons](https://github.com/lobehub/lobe-icons/tree/master/packages/static-svg/icons) on 2026-09-14. The supplied files for these two logos contained only `404: Not Found`, so valid SVGs were retrieved instead.
- The Lobe Icons MIT license is included in `assets/LICENSE`. Logos identify their respective brands.
