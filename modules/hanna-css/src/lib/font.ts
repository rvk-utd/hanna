const familyName = 'Esja';

const base_size = 16;
const base_leading = 24;

export const font = {
  familyName,
  weight_normal: 400,
  weight_bold: 700,
  family_w_fallback: `${familyName}, Helvetica, Arial, sans-serif`,
  base_size,
  base_leading,

  sizes: {
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

    bd_s_size: base_size,
    bd_s_leading: base_leading,

    // buttons and labels
    button_size: 16,
    button_leading: 20,

    label_size: 12,
    label_leading: 16,

    // Non-semantic font-sizes
    size_12: 12,
  },
} as const;
