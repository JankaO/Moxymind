import { Page, expect } from '@playwright/test';
import { PASSWORD, USERS } from '../data/users';

export async function login(
  page: Page,
  username: string = USERS.standard,
  password: string = PASSWORD
) {
  await page.goto('/');

  const u = page.locator('[data-test="username"], input#user-name, input[placeholder="Username"]');
  const p = page.locator('[data-test="password"], input#password, input[placeholder="Password"]');
  const btn = page.locator('[data-test="login-button"], input[type="submit"], button:has-text("Login")');

  await u.fill(username);
  await p.fill(password);
  await btn.click();

  // úspešný login => Products + grid
  await expect(page.locator('.title')).toHaveText(/products/i);
  await expect(page.locator('.inventory_list')).toBeVisible();
}
