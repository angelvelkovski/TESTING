import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly loginPageOverlay: Locator;

  constructor(readonly page: Page) {
    this.usernameField = page.getByPlaceholder("Username");
    this.passwordField = page.getByPlaceholder("Password");
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginPageOverlay = page.locator("login_button_container");
  }
  async loginFill(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }
  async loginClick() {
    await this.loginButton.click();
  }
  async logoutVeryfication() {
    expect(await this.loginPageOverlay.isVisible());
  }
}