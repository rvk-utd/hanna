import { css } from 'es-in-css';

import { htmlCl } from '../lib/classNames.js';

import {
  SeenEffect__disallowNesting,
  SeenEffect__fadeup,
  SeenEffect__reset,
} from './utils/seenEffects.js';

import { ExtraLinks__seenEffects } from './ExtraLinks.css.js';
import { GridBlocks__seenEffects } from './GridBlocks.css.js';
import { ImageCards__seenEffects } from './ImageCards.css.js';
import { RowBlock__seenEffects } from './RowBlock.css.js';

export default css`
  /*
    This CSS module implements a backwards compatible selectors for
    on-by-default/implicit/automatic "SeenEffect" animations on certain
    Hanna components.

    (The latest version of \`window.Hanna.loadSprinkles('SeenEffects');\`
    searches for this CSS module token and only performs the
    legacy sprinkling of these elements if it is found.)
  */
  @media screen {
    .AccordionList,
    .ActionCards,
    .ArticleCarousel,
    .CityBlock,
    .ContentArticle,
    .FeatureList,
    .Gallery,
    .HeroBlock,
    .IslandBlock,
    .IslandPageBlock,
    .LabeledTextBlock,
    .NewsHero,
    .MiniMetrics,
    .PageFilter,
    .PageHeading,
    .SubHeading,
    .Tabs,
    .TableWrapper,
    .TextBlock,
    .___ {
      ${htmlCl.beforeSprinkling} &:not([data-seen-effect]),
      ${SeenEffect__fadeup('bare')};

      &[data-is-seen=''][data-is-seen=''] {
        ${SeenEffect__reset('bare')}
      }
    }

    .PageHeading,
    .SubHeading,
    .Tabs,
    .TableWrapper,
    .TextBlock {
      // @deprecated  Remove this mixin in v0.9
      ${SeenEffect__disallowNesting /* eslint-disable-line deprecation/deprecation */}
    }

    .ExtraLinks {
      ${ExtraLinks__seenEffects(null)};
    }
    .GridBlocks {
      ${GridBlocks__seenEffects(null)};
    }
    .ImageCards {
      ${ImageCards__seenEffects(null)};
    }
    .RowBlock {
      ${RowBlock__seenEffects(null)};
    }
  }
`;
