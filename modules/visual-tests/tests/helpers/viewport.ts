import { expect, Page } from '@playwright/test';

import { TestFnArgs } from '../../src/test-helpers/testingInfo';

import { getPageScrollHeight } from './scrolling';

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
  async (minHeight = defaultMinHeight) => {
    if (minHeight) {
      await setViewportSize(page)(minHeight);
    }

    const viewportSize = () => page.viewportSize() || { width: 0, height: 0 };

    let scrollHeight = await getPageScrollHeight(page);
    while (viewportSize().height !== scrollHeight && viewportSize().height > minHeight) {
      /* eslint-disable no-await-in-loop */
      await setViewportSize(page)(scrollHeight);
      await page.waitForTimeout(200);
      scrollHeight = await getPageScrollHeight(page);
      /* eslint-enable no-await-in-loop */
    }
  };
