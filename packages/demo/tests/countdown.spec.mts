import { expect, test } from '@playwright/test';

test('countdown decreases over time', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  const countdown = page.getByTestId('countdown');
  const startValue = await countdown.textContent();
  await page.waitForTimeout(500);
  await expect.poll(async () => countdown.textContent()).not.toBe(startValue);
});
