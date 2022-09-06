import type { Page, PageScreenshotOptions } from '@playwright/test';
import { expect } from '@playwright/test';

import type { TestFnArgs } from '../../src/testingInfo';

// NOTE: using greek letter "ι" to make a stable splitter ("-ι-")
// between different portions of the screenshot filename, because
// PlayWright's (mostly unducoumented, it seems) file-name normalization
// is quite aggressive towards double-dashes, underscores, and other
// non-alphabetical characters.
export const NAME_SPLIT = '-ι-';
export const LABEL_SPLIT = '-ιι-';

export const TAG_PREFIX = ' 🏷';

// ---------------------------------------------------------------------------

const toFileName = (testName: string, label: string) =>
  `${testName}${label && LABEL_SPLIT + label}${NAME_SPLIT}.png`;

// ---------------------------------------------------------------------------

const getPageScrollHeight = (page: Page) =>
  page.evaluate(() => {
    // NOTE: This `getPageScrollElm` helper is snuck into the global scope by src/root.tsx
    return window.getPageScrollElm().scrollHeight;
  });

// ---------------------------------------------------------------------------

export const expandViewport = async (page: Page) => {
  const viewportSize = () => page.viewportSize() || { width: 0, height: 0 };
  const viewportWidth = viewportSize().width;
  expect(viewportWidth > 0, 'Panic! Viewport not defined or zero-sized').toBe(true);
  let scrollHeight = await getPageScrollHeight(page);
  while (viewportSize().height !== scrollHeight) {
    // eslint-disable-next-line no-await-in-loop
    await page.setViewportSize({
      width: viewportWidth,
      height: scrollHeight,
    });
    scrollHeight = await getPageScrollHeight(page);
  }
};

// ---------------------------------------------------------------------------

export const makeSnapLocalScreeshot =
  (page: Page, testName: string): TestFnArgs['localScreenshot'] =>
  async (locator, label, opts) => {
    if ('waitForElementState' in locator) {
      const id = await locator.evaluate((elm: HTMLElement) => {
        if (!elm.id) {
          elm.id = 'foo' + Date.now() + Math.random();
        }
        return elm.id;
      });
      locator = page.locator('#' + id);
    }
    return expect(locator).toHaveScreenshot(toFileName(testName, label), opts);
  };

// ---------------------------------------------------------------------------

/**
 * Factory function that generates a pageScreenshot convenience function
 * for custom tests to use.
 *
 * The generated function snaps a full-page screenshot, and makes sure
 * no content is clipped — as could otherwise be the case with the current version
 * (as of 2022-08, at least) of the Hanna CSS,
 * which sets `overflow-y:scroll; height:100%;` on `<body/>`.
 */
export const makeSnapPageScreeshot = (
  page: Page,
  testName: string
): TestFnArgs['pageScreenshot'] & { callCount(): number } => {
  let snaps = 0;
  const snapPageScreenShot = async (label: string, opts?: PageScreenshotOptions) => {
    snaps += 1;

    await expandViewport(page);

    await expect(page).toHaveScreenshot(toFileName(testName, label), {
      fullPage: true,
      ...opts,
    });
  };
  snapPageScreenShot.callCount = () => snaps;

  return snapPageScreenShot;
};
