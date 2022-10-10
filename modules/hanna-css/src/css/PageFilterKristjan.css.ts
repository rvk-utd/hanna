import { css, media } from 'es-in-css';

import { between_cols, between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { font } from '../lib/font';
import { cols_pct, cols_px } from '../lib/grid';
import { hannaVars } from '../lib/hannavars';

import { extendBackgroundWithUnderlay, prem } from './utils/misc';
import { SeenEffect__fadeup } from './utils/seenEffects';
import { grid_unit } from './vars/grid';

export default css`
  /*!@deps
    TextInput
    SearchInput
    Datepicker
    Selectbox
    ButtonPrimary
    ButtonSecondary
    ButtonTertiary
    Footnote
  */
  @media screen {
    .PageFilter {
      ${SeenEffect__fadeup};
      background-color: ${colors.suld_25};
      padding: ${between_cols(30, 80)} 0 0 0;
      margin-bottom: ${between_cols(64, 128)};
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-start;
      ${extendBackgroundWithUnderlay().trim()}
    }

    .PageFilter::before {
      border-left: ${between_phone_netbook(8, 24)} solid ${hannaVars.theme_color_primary};
      margin-bottom: ${between_cols(-32, -64)};
      pointer-events: none;

      ${media(
        mq.wide,
        css`
          border-width: prem(24);
        `
      )}
    }

    .PageFilter--underlap {
      ${media(
        mq.tablet_up,
        css`
          margin-bottom: 0;
        `
      )}
    }

    .PageFilter__title {
      font: ${font.sizes.sh_l_size};
      margin-bottom: em(20/64);
      width: 100%;
    }

    .PageFilter__summary {
      // @include BodyTextStyle--small();
      width: 100%;
    }

    .PageFilter__filters {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      margin-top: ${prem(20)};
      margin-bottom: ${between_cols(0, 24)};
      width: 100%;
      // TODO: Include px suffix
      max-width: ${cols_px(9, 9)};
    }

    .PageFilter__filters > .FormField {
      margin-right: ${hannaVars.grid_gutter};
      margin-bottom: ${prem(3 * grid_unit)};
      // min-width: cols_pct(3, 2, 9, 9); // In FireFox the min-width becomes larger and thus only fits 2 FormFields per line.
      // TODO: Include % suffix
      min-width: ${cols_pct(3, 1, { ofCols: 9, ofGutters: 9 })};

      ${media(
        mq.phone,
        css`
          width: 100%;
        `
      )}
    }

    .PageFilter__buttons {
      margin-top: ${prem(20)};
      margin-bottom: ${between_cols(0, 24)};
    }

    .PageFilter__buttons > .ButtonTertiary:last-child,
    .PageFilter__buttons > .ButtonPrimary:last-child {
      margin-right: 0;
      // The default max-content value triggers a FireFox flex-item width calculation bug,
      // adding ~38ox of whitespace on right-hand-side when there's only a single buttuon.
      // o_O   –– 2020-08-24
      width: auto;
    }

    .PageFilter > .Footnote {
      margin-top: ${between_cols(30, 60)};
      margin-bottom: 0;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-top: 1px solid currentColor;
        margin-top: ${between_cols(-12, -40)};
      }
    }
  }
`;
