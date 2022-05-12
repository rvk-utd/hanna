import { css, px } from 'es-in-css';

import { between_phablet_netbook, between_phone_netbook } from './between';
import { mq } from './breakpoints';
import { buildVariables } from './cssutils';
import { grid } from './grid';

const familyName = 'Esja';

export const font_raw = {
  familyName,
  weight_normal: 400,
  weight_bold: 700,
  family_w_fallback: `${familyName}, Helvetica, Arial, sans-serif`,
  base_size: 16,
  base_leading: 24,
};

const _font = {
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // subheadings

  sh_l_size: 32,
  sh_l_leading: 40,
  sh_l_size__phone: 20,
  sh_l_leading__phone: 30,

  sh_s_size: 24,
  sh_s_leading: 32,
  sh_s_size__phone: 20,
  sh_s_leading__phone: 30,

  // ---------------------------------------------------------------------------
  // body text

  bd_l_size: 20,
  bd_l_leading: 32,

  bd_s_size: font_raw.base_size,
  bd_s_leading: font_raw.base_leading,

  // ---------------------------------------------------------------------------
  // buttons and labels

  button_size: 16,
  button_leading: 20,

  label_size: 12,
  label_leading: 16,

  // ---------------------------------------------------------------------------
  // Non-semantic font-sizes
  size_12: 12,
};

export const fontVars = buildVariables([
  'font_family',
  'font_weight__normal',
  'font_weight__bold',

  'font_base_size',
  'font_base_leading',

  // Compound font values
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

const f = fontVars.vars;

const scale = between_phablet_netbook;

export const fontVarDeclarations = css`
  ${fontVars.declare({
    font_family: font_raw.family_w_fallback,
    font_weight__normal: font_raw.weight_normal,
    font_weight__bold: font_raw.weight_bold,

    font_base_size: px(font_raw.base_size),
    font_base_leading: px(font_raw.base_leading),

    font_base: `${f.font_base_size} / ${f.font_base_leading} ${f.font_family}`,
    font_hd_xl: `${f.font_weight__bold} ${f.font_hd_xl_size} / ${f.font_hd_xl_leading} ${f.font_family}`,
    font_hd_l: `${f.font_weight__bold} ${f.font_hd_l_size} / ${f.font_hd_l_leading} ${f.font_family}`,
    font_hd_m: `${f.font_weight__bold} ${f.font_hd_m_size} / ${f.font_hd_m_leading} ${f.font_family}`,
    font_hd_s: `${f.font_weight__bold} ${f.font_hd_s_size} / ${f.font_hd_s_leading} ${f.font_family}`,
    font_sh_l: `${f.font_weight__bold} ${f.font_sh_l_size} / ${f.font_sh_l_leading} ${f.font_family}`,
    font_sh_l_thin: `${f.font_sh_l_size} / ${f.font_sh_l_leading} ${f.font_family}`,
    font_sh_s: `${f.font_weight__bold} ${f.font_sh_s_size} / ${f.font_sh_s_leading} ${f.font_family}`,
    font_bd_l: `${f.font_bd_l_size} / ${f.font_bd_l_leading} ${f.font_family}`,
    font_bd_s: `${f.font_bd_s_size} / ${f.font_bd_s_leading} ${f.font_family}`,
    font_button: `${f.font_button_size} / ${f.font_button_leading} ${f.font_family}`,
    font_label: `${f.font_label_size} / ${f.font_label_leading}) ${f.font_family}`,

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
