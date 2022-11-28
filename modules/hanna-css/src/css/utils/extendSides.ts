import { css, cssVal, PlainNumber, px, PxValue } from 'es-in-css';
/**
 * Makes an element reach beyond the left/right edges of it's container
 * all the way to the viewport edges.
 *
 * ```ts
 * extendSides()
 * extendSides('both')   // same as extendSides()
 * extendSides('left')   // only affect the left-hand side
 * extendSides('right')  // ...or the right
 *
 * extendSides('both', em(25/16) )   // Set additional padding
 * extendSides('both', em(-25/16) )  // ...possibly a negative value
 * extendSides('left', em(25/16) )   // etc.
 * ```
 */
export const extendSides = (
  side: 'left' | 'right' | 'both' = 'both',
  pad: PlainNumber | PxValue = 0
) => {
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
