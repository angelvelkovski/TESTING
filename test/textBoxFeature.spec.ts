import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";
import { faker } from "@faker-js/faker";

const userName = faker.string.alpha();
const email = faker.internet.email();
const currentAddress = faker.location.streetAddress();
const permanentAddress = faker.location.streetAddress();

test.describe("Text Box Feature Tests", () => {
  test("User is able to fill all text fields with valid data and submit the data", async ({
    page,
  }) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Text Box section", async () => {
      await navigatePage(page);
      await basePage.goToElementsTextBoxSection();
    });

    await test.step("Open Text Box option and Fill all text fields with valid data", async () => {
      await basePage.fillTextBox(userName, email, currentAddress, permanentAddress);
      await basePage.submitForm();

      await test.step("Verify the output", async () => {
        await basePage.verifyOutput(userName, email, currentAddress, permanentAddress);
      });
    });
  });
});
