import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Server component: its resting state is visible, including without JS. */
export function Reveal({ children, className = "", delay = 0, ...props }:
  ComponentPropsWithoutRef<"div"> & { delay?: number }) {
  return (
    <div {...props} className={`reveal ${className}`} data-reveal="mask" data-delay={delay}>
      <div data-reveal-inner>{children}</div>
    </div>
  );
}

/** Plain text only: use Reveal for text with links or other interactive markup. */
export function RevealText({ as: Tag = "h2", children, className = "", ...props }:
  { as?: "h1" | "h2" | "h3" | "p"; children: string; className?: string } &
  Omit<ComponentPropsWithoutRef<"h2">, "children">) {
  return <Tag {...props} className={className} data-reveal="lines">{children}</Tag>;
}

export function RevealMedia({ children, className = "" }:
  { children: ReactNode; className?: string }) {
  return <div className={`reveal-media ${className}`} data-reveal="media">{children}</div>;
}
