import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly addressInput: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressInput = page.locator('[data-testid="shipping-address"]');
    this.placeOrderButton = page.locator('[data-testid="place-order"]');
    this.orderConfirmation = page.locator('[data-testid="order-confirmation"]');
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async fillShippingAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
