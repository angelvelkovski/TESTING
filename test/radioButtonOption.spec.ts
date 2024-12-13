import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";
import { base } from "@faker-js/faker";

test.describe("Radio Button feature test", () => {
  test("User is able to select option from radio button", async ({page}) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Radio Button section", async () => {
      await navigatePage(page);
      await basePage.goToRadioButtonSection();
    });

    await test.step("Open the Radio Button option and click the radio button", async () => {
      await basePage.selectRadioButton();


      await test.step("Verify the output", async () => {
        await basePage.verifyRadioButton("Impressive");
      });
    });
  });
});