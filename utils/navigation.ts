import { Page } from '@playwright/test';

export const navigatePage = async (page: Page) => {
    // Navigate to the demoqa site
    await page.goto('https://demoqa.com/');
};
