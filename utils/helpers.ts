import { Page } from '@playwright/test';
import { BasePage } from '../basepage/basePage';

export async function verifyTotalPrice(page: Page, taxRate: number): Promise<void> {
    const basePage = new BasePage(page);
    // Get all item prices in the cart
    const itemPriceElements = page.locator('.inventory_item_price');
    const itemPrices = await itemPriceElements.allTextContents();
    
    // Parse the prices into numbers and calculate the subtotal
    const subtotal = itemPrices.reduce((sum, price) => sum + parseFloat(price.replace('$', '').trim()), 0);

    // Calculate the expected tax and total
    const expectedTax = parseFloat((subtotal * taxRate).toFixed(2));
    const expectedTotal = parseFloat((subtotal + expectedTax).toFixed(2));

    // Retrieve the displayed tax and total from the page
    const displayedTaxText = await page.locator('.summary_tax_label').textContent();
    if (displayedTaxText === null) {
        throw new Error('Tax label text content is null');
    }
    const displayedTax = parseFloat(displayedTaxText.replace('Tax: $', '').trim());
    const displayedTotalText = await page.locator('.summary_total_label').textContent();
    if (displayedTotalText === null) {
        throw new Error('Total label text content is null');
    }
    const displayedTotal = parseFloat(displayedTotalText.replace('Total: $', '').trim());

    if (displayedTax !== expectedTax) {
        throw new Error(`Tax mismatch: Expected ${expectedTax}, but found ${displayedTax}`);
    }
    if (displayedTotal !== expectedTotal) {
        throw new Error(`Total mismatch: Expected ${expectedTotal}, but found ${displayedTotal}`);
    }
}