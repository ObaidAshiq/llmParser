import type { ComponentType, CSSProperties, ReactNode } from "react";

export type CodeTheme =
  | "oneDark"
  | "oneLight"
  | "dracula"
  | "github"
  | "vscDarkPlus"
  | "coldarkDark"
  | "coldarkCold"
  | "materialDark"
  | "materialLight"
  | "nord"
  | "nightOwl"
  | "prism"
  | "solarizedDarkAtom"
  | "synthwave84"
  | "duotoneDark"
  | "duotoneLight"
  | "okaidia";

export interface MarkdownClassNames {
  root?: string;
  paragraph?: string;
  heading1?: string;
  heading2?: string;
  heading3?: string;
  heading4?: string;
  heading5?: string;
  heading6?: string;
  unorderedList?: string;
  orderedList?: string;
  listItem?: string;
  link?: string;
  strong?: string;
  emphasis?: string;
  blockquote?: string;
  horizontalRule?: string;
  table?: string;
  tableWrapper?: string;
  tableHead?: string;
  tableBody?: string;
  tableRow?: string;
  tableHeader?: string;
  tableCell?: string;
  codeBlock?: string;
  codeBlockWrapper?: string;
  codeBlockHeader?: string;
  codeBlockLanguage?: string;
  inlineCode?: string;
  preformatted?: string;
  copyButton?: string;
  image?: string;
}

export interface MarkdownTheme {
  fontSize?: string;
  lineHeight?: string;
  fontFamily?: string;
  codeFontFamily?: string;
  codeFontSize?: string;
  textColor?: string;
  headingColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  codeBackground?: string;
  codeColor?: string;
  codeBlockBackground?: string;
  codeBlockColor?: string;
  blockquoteBorderColor?: string;
  blockquoteColor?: string;
  tableBorderColor?: string;
  tableHeaderBackground?: string;
  hrColor?: string;
}

export interface MarkdownComponents {
  p?: ComponentType<{ children?: ReactNode }>;
  h1?: ComponentType<{ children?: ReactNode }>;
  h2?: ComponentType<{ children?: ReactNode }>;
  h3?: ComponentType<{ children?: ReactNode }>;
  h4?: ComponentType<{ children?: ReactNode }>;
  h5?: ComponentType<{ children?: ReactNode }>;
  h6?: ComponentType<{ children?: ReactNode }>;
  ul?: ComponentType<{ children?: ReactNode }>;
  ol?: ComponentType<{ children?: ReactNode }>;
  li?: ComponentType<{ children?: ReactNode }>;
  a?: ComponentType<{ href?: string; children?: ReactNode }>;
  strong?: ComponentType<{ children?: ReactNode }>;
  em?: ComponentType<{ children?: ReactNode }>;
  blockquote?: ComponentType<{ children?: ReactNode }>;
  hr?: ComponentType<Record<string, never>>;
  table?: ComponentType<{ children?: ReactNode }>;
  thead?: ComponentType<{ children?: ReactNode }>;
  tbody?: ComponentType<{ children?: ReactNode }>;
  tr?: ComponentType<{ children?: ReactNode }>;
  th?: ComponentType<{ children?: ReactNode }>;
  td?: ComponentType<{ children?: ReactNode }>;
  img?: ComponentType<{ src?: string; alt?: string }>;
  code?: ComponentType<{
    className?: string;
    children?: ReactNode;
    inline?: boolean;
  }>;
  pre?: ComponentType<{ children?: ReactNode }>;
}

export interface LLMMarkdownRendererProps {
  content: string;
  codeTheme?: CodeTheme;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  sanitize?: boolean;
  wrapLongLines?: boolean;
  classNames?: MarkdownClassNames;
  theme?: MarkdownTheme;
  components?: MarkdownComponents;
  className?: string;
  style?: CSSProperties;
}
