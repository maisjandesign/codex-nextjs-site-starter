import { test, expect, type Locator, type Page } from '@playwright/test';
import { checkMotionFrames } from '../scripts/motion-evidence.mjs';

test.use({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' });
test.setTimeout(45000);
const y = (target: Locator) =>
  target.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42);
const scale = (target: Locator) =>
  target.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m11);
// Drive native wheel scrolling: DOM scrollIntoView can scroll the fixed smoother wrapper.
async function wheelTo(page: Page, target: Locator) {
  const box = await target.boundingBox();
  if (!box) throw new Error('Missing scroll target');
  await page.mouse.move(1240, 360);
  await page.mouse.wheel(0, box.y + box.height / 2 - 360);
  await expect
    .poll(async () => {
      const bounds = await target.boundingBox();
      return Boolean(bounds && bounds.y >= 0 && bounds.y + bounds.height <= 720);
    })
    .toBe(true);
  const content = page.locator('[data-smooth-content]');
  await expect
    .poll(async () => Math.abs((await y(content)) + (await page.evaluate(() => window.scrollY))))
    .toBeLessThan(0.1);
}
async function slow(page: Page) {
  await page.goto('/design-system');
  const control = page.getByRole('button', { name: 'Slow playback', exact: true });
  await wheelTo(page, control);
  await control.click();
}

