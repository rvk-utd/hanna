import { px } from 'es-in-css';

const familyName = 'Esja';

const base_size = px(16);
const base_leading = px(24);

const sz = {
  heading_xl_size: px(64),
  heading_xl_leading: px(72),
  heading_xl_size__phone: px(40),
  heading_xl_leading__phone: px(48),

  heading_l_size: px(40),
  heading_l_leading: px(48),
  heading_l_size__phone: px(32),
  heading_l_leading__phone: px(40),

  heading_m_size: px(32),
  heading_m_leading: px(40),
  heading_m_size__phone: px(24),
  heading_m_leading__phone: px(28),

  heading_s_size: px(24),
  heading_s_leading: px(28),
  heading_s_size__phone: px(20),
  heading_s_leading__phone: px(24),

  heading_xs_size: px(20),
  heading_xs_leading: px(24),
  heading_xs_size__phone: px(20),
  heading_xs_leading__phone: px(24),

  body_l_size: px(20),
  body_l_leading: px(32),
  body_l_size__phone: base_size,
  body_l_leading__phone: base_leading,

  body_m_size: base_size,
  body_m_leading: base_leading,
  body_m_size__phone: base_size,
  body_m_leading__phone: base_leading,

  body_s_size: px(12),
  body_s_leading: px(16),
  body_s_size__phone: px(12),
  body_s_leading__phone: px(16),

  button_size: px(16),
  button_leading: px(20),

  label_size: px(12),
  label_leading: px(16),
};

export const font = {
  familyName,
  weight_normal: 400,
  weight_bold: 700,
  family_w_fallback: `${familyName}, Helvetica, Arial, sans-serif`,
  base_size,
  base_leading,

  sz,

  /** @deprecated  Ise `font.sz.*` instead  (Will be removed in v0.5) */
  sizes: {
    /* eslint-disable deprecation/deprecation */

    /** @deprecated Use `font.sz.heading_xl_size` instead  (Will be removed in v0.5) */
    hd_xl_size: sz.heading_xl_size,
    /** @deprecated Use `font.sz.heading_xl_leading` instead  (Will be removed in v0.5) */
    hd_xl_leading: sz.heading_xl_leading,
    /** @deprecated Use `font.sz.heading_xl_size__phone` instead  (Will be removed in v0.5) */
    hd_xl_size__phone: sz.heading_xl_size__phone,
    /** @deprecated Use `font.sz.heading_xl_leading__phone` instead  (Will be removed in v0.5) */
    hd_xl_leading__phone: sz.heading_xl_leading__phone,

    /** @deprecated Use `font.sz.heading_xl_size` instead  (Will be removed in v0.5) */
    hd_l_size: sz.heading_xl_size,
    /** @deprecated Use `font.sz.heading_xl_leading` instead  (Will be removed in v0.5) */
    hd_l_leading: sz.heading_xl_leading,
    /** @deprecated Use `font.sz.heading_xl_size__phone` instead  (Will be removed in v0.5) */
    hd_l_size__phone: sz.heading_xl_size__phone,
    /** @deprecated Use `font.sz.heading_xl_leading__phone` instead  (Will be removed in v0.5) */
    hd_l_leading__phone: sz.heading_xl_leading__phone,

    /** @deprecated Use `font.sz.heading_l_size` instead  (Will be removed in v0.5) */
    hd_m_size: sz.heading_l_size,
    /** @deprecated Use `font.sz.heading_l_leading` instead  (Will be removed in v0.5) */
    hd_m_leading: sz.heading_l_leading,
    /** @deprecated Use `font.sz.heading_l_size__phone` instead  (Will be removed in v0.5) */
    hd_m_size__phone: sz.heading_l_size__phone,
    /** @deprecated Use `font.sz.heading_l_leading__phone` instead  (Will be removed in v0.5) */
    hd_m_leading__phone: sz.heading_l_leading__phone,

    /** @deprecated Use `font.sz.heading_m_size` instead  (Will be removed in v0.5) */
    hd_s_size: sz.heading_m_size,
    /** @deprecated Use `font.sz.heading_m_leading` instead  (Will be removed in v0.5) */
    hd_s_leading: sz.heading_m_leading,
    /** @deprecated Use `font.sz.heading_m_size__phone` instead  (Will be removed in v0.5) */
    hd_s_size__phone: sz.heading_m_size__phone,
    /** @deprecated Use `font.sz.heading_m_leading__phone` instead  (Will be removed in v0.5) */
    hd_s_leading__phone: sz.heading_m_leading__phone,

    /** @deprecated Use `font.sz.heading_m_size` instead  (Will be removed in v0.5) */
    sh_l_size: sz.heading_m_size,
    /** @deprecated Use `font.sz.heading_m_leading` instead  (Will be removed in v0.5) */
    sh_l_leading: sz.heading_m_leading,
    /** @deprecated Use `font.sz.heading_m_size__phone` instead  (Will be removed in v0.5) */
    sh_l_size__phone: sz.heading_m_size__phone,
    /** @deprecated Use `font.sz.heading_m_leading__phone` instead  (Will be removed in v0.5) */
    sh_l_leading__phone: sz.heading_m_leading__phone,

    /** @deprecated Use `font.sz.heading_s_size` instead  (Will be removed in v0.5) */
    sh_s_size: sz.heading_s_size,
    /** @deprecated Use `font.sz.heading_s_leading` instead  (Will be removed in v0.5) */
    sh_s_leading: sz.heading_s_leading,
    /** @deprecated Use `font.sz.heading_s_size__phone` instead  (Will be removed in v0.5) */
    sh_s_size__phone: sz.heading_s_size__phone,
    /** @deprecated Use `font.sz.heading_s_leading__phone` instead  (Will be removed in v0.5) */
    sh_s_leading__phone: sz.heading_s_leading__phone,

    /** @deprecated Use `font.sz.body_l_size` instead  (Will be removed in v0.5) */
    bd_l_size: sz.body_l_size,
    /** @deprecated Use `font.sz.body_l_leading` instead  (Will be removed in v0.5) */
    bd_l_leading: sz.body_l_leading,
    /** @deprecated Use `font.sz.body_l_size__phone` instead  (Will be removed in v0.5) */
    bd_l_size__phone: sz.body_l_size__phone,
    /** @deprecated Use `font.sz.body_l_leading__phone` instead  (Will be removed in v0.5) */
    bd_l_leading__phone: sz.body_l_leading__phone,

    /** @deprecated Use `font.sz.body_m_size` instead  (Will be removed in v0.5) */
    bd_s_size: sz.body_m_size,
    /** @deprecated Use `font.sz.body_m_leading` instead  (Will be removed in v0.5) */
    bd_s_leading: sz.body_m_leading,

    /** @deprecated Use `font.sz.button_size` instead  (Will be removed in v0.5) */
    button_size: sz.button_size,
    /** @deprecated Use `font.sz.button_leading` instead  (Will be removed in v0.5) */
    button_leading: sz.button_leading,

    /** @deprecated Use `font.sz.label_size` instead  (Will be removed in v0.5) */
    label_size: sz.label_size,
    /** @deprecated Use `font.sz.label_leading` instead  (Will be removed in v0.5) */
    label_leading: sz.label_leading,

    /** @deprecated Use `font.sz.body_s_size` instead  (Will be removed in v0.5) */
    size_12: px(12), // Non-semantic font-size

    /* eslint-enable deprecation/deprecation */
  },
} as const;
