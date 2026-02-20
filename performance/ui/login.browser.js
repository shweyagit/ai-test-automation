import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: { browser: { type: 'chromium' } },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto(`${__ENV.BASE_URL}/login`);

    await page.locator('[data-testid="email"]').fill('testuser@example.com');
    await page.locator('[data-testid="password"]').fill('Test1234!');
    await page.locator('[data-testid="login-submit"]').click();

    const header = page.locator('[data-testid="user-menu"]');
    check(await header.isVisible(), {
      'user menu is visible after login': (v) => v === true,
    });
  } finally {
    await page.close();
  }
}
