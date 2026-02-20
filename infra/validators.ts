import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export async function expectUrlContains(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(path));
}

export async function expectVisible(page: Page, testId: string) {
  await expect(page.locator(`[data-testid="${testId}"]`)).toBeVisible();
}

export async function expectToastMessage(page: Page, message: string) {
  await expect(page.locator('[data-testid="toast"]')).toContainText(message);
}
