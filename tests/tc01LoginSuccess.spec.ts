import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test('TC-01: úspešný login (standard_user)', async ({ page }) => {
  await login(page); 
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.title')).toHaveText(/products/i);
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
});