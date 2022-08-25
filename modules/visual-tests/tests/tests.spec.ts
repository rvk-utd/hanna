import { expect, test } from '@playwright/test';
import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';
import { compareKeys } from 'hanna-test-helpers';

import type { TestFnArgs, TestingInfo } from '../src/testingInfo';
import { getTestListSync } from '../src/utils/tests.server';

import {
  makeSnapLocalScreeshot,
  makeSnapPageScreeshot,
  NAME_SPLIT,
  TAG_PREFIX,
} from './helpers/screeshots';

// ---------------------------------------------------------------------------

/**
 * An auto-built list of test pages contained in `src/routes/test/**`
 */
const testPagePaths = ObjectFromEntries(
  getTestListSync().map(({ label, path }) => [label, path])
);

type TestPageLabel = keyof typeof testPagePaths;

// ---------------------------------------------------------------------------

/* eslint-disable import/first */
import { testing as AccordionList__test } from '../src/routes/test/AccordionList';
import { testing as Alert__test } from '../src/routes/test/Alert';
import { testing as FooterInfo__test } from '../src/routes/test/FooterInfo';
import { testing as HeroBlock__test } from '../src/routes/test/HeroBlock';
import { testing as TagPill__test } from '../src/routes/test/TagPill';
/* eslint-enable import/first */

/**
 * Manually maintained list of test pages and their exported `testing`
 * info — which may contain some tweaks to the test, or additional
 * more detailed tests.
 */
const testingInfos: Record<TestPageLabel, TestingInfo> = {
  // NOTE: You must manually import and add new TestingInfo objects
  // to this record, and the keys must match up with those of `testPagePaths`.
  // BTW, the "All tests are accounted for" @meta test (below) errors if
  // you forgot something.
  AccordionList: AccordionList__test,
  Alert: Alert__test,
  FooterInfo: FooterInfo__test,
  HeroBlock: HeroBlock__test,
  TagPill: TagPill__test,
};
// ---------------------------------------------------------------------------

const normalizeTestInfos = (tests: Record<string, TestingInfo>) =>
  ObjectEntries(tests).flatMap(([name, testInfo]) => {
    if (!Array.isArray(testInfo)) {
      testInfo = [testInfo];
    }
    return testInfo.map((testInfo, i) => {
      const { label, tags } = testInfo;
      if (i > 0 && !label) {
        testInfo.label = String(i + 1);
      }
      testInfo.tags = tags || [];

      return [name, testInfo] as const;
    });
  });

// ---------------------------------------------------------------------------

test(`All tests are accounted for ${TAG_PREFIX}meta`, () => {
  const { missing, unexpected } = compareKeys(testingInfos, testPagePaths);
  missing.forEach((token) => expect(null).toBe(token));
  unexpected.forEach((token) => expect(token).toBe(undefined));
});

const allComponentTests = normalizeTestInfos(testingInfos);

allComponentTests.forEach(([name, testInfo]) => {
  const testName = name + (testInfo.label ? NAME_SPLIT + testInfo.label : '');
  const tagStr = testInfo.tags?.length ? TAG_PREFIX + testInfo.tags.join(TAG_PREFIX) : '';

  test(
    testName + tagStr + '-',
    async ({ page, context, browserName, isMobile, hasTouch }) => {
      const pageScreenshot = makeSnapPageScreeshot(page, testName);
      const localScreenshot = makeSnapLocalScreeshot(page, testName);

      const args: TestFnArgs = {
        page,
        context,
        browserName,
        isMobile,
        hasTouch,
        expect,
        localScreenshot,

        pageScreenshot,
      };

      await page.goto(testPagePaths[name] || '/');

      if (testInfo.prep) {
        await testInfo.prep(args);
      }
      if (pageScreenshot.callCount() === 0 && !testInfo.skipScreenshot) {
        await pageScreenshot('');
      }
      if (testInfo.extras) {
        await testInfo.extras(args);
      }
    }
  );
});
