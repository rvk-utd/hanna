import { css } from 'es-in-css';

import { colors_raw, colorVars } from './colors';
import { buildVariables } from './cssutils';

export const colorThemes = [
  'trustworthy',
  'dependable',
  'friendly',
  'lively',
  'colorful',
] as const;

export type HannaColorTheme = typeof colorThemes[number];

// ---------------------------------------------------------------------------

const _var = colorVars.vars;

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

export const themeVarDeclarations = css`
  @at-root {
    :root:root,
    [data-color-theme][data-color-theme],
    [data-color-theme][data-color-theme='trustworthy'] {
      ${themeVars.declare({
        theme_color_primary: _var.color_faxafloi_100,
        theme_color_primary_75: _var.color_faxafloi_75,
        theme_color_primary_50: _var.color_faxafloi_50,
        theme_color_primary_25: _var.color_faxafloi_25,

        theme_color_secondary: _var.color_sund_100,
        theme_color_secondary_75: _var.color_sund_75,
        theme_color_secondary_50: _var.color_sund_50,
        theme_color_secondary_25: _var.color_sund_25,

        theme_color_tertiary: _var.color_ellidaardalur_100,
        theme_color_tertiary_75: _var.color_ellidaardalur_75,
        theme_color_tertiary_50: _var.color_ellidaardalur_50,
        theme_color_tertiary_25: _var.color_ellidaardalur_25,

        theme_color_primary__text: _var.color_white,
        theme_color_primary__dark: _var.color_faxafloi_150,
        theme_color_primary__safe: themeVars.vars.theme_color_primary,
        // safe to use for ButtonTertiary borders, etc.
        theme_color_primary__safeish: themeVars.vars.theme_color_primary,
      })}
    }

    [data-color-theme][data-color-theme='dependable'] {
      ${themeVars.override({
        theme_color_primary: _var.color_faxafloi_100,
        theme_color_primary_75: _var.color_faxafloi_75,
        theme_color_primary_50: _var.color_faxafloi_50,
        theme_color_primary_25: _var.color_faxafloi_25,

        theme_color_secondary: _var.color_nautholsvik_100,
        theme_color_secondary_75: _var.color_nautholsvik_75,
        theme_color_secondary_50: _var.color_nautholsvik_50,
        theme_color_secondary_25: _var.color_nautholsvik_25,

        theme_color_tertiary: _var.color_sund_100,
        theme_color_tertiary_75: _var.color_sund_75,
        theme_color_tertiary_50: _var.color_sund_50,
        theme_color_tertiary_25: _var.color_sund_25,

        // theme_color_primary__text,
        theme_color_primary__dark: _var.color_faxafloi_150,
        // theme_color_primary__safe,

        // theme_color_primary__safeish,
      })}
    }

    [data-color-theme][data-color-theme='friendly'] {
      ${themeVars.override({
        theme_color_primary: _var.color_ellidaardalur_100,
        theme_color_primary_75: _var.color_ellidaardalur_75,
        theme_color_primary_50: _var.color_ellidaardalur_50,
        theme_color_primary_25: _var.color_ellidaardalur_25,

        theme_color_secondary: _var.color_rokkur_100,
        theme_color_secondary_75: _var.color_rokkur_75,
        theme_color_secondary_50: _var.color_rokkur_50,
        theme_color_secondary_25: _var.color_rokkur_25,

        theme_color_tertiary: _var.color_nautholsvik_100,
        theme_color_tertiary_75: _var.color_nautholsvik_75,
        theme_color_tertiary_50: _var.color_nautholsvik_50,
        theme_color_tertiary_25: _var.color_nautholsvik_25,

        theme_color_primary__text: _var.color_blackish,
        theme_color_primary__dark: _var.color_ellidaardalur_150,
        theme_color_primary__safe: colors_raw.ellidaardalur_100
          .saturate(0.4)
          .darken(0.52),

        theme_color_primary__safeish: colors_raw.ellidaardalur_100
          .saturate(0.25)
          .darken(0.25),
      })}
    }

    [data-color-theme][data-color-theme='lively'] {
      ${themeVars.override({
        theme_color_primary: _var.color_sund_100,
        theme_color_primary_75: _var.color_sund_75,
        theme_color_primary_50: _var.color_sund_50,
        theme_color_primary_25: _var.color_sund_25,

        theme_color_secondary: _var.color_blafjoll_100,
        theme_color_secondary_75: _var.color_blafjoll_75,
        theme_color_secondary_50: _var.color_blafjoll_50,
        theme_color_secondary_25: _var.color_blafjoll_25,

        theme_color_tertiary: _var.color_nautholsvik_100,
        theme_color_tertiary_75: _var.color_nautholsvik_75,
        theme_color_tertiary_50: _var.color_nautholsvik_50,
        theme_color_tertiary_25: _var.color_nautholsvik_25,

        theme_color_primary__text: _var.color_blackish,
        theme_color_primary__dark: _var.color_sund_150,
        theme_color_primary__safe: colors_raw.sund_100.saturate(0.55).darken(0.52),

        theme_color_primary__safeish: colors_raw.sund_100.saturate(0.35).darken(0.27),
      })}
    }

    [data-color-theme][data-color-theme='colorful'] {
      ${themeVars.override({
        theme_color_primary: _var.color_nautholsvik_100,
        theme_color_primary_75: _var.color_nautholsvik_75,
        theme_color_primary_50: _var.color_nautholsvik_50,
        theme_color_primary_25: _var.color_nautholsvik_25,

        theme_color_secondary: _var.color_heidmork_100,
        theme_color_secondary_75: _var.color_heidmork_75,
        theme_color_secondary_50: _var.color_heidmork_50,
        theme_color_secondary_25: _var.color_heidmork_25,

        theme_color_tertiary: _var.color_esja_100,
        theme_color_tertiary_75: _var.color_esja_75,
        theme_color_tertiary_50: _var.color_esja_50,
        theme_color_tertiary_25: _var.color_esja_25,

        theme_color_primary__text: _var.color_blackish,
        theme_color_primary__dark: _var.color_nautholsvik_150,
        theme_color_primary__safe: colors_raw.nautholsvik_100
          .saturate(0.55)
          .darken(0.565),

        theme_color_primary__safeish: colors_raw.nautholsvik_100
          .saturate(0.25)
          .darken(0.33),
      })}
    }
  }
`;
