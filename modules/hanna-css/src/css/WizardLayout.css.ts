import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { LayoutHeaderLogo } from './styles/header.js';
import { cols_px, grid_units, prem } from './utils/miscUtils.js';

import { WizardLayoutClose_css } from './WizardLayoutClose.css';

export default css`
  @media screen {
    .WizardLayout {
      min-height: 100vh;
      width: 100%;
      max-width: ${prem(grid.contentMaxWidth)};
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-flow: column;
    }

    .WizardLayout__alerts {
      max-height: 1000px;
      overflow: hidden;
      margin: 0 ${prem(-10)};
      transition: max-height 400ms ease-in;

      @media ${mq.tablet_up} {
        margin: 0;
      }
    }
    .WizardLayout__alerts .Alert {
      margin: ${grid_units(2)} 0 0 0;
    }

    .WizardLayout__content {
      flex-grow: 1;
      display: flex;
      flex-flow: column nowrap;
      // align-items: center;
      position: relative;
    }

    .WizardLayout__header {
      position: relative;
      z-index: 3; // ??? ${vars.zindex__header};
      height: ${vars.Layout$$header_height};
      display: flex;
      align-items: center;
    }

    .WizardLayout__header__logo {
      ${LayoutHeaderLogo}
    }

    .WizardLayout__wrap {
      flex-grow: 1;
      position: relative;
      z-index: 2;
    }

    .WizardLayout__deco {
      display: none;
    }
  }

  @media ${mq.phone_phablet} {
    body {
      --grid--margin: ${vars.space_2};
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
    }

    .WizardLayout__wrap {
      padding-left: ${prem(48)};
    }

    .WizardLayout__stepper {
      float: left;
      position: sticky;
      top: ${prem(16)};
      padding-top: ${prem(8)};
      margin-left: ${prem(-40)};
      width: ${prem(24)};
    }
  }

  @media ${mq.tablet_up} {
    .WizardLayout {
      position: static;
    }
    .WizardLayout__header {
      padding-left: ${prem(16)};
      padding-right: ${prem(16)};
    }

    .WizardLayout__alerts {
      margin-left: ${prem(8)};
      max-width: ${cols_px(9, 9)};
    }

    .WizardLayout__wrap {
      width: ${vars.grid_10};
      display: flex;
      padding-left: ${prem(16)};
    }
    .WizardLayout__stepper {
      flex-shrink: 1;
      width: ${prem(170)};
      margin-right: ${prem(30)};
    }
    .WizardLayout__main {
      flex-shrink: 1;
      width: 100%;
      max-width: 580px;
    }
  }

  @media ${mq.netbook_up} {
    .WizardLayout::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      width: calc((100vw / 2) - (${prem(grid.contentMaxWidth)} / 3));
      background: ${vars.color_suld_50};
    }

    .WizardLayout__main {
      min-height: 600px;
    }
  }

  @media ${mq.wide} {
    .WizardLayout__header {
      padding: ${prem(40)} ${prem(8)} ${prem(60)};
    }

    .WizardLayout__progress {
      margin-right: ${prem(55)};
    }

    .WizardLayout__deco {
      display: block;
      position: absolute;
      top: 100px;
      right: -121px;
    }
    .WizardLayout__deco--geometry {
      background: url('/assets/WizardLayout-deco.png') 0 0 no-repeat;
      width: 217px;
      height: 468px;
    }
  }
  ${WizardLayoutClose_css}

  // ===========================================================================
  // BEGIN @deprecated  (remove in v0.9)
  // Styles to make the addition of .WizardLayout__content non-breaking
  .WizardLayout {
    display: flex;
    flex-flow: column nowrap;
  }
  // END @deprecated
`;
