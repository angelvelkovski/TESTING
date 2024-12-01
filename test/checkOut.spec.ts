import { test } from "@playwright/test";
import { BasePage } from "../basepage/basePage";
import { LoginPage } from "../basepage/loginPage";
import { TestData } from "../enums/testData";

test.describe("Add item to card and checkout", () => {
  test("Add product to cart", async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);

    await test.step("Navigate to the SauceDemo login page, input valid user credentials, and verify successful login by checking the redirected URL", async () => {
      // Open the SauceDemo homepage
      await basePage.openUrl("www.saucedemo.com");
      // Fill in login credentials for the user
      await loginPage.loginFill("standard_user", "secret_sauce");
      await loginPage.loginClick();
    });

    await test.step("Add product to cart and verify", async () => {
      // Add product to cart
      await basePage.addToCartByPrice("7.99");
      // Verify that the login page overlay is visible
      await loginPage.logoutVeryfication();
    });

    await test.step("Open cart and checkout", async () => {
      await basePage.clickCartAndVerifyItem();
      await basePage.checkoutOrder(
        TestData.FIRSTNAME,
        TestData.LASTNAME,
        TestData.ZIPCODE,
        "7.99"
      );
      await basePage.clickLogout();
    });
  });
});
