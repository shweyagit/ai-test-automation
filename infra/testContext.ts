import { type Browser, type BrowserContext, type Page } from '@playwright/test';

export interface TestContext {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export async function createTestContext(browser: Browser): Promise<TestContext> {
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}

export async function disposeTestContext(ctx: TestContext) {
  await ctx.page.close();
  await ctx.context.close();
}
