'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import tokens from '../../design/tokens.json';
import { validateMotionSettings } from '../../design/motion-settings.mjs';

export type MotionSettings = Pick<
  typeof tokens.motion,
  'enter' | 'delay' | 'stagger' | 'distance' | 'library-ease'
>;
export const sourceMotion: MotionSettings = {
  enter: tokens.motion.enter,
  delay: tokens.motion.delay,
  stagger: tokens.motion.stagger,
  distance: tokens.motion.distance,
  'library-ease': tokens.motion['library-ease'],
};
type MotionContextValue = {
  settings: MotionSettings;
  replay: number;
  paused: boolean;
  slow: boolean;
  reduced: boolean;
  toggleReduced: () => void;
  apply: (next: MotionSettings) => void;
  restart: () => void;
  pause: () => void;
  finish: () => void;
  toggleSlow: () => void;
  register: (animation: gsap.core.Animation) => () => void;
};
const MotionContext = createContext<MotionContextValue | null>(null);
export function MotionProvider({
  children,
  initialSlow = false,
  initialReduced = false,
}: {
  children: ReactNode;
  initialSlow?: boolean;
  initialReduced?: boolean;
}) {
  const [settings, setSettings] = useState(sourceMotion);
  const [replay, setReplay] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(initialSlow);
  const [reduced, setReduced] = useState(initialReduced);
  const playback = useRef({ paused, slow });
  const animations = useRef(new Map<gsap.core.Animation, { started: boolean }>());
  const register = useCallback((animation: gsap.core.Animation) => {
    const state = { started: false };
    animations.current.set(animation, state);
    const onStart = animation.eventCallback('onStart');
    animation.eventCallback('onStart', () => {
      state.started = true;
      onStart?.call(animation);
      if (playback.current.paused) animation.pause();
    });
    animation.timeScale(playback.current.slow ? 0.1 : 1);

    return () => {
      animations.current.delete(animation);
    };
  }, []);
  useEffect(() => {
    playback.current = { paused, slow };
    animations.current.forEach((state, animation) => {
      animation.timeScale(slow ? 0.1 : 1);
      // Only in-progress animations are resumed; pending entrances remain pending.
      if (state.started && animation.progress() < 1) animation.paused(paused);
    });
  }, [paused, slow]);
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(settings))
      root.style.setProperty(
        `--motion-${key}`,
        typeof value === 'number' && key !== 'distance' ? `${value}ms` : String(value),
      );
    return () => {
      Object.keys(settings).forEach((key) => root.style.removeProperty(`--motion-${key}`));
    };
  }, [settings]);
  const apply = (next: MotionSettings) => {
    if (validateMotionSettings(next).length) return;
    setPaused(false);
    setSettings(next);
    setReplay((n) => n + 1);
  };
  return (
    <MotionContext.Provider
      value={{
        settings,
        replay,
        paused,
        slow,
        reduced,
        toggleReduced: () => setReduced((value) => !value),
        register,
        apply,
        restart: () => {
          setPaused(false);
          setReplay((n) => n + 1);
        },
        pause: () => setPaused((value) => !value),
        toggleSlow: () => setSlow((value) => !value),
        finish: () => {
          animations.current.forEach((_, animation) => animation.progress(1));
          setPaused(false);
        },
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
export function useMotion() {
  const value = useContext(MotionContext);
  if (!value) throw new Error('Motion components need MotionProvider.');
  return value;
}
