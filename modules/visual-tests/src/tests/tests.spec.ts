import { expect, Locator, test } from '@playwright/test';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { compareKeys } from 'hanna-test-helpers';

import type {
  ProjectMediaFormat,
  ProjectName,
  TestFnArgs,
  TestInfoObj,
  TestingInfo,
  TestTag,
} from '../test-helpers/testingInfo.js';
import { getTestListSync } from '../utils/tests.server.js';

import {
  makeSnapLocalScreeshot,
  makeSnapPageScreeshot,
  NAME_SPLIT,
  TAG_PREFIX,
  TAG_SUFFIX,
} from './helpers/screenshots.js';
import {
  expandViewport as _expandViewport,
  setViewportSize as _setViewportSize,
} from './helpers/viewport.js';

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
import { testing as AccordionList__test } from '../routes/test/AccordionList.js';
import { testing as ActionCards__test } from '../routes/test/ActionCards.js';
import { testing as Alert__test } from '../routes/test/Alert.js';
import { testing as ArticleCards__test } from '../routes/test/ArticleCards.js';
import { testing as ArticleCarousel__test } from '../routes/test/ArticleCarousel.js';
import { testing as ArticleMeta__test } from '../routes/test/ArticleMeta.js';
import { testing as Attention__test } from '../routes/test/Attention.js';
import { testing as BasicTable__test } from '../routes/test/BasicTable.js';
import { testing as BgBox__test } from '../routes/test/BgBox.js';
import { testing as Bling__test } from '../routes/test/Bling.js';
import { testing as BlockQuote__test } from '../routes/test/BlockQuote.js';
import { testing as BreadCrumbs__test } from '../routes/test/BreadCrumbs.js';
import { testing as ButtonBack__test } from '../routes/test/ButtonBack.js';
import { testing as ButtonBar__test } from '../routes/test/ButtonBar.js';
import { testing as Buttons__test } from '../routes/test/Buttons.js';
import { testing as Carousel__test } from '../routes/test/Carousel.js';
import { testing as CenterColumn__test } from '../routes/test/CenterColumn.js';
import { testing as CheckboxAndRadio__test } from '../routes/test/CheckboxAndRadio.js';
import { testing as CheckboxButton__test } from '../routes/test/CheckboxButton.js';
import { testing as CheckboxButtonsGroup__test } from '../routes/test/CheckboxButtonsGroup.js';
import { testing as CheckboxGroup__test } from '../routes/test/CheckboxGroup.js';
import { testing as CityBlock__test } from '../routes/test/CityBlock.js';
import { testing as ContactBubble__test } from '../routes/test/ContactBubble.js';
import { testing as ContentArticle__test } from '../routes/test/ContentArticle.js';
import { testing as ContentImage__test } from '../routes/test/ContentImage.js';
import { testing as Datepicker__test } from '../routes/test/Datepicker.js';
import { testing as ExtraLinks__test } from '../routes/test/ExtraLinks.js';
import { testing as FeatureList__test } from '../routes/test/FeatureList.js';
import { testing as FieldGroup__test } from '../routes/test/FieldGroup.js';
import { testing as FileInput__test } from '../routes/test/FileInput.js';
import { testing as FooterBadges__test } from '../routes/test/FooterBadges.js';
import { testing as FooterInfo__test } from '../routes/test/FooterInfo.js';
import { testing as Footnote__test } from '../routes/test/Footnote.js';
import { testing as Form__test } from '../routes/test/Form.js';
import { testing as Gallery__test } from '../routes/test/Gallery.js';
import { testing as GridBlocks__test } from '../routes/test/GridBlocks.js';
import { testing as Heading__test } from '../routes/test/Heading.js';
import { testing as HeroBlock__test } from '../routes/test/HeroBlock.js';
import { testing as IframeBlock__test } from '../routes/test/IframeBlock.js';
import { testing as ImageCards__test } from '../routes/test/ImageCards.js';
import { testing as InfoBlock__test } from '../routes/test/InfoBlock.js';
import { testing as InfoHero__test } from '../routes/test/InfoHero.js';
import { testing as IslandBlock__test } from '../routes/test/IslandBlock.js';
import { testing as IslandPageBlock__test } from '../routes/test/IslandPageBlock.js';
import { testing as LabeledTextBlock__test } from '../routes/test/LabeledTextBlock.js';
import { testing as Layout__test } from '../routes/test/Layout.js';
import { testing as MainMenu__test } from '../routes/test/MainMenu.js';
import { testing as MiniMetrics__test } from '../routes/test/MiniMetrics.js';
import { testing as Modal__test } from '../routes/test/Modal.js';
import { testing as Multiselect__test } from '../routes/test/Multiselect.js';
import { testing as NameCards__test } from '../routes/test/NameCards.js';
import { testing as NewsHero__test } from '../routes/test/NewsHero.js';
import { testing as PageFilter__test } from '../routes/test/PageFilter.js';
import { testing as PageHeading__test } from '../routes/test/PageHeading.js';
import { testing as Pagination__test } from '../routes/test/Pagination.js';
import { testing as Picture__test } from '../routes/test/Picture.js';
import { testing as ProcessOverview__test } from '../routes/test/ProcessOverview.js';
import { testing as PullQuote__test } from '../routes/test/PullQuote.js';
import { testing as RadioButtonsGroup__test } from '../routes/test/RadioButtonsGroup.js';
import { testing as RadioGroup__test } from '../routes/test/RadioGroup.js';
import { testing as ReadSpeakerPlayer__test } from '../routes/test/ReadSpeakerPlayer.js';
import { testing as RelatedLinks__test } from '../routes/test/RelatedLinks.js';
import { testing as RowBlock__test } from '../routes/test/RowBlock.js';
import { testing as SearchHeroParagraph__test } from '../routes/test/SearchHeroParagraph.js';
import { testing as SearchInput__test } from '../routes/test/SearchInput.js';
import { testing as SearchResults__test } from '../routes/test/SearchResults.js';
import { testing as Selectbox__test } from '../routes/test/Selectbox.js';
import { testing as ShareButtons__test } from '../routes/test/ShareButtons.js';
import { testing as SiteSearchAutocomplete__test } from '../routes/test/SiteSearchAutocomplete.js';
import { testing as Skeleton__test } from '../routes/test/Skeleton.js';
import { testing as SubHeading__test } from '../routes/test/SubHeading.js';
import { testing as Tabs__test } from '../routes/test/Tabs.js';
import { testing as TagPill__test } from '../routes/test/TagPill.js';
import { testing as TextBlock__test } from '../routes/test/TextBlock.js';
import { testing as TextButton__test } from '../routes/test/TextButton.js';
import { testing as TextInput__test } from '../routes/test/TextInput.js';
import { testing as Tooltip__test } from '../routes/test/Tooltip.js';
import { testing as VSpacer__test } from '../routes/test/VSpacer.js';
import { testing as WizardLayout__test } from '../routes/test/WizardLayout.js';
import { testing as WizardStepper__test } from '../routes/test/WizardStepper.js';

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
  Bling: Bling__test,
  BlockQuote: BlockQuote__test,
  BreadCrumbs: BreadCrumbs__test,
  ButtonBack: ButtonBack__test,
  ButtonBar: ButtonBar__test,
  Buttons: Buttons__test,
  Carousel: Carousel__test,
  CenterColumn: CenterColumn__test,
  CheckboxAndRadio: CheckboxAndRadio__test,
  CheckboxButton: CheckboxButton__test,
  CheckboxButtonsGroup: CheckboxButtonsGroup__test,
  CheckboxGroup: CheckboxGroup__test,
  CityBlock: CityBlock__test,
  ContactBubble: ContactBubble__test,
  ContentArticle: ContentArticle__test,
  ContentImage: ContentImage__test,
  Datepicker: Datepicker__test,
  ExtraLinks: ExtraLinks__test,
  FeatureList: FeatureList__test,
  FieldGroup: FieldGroup__test,
  FileInput: FileInput__test,
  FooterBadges: FooterBadges__test,
  FooterInfo: FooterInfo__test,
  Footnote: Footnote__test,
  Form: Form__test,
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
  Layout: Layout__test,
  MainMenu: MainMenu__test,
  MiniMetrics: MiniMetrics__test,
  Multiselect: Multiselect__test,
  Modal: Modal__test,
  NameCards: NameCards__test,
  NewsHero: NewsHero__test,
  PageFilter: PageFilter__test,
  PageHeading: PageHeading__test,
  Pagination: Pagination__test,
  Picture: Picture__test,
  ProcessOverview: ProcessOverview__test,
  PullQuote: PullQuote__test,
  RadioButtonsGroup: RadioButtonsGroup__test,
  RadioGroup: RadioGroup__test,
  ReadSpeakerPlayer: ReadSpeakerPlayer__test,
  RelatedLinks: RelatedLinks__test,
  RowBlock: RowBlock__test,
  SearchHeroParagraph: SearchHeroParagraph__test,
  SearchInput: SearchInput__test,
  SearchResults: SearchResults__test,
  Selectbox: Selectbox__test,
  ShareButtons: ShareButtons__test,
  SiteSearchAutocomplete: SiteSearchAutocomplete__test,
  Skeleton: Skeleton__test,
  SubHeading: SubHeading__test,
  Tabs: Tabs__test,
  TagPill: TagPill__test,
  TextBlock: TextBlock__test,
  TextButton: TextButton__test,
  TextInput: TextInput__test,
  Tooltip: Tooltip__test,
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
  expectSoft(null).toBe(false);
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
      const mediaFormat = (format: ProjectMediaFormat) =>
        project.name.endsWith(`-${format}`);
      const dumbHover = async (locator: Locator) => {
        const { x, y, width, height } = (await locator.boundingBox())!;
        await page.mouse.move(x + width / 2, y + height / 2);
      };

      const args: TestFnArgs = {
        page,
        context,
        browserName,
        isMobile,
        hasTouch,
        expect: expect.soft,
        project: project.name as ProjectName,
        mediaFormat,
        dumbHover,
        localScreenshot,
        pageScreenshot,
        expandViewport,
        setViewportSize,
      };

      await page.goto(testPagePath + '?noAnimation');

      // HACK: Wait for Remix's <Script/> hydration to finish
      await page.locator('html[style^="--browser-scrollbar-width"]').waitFor();

      const { initialHover, waitFor, prep } = testInfo;
      let expanded = false;
      if (prep) {
        expanded = true;
        await expandViewport();
        await prep(args);
      } else if (initialHover || waitFor) {
        expanded = true;
        await expandViewport();
        const [waitSelector, waitState] =
          typeof waitFor === 'string' ? [waitFor] : waitFor || [];
        waitSelector &&
          (await page
            .locator(`${waitSelector} >> nth=0`)
            .waitFor({ state: waitState || 'attached' }));
        initialHover && (await page.locator(initialHover).hover());
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
