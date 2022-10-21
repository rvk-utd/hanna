import { css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import {
  LabeledTitleStyle__basics,
  LabeledTitleStyle__floating,
  LabeledTitleStyle__outdented,
} from './styles/labeledTitle';
import { grid_units } from './utils/miscUtils';
import { SeenEffect__fadeup } from './utils/seenEffects';
import { textContent } from './utils/textContent';

export default css`
  /*!@deps
    Attention
    ButtonTertiary
  */

  @media screen {
    .LabeledTextBlock {
      // @include SeenEffect--fadeup();
      ${SeenEffect__fadeup}
      margin-bottom: ${between_cols(30, 100)};
    }

    .LabeledTextBlock__label {
      ${LabeledTitleStyle__basics}
    }

    .LabeledTextBlock__summary {
      ${textContent}
    }
    .LabeledTextBlock__summary > .ButtonTertiary {
      display: block;
      margin-top: ${vars.baseVerticalMargin};
    }

    // ---------------------------------------------------------------------------

    .LabeledTextBlock--left {
      ${WARNING__('`--left` is outdated use `--wide` instead')};
    }
  }

  @media ${mq.tablet_up} {
    .LabeledTextBlock {
      display: flex;
      align-items: flex-start;
    }

    .LabeledTextBlock__label {
      ${LabeledTitleStyle__floating}
    }
    .LabeledTextBlock--wide > .LabeledTextBlock__label {
      ${LabeledTitleStyle__outdented}
    }

    .LabeledTextBlock__summary {
      width: ${cols_pct(6)};
      margin-top: ${grid_units(1)};
      margin-left: auto;
    }
    .LabeledTextBlock--wide > .LabeledTextBlock__summary {
      width: ${cols_pct(7)};
    }
  }
`;
