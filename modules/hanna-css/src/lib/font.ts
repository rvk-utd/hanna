import { px as _px } from 'es-in-css';

const px = (value: number) => /*#__PURE__*/ _px(value);

const familyName = 'Esja';

const base_size = px(16);
const base_leading = px(24);

export const font = {
  familyName,
  weight_normal: 400,
  weight_bold: 700,
  family_w_fallback: `${familyName}, Helvetica, Arial, sans-serif`,
  base_size,
  base_leading,

  sizes: {
    // headings
    hd_xl_size: px(72),
    hd_xl_leading: px(90),
    hd_xl_size__phone: px(40),
    hd_xl_leading__phone: px(50),

    hd_l_size: px(64),
    hd_l_leading: px(80),
    hd_l_size__phone: px(32),
    hd_l_leading__phone: px(40),

    hd_m_size: px(48),
    hd_m_leading: px(60),
    hd_m_size__phone: px(24),
    hd_m_leading__phone: px(40),

    hd_s_size: px(40),
    hd_s_leading: px(50),
    hd_s_size__phone: px(20),
    hd_s_leading__phone: px(30),

    // subheadings
    sh_l_size: px(32),
    sh_l_leading: px(40),
    sh_l_size__phone: px(20),
    sh_l_leading__phone: px(30),

    sh_s_size: px(24),
    sh_s_leading: px(32),
    sh_s_size__phone: px(20),
    sh_s_leading__phone: px(30),

    // body text
    bd_l_size: px(20),
    bd_l_leading: px(32),

    bd_s_size: base_size,
    bd_s_leading: base_leading,

    // buttons and labels
    button_size: px(16),
    button_leading: px(20),

    label_size: px(12),
    label_leading: px(16),

    // Non-semantic font-sizes
    size_12: px(12),
  },
} as const;
