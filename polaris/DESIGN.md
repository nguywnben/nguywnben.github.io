---
name: Polaris
description: Landing page and release banners extending the Polaris management console
colors:
  background: "#ffffff"
  subtle: "#fafafa"
  muted: "#f6f6f6"
  text: "#111111"
  secondary: "#666666"
  soft: "#6b6b6b"
  border: "#e7e7e7"
  border-strong: "#d8d8d8"
  primary-hover: "#2f2f2f"
  control-hover: "#f4f4f4"
  success: "#137333"
  focus: "#1a73e8"
  dark-background: "#121212"
  dark-subtle: "#181818"
  dark-muted: "#202020"
  dark-surface: "#1c1c1c"
  dark-text: "#f4f4f4"
  dark-secondary: "#b8b8b8"
  dark-soft: "#969696"
  dark-border: "#343434"
  dark-border-strong: "#474747"
  dark-primary: "#f1f1f1"
  dark-primary-hover: "#ffffff"
  dark-control-hover: "#292929"
  dark-success: "#81c995"
  dark-focus: "#8ab4f8"
typography:
  display:
    fontFamily: "Google Sans, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(48px, 6.4vw, 82px)"
    fontWeight: 550
    lineHeight: 1.09
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Google Sans, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 44px)"
    fontWeight: 550
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Google Sans, Segoe UI, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Google Sans, Segoe UI, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  banner-display:
    fontFamily: "Google Sans, Arial, sans-serif"
    fontSize: "61px"
    fontWeight: 550
    lineHeight: 1.16
    letterSpacing: "-2.44px"
  banner-brand:
    fontFamily: "Google Sans, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 650
    letterSpacing: "-1.28px"
rounded:
  tag: "4px"
  menu-option: "6px"
  control: "8px"
  console: "10px"
  banner-diagram: "12px"
spacing:
  small: "8px"
  medium: "16px"
  large: "32px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-dark:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.text}"
  button-primary-dark-hover:
    backgroundColor: "{colors.dark-primary-hover}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.control-hover}"
  preview-tab:
    textColor: "{colors.secondary}"
    rounded: "{rounded.control}"
    padding: "11px 12px"
  preview-tab-selected:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
---

# Design System: Polaris

## Overview

Extend the existing Polaris console identity. White space, readable Google Sans typography, neutral surfaces and thin borders give the landing page its restrained character. This is a refinement of the established system; the release update introduces no new visual concept.

The landing page uses the user-preferred interactive HTML console preview to explain routing, credentials and activity. Social banners retain the approved white composition, original marks and light gateway node. Product facts and asset provenance live in `PRODUCT.md`, `assets/SOURCES.md` and `social/README.md`.

**Key Characteristics:**

- Neutral light and dark themes with original brand assets.
- Strong typographic hierarchy and generous space around product evidence.
- Thin borders, gently curved controls and explicit interaction states.
- Responsive visitor content with visible focus and reduced-motion support.

## Colors

The palette follows the current console's neutral foundation. Frontmatter values are normative for this snapshot; `styles.css` defines the theme mapping, and `social/banner.css` defines the fixed light banner surface.

### Primary

Primary actions use near-black text color as their light-theme fill and white contrast text. Dark mode uses the light primary fill with near-black contrast text. Their hover fills follow the current source console's primary-hover tokens.

### Neutral

Background and surface colors separate page, muted bands and floating menus. Secondary text carries supporting copy; soft text serves small tertiary notes. Standard and strong borders separate content and frame controls. Dark mode retains these roles without introducing a colored accent. Provider treatments follow Polaris `frontend/css/providers-and-models.css`: Kimi keeps a black, 8px-rounded background in both themes; Codex, DeepSeek, SpaceXAI and Ollama invert in dark mode without a light backing or added padding. Colored marks retain their colors. Cloudflare, Kilo, GroqCloud and Mistral use 8px corners; Kimchi uses a circular crop to hide the supplied PNG's white corners.

Green is reserved for small status indicators. Focus blue identifies keyboard location outside the header; header controls use the secondary text color for their focus outlines. Decorative window dots retain conventional red, amber and green colors.

**The Foreground Hover Rule.** Header and footer links change foreground contrast on hover without gaining a background fill. Preserve explicit selected and expanded states. Content controls retain their defined surface feedback.

## Typography

Google Sans is shared with the source console. The website uses Segoe UI and Arial fallbacks; banners use Arial. Keep Vietnamese diacritics intact and allow translated headings to wrap. Monospace is reserved for commands, protocol values and the banner's terminal symbol.

Display text is moderately weighted and tightly tracked, with the second headline line in secondary text. Section headings and body roles follow the frontmatter; the hero description uses an 18px desktop size and a 620px maximum measure. At 800px the hero headline is 62px; at 540px it becomes `clamp(40px, 10.5vw, 56px)` with a 1.15 line height.

The banner's headline and brand use their separate frontmatter roles. Preserve their tracking in both HTML and PNG rendering. Banner supporting copy uses 21px type with a 1.55 line height; diagram captions use the soft neutral token.

