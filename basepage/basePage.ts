import { Locator, Page, expect } from "@playwright/test";
import { verifyTotalPrice } from "../utils/helpers";
import { TestData} from "../enums/testData";

export class BasePage { 
  readonly burgerMenu: Locator;
  readonly logoutButton: Locator;
  readonly addTocartButton: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItem: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutFirstName: Locator;
  readonly checkoutLastName: Locator;
  readonly checkoutZip: Locator;
  readonly checkoutContinue: Locator;
  readonly checkoutFinish: Locator;
  readonly backToProducts: Locator;
  readonly checkoutOverview: Locator;

  constructor(readonly page: Page) {
    this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    this.addTocartButton = page.locator('button[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItem = page.locator("div.inventory_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.checkoutFirstName = page.locator('[data-test="firstName"]');
    this.checkoutLastName = page.locator('[data-test="lastName"]');
    this.checkoutZip = page.locator('[data-test="postalCode"]');
    this.checkoutContinue = page.locator('[data-test="continue"]');
    this.checkoutFinish = page.locator('[data-test="finish"]');
    this.backToProducts = page.locator('[data-test="back-to-products"]');
    this.checkoutOverview = page.locator('[data-test="checkout_complete_container"]');
  }
  async openUrl(url: string) {
    await this.page.goto(url);
  }
  async clickLogout() {
    await this.burgerMenu.click();
    await this.logoutButton.click();
  }
  async expectedUrl(expectedUrl: string) {
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(expectedUrl);
  }
  async clickAddToCartAndVerify() {
    await this.addTocartButton.click();
    await expect(this.cartBadge).toHaveText("1");
  }

  async addToCartByPrice(price: string) {
    // Retrieve all items with their prices
    const count = await this.inventoryItem.count();

    for (let i = 0; i < count; i++) {
      const itemPrice = await this.inventoryItem.nth(i).locator(".inventory_item_price").textContent();
      if (itemPrice === price) {
        await this.inventoryItem.nth(i).getByText('Add to cart').click();
      }
    }
  }
  async clickCartAndVerifyItem() {
    await this.cartBadge.click();
    await expect(this.inventoryItem).toBeVisible();
  }
    async checkoutOrder(firstName: TestData.FIRSTNAME, lastName: TestData.LASTNAME, zip: TestData.ZIPCODE, expectedPrice: string) {
        // Verify the price of the item in the cart
        const cartItemPrice = await this.page.locator('.summary_subtotal_label').textContent();
        expect(cartItemPrice).toContain(expectedPrice);
        await this.checkoutButton.click();
        await this.checkoutFirstName.fill(firstName);
        await this.checkoutLastName.fill(lastName);
        await this.checkoutZip.fill(zip);
        await this.checkoutContinue.click();
        const taxRate = 0.08; // Example tax rate of 8%
        await verifyTotalPrice(this.page, taxRate);
        await this.checkoutFinish.click();
        await expect(this.checkoutOverview).toBeVisible();

    }
}