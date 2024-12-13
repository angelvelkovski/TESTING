import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Widgets$/ }).nth(1).click();
  await page.getByText('Slider').click();
  await page.getByRole('slider').fill('78');
  await page.locator('#sliderValue').click();
});