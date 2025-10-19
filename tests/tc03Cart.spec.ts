import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test('TC-003: pridanie 2 položiek, badge=2; po remove badge=1 a stav persistuje', async ({ page }) => {
  await login(page);

  const addButtons = page.getByRole('button', { name: /^add to cart$/i });
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();

  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('2');

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await page.getByRole('button', { name: /^remove$/i }).first().click();
  await expect(page.locator('.cart_item')).toHaveCount(1);

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.getByRole('button', { name: /continue shopping/i }).click();
  await page.reload();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
