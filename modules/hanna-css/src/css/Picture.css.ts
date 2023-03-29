import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

export default css`
  .Picture {
    display: block;
    position: relative;
    margin-bottom: ${vars.space_3};
    width: 100%;
    height: 100%;
  }
  .Picture > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .Picture--contain > img {
    object-fit: contain;
    object-position: initial;
  }
`;
