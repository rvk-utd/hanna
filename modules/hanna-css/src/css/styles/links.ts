import { css } from 'es-in-css';

import { hannaVarOverride, hannaVars as vars } from '../../lib/hannavars.js';

const _LinkStyle__basic = () => css`
  text-decoration: none;
  color: ${vars.link_color};
  font-weight: ${vars.link_weight};
  padding-bottom: ${vars.link_underline_offset};
  border-bottom: ${vars.link_underline};
  transition: ${vars.link_transition};
  transition-property: border-color, background-color, color, text-shadow, box-shadow,
    outline;
`;

const _LinkStyle__hover = () => css`
  color: ${vars.link_color__hover};
  border-bottom: ${vars.link_underline__hover};
`;

/**
 * Use to style `<button>`s and style-reset anchor elements to look like basic
 * text links with Hanna's default `:hover` styling, etc.
 */
export const LinkStyle = () => css`
  ${_LinkStyle__basic}

  &:hover,
  &:active {
    ${_LinkStyle__hover}
  }
`;

/**
 * Sets the ugly default high-contrast :focus-visible outline on an element.
 * Only really useful in `-basics.css` as a global default reset.
 */
export const LinkStyle__focusOutline = () => css`
  outline: ${vars.link_focus_outline};
  outline-color: ${vars.link_focus_outlineColor};
  outline-offset: ${vars.link_focus_outlineOffset};
`;

/**
 * Use this where you need to use anchor tags that shouldn't look like text-links.
 *
 * Does not reset the `:hover` style unless `hover` parameter is set to `true` or
 * `'no-hover'`.
 *
 * If the `hover` parameter is set to `'no-underline'`, it removes the underline,
 * but the element retains its `:hover` color-change.
 */
export const LinkStyle_Reset = (hover: boolean | 'noborder' = false) => css`
  ${hannaVarOverride({
    link_color: '_inherit',
    link_weight: '_inherit',
    link_underline: 'none',
  })}
  // NOTE: This intentionally doesn't reset the :hover style
  // unless..
  ${hover &&
  hannaVarOverride({
    link_color__hover: hover !== 'noborder' && vars.link_color,
    link_underline__hover: 'none',
    link_underline_offset: 0,
  })}
`;

/**
 * Use this where the local link color should be the same as the surrounding text
 * color.
 *
 *  It applies a subtle "hairline" underline to indicate that it's a link, and
 *  adds subtle, same-color `:hover` styling.
 */
export const LinkStyle_SameColor = () => css`
  ${hannaVarOverride({
    link_color: '_inherit',
    link_color__hover: vars.link_color,
    link_underline: vars.link_underline__hairline,
    link_underline__hover: '2px solid currentColor',
  })}
  ${/* TODO: figure out if we can safely remove this */ ''}
  --ButtonTertiary--dashColor: currentColor; // ${vars.theme_color_primary__dark};
`;
