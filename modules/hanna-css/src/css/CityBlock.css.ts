import { css, px } from 'es-in-css';

import {
  scale,
  scale_container,
  scale_phone_netbook,
  scale_phone_phablet,
} from '../lib/between.js';
import { bp, mq } from '../lib/breakpoints.js';
import { grid, gridPx } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING_soft__ } from '../lib/WARNING__.js';

import { ButtonTertiaryStyle } from './styles/buttons.js';
import { LinkStyle_SameColor } from '../lib/links.js';
import { cols_pct, DEPS, grid_units, prem } from './utils/miscUtils.js';

const minH = px(480 - 2 * grid.column);

const largebox_minH = px(800 - 2 * grid.column);
const largeimage_minH = px(880);

export default css`
  ${DEPS('ButtonPrimary', 'ButtonTertiary')}

  @media screen {
    .CityBlock {
      display: flex;
      flex-flow: column-reverse;
      margin-bottom: ${scale_container(30, 20 * grid.unit)};
    }
    .CityBlock__content {
      background-color: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      ${LinkStyle_SameColor}

      margin: 0 ${vars.grid_margin__neg};
      padding: ${scale_container(30, grid.column)} ${vars.grid_margin};

      min-height: ${scale_phone_netbook(200, minH)};
      @media ${mq.wide} {
        min-height: ${minH};
      }
    }
    .CityBlock__image {
      position: relative;
      display: block;
    }
    .CityBlock__image > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: auto;
      object-fit: contain;
    }
    .CityBlock--largeimage > .CityBlock__image > img {
      object-fit: cover;
    }

    .CityBlock__title {
      font: ${vars.font_heading_m};
      margin-bottom: ${grid_units(4)};
    }
    .CityBlock__summary {
      margin-bottom: ${grid_units(4)};
      font: ${vars.font_body_l};
    }
    .CityBlock__summary a {
      ${LinkStyle_SameColor}
    }
    .CityBlock__summary li:not([class]), // Captures ul, ol
	  .CityBlock__summary blockquote {
      ${WARNING_soft__('Use simple markup only')};
    }

    .CityBlock--largebox > * > .CityBlock__buttons {
      margin-top: auto;
    }
    .CityBlock__button {
      ${ButtonTertiaryStyle}
      display: block;
      margin-bottom: ${grid_units(1)};
    }
  }

  // ===========================================================================

  @media ${mq.phone_phablet} {
    .CityBlock__image {
      margin: 0 ${cols_pct(-1)};
      height: ${scale_phone_phablet(230, 350)};
      margin-bottom: ${prem(20)};
    }
    .CityBlock--largebox > .CityBlock__image,
    .CityBlock--largeimage > .CityBlock__image {
      margin: 0 ${vars.grid_margin__neg};
      height: ${scale_phone_phablet(200, 300)};
    }
    .CityBlock--largebox > .CityBlock__image > img {
      object-fit: cover;
    }
  }

  // ===========================================================================

  @media ${mq.tablet_up} {
    .CityBlock {
      position: relative;
      flex-flow: row-reverse;
      justify-content: space-between;
    }
    .CityBlock--align--right {
    }
    .CityBlock--align--left {
      flex-flow: row;
    }

    .CityBlock__content {
      display: flex;
      flex-flow: column;
      box-sizing: content-box;
      width: ${scale(300, gridPx(5, 3), bp.tablet, grid.contentMaxWidth, '%')};
      margin: ${cols_pct(0, 1)} 0;
      margin-left: auto;
      padding-left: ${cols_pct(0, 1)};
      margin-right: ${vars.grid_margin__neg};
      padding-right: ${vars.grid_margin};
    }
    .CityBlock--largebox > .CityBlock__content {
      margin-top: 0;
      margin-bottom: 0;

      min-height: ${scale_phone_netbook(400, largebox_minH)};
    }
    .CityBlock--largeimage > .CityBlock__content {
      margin-top: auto;
      margin-bottom: auto;
    }

    .CityBlock--align--left > .CityBlock__content {
      margin-right: auto;
      padding-right: ${cols_pct(0, 1)};
      margin-left: ${vars.grid_margin__neg};
      padding-left: ${vars.grid_margin};
    }

    .CityBlock__image {
      margin: 0 ${cols_pct(0, -1)};
      width: ${cols_pct(6, 7)};
    }
    .CityBlock--largebox > .CityBlock__image,
    .CityBlock--largeimage > .CityBlock__image {
      width: ${cols_pct(6)};
      box-sizing: content-box;
      margin-left: ${vars.grid_margin__neg};
      padding-left: ${vars.grid_margin};
    }
    .CityBlock--largeimage > .CityBlock__image {
      min-height: ${scale_phone_netbook(400, largeimage_minH)};
    }
    .CityBlock--align--left.CityBlock--largebox > .CityBlock__image,
    .CityBlock--align--left.CityBlock--largeimage > .CityBlock__image {
      margin-left: auto;
      margin-right: ${vars.grid_margin__neg};
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.wide} {
    .CityBlock--largebox > .CityBlock__content {
      min-height: ${largebox_minH};
    }
    .CityBlock--largeimage > .CityBlock__image {
      min-height: ${largeimage_minH};
    }
  }
`;
