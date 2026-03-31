import React, { type ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark.js";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light.js";
import dracula from "react-syntax-highlighter/dist/esm/styles/prism/dracula.js";
import github from "react-syntax-highlighter/dist/esm/styles/prism/ghcolors.js";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus.js";
import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark.js";
import coldarkCold from "react-syntax-highlighter/dist/esm/styles/prism/coldark-cold.js";
import materialDark from "react-syntax-highlighter/dist/esm/styles/prism/material-dark.js";
import materialLight from "react-syntax-highlighter/dist/esm/styles/prism/material-light.js";
import nord from "react-syntax-highlighter/dist/esm/styles/prism/nord.js";
import nightOwl from "react-syntax-highlighter/dist/esm/styles/prism/night-owl.js";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism.js";
import solarizedDarkAtom from "react-syntax-highlighter/dist/esm/styles/prism/solarized-dark-atom.js";
import synthwave84 from "react-syntax-highlighter/dist/esm/styles/prism/synthwave84.js";
import duotoneDark from "react-syntax-highlighter/dist/esm/styles/prism/duotone-dark.js";
import duotoneLight from "react-syntax-highlighter/dist/esm/styles/prism/duotone-light.js";
import okaidia from "react-syntax-highlighter/dist/esm/styles/prism/okaidia.js";
import type { CodeTheme, MarkdownClassNames } from "../types";
import { cn } from "../utils/cn";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

const themeMap: Record<CodeTheme, Record<string, React.CSSProperties>> = {
  oneDark,
  oneLight,
  dracula,
  github,
  vscDarkPlus,
  coldarkDark,
  coldarkCold,
  materialDark,
  materialLight,
  nord,
  nightOwl,
  prism,
  solarizedDarkAtom,
  synthwave84,
  duotoneDark,
  duotoneLight,
  okaidia,
};

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function extractTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractTextContent).join("");
  if (React.isValidElement(children) && children.props) {
    return extractTextContent(
      (children.props as { children?: ReactNode }).children,
    );
  }
  return "";
}

interface CodeBlockProps {
  language: string;
  children: ReactNode;
  codeTheme: CodeTheme;
  showCopyButton: boolean;
  showLineNumbers: boolean;
  wrapLongLines: boolean;
  classNames?: MarkdownClassNames;
}

export function CodeBlock({
  language,
  children,
  codeTheme,
  showCopyButton,
  showLineNumbers,
  wrapLongLines,
  classNames,
}: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard();
  const codeString = extractTextContent(children).replace(/\n$/, "");
  const resolvedTheme = themeMap[codeTheme] ?? themeMap.oneDark;

  return (
    <div className={cn("llm-md-code-wrapper", classNames?.codeBlockWrapper)}>
      <div className={cn("llm-md-code-header", classNames?.codeBlockHeader)}>
        {language && (
          <span
            className={cn(
              "llm-md-code-language",
              classNames?.codeBlockLanguage,
            )}
          >
            {language}
          </span>
        )}
        {showCopyButton && (
          <button
            type="button"
            onClick={() => copy(codeString)}
            className={cn("llm-md-copy-btn", classNames?.copyButton)}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span className="llm-md-copy-text">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={resolvedTheme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        className={cn("llm-md-code-block", classNames?.codeBlock)}
        customStyle={{
          margin: 0,
          borderRadius: "0 0 0.5rem 0.5rem",
          paddingTop: "2.75rem",
          fontSize: "0.875rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
