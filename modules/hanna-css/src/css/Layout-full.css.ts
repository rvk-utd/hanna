import { css } from 'es-in-css';

import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('Alert', 'Layout', 'FooterInfo', 'BreadCrumbs', 'MainMenu')}

  .Layout {
    ${WARNING__(
      `The CSS token "Layout-full" is deprecated.\nInstead load: 'Alert', 'Layout', 'FooterInfo', 'BreadCrumbs' and 'MainMenu'`
    )}
  }
`;
