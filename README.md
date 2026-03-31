# @ubisage/llm-markdown-renderer

A production-ready React component for rendering LLM/AI assistant markdown output with syntax-highlighted code blocks, copy-to-clipboard, GFM (GitHub Flavored Markdown) support, and full customization.

Built for chat UIs, AI assistants, and any app that displays markdown from language models like GPT, Claude, Gemini, etc.

## Features

- **GFM support** — tables, strikethrough, task lists, autolinks
- **Syntax highlighting** — 17+ built-in Prism themes for code blocks
- **Copy-to-clipboard** — one-click copy button on every code block
- **Sanitized HTML** — `rehype-sanitize` protects against XSS
- **Fully customizable** — override every element via `classNames`, `theme`, or `components`
- **Tailwind-safe** — all styles scoped under `.llm-md-root` to survive CSS resets / preflight
- **Framework-agnostic styles** — ships vanilla CSS (no Tailwind dependency)
- **TypeScript** — full type definitions included
- **Dual format** — ships both ESM and CommonJS
- **Next.js compatible** — works with App Router, Pages Router, and SSR

## Installation

```bash
npm install @ubisage/llm-markdown-renderer
```

```bash
yarn add @ubisage/llm-markdown-renderer
```

```bash
pnpm add @ubisage/llm-markdown-renderer
```

**Peer dependencies:** `react >= 18` and `react-dom >= 18`

## Quick Start

```tsx
import { LLMMarkdownRenderer } from "@ubisage/llm-markdown-renderer";
import "@ubisage/llm-markdown-renderer/styles.css"; // Required for default styling

function ChatMessage({ content }: { content: string }) {
  return <LLMMarkdownRenderer content={content} />;
}
```

> **Important:** You must import `@ubisage/llm-markdown-renderer/styles.css` for lists, headings, spacing, and code blocks to render correctly. Without it, elements will inherit your app's global CSS reset (e.g. Tailwind preflight) and may appear unstyled.

## Usage with Tailwind CSS / Next.js

If your app uses Tailwind CSS, the default styles will still work because all rules are scoped under `.llm-md-root` with higher specificity than preflight resets.

You can layer Tailwind utility classes on top via the `classNames` prop:

```tsx
import { LLMMarkdownRenderer } from "@ubisage/llm-markdown-renderer";
import "@ubisage/llm-markdown-renderer/styles.css";

const chatClassNames = {
  paragraph: "text-sm leading-relaxed text-gray-900",
  heading1: "text-xl font-bold text-gray-900",
  heading2: "text-lg font-semibold text-gray-900",
  heading3: "text-base font-semibold text-gray-900",
  unorderedList: "list-disc pl-5 space-y-1",
  orderedList: "list-decimal pl-5 space-y-1",
  listItem: "text-sm leading-relaxed text-gray-900",
  strong: "font-semibold text-gray-900",
  link: "text-blue-600 hover:underline",
  blockquote: "border-l-4 border-gray-300 pl-4 italic text-gray-600",
};

function ChatMessage({ content }) {
  return (
    <LLMMarkdownRenderer
      content={content}
      classNames={chatClassNames}
      className="text-sm leading-5 text-gray-900"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `string` | **(required)** | The markdown string to render |
| `codeTheme` | `CodeTheme` | `"oneDark"` | Syntax highlighting theme |
| `showCopyButton` | `boolean` | `true` | Show copy button on code blocks |
| `showLineNumbers` | `boolean` | `false` | Show line numbers in code blocks |
| `sanitize` | `boolean` | `true` | Sanitize HTML output (XSS protection) |
| `wrapLongLines` | `boolean` | `false` | Wrap long lines in code blocks |
| `classNames` | `MarkdownClassNames` | `undefined` | Override CSS classes per element |
| `theme` | `MarkdownTheme` | `undefined` | Override CSS custom properties |
| `components` | `MarkdownComponents` | `undefined` | Override React components per element |
| `className` | `string` | `undefined` | Additional class on root element |
| `style` | `CSSProperties` | `undefined` | Inline styles on root element |

## Available Code Themes

`oneDark` | `oneLight` | `dracula` | `github` | `vscDarkPlus` | `coldarkDark` | `coldarkCold` | `materialDark` | `materialLight` | `nord` | `nightOwl` | `prism` | `solarizedDarkAtom` | `synthwave84` | `duotoneDark` | `duotoneLight` | `okaidia`

## Customization

### Using `classNames`

Override specific element styles with your own CSS classes (works with Tailwind, CSS Modules, etc.):

```tsx
<LLMMarkdownRenderer
  content={content}
  classNames={{
    root: "my-chat-message",
    paragraph: "text-gray-700 mb-4",
    codeBlock: "rounded-xl",
    copyButton: "bg-blue-500 text-white",
    heading1: "text-2xl font-bold",
    link: "text-blue-600 hover:underline",
  }}
