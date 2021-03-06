import { css, em, px, rem } from 'es-in-css';

import {
  between_cols,
  between_phablet_netbook,
  between_phone_netbook,
  between_Topmenu,
} from '../../lib/between';
import { bp, mq } from '../../lib/breakpoints';
import { colors } from '../../lib/colors';
import { font } from '../../lib/font';
import { cols_pct, cols_px, grid } from '../../lib/grid';
import {
  borderEffectVars,
  breakpointVars,
  buttonVars,
  colorVars,
  envVars,
  fontVars,
  gridVars,
  iconVars,
  layoutVars,
  linkVars,
  mainMenuVars,
  spaceVars,
  themeVars,
  zIndexVars,
} from '../../lib/hannavars';
import iconfonttokens from '../../lib/iconfonttokens';
import { cssVersion } from '../../lib/style-server-info';

const _c = colorVars.vars;
const _g = gridVars.vars;
const _f = fontVars.vars;

// ---------------------------------------------------------------------------

const envVarDeclarations = envVars.declare({
  cssVersion: `"${cssVersion}"`,
  // NOTE: This variable receives its actual value
  // somewhere off in JavaScript-land.
  // (Likely set by `@hugsmidjan/qj/getScrollbarWidth.setCSSvar()`)
  browser_scrollbar_width: px(16),
});

// ---------------------------------------------------------------------------

const breakpointVarDeclarations = breakpointVars.declare({
  bp_w_phone: bp.phone, // Widths below 320px are not supported
  bp_w_phablet: bp.phablet,
  bp_w_tablet: bp.tablet,
  bp_w_netbook: bp.netbook, // iPad in landscape orientation
  bp_w_wide: bp.wide,

  bp_w_Hamburger: breakpointVars.vars.bp_w_netbook,
});

const colorVarDeclarations =
  colorVars.declare({
    color_esja_25: colors.esja_25,
    color_esja_50: colors.esja_50,
    color_esja_75: colors.esja_75,
    color_esja_100: colors.esja_100,
    color_esja_150: colors.esja_150,

    color_faxafloi_25: colors.faxafloi_25,
    color_faxafloi_50: colors.faxafloi_50,
    color_faxafloi_75: colors.faxafloi_75,
    color_faxafloi_100: colors.faxafloi_100,
    color_faxafloi_150: colors.faxafloi_150,

    color_nautholsvik_25: colors.nautholsvik_25,
    color_nautholsvik_50: colors.nautholsvik_50,
    color_nautholsvik_75: colors.nautholsvik_75,
    color_nautholsvik_100: colors.nautholsvik_100,
    color_nautholsvik_150: colors.nautholsvik_150,

    color_heidmork_25: colors.heidmork_25,
    color_heidmork_50: colors.heidmork_50,
    color_heidmork_75: colors.heidmork_75,
    color_heidmork_100: colors.heidmork_100,
    color_heidmork_150: colors.heidmork_150,

    color_ellidaardalur_25: colors.ellidaardalur_25,
    color_ellidaardalur_50: colors.ellidaardalur_50,
    color_ellidaardalur_75: colors.ellidaardalur_75,
    color_ellidaardalur_100: colors.ellidaardalur_100,
    color_ellidaardalur_150: colors.ellidaardalur_150,

    color_blafjoll_25: colors.blafjoll_25,
    color_blafjoll_50: colors.blafjoll_50,
    color_blafjoll_75: colors.blafjoll_75,
    color_blafjoll_100: colors.blafjoll_100,
    color_blafjoll_150: colors.blafjoll_150,

    color_sund_25: colors.sund_25,
    color_sund_50: colors.sund_50,
    color_sund_75: colors.sund_75,
    color_sund_100: colors.sund_100,
    color_sund_150: colors.sund_150,

    color_rokkur_25: colors.rokkur_25,
    color_rokkur_50: colors.rokkur_50,
    color_rokkur_75: colors.rokkur_75,
    color_rokkur_100: colors.rokkur_100,
    color_rokkur_150: colors.rokkur_150,

    color_suld_0: colors.suld_0,
    color_suld_25: colors.suld_25,
    color_suld_50: colors.suld_50,
    color_suld_75: colors.suld_75,
    color_suld_100: colors.suld_100,
    color_suld_150: colors.suld_150,
    color_suld_200: colors.suld_200,

    color_white: colors.white,
    color_blackish: colors.blackish,
  }) +
  css`
    // @deprecated This was a typo (Will be removed in version v0.9)
    --color-ellidarardalur-25: ${_c.color_ellidaardalur_25};
    --color-ellidarardalur-50: ${_c.color_ellidaardalur_50};
    --color-ellidarardalur-75: ${_c.color_ellidaardalur_75};
    --color-ellidarardalur-100: ${_c.color_ellidaardalur_100};
    --color-ellidarardalur-150: ${_c.color_ellidaardalur_150};
  `;

