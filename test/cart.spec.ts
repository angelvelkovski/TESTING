import { test } from '@playwright/test';
import { BasePage } from '../basepage/basePage';
import { LoginPage } from '../basepage/loginPage';

test.describe('Cart Tests', () => {
    test('Add product to cart', async ({ page }) => {
        const basePage = new BasePage(page);
        const loginPage = new LoginPage(page);

        await test.step('Navigate to the SauceDemo login page, input valid user credentials, and verify successful login by checking the redirected URL', async () => {
            // Open the SauceDemo homepage
            await basePage.openUrl("https://www.saucedemo.com/");
            // Fill in login credentials for the user
            await loginPage.loginFill('standard_user', 'secret_sauce');
        });

        test.step('Add product to cart and verify', async () => {
            // Click the burger menu to open the sidebar
            await basePage.addToCartByPrice('7.99');
            // Verify that the login page overlay is visible
            page.pause();
            await loginPage.logoutVeryfication();
        });
    });
});