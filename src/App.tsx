'use client';
import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from './components/Button';
import { MotionReveal } from './components/motion/MotionReveal';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { MotionLink } from './components/motion/MotionLink';
import { MotionProvider } from './components/motion/MotionProvider';

import { DesignProvider } from './components/design/DesignProvider';
import { DesignTools } from './components/design/DesignTools';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');
export const useTheme = () => useContext(ThemeContext);
export function App({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    let initial: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') initial = saved;
    } catch {
      /* Storage can be unavailable. */
    }
    setTheme(initial);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* The session theme still works. */
    }
  };
  const pathname = usePathname();
  const isSystem = pathname === '/design-system';
  return (
    <ThemeContext.Provider value={theme}>
      <DesignProvider>
        <MotionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SmoothScroll key={pathname}>
            <div className="container">
              <MotionReveal>
                <header className="header">
                  <Link className="brand" href="/">
                    <span className="brand-mark" aria-hidden="true">
                      F
                    </span>
                    Foundation
                  </Link>
                  <nav className="nav" aria-label="Main navigation">
                    <MotionLink href="/" aria-current={pathname === '/' ? 'page' : undefined}>
                      Overview
                    </MotionLink>
                    <MotionLink href="/design-system" aria-current={isSystem ? 'page' : undefined}>
                      Design system
                    </MotionLink>
                  </nav>
                  <div>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={toggleTheme}
                      aria-label="Dark mode"
                      aria-pressed={theme === 'dark'}
                    >
                      Dark mode {theme === 'dark' ? 'on' : 'off'}
                    </Button>
                  </div>
                </header>
              </MotionReveal>
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <footer className="footer small muted">
                <span>Foundation / Site starter</span>
                <span>Tokens → components → pages</span>
              </footer>
            </div>
          </SmoothScroll>
          {process.env.NODE_ENV === 'development' && <DesignTools />}
        </MotionProvider>
      </DesignProvider>
    </ThemeContext.Provider>
  );
}
