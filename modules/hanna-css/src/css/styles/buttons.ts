/* eslint-disable unused-imports/no-unused-imports-ts */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, px } from 'es-in-css';

import { between_phone_netbook, between_tablet_netbook } from '../../lib/between';
import { mq } from '../../lib/breakpoints';
import { buildVariables } from '../../lib/cssutils';
import { hannaVars as vars } from '../../lib/hannavars';
import { iconStyle } from '../../lib/icons';
import { WARNING__ } from '../../lib/WARNING__';
import {
  hoverActiveKeyboardFocus_selector,
  keyboardFocus_selector,
} from '../utils/focus-selectors';
import { prem } from '../utils/miscUtils';

import { LinkStyle_Reset } from './links';

import { enableDataIcon } from '../Icon.css';

// ---------------------------------------------------------------------------

export const ButtonVariables = buildVariables([
  'Button__color',
  'Button__color__active',
  'Button__textColor',
  'Button__textColor__active',
  'Button__backgroundColor',
  'Button__backgroundColor__active',
  'Button__border',
  'Button__height',
  'Button__iconOutdent',
  'Button__iconSpace',
]);
const bVars = ButtonVariables.vars;

export const ButtonStyle = () => css`
  ${LinkStyle_Reset(true)}
  ${ButtonVariables.declare({
    Button__color: vars.color_faxafloi_100,
    Button__color__active: vars.color_faxafloi_150,
    Button__textColor: vars.color_suld_0,
    Button__textColor__active: vars.color_suld_0,
    Button__backgroundColor: bVars.Button__color,
    Button__backgroundColor__active: bVars.Button__color__active,
    Button__border: 0,
    Button__height: vars.space_8,
    Button__iconOutdent: vars.space_0$5__neg,
    Button__iconSpace: vars.space_1,
  })}

  // normalize links
  white-space: nowrap;
  vertical-align: middle;

  color: ${bVars.Button__textColor};

  background-color: ${bVars.Button__backgroundColor};
  display: inline-block;
  font: ${vars.font_button};
  font-weight: ${vars.font_weight__bold};
  border: ${bVars.Button__border} solid ${bVars.Button__color};
  line-height: calc(${bVars.Button__height} - 2 * ${bVars.Button__border});
  margin-right: ${vars.Button__gapH};
  margin-bottom: ${vars.Button__gapV};
  text-align: center;
  border-radius: ${prem(3)};
  position: relative;
  transition: all 200ms ease-in;
  transition-property: border-color, background-color, color, text-shadow, box-shadow;
  padding: 0 ${between_phone_netbook(24, 32)};
  width: max-content;
  max-width: 100%;
  min-width: ${between_phone_netbook(80, 128)};

  @media ${mq.wide} {
    min-width: 128px;
    padding-left: 32px;
    padding-right: 32px;
  }

  ${hoverActiveKeyboardFocus_selector()(css`
    outline: 0;
    text-decoration: none;
    // box-shadow: 0 prem(12) prem(16) rgba(black, 0.09);
    box-shadow: 0 prem(8) prem(16) rgba(black, 0.15);
    color: var(--Button--textColor);
    border: var(--Button--border) solid var(--Button--color);
  `)}

  &:active,
  &[aria-pressed='true'] {
    text-decoration: none;
    ${ButtonVariables.override({
      Button__color: bVars.Button__color__active,
      Button__textColor: bVars.Button__textColor__active,
      Button__backgroundColor: bVars.Button__backgroundColor__active,
    })}
  }

  ${keyboardFocus_selector(css`
    outline: ${prem(2)} solid ${bVars.Button__color};
    outline-offset: ${prem(2)};
  `)}

  &[disabled],
  &[aria-disabled='true'] {
    box-shadow: none;
    opacity: 0.3;
  }

  &--wide {
    min-width: ${between_tablet_netbook(275, 312)};

    @media ${mq.phone_phablet} {
      width: 100%;
    }
    @media ${mq.wide} {
      min-width: 312px;
    }
  }
  &--small {
    ${ButtonVariables.override({
      Button__iconOutdent: vars.space_0$5__neg,
      Button__iconSpace: vars.space_1,
      Button__height: prem(40),
    })}
    padding-left: ${between_phone_netbook(16, 24)};
    padding-right: ${between_phone_netbook(16, 24)};

    @media ${mq.wide} {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  &--go--back {
    order: -10;
  }
  &--go--back::before {
    ${iconStyle(vars.icon__arrow_left)}
    margin-left: ${bVars.Button__iconOutdent};
    margin-right: ${bVars.Button__iconSpace};
  }
  &--go--forward {
    order: 10;
    margin-left: auto;
  }
  &--go--forward::after {
    ${iconStyle(vars.icon__arrow_right)}
    margin-right: ${bVars.Button__iconOutdent};
    margin-left: ${bVars.Button__iconSpace};
  }

  &[data-icon]::before {
    ${enableDataIcon}
    margin-left: var(--Button--iconOutdent);
    margin-right: var(--Button--iconSpace);
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

// ===========================================================================
//
// ===========================================================================
//
// ===========================================================================

export const ButtonTertiaryVariables = buildVariables([
  'ButtonTertiary__height',
  'ButtonTertiary__color',
  'ButtonTertiary__dashColor',
  'ButtonTertiary__dashWidth',
  'ButtonTertiary__hover__dashWidth',
  'ButtonTertiary__dashSpace',
  'ButtonTertiary__dashHeight',
  'ButtonTertiary__gapH',
]);
const btVars = ButtonTertiaryVariables.vars;

const ButtonTertiaryVarDeclarations = () => css`
  :root {
    ${ButtonTertiaryVariables.declare({
      ButtonTertiary__height: `calc(${vars.font_button_leading} + 4px)`,
      ButtonTertiary__color: '_inherit',
      ButtonTertiary__dashColor: vars.color_faxafloi_100,
      ButtonTertiary__dashWidth: vars.space_2,
      ButtonTertiary__hover__dashWidth: vars.space_4,
      ButtonTertiary__dashSpace: vars.space_2,
      ButtonTertiary__dashHeight: px(2),
      ButtonTertiary__gapH: between_phone_netbook(16, 24),
    })}
  }