// ---------------------------------------------------------------------------

const themeVarDeclarations = css`
  @at-root {
    :root:root,
    [data-color-theme][data-color-theme],
    [data-color-theme][data-color-theme='trustworthy'] {
      ${themeVars.declare({
        theme_color_primary: _c.color_faxafloi_100,
        theme_color_primary_75: _c.color_faxafloi_75,
        theme_color_primary_50: _c.color_faxafloi_50,
        theme_color_primary_25: _c.color_faxafloi_25,

        theme_color_secondary: _c.color_sund_100,
        theme_color_secondary_75: _c.color_sund_75,
        theme_color_secondary_50: _c.color_sund_50,
        theme_color_secondary_25: _c.color_sund_25,

        theme_color_tertiary: _c.color_ellidaardalur_100,
        theme_color_tertiary_75: _c.color_ellidaardalur_75,
        theme_color_tertiary_50: _c.color_ellidaardalur_50,
        theme_color_tertiary_25: _c.color_ellidaardalur_25,

        theme_color_primary__text: _c.color_white,
        theme_color_primary__dark: _c.color_faxafloi_150,
        theme_color_primary__safe: themeVars.vars.theme_color_primary,
        // safe to use for ButtonTertiary borders, etc.
        theme_color_primary__safeish: themeVars.vars.theme_color_primary,
      })}
    }

    [data-color-theme][data-color-theme='dependable'] {
      ${themeVars.override({
        theme_color_primary: _c.color_faxafloi_100,
        theme_color_primary_75: _c.color_faxafloi_75,
        theme_color_primary_50: _c.color_faxafloi_50,
        theme_color_primary_25: _c.color_faxafloi_25,

        theme_color_secondary: _c.color_nautholsvik_100,
        theme_color_secondary_75: _c.color_nautholsvik_75,
        theme_color_secondary_50: _c.color_nautholsvik_50,
        theme_color_secondary_25: _c.color_nautholsvik_25,

        theme_color_tertiary: _c.color_sund_100,
        theme_color_tertiary_75: _c.color_sund_75,
        theme_color_tertiary_50: _c.color_sund_50,
        theme_color_tertiary_25: _c.color_sund_25,

        // theme_color_primary__text,
        theme_color_primary__dark: _c.color_faxafloi_150,
        // theme_color_primary__safe,

        // theme_color_primary__safeish,
      })}
    }

    [data-color-theme][data-color-theme='friendly'] {
      ${themeVars.override({
        theme_color_primary: _c.color_ellidaardalur_100,
        theme_color_primary_75: _c.color_ellidaardalur_75,
        theme_color_primary_50: _c.color_ellidaardalur_50,
        theme_color_primary_25: _c.color_ellidaardalur_25,

        theme_color_secondary: _c.color_rokkur_100,
        theme_color_secondary_75: _c.color_rokkur_75,
        theme_color_secondary_50: _c.color_rokkur_50,
        theme_color_secondary_25: _c.color_rokkur_25,

        theme_color_tertiary: _c.color_nautholsvik_100,
        theme_color_tertiary_75: _c.color_nautholsvik_75,
        theme_color_tertiary_50: _c.color_nautholsvik_50,
        theme_color_tertiary_25: _c.color_nautholsvik_25,

        theme_color_primary__text: _c.color_blackish,
        theme_color_primary__dark: _c.color_ellidaardalur_150,
        theme_color_primary__safe: colors.ellidaardalur_100.saturate(0.4).darken(0.52),

        theme_color_primary__safeish: colors.ellidaardalur_100
          .saturate(0.25)
          .darken(0.25),
      })}
    }

    [data-color-theme][data-color-theme='lively'] {
      ${themeVars.override({
        theme_color_primary: _c.color_sund_100,
        theme_color_primary_75: _c.color_sund_75,
        theme_color_primary_50: _c.color_sund_50,
        theme_color_primary_25: _c.color_sund_25,

        theme_color_secondary: _c.color_blafjoll_100,
        theme_color_secondary_75: _c.color_blafjoll_75,
        theme_color_secondary_50: _c.color_blafjoll_50,
        theme_color_secondary_25: _c.color_blafjoll_25,

        theme_color_tertiary: _c.color_nautholsvik_100,
        theme_color_tertiary_75: _c.color_nautholsvik_75,
        theme_color_tertiary_50: _c.color_nautholsvik_50,
        theme_color_tertiary_25: _c.color_nautholsvik_25,

        theme_color_primary__text: _c.color_blackish,
        theme_color_primary__dark: _c.color_sund_150,
        theme_color_primary__safe: colors.sund_100.saturate(0.55).darken(0.52),

        theme_color_primary__safeish: colors.sund_100.saturate(0.35).darken(0.27),
      })}
    }

    [data-color-theme][data-color-theme='colorful'] {
      ${themeVars.override({
        theme_color_primary: _c.color_nautholsvik_100,
        theme_color_primary_75: _c.color_nautholsvik_75,
        theme_color_primary_50: _c.color_nautholsvik_50,
        theme_color_primary_25: _c.color_nautholsvik_25,

        theme_color_secondary: _c.color_heidmork_100,
        theme_color_secondary_75: _c.color_heidmork_75,
        theme_color_secondary_50: _c.color_heidmork_50,
        theme_color_secondary_25: _c.color_heidmork_25,

        theme_color_tertiary: _c.color_esja_100,
        theme_color_tertiary_75: _c.color_esja_75,
        theme_color_tertiary_50: _c.color_esja_50,
        theme_color_tertiary_25: _c.color_esja_25,

        theme_color_primary__text: _c.color_blackish,
        theme_color_primary__dark: _c.color_nautholsvik_150,
        theme_color_primary__safe: colors.nautholsvik_100.saturate(0.55).darken(0.565),

        theme_color_primary__safeish: colors.nautholsvik_100.saturate(0.25).darken(0.33),
      })}
    }
  }
`;

