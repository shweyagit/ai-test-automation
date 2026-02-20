import { type Page, type Locator } from '@playwright/test';

export class HeaderComponent {
  readonly root: Locator;
  readonly logo: Locator;
  readonly cartIcon: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.root = page.locator('header');
    this.logo = this.root.locator('[data-testid="logo"]');
    this.cartIcon = this.root.locator('[data-testid="cart-icon"]');
    this.userMenu = this.root.locator('[data-testid="user-menu"]');
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async openUserMenu() {
    await this.userMenu.click();
  }
}
