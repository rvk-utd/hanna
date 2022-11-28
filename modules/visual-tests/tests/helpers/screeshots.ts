import type { Page } from '@playwright/test';
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

export const TAG_PREFIX = ' ¶';
export const TAG_SUFFIX = '⁋';

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
          elm.id = 'foo' + Date.now() + String(Math.random()).slice(2);
        }
        return elm.id;
      });
      locator = page.locator('#' + id);
    }

    const marginOpt = (opts || {}).margin;
    if (marginOpt) {
      let margins: [number, number] = [0, 0];

      if (marginOpt === 'fullwidth') {
        margins = [0, 10000];
      } else if (marginOpt === true) {
        margins = [DEFAULT_MARGIN, DEFAULT_MARGIN];
      } else if (typeof marginOpt === 'number') {
        margins = [marginOpt, marginOpt];
      } else {
        margins = marginOpt;
      }
      const [marginV, marginH] = margins;
      const rect = await locator.evaluate((elm) => elm.getBoundingClientRect());
      return expectSoft(page).toHaveScreenshot(toFileName(testName, label), {
        ...opts,
        clip: {
          x: rect.x - marginH,
          y: rect.y - marginV,
          width: rect.width + 2 * marginH,
          height: rect.height + 2 * marginV,
        },
      });
    }

    return expectSoft(locator).toHaveScreenshot(toFileName(testName, label), opts);
  };

// ---------------------------------------------------------------------------

type Opts = { clipViewport?: boolean; viewportMinHeight?: number };

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
  factoryOpts: Opts = {}
) => {
  let snaps = 0;
  const snapPageScreenShot: TestFnArgs['pageScreenshot'] & {
    callCount(): number;
  } = async (label, opts = {}) => {
    snaps += 1;

    await expandViewport(page)(
      opts.viewportMinHeight || factoryOpts.viewportMinHeight,
      opts.customScrollElement
    );

    const clipViewport = (opts.clipViewport ?? factoryOpts.clipViewport) || undefined;

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
