import './_/initHannaNamespace.js';

import addSeenEffect, {
  autoSeenEffectPrepare,
  hasLegacySeenEffectsCSS,
} from './_/addSeenEffect.js';

const noop = () => undefined;

// ..and only then apply seen-effect to elements matching the legacy selectors.
const legacySelectors: string = !hasLegacySeenEffectsCSS
  ? ''
  : `, .${[
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
    ].join(', .')}`;

window.Hanna.makeSprinkle({
  name: 'SeenEffects',
  selector: `[data-seen-effect]${legacySelectors}`,
  dataAttr: addSeenEffect.DATA_ATTR_NAME,

  init: (component: HTMLElement) => {
    autoSeenEffectPrepare(component);
    return addSeenEffect(component) || noop;
  },

  unmount: (elm, unobserve) => {
    unobserve();
  },
});
