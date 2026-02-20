import { test as base } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { CartPage } from '../ui/pages/cart.page';
import { CheckoutPage } from '../ui/pages/checkout.page';

type Fixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';
