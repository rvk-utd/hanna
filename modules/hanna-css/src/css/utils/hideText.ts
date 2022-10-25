import { css } from 'es-in-css';

type HideMode = 'normal' | 'soft' | 'hard';

const nonSoftStyles = css`
  text-indent: 150%;
  text-align: left;
`;

const hardStyles = css`
  letter-spacing: -0.4em;
  text-shadow: none !important;
  color: transparent !important;
`;

/**
 * Hide element's text for image or `::before` icon replacement.
 *
 * ```ts
 * hideText_css('soft')
 * ```
 *
 * Applies nowrap + hide overflow. \
 * Great for ::before inline-block icons.
 *
 * ```ts
 * hideText_css()
 * hideText_css('normal')
 * ```
 *
 * `soft` + indents text into the overflow \
 * Great for most background-image applications
 *
 * ```ts
 * hideText_css('hard')
 * ```
 *
 * `normal` + transparency + collapsed letter-spacing. \
 * Verbose version for weird edge-cases, with long paragraphs of text
 * and/or cases where nasty inherited text-styling causes trouble.
 */
export const hideText_css = (mode: HideMode = 'normal') => {
  return css`
    overflow: hidden;
    white-space: nowrap;
    ${mode !== 'soft' && nonSoftStyles}
    ${mode === 'hard' && hardStyles}
  `;
};
