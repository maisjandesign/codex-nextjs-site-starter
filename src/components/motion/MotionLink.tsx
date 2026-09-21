'use client';
import { useRef, type ComponentProps } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import tokens from '../../design/tokens.json';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP);

/** A shared directional underline; the link's label and hit area remain stationary. */
export function MotionLink({ children, className = '', ...props }: ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const timeline = useRef<gsap.core.Tween | null>(null);
  const { reduced, slow } = useMotion();
  const current = Boolean(props['aria-current'] && props['aria-current'] !== 'false');
  useGSAP(
    () => {
      const link = ref.current;
      if (!link || reduced || current) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const animation = gsap.fromTo(
          link.querySelector('.motion-link-line'),
          { scaleX: 0 },
          {
            scaleX: 1,
            paused: true,
            duration: tokens.motion.normal / 1000,
            ease: tokens.motion['library-ease'],
          },
        );
        timeline.current = animation;
        animation.timeScale(slow ? 0.1 : 1);
        let hovered = false;
        const update = () => {
          if (hovered || link.matches(':focus-visible')) animation.play();
          else animation.reverse();
        };
        const enter = (event: PointerEvent) => {
          if (
            event.pointerType === 'touch' ||
            !matchMedia('(hover: hover) and (pointer: fine)').matches
          )
            return;
          hovered = true;
          update();
        };
        const leave = () => {
          hovered = false;
          update();
        };
        link.addEventListener('pointerenter', enter);
        link.addEventListener('pointerleave', leave);
        link.addEventListener('focus', update);
        link.addEventListener('blur', update);
        update();
        return () => {
          link.removeEventListener('pointerenter', enter);
          link.removeEventListener('pointerleave', leave);
          link.removeEventListener('focus', update);
          link.removeEventListener('blur', update);
          timeline.current = null;
        };
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [reduced, current], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      const animation = timeline.current;
      if (animation) animation.timeScale((animation.reversed() ? -1 : 1) * (slow ? 0.1 : 1));
    },
    { dependencies: [slow] },
  );
  return (
    <Link {...props} ref={ref} className={`motion-link ${className}`} data-reduced={reduced}>
      <span className="motion-link-label">
        {children}
        <span className="motion-link-line" aria-hidden="true" />
      </span>
    </Link>
  );
}
