import { Page } from '@playwright/test';

// ---------------------------------------------------------------------------

export const getPageScrollHeight = (page: Page) =>
  page.evaluate(() => {
    // return document.querySelector('body')!.clientHeight;
    return document.querySelector('#bodyinner')!.clientHeight;
    // NOTE: This `getPageScrollElm` helper is snuck into the global scope by src/root.tsx
    // return window.getPageScrollElm().clientHeight;
  });

// ---------------------------------------------------------------------------