## Layout

Main content is capped at 1120px with 80px total horizontal clearance on desktop. Navigation is capped at 1280px with 40px side padding and a 64px minimum height. At 800px, content clearance becomes 40px and the header becomes 60px tall; at 540px, content clearance becomes 36px. Main navigation hides at 800px while theme and language controls remain available.

The interactive console contains a top bar, a 208px desktop sidebar and three panels: Models & routing, Credentials and Activity. Their shared CSS subgrid rows reserve the largest translated heading, description, content and note heights. Switching tabs must not shift the frame, notes or their divider. Inactive panels retain layout space with visibility hidden while remaining unavailable to pointer, keyboard and accessibility navigation. At 800px the sidebar becomes horizontal tabs; at 540px the brand hides and spacing contracts. The routing schematic, credential rows and activity trace remain readable within the responsive frame.

Provider entries use five columns on wide screens, three at 1100px and two at 540px. Feature copy is editorial, with adjacent native disclosures on desktop and a single column at 540px. Installation becomes a single column at 800px. Command panes scroll internally instead of widening the page. Language choices wrap naturally.

Social banners use a fixed 1200 × 630 artboard scaled as a whole, without responsive reflow. Their text and diagram columns are 622px and 434px with a 48px gap. Keep the shared English/Vietnamese composition and white Polaris gateway node. Export directly at 4800 × 2520, then provide 2400 × 1260 and 1200 × 630 versions; maintain parity between HTML and the PNG renderer.

## Elevation & Depth

Page sections, buttons and console framing are flat. Neutral tonal shifts and borders establish hierarchy. The floating language menu is the only raised landing-page surface: its light shadow is `0 8px 30px rgb(0 0 0 / .13)` and dark shadow is `0 10px 32px rgb(0 0 0 / .45)`. The banner diagram uses a border and subtle background without a shadow.

## Shapes

Controls use the shared control radius. Console frames and the language menu use the console radius; menu options and small tags use the tighter radii in frontmatter. The banner diagram uses its own slightly wider radius, with a gently rounded white gateway node. Preserve the original four-point star; do not redraw it or replace provider marks with approximations.

## Components

### Actions and navigation

Primary actions use solid neutral fills; secondary actions use thin strong borders. Desktop actions are at least 49px high, reducing to 46px at the smallest breakpoint. Press feedback translates actions by 1px. Header and footer hover behavior follows the Foreground Hover Rule; secondary actions, inactive console/install tabs and copy controls use control-hover surfaces.

### Interactive console preview

Models & routing, Credentials and Activity are the three tabs. Use tab/tabpanel semantics, a roving tab stop and Arrow/Home/End navigation. The routing schematic, sample credentials and request trace are translated illustrations, styled with the active light/dark theme. Keep inactive panels in the shared layout while making them inert and hidden from accessibility navigation. Preserve illustrative labels and stationary notes; do not present the preview as a live gateway or actual console capture.

### Language and theme controls

The compact language trigger opens a contained scrolling menu with selected checkmark, arrow keys, Home/End, type-ahead, Escape and normal Tab exit. Unselected menu options use secondary gray text; hover changes only the text to the primary foreground, darker in light mode and brighter in dark mode. Keyboard focus uses the same foreground with its visible focus indicator. The expanded trigger and selected option keep their muted state fills. The language grid uses an inverted selected state and a muted hover surface for unselected choices. Theme follows the system until explicitly selected; storage is optional.

### Disclosures and installation

Feature disclosures retain native keyboard semantics and a plus/minus indicator. AI Quality joins routing, access control and usage visibility within the same editorial pattern. Install tabs switch platform-specific commands; copy feedback is announced and a visible manual-selection fallback handles clipboard failure. The backup and update links are separate from fresh-install commands.

### Accessibility and motion

Keep the skip link, named controls, visible keyboard focus, document language updates and live copy feedback. Standard focus uses a 2px outline with a 4px offset; header focus uses a 2px offset and menu options place their outline inside. One short console entrance animation remains visible from its start. Short control transforms and icon transitions provide feedback. Reduced-motion preference disables animation, transitions and smooth scrolling. Do not add motion that is required to discover or read content.

## Do's and Don'ts

### Do:

- **Do** retain the existing Google Sans, original Polaris star and neutral light/dark identity.
- **Do** keep the interactive console frame, notes and dividers stationary across tab changes.
- **Do** translate the preview content and preserve its illustrative-data labels in every visitor locale.
- **Do** maintain banner parity across both languages and HTML/PNG outputs.
- **Do** keep repository documentation in English and visitor-facing copy localized.

### Don't:

- **Don't** introduce background hover fills on header or footer links.
- **Don't** present illustrative console content as actual captures, live data or production evidence.
- **Don't** replace the approved white banner gateway node or distort source brand marks.
- **Don't** assume longer translations fit; verify wrapping and mobile overflow.
