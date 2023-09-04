import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import {
  LabeledTitleStyle__basics,
  LabeledTitleStyle__floating,
  LabeledTitleStyle__outdented,
} from './styles/labeledTitle.js';
import { cols_pct, grid_units } from './utils/miscUtils.js';
import { textContent } from './utils/textContent.js';

export default css`
  /*!@deps
    Attention
    ButtonTertiary
  */

  @media screen {
    .LabeledTextBlock {
      margin-bottom: ${scale_container(30, 100)};
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
