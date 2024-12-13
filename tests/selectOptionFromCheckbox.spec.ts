import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";

test.describe("Checkbox Feature test", () => {
  test("User is able to select options from checkbox", async ({page}) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Check Box section", async () => {
      await navigatePage(page);
      await basePage.goToCheckBoxSection();
    });

    await test.step("Open the Check Box option and click the checkbox", async () => {
      await basePage.clickCheckBox();


      await test.step("Verify the output", async () => {
        await basePage.verifyRadioButton("");
      });
    });
  });
});