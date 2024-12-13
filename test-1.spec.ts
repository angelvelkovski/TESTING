import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(1).click();
  await page.getByText('Alerts', { exact: true }).click();
  await page.locator('#confirmButton').click();
  await page.getByText('You selected Ok').click();
});