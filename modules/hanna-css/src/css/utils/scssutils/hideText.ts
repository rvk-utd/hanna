import { css } from 'es-in-css';

// TODO: Convert to JsDoc?
// Hide element's text for image or ::before icon replacement
//
//   @include hideText(soft)
//      Applies nowrap + hide overflow.
//      Great for ::before inline-block icons.
//
//   @include hideText()
//   @include hideText(normal)
//      `soft` + indents text into the overflow
//      Great for most background-image applications
//
//   @include hideText(hard)
//      `normal` + transparency + collapsed letter-spacing.
//      Verbose version for weird edge-cases, with
//      long paragraphs of text and/or cases where
//      nasty inherited text-styling causes trouble.
//

export const hideText_css = (mode: 'normal' | 'soft' | 'hard' = 'normal') => css`
  overflow: hidden;
  white-space: nowrap;
  ${mode !== 'soft' &&
  css`
    text-indent: 150%;
    text-align: left;
  `}
  ${mode !== 'hard' &&
  css`
    letter-spacing: -0.4em;
    text-shadow: none !important;
    color: transparent !important;
  `}
`;
