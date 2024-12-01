import { test } from "@playwright/test";
import { BasePage } from "../basepage/basePage";
import { LoginPage } from "../basepage/loginPage";

test.describe("Login and Logout Tests", () => {
  test("should login and logout successfully", async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);

    test.step("Navigate to the SauceDemo login page, input valid user credentials, and verify successful login by checking the redirected URL", async () => {
      // Open the SauceDemo homepage
      await basePage.openUrl("www.saucedemo.com");
      // Fill in login credentials for the user
      await loginPage.loginFill("standard_user", "secret_sauce");
      // Click the login button
      await loginPage.loginClick();
      // Verify that the URL after login matches the expected inventory page URL
      await basePage.expectedUrl("https://www.saucedemo.com/inventory.html");
    });

    test.step("Click Logout and verify logout success", async () => {
      // Click the burger menu to open the sidebar
      await basePage.clickLogout();
      // Verify that the login page overlay is visible
      await loginPage.logoutVeryfication();
    });
  });
});
