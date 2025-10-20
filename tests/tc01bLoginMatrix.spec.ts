import { test, expect } from '@playwright/test';
import { PASSWORD, LOGIN_OK_USERS } from './data/users';

for (const user of LOGIN_OK_USERS) {
  test(`Login OK: ${user}`, async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(user);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.title')).toHaveText(/products/i);
  });
}
