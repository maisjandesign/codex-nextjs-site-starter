import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import tokens from '../src/design/tokens.json' with { type: 'json' };
import { routes, widths } from './site.config';

for (const route of routes)
  for (const width of widths)
    for (const theme of ['light', 'dark'] as const) {
      test(`${route} ${width}px ${theme}: hierarchy, spacing, overflow`, async ({
        page,
      }, testInfo) => {
        const errors: string[] = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 900 });
        await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
        await page.goto(route);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await expect(page.locator('h1')).toHaveCount(1);
        const mode =
          width >= tokens.breakpoints.desktop
            ? 'desktop'
            : width >= tokens.breakpoints.tablet
              ? 'tablet'
              : 'mobile';
        const metrics = await page.evaluate(() => {
          const px = (v: string) => parseFloat(v);
          const container = document.querySelector('.container')!.getBoundingClientRect();
          const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
            tag: h.tagName.toLowerCase(),
            size: px(getComputedStyle(h).fontSize),
            line: px(getComputedStyle(h).lineHeight),
            weight: getComputedStyle(h).fontWeight,
            family: getComputedStyle(h).fontFamily,
          }));
          const sections = [...document.querySelectorAll<HTMLElement>('.section')].map((s) => {
            const head = s.querySelector<HTMLElement>('.section-head')!;
            const title = head.querySelector('h2')!;
            const kicker = head.querySelector('span')!;
            const content = s.children[1] as HTMLElement;
            const r = s.getBoundingClientRect(),
              hs = getComputedStyle(head),
              style = getComputedStyle(s);
            return {
              left: r.left,
              titleLeft: title.getBoundingClientRect().left,
              actualHeadingGap:
                title.getBoundingClientRect().top - kicker.getBoundingClientRect().bottom,
              padding: px(style.paddingTop),
              bottomPadding: px(style.paddingBottom),
              headingGap: px(hs.rowGap),
              contentGap: px(style.rowGap),
              actualTop: head.getBoundingClientRect().top - r.top - px(style.borderTopWidth),
              actualContentGap: content
                ? content.getBoundingClientRect().top - head.getBoundingClientRect().bottom
                : null,
            };
          });
          const cards = [...document.querySelectorAll('.card')].map((c) => {
            const s = getComputedStyle(c);
            return [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(px);
          });
          const buttons = [...document.querySelectorAll<HTMLElement>('.button')].map((b) => {
            const s = getComputedStyle(b);
            return {
              size: b.dataset.size,
              variant: b.dataset.variant,
              radius: px(s.borderRadius),
              minHeight: px(s.minHeight),
              font: px(s.fontSize),
              padding: [px(s.paddingTop), px(s.paddingRight)],
              background: s.backgroundColor,
              color: s.color,
            };
          });
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            container: { left: container.left, width: container.width },
            headings,
            sections,
            cards,
            buttons,
          };
        });
        expect(errors).toEqual([]);
        expect(metrics.overflow, 'No horizontal page overflow').toBe(false);
        const expectedWidth = Math.min(
          tokens.size.container,
          width - tokens.layout[mode]['page-gutter'] * 2,
        );
        expect(metrics.container.width).toBeCloseTo(expectedWidth, 0);
        expect(metrics.container.left).toBeCloseTo((width - expectedWidth) / 2, 0);
        for (const h of metrics.headings) {
          expect(h.size, `${h.tag} size`).toBe(tokens.headings[mode][h.tag as 'h1']);
          expect(h.line).toBeCloseTo(h.size * tokens.line.heading, 1);
          expect(h.weight).toBe(String(tokens.weight.strong));
          expect(h.family).toBe(metrics.headings[0].family);
        }
        for (const s of metrics.sections) {
          expect(s.left).toBeCloseTo(metrics.container.left, 0);
          expect(s.titleLeft).toBeCloseTo(metrics.container.left, 0);
          expect(s.padding).toBe(tokens.layout[mode]['section-padding']);
          expect(s.bottomPadding).toBe(s.padding);
          expect(s.actualTop).toBeCloseTo(s.padding, 0);
          expect(s.headingGap).toBe(tokens.layout[mode]['heading-gap']);
          expect(s.actualHeadingGap).toBeCloseTo(s.headingGap, 0);
          expect(s.contentGap).toBe(tokens.layout[mode]['content-gap']);
          if (s.actualContentGap !== null) expect(s.actualContentGap).toBeCloseTo(s.contentGap, 0);
        }
        for (const card of metrics.cards)
          for (const padding of card) expect(padding).toBe(tokens.layout[mode]['card-padding']);
        const variants = new Map<string, string>();
        for (const b of metrics.buttons) {
          expect(b.radius).toBe(tokens.radius.pill);
          expect(b.font).toBe(tokens.font.body);
          expect(b.minHeight).toBe(
            b.size === 'small' ? tokens.size['control-small'] : tokens.size.control,
          );
          expect(b.padding).toEqual(
            b.size === 'small'
              ? [tokens.space['2'], tokens.space['4']]
              : [tokens.space['3'], tokens.space['6']],
          );
          const colors = `${b.background}|${b.color}`;
          if (variants.has(b.variant!)) expect(colors).toBe(variants.get(b.variant!));
          else variants.set(b.variant!, colors);
        }
        if ([390, 1440].includes(width)) {
          const a11y = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze();
          expect(a11y.violations).toEqual([]);
          await page.screenshot({
            path: testInfo.outputPath(`${route === '/' ? 'home' : 'system'}-${width}-${theme}.png`),
            fullPage: true,
          });
        }
      });
    }

