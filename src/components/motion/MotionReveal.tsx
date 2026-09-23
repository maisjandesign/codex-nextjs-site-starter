'use client';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
import { useScrollReady } from './SmoothScroll';
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A stationary mask owns clipping; only its inner content travels upward. */
export function MotionReveal({
  children,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}) {
  const Inner = Tag === 'div' ? 'div' : 'span';
  const scope = useRef<HTMLElement>(null);
  const { settings, replay, register, reduced } = useMotion();
  const ready = useScrollReady();
  const seen = useRef(false);
  const previousReplay = useRef(replay);
  useGSAP(
    () => {
      if (!ready || reduced) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const root = scope.current;
        const content = root?.firstElementChild;
        if (!root || !content) return;
        const explicitReplay = replay !== previousReplay.current;
        previousReplay.current = replay;
        const { top, bottom } = root.getBoundingClientRect();
        if (bottom <= 0 || (seen.current && !explicitReplay)) return;
        const alreadyVisible = top < window.innerHeight && !explicitReplay;
        const distance =
          (settings.distance * parseFloat(getComputedStyle(document.documentElement).fontSize)) /
          16;
        gsap.set(root, { overflow: 'clip' });
        const animation = gsap.timeline({
          delay: settings.delay / 1000,
          onStart: () => {
            seen.current = true;
          },
          ...(top >= window.innerHeight
            ? {
                scrollTrigger: {
                  trigger: root,
                  start: 'top bottom',
                  once: true,
                  onLeave: (trigger) => {
                    trigger.animation?.progress(1);
                  },
                },
              }
            : {}),
        });
        animation
          .fromTo(
            content,
            alreadyVisible ? { y: distance, yPercent: 0 } : { y: 0, yPercent: 100 },
            {
              y: 0,
              yPercent: 0,
              duration: settings.enter / 1000,
              ease: settings['library-ease'],
              clearProps: 'transform',
            },
          )
          .set(root, { clearProps: 'overflow' });
        const unregister = register(animation);
        const finishForFocus = () => {
          animation.progress(1);
        };
        root.addEventListener('focusin', finishForFocus);
        return () => {
          unregister();
          root.removeEventListener('focusin', finishForFocus);
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [ready, settings, replay, reduced], revertOnUpdate: true },
  );
  return (
    <Tag
      ref={(node) => {
        scope.current = node;
      }}
      className={className}
      data-motion="mask-up"
    >
      <Inner className="motion-reveal-content">{children}</Inner>
    </Tag>
  );
}
