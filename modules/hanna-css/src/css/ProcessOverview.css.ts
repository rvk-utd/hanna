import { css } from 'es-in-css';

import { scale_container, scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { AttentionStyle } from './styles/attention.js';
import {
  LabeledTitleStyle__basics,
  LabeledTitleStyle__outdented,
} from './styles/labeledTitle.js';
import { cols_pct, grid_units, prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .ProcessOverview {
      background-color: ${vars.color_suld_25};
      margin: 0 ${vars.grid_margin__neg};
      padding: 0 ${vars.grid_margin};
      // $ {extendBackgroundWithUnderlay}; // <-- this could be used also
      margin-bottom: ${scale_container(30, 120)};
      padding-top: ${scale_container(50, 120)};
      padding-bottom: ${scale_container(50, 192)};
    }
    .ProcessOverview--transparent {
      background: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .ProcessOverview__title {
      font: ${vars.font_heading_m};
      margin-bottom: ${scale_phone_netbook(40, 118)};

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
      font: ${vars.font_body_l};
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
