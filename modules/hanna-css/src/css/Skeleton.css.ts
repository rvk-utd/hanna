import range from '@hugsmidjan/qj/range';
import { css, em, pct } from 'es-in-css';

import { font } from '../lib/font';
import { hannaVars, hannaVars as vars } from '../lib/hannavars';

// Top/bottom offset spacing for mock text skeleton background
const sp = pct(15);

export default css`
  .Skeleton {
    --Skeleton--gap: 3;
    --Skeleton--height: 1;
    --Skeleton--lineHeight: ${em(font.base_leading / font.base_size)};
    position: relative;
    display: block;
    height: calc(var(--Skeleton--height) * var(--Skeleton--lineHeight));
    background-color: ${vars.color_suld_200};
    opacity: 0.03;
  }

  ${range(2, 20).map(
    (i) =>
      css`
        .Skeleton--height--${i} {
          --Skeleton--height: ${i};
        }
      `
  )}

  ${range(1, 5).map(
    (i) =>
      css`
        .Skeleton--gap--${i} {
          --Skeleton--gap: ${i};
        }
      `
  )}

  .Skeleton + .Skeleton {
    margin-top: calc(var(--Skeleton--gap) * ${hannaVars.space_1});
  }

  .Skeleton--text {
    background: none;
  }

  .Skeleton--text::before,
  .Skeleton--text::after {
    content: '';
    display: block;
    height: calc(calc(var(--Skeleton--height) - 1) * var(--Skeleton--lineHeight));

    background-image: linear-gradient(
      180deg,
      transparent ${sp},
      ${vars.color_suld_200} ${sp},
      ${vars.color_suld_200} ${pct(100 - sp)},
      transparent ${pct(100 - sp)}
    );
    background-size: 100% var(--Skeleton--lineHeight);
    background-repeat: repeat-y;
  }

  .Skeleton--text::after {
    height: var(--Skeleton--lineHeight);
    width: 70%;
  }
  .Skeleton--text[class*='Skeleton--height--']:not(.Skeleton--height--1)::after {
    width: 35%;
  }
`;
