import range from '@hugsmidjan/qj/range';
import { css, ms } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_pct, grid } from '../lib/grid';
import { hannaVars } from '../lib/hannavars';

import { grid_units, prem } from './utils/miscUtils';
import {
  SeenEffect__delay,
  SeenEffect__fadeup,
  SeenEffect__transition,
} from './utils/seenEffects';

export default css`
  /*!@deps
    ButtonTertiary
  */

  @media screen {
    .GridBlocks {
      display: flex;
      flex-flow: row wrap;
      margin-top: ${between_cols(30, 100)};
      margin-bottom: ${between_cols(40, 120)};
    }

    .GridBlocks__item {
      margin: ${prem(20)} 0;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      width: 100%;
    }

    .GridBlocks {
      // transition specifics
      // transition specifics
      ${SeenEffect__fadeup('> .GridBlocks__item')}
      // Default delay, applied to for items where n > 3
      ${SeenEffect__transition('> .GridBlocks__item')(SeenEffect__delay(ms(450)))}

      ${range(1, 12).map(
        (i) => css`
          ${SeenEffect__transition(`> .GridBlocks__item:nth-child(${i})`)(
            SeenEffect__delay(ms((i - 1) * 150))
          )}
        `
      )}
    }

    .GridBlocks__illustration {
      width: ${prem(80)};
      margin-top: ${prem(10)};

      @media ${mq.phone} {
        margin-top: 0;
      }
    }

    .GridBlocks__illustration img {
      margin-bottom: ${grid_units(3)};

      @media ${mq.phone_phablet} {
        margin-bottom: ${grid_units(1)};
      }
    }

    .GridBlocks__item__title {
      position: relative; // as offset for the __titlelink::before hit-area
      font: ${hannaVars.font_sh_l};
      margin-bottom: ${grid_units(2)};
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .GridBlocks__item__titlelink {
    }

    .GridBlocks__item__titlelink::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: ${prem(-20)};
      width: ${prem(80 + 60)};
      height: ${prem(80 + 20 + 3 * grid.unit)}; // the efnistakn images are 80px x 80px
    }

    .GridBlocks__item__summary {
      margin-bottom: ${grid_units(3)};
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.phablet_tablet} {
    .GridBlocks__item {
      width: 46%;
      margin-left: 8%;
    }
    .GridBlocks__item:nth-child(2n + 1) {
      margin-left: 0;
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.netbook_up} {
    .GridBlocks__item {
      width: ${cols_pct(4)};
      margin-left: ${cols_pct(0, 1)};
    }

    .GridBlocks--twocol > .GridBlocks__item {
      width: ${cols_pct(5)};
      margin-left: ${cols_pct(0, 1)};
      flex-flow: row;
    }
    .GridBlocks--twocol > .GridBlocks__item:nth-child(2n + 1) {
      margin-left: 0;
    }
    .GridBlocks--twocol > * > .GridBlocks__illustration {
      width: ${cols_pct(1, 0, { ofCols: 5 })};
      margin-right: ${cols_pct(0, 1, { ofCols: 5 })};
    }
    .GridBlocks--twocol > * > .GridBlocks__textwrap {
      width: ${cols_pct(4, 3, { ofCols: 5 })};
    }

    .GridBlocks:not(.GridBlocks--twocol) > .GridBlocks__item:nth-child(3n + 1) {
      margin-left: 0;
    }

    .GridBlocks--twocol .GridBlocks__item__titlelink::before {
      bottom: auto;
      left: auto;
      top: ${prem(-20)};
      right: 100%;
    }
  }
`;
