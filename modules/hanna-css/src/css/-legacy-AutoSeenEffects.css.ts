import range from '@hugsmidjan/qj/range';
import { css, ms } from 'es-in-css';

import {
  SeenEffect__disallowNesting,
  SeenEffect__fadein,
  SeenEffect__fadeup,
  SeenEffect__transition,
} from './utils/seenEffects.js';

export default css`
  /*
    This CSS module implements a backwards compatible selectors for
    on-by-default/implicit/automatic "SeenEffect" animations on certain
    Hanna components.

    If a site (such as www.reykjavik.is) wants to keep the old behavior,
    it must add a \`data-auto-seen-effects="true"\` attribute to
    the \`<html/>\` element, and load this CSS module.
    (…And run \`window.Hanna.loadSprinkles('SeenEffects');\` to activate
    the scripted behavior, of course.)
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
    .PageFilter,
    .PageHeading,
    .SubHeading,
    .Tabs,
    .TableWrapper,
    .TextBlock,
    .___ {
      ${SeenEffect__fadeup}
    }

    .PageHeading,
    .SubHeading,
    .Tabs,
    .TableWrapper,
    .TextBlock {
      // @deprecated  Remove this mixin in v0.9
      ${SeenEffect__disallowNesting}
    }

    .GridBlocks {
      ${SeenEffect__fadeup('> .GridBlocks__item')}
      ${range(1, 12).map((i) =>
        SeenEffect__transition(`> .GridBlocks__item:nth-child(${i})`)(css`
          transition-delay: ${ms((i - 1) * 150)};
        `)
      )}
      // Default delay, applied to for items where n > 12
      ${SeenEffect__transition('> .GridBlocks__item')(css`
        transition-delay: ${ms((13 - 1) * 150)};
      `)}
    }

    .ImageCards {
      ${SeenEffect__fadeup('.ImageCards__summary')};
      ${SeenEffect__fadein('.ImageCards__item')};
      ${range(1, 12).map((i) =>
        SeenEffect__transition(`.ImageCards__item:nth-child(${i})`)(css`
          transition-delay: ${ms(i * 50 + 200)};
        `)
      )}
      // Default delay, applied to for items where n > 12
      ${SeenEffect__transition('.ImageCards__item')(css`
        transition-delay: ${ms(13 * 50 + 200)};
      `)}
    }

    .RowBlock {
      ${SeenEffect__fadeup('> .RowBlockColumn')}

      ${SeenEffect__transition('> .RowBlockColumn + .RowBlockColumn')(css`
        transition-delay: ${ms(100)};
      `)}
    }
  }
`;
