"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motionConfig as motion } from "./motion-config";

gsap.registerPlugin(useGSAP);

/** Keep the hit area stationary while the underline and label respond. */
export function useLinkHover(enabled = true) {
  const ref = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const link = ref.current;
    if (!link || !enabled) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const label = link.querySelector(".link-label");
      const hover = gsap.timeline({ paused: true, defaults: {
        duration: motion.hoverDuration, ease: motion.hoverEase,
      } })
        .to(link, { "--link-line": 1 }, 0)
        .to(label, { x: 8 }, 0);
      link.setAttribute("data-gsap-hover", "ready");
      let hovered = false;
      let focused = false;
      const update = () => { if (hovered || focused) hover.play(); else hover.reverse(); };
      const enter = (event: PointerEvent) => { if (event.pointerType !== "touch") { hovered = true; update(); } };
      const leave = () => { hovered = false; update(); };
      const focus = () => { focused = link.matches(":focus-visible"); update(); };
      const blur = () => { focused = false; update(); };
      link.addEventListener("pointerenter", enter);
      link.addEventListener("pointerleave", leave);
      link.addEventListener("pointercancel", leave);
      link.addEventListener("focus", focus);
      link.addEventListener("blur", blur);
      return () => {
        link.removeAttribute("data-gsap-hover");
        link.removeEventListener("pointerenter", enter);
        link.removeEventListener("pointerleave", leave);
        link.removeEventListener("pointercancel", leave);
        link.removeEventListener("focus", focus);
        link.removeEventListener("blur", blur);
      };
    });
    return () => media.revert();
  }, { scope: ref, dependencies: [enabled], revertOnUpdate: true });
  return ref;
}
