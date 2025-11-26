import { css, px } from 'es-in-css';

import { hoverKeyboardFocusAndActiveStyling } from '../../lib/a11y.js';
import { scale_phone_netbook, scale_tablet_netbook } from '../../lib/between.js';
import { mq } from '../../lib/breakpoints.js';
import { buildVariables } from '../../lib/cssutils.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { iconStyle } from '../../lib/icons.js';
import { LinkStyle_Reset } from '../../lib/links.js';
import { WARNING__ } from '../../lib/WARNING__.js';
import { prem } from '../utils/miscUtils.js';

import { enableDataIcon } from '../Icon.css.js';

// ---------------------------------------------------------------------------

export const ButtonVariables = buildVariables(
  [
    'color',
    'color__active',
    'textColor',
    'textColor__active',
    'backgroundColor',
    'backgroundColor__active',
    'border',
    'height',
    'iconOutdent',
    'iconSpace',
  ],
  'Button'
);
const bVars = ButtonVariables.vars;

type ButtonStyleOptions = {
  overrides?: Partial<Parameters<typeof ButtonVariables.declare>[0]>;
};

export const ButtonStyle = (opts: ButtonStyleOptions = {}) => {
  return css`
    ${LinkStyle_Reset(true)}
    ${ButtonVariables.declare({
      color: vars.color_faxafloi_100,
      color__active: vars.color_faxafloi_150,
      textColor: vars.color_suld_0,
      textColor__active: vars.color_suld_0,
      backgroundColor: bVars.color,
      backgroundColor__active: bVars.color__active,
      border: px(0), // Must have a unit, because it gets used inside a calc()
      height: vars.space_7,
      iconOutdent: vars.space_0$5__neg,
      iconSpace: vars.space_1,
      ...opts.overrides,
    })}

     /* normalize links */
    white-space: nowrap;
    vertical-align: middle;

    color: ${bVars.textColor};

    background-color: ${bVars.backgroundColor};
    display: inline-block;
    font: ${vars.font_button};
    border: ${bVars.border} solid ${bVars.color};
    line-height: calc(${bVars.height} - 2 * ${bVars.border});
    margin-right: ${vars.Button__gapH};
    margin-bottom: ${vars.Button__gapV};
    text-align: center;
    border-radius: ${prem(3)};
    position: relative;
    transition: all 200ms ease-in;
    transition-property: border-color, background-color, color, text-shadow, box-shadow;
    padding: 0 ${scale_phone_netbook(24, 32)};
    width: max-content;
    max-width: 100%;
    min-width: ${scale_phone_netbook(80, 128)};

    @media ${mq.wide} {
      min-width: 128px;
      padding-left: 32px;
      padding-right: 32px;
    }

    ${hoverKeyboardFocusAndActiveStyling(css`
      outline: 0;
      text-decoration: none;
      box-shadow: ${vars.boxShadow_hover};
      color: ${bVars.textColor};
      border: ${bVars.border} solid ${bVars.color};
    `)}

    &:active,
    &[aria-pressed='true'] {
      text-decoration: none;
      ${ButtonVariables.override({
        color: bVars.color__active,
        textColor: bVars.textColor__active,
        backgroundColor: bVars.backgroundColor__active,
      })}
    }

    &:focus-visible {
      outline: ${prem(2)} solid ${bVars.color};
      outline-offset: ${prem(2)};
    }

    &:disabled,
    &[aria-disabled='true'] {
      box-shadow: none;
      opacity: 0.3;
    }

    &--wide {
      min-width: ${scale_tablet_netbook(275, 312)};

      @media ${mq.phone_phablet} {
        width: 100%;
      }
      @media ${mq.wide} {
        min-width: 312px;
      }
    }
    &--small {
      ${ButtonVariables.override({
        iconOutdent: vars.space_0$5__neg,
        iconSpace: vars.space_1,
        height: prem(40),
      })}
      min-width: ${scale_phone_netbook(64, 96)};
      padding-left: ${scale_phone_netbook(16, 24)};
      padding-right: ${scale_phone_netbook(16, 24)};

      @media ${mq.wide} {
        min-width: 96px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    &--go--back {
      order: -10;
    }
    &--go--back::before {
      ${iconStyle(vars.icon__arrow_left)}
      margin-left: ${bVars.iconOutdent};
      margin-right: ${bVars.iconSpace};
    }
    &--go--forward {
      order: 10;
      margin-left: auto;
    }
    &--go--forward::after {
      ${iconStyle(vars.icon__arrow_right)}
      margin-right: ${bVars.iconOutdent};
      margin-left: ${bVars.iconSpace};
    }

    &[data-icon]::before {
      ${enableDataIcon}
      margin-left: ${bVars.iconOutdent};
      margin-right: ${bVars.iconSpace};
    }

    // ---------------------------------------------------------------------------

    &--small&--wide {
      ${WARNING__('`--small` and `--wide` do NOT mix.')}
    }
    &--go--back[data-icon],
    &--go--forward[data-icon] {
      ${WARNING__('Icons and `--go--(back|forward)` do NOT mix.')}
    }
    &--go-back&--destructive,
    &--go--forward&--destructive {
      ${WARNING__('`--destructive` and `--go--(back|forward)` do NOT mix')}
    }
  `;
};

