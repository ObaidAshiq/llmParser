# Changelog

All notable changes to `@ubisage/llm-markdown-renderer` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## 0.1.4 (2026-03-31)

### Changed
- Switched to ESM-only output (dropped CJS build) to fix `ERR_REQUIRE_ESM` when consumed in Next.js and other SSR frameworks
- All dependencies (`react-markdown`, `react-syntax-highlighter`, `remark-gfm`, `rehype-sanitize`, `clsx`) are now externalized instead of bundled
- Added `"use client"` directive to the package entry, preventing server-side evaluation in React Server Component environments
- Simplified `exports` map — removed `require` condition since CJS is no longer shipped

## 0.1.3 (2026-03-31)

### Added
- Clipboard fallback via hidden textarea for environments where `navigator.clipboard` is unavailable
- Clipboard availability detection on mount via `useEffect`
- Automatic fallback when `navigator.clipboard.writeText` throws (e.g. permission denied)

## 0.1.2 (2026-03-31)

### Fixed
- Minor fixes and improvements

## 0.1.1 (2026-03-31)

### Fixed
- Minor fixes and improvements

## 0.1.0 (2026-03-31)

### Added
- Initial release
- LLM markdown rendering with GFM support
- Syntax-highlighted code blocks via Prism (17 built-in themes)
- Copy-to-clipboard on code blocks
- Full customization via `classNames`, `theme`, and `components` props
- Ships vanilla CSS defaults (no Tailwind dependency)
- TypeScript declarations included
