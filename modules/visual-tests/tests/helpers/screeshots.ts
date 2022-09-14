import type { Page, PageScreenshotOptions } from '@playwright/test';
import { expect } from '@playwright/test';

import type { TestFnArgs } from '../../src/test-helpers/testingInfo';

import { expandViewport } from './viewport';

// NOTE: using greek letter "ι" to make a stable splitter ("-ι-")
// between different portions of the screenshot filename, because
// PlayWright's (mostly unducoumented, it seems) file-name normalization
// is quite aggressive towards double-dashes, underscores, and other
// non-alphabetical characters.
export const NAME_SPLIT = '-ι-';
export const LABEL_SPLIT = '-ιι-';

export const TAG_PREFIX = ' 🏷';

const expectSoft = expect.soft;

// ---------------------------------------------------------------------------

const toFileName = (testName: string, label: string) =>
  `${testName}${label && LABEL_SPLIT + label}${NAME_SPLIT}.png`;

// ---------------------------------------------------------------------------

const DEFAULT_MARGIN = 15;

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
    const marginOpt = (opts || {}).margin || 0;
    const margin = Math.max(0, marginOpt === true ? DEFAULT_MARGIN : marginOpt);
    if (marginOpt && margin) {
      // const rect = await locator.evaluate((elm) => elm.getBoundingClientRect());
      // const x = Math.max(0, rect.x - margin);
      // const y = Math.max(0, rect.y - margin);
      // const viewport = page.viewportSize() || { width: 0, height: 0 };
      // const width = Math.min(rect.width + Math.min(x, margin) + margin, viewport.width);
      // const height = Math.min(
      //   rect.height + Math.min(y, margin) + margin,
      //   viewport.height
      // );
      // return expectSoft(page).toHaveScreenshot(toFileName(testName, label), {
      //   ...opts,
      //   clip: { x, y, width, height },
      // });
      const rect = await locator.evaluate((elm) => elm.getBoundingClientRect());
      return expectSoft(page).toHaveScreenshot(toFileName(testName, label), {
        ...opts,
        clip: {
          x: rect.x - margin,
          y: rect.y - margin,
          width: rect.width + 2 * margin,
          height: rect.height + 2 * margin,
        },
      });
    }
    return expectSoft(locator).toHaveScreenshot(toFileName(testName, label), opts);
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
  testName: string,
  factoryOpts: { clipViewport?: boolean } = {}
): TestFnArgs['pageScreenshot'] & { callCount(): number } => {
  let snaps = 0;
  const snapPageScreenShot = async (
    label: string,
    opts?: PageScreenshotOptions & { clipViewport?: boolean }
  ) => {
    snaps += 1;

    await expandViewport(page)();

    const clipViewport =
      ((opts && opts.clipViewport) ?? factoryOpts.clipViewport) || undefined;

    await expectSoft(page).toHaveScreenshot(toFileName(testName, label), {
      fullPage: true,
      // `Bling`s and a few other components willfully expand outside the viewport
      // and we don't want those to
      clip: clipViewport && { x: 0, y: 0, ...page.viewportSize()! },
      ...opts,
    });
  };
  snapPageScreenShot.callCount = () => snaps;

  return snapPageScreenShot;
};
