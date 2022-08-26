import type { Page } from '@playwright/test';

/**
 * Scrolls the `page` all the way to the bottom,
 * in viewport-height-sized jumps, once every `intervalMs` ms.
 *
 * This ensures that all "lazy" images are loaded
 * (and other scroll-related events are triggered)
 *
 * Pass a larger `intervalMs` for pages with effects that
 * require a certain delay to trigger.
 */
export const scrollFullPage = async (page: Page, intervalMs = 70) => {
  await page.evaluate(async (intervalMs) => {
    await new Promise<void>((resolve) => {
      const scroll = () => {
        // NOTE: This `getPageScrollElm` helper is snuck into the global scope by src/root.tsx
        const scrollElm = window.getPageScrollElm();
        const scrollPosBefore = scrollElm.scrollTop;
        scrollElm.scrollTo({
          top: scrollPosBefore + scrollElm.clientHeight,
          // @ts-expect-error  (tslib issue: https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1195)
          behavior: 'instant',
        });
        if (scrollPosBefore >= scrollElm.scrollTop) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          clearInterval(timer);
          resolve();
        }
      };
      const timer = setInterval(scroll, intervalMs);
      scroll();
    });
  }, intervalMs);
};
