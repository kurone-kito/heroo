import { expect, test } from '@playwright/test';

test('clicking container focuses input', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  const input = page.getByTestId('chip-input');
  await input.fill('foo');
  await input.press('Enter');
  const container = page.getByTestId('input-chips');
  await container.click({ position: { x: 1, y: 1 } });
  await expect(input).toBeFocused();
});
