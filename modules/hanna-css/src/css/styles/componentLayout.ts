import { css } from 'es-in-css';

import { mq } from '../../lib/breakpoints';
import { cols_px } from '../../lib/grid';
import { hannaVars as vars } from '../../lib/hannavars';
import { WARNING__ } from '../../lib/WARNING__';

export const ComponentLayout = (wide = true) => css`
  @media screen {
    ${
      '' // in flex box contexts this improves mobile rendering
    }
    width: 100%;
    max-width: ${cols_px(6)};

    &--align--right {
      @escape (without: media) {
        @media ${mq.phablet_up} {
          margin-left: auto;
          max-width: none;
          width: ${vars.grid_7};
        }
      }
    }

    ${wide &&
    css`
      &--wide {
        ${
          '' // Enforce that --wide and --align--right don't mix
        }
        margin-left: 0;
        max-width: ${cols_px(8)};
      }
      &--align--right&--wide {
        ${WARNING__("`--align--right` can't be `--wide`")};
      }
    `}
  }
`;
