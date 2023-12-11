import { expect, Locator, Page } from '@playwright/test';

import { TestFnArgs } from '../../test-helpers/testingInfo.js';

// ---------------------------------------------------------------------------

export const setViewportSize =
  (page: Page): TestFnArgs['setViewportSize'] =>
  async (heightOrObj) => {
    const vp = page.viewportSize() || { width: 0, height: 0 };

    expect(vp.width > 0, 'Panic! Viewport not defined or zero-sized').toBe(true);

    const targ = typeof heightOrObj === 'number' ? { height: heightOrObj } : heightOrObj;

    await page.setViewportSize({
      width: Math.round(targ.width || vp.width),
      height: Math.round(targ.height || vp.height),
    });
    await page.waitForTimeout(100);
  };
// ---------------------------------------------------------------------------

export const expandViewport =
  (page: Page, defaultMinHeight = 0) =>
  async (minHeight = defaultMinHeight, customElm?: Locator) => {
    if (minHeight) {
      await setViewportSize(page)(minHeight);
    }

    const viewportSize = () => page.viewportSize() || { width: 0, height: 0 };

    const getScrollHeight = customElm
      ? () => customElm.evaluate((elm) => elm.scrollHeight)
      : () => page.evaluate(() => document.querySelector('#bodyinner')!.clientHeight);

    let scrollHeight = await getScrollHeight();

    while (viewportSize().height !== scrollHeight && scrollHeight > minHeight) {
      /* eslint-disable no-await-in-loop */
      await setViewportSize(page)(scrollHeight);
      await page.waitForTimeout(200);
      scrollHeight = await getScrollHeight();
      /* eslint-enable no-await-in-loop */
    }
  };
