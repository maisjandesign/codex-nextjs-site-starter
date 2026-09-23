'use client';
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
const ScrollReady = createContext(true);
export const useScrollReady = () => useContext(ScrollReady);

/** The page owns one smoother. Standalone Storybook specimens keep native scrolling. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const { settings, reduced } = useMotion();
  const [initialized, setInitialized] = useState<{ smooth: number; reduced: boolean } | null>(null);
  const ready = initialized?.smooth === settings.smooth && initialized?.reduced === reduced;
  useGSAP(
    () => {
      if (!wrapper.current || !content.current) return;
      const media = gsap.matchMedia();
      if (!reduced) {
        media.add(
          '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
          () => {
            const smoother = ScrollSmoother.create({
              wrapper: wrapper.current!,
              content: content.current!,
              smooth: settings.smooth / 1000,
              smoothTouch: false,
              effects: false,
            });
            return () => {
              smoother.kill();
            };
          },
        );
      }
      setInitialized({ smooth: settings.smooth, reduced });
      let disposed = false;
      let frame = 0;
      const refresh = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(content.current);
      void document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      content.current.addEventListener('load', refresh, true);
      const element = content.current;
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        element.removeEventListener('load', refresh, true);
        media.revert();
      };
    },
    { scope: wrapper, dependencies: [settings.smooth, reduced], revertOnUpdate: true },
  );
  return (
    <ScrollReady.Provider value={ready}>
      <div ref={wrapper} data-smooth-wrapper="">
        <div ref={content} className="smooth-content" data-smooth-content="">
          {children}
        </div>
      </div>
    </ScrollReady.Provider>
  );
}
