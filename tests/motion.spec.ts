import { test, expect, type Locator, type Page } from '@playwright/test';
import { checkMotionFrames } from '../scripts/motion-evidence.mjs';

test.use({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' });
test.setTimeout(45000);
const y = (target: Locator) =>
  target.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42);
const scale = (target: Locator) =>
  target.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m11);
async function slow(page: Page) {
  await page.goto('/design-system');
  await page.getByRole('button', { name: 'Slow playback', exact: true }).click();
}

test('motion: opening and section must actually move, settle and survive route return', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await slow(page);
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  const hero = page.locator('.hero h1 > div').first();
  await expect.poll(() => y(hero)).toBeGreaterThan(1);
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
  frames.push(await y(hero));
  expect(checkMotionFrames(frames).passed).toBe(true);
  const content = page.locator('#principles [data-sequence-part="content"]');
  await content.scrollIntoViewIfNeeded();
  await expect.poll(() => y(content)).toBeGreaterThan(0);
  await expect.poll(() => y(content), { timeout: 12000 }).toBe(0);
  await page.getByRole('link', { name: 'Design system', exact: true }).click();
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  await expect.poll(() => y(page.locator('.hero h1 > div').first())).toBeGreaterThan(1);
  await expect(page.locator('h1')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('motion: button hover changes frames, reverses and preserves its hit area', async ({
  page,
}) => {
  await slow(page);
  const button = page.getByRole('button', { name: 'Primary', exact: true });
  await button.scrollIntoViewIfNeeded();
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
  const underline = link.locator('.motion-link-line');
  await link.hover();
  await expect.poll(() => scale(underline)).toBeGreaterThan(0);
  expect(await scale(underline)).toBeLessThan(1);
  await expect.poll(() => scale(underline)).toBe(1);
  await page.mouse.move(1250, 20);
  await expect.poll(() => scale(underline)).toBe(0);
  const primary = page.getByRole('button', { name: 'Primary', exact: true });
  await primary.focus();
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  const secondary = page.getByRole('button', { name: 'Secondary', exact: true });
  await expect(secondary).toBeFocused();
  await expect.poll(() => scale(secondary.locator('.button-wash'))).toBeGreaterThan(0);
});

test('motion: reduced preview settles sequences and disables moving control layers', async ({
  page,
}) => {
  await slow(page);
  await page.getByRole('button', { name: 'Reduced motion preview', exact: true }).click();
  await page.getByRole('link', { name: 'Overview', exact: true }).click();
  for (const target of await page.locator('[data-sequence-part]').all()) {
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
