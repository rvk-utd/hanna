import { css } from 'es-in-css';

import { between_phone_netbook } from '../../lib/between';
import { mq } from '../../lib/breakpoints';
import { hannaVars as vars } from '../../lib/hannavars';
import { grid_units } from '../utils/miscUtils';

export const AttentionStyle = (border = true) => css`
  font: ${vars.font_bd_l};
  position: relative;
  padding-left: ${grid_units(5)};
  margin-top: ${between_phone_netbook(64, 80)};
  ${border &&
  css`
    border-top: ${vars.border_dark};
    padding-top: between_phone_netbook(40, 64);
  `}

  &::before {
    content: '';
    background-color: ${vars.theme_color_primary};
    width: ${grid_units(1)};
    position: absolute;
    top: ${border ? between_phone_netbook(40, 64) : 0};
    left: 0;
    bottom: 0;
  }

  @media ${mq.wide} {
    margin-top: 80px;

    ${border &&
    css`
      padding-top: 64px;
      &::before {
        top: 64px;
      }
    `}
  }
`;
