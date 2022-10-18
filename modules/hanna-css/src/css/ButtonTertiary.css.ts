import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import {
  ButtonTertiaryStyle,
  ButtonTertiaryStyle__backArrow,
  ButtonTertiaryStyle__disabled,
  ButtonTertiaryVariables as bt,
} from './styles/buttons';
import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    ButtonBar
  */

  .ButtonTertiary {
    ${ButtonTertiaryStyle};

    &--go--back {
      order: -10;
    }
    &--go--back::before {
      ${ButtonTertiaryStyle__backArrow}
    }

    &:active,
    &[aria-pressed='true'] {
      ${bt.override({
        dashColor: '_inherit',
        dashHeight: prem(6),
      })};
    }

    &--small {
      ${bt.override({
        dashSpace: vars.space_1,
      })};
      /* font-weight: 400; */
    }
    &--destructive {
      ${bt.override({
        color: vars.color_heidmork_100,
        dashColor: 'currentColor',
      })}
    }

    ${ButtonTertiaryStyle__disabled};

    // ---------------------------------------------------------------------------

    &[data-icon] {
      ${WARNING__('No icons on `ButtonTertiary`')};
    }
    &--go--back#{&}--destructive {
      ${WARNING__('`--destructive` and `--go--back` do NOT mix')};
    }
    &--go--forward {
      ${WARNING__('`--go--forward` not supported on `ButtonTertiary`')};
    }
  }
`;
