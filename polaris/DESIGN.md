---
name: Polaris
description: Landing page extending the Polaris management console
colors:
  background: "#ffffff"
  subtle: "#fafafa"
  muted: "#f6f6f6"
  text: "#111111"
  secondary: "#666666"
  border: "#e7e7e7"
  border-strong: "#d8d8d8"
  success: "#137333"
  focus: "#1a73e8"
  dark-background: "#121212"
  dark-surface: "#1c1c1c"
  dark-text: "#f4f4f4"
  dark-border: "#343434"
typography:
  display:
    fontFamily: "Google Sans, Arial, sans-serif"
    fontSize: "clamp(48px, 6.4vw, 82px)"
    fontWeight: 550
    lineHeight: 1.09
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Google Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "8px"
  console: "10px"
spacing:
  small: "8px"
  medium: "16px"
  large: "32px"
---

## Overview

Extends the existing Polaris visual system; it does not redesign the product. White space and typography lead. The two-line headline is followed by installation/source actions and a schematic console preview. Provider compatibility, feature disclosures, installation and language choices follow in that order.

## Colors

Colors inherit `frontend/css/foundation.css` from the source repository. Light and dark themes retain neutral surfaces; green only communicates example route readiness. Provider logos keep their source colors. Dark mode places dark provider marks on small light grounds for legibility.

## Typography

Use the same Google Sans request as the source console, with full Vietnamese diacritics. Display text is large and moderately weighted, never heavier than necessary. Body copy has a readable measure. Monospace is reserved for commands and protocol values. All headings allow translated text to wrap.

## Layout

1120px main content width, wider navigation. Desktop console has a left sidebar and three-column routing diagram. Its three panels share grid rows for headings, descriptions, content and bottom notes. CSS subgrid reserves the largest translated content and note heights, so switching tabs moves neither the frame nor the notes and their divider. Inactive panels retain layout space with visibility hidden, remaining unavailable to pointer, keyboard and accessibility navigation. At 800px the sidebar becomes horizontal tabs. At 540px content uses compact spacing; at 360px connector columns contract. Feature copy is editorial and paired with native disclosure controls, not a repeated feature-card grid.

## Components

Black primary action with white text in light mode, inverted in dark mode. Secondary actions have thin borders. A compact 64px desktop header (60px on mobile) keeps navigation links transparent on hover and press, changing only the text from secondary to primary color. Foreground-only hover is limited to the header and footer. Content buttons, console sidebar tabs, installation controls and language choices retain surface feedback on hover. Selected/open states and visible keyboard focus remain intact. The custom language menu follows the same light/dark surfaces, with a checkmark for the selected language, contained scrolling, arrow-key navigation, type-ahead, Home/End, Escape and normal Tab exit. Disclosure controls and buttons preserve keyboard behavior and clear focus. Console preview is illustrative and shows no invented performance statistics.

## Motion

One short console entrance animation, already visible at its start. Reduced-motion preference disables animation and smooth scrolling.

## Assets

Logo, favicon and nine provider logos come unchanged from the source repository. No generated imagery. The routing schematic is geometry, and the console is responsive HTML. Source screenshot is historical visual reference only because it still contains the retired brand.

## Accessibility

Skip link, named controls, active tab semantics, arrow/Home/End navigation, live copy feedback and document language updates. All 15 translations are complete. Light/dark preferences persist when storage is available. Command panes scroll independently instead of widening the page.
