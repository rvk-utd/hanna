import range from '@hugsmidjan/qj/range';
import { css, em, pct } from 'es-in-css';

import { font } from '../lib/font.js';
import { hannaVars, hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

// Top/bottom offset spacing for mock text skeleton background
const sp = pct(15);

const shimmerAnimation = 'Skeleton-shimmer';

const shimmerBackground = css`
  background-color: var(--Skeleton--color);
  background-image: linear-gradient(
    90deg,
    transparent,
    var(--Skeleton--colorShimmer),
    transparent
  );
  background-size: 50% 100%;
  background-repeat: no-repeat;
  animation: ${shimmerAnimation} 1.8s ease-out infinite;
`;

export default css`
  @keyframes ${shimmerAnimation} {
    from {
      background-position-x: -100%;
    }
    to {
      background-position-x: 200%;
    }
  }

  .Skeleton {
    --Skeleton--gap: 3;
    --Skeleton--height: 1;
    --Skeleton--lineHeight: ${em(font.base_leading / font.base_size)};
    --Skeleton--color: color-mix(in srgb, ${vars.color_suld_200} 3%, transparent);
    --Skeleton--colorShimmer: color-mix(in srgb, ${vars.color_suld_200} 8%, transparent);
    position: relative;
    display: block;
    height: calc(var(--Skeleton--height) * var(--Skeleton--lineHeight));
    ${shimmerBackground}
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
    animation: none;
  }

  .Skeleton--text::before,
  .Skeleton--text::after {
    content: '';
    display: block;
    height: calc(calc(var(--Skeleton--height) - 1) * var(--Skeleton--lineHeight));

    ${shimmerBackground}

    mask-image: linear-gradient(
      180deg,
      transparent ${sp},
      black ${sp},
      black ${pct(100 - sp)},
      transparent ${pct(100 - sp)}
    );
    mask-size: 100% var(--Skeleton--lineHeight);
    mask-repeat: repeat-y;
  }

  .Skeleton--text::after {
    height: var(--Skeleton--lineHeight);
    width: 70%;
  }
  .Skeleton--text[class*='Skeleton--height--']:not(.Skeleton--height--1)::after {
    width: 35%;
  }

  .Skeleton--circle {
    width: calc(var(--Skeleton--height) * var(--Skeleton--lineHeight));
    border-radius: ${pct(50)};
  }

  .Skeleton--text.Skeleton--circle {
    ${WARNING__('Do not mix `--text` and `--circle`.')}
  }

  /* Must come last, to beat the \`animation\` shorthands set above. */
  @media (prefers-reduced-motion: reduce) {
    .Skeleton,
    .Skeleton--text::before,
    .Skeleton--text::after {
      animation: none;
    }
  }
`;
