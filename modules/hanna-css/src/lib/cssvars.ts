import { css, px } from 'es-in-css';

import { cssVersion } from '../../package-server.json';

import { between_cols, between_phone_netbook, between_Topmenu } from './between';
import { breakpointVarDeclarations, breakpointVars, mq } from './breakpoints';
import { colorVarDeclarations, colorVars } from './colors';
import { buildVariables } from './cssutils';
import { fontVarDeclarations, fontVars } from './font';
import { grid } from './grid';
import { gridVarDeclarations, gridVars } from './gridVars';
import { linkVarDeclarations, linkVars } from './links';
import { themeVarDeclarations, themeVars } from './themes';

const envVars = buildVariables(['cssVersion', 'browser_scrollbar_width']);
const envVarDeclarations = envVars.declare({
  cssVersion: `"${cssVersion}"`,
  // NOTE: This variable receives its actual value
  // somewhere off in JavaScript-land.
  // (Likely set by `@hugsmidjan/qj/getScrollbarWidth.setCSSvar()`)
  browser_scrollbar_width: px(16),
});

// ---------------------------------------------------------------------------

const zIndexVars = buildVariables([
  'zindex__sr_only',
  'zindex__modal',
  'zindex__header',
  'zindex__overlay',
  'zindex__Bling__overlay',
  'zindex__Bling',
]);
const zIndexVarDeclarations = zIndexVars.declare({
  zindex__sr_only: 99999, // A11y keyboard/focus layer
  zindex__modal: 1000,
  zindex__header: 100,
  zindex__overlay: 10,
  zindex__Bling__overlay: 2,
  zindex__Bling: -10,
});

// ---------------------------------------------------------------------------

const spaceVars = buildVariables([
  'space_1',
  'space_2',
  'space_3',
  'space_4',
  'space_5',
  'space_6',
  'space_7',
  'space_8',
  'space_9',
  'space_0$5',
  'space_1$5',
  'space_1__neg',
  'space_2__neg',
  'space_3__neg',
  'space_4__neg',
  'space_5__neg',
  'space_6__neg',
  'space_7__neg',
  'space_8__neg',
  'space_9__neg',
  'space_0$5__neg',
  'space_1$5__neg',
  'component_vspace__small',
  'component_vspace__medium',
  'component_vspace__large',
  'component_vspace__xlarge',
]);

const spaceVarDeclarations = spaceVars.declare({
  space_1: grid.unit * 1,
  space_2: grid.unit * 2,
  space_3: grid.unit * 3,
  space_4: grid.unit * 4,
  space_5: grid.unit * 5,
  space_6: grid.unit * 6,
  space_7: grid.unit * 7,
  space_8: grid.unit * 8,
  space_9: grid.unit * 9,

  space_0$5: grid.unit * 0.5,
  space_1$5: grid.unit * 1.5,

  space_1__neg: grid.unit * -1,
  space_2__neg: grid.unit * -2,
  space_3__neg: grid.unit * -3,
  space_4__neg: grid.unit * -4,
  space_5__neg: grid.unit * -5,
  space_6__neg: grid.unit * -6,
  space_7__neg: grid.unit * -7,
  space_8__neg: grid.unit * -8,
  space_9__neg: grid.unit * -9,

  space_0$5__neg: grid.unit * -0.5,
  space_1$5__neg: grid.unit * -1.5,

  component_vspace__small: between_cols(30, 70),
  component_vspace__medium: between_cols(40, 100),
  component_vspace__large: between_cols(50, 130),
  component_vspace__xlarge: between_cols(70, 200),
});

// ---------------------------------------------------------------------------

const layoutVars = buildVariables([
  'Layout$$header_height',
  'Layout$$header_backgroundColor',
]);

const _lHead_min = 96;
const _lHead_max = 136;

const layoutVarDeclarations = css`
  ${layoutVars.declare({
    Layout$$header_height: px(_lHead_min),
    Layout$$header_backgroundColor: 'transparent',
  })}
  @media ${mq.Topmenu} {
    ${layoutVars.override({
      Layout$$header_height: between_Topmenu(_lHead_min, _lHead_max),
    })}
  }
  @media ${mq.wide} {
    ${layoutVars.override({
      Layout$$header_height: px(_lHead_max),
    })}
  }
`;

// ---------------------------------------------------------------------------

const mainMenuVars = buildVariables(['MainMenu_accentcolor', 'MainMenu_background']);
const mainMenuVarDeclarations = mainMenuVars.declare({
  MainMenu_accentcolor: colorVars.vars.color_faxafloi_100,
  MainMenu_background: colorVars.vars.color_faxafloi_100,
});

// ---------------------------------------------------------------------------

const borderEffectVars = buildVariables(['border_default', 'border_dark']);
const borderEffectVarDeclarations = borderEffectVars.declare({
  border_default: `1px solid ${colorVars.vars.color_suld_75}`,
  border_dark: `1px solid ${colorVars.vars.color_suld_150}`,
});

// ---------------------------------------------------------------------------

const buttonVars = buildVariables(['Button__gapH', 'Button__gapV']);

const buttonVarDeclarations = css`
  ${buttonVars.declare({
    Button__gapH: between_phone_netbook(16, 32),
    Button__gapV: spaceVars.vars.space_2,
  })}

  @media ${mq.wide} {
    ${buttonVars.override({
      Button__gapH: px(32),
    })}
  }
`;

// ---------------------------------------------------------------------------

const hannaVars = buildVariables.join(
  envVars,
  breakpointVars,
  colorVars,
  themeVars,
  linkVars,
  mainMenuVars,
  gridVars,
  fontVars,
  layoutVars,
  zIndexVars,
  spaceVars,
  borderEffectVars,
  buttonVars
);

export const cssVars = hannaVars.vars;
export const cssVarOverride = hannaVars.override;

export const cssVarDeclarations = [
  envVarDeclarations,
  breakpointVarDeclarations,
  colorVarDeclarations,
  linkVarDeclarations,
  zIndexVarDeclarations,
  gridVarDeclarations,
  spaceVarDeclarations,
  layoutVarDeclarations,
  mainMenuVarDeclarations,
  themeVarDeclarations,
  fontVarDeclarations,
  borderEffectVarDeclarations,
  buttonVarDeclarations,
].join('');

export type HannaCssVarToken = keyof typeof cssVars;