// ---------------------------------------------------------------------------

const linkVarDeclarations = linkVars.declare({
  link_color: colorVars.vars.color_faxafloi_100,
  link_color__hover: colorVars.vars.color_faxafloi_100,
  link_weight: fontVars.vars.font_weight__bold,

  link_underline__thickness: rem(2 / 16),
  link_underline: `${linkVars.vars.link_underline__thickness} solid transparent`,
  link_underline__hover: `${linkVars.vars.link_underline__thickness} solid currentColor`,
  link_underline_offset: em(0.15), // 2.4px

  link_transition: `200ms ease-in`,

  link_focus_outlineColor: `currentColor`,
  link_focus_outline: `3px solid currentColor`,
  link_focus_outlineOffset: px(2),
});

// ---------------------------------------------------------------------------

const _font = {
  // headings
  hd_xl_size: 72,
  hd_xl_leading: 90,
  hd_xl_size__phone: 40,
  hd_xl_leading__phone: 50,

  hd_l_size: 64,
  hd_l_leading: 80,
  hd_l_size__phone: 32,
  hd_l_leading__phone: 40,

  hd_m_size: 48,
  hd_m_leading: 60,
  hd_m_size__phone: 24,
  hd_m_leading__phone: 40,

  hd_s_size: 40,
  hd_s_leading: 50,
  hd_s_size__phone: 20,
  hd_s_leading__phone: 30,

  // subheadings
  sh_l_size: 32,
  sh_l_leading: 40,
  sh_l_size__phone: 20,
  sh_l_leading__phone: 30,

  sh_s_size: 24,
  sh_s_leading: 32,
  sh_s_size__phone: 20,
  sh_s_leading__phone: 30,

  // body text
  bd_l_size: 20,
  bd_l_leading: 32,

  bd_s_size: font.base_size,
  bd_s_leading: font.base_leading,

  // buttons and labels
  button_size: 16,
  button_leading: 20,

  label_size: 12,
  label_leading: 16,

  // Non-semantic font-sizes
  size_12: 12,
};

