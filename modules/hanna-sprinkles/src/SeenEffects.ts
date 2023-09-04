import './initHannaNamespace.js';

import addSeenEffect from './utils/addSeenEffect.js';

const noop = () => undefined;

// Check if the `-legacy-AutoSeenEffects` CSS module token is loaded
const hasLegacyEffectsCSS = !!document.querySelector(
  'link[rel="stylesheet"][href*="/bundle/"][href*="-legacy-AutoSeenEffects"]'
);

// ..and only then apply seen-effect to elements matching the legacy selectors.
const legacySelectors: string = !hasLegacyEffectsCSS
  ? ''
  : ',' +
    [
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
