import { expect, test } from '@playwright/test';

test('user can add chip via input', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  const input = page.getByTestId('chip-input');
  await input.focus();
  await input.fill('foo');
  await input.press('Enter');
  await expect(page.getByText('foo')).toBeVisible();
});
