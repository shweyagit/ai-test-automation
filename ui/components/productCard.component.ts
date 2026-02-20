import { type Page, type Locator } from '@playwright/test';

export class ProductCardComponent {
  readonly root: Locator;
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.title = root.locator('[data-testid="product-title"]');
    this.price = root.locator('[data-testid="product-price"]');
    this.addToCartButton = root.locator('[data-testid="add-to-cart"]');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getPrice() {
    return this.price.textContent();
  }
}