`;

export const ButtonTertiaryStyle__hoverFocus = () => css`
  ${hoverActiveKeyboardFocus_selector()(css`
    padding-left: calc(
      ${btVars.ButtonTertiary__dashSpace} + ${btVars.ButtonTertiary__hover__dashWidth}
    );
    padding-right: prem(0);
    color: ${btVars.ButtonTertiary__color};
    outline: 0;

    &::before {
      width: ${btVars.ButtonTertiary__hover__dashWidth};
    }
  `)}

  &:active::before {
    width: ${btVars.ButtonTertiary__dashWidth};
  }

  ${keyboardFocus_selector(css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: ${prem(-13)} ${prem(-16)};
      border: ${prem(1)} dotted ${btVars.ButtonTertiary__dashColor};
      border-radius: ${prem(8)};
    }
  `)}
`;

export const ButtonTertiaryStyle__disabled = () => css`
  &[disabled],
  &[aria-disabled='true'] {
    ${ButtonTertiaryVariables.override({
      ButtonTertiary__hover__dashWidth: btVars.ButtonTertiary__dashWidth,
      ButtonTertiary__dashColor: 'currentColor',
      ButtonTertiary__color: '_inherit',
    })}
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const ButtonTertiaryStyle = (isStatic = false) => css`
  ${LinkStyle_Reset(true)}

  color: ${btVars.ButtonTertiary__color};
  position: relative;
  display: inline-block;
  width: max-content;
  max-width: 100%;
  vertical-align: middle;
  font: ${vars.font_button};
  padding: 2px 0;
  padding-left: calc(
    ${btVars.ButtonTertiary__dashSpace} + ${btVars.ButtonTertiary__dashWidth}
  );
  padding-right: calc(
    ${btVars.ButtonTertiary__hover__dashWidth} - ${btVars.ButtonTertiary__dashWidth}
  );
  margin-right: ${btVars.ButtonTertiary__gapH};
  margin-bottom: ${vars.space_1};
  font-weight: 700;
  transition: all 100ms ease-in;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: ${btVars.ButtonTertiary__dashWidth};
    height: ${btVars.ButtonTertiary__dashHeight};
    display: inline-block;
    vertical-align: middle;
    background-color: currentColor;
    color: ${btVars.ButtonTertiary__dashColor};
    transform: translateY(-50%);
    transition: inherit;
  }

  ${!isStatic && ButtonTertiaryStyle__hoverFocus}
`;
