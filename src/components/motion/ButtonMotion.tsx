'use client';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import tokens from '../../design/tokens.json';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP);

/** Both button roles share one reversible interaction timeline and one accessible label. */
export function ButtonMotion({
  children,
  inactive = false,
}: {
  children: ReactNode;
  inactive?: boolean;
}) {
  const scope = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const { reduced, slow } = useMotion();
  useGSAP(
    () => {
      const root = scope.current;
      const control = root?.closest('button, a');
      if (!root || !control || inactive || reduced) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const animation = gsap.timeline({
          paused: true,
          defaults: {
            duration: tokens.motion.normal / 1000,
            ease: tokens.motion['library-ease'],
          },
        });
        animation
          .fromTo(root.querySelector('.button-wash'), { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo(root.querySelector('.button-label-main'), { yPercent: 0 }, { yPercent: -100 }, 0)
          .fromTo(
            root.querySelector('.button-label-copy'),
            { y: 0, yPercent: 100 },
            { y: 0, yPercent: 0 },
            0,
          );
        timeline.current = animation;
        animation.timeScale(slow ? 0.1 : 1);
        let hovered = false;
        const update = () => {
          const active = hovered || control.matches(':focus-visible');
          if (active) animation.play();
          else animation.reverse();
        };
        const enter = (event: Event) => {
          if (
            (event as PointerEvent).pointerType === 'touch' ||
            !matchMedia('(hover: hover)').matches
          )
            return;
          hovered = true;
          update();
        };
        const leave = () => {
          hovered = false;
          update();
        };
        control.addEventListener('pointerenter', enter);
        control.addEventListener('pointerleave', leave);
        control.addEventListener('focus', update);
        control.addEventListener('blur', update);
        update();
        return () => {
          control.removeEventListener('pointerenter', enter);
          control.removeEventListener('pointerleave', leave);
          control.removeEventListener('focus', update);
          control.removeEventListener('blur', update);
          timeline.current = null;
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [inactive, reduced], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      const animation = timeline.current;
      if (animation) animation.timeScale((animation.reversed() ? -1 : 1) * (slow ? 0.1 : 1));
    },
    { dependencies: [slow] },
  );
  return (
    <span
      ref={scope}
      className="button-visual"
      data-motion-control="sweep-roll"
      data-reduced={reduced}
    >
      <span className="button-wash" aria-hidden="true" />
      <span className="button-label">
        <span className="button-label-main">{children}</span>
        <span className="button-label-copy" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
