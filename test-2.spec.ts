import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(1).click();
  await page.locator('li').filter({ hasText: 'Alerts' }).click();
  await page.locator('div').filter({ hasText: /^Click me$/ }).nth(2).click();
  await page.locator('#confirmButton').click();
});