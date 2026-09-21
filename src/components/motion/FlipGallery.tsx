'use client';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { Button } from '../Button';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP, Flip);
const items = ['Shape', 'Rhythm', 'Balance'];
export function FlipGallery() {
  const scope = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(items);
  const previous = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const active = useRef<gsap.core.Timeline | null>(null);
  const { settings, register, replay, reduced } = useMotion();
  const { contextSafe } = useGSAP(
    () => {
      if (reduced) {
        previous.current = null;
        return;
      }
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        if (!previous.current) return;
        const animation = Flip.from(previous.current, {
          duration: settings.enter / 1000,
          ease: settings['library-ease'],
          scale: true,
          nested: true,
        });
        active.current = animation;
        previous.current = null;
        return register(animation);
      });
      previous.current = null;
      return () => {
        media.revert();
        active.current = null;
      };
    },
    { scope, dependencies: [featured, order, settings, replay, reduced], revertOnUpdate: true },
  );
  const capture = contextSafe(() => {
    const nodes = scope.current?.querySelectorAll('[data-flip-card]');
    if (!nodes) return;
    // Capture the current visual state without forcing an interrupted transition to its end.
    Flip.killFlipsOf(nodes, false);
    const state = Flip.getState(nodes);
    previous.current = state;
  });
  return (
    <div className="motion-example">
      <div className="row">
        <Button
          variant="secondary"
          aria-pressed={featured}
          onClick={() => {
            capture();
            setFeatured((value) => !value);
          }}
        >
          Toggle featured layout
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            capture();
            setOrder((value) => [...value.slice(1), value[0]]);
          }}
        >
          Rotate cards
        </Button>
      </div>
      <div ref={scope} className="flip-gallery" data-featured={featured} data-motion="flip">
        {order.map((item) => (
          <div key={item} className="flip-card" data-flip-card data-flip-id={item}>
            <span className="label">{item}</span>
            <span className="flip-orbit" aria-hidden="true" />
          </div>
        ))}
      </div>
      <p className="small muted">
        Switch again during movement. The cards keep their identity as the layout changes.
      </p>
    </div>
  );
}
