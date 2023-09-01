import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { cols_pct, grid_units, prem } from './utils/miscUtils.js';
import { SeenEffect__fadeup } from './utils/seenEffects.js';

export default css`
  /*!@deps
    PageHeading
    ShareButtons
    Bling
  */
  @media screen {
    .NewsHero {
      ${SeenEffect__fadeup()}
      position: relative;
      display: flex;
      flex-flow: column wrap;
      padding: ${scale_container(0, 1 * grid.unit)} 0;
      margin-bottom: ${scale_container(30, 120)};
      @media ${mq.phablet_up} {
        flex-flow: row nowrap;
      }
    }

    .NewsHero--align--right .NewsHero__content {
      margin-left: auto;
      width: 100%;

      @media ${mq.tablet_up} {
        width: ${cols_pct(7)};
      }
    }

    .NewsHero__content {
      display: flex;
      flex-wrap: wrap;
      flex-flow: column;

      @media ${mq.phablet_up} {
        width: ${cols_pct(6)};
      }
    }

    .NewsHero__title {
      font: ${vars.font_hd_l};
      margin: ${prem(32)} 0 ${prem(24)};
    }

    .NewsHero__meta {
      font: ${vars.font_label};
      color: ${vars.color_suld_150};
      order: -1;
    }

    .NewsHero__summary {
      font: ${vars.font_bd_l};
      margin-bottom: ${prem(32)};
    }

    .NewsHero__image {
      position: relative;
      display: block;
      margin-top: ${grid_units(-1)};
      margin-bottom: ${grid_units(2)};
      order: -1;

      @media ${mq.phablet_up} {
        margin-right: ${vars.grid_margin__neg};
        padding-right: ${vars.grid_margin};
        box-sizing: content-box;
        width: ${cols_pct(5, 5)};
        padding-top: ${cols_pct(6, 6.5)};
        margin-left: auto;
        order: 1;
        margin-top: ${scale_container(0, -24)};
        margin-bottom: ${scale_container(-20, -100)};
      }
    }
    .NewsHero__image > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: auto;
      object-fit: contain;
      object-position: 100% 30%;
    }
  }
`;
