import { ObjectKeys } from '@reykjavik/hanna-utils';

import { buildVariables } from './cssutils';
import iconfonttokens from './iconfonttokens';

export const envVars = buildVariables(['cssVersion', 'browser_scrollbar_width']);

// ---------------------------------------------------------------------------

/** CSS variables with pixel value `min-witdh`s of the Hanna responsive
 * breakpoints.
 *
 * BTW: `bp_w_phone` is the **minimum** supported width, although the
 * "phone" format technically doesn't have a lower limit.
 *
 * BTW 2: `bp_w_Hamburger` is the **upper** limit of where the Hamburger
 * menu turns into a Topmenu
 */
export const breakpointVars = buildVariables([
  'bp_w_phone',
  'bp_w_phablet',
  'bp_w_tablet',
  'bp_w_netbook',
  'bp_w_wide',
  'bp_w_Hamburger',
]);

// ---------------------------------------------------------------------------

/** CSS variables for the Hanna color pallette */
export const colorVars = buildVariables([
  'color_esja_25',
  'color_esja_50',
  'color_esja_75',
  'color_esja_100',
  'color_esja_150',

  'color_faxafloi_25',
  'color_faxafloi_50',
  'color_faxafloi_75',
  'color_faxafloi_100',
  'color_faxafloi_150',

  'color_nautholsvik_25',
  'color_nautholsvik_50',
  'color_nautholsvik_75',
  'color_nautholsvik_100',
  'color_nautholsvik_150',

  'color_heidmork_25',
  'color_heidmork_50',
  'color_heidmork_75',
  'color_heidmork_100',
  'color_heidmork_150',

  'color_ellidaardalur_25',
  'color_ellidaardalur_50',
  'color_ellidaardalur_75',
  'color_ellidaardalur_100',
  'color_ellidaardalur_150',

  'color_blafjoll_25',
  'color_blafjoll_50',
  'color_blafjoll_75',
  'color_blafjoll_100',
  'color_blafjoll_150',

  'color_sund_25',
  'color_sund_50',
  'color_sund_75',
  'color_sund_100',
  'color_sund_150',

  'color_rokkur_25',
  'color_rokkur_50',
  'color_rokkur_75',
  'color_rokkur_100',
  'color_rokkur_150',

  'color_suld_0',
  'color_suld_25',
  'color_suld_50',
  'color_suld_75',
  'color_suld_100',
  'color_suld_150',
  'color_suld_200',

  'color_white',
  'color_blackish',
]);

// ---------------------------------------------------------------------------

/** CSS variables for semantic color-theme values */
export const themeVars = buildVariables([
  'theme_color_primary',
  'theme_color_primary_75',
  'theme_color_primary_50',
  'theme_color_primary_25',

  'theme_color_secondary',
  'theme_color_secondary_75',
  'theme_color_secondary_50',
  'theme_color_secondary_25',

  'theme_color_tertiary',
  'theme_color_tertiary_75',
  'theme_color_tertiary_50',
  'theme_color_tertiary_25',

  'theme_color_primary__text',
  'theme_color_primary__dark',
  'theme_color_primary__safe',
  // safe to use for ButtonTertiary borders, etc.
  'theme_color_primary__safeish',
]);

// ---------------------------------------------------------------------------

/** CSS variables for default text-link styling */
export const linkVars = buildVariables([
  'link_color',
  'link_color__hover',
  'link_weight',

  'link_underline__thickness',
  'link_underline',
  'link_underline__hover',
  'link_underline_offset',

  'link_transition',

  'link_focus_outlineColor',
  'link_focus_outline',
  'link_focus_outlineOffset',
]);

// ---------------------------------------------------------------------------

