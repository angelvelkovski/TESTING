import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";

test.describe("Alert feature test", () => {
  test("User is able to perform confirm action from alert / confirm box", async ({page}) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Alerts section", async () => {
      await navigatePage(page);
      await basePage.goToAlertsSection();
    });

    await test.step("Trigger dialog message alert and confirm ", async () => {
      await basePage.clickAlertButtonAndConfirm();


      await test.step("Verify the output", async () => {
        await basePage.verifyAlertOutput("You selected Ok");
      });
    });
  });
});