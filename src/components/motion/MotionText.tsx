'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/** Plain text only: semantic headings remain intact; never split interactive descendants. */
export function MotionText({
  children,
  as: Tag = 'h2',
  className,
}: {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const { settings, replay, register, reduced } = useMotion();
  const mountedReplay = useRef(replay);
  useGSAP(
    () => {
      const root = scope.current;
      const text = root?.firstElementChild as HTMLElement | null;
      if (!root || !text) return;
      if (reduced) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        let unregister: (() => void) | undefined;
        const initial = root.getBoundingClientRect();
        const isVisible = initial.top < window.innerHeight && initial.bottom > 0;
        let played = false;
        const split = SplitText.create(text, {
          type: 'lines',
          mask: isVisible && replay === mountedReplay.current ? undefined : 'lines',
          autoSplit: true,
          onSplit(self) {
            unregister?.();
            // Resplitting due to fonts/resize must not reset text already seen.
            if (played || initial.bottom <= 0) return;
            const distance =
              (settings.distance *
                parseFloat(getComputedStyle(document.documentElement).fontSize)) /
              16;
            const animation = gsap.timeline({
              delay: settings.delay / 1000,
              ...(!isVisible
                ? {
                    scrollTrigger: {
                      trigger: root,
                      start: 'top bottom',
                      once: true,
                      onLeave: (trigger: ScrollTrigger) => {
                        trigger.animation?.progress(1);
                      },
                    },
                  }
                : {}),
              onStart: () => {
                played = true;
              },
            });
            if (isVisible && replay === mountedReplay.current) {
              // Visible first-viewport text settles gently without becoming hidden after hydration.
              animation.fromTo(
                self.lines,
                { y: distance },
                {
                  y: 0,
                  duration: settings.enter / 1000,
                  ease: settings['library-ease'],
                  stagger: settings.stagger / 1000,
                  clearProps: 'transform',
                },
              );
            } else {
              animation.fromTo(
                self.lines,
                { yPercent: 100 },
                {
                  yPercent: 0,
                  duration: settings.enter / 1000,
                  ease: settings['library-ease'],
                  stagger: settings.stagger / 1000,
                  clearProps: 'transform',
                },
              );
            }
            unregister = register(animation);
            return animation;
          },
        });
        return () => {
          unregister?.();
          split.revert();
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [settings, replay, children, reduced], revertOnUpdate: true },
  );
  return (
    <div ref={scope} data-motion="text">
      <Tag className={className}>{children}</Tag>
    </div>
  );
}
