import { css } from 'es-in-css';

import { hannaVarOverride, hannaVars as vars } from '../../lib/hannavars.js';

export const LinkStyle__basic = () => css`
  text-decoration: none;
  color: ${vars.link_color};
  font-weight: ${vars.link_weight};
  padding-bottom: ${vars.link_underline_offset};
  border-bottom: ${vars.link_underline};
  transition: ${vars.link_transition};
  transition-property: border-color, background-color, color, text-shadow, box-shadow,
    outline;
`;

export const LinkStyle__hover = () => css`
  color: ${vars.link_color__hover};
  border-bottom: ${vars.link_underline__hover};
`;

export const LinkStyle__focusOutline = () => css`
  outline: ${vars.link_focus_outline};
  outline-color: ${vars.link_focus_outlineColor};
  outline-offset: ${vars.link_focus_outlineOffset};
`;

export const LinkStyle = () => css`
  ${LinkStyle__basic}

  &:hover,
  &:active {
    ${LinkStyle__hover}
  }
`;

/**
 * Use this where you need to use anchor tags
 * That shouldn't look like text-links
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
 * Use this where the local link color
 * is the same as the surrounding text color.
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
