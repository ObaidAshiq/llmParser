import { type ReactNode } from "react";
import { cn } from "../utils/cn";
import type { MarkdownClassNames } from "../types";

interface ElementProps {
  children?: ReactNode;
  classNames?: MarkdownClassNames;
}

interface LinkProps extends ElementProps {
  href?: string;
}

export function Paragraph({ children, classNames }: ElementProps) {
  return <p className={cn("llm-md-p", classNames?.paragraph)}>{children}</p>;
}

export function Heading1({ children, classNames }: ElementProps) {
  return (
    <h1 className={cn("llm-md-h1", classNames?.heading1)}>{children}</h1>
  );
}

export function Heading2({ children, classNames }: ElementProps) {
  return (
    <h2 className={cn("llm-md-h2", classNames?.heading2)}>{children}</h2>
  );
}

export function Heading3({ children, classNames }: ElementProps) {
  return (
    <h3 className={cn("llm-md-h3", classNames?.heading3)}>{children}</h3>
  );
}

export function Heading4({ children, classNames }: ElementProps) {
  return (
    <h4 className={cn("llm-md-h4", classNames?.heading4)}>{children}</h4>
  );
}

export function Heading5({ children, classNames }: ElementProps) {
  return (
    <h5 className={cn("llm-md-h5", classNames?.heading5)}>{children}</h5>
  );
}

export function Heading6({ children, classNames }: ElementProps) {
  return (
    <h6 className={cn("llm-md-h6", classNames?.heading6)}>{children}</h6>
  );
}

export function UnorderedList({ children, classNames }: ElementProps) {
  return (
    <ul className={cn("llm-md-ul", classNames?.unorderedList)}>{children}</ul>
  );
}

export function OrderedList({ children, classNames }: ElementProps) {
  return (
    <ol className={cn("llm-md-ol", classNames?.orderedList)}>{children}</ol>
  );
}

export function ListItem({ children, classNames }: ElementProps) {
  return (
    <li className={cn("llm-md-li", classNames?.listItem)}>{children}</li>
  );
}

export function Anchor({ href, children, classNames }: LinkProps) {
  return (
    <a
      href={href}
      className={cn("llm-md-a", classNames?.link)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function Strong({ children, classNames }: ElementProps) {
  return (
    <strong className={cn("llm-md-strong", classNames?.strong)}>
      {children}
    </strong>
  );
}

export function Emphasis({ children, classNames }: ElementProps) {
  return (
    <em className={cn("llm-md-em", classNames?.emphasis)}>{children}</em>
  );
}

export function Blockquote({ children, classNames }: ElementProps) {
  return (
    <blockquote className={cn("llm-md-blockquote", classNames?.blockquote)}>
      {children}
    </blockquote>
  );
}

export function HorizontalRule({ classNames }: Omit<ElementProps, "children">) {
  return <hr className={cn("llm-md-hr", classNames?.horizontalRule)} />;
}

export function Table({ children, classNames }: ElementProps) {
  return (
    <div className={cn("llm-md-table-wrapper", classNames?.tableWrapper)}>
      <table className={cn("llm-md-table", classNames?.table)}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, classNames }: ElementProps) {
  return (
    <thead className={cn("llm-md-thead", classNames?.tableHead)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, classNames }: ElementProps) {
  return (
    <tbody className={cn("llm-md-tbody", classNames?.tableBody)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, classNames }: ElementProps) {
  return (
    <tr className={cn("llm-md-tr", classNames?.tableRow)}>{children}</tr>
  );
}

export function TableHeader({ children, classNames }: ElementProps) {
  return (
    <th className={cn("llm-md-th", classNames?.tableHeader)}>{children}</th>
  );
}

export function TableCell({ children, classNames }: ElementProps) {
  return (
    <td className={cn("llm-md-td", classNames?.tableCell)}>{children}</td>
  );
}

export function Image({
  classNames,
  ...props
}: Omit<ElementProps, "children"> & { src?: string; alt?: string }) {
  return (
    <img className={cn("llm-md-img", classNames?.image)} {...props} />
  );
}
