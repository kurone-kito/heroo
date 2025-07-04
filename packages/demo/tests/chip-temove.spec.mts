import { expect, test } from '@playwright/test';

test('user can remove chip', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  const input = page.getByTestId('chip-input');
  await input.focus();
  await input.fill('foo');
  await input.press('Enter');
  await page.getByLabel('Remove foo').click();
  await expect(page.locator('text=foo')).toHaveCount(0);
});
