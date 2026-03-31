import { type ReactNode } from "react";
import { cn } from "../utils/cn";
import type { MarkdownClassNames } from "../types";

interface InlineCodeProps {
  children?: ReactNode;
  classNames?: MarkdownClassNames;
}

export function InlineCode({ children, classNames }: InlineCodeProps) {
  return (
    <code className={cn("llm-md-inline-code", classNames?.inlineCode)}>
      {children}
    </code>
  );
}
