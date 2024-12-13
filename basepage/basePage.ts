import { expect, Locator, Page } from "@playwright/test";
import { time } from "console";

export class BasePage {
  readonly page: Page;
  readonly elementsSection: Locator;
  readonly textBoxOption: Locator;
  readonly userName: Locator;
  readonly email: Locator;
  readonly currentAddress: Locator;
  readonly permanentAddress: Locator;
  readonly submitButton: Locator;
  readonly outputBox: Locator;
  readonly checkBoxOption: Locator;
  readonly checkBox : Locator;
  readonly checkBoxOutput: Locator;
  readonly radioButtonOption: Locator;
  readonly radioButton: Locator;
  readonly radioButtonOutput: Locator;
  readonly chooseFileButton: Locator;
  readonly uploadAndDownloadOption: Locator;
  readonly verifyFileUpload: Locator;
  readonly alertsFrameWindowsOption: Locator;
  readonly alertSection: Locator;
  readonly alertTriggerButton: Locator;
  readonly alertBoxResult: Locator;
  readonly widgetsSection: Locator;
  readonly sliderOption: Locator;
  readonly sliderValue: Locator;
  readonly sliderLine: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsSection = page.locator('//*[@id="app"]/div/div/div[2]/div/div[1]');
    this.textBoxOption = page.locator('//*[@id="item-0"]').filter({ hasText: "Text Box" });
    this.userName = page.getByPlaceholder("Full Name");
    this.email = page.getByPlaceholder("name@example.com");
    this.currentAddress = page.getByPlaceholder("Current Address");
    this.permanentAddress = page.locator("#permanentAddress");
    this.submitButton = page.locator('button#submit[type="button"]');
    this.outputBox = page.locator("#output");
    this.checkBoxOption = page.locator('//*[@id="item-1"]').filter({ hasText: "Check Box" });
    this.checkBox = page.locator('#tree-node').getByRole('img').nth(3);
    this.checkBoxOutput = page.locator('#result');
    this.radioButtonOption = page.getByText('Radio Button');	
    this.radioButton = page.getByText('Impressive');
    this.radioButtonOutput = page.getByRole('paragraph');
    this.chooseFileButton = page.getByLabel('Select a file');
    this.uploadAndDownloadOption = page.getByText('Upload and Download');
    this.verifyFileUpload = page.locator('#uploadedFilePath');
    this.alertsFrameWindowsOption = page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(1);
    this.alertSection = page.getByText('Alerts', { exact: true });
    this.alertTriggerButton = page.locator('#confirmButton');
    this.alertBoxResult = page.locator('#confirmResult');
    this.widgetsSection = page.locator('div').filter({ hasText: /^Widgets$/ }).nth(1);
    this.sliderOption = page.getByText('Slider');
    this.sliderLine = page.getByRole('slider');
    this.sliderValue = page.locator('#sliderValue');
  }
  async goToElementsTextBoxSection() {
    await this.elementsSection.click();
    await this.textBoxOption.click();
  }

  async fillTextBox(
    userName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string
  ) {
    await this.userName.fill(userName);
    await this.email.fill(email);
    await this.currentAddress.fill(currentAddress);
    await this.permanentAddress.fill(permanentAddress);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifyOutput(
    userName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string
  ) {
    await expect(this.outputBox).toContainText(userName);
    await expect(this.outputBox).toContainText(email);
    await expect(this.outputBox).toContainText(currentAddress);
    await expect(this.outputBox).toContainText(permanentAddress);
  }

  async goToCheckBoxSection() {
    await this.elementsSection.click();
    await this.checkBoxOption.click();
  }

  async clickCheckBox(){
    await this.checkBox.click();
  }

  async verifyCheckBoxOutput(result: string){
    await expect(this.checkBoxOutput).toContainText(result);
  }

  async goToRadioButtonSection(){
    await this.elementsSection.click();
    await this.radioButtonOption.click();
  }

  async selectRadioButton(){
    await this.radioButton.click();
  }

  async verifyRadioButton(resultRadio: string){
    await expect(this.radioButtonOutput.filter({hasText:"You have selected "})).toContainText(resultRadio);
  }

  async goToUploadAndDownloadSection(){
    await this.elementsSection.click();
    await this.uploadAndDownloadOption.click();
  }

  async uploadFile(){
    const filePath = 'testdata/files/1617569089385.jpg'
    await this.chooseFileButton.setInputFiles(filePath);
  }

  async verifyFileIsUploaded(fileName: string){
    await expect(this.verifyFileUpload).toContainText(fileName);
  }

  async goToAlertsSection(){
    await this.alertsFrameWindowsOption.click();
    await this.alertSection.click();
  }

  async clickAlertButtonAndConfirm(){
    await this.alertTriggerButton.click({ timeout: 10000 });
    this.page.on("dialog", async (dialog) => {
      if (dialog.type() === 'confirm') {
        await dialog.accept();
      }
    });
  }

  async verifyAlertOutput(result: string){
    await expect(this.alertBoxResult).toContainText(result);
  }

  async goToWidgetsSection(){
    await this.widgetsSection.click();
    await this.sliderOption.click();
  }

  async changeSliderValue(value: string){
    await this.sliderLine.fill(value);
  }

  async verifySliderOutput(result: string){
    await expect(this.sliderValue).toHaveValue(result);
  }
}
