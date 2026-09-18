# Polaris

## Platform and purpose

Static website at `https://nguywnben.github.io/polaris/` for developers connecting AI coding tools to model providers through one self-hosted gateway. The primary action follows the canonical installation path; secondary actions inspect the console, source and documentation. English and Vietnamese social banners introduce the same release.

## Source of truth

Product claims follow [Polaris v1.0.0](https://github.com/nguywnben/polaris/releases/tag/v1.0.0), published on 2026-09-18 at `5dd45f9`. The local source remains at `C:/Users/nben6/workspace/omni-gateway`; it was reviewed through `027c6d7`, which adds the current console screenshots and documentation. Use the source README, architecture, installation and operating guides, provider catalog, locale registries and frontend foundation tokens for future updates. Keep release-specific installation, architecture, backup and update links pinned to `v1.0.0`.

## Product facts and boundaries

- 23 provider adapters, 15 interface locales and OpenAI, Anthropic and Gemini protocol families. Authentication varies by provider; available models depend on account access.
- Smart fallback, credential orchestration and balanced, priority, weighted, latency or cost-based routing.
- Scoped virtual API keys with budgets, rate limits, expiry and model allowlists; usage, request activity and estimated costs, with optional Prometheus metrics and Langfuse tracing.
- AI Quality offers token-aware conversation cleanup, optional guardrails and exact-response caching. Cleanup preserves system instructions, tool-call relationships and recent messages.
- Standard deployment serves an individual or trusted team with one application worker, one replica and SQLite. PostgreSQL, team identity and external services are advanced options.
- Published images target Linux amd64. Windows uses Docker Desktop with WSL2. macOS needs manual verification; Apple Silicon uses amd64 emulation. No native ARM64 image is published.
- First-run setup opens `localhost:4283`, completes preflight and creates an owner passphrase of 12–256 characters. Existing installations should follow the pinned backup, update and rollback guides; fresh-install commands are not upgrade instructions.

Do not invent customer claims, performance measurements, pricing, live credentials or live gateway requests. The interactive preview uses illustrative routing, sample credentials and a fictional request trace, never benchmarks or production telemetry.

## Brand and language

Preserve the Polaris name, original four-point-star asset, Google Sans typography and monochrome light/dark identity. The website extends the current console's system. The two social banners retain the approved composition and white Polaris gateway node.

Repository documentation is English. Visitor-facing content supports `en`, `zh-CN`, `zh-TW`, `de`, `es`, `fr`, `id`, `it`, `ja`, `ko`, `pt`, `ru`, `th`, `tr` and `vi`; product and provider names remain untranslated. The source console semantically reviews English and Vietnamese, while its 13 community locales may fall back to English. Landing-page translations are independently complete, without a claim of external language certification.

## Experience and implementation

The user-preferred interactive HTML console preview has three keyboard-operable tabs: Models & routing, Credentials and Activity. It shows a translated routing schematic, sample credential rows and an illustrative request trace. A desktop sidebar becomes horizontal tabs on smaller screens. Shared CSS subgrid rows reserve the largest translated heading, description, content and note heights, keeping the frame, note and divider stationary when switching tabs. Inactive panels retain layout space while remaining unavailable to pointer, keyboard and accessibility navigation. Labels identify the preview as illustrative; it is not an actual console screenshot or a live gateway.

Use static, subdirectory-safe files within `polaris/`, without a framework, build step, analytics or backend. Language selection updates document language, metadata and a shareable query string; saved preferences are optional. Theme follows the system until explicitly chosen. Retain keyboard navigation, visible focus, reduced-motion support, copy feedback and the manual clipboard fallback. Preview locally before publication; deployment authorization belongs to the current task, not this persistent product document.

Banner copy is shared through `social/copy.json`. Each language uses a fixed 1200 × 630 artboard and has 4800 × 2520, 2400 × 1260 and 1200 × 630 PNG exports. Preserve source logo pixels and attribution; follow `assets/SOURCES.md` and `social/README.md` for provenance and regeneration.
