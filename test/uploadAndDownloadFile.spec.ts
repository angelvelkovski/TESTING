import { test } from "@playwright/test";
import { navigatePage } from "../utils/navigation";
import { BasePage } from "../basepage/basePage";

test.describe("Upload and Download feature test", () => {
  test("User is able to upload a file", async ({ page }) => {
    const basePage = new BasePage(page);
    await test.step("Navigate to the Upload and Download section", async () => {
      await navigatePage(page);
      await basePage.goToUploadAndDownloadSection();
    });

    await test.step("Upload a file", async () => {
      await basePage.uploadFile();

      await test.step("Verify the output", async () => {
        await basePage.verifyFileIsUploaded("1617569089385.jpg");
      });
    });
  });
});
