import { expect, test } from '@playwright/test';
import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';
import { compareKeys } from 'hanna-test-helpers';

import type {
  ProjectName,
  TestFnArgs,
  TestInfoObj,
  TestingInfo,
  TestTag,
} from '../src/testingInfo';
import { getTestListSync } from '../src/utils/tests.server';

import {
  expandViewport,
  makeSnapLocalScreeshot,
  makeSnapPageScreeshot,
  NAME_SPLIT,
  TAG_PREFIX,
} from './helpers/screeshots';

const expectSoft = expect.soft;

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
import { testing as ArticleCarousel__test } from '../src/routes/test/ArticleCarousel';
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
  ArticleCarousel: ArticleCarousel__test,
  FooterInfo: FooterInfo__test,
  HeroBlock: HeroBlock__test,
  TagPill: TagPill__test,
};
// ---------------------------------------------------------------------------

const DEFAULT_TAGS: Array<TestTag> = ['firefox', 'ipad', 'iphone'];

type NormalizedTestInfoObj = Omit<TestInfoObj, 'skipTags' | 'addTags'>;

const normalizeTestInfos = (tests: Record<string, TestingInfo>) =>
  ObjectEntries(tests).flatMap(([name, testInfo]) => {
    if (!Array.isArray(testInfo)) {
      testInfo = [testInfo];
    }
    return testInfo.map((testInfo, i) => {
      const { label, skipTags, addTags } = testInfo;
      if (i > 0 && !label) {
        testInfo.label = String(i + 1);
      }
      let tags = testInfo.tags || DEFAULT_TAGS;
      if (skipTags) {
        tags = tags.filter((tag) => !skipTags.includes(tag));
      }
      if (addTags) {
        tags = tags.concat(addTags.filter((tag) => !tags.includes(tag)));
      }
      testInfo.tags = tags;
      return [name, testInfo as NormalizedTestInfoObj] as const;
    });
  });

// ---------------------------------------------------------------------------

test(`All tests are accounted for ${TAG_PREFIX}meta`, () => {
  const { missing, unexpected } = compareKeys(testingInfos, testPagePaths);
  missing.forEach((token) => expectSoft(null).toBe(token));
  unexpected.forEach((token) => expectSoft(token).toBe(undefined));
});

const allComponentTests = normalizeTestInfos(testingInfos);

allComponentTests.forEach(([name, testInfo]) => {
  const testName = name + (testInfo.label ? NAME_SPLIT + testInfo.label : '');
  const tagStr = testInfo.tags?.length ? TAG_PREFIX + testInfo.tags.join(TAG_PREFIX) : '';

  const testPagePath = testPagePaths[name];
  if (!testPagePath) {
    console.info(`Skipping test for 'name' as it has no \`testPagePath\` defined`);
    return;
  }

  test(
    testName + tagStr + '-',
    async ({ page, context, browserName, isMobile, hasTouch }, { project }) => {
      const pageScreenshot = makeSnapPageScreeshot(page, testName);
      const localScreenshot = makeSnapLocalScreeshot(page, testName);

      const args: TestFnArgs = {
        page,
        context,
        browserName,
        isMobile,
        hasTouch,
        expect: expect.soft,
        project: project.name as ProjectName,
        localScreenshot,
        expandViewport: () => expandViewport(page),

        pageScreenshot,
      };

      await page.goto(testPagePath + '?noAnimation');

      if (testInfo.prep) {
        await expandViewport(page);
        await testInfo.prep(args);
      }

      if (testInfo.skipScreenshot) {
        await expandViewport(page);
      } else if (pageScreenshot.callCount() === 0) {
        await pageScreenshot('');
      }

      if (testInfo.extras) {
        await testInfo.extras(args);
      }
    }
  );
});
