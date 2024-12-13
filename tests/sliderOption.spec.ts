import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";
import { faker } from "@faker-js/faker";

const sliderValue = faker.string.numeric();

test.describe("Slider Feature test", () => {
  test("User is able to change slider value", async ({page}) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Widgets section", async () => {
      await navigatePage(page);
      await basePage.goToWidgetsSection();
    });

    await test.step("Open the Slider option and change slider value", async () => {
      await basePage.changeSliderValue(sliderValue);


      await test.step("Verify the output", async () => {
        await basePage.verifySliderOutput(sliderValue);
      });
    });
  });
});