/** CSS variables for Hanna typhography */
export const fontVars = buildVariables([
  'font_family',
  'font_weight__normal',
  'font_weight__bold',

  'font_base_size',
  'font_base_leading',

  // Compound `font:` shortand property values
  'font_base',
  'font_hd_xl',
  'font_hd_l',
  'font_hd_m',
  'font_hd_s',
  'font_sh_l',
  'font_sh_l_thin',
  'font_sh_s',
  'font_bd_l',
  'font_bd_s',
  'font_button',
  'font_label',

  // headings
  'font_hd_xl_size',
  'font_hd_xl_leading',
  'font_hd_l_size',
  'font_hd_l_leading',
  'font_hd_m_size',
  'font_hd_m_leading',
  'font_hd_s_size',
  'font_hd_s_leading',

  // subheadings
  'font_sh_l_size',
  'font_sh_l_leading',
  'font_sh_s_size',
  'font_sh_s_leading',

  // body text
  'font_bd_l_size',
  'font_bd_l_leading',
  'font_bd_s_size',
  'font_bd_s_leading',

  // buttons and labels
  'font_button_size',
  'font_button_leading',
  'font_label_size',
  'font_label_leading',

  // v margins
  'baseVerticalMargin',
  'baseVerticalMargin_2',
]);

// ---------------------------------------------------------------------------

/** CSS variables for semantic z-index layering */
export const zIndexVars = buildVariables([
  'zindex__sr_only',
  'zindex__modal',
  'zindex__header',
  'zindex__overlay',
  'zindex__Bling__overlay',
  'zindex__Bling',
]);

// ---------------------------------------------------------------------------

/** CSS variables for the hanna 12 column grid system */
export const gridVars = buildVariables([
  'grid_margin',
  'grid_margin__neg',
  'grid_margin__right',
  'grid_margin__right__neg',

  'grid_0_1',
  'grid_1',
  'grid_1_1',
  'grid_2',
  'grid_2_2',
  'grid_3',
  'grid_3_3',
  'grid_4',
  'grid_4_4',
  'grid_5',
  'grid_5_5',
  'grid_6',
  'grid_6_6',
  'grid_7',
  'grid_7_7',
  'grid_8',
  'grid_8_8',
  'grid_9',
  'grid_9_9',
  'grid_10',
  'grid_10_10',
  'grid_11',
  'grid_11_11',
  'grid_12',

  'grid_gutter',
  'grid_column',

  'grid_0_1__neg',
  'grid_1__neg',
  'grid_gutter__neg',
  'grid_column__neg',
]);

// ---------------------------------------------------------------------------

/** CSS variables for standard spacing (combine with `calc()` for even more profit) */
export const spaceVars = buildVariables([
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

// ---------------------------------------------------------------------------

/** CSS variables with global Layout values */
export const layoutVars = buildVariables([
  'Layout$$header_height',
  'Layout$$header_backgroundColor',
]);

// ---------------------------------------------------------------------------

/** CSS variables with global MainMenu values  */
export const mainMenuVars = buildVariables([
  'MainMenu_accentcolor',
  'MainMenu_background',
]);

// ---------------------------------------------------------------------------

/** CSS variables for borders */
export const borderEffectVars = buildVariables(['border_default', 'border_dark']);

// ---------------------------------------------------------------------------

/** CSS variables for Button* spacing */
export const buttonVars = buildVariables(['Button__gapH', 'Button__gapV']);

// ---------------------------------------------------------------------------

/** CSS variables for Hanna icon types */
export const iconVars = buildVariables(ObjectKeys(iconfonttokens));

// ---------------------------------------------------------------------------

const _hannaVars = buildVariables.join(
  envVars,
  breakpointVars,
  colorVars,
  themeVars,
  linkVars,
  fontVars,
  zIndexVars,
  gridVars,
  spaceVars,
  layoutVars,
  mainMenuVars,
  borderEffectVars,
  buttonVars,
  iconVars
);

/**
 * Type-safe collection of CSS variables for use in your CSS code.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#hannavars
 */
export const hannaVars = _hannaVars.vars;

/**
 * This function provides a type-safe way to write local overrides for the Hanna
 * CSS variables. _Use sparingly, with caution!_
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#hannavaroverride
 */
export const hannaVarOverride = _hannaVars.override;

export type HannaCssVarToken = keyof typeof hannaVars;
