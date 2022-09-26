import { expect, test } from '@playwright/test';
import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';
import { compareKeys } from 'hanna-test-helpers';

import type {
  ProjectName,
  TestFnArgs,
  TestInfoObj,
  TestingInfo,
  TestTag,
} from '../src/test-helpers/testingInfo';
import { getTestListSync } from '../src/utils/tests.server';

import {
  makeSnapLocalScreeshot,
  makeSnapPageScreeshot,
  NAME_SPLIT,
  TAG_PREFIX,
} from './helpers/screeshots';
import {
  expandViewport as _expandViewport,
  setViewportSize as _setViewportSize,
} from './helpers/viewport';

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
import { testing as ActionCards__test } from '../src/routes/test/ActionCards';
import { testing as Alert__test } from '../src/routes/test/Alert';
import { testing as ArticleCards__test } from '../src/routes/test/ArticleCards';
import { testing as ArticleCarousel__test } from '../src/routes/test/ArticleCarousel';
import { testing as ArticleMeta__test } from '../src/routes/test/ArticleMeta';
import { testing as Attention__test } from '../src/routes/test/Attention';
import { testing as BasicTable__test } from '../src/routes/test/BasicTable';
import { testing as BgBox__test } from '../src/routes/test/BgBox';
import { testing as BlockQuote__test } from '../src/routes/test/BlockQuote';
import { testing as ButtonBack__test } from '../src/routes/test/ButtonBack';
import { testing as ButtonBar__test } from '../src/routes/test/ButtonBar';
import { testing as Buttons__test } from '../src/routes/test/Buttons';
import { testing as Carousel__test } from '../src/routes/test/Carousel';
import { testing as CityBlock__test } from '../src/routes/test/CityBlock';
import { testing as ContactBubble__test } from '../src/routes/test/ContactBubble';
import { testing as ContentArticle__test } from '../src/routes/test/ContentArticle';
import { testing as ContentImage__test } from '../src/routes/test/ContentImage';
import { testing as ExtraLinks__test } from '../src/routes/test/ExtraLinks';
import { testing as FeatureList__test } from '../src/routes/test/FeatureList';
import { testing as FooterInfo__test } from '../src/routes/test/FooterInfo';
import { testing as Gallery__test } from '../src/routes/test/Gallery';
import { testing as GridBlocks__test } from '../src/routes/test/GridBlocks';
import { testing as HeroBlock__test } from '../src/routes/test/HeroBlock';
import { testing as ImageCards__test } from '../src/routes/test/ImageCards';
import { testing as InfoBlock__test } from '../src/routes/test/InfoBlock';
import { testing as InfoHero__test } from '../src/routes/test/InfoHero';
import { testing as IslandBlock__test } from '../src/routes/test/IslandBlock';
import { testing as MainMenu__test } from '../src/routes/test/MainMenu';
import { testing as MiniMetrics__test } from '../src/routes/test/MiniMetrics';
import { testing as NameCards__test } from '../src/routes/test/NameCards';
import { testing as NewsHero__test } from '../src/routes/test/NewsHero';
import { testing as ProcessOverview__test } from '../src/routes/test/ProcessOverview';
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
  ActionCards: ActionCards__test,
  Alert: Alert__test,
  ArticleCards: ArticleCards__test,
  ArticleCarousel: ArticleCarousel__test,
  ArticleMeta: ArticleMeta__test,
  Attention: Attention__test,
  BasicTable: BasicTable__test,
  BgBox: BgBox__test,
  BlockQuote: BlockQuote__test,
  ButtonBack: ButtonBack__test,
  ButtonBar: ButtonBar__test,
  Buttons: Buttons__test,
  Carousel: Carousel__test,
  ContentArticle: ContentArticle__test,
  ContentImage: ContentImage__test,
  CityBlock: CityBlock__test,
  ContactBubble: ContactBubble__test,
  ExtraLinks: ExtraLinks__test,
  FeatureList: FeatureList__test,
  FooterInfo: FooterInfo__test,
  Gallery: Gallery__test,
  GridBlocks: GridBlocks__test,
  HeroBlock: HeroBlock__test,
  ImageCards: ImageCards__test,
  InfoBlock: InfoBlock__test,
  InfoHero: InfoHero__test,
  IslandBlock: IslandBlock__test,
  MainMenu: MainMenu__test,
  MiniMetrics: MiniMetrics__test,
  NameCards: NameCards__test,
  NewsHero: NewsHero__test,
  ProcessOverview: ProcessOverview__test,
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

  const testFn = testInfo.__DEV_FOCUS__ ? test.only : test;

  testFn(
    testName + tagStr + '-',
    async ({ page, context, browserName, isMobile, hasTouch }, { project }) => {
      const pageScreenshot = makeSnapPageScreeshot(page, testName, {
        clipViewport: testInfo.clipViewport,
      });
      const localScreenshot = makeSnapLocalScreeshot(page, testName);
      const expandViewport = _expandViewport(page);
      const setViewportSize = _setViewportSize(page);

      const args: TestFnArgs = {
        page,
        context,
        browserName,
        isMobile,
        hasTouch,
        expect: expect.soft,
        project: project.name as ProjectName,
        localScreenshot,
        pageScreenshot,
        expandViewport,
        setViewportSize,
      };

      await page.goto(testPagePath + '?noAnimation');

      let expanded = false;
      if (testInfo.prep) {
        expanded = true;
        await expandViewport();
        await testInfo.prep(args);
      } else if (testInfo.initialHover) {
        expanded = true;
        await expandViewport();
        await page.locator(testInfo.initialHover).hover();
      }

      if (testInfo.skipScreenshot) {
        if (!expanded) {
          await expandViewport();
        }
      } else if (pageScreenshot.callCount() === 0) {
        await pageScreenshot('');
      }

      if (testInfo.extras) {
        await testInfo.extras(args);
      }
    }
  );
});