test('keyboard, form errors and success, theme persistence', async ({ page, browserName }) => {
  // Safari on macOS uses Option+Tab to include links in keyboard navigation.
  const tabKey = browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
  await page.goto('/');
  await page.keyboard.press(tabKey);
  await expect(page.getByText('Skip to content', { exact: true })).toBeFocused();
  const focus = await page
    .getByText('Skip to content', { exact: true })
    .evaluate((e) => getComputedStyle(e).outlineStyle);
  expect(focus).not.toBe('none');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Test the form' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Your name').fill('Anna');
  await page.keyboard.press(tabKey);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('All set, Anna');
  await page.getByRole('button', { name: 'Dark mode', exact: true }).click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});

test('button loading state and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/design-system');
  const button = page.getByRole('button', { name: 'Show loading' });
  await button.click();
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await page.getByRole('button', { name: 'Finish demo' }).click();
  await expect(button).toBeEnabled();
  const motion = await page
    .locator('.button')
    .first()
    .evaluate((e) => ({
      transition: getComputedStyle(e).transitionDuration,
      animation: getComputedStyle(document.querySelector('[data-motion]')!).animationName,
    }));
  expect(motion).toEqual({ transition: '0s', animation: 'none' });
  const specimens = await page.locator('[data-motion], [data-motion] > *').evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return { opacity: style.opacity, transform: style.transform, clipPath: style.clipPath };
    }),
  );
  expect(specimens.length).toBeGreaterThan(0);
  for (const state of specimens)
    expect(state).toEqual({ opacity: '1', transform: 'none', clipPath: 'none' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const duration = await button.evaluate((e) => getComputedStyle(e).transitionDuration);
  expect(duration).toContain('0.14s');
});

test('text resize at 200% and long content reflow', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await page
      .locator('h1')
      .evaluate(
        (e) =>
          (e.textContent =
            'A deliberately long heading to test responsive layouts and enlarged text'),
      );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

test('hover and pressed feedback use the shared motion and color tokens', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/design-system');
  const button = page.getByRole('button', { name: 'Primary', exact: true });
  await button.hover();
  const hex = tokens.themes.light['accent-hover'].slice(1);
  const rgb = `rgb(${[0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`;
  await expect
    .poll(() => button.locator('.button-wash').evaluate((e) => getComputedStyle(e).backgroundColor))
    .toBe(rgb);
  await expect
    .poll(() => button.locator('.button-wash').evaluate((e) => getComputedStyle(e).transform))
    .toBe('matrix(1, 0, 0, 1, 0, 0)');
  await expect
    .poll(() =>
      button
        .locator('.button-label-main')
        .evaluate((e) => Math.round(new DOMMatrix(getComputedStyle(e).transform).m42)),
    )
    .toBeLessThan(0);
  await expect
    .poll(() =>
      button
        .locator('.button-label-copy')
        .evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m42),
    )
    .toBe(0);
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      button
        .locator('.button-wash')
        .evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m11),
    )
    .toBe(0);
  await button.hover();
  await page.mouse.down();
  await expect
    .poll(() => button.evaluate((e) => getComputedStyle(e).transform))
    .toBe(`matrix(${tokens.motion.press}, 0, 0, ${tokens.motion.press}, 0, 0)`);
  await page.mouse.up();
  await expect(page.getByRole('status')).toContainText('Primary action completed.');
});

test('expanded token groups remain usable on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/design-system');
  for (const summary of await page.locator('summary').all()) await summary.click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const a11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(a11y.violations).toEqual([]);
});

test('unknown route has a useful 404 and a working return link', async ({ page }) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
});