/>
```

Available `classNames` keys: `root`, `paragraph`, `heading1`-`heading6`, `unorderedList`, `orderedList`, `listItem`, `link`, `strong`, `emphasis`, `blockquote`, `horizontalRule`, `table`, `tableWrapper`, `tableHead`, `tableBody`, `tableRow`, `tableHeader`, `tableCell`, `codeBlock`, `codeBlockWrapper`, `codeBlockHeader`, `codeBlockLanguage`, `inlineCode`, `preformatted`, `copyButton`, `image`.

### Using `theme`

Quick color/font customization via CSS custom properties — no CSS files needed:

```tsx
<LLMMarkdownRenderer
  content={content}
  theme={{
    fontSize: "15px",
    fontFamily: "Inter, sans-serif",
    codeFontFamily: "JetBrains Mono, monospace",
    textColor: "#374151",
    linkColor: "#7c3aed",
    codeBackground: "#f5f3ff",
  }}
/>
```

Available `theme` keys: `fontSize`, `lineHeight`, `fontFamily`, `codeFontFamily`, `codeFontSize`, `textColor`, `headingColor`, `linkColor`, `linkHoverColor`, `codeBackground`, `codeColor`, `codeBlockBackground`, `codeBlockColor`, `blockquoteBorderColor`, `blockquoteColor`, `tableBorderColor`, `tableHeaderBackground`, `hrColor`.

### Using `components`

Replace any element renderer entirely with your own React component:

```tsx
import type { ReactNode } from "react";

function MyCodeBlock({ className, children, inline }: {
  className?: string;
  children?: ReactNode;
  inline?: boolean;
}) {
  return <pre className="my-code">{children}</pre>;
}

<LLMMarkdownRenderer
  content={content}
  components={{
    code: MyCodeBlock,
    a: ({ href, children }) => (
      <a href={href} className="custom-link" onClick={trackClick}>
        {children}
      </a>
    ),
  }}
/>
```

## Using Without the Default Stylesheet

The component works without importing `styles.css`. Elements render with CSS class names prefixed `llm-md-*` that you can target in your own stylesheets. Or use the `classNames` / `components` props for full control.

> **Note:** If you skip the CSS import in an app with a CSS reset (like Tailwind preflight), lists will lose their bullets/numbering and headings will lose their sizing — you'll need to re-apply those styles yourself via `classNames` or your own CSS.

## Exported Utilities

```tsx
import { useCopyToClipboard } from "@ubisage/llm-markdown-renderer";

function MyComponent() {
  const { copied, copy } = useCopyToClipboard(2000);
  return <button onClick={() => copy("text")}>
    {copied ? "Copied!" : "Copy"}
  </button>;
}
```

## TypeScript

All types are exported for use in your own components:

```tsx
import type {
  LLMMarkdownRendererProps,
  MarkdownClassNames,
  MarkdownTheme,
  MarkdownComponents,
  CodeTheme,
} from "@ubisage/llm-markdown-renderer";
```

## License

MIT
