import './initHannaNamespace.js';

import addSeenEffect from './utils/addSeenEffect.js';

const noop = () => undefined;

const legacySelectors = [
  // empty item to add a joiner before the first selector.
  '',
  // block-level components
  'AccordionList',
  'ActionCards',
  'ArticleCarousel',
  'CityBlock',
  'ExtraLinks',
  'FeatureList',
  'Gallery',
  'GridBlocks',
  'HeroBlock',
  'ImageCards',
  'InfoBlock',
  'IslandBlock',
  'IslandPageBlock',
  'LabeledTextBlock',
  'NewsHero',
  'PageFilter',
  'RowBlock',
  'ContentArticle',

  // low-level ??
  'TableWrapper--BasicTable',
  'PageHeading',
  'SubHeading',
  'TextBlock',
  'Tabs',
].join(', .');

window.Hanna.makeSprinkle({
  name: 'SeenEffects',
  selector: '[data-seen-effect]' + legacySelectors,
  dataAttr: addSeenEffect.DATA_ATTR_NAME,

  init: (component: HTMLElement) => addSeenEffect(component) || noop,

  unmount: (elm, unobserve) => {
    unobserve();
  },
});
