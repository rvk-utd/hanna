import { Page } from '@playwright/test';

// ---------------------------------------------------------------------------

export const getPageScrollHeight = (page: Page) =>
  page.evaluate(() => {
    // return document.querySelector('body')!.clientHeight;
    return document.querySelector('#bodyinner')!.clientHeight;
  });

// ---------------------------------------------------------------------------
