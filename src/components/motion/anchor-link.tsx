"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLinkHover } from "@/lib/use-link-hover";

/** Same-page navigation with hash, focus and a native no-JS fallback. */
export function AnchorLink({ href, children, className = "", animate = true, ...props }:
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: `#${string}`; animate?: boolean }) {
  const ref = useLinkHover(animate);
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey || props.target === "_blank" || props.download) return;
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;
    event.preventDefault();
    const original = target.getAttribute("tabindex");
    if (original === null) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (original === null) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    // Focus first: ScrollSmoother's focus handler must not override our final alignment.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = ScrollSmoother.get();
    if (smoother && !reduced) smoother.scrollTo(target, true, "top 88px");
    else target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    if (window.location.hash !== href) history.pushState(null, "", href);
  }
  return <a {...props} ref={ref} className={`${animate ? "motion-link " : ""}${className}`} href={href} onClick={navigate}>
    {animate ? <span className="link-label">{children}</span> : children}
  </a>;
}
