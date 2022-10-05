import { css, RawCssString } from 'es-in-css';

export const keyboardFocus_selector = (content: RawCssString) => css`
  &[data-focus-visible-added] {
    ${content};
  }
  &:focus-visible {
    ${content};
  }
`;

export const hoverActiveKeyboardFocus_selector =
  (active = true) =>
  (content: RawCssString) =>
    css`
      ${active && '&:active'},
      &:hover,
      &[data-focus-visible-added] {
        ${content};
      }
      &:focus-visible {
        ${content};
      }
    `;

/**
 * If you already set a universal (old-school) :focus style and
 * you want to revert/hide those styles in supporting browsers
 */
export const nonKeyboardFocus_selector = (content: RawCssString) => css`
  [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
    ${content};
  }
  &:focus:not(:focus-visible) {
    ${content};
  }
`;

// ===========================================================================

export const setDefaultKeyboardFocusStyle = (content: RawCssString) => css`
  *:focus:focus,
  *:focus[data-focus-visible-added] {
    ${content};
  }
  *:focus-visible:focus-visible {
    ${content};
  }
`;

export const setDefaultNonKeyboardFocusStyle = (content: RawCssString) => css`
  *:focus[tabindex='-1'],
  [data-js-focus-visible] *:focus:not([data-focus-visible-added]) {
    ${content};
  }
  *:focus:not(:focus-visible) {
    ${content};
  }
`;