// ===========================================================================
//
// ===========================================================================
//
// ===========================================================================

export const ButtonTertiaryVariables = buildVariables(
  [
    'height',
    'color',
    'dashColor',
    'dashWidth',
    'hover__dashWidth',
    'dashSpace',
    'dashHeight',
    'gapH',
  ],
  'ButtonTertiary'
);
const btVars = ButtonTertiaryVariables.vars;

/**
 * `ButtonTertiaryStyle()` is a mixin that is used in multiple situations —
 * a bit similar to `LinkStyle()` and friends.
 * Therefore these declarations are inlined in `-basics.css.ts`
 * (via `hannaVarDeclarations.ts`)
 */
export const ButtonTertiaryVarDeclarations = () => css`
  ${ButtonTertiaryVariables.declare({
    height: `calc(${vars.font_button_leading} + 4px)`,
    color: '_inherit',
    dashColor: vars.color_faxafloi_100,
    dashWidth: vars.space_2,
    hover__dashWidth: vars.space_4,
    dashSpace: vars.space_2,
    dashHeight: px(2),
    gapH: scale_phone_netbook(16, 24),
  })}

  @media ${mq.wide} {
    ${ButtonTertiaryVariables.override({
      gapH: px(24),
    })}
  }
`;

export const ButtonTertiaryStyle__hoverFocus = () => css`
  ${hoverKeyboardFocusAndActiveStyling(css`
    --dashWidth: ${btVars.hover__dashWidth};
    color: ${btVars.color};
    outline: 0;
  `)}

  &:active::before {
    width: ${btVars.dashWidth};
  }

  &:focus-visible::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: ${prem(-13)} ${prem(-16)};
    border: ${prem(1)} dotted ${btVars.dashColor};
    border-radius: ${prem(8)};
  }
`;

export const ButtonTertiaryStyle__disabled = () => css`
  &:disabled,
  &[aria-disabled='true'] {
    --dashWidth: ${btVars.dashWidth};
    ${ButtonTertiaryVariables.override({
      dashColor: 'currentColor',
      color: '_inherit',
    })}
    opacity: 0.5;
    pointer-events: none;
  }
`;

// ---------------------------------------------------------------------------

export const ButtonTertiaryStyle = (isStatic = false) => css`
  ${LinkStyle_Reset(true)}

  color: ${btVars.color};
  position: relative;
  display: inline-block;
  width: max-content;
  max-width: 100%;
  vertical-align: middle;
  font: ${vars.font_button};
  padding: 2px 0;
  --dashWidth: ${btVars.dashWidth};
  padding-left: calc(${btVars.dashSpace} + var(--dashWidth));
  padding-right: calc(${btVars.hover__dashWidth} - var(--dashWidth));
  margin-right: ${btVars.gapH};
  margin-bottom: ${vars.space_1};
  transition: all 100ms ease-in;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: var(--dashWidth);
    height: ${btVars.dashHeight};
    display: inline-block;
    vertical-align: middle;
    background-color: currentColor;
    color: ${btVars.dashColor};
    transform: translateY(-50%);
    transition: inherit;
  }

  ${!isStatic && ButtonTertiaryStyle__hoverFocus}
`;

export const ButtonTertiaryStyle__backArrow = () => css`
  ${iconStyle(vars.icon__arrow_left_long)}
  background: 0;
  height: auto;
  font-size: 0.75em;
  overflow: hidden;
`;
