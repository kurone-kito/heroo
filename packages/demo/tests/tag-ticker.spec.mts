import { expect, test } from '@playwright/test';

test('selecting tag adds chip', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: '.animate-ticker{animation:none!important;}',
  });
  const tag = page.locator('button:has-text("Lorem"):not(:disabled)').first();
  await tag.scrollIntoViewIfNeeded();
  await tag.click({ force: true });
  await expect(
    page.getByTestId('input-chips').getByText('Lorem'),
  ).toBeVisible();
});
