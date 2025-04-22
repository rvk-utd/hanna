import { css } from 'es-in-css';

import { mq } from '../../lib/breakpoints.js';
import { gridPx } from '../../lib/grid.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { WARNING__ } from '../../lib/WARNING__.js';

export const ComponentLayout = (wide = true) => css`
  @media screen {
    ${
      '' // in flex box contexts this improves mobile rendering
    }
    width: 100%;
    max-width: ${gridPx(6)};

    &--align--right {
      @escape (without: media) {
        @media ${mq.tablet_up} {
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
        max-width: ${gridPx(8)};
      }
      &--align--right&--wide {
        ${WARNING__("`--align--right` can't be `--wide`")};
      }
    `}
  }
`;
