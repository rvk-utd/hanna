import { css } from 'es-in-css';

import { between_tablet_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { grid } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { LinkStyle_Reset } from './styles/links';
import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    WizardLayout
  */
`;

// inlined in -basics.css.ts
export const WizardLayoutClose_css = () => css`
  @media screen {
    .WizardLayoutClose {
      font: ${vars.font_bd_s};
      position: absolute;
      z-index: 5;
      right: 0;
      top: ${prem(20)};
      color: ${vars.color_suld_200};
      font-weight: 700;
    }
    a.WizardLayoutClose {
      ${LinkStyle_Reset(true)};
    }

    .WizardLayoutClose::after {
      ${iconStyle(vars.icon__close)}
      font-size: ${prem(13)};
      margin-left: ${prem(13)};
      padding-top: ${prem(1)};
      transition: transform ${vars.link_transition};
    }

    .WizardLayoutClose:hover,
    .WizardLayoutClose:active {
      color: ${vars.color_faxafloi_100};

      &::after {
        transform: scale(1.3);
      }
    }
  }
  @media ${mq.tablet_up} {
    .WizardLayoutClose {
      right: ${prem(30)};
      top: ${between_tablet_netbook(30, 56)};
    }
  }

  @media ${mq.netbook_up} {
    .WizardLayoutClose {
      top: ${prem(56)};
    }
  }

  @media ${mq.wide} {
    .WizardLayoutClose {
      top: ${prem(56)};
      right: calc((100vw / 2) - (${prem(grid.contentMaxWidth)} / 2));
    }
  }
`;
