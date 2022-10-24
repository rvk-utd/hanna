import { css, cssVal, px } from 'es-in-css';
// TODO: Convert to jsDoc
// ===============================================================================
// Make an element reach beyond the left/right edges of it's container
// all the way to the viewport edges.
//
//     @include extendSides()
//     @include extendSides(both)  // same as @include extendSides()
//     @include extendSides(left)  // only affect the left-hand side
//     @include extendSides(right)  // ...or the right
//
//     @include extendSides(both, (25/16)em )  // Set additional padding
//     @include extendSides(both, (-25/16)em )  // ...which can also be a negative value
//     @include extendSides(left, (25/16)em )  // etc.
//

export const extendSides = (side: 'left' | 'right' | 'both' = 'both', pad = 0) => {
  let margin = 0;
  if (pad < 0) {
    margin = pad;
    pad = 0;
  }
  const page_expand_padding = cssVal`
    calc(50vw - 50% + ${px(pad)});
  `;
  const page_expand_margin = cssVal`
    calc(50% - 50vw + ${px(margin)})
  `;
  return css`
    ${side !== 'right' &&
    css`
      margin-left: ${page_expand_margin};
      padding-left: ${page_expand_padding};
    `}

    ${side !== 'left' &&
    css`
      margin-right: ${page_expand_margin};
      padding-right: ${page_expand_padding};
    `}
  `;
};
