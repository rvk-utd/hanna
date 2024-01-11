import { css, CssString } from 'es-in-css';

export {
  hoverKeyboardFocusAndActiveStyling,
  keyboardFocusStyling,
} from '../../lib/a11y.js';

/**
 * If you already set a universal (old-school) :focus style and
 * you want to revert/hide those styles in supporting browsers
 */
export const nonKeyboardFocusStyling = (content: CssString | string) => css`
  [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
    ${content};
  }
  &:focus:not(:focus-visible) {
    ${content};
  }
`;

// ===========================================================================

export const setDefaultKeyboardFocusStyle = (content: CssString | string) => css`
  *:focus:focus,
  *:focus[data-focus-visible-added] {
    ${content};
  }
  *:focus-visible:focus-visible {
    ${content};
  }
`;

export const setDefaultNonKeyboardFocusStyle = (content: CssString | string) => css`
  *:focus[tabindex='-1'],
  [data-js-focus-visible] *:focus:not([data-focus-visible-added]) {
    ${content};
  }
  *:focus:not(:focus-visible) {
    ${content};
  }
`;
