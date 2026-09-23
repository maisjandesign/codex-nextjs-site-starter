"use client";

import Link from "next/link";
import { useRef, type ComponentPropsWithoutRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motionConfig as motion } from "@/lib/motion-config";

gsap.registerPlugin(useGSAP);

type Shared = { children: string; variant?: "solid" | "outline"; className?: string };
type Props = Shared & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">)
  | ({ href?: never } & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">)
);

/** Self-contained GSAP hover, including isolated Storybook and portal usage. */
export function MotionButton({ children, variant = "solid", className = "", ...props }: Props) {
  const label = useRef<HTMLSpanElement>(null);
  const disabled = "disabled" in props && props.disabled;

  useGSAP(() => {
    const button = label.current?.closest<HTMLElement>(".motion-button");
    if (!button || disabled) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const fill = button.querySelector(".button-fill");
      const track = button.querySelector(".button-label-track");
      const arrow = button.querySelector(".button-arrow");
      gsap.set(fill, { y: 0, yPercent: 100 });
      const hover = gsap.timeline({ paused: true, defaults: {
        duration: motion.hoverDuration, ease: motion.hoverEase,
      } })
        .to(fill, { yPercent: 0 }, 0)
        .to(track, { yPercent: -100 }, 0)
        .to(arrow, { x: 8, y: -8 }, 0)
        .to(button, { color: "var(--button-hover-ink)" }, 0);
      button.setAttribute("data-gsap-hover", "ready");
      let hovered = false;
      let focused = false;
      const update = () => { if (hovered || focused) hover.play(); else hover.reverse(); };
      const enter = (event: PointerEvent) => { if (event.pointerType !== "touch") { hovered = true; update(); } };
      const leave = () => { hovered = false; update(); };
      const focus = () => { focused = button.matches(":focus-visible"); update(); };
      const blur = () => { focused = false; update(); };
      button.addEventListener("pointerenter", enter);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("pointercancel", leave);
      button.addEventListener("focus", focus);
      button.addEventListener("blur", blur);
      return () => {
        button.removeAttribute("data-gsap-hover");
        button.removeEventListener("pointerenter", enter);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("pointercancel", leave);
        button.removeEventListener("focus", focus);
        button.removeEventListener("blur", blur);
      };
    });
    return () => media.revert();
  }, { scope: label, dependencies: [children, variant, disabled], revertOnUpdate: true });

  const content = <>
    <span className="button-fill" aria-hidden="true" />
    <span className="button-label" ref={label}><span className="button-label-track">
      {children}<span className="button-label-copy" aria-hidden="true">{children}</span>
    </span></span>
    <span className="button-arrow" aria-hidden="true">↗</span>
  </>;
  const classes = `motion-button motion-button--${variant} ${className}`;
  if (typeof props.href === "string") {
    return <Link {...props} className={classes} data-motion-button="">{content}</Link>;
  }
  return <button type="button" {...props} className={classes} data-motion-button="">{content}</button>;
}
