import { expect, test } from '@playwright/test';
import { ObjectEntries } from '@reykjavik/hanna-utils';
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
  TAG_SUFFIX,
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
const testPagePaths = Object.fromEntries(
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
import { testing as BreadCrumbs__test } from '../src/routes/test/BreadCrumbs';
import { testing as ButtonBack__test } from '../src/routes/test/ButtonBack';
import { testing as ButtonBar__test } from '../src/routes/test/ButtonBar';
import { testing as Buttons__test } from '../src/routes/test/Buttons';
import { testing as Carousel__test } from '../src/routes/test/Carousel';
import { testing as CenterColumn__test } from '../src/routes/test/CenterColumn';
import { testing as CheckboxAndRadio__test } from '../src/routes/test/CheckboxAndRadio';
import { testing as CheckboxButtonsGroup__test } from '../src/routes/test/CheckboxButtonsGroup';
import { testing as CheckboxGroup__test } from '../src/routes/test/CheckboxGroup';
import { testing as CityBlock__test } from '../src/routes/test/CityBlock';
import { testing as ContactBubble__test } from '../src/routes/test/ContactBubble';
import { testing as ContentArticle__test } from '../src/routes/test/ContentArticle';
import { testing as ContentImage__test } from '../src/routes/test/ContentImage';
import { testing as Datepicker__test } from '../src/routes/test/Datepicker';
import { testing as ExtraLinks__test } from '../src/routes/test/ExtraLinks';
import { testing as FeatureList__test } from '../src/routes/test/FeatureList';
import { testing as FileInput__test } from '../src/routes/test/FileInput';
import { testing as FooterBadges__test } from '../src/routes/test/FooterBadges';
import { testing as FooterInfo__test } from '../src/routes/test/FooterInfo';
import { testing as Footnote__test } from '../src/routes/test/Footnote';
import { testing as Gallery__test } from '../src/routes/test/Gallery';
import { testing as GridBlocks__test } from '../src/routes/test/GridBlocks';
import { testing as Heading__test } from '../src/routes/test/Heading';
import { testing as HeroBlock__test } from '../src/routes/test/HeroBlock';
import { testing as IframeBlock__test } from '../src/routes/test/IframeBlock';
import { testing as ImageCards__test } from '../src/routes/test/ImageCards';
import { testing as InfoBlock__test } from '../src/routes/test/InfoBlock';
import { testing as InfoHero__test } from '../src/routes/test/InfoHero';
import { testing as IslandBlock__test } from '../src/routes/test/IslandBlock';
import { testing as IslandPageBlock__test } from '../src/routes/test/IslandPageBlock';
import { testing as LabeledTextBlock__test } from '../src/routes/test/LabeledTextBlock';
import { testing as MainMenu__test } from '../src/routes/test/MainMenu';
import { testing as MiniMetrics__test } from '../src/routes/test/MiniMetrics';
import { testing as Modal__test } from '../src/routes/test/Modal';
import { testing as NameCards__test } from '../src/routes/test/NameCards';
import { testing as NewsHero__test } from '../src/routes/test/NewsHero';
import { testing as PageFilter__test } from '../src/routes/test/PageFilter';
import { testing as PageHeading__test } from '../src/routes/test/PageHeading';
import { testing as ProcessOverview__test } from '../src/routes/test/ProcessOverview';
import { testing as PullQuote__test } from '../src/routes/test/PullQuote';
import { testing as RadioButtonsGroup__test } from '../src/routes/test/RadioButtonsGroup';
import { testing as RadioGroup__test } from '../src/routes/test/RadioGroup';
import { testing as RelatedLinks__test } from '../src/routes/test/RelatedLinks';
import { testing as RowBlock__test } from '../src/routes/test/RowBlock';
import { testing as SearchHeroParagraph__test } from '../src/routes/test/SearchHeroParagraph';
import { testing as SearchResults__test } from '../src/routes/test/SearchResults';
import { testing as Selectbox__test } from '../src/routes/test/Selectbox';
import { testing as ShareButtons__test } from '../src/routes/test/ShareButtons';
import { testing as SiteSearchAutocomplete__test } from '../src/routes/test/SiteSearchAutocomplete';
import { testing as Skeleton__test } from '../src/routes/test/Skeleton';
import { testing as SubHeading__test } from '../src/routes/test/SubHeading';
import { testing as Tabs__test } from '../src/routes/test/Tabs';
import { testing as TagPill__test } from '../src/routes/test/TagPill';
import { testing as TextBlock__test } from '../src/routes/test/TextBlock';
import { testing as TextInput__test } from '../src/routes/test/TextInput';
import { testing as VSpacer__test } from '../src/routes/test/VSpacer';
import { testing as WizardLayout__test } from '../src/routes/test/WizardLayout';
import { testing as WizardStepper__test } from '../src/routes/test/WizardStepper';

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
  BreadCrumbs: BreadCrumbs__test,
  ButtonBack: ButtonBack__test,
  ButtonBar: ButtonBar__test,
  Buttons: Buttons__test,
  Carousel: Carousel__test,
  CenterColumn: CenterColumn__test,
  CheckboxAndRadio: CheckboxAndRadio__test,
  CheckboxButtonsGroup: CheckboxButtonsGroup__test,
  CheckboxGroup: CheckboxGroup__test,
  CityBlock: CityBlock__test,
  ContactBubble: ContactBubble__test,
  ContentArticle: ContentArticle__test,
  ContentImage: ContentImage__test,
  Datepicker: Datepicker__test,
  ExtraLinks: ExtraLinks__test,
  FeatureList: FeatureList__test,
  FileInput: FileInput__test,
  FooterBadges: FooterBadges__test,
  FooterInfo: FooterInfo__test,
  Footnote: Footnote__test,
  Gallery: Gallery__test,
  GridBlocks: GridBlocks__test,
  Heading: Heading__test,
  HeroBlock: HeroBlock__test,
  IframeBlock: IframeBlock__test,
  ImageCards: ImageCards__test,
  InfoBlock: InfoBlock__test,
  InfoHero: InfoHero__test,
  IslandBlock: IslandBlock__test,
  IslandPageBlock: IslandPageBlock__test,
  LabeledTextBlock: LabeledTextBlock__test,
  MainMenu: MainMenu__test,
  MiniMetrics: MiniMetrics__test,
  Modal: Modal__test,
  NameCards: NameCards__test,
  NewsHero: NewsHero__test,
  PageFilter: PageFilter__test,
  PageHeading: PageHeading__test,
  ProcessOverview: ProcessOverview__test,
  PullQuote: PullQuote__test,
  RadioButtonsGroup: RadioButtonsGroup__test,
  RadioGroup: RadioGroup__test,
  RelatedLinks: RelatedLinks__test,
  RowBlock: RowBlock__test,
  SearchHeroParagraph: SearchHeroParagraph__test,
  SearchResults: SearchResults__test,
  Selectbox: Selectbox__test,
  ShareButtons: ShareButtons__test,
  SiteSearchAutocomplete: SiteSearchAutocomplete__test,
  Skeleton: Skeleton__test,
  SubHeading: SubHeading__test,
  Tabs: Tabs__test,
  TagPill: TagPill__test,
  TextBlock: TextBlock__test,
  TextInput: TextInput__test,
  VSpacer: VSpacer__test,
  WizardLayout: WizardLayout__test,
  WizardStepper: WizardStepper__test,
};
// ---------------------------------------------------------------------------

const DEFAULT_TAGS: Array<TestTag> = ['firefox'];

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
  const tagStr = testInfo.tags?.length
    ? TAG_PREFIX + testInfo.tags.join(TAG_SUFFIX + TAG_PREFIX) + TAG_SUFFIX
    : '';

  const testPagePath = testPagePaths[name];
  if (!testPagePath) {
    console.info(`Skipping test for 'name' as it has no \`testPagePath\` defined`);
    return;
  }

  const testFn = testInfo.__DEV_FOCUS__ ? test.only : test;

  testFn(
    testName + tagStr + '-',
    async ({ page, context, browserName, isMobile, hasTouch }, { project }) => {
      const pageScreenshot = makeSnapPageScreeshot(page, testName, testInfo);
      const localScreenshot = makeSnapLocalScreeshot(page, testName);
      const expandViewport = _expandViewport(page, testInfo.viewportMinHeight);
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
