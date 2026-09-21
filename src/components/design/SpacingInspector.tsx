'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../Button';
import { useMotion } from '../motion/MotionProvider';
import { useDesign } from './DesignProvider';
type Row = {
  name: string;
  role: string;
  inset: number;
  gap: number;
  headingGap: number;
  left: number;
  expectedInset: number;
  expectedGap: number;
  expectedHeadingGap: number;
  match: boolean;
};
export function SpacingInspector() {
  const { tokens } = useDesign();
  const { finish } = useMotion();
  const pathname = usePathname();
  const [picking, setPicking] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState('');
  const [gutter, setGutter] = useState('');
  const measure = () => {
    const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16;
    const mode =
      window.innerWidth >= tokens.breakpoints.desktop
        ? 'desktop'
        : window.innerWidth >= tokens.breakpoints.tablet
          ? 'tablet'
          : 'mobile';
    const layout = tokens.layout[mode];
    const container = document.querySelector<HTMLElement>('.container');
    if (container) {
      const actual = container.getBoundingClientRect().left;
      const expected = Math.max(
        layout['page-gutter'] * scale,
        (document.documentElement.clientWidth - tokens.size.container * scale) / 2,
      );
      setGutter(
        `Page gutter token: ${layout['page-gutter']} px. Container left edge: ${actual.toFixed(2)} / ${expected.toFixed(2)} CSS px. ${Math.abs(actual - expected) < 1 ? 'Matches tokens' : 'Review difference'}.`,
      );
    }
    const next = Array.from(
      document.querySelectorAll<HTMLElement>('#main .section, #main .hero, #main .card'),
    ).map((el, index) => {
      const role = el.matches('.section') ? 'section' : el.matches('.hero') ? 'hero' : 'card';
      const css = getComputedStyle(el);
      const head = el.querySelector<HTMLElement>(':scope > .section-head');
      const content = head?.nextElementSibling;
      const inset = head
        ? head.getBoundingClientRect().top -
          el.getBoundingClientRect().top -
          parseFloat(css.borderTopWidth || '0')
        : parseFloat(css.paddingTop);
      const gap =
        head && content
          ? content.getBoundingClientRect().top - head.getBoundingClientRect().bottom
          : parseFloat(css.rowGap) || 0;
      const headingGap = head ? parseFloat(getComputedStyle(head).rowGap) || 0 : 0;
      const expectedInset =
        (role === 'section'
          ? layout['section-padding']
          : role === 'hero'
            ? layout['hero-padding']
            : layout['card-padding']) * scale;
      const expectedGap =
        (role === 'section'
          ? layout['content-gap']
          : role === 'card'
            ? tokens.space['4']
            : mode === 'desktop'
              ? tokens.space['16']
              : layout['content-gap']) * scale;
      const expectedHeadingGap = role === 'section' ? layout['heading-gap'] * scale : 0;
      return {
        name: el.querySelector('h1,h2,h3')?.textContent?.trim() || `${role} ${index + 1}`,
        role,
        inset,
        gap,
        headingGap,
        left: el.getBoundingClientRect().left,
        expectedInset,
        expectedGap,
        expectedHeadingGap,
        match:
          Math.abs(inset - expectedInset) < 1 &&
          Math.abs(gap - expectedGap) < 1 &&
          Math.abs(headingGap - expectedHeadingGap) < 1,
      };
    });
    setRows(next);
  };
  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    const main = document.querySelector('#main');
    if (main) observer.observe(main);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [tokens, pathname]);
  useEffect(() => {
    const clear = () =>
      document
        .querySelectorAll('[data-inspected]')
        .forEach((el) => el.removeAttribute('data-inspected'));
    const click = (event: MouseEvent) => {
      if (
        !picking ||
        !(event.target instanceof Element) ||
        event.target.closest('[data-design-tools]')
      )
        return;
      const target = event.target.closest<HTMLElement>('#main .card, #main .section, #main .hero');
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      clear();
      target.dataset.inspected = 'true';
      setSelected(target.querySelector('h1,h2,h3')?.textContent?.trim() || 'Selected block');
      setPicking(false);
      measure();
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPicking(false);
    };
    document.addEventListener('click', click, true);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key);
    };
  }, [picking, tokens, pathname]);
  useEffect(
    () => () => {
      document
        .querySelectorAll('[data-inspected]')
        .forEach((el) => el.removeAttribute('data-inspected'));
    },
    [pathname],
  );
  return (
    <div className="stack">
      <p className="small">{gutter}</p>
      <div className="field">
        <label htmlFor="inspect-block">Choose block</label>
        <select
          id="inspect-block"
          defaultValue=""
          onChange={(event) => {
            document
              .querySelectorAll('[data-inspected]')
              .forEach((el) => el.removeAttribute('data-inspected'));
            const el = document.querySelectorAll<HTMLElement>(
              '#main .section, #main .hero, #main .card',
            )[Number(event.target.value)];
            if (el) {
              el.dataset.inspected = 'true';
              setSelected(el.querySelector('h1,h2,h3')?.textContent?.trim() || 'Selected block');
              measure();
            }
          }}
        >
          <option value="" disabled>
            Select a block
          </option>
          {rows.map((row, index) => (
            <option key={index} value={index}>
              {row.role}: {row.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <Button
          size="small"
          variant="secondary"
          aria-pressed={picking}
          onClick={() => setPicking(!picking)}
        >
          {picking ? 'Cancel selection' : 'Pick a block'}
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => {
            finish();
            requestAnimationFrame(measure);
          }}
        >
          Settle motion and measure
        </Button>
      </div>
      <p className="small">
        {picking
          ? 'Click a section, hero or card. Escape cancels.'
          : selected || 'Read all repeated blocks below; selecting a block is optional.'}
      </p>
      <p className="small muted">
        Actual / expected CSS px. Measurements include rendered geometry; animation can temporarily
        move content. Desktop hero column gap is a separate role. Centered container edges include
        the maximum-width constraint.
      </p>
      {rows.map((row, i) => (
        <div className="inspector-row" key={`${row.role}-${i}`}>
          <strong>{row.name}</strong>
          <span className="label">
            {row.role} · {row.match ? 'Matches tokens' : 'Review difference'}
          </span>
          <span className="small">
            Top inset: {row.inset.toFixed(2)} / {row.expectedInset.toFixed(2)} · Content gap:{' '}
            {row.gap.toFixed(2)} / {row.expectedGap.toFixed(2)}
            {row.role === 'section'
              ? ` · Heading gap: ${row.headingGap.toFixed(2)} / ${row.expectedHeadingGap.toFixed(2)}`
              : ''}{' '}
            · Left edge: {row.left.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