const scale = between_phablet_netbook;

const fontVarDeclarations = css`
  ${fontVars.declare({
    font_family: font.family_w_fallback,
    font_weight__normal: font.weight_normal,
    font_weight__bold: font.weight_bold,

    font_base_size: px(font.base_size),
    font_base_leading: px(font.base_leading),

    font_base: `${_f.font_base_size} / ${_f.font_base_leading} ${_f.font_family}`,
    font_hd_xl: `${_f.font_weight__bold} ${_f.font_hd_xl_size} / ${_f.font_hd_xl_leading} ${_f.font_family}`,
    font_hd_l: `${_f.font_weight__bold} ${_f.font_hd_l_size} / ${_f.font_hd_l_leading} ${_f.font_family}`,
    font_hd_m: `${_f.font_weight__bold} ${_f.font_hd_m_size} / ${_f.font_hd_m_leading} ${_f.font_family}`,
    font_hd_s: `${_f.font_weight__bold} ${_f.font_hd_s_size} / ${_f.font_hd_s_leading} ${_f.font_family}`,
    font_sh_l: `${_f.font_weight__bold} ${_f.font_sh_l_size} / ${_f.font_sh_l_leading} ${_f.font_family}`,
    font_sh_l_thin: `${_f.font_sh_l_size} / ${_f.font_sh_l_leading} ${_f.font_family}`,
    font_sh_s: `${_f.font_weight__bold} ${_f.font_sh_s_size} / ${_f.font_sh_s_leading} ${_f.font_family}`,
    font_bd_l: `${_f.font_bd_l_size} / ${_f.font_bd_l_leading} ${_f.font_family}`,
    font_bd_s: `${_f.font_bd_s_size} / ${_f.font_bd_s_leading} ${_f.font_family}`,
    font_button: `${_f.font_button_size} / ${_f.font_button_leading} ${_f.font_family}`,
    font_label: `${_f.font_label_size} / ${_f.font_label_leading}) ${_f.font_family}`,

    font_hd_xl_size: px(_font.hd_xl_size__phone),
    font_hd_xl_leading: px(_font.hd_xl_leading__phone),
    font_hd_l_size: px(_font.hd_l_size__phone),
    font_hd_l_leading: px(_font.hd_l_leading__phone),
    font_hd_m_size: px(_font.hd_m_size__phone),
    font_hd_m_leading: px(_font.hd_m_leading__phone),
    font_hd_s_size: px(_font.hd_s_size__phone),
    font_hd_s_leading: px(_font.hd_s_leading__phone),

    font_sh_l_size: px(_font.sh_l_size__phone),
    font_sh_l_leading: px(_font.sh_l_leading__phone),
    font_sh_s_size: px(_font.sh_s_size__phone),
    font_sh_s_leading: px(_font.sh_s_leading__phone),

    font_bd_l_size: px(_font.bd_l_size),
    font_bd_l_leading: px(_font.bd_l_leading),
    font_bd_s_size: px(_font.bd_s_size),
    font_bd_s_leading: px(_font.bd_s_leading),

    font_button_size: px(_font.button_size),
    font_button_leading: px(_font.button_leading),
    font_label_size: px(_font.label_size),
    font_label_leading: px(_font.label_leading),

    baseVerticalMargin: between_phone_netbook(2 * grid.unit, 3 * grid.unit),
    baseVerticalMargin_2: between_phone_netbook(4 * grid.unit, 6 * grid.unit),
  })}

  @media ${mq.phablet_netbook} {
    ${fontVars.override({
      font_hd_xl_size: scale(_font.hd_xl_size__phone, _font.hd_xl_size),
      font_hd_xl_leading: scale(_font.hd_xl_leading__phone, _font.hd_xl_leading),
      font_hd_l_size: scale(_font.hd_l_size__phone, _font.hd_l_size),
      font_hd_l_leading: scale(_font.hd_l_leading__phone, _font.hd_l_leading),
      font_hd_m_size: scale(_font.hd_m_size__phone, _font.hd_m_size),
      font_hd_m_leading: scale(_font.hd_m_leading__phone, _font.hd_m_leading),
      font_hd_s_size: scale(_font.hd_s_size__phone, _font.hd_s_size),
      font_hd_s_leading: scale(_font.hd_s_leading__phone, _font.hd_s_leading),

      font_sh_l_size: scale(_font.sh_l_size__phone, _font.sh_l_size),
      font_sh_l_leading: scale(_font.sh_l_leading__phone, _font.sh_l_leading),
      font_sh_s_size: scale(_font.sh_s_size__phone, _font.sh_s_size),
      font_sh_s_leading: scale(_font.sh_s_leading__phone, _font.sh_s_leading),
    })}
  }
  @media ${mq.wide} {
    ${fontVars.override({
      font_hd_xl_size: px(_font.hd_xl_size),
      font_hd_xl_leading: px(_font.hd_xl_leading),
      font_hd_l_size: px(_font.hd_l_size),
      font_hd_l_leading: px(_font.hd_l_leading),
      font_hd_m_size: px(_font.hd_m_size),
      font_hd_m_leading: px(_font.hd_m_leading),
      font_hd_s_size: px(_font.hd_s_size),
      font_hd_s_leading: px(_font.hd_s_leading),

      font_sh_l_size: px(_font.sh_l_size),
      font_sh_l_leading: px(_font.sh_l_leading),
      font_sh_s_size: px(_font.sh_s_size),
      font_sh_s_leading: px(_font.sh_s_leading),

      baseVerticalMargin: px(3 * grid.unit),
      baseVerticalMargin_2: px(6 * grid.unit),
    })}
  }
`;

