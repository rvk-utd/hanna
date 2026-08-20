import range from '@hugsmidjan/qj/range';
import { buildVariables, colors_raw } from '@reykjavik/hanna-css';
import { color, css, em, ms, pct, pct_f, scoped } from 'es-in-css';

import { font } from '../lib/font.js';
import { hannaVars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

const skeletonVars = buildVariables(
  ['shimmerPos', 'bgColor', 'shimmerColor', 'gap', 'height'],
  'Skeleton'
);
const setVars = skeletonVars.override;
const vars = skeletonVars.vars;

// Top/bottom offset spacing for mock text skeleton background
const sp = pct(15);
const textLineHeight = em(font.base_leading / font.base_size);

const shimmerDelay = ms(2_500);
const shimmerSpeed = ms(1_500);
const shimmerInterval = ms(2_000);
const shimmerDuration = ms(shimmerSpeed + shimmerInterval);

const bg = {
  base: color(colors_raw.suld_200).alpha(0.25),
  shimmer: color(colors_raw.suld_0),
};
const bgContrast: typeof bg = {
  base: color(colors_raw.suld_0).alpha(0.67),
  shimmer: color(colors_raw.suld_0),
};

const shimmer = {
  name: scoped('Skeleton-animation'),
  width: pct(75),
};
const shimmerCircle: typeof shimmer = {
  name: scoped('Skeleton-animation-circle'),
  width: pct(125),
};

const shimmerBackground = ({ width }: typeof shimmer) => {
  const stop1 = pct(0.2 * width);
  const stop2 = pct(0.37 * width);
  const stopCenter = pct(0.5 * width);
  const stop4 = pct(width - stop2);
  const stop5 = pct(width - stop1);

  const opacity1 = pct(83);
  const opacity2 = pct(25);

  return css`
    ${setVars({ shimmerPos: pct(-width) })}
    background-image: linear-gradient(
      90deg,
      ${vars.bgColor} ${vars.shimmerPos},
      color-mix(
          in srgb,
          ${vars.bgColor} ${opacity1},
          ${vars.shimmerColor}
        )
        calc(${vars.shimmerPos} + ${stop1}),
      color-mix(
          in srgb,
          ${vars.bgColor} ${opacity2},
          ${vars.shimmerColor}
        )
        calc(${vars.shimmerPos} + ${stop2}),
      ${vars.shimmerColor} calc(${vars.shimmerPos} + ${stopCenter}),
      color-mix(
          in srgb,
          ${vars.bgColor} ${opacity2},
          ${vars.shimmerColor}
        )
        calc(${vars.shimmerPos} + ${stop4}),
      color-mix(
          in srgb,
          ${vars.bgColor} ${opacity1},
          ${vars.shimmerColor}
        )
        calc(${vars.shimmerPos} + ${stop5}),
      ${vars.bgColor} calc(${vars.shimmerPos} + ${width})
    );
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    animation-delay: ${shimmerDelay};
    animation-duration: ${shimmerDuration};
    animation-timing-function: linear;
    animation-iteration-count: 5; // <float> | infinite
    animation-name: ${shimmer.name};
  `;
};

const keyFrames = ({ name, width }: typeof shimmer) => {
  return css`
    @keyframes ${name} {
      0% {
        ${setVars({ shimmerPos: pct(-width) })}
      }
      ${pct_f(shimmerSpeed / shimmerDuration)} {
        ${setVars({ shimmerPos: pct(100) })}
      }
      100% {
        ${setVars({ shimmerPos: pct(100) })}
      }
    }
  `;
};

export default css`
  @property ${vars.shimmerPos.cssName} {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
  ${keyFrames(shimmer)}
  ${keyFrames(shimmerCircle)}


  .Skeleton {
    ${setVars({
      gap: 3,
      height: 1,
    })}
    position: relative;
    display: block;
    height: calc(${vars.height} * ${textLineHeight});
    ${shimmerBackground(shimmer)}
    ${setVars({
      bgColor: bg.base,
      shimmerColor: bg.shimmer,
    })}
    opacity: 0.25; // #f2f2f2
  }
  .Skeleton--negative {
    ${setVars({
      bgColor: bgContrast.base,
      shimmerColor: bgContrast.shimmer,
    })}
    opacity: 0.31; // #3b87e3
  }
  .Skeleton--circle {
    ${setVars({ height: 2 })}
    ${shimmerBackground(shimmerCircle)}
  }
  .Skeleton--circle + .Skeleton:not([class*='Skeleton--gap--']) {
    ${setVars({ gap: 1 })}
  }

  .Skeleton--rounded {
    border-radius: 4px;
  }
  .Skeleton--rounded.Skeleton--circle,
  .Skeleton--rounded.Skeleton--text {
    ${WARNING__('`--rounded` does not mix with `--circle` or `--text`')}
  }

  ${range(2, 20).map(
    (i) =>
      css`
        .Skeleton--height--${i} {
          ${setVars({ height: i })}
        }
      `
  )}

  ${range(1, 5).map(
    (i) =>
      css`
        .Skeleton--gap--${i} {
          ${setVars({ gap: i })}
        }
      `
  )}

  .Skeleton + .Skeleton {
    margin-top: calc(${vars.gap} * ${hannaVars.space_1});
  }

  .Skeleton--text {
    background: none;
    animation: none;
  }

  .Skeleton--text::before,
  .Skeleton--text::after {
    content: '';
    display: block;
    height: calc(calc(${vars.height} - 1) * ${textLineHeight});

    ${shimmerBackground(shimmer)}

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
    width: calc(${vars.height} * ${textLineHeight});
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
