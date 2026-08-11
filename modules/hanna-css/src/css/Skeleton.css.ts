import range from '@hugsmidjan/qj/range';
import { colors_raw } from '@reykjavik/hanna-css';
import { color, css, em, pct, pct_f, scoped } from 'es-in-css';

import { font } from '../lib/font.js';
import { hannaVars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

// Top/bottom offset spacing for mock text skeleton background
const sp = pct(15);
const textLineHeight = em(font.base_leading / font.base_size);

const suld_200 = color(colors_raw.suld_200);
const suld_200_opacity_3pct = suld_200.alpha(0.03);
const suld_200_opacity_8pct = suld_200.alpha(0.08);

const shimmer = {
  name: scoped('Skeleton-animation'),
  bgWidth: pct(50),
  bgOffset: pct(-100),
};
const shimmerCircle: typeof shimmer = {
  name: scoped('Skeleton-animation-circle'),
  bgWidth: pct(80),
  bgOffset: pct(-400),
};

const shimmerBackground = css`
  background-color: ${suld_200_opacity_3pct};
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    ${suld_200_opacity_8pct} 45%,
    ${suld_200_opacity_8pct} 55%,
    transparent 100%
  );
  background-size: ${shimmer.bgWidth} 100%;
  background-position-x: ${shimmer.bgOffset};
  background-repeat: no-repeat;
  animation-name: ${shimmer.name};
  animation-delay: 2500ms;
  animation-duration: 3800ms;

  animation-timing-function: linear;
  animation-iteration-count: 5; // <float> | infinite
`;

const keyFrames = ({ name, bgOffset }: typeof shimmer) => css`
  @keyframes ${name} {
    0% {
      background-position-x: ${bgOffset};
    }
    ${pct_f(1_800 / 3_800)} {
      background-position-x: ${pct(100 - bgOffset)};
    }
    100% {
      background-position-x: ${pct(100 - bgOffset)};
    }
  }
`;

export default css`
  ${keyFrames(shimmer)}
  ${keyFrames(shimmerCircle)}

  .Skeleton {
    --Skeleton--gap: 3;
    --Skeleton--height: 1;
    position: relative;
    display: block;
    height: calc(var(--Skeleton--height) * ${textLineHeight});
    ${shimmerBackground}
  }
  .Skeleton--circle {
    --Skeleton--height: 2;
    background-size: ${shimmerCircle.bgWidth} 100%;
    background-position-x: ${shimmerCircle.bgOffset};
    animation-name: ${shimmerCircle.name};
  }
  .Skeleton--circle + .Skeleton:not([class*='Skeleton--gap--']) {
    --Skeleton--gap: 1;
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
    height: calc(calc(var(--Skeleton--height) - 1) * ${textLineHeight});

    ${shimmerBackground}

    mask-image: linear-gradient(
      180deg,
      transparent ${sp},
      black ${sp},
      black ${pct(100 - sp)},
      transparent ${pct(100 - sp)}
    );
    mask-size: 100% ${textLineHeight};
    mask-repeat: repeat-y;
  }

  .Skeleton--text::after {
    height: ${textLineHeight};
    width: 70%;
  }
  .Skeleton--text[class*='Skeleton--height--']:not(.Skeleton--height--1)::after {
    width: 35%;
    animation: none;
  }

  .Skeleton--circle {
    width: calc(var(--Skeleton--height) * ${textLineHeight});
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
