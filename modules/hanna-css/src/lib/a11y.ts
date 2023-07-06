import { ColorValue, css, RawCssString, VariablePrinter } from 'es-in-css';

import { hannaVars as vars } from './hannavars.js';

// ---------------------------------------------------------------------------

/**  */
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

// ---------------------------------------------------------------------------

const defaultLink = () => vars.link_color__hover;
const defaultBg = () => vars.color_suld_0;
const defaultBorder = () => `3px double ${vars.link_color__hover}`;
const focusLinkZindex = () => vars.zindex__sr_only;

type Mode = 'normal' | 'soft' | 'hard';
type Dir = 'ltr' | 'rtl';

type SROnlyFocusProps = {
  link?: `#${string}` | ColorValue | VariablePrinter;
  border?: string;
  bg?: `#${string}` | ColorValue | VariablePrinter;
};

const sr_focusStyling = ({ link, border, bg }: Required<SROnlyFocusProps>) => css`
  z-index: ${focusLinkZindex};
  font-size: 1em;
  background: ${bg};
  border: ${border};
  margin: 0;
  padding: 0.2em 0.33em;
  color: ${link};
  text-shadow: none;
  white-space: nowrap;
`;

// ---------------------------------------------------------------------------

/**
 * Mixin that hides an element visually, but still makes it accessible to screen readers.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#sronly-mixin
 */
export const srOnly = (mode: Mode = 'normal') => css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  opacity: 0.00001;
  pointer-events: none;
  ${mode !== 'soft' &&
  css`
    margin: -1px;
  `}
`;

/**
 * Overrides/reverses the effects of the `srOnly` mixin.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#sronly-mixin
 */
export const srOnly__undo = (mode: Mode = 'normal') => css`
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  opacity: 1;
  pointer-events: auto;
  ${mode !== 'soft' &&
  css`
    margin: 0;
  `}
`;

/**
 * Similar to the `srOnly` mixin, but intended for links/buttons that should
 * become visible on keyboard focus (`:focus-visible`).
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#sronly_focusable-mixin
 */
export const srOnly_focusable = ({
  link = defaultLink(),
  border = defaultBorder(),
  bg = defaultBg(),
}: SROnlyFocusProps) => {
  const focusStyling = css`
    ${srOnly__undo()}
    ${sr_focusStyling({ link, border, bg })}
  `;

  return css`
    ${srOnly()};

    ${keyboardFocus_selector(focusStyling)}
    &:focus-within:not(:focus) {
      ${focusStyling}
    }
  `;
};

/**
 * Similar to the `srOnly_focusable` mixin above, but for non-interactive
 * elements that **contain** buttons/links that should become visible on keyboard
 * focus.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#sronly_focusablecontent-mixin
 */
export const srOnly_focusableContent = ({
  link = defaultLink(),
  border = defaultBorder(),
  bg = defaultBg(),
  dir = 'ltr',
}: SROnlyFocusProps & { dir?: Dir }) => {
  const edge = dir === 'ltr' ? 'right' : 'left';
  const opposite = dir === 'ltr' ? 'left' : 'right';

  return css`
    position: absolute;
    ${edge}: 9999px;
    ${opposite}: auto;

    a:focus,
    a:active,
    button:focus {
      ${edge}: -9999px;
      ${sr_focusStyling({ link, border, bg })}
    }
  `;
};
