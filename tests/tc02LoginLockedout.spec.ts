import { test, expect } from '@playwright/test';
import { USERS, PASSWORD } from './data/users';

test('TC-002: locked_out_user zostane na login a vidí error', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(USERS.locked);
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/); 
  await expect(page.locator('[data-test="error"]')).toContainText(/locked out/i);
});
