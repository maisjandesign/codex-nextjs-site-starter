'use client';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** One owner and trigger per composition. Nested sequences own their own targets. */
export function MotionSequence({
  children,
  as: Tag = 'section',
  mode = 'section',
  className,
  id,
}: {
  children: ReactNode;
  as?: 'section' | 'div';
  mode?: 'opening' | 'section';
  className?: string;
  id?: string;
}) {
  const scope = useRef<HTMLElement>(null);
  const { settings, replay, reduced, register } = useMotion();
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || reduced) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-sequence-part]'))
          .filter((node) => node.closest('[data-motion-sequence]') === root)
          // Moving a wrapper and its descendants would give one property multiple owners.
          .filter((node) => {
            const parentPart = node.parentElement?.closest('[data-sequence-part]');
            return !parentPart || parentPart.closest('[data-motion-sequence]') !== root;
          });
        const bounds = root.getBoundingClientRect();
        if (!targets.length || bounds.bottom <= 0) return;
        const duration = settings.enter / 1000;
        const stagger = settings.stagger / 1000;
        const distance =
          (settings.distance * parseFloat(getComputedStyle(document.documentElement).fontSize)) /
          16;
        let started = false;
        const timeline = gsap.timeline({
          paused: true,
          delay: settings.delay / 1000,
          defaults: { duration, ease: settings['library-ease'] },
          onStart: () => {
            started = true;
          },
        });
        const splits: SplitText[] = [];
        for (const node of targets) {
          const rect = node.getBoundingClientRect();
          if (rect.bottom <= 0) continue;
          const visible = rect.top < window.innerHeight;
          const position = Number(node.dataset.sequenceStep ?? 0) * stagger;
          if (node.dataset.sequencePart === 'heading') {
            splits.push(
              SplitText.create(node, {
                type: 'lines',
                mask: visible ? undefined : 'lines',
                autoSplit: true,
                onSplit(self) {
                  // Font/width changes settle text already seen; never replay it on resize.
                  if (started) return;
                  const lines = gsap.fromTo(
                    self.lines,
                    visible ? { y: distance } : { yPercent: 100 },
                    {
                      y: 0,
                      yPercent: 0,
                      duration,
                      ease: settings['library-ease'],
                      stagger,
                      clearProps: 'transform',
                    },
                  );
                  timeline.add(lines, position);
                  return lines;
                },
              }),
            );
          } else {
            timeline.fromTo(
              node,
              { y: distance, opacity: visible ? 1 : 0 },
              { y: 0, opacity: 1, clearProps: 'transform,opacity' },
              position,
            );
          }
        }
        const unregister = register(timeline);
        const trigger =
          mode === 'section' && bounds.top >= window.innerHeight
            ? ScrollTrigger.create({
                trigger: root,
                animation: timeline,
                start: 'top bottom',
                once: true,
                onLeave: () => {
                  timeline.progress(1);
                },
              })
            : undefined;
        if (!trigger) timeline.play();
        return () => {
          unregister();
          trigger?.kill();
          timeline.revert();
          splits.forEach((split) => split.revert());
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [settings, replay, reduced, mode], revertOnUpdate: true },
  );
  return (
    <Tag
      ref={(node) => {
        scope.current = node;
      }}
      id={id}
      className={className}
      data-motion-sequence={mode}
    >
      {children}
    </Tag>
  );
}
