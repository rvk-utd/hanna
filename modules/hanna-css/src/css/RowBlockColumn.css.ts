import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { LinkStyle_SameColor } from './styles/links.js';
import { cols_pct, DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('RowBlock')}
`;

export const RowBlockColumn_css = () => css`
  @media screen {
    .RowBlockColumn {
      padding-top: ${scale_container(30, 80)};
      padding-bottom: ${scale_container(30, 80)};
      width: 100%; // to avoid flex item auto-sizing
    }
    .RowBlockColumn--background {
      background-color: ${vars.color_suld_25};
      box-sizing: content-box;
      margin: 0 ${vars.grid_margin__neg};
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin};
    }
    .RowBlockColumn--background--primary {
      background-color: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      ${LinkStyle_SameColor}
    }
  }

  @media ${mq.tablet_up} {
    .RowBlockColumn {
      width: ${cols_pct(6)};
    }
    .RowBlockColumn--narrow {
      width: ${cols_pct(5, 5)};
    }

    .RowBlockColumn--background {
      width: ${cols_pct(5, 5)};
      align-self: stretch;
      --padding--inner: ${cols_pct(1, 0.5)};
    }
    .RowBlockColumn--background.RowBlockColumn--narrow[class] {
      width: ${cols_pct(4, 4)};
      --padding--inner: ${cols_pct(1)};
    }

    :not(.RowBlock--align--right) > .RowBlockColumn--background:first-child,
    .RowBlock--align--right > .RowBlockColumn--background:last-child {
      padding-right: var(--padding--inner);
    }
    :not(.RowBlock--align--right) > .RowBlockColumn--background:last-child,
    .RowBlock--align--right > .RowBlockColumn--background:first-child {
      padding-left: var(--padding--inner);
    }
  }

  // ===========================================================================
  @media screen {
    :not(.RowBlock) > .RowBlockColumn {
      ${WARNING__('Must be direct child of a `RowBlock`')};
    }
  }
`;
