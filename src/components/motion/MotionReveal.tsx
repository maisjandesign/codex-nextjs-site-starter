'use client';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP, ScrollTrigger);
export function MotionReveal({
  children,
  as: Tag = 'div',
  label,
  effect = 'rise',
  className,
}: {
  children: ReactNode;
  as?: 'div' | 'header' | 'aside';
  label?: string;
  effect?: 'rise' | 'stagger' | 'mask';
  className?: string;
}) {
  const scope = useRef<HTMLElement>(null);
  const { settings, replay, register, reduced } = useMotion();
  const mountedReplay = useRef(replay);
  useGSAP(
    () => {
      if (reduced) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const root = scope.current;
        if (!root) return;
        const { top, bottom } = root.getBoundingClientRect();
        // Visible SSR content still moves, without being hidden after hydration.
        const visibleOnMount =
          replay === mountedReplay.current && top < window.innerHeight && bottom > 0;
        if (bottom <= 0) return;
        const targets =
          effect === 'stagger'
            ? Array.from(root.children).filter((child) => !child.hasAttribute('data-motion'))
            : [root];
        const mask = effect === 'mask' && !visibleOnMount;
        const distance =
          (settings.distance * parseFloat(getComputedStyle(document.documentElement).fontSize)) /
          16;
        const animation = gsap.fromTo(
          targets,
          mask
            ? { clipPath: 'inset(0% 100% 0% 0%)' }
            : { opacity: visibleOnMount ? 1 : 0, y: distance },
          {
            ...(mask ? { clipPath: 'inset(0% 0% 0% 0%)' } : { opacity: 1, y: 0 }),
            duration: settings.enter / 1000,
            delay: settings.delay / 1000,
            ease: settings['library-ease'],
            stagger: effect === 'stagger' ? settings.stagger / 1000 : 0,
            clearProps: mask ? 'clipPath' : 'opacity,transform',
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
          },
        );
        return register(animation);
      });
      return () => media.revert();
    },
    { scope, dependencies: [settings, replay, reduced], revertOnUpdate: true },
  );
  return (
    <Tag
      ref={(node) => {
        scope.current = node;
      }}
      className={className}
      aria-label={label}
      data-motion={effect}
    >
      {children}
    </Tag>
  );
}
