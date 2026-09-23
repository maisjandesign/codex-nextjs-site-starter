"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { motionConfig as motion } from "@/lib/motion-config";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

/** One instance in root layout. Server-rendered pages pass through as children. */
export function MotionRoot({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const root = content.current;
    if (!root || !wrapper.current) return;
    const media = gsap.matchMedia();

    media.add({
      all: "all",
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(any-hover: hover) and (any-pointer: fine)",
    }, (match) => {
      if (match.conditions?.reduce) return;
      let disposed = false;
      let refreshFrame = 0;
      const contexts: gsap.Context[] = [];
      const disposers: (() => void)[] = [];
      const initialized = new WeakSet<Element>();
      const smoother = match.conditions?.desktop ? ScrollSmoother.create({
        wrapper: wrapper.current!, content: root,
        smooth: motion.smooth, smoothTouch: false,
        effects: false, normalizeScroll: false,
      }) : undefined;
      wrapper.current!.setAttribute("data-scroll-mode", smoother ? "smooth" : "native");

      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };
      const trigger = (element: HTMLElement) => ({
        trigger: element, start: motion.revealStart,
        once: true, invalidateOnRefresh: true,
      });

      const scan = () => {
        if (disposed) return;
        const fresh = Array.from(root.querySelectorAll<HTMLElement>(
          "[data-reveal], [data-hover-media]",
        )).filter((element) => !initialized.has(element));
        if (!fresh.length) return;
        contexts.push(gsap.context(() => {
          for (const element of fresh) {
            initialized.add(element);
            // Never make a restored, already-passed section disappear.
            const passed = element.getBoundingClientRect().bottom <= 0;
            const reveal = element.dataset.reveal;
            if (!passed && reveal === "lines") {
              SplitText.create(element, {
                type: "lines", mask: "lines", autoSplit: true,
                linesClass: "motion-line", aria: "auto",
                onSplit: (self) => gsap.from(self.lines, {
                  yPercent: 110, duration: motion.revealDuration,
                  stagger: motion.lineStagger, ease: motion.revealEase,
                  scrollTrigger: trigger(element),
                }),
              });
            } else if (!passed && reveal === "mask") {
              const inner = element.querySelector<HTMLElement>(":scope > [data-reveal-inner]");
              if (inner) {
                element.classList.add("reveal--active");
                disposers.push(() => element.classList.remove("reveal--active"));
                const delay = Math.max(0, Math.min(Number(element.dataset.delay) || 0, 0.4));
                const tween = gsap.from(inner, {
                  yPercent: 105, duration: motion.revealDuration, delay,
                  ease: motion.revealEase, scrollTrigger: trigger(element),
                  onComplete: () => element.classList.remove("reveal--active"),
                });
                // Keyboard focus must never remain hidden behind the mask.
                const onFocus = () => tween.progress(1);
                element.addEventListener("focusin", onFocus);
                disposers.push(() => element.removeEventListener("focusin", onFocus));
              }
            } else if (!passed && reveal === "media") {
              gsap.fromTo(element,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: motion.revealDuration,
                  ease: motion.revealEase, scrollTrigger: trigger(element),
                  clearProps: "clipPath" },
              );
            }

            if (match.conditions?.desktop && element.hasAttribute("data-hover-media")) {
              const image = element.querySelector("img");
              if (image) {
                const hover = gsap.to(image, { scale: motion.imageScale,
                  duration: 0.55, ease: motion.hoverEase, paused: true });
                const enter = () => { hover.play(); };
                const leave = () => { hover.reverse(); };
                element.addEventListener("pointerenter", enter);
                element.addEventListener("pointerleave", leave);
                disposers.push(() => {
                  element.removeEventListener("pointerenter", enter);
                  element.removeEventListener("pointerleave", leave);
                });
              }
            }
          }
        }, root));
        refresh();
      };

      scan();
      // Supports App Router streaming and content inserted after initial render.
      const observer = new MutationObserver(scan);
      observer.observe(root, { childList: true, subtree: true });
      const resize = new ResizeObserver(refresh);
      resize.observe(root);
      root.addEventListener("load", refresh, true);
      void document.fonts.ready.then(refresh);

      return () => {
        disposed = true;
        observer.disconnect();
        resize.disconnect();
        root.removeEventListener("load", refresh, true);
        cancelAnimationFrame(refreshFrame);
        disposers.forEach((dispose) => dispose());
        contexts.reverse().forEach((context) => context.revert());
        smoother?.kill();
        wrapper.current?.removeAttribute("data-scroll-mode");
      };
    });
    return () => media.revert();
  }, { scope: wrapper, dependencies: [pathname], revertOnUpdate: true });

  return <div id="smooth-wrapper" ref={wrapper}>
    <div id="smooth-content" ref={content}>{children}</div>
  </div>;
}
