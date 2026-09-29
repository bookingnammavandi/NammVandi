import { test, expect } from '@playwright/test';

test.describe('NammaMove End-to-End User Flow', () => {
  test('should load home page and navigate to booking wizard', async ({ page }) => {
    await page.goto('/');

    // Verify Title & Hero
    await expect(page.locator('h1')).toContainText('Move Anything');

    // Click Book a Move
    await page.click('text=Book a Move Now');
    await expect(page).toHaveURL(/\/booking/);

    // Step 1 check
    await expect(page.locator('h2')).toContainText('Step 1');
  });

  test('should open admin portal dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('h1')).toContainText('Operations Dashboard');
    await expect(page.locator('table')).toBeVisible();
  });
});
