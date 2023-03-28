import { css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars';

import { Card_css, CardBlock_css, CardList_css, CardListTitle_css } from './styles/cards';
import { SeenEffect__fadeup } from './utils/seenEffects';

export default css`
  @media screen {
    .ActionCards {
      ${SeenEffect__fadeup}
      ${CardBlock_css}
      margin-bottom: ${between_cols(60, 100)};
    }
    .ActionCards__title {
      ${CardListTitle_css}
    }
    .ActionCards__summary {
      grid-area: title;
      margin-bottom: ${vars.baseVerticalMargin};
    }
    .ActionCards__summary > .ImageCards__title {
      margin-bottom: ${vars.space_2};
    }

    .ActionCards__list {
      ${CardList_css}
    }
    .ActionCards__item {
    }
    .ActionCards__card {
      ${Card_css}
      ${hannaVarOverride({
        link_color__hover: vars.color_suld_200,
      })}
      border: ${vars.border_default};
    }
    .ActionCards__card:hover,
    .ActionCards__card:active {
      --Card-lineColor: ${vars.theme_color_primary__safeish};
      border: 1px solid ${vars.theme_color_primary__safeish};
    }
  }
`;
