import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
import { css, px } from 'es-in-css';

import { clamp_phone_phablet } from '../lib/between.js';

export default css`
  .ReykjavikWaves::before {
    content: '';
    display: block;
    width: ${clamp_phone_phablet(22, 32)};
    max-width: 100%;
    aspect-ratio: 22 / 57;
    background: url('${getAssetUrl('pdf/reykjavik-waves.svg')}') center / contain
      no-repeat;
  }
  .ReykjavikWaves--small::before {
    width: ${px(22)};
  }
`;
