import { test, expect } from "@playwright/test";
import { BasePage } from "../basepage/basePage";

test.describe("Product Tests", () => {
  test("should login and logout successfully", async ({ page }) => {
    const basePage = new BasePage(page);
    test("Verify product listing", async ({ page }) => {
      await basePage.openUrl("www.saucedemo.com");
      const products = await page.locator(".inventory_item");
      await expect(products).toHaveCount(6);
    });

    test("Sort products by price (low to high)", async ({ page }) => {
      await page.selectOption(".product_sort_container", "lohi");
      const prices = await page
        .locator(".inventory_item_price")
        .allTextContents();
      const sortedPrices = [...prices].map(Number).sort((a, b) => a - b);
      expect(prices.map(Number)).toEqual(sortedPrices);
    });
  });
});