test('motion: upward masks must actually move, settle and survive route return', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await slow(page);
  await wheelTo(page, page.getByRole('link', { name: 'Overview', exact: true }));
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  const hero = page.locator('.hero h1 > .motion-reveal-content').first();
  await expect.poll(() => y(hero)).toBeGreaterThan(1);
  await expect(hero.locator('..')).toHaveCSS('overflow', 'clip');
  const first = await y(hero);
  const frames = [first];
  await expect
    .poll(
      async () => {
        const frame = await y(hero);
        frames.push(frame);
        return frame;
      },
      { timeout: 12000 },
    )
    .toBeLessThan(first - 0.5);
  await expect.poll(() => y(hero), { timeout: 12000 }).toBe(0);
  await expect(hero.locator('..')).toHaveCSS('overflow', 'visible');
  frames.push(await y(hero));
  expect(checkMotionFrames(frames).passed).toBe(true);
  const content = page.locator('#principles > [data-motion="mask-up"] > .motion-reveal-content');
  await wheelTo(page, content);
  await expect.poll(() => y(content)).toBeGreaterThan(0);
  await expect.poll(() => y(content), { timeout: 12000 }).toBe(0);
  await wheelTo(page, page.getByRole('link', { name: 'Design system', exact: true }));
  await page.getByRole('link', { name: 'Design system', exact: true }).click();
  await wheelTo(page, page.getByRole('link', { name: 'Overview', exact: true }));
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  await expect
    .poll(() => y(page.locator('.hero h1 > .motion-reveal-content').first()))
    .toBeGreaterThan(1);
  await expect(page.locator('h1')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('motion: button hover changes frames, reverses and preserves its hit area', async ({
  page,
}) => {
  await slow(page);
  const button = page.getByRole('button', { name: 'Primary', exact: true });
  await wheelTo(page, button);
  const before = await button.boundingBox();
  const fill = button.locator('.button-wash');
  await expect.poll(() => scale(fill)).toBe(0);
  await button.hover();
  await expect.poll(() => scale(fill)).toBeGreaterThan(0);
  const intermediate = await scale(fill);
  expect(intermediate).toBeLessThan(1);
  await expect.poll(() => scale(fill)).toBe(1);
  expect(await y(button.locator('.button-label-copy'))).toBe(0);
  expect(await y(button.locator('.button-label-main'))).toBeLessThan(0);
  expect(await button.boundingBox()).toEqual(before);
  await page.mouse.move(1250, 20);
  await expect.poll(() => scale(fill)).toBeLessThan(1);
  await button.hover();
  await expect.poll(() => scale(fill)).toBe(1);
  await page.mouse.move(1250, 20);
  await expect.poll(() => scale(fill)).toBe(0);
});

test('motion: navigation underline is reversible and keyboard focus animates buttons', async ({
  page,
  browserName,
}) => {
  await slow(page);
  const link = page.getByRole('link', { name: 'Overview', exact: true });
  await wheelTo(page, link);
  const underline = link.locator('.motion-link-line');
  await link.hover();
  await expect.poll(() => scale(underline)).toBeGreaterThan(0);
  expect(await scale(underline)).toBeLessThan(1);
  await expect.poll(() => scale(underline)).toBe(1);
  await page.mouse.move(1250, 20);
  await expect.poll(() => scale(underline)).toBe(0);
  const primary = page.getByRole('button', { name: 'Primary', exact: true });
  await wheelTo(page, primary);
  await primary.focus();
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  const secondary = page.getByRole('button', { name: 'Secondary', exact: true });
  await expect(secondary).toBeFocused();
  await expect.poll(() => scale(secondary.locator('.button-wash'))).toBeGreaterThan(0);
});

test('motion: reduced preview settles masks and disables moving control layers', async ({
  page,
}) => {
  await slow(page);
  const reduce = page.getByRole('button', { name: 'Reduced motion preview', exact: true });
  await wheelTo(page, reduce);
  await reduce.click();
  await wheelTo(page, page.getByRole('link', { name: 'Overview', exact: true }));
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.hero h1')).toBeVisible();
  for (const target of await page.locator('.motion-reveal-content').all()) {
    expect(await y(target)).toBe(0);
    await expect(target).toHaveCSS('opacity', '1');
  }
  await page.getByRole('link', { name: 'Design system', exact: true }).click();
  const button = page.getByRole('button', { name: 'Primary', exact: true });
  await button.hover();
  await expect(button.locator('.button-wash')).toHaveCSS('display', 'none');
  await expect(button.locator('.button-label-copy')).toHaveCSS('display', 'none');
  expect(await y(button.locator('.button-label-main'))).toBe(0);
});

test('motion: smoothing moves the content over time and reduced motion restores native scroll', async ({
  page,
}) => {
  await page.goto('/');
  const wrapper = page.locator('[data-smooth-wrapper]');
  const content = page.locator('[data-smooth-content]');
  await expect(wrapper).toHaveCSS('position', 'fixed');
  // Let initialization/fonts finish, then capture frames in-page to avoid sampling only endpoints.
  await page.waitForTimeout(1000);
  const capture = page.evaluate(
    () =>
      new Promise<{ visual: number; native: number }[]>((resolve) => {
        const frames: { visual: number; native: number }[] = [];
        const start = performance.now();
        const sample = () => {
          const node = document.querySelector('[data-smooth-content]')!;
          frames.push({
            visual: new DOMMatrixReadOnly(getComputedStyle(node).transform).m42,
            native: -window.scrollY,
          });
          if (performance.now() - start < 1800) requestAnimationFrame(sample);
          else resolve(frames);
        };
        requestAnimationFrame(sample);
      }),
  );
  await page.mouse.wheel(0, 500);
  const frames = await capture;
  expect(frames.some((frame) => frame.visual < -1 && frame.visual > frame.native + 1)).toBe(true);
  expect(frames.at(-1)!.native).toBeLessThan(-1);
  expect(Math.abs(frames.at(-1)!.visual - frames.at(-1)!.native)).toBeLessThan(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(wrapper).toHaveCSS('position', 'static');
  await expect(content).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(wrapper).toHaveCSS('position', 'fixed');
  await page.goto('/#principles');
  await expect
    .poll(async () => Math.abs((await page.locator('#principles').boundingBox())!.y))
    .toBeLessThan(5);
});

test('motion: content remains visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4179/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveCSS('overflow', 'visible');
  await expect(page.locator('h1 > .motion-reveal-content')).toHaveCSS('transform', 'none');
  await context.close();
});
