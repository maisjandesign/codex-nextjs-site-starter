"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useLinkHover } from "@/lib/use-link-hover";

/** Internal or external text link with an independent GSAP underline. */
export function MotionLink({ children, className = "", ...props }: ComponentPropsWithoutRef<typeof Link>) {
  const ref = useLinkHover();
  return <Link {...props} ref={ref} className={`motion-link ${className}`}>
    <span className="link-label">{children}</span>
  </Link>;
}
