import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test('TC-004: kompletný checkout a správne sumy', async ({ page }) => {
  await login(page);

  const addButtons = page.getByRole('button', { name: /^add to cart$/i });
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();

  await page.locator('.shopping_cart_link').click();

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const itemSum = priceTexts
    .map(t => Number(t.replace(/[^0-9.]/g, '')))
    .reduce((a, b) => a + b, 0);

  await page.getByRole('button', { name: /^checkout$/i }).click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="postalCode"]').fill('81101');
  await page.getByRole('button', { name: /^continue$/i }).click();

  const subtotalText = await page.locator('.summary_subtotal_label').textContent();
  const itemTotal = Number(subtotalText?.replace(/[^0-9.]/g, ''));
  expect(itemTotal).toBeCloseTo(itemSum, 2);

  const taxText = await page.locator('.summary_tax_label').textContent();
  const totalText = await page.locator('.summary_total_label').textContent();
  if (taxText && totalText) {
    const tax = Number(taxText.replace(/[^0-9.]/g, ''));
    const total = Number(totalText.replace(/[^0-9.]/g, ''));
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }

  await page.getByRole('button', { name: /^finish$/i }).click();
  await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});