// ---------------------------------------------------------------------------

const zIndexVarDeclarations = zIndexVars.declare({
  zindex__sr_only: 99999, // A11y keyboard/focus layer
  zindex__modal: 1000,
  zindex__header: 100,
  zindex__overlay: 10,
  zindex__Bling__overlay: 2,
  zindex__Bling: -10,
});

// ---------------------------------------------------------------------------

const _flexCol = (cols: number, gutters = cols - 1) => {
  const f = cols_pct(cols, gutters) / 100;
  const from = f * grid.contentMinWidth;
  const to = f * grid.contentMaxWidth;
  return between_phone_netbook(from, to);
};

const gridVarDeclarations = css`
  ${gridVars.declare({
    grid_margin: between_phone_netbook(grid.margin__phone, grid.margin__wide),
    grid_margin__neg: between_phone_netbook(
      -1 * grid.margin__phone,
      -1 * grid.margin__wide
    ),
    grid_margin__right: `calc(${_g.grid_margin} - var(--browser-scrollbar-width))`,
    grid_margin__right__neg: `calc(${_g.grid_margin__neg} + var(--browser-scrollbar-width))`,

    grid_0_1: _flexCol(0, 1),
    grid_1: _flexCol(1),
    grid_1_1: _flexCol(1, 1),
    grid_2: _flexCol(2),
    grid_2_2: _flexCol(2, 2),
    grid_3: _flexCol(3),
    grid_3_3: _flexCol(3, 3),
    grid_4: _flexCol(4),
    grid_4_4: _flexCol(4, 4),
    grid_5: _flexCol(5),
    grid_5_5: _flexCol(5, 5),
    grid_6: _flexCol(6),
    grid_6_6: _flexCol(6, 6),
    grid_7: _flexCol(7),
    grid_7_7: _flexCol(7, 7),
    grid_8: _flexCol(8),
    grid_8_8: _flexCol(8, 8),
    grid_9: _flexCol(9),
    grid_9_9: _flexCol(9, 9),
    grid_10: _flexCol(10),
    grid_10_10: _flexCol(10, 10),
    grid_11: _flexCol(11),
    grid_11_11: _flexCol(11, 11),
    grid_12: _flexCol(12),

    grid_gutter: _g.grid_0_1,
    grid_column: _g.grid_1,

    grid_0_1__neg: _flexCol(0, -1),
    grid_1__neg: _flexCol(-1, 0),
    grid_gutter__neg: _g.grid_0_1__neg,
    grid_column__neg: _g.grid_1__neg,
  })}

  // @deprecated (Remove in v0.9)
  --grid-edge: ${_g.grid_margin};
  --grid-edge--neg: ${_g.grid_margin__neg};
  --grid-edge--right: ${_g.grid_margin__right};
  --grid-edge--right--neg: ${_g.grid_margin__right__neg};
  // END: deprecation

  @media ${mq.wide} {
    ${gridVars.override({
      grid_margin: px(grid.margin__wide),
      grid_margin__neg: px(-1 * grid.margin__wide),

      grid_0_1: cols_px(0, 1),
      grid_1: cols_px(1),
      grid_1_1: cols_px(1, 1),
      grid_2: cols_px(2),
      grid_2_2: cols_px(2, 2),
      grid_3: cols_px(3),
      grid_3_3: cols_px(3, 3),
      grid_4: cols_px(4),
      grid_4_4: cols_px(4, 4),
      grid_5: cols_px(5),
      grid_5_5: cols_px(5, 5),
      grid_6: cols_px(6),
      grid_6_6: cols_px(6, 6),
      grid_7: cols_px(7),
      grid_7_7: cols_px(7, 7),
      grid_8: cols_px(8),
      grid_8_8: cols_px(8, 8),
      grid_9: cols_px(9),
      grid_9_9: cols_px(9, 9),
      grid_10: cols_px(10),
      grid_10_10: cols_px(10, 10),
      grid_11: cols_px(11),
      grid_11_11: cols_px(11, 11),
      grid_12: cols_px(12),

      grid_0_1__neg: cols_px(0, -1),
      grid_1__neg: cols_px(-1, 0),
    })}
  }
`;

// ---------------------------------------------------------------------------

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

const mainMenuVarDeclarations = mainMenuVars.declare({
  MainMenu_accentcolor: colorVars.vars.color_faxafloi_100,
  MainMenu_background: colorVars.vars.color_faxafloi_100,
});

// ---------------------------------------------------------------------------

const borderEffectVarDeclarations = borderEffectVars.declare({
  border_default: `1px solid ${colorVars.vars.color_suld_75}`,
  border_dark: `1px solid ${colorVars.vars.color_suld_150}`,
});

// ---------------------------------------------------------------------------

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

const iconVarDeclarations = iconVars.declare(iconfonttokens);

// ---------------------------------------------------------------------------

export const hannaVarDeclarations = [
  envVarDeclarations,
  breakpointVarDeclarations,
  colorVarDeclarations,
  themeVarDeclarations,
  linkVarDeclarations,
  fontVarDeclarations,
  zIndexVarDeclarations,
  gridVarDeclarations,
  spaceVarDeclarations,
  layoutVarDeclarations,
  mainMenuVarDeclarations,
  borderEffectVarDeclarations,
  buttonVarDeclarations,
  iconVarDeclarations,
].join('');
