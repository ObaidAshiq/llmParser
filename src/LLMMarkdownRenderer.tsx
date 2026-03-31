import React, { useMemo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import type {
  CodeTheme,
  LLMMarkdownRendererProps,
  MarkdownClassNames,
  MarkdownTheme,
} from "./types";
import { cn } from "./utils/cn";
import { CodeBlock } from "./components/CodeBlock";
import { InlineCode } from "./components/InlineCode";
import {
  Paragraph,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  UnorderedList,
  OrderedList,
  ListItem,
  Anchor,
  Strong,
  Emphasis,
  Blockquote,
  HorizontalRule,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Image,
} from "./components/elements";

function buildThemeStyle(theme?: MarkdownTheme): React.CSSProperties {
  if (!theme) return {};

  const vars: Record<string, string> = {};
  if (theme.fontSize) vars["--llm-md-font-size"] = theme.fontSize;
  if (theme.lineHeight) vars["--llm-md-line-height"] = theme.lineHeight;
  if (theme.fontFamily) vars["--llm-md-font-family"] = theme.fontFamily;
  if (theme.codeFontFamily)
    vars["--llm-md-code-font-family"] = theme.codeFontFamily;
  if (theme.codeFontSize) vars["--llm-md-code-font-size"] = theme.codeFontSize;
  if (theme.textColor) vars["--llm-md-text-color"] = theme.textColor;
  if (theme.headingColor) vars["--llm-md-heading-color"] = theme.headingColor;
  if (theme.linkColor) vars["--llm-md-link-color"] = theme.linkColor;
  if (theme.linkHoverColor)
    vars["--llm-md-link-hover-color"] = theme.linkHoverColor;
  if (theme.codeBackground)
    vars["--llm-md-code-bg"] = theme.codeBackground;
  if (theme.codeColor) vars["--llm-md-code-color"] = theme.codeColor;
  if (theme.codeBlockBackground)
    vars["--llm-md-code-block-bg"] = theme.codeBlockBackground;
  if (theme.codeBlockColor)
    vars["--llm-md-code-block-color"] = theme.codeBlockColor;
  if (theme.blockquoteBorderColor)
    vars["--llm-md-blockquote-border"] = theme.blockquoteBorderColor;
  if (theme.blockquoteColor)
    vars["--llm-md-blockquote-color"] = theme.blockquoteColor;
  if (theme.tableBorderColor)
    vars["--llm-md-table-border"] = theme.tableBorderColor;
  if (theme.tableHeaderBackground)
    vars["--llm-md-table-header-bg"] = theme.tableHeaderBackground;
  if (theme.hrColor) vars["--llm-md-hr-color"] = theme.hrColor;

  return vars as React.CSSProperties;
}

function buildComponents(
  classNames: MarkdownClassNames | undefined,
  codeTheme: CodeTheme,
  showCopyButton: boolean,
  showLineNumbers: boolean,
  wrapLongLines: boolean,
  overrides?: LLMMarkdownRendererProps["components"],
): Components {
  const components: Components = {
    p: ({ children }) =>
      overrides?.p ? (
        <overrides.p>{children}</overrides.p>
      ) : (
        <Paragraph classNames={classNames}>{children}</Paragraph>
      ),
    h1: ({ children }) =>
      overrides?.h1 ? (
        <overrides.h1>{children}</overrides.h1>
      ) : (
        <Heading1 classNames={classNames}>{children}</Heading1>
      ),
    h2: ({ children }) =>
      overrides?.h2 ? (
        <overrides.h2>{children}</overrides.h2>
      ) : (
        <Heading2 classNames={classNames}>{children}</Heading2>
      ),
    h3: ({ children }) =>
      overrides?.h3 ? (
        <overrides.h3>{children}</overrides.h3>
      ) : (
        <Heading3 classNames={classNames}>{children}</Heading3>
      ),
    h4: ({ children }) =>
      overrides?.h4 ? (
        <overrides.h4>{children}</overrides.h4>
      ) : (
        <Heading4 classNames={classNames}>{children}</Heading4>
      ),
    h5: ({ children }) =>
      overrides?.h5 ? (
        <overrides.h5>{children}</overrides.h5>
      ) : (
        <Heading5 classNames={classNames}>{children}</Heading5>
      ),
    h6: ({ children }) =>
      overrides?.h6 ? (
        <overrides.h6>{children}</overrides.h6>
      ) : (
        <Heading6 classNames={classNames}>{children}</Heading6>
      ),
    ul: ({ children }) =>
      overrides?.ul ? (
        <overrides.ul>{children}</overrides.ul>
      ) : (
        <UnorderedList classNames={classNames}>{children}</UnorderedList>
      ),
    ol: ({ children }) =>
      overrides?.ol ? (
        <overrides.ol>{children}</overrides.ol>
      ) : (
        <OrderedList classNames={classNames}>{children}</OrderedList>
      ),
    li: ({ children }) =>
      overrides?.li ? (
        <overrides.li>{children}</overrides.li>
      ) : (
        <ListItem classNames={classNames}>{children}</ListItem>
      ),
    a: ({ href, children }) =>
      overrides?.a ? (
        <overrides.a href={href}>{children}</overrides.a>
      ) : (
        <Anchor href={href} classNames={classNames}>
          {children}
        </Anchor>
      ),
    strong: ({ children }) =>
      overrides?.strong ? (
        <overrides.strong>{children}</overrides.strong>
      ) : (
        <Strong classNames={classNames}>{children}</Strong>
      ),
    em: ({ children }) =>
      overrides?.em ? (
        <overrides.em>{children}</overrides.em>
      ) : (
        <Emphasis classNames={classNames}>{children}</Emphasis>
      ),
    blockquote: ({ children }) =>
      overrides?.blockquote ? (
        <overrides.blockquote>{children}</overrides.blockquote>
      ) : (
        <Blockquote classNames={classNames}>{children}</Blockquote>
      ),
    hr: () =>
      overrides?.hr ? <overrides.hr /> : <HorizontalRule classNames={classNames} />,
    table: ({ children }) =>
      overrides?.table ? (
        <overrides.table>{children}</overrides.table>
      ) : (
        <Table classNames={classNames}>{children}</Table>
      ),
    thead: ({ children }) =>
      overrides?.thead ? (
        <overrides.thead>{children}</overrides.thead>
      ) : (
        <TableHead classNames={classNames}>{children}</TableHead>
      ),
    tbody: ({ children }) =>
      overrides?.tbody ? (
        <overrides.tbody>{children}</overrides.tbody>
      ) : (
        <TableBody classNames={classNames}>{children}</TableBody>
      ),
    tr: ({ children }) =>
      overrides?.tr ? (
        <overrides.tr>{children}</overrides.tr>
      ) : (
        <TableRow classNames={classNames}>{children}</TableRow>
      ),
    th: ({ children }) =>
      overrides?.th ? (
        <overrides.th>{children}</overrides.th>
      ) : (
        <TableHeader classNames={classNames}>{children}</TableHeader>
      ),
    td: ({ children }) =>
      overrides?.td ? (
        <overrides.td>{children}</overrides.td>
      ) : (
        <TableCell classNames={classNames}>{children}</TableCell>
      ),
    img: ({ src, alt }) =>
      overrides?.img ? (
        <overrides.img src={src} alt={alt} />
      ) : (
        <Image src={src} alt={alt} classNames={classNames} />
      ),
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (overrides?.code) {
        return (
          <overrides.code className={className} inline={isInline}>
            {children}
          </overrides.code>
        );
      }

      if (isInline) {
        return <InlineCode classNames={classNames}>{children}</InlineCode>;
      }

      return (
        <CodeBlock
          language={match[1]}
          codeTheme={codeTheme}
          showCopyButton={showCopyButton}
          showLineNumbers={showLineNumbers}
          wrapLongLines={wrapLongLines}
          classNames={classNames}
        >
          {children}
        </CodeBlock>
      );
    },
    pre: ({ children }) => {
      if (overrides?.pre) {
        return <overrides.pre>{children}</overrides.pre>;
      }
      return <>{children}</>;
    },
  };

  return components;
}

export function LLMMarkdownRenderer({
  content,
  codeTheme = "oneDark",
  showCopyButton = true,
  showLineNumbers = false,
  sanitize = true,
  wrapLongLines = false,
  classNames,
  theme,
  components: componentOverrides,
  className,
  style,
}: LLMMarkdownRendererProps) {
  const resolvedComponents = useMemo(
    () =>
      buildComponents(
        classNames,
        codeTheme,
        showCopyButton,
        showLineNumbers,
        wrapLongLines,
        componentOverrides,
      ),
    [
      classNames,
      codeTheme,
      showCopyButton,
      showLineNumbers,
      wrapLongLines,
      componentOverrides,
    ],
  );

  const themeStyle = useMemo(() => buildThemeStyle(theme), [theme]);
  const rehypePlugins = useMemo(
    () => (sanitize ? [rehypeSanitize] : []),
    [sanitize],
  );

  return (
    <div
      className={cn("llm-md-root", classNames?.root, className)}
      style={{ ...themeStyle, ...style }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={resolvedComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
