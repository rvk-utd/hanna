import { css } from 'es-in-css';

import { between_cols, between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

import { AttentionStyle } from './styles/attention';
import {
  LabeledTitleStyle__basics,
  LabeledTitleStyle__outdented,
} from './styles/labeledTitle';
import { grid_units, prem } from './utils/miscUtils';

export default css`
  @media screen {
    .ProcessOverview {
      background-color: ${vars.color_suld_25};
      margin: 0 ${vars.grid_margin__neg};
      padding: 0 ${vars.grid_margin};
      // @include extendBackgroundWithUnderlay(); // <-- this could be used also
      margin-bottom: ${between_cols(30, 120)};
      padding-top: ${between_cols(50, 120)};
      padding-bottom: ${between_cols(50, 192)};
    }
    .ProcessOverview--transparent {
      background: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .ProcessOverview__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${between_phone_netbook(40, 118)};

      @media ${mq.wide} {
        margin-bottom: ${prem(118)};
      }
    }

    .ProcessOverview__item {
      margin-bottom: ${grid_units(10)};
      position: relative;
    }

    .ProcessOverview__item__title {
      ${LabeledTitleStyle__basics}
    }

    .ProcessOverview__item__content {
      font: ${vars.font_bd_l};
    }

    .ProcessOverview__attention {
      ${AttentionStyle(false)}
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.tablet_up} {
    .ProcessOverview__item {
      display: flex;
      align-items: flex-start;
    }

    :not(.ProcessOverview--narrow) > * > .ProcessOverview__item__title {
      ${LabeledTitleStyle__outdented}
    }
    .ProcessOverview--narrow > * > .ProcessOverview__item__title {
      width: ${cols_pct(3)};
      --dash-margin: ${vars.grid_gutter};
    }

    .ProcessOverview__item__content,
    .ProcessOverview__attention {
      width: ${cols_pct(7)};
      margin-left: auto;
    }
    .ProcessOverview--narrow > * > .ProcessOverview__item__content,
    .ProcessOverview--narrow > .ProcessOverview__attention {
      margin-right: ${cols_pct(2, 2)};
    }

    .ProcessOverview__attention {
      padding-right: ${cols_pct(1)};
    }
  }
`;
