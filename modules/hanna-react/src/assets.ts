import { getCssBundleUrl as _getCssBundleUrl } from '@reykjavik/hanna-css';
import type {
  BlingType,
  Efnistakn,
  Formheimur,
  Illustration,
} from '@reykjavik/hanna-utils/assets';
import {
  blingTypes,
  efnistakn,
  getAssetUrl,
  getBlingUrl,
  getEfnistaknUrl,
  getFormheimurUrl,
  getIllustrationUrl,
  illustrations,
} from '@reykjavik/hanna-utils/assets';

export type {
  /** @deprecated  Instead `import type { BlingType } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  BlingType,
  /** @deprecated  Instead `import type { Efnistakn } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  Efnistakn,
  /** @deprecated  Instead `import type { Formheimur } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  Formheimur,
  /** @deprecated  Instead `import type { Illustration } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  Illustration,
};

export {
  /** @deprecated  Instead `import type { blingTypes } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  blingTypes,
  /** @deprecated  Instead `import type { efnistakn } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  efnistakn,
  /** @deprecated  Instead `import type { getAssetUrl } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  getAssetUrl,
  /** @deprecated  Instead `import type { getBlingUrl } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  getBlingUrl,
  /** @deprecated  Instead `import type { getEfnistaknUrl } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  getEfnistaknUrl,
  /** @deprecated  Instead `import type { getFormheimurUrl } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  getFormheimurUrl,
  /** @deprecated  Instead `import type { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  getIllustrationUrl,
  /** @deprecated  Instead `import type { illustrations } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
  illustrations,
};

/** @deprecated Use `getCssBundleUrl` from '@reykjavik/hanna-css' instead  (Will be reomved in v0.11) */
export const getCssBundleUrl = (
  cssTokens: string | Array<string>,
  /** If you want to pin your CSS files to a specific version */
  version?: string
) =>
  _getCssBundleUrl(
    cssTokens as Parameters<typeof _getCssBundleUrl>[0],
    { version } as Parameters<typeof _getCssBundleUrl>[1]
  );

// ---------------------------------------------------------------------------

// Based on "https://styles.reykjavik.is/assets/efnistakn/menu/files.json"
/** @deprecated  (Will be removed in v0.11) */
export const efnistakn_menu = [
  'menu/borgarstjori',
  'menu/borgarstjorn',
  'menu/bygg_framkv',
  'menu/fjarmal',
  'menu/fundargerdir',
  'menu/itrottir_aftreying',
  'menu/log_reglugerdir',
  'menu/mannaudur',
  'menu/menning',
  'menu/rad_nefndir',
  'menu/skipulag',
  'menu/skolar_fristund',
  'menu/svid_deildir',
  'menu/umhverfi_samgongur',
  'menu/velferd_fjolskylda',
] as const;
/** @deprecated  (Will be removed in v0.11) */
export type Efnistakn_Menu = (typeof efnistakn_menu)[number]; // eslint-disable-line deprecation/deprecation

// ---------------------------------------------------------------------------

/** @deprecated  (Will be removed in v0.11) */
export const auxiliary_menu_images: Array<Illustration> = [
  'hanna-veitiggi',
  'hanna-vandro',
  'hanna-hugsi',
  'hanna-hissa',
  'hanna-hahaha',
  'hanna-hae',
  'hanna-god_spurning',
  'hanna-gjuggiborg',
  'hanna-benda',
];
/** @deprecated  Instead `import type { AuxilaryPanelIllustration } from '@reykjavik/hanna-react/MainMenu';` (Will be removed in v0.11) */
export type Auxilary_MenuImages = (typeof auxiliary_menu_images)[number]; // eslint-disable-line deprecation/deprecation

// ---------------------------------------------------------------------------

/** @deprecated  Instead `import type { BlingType } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
export type BlingTypes = BlingType;

/** @deprecated  Instead `import type { Illustration } from '@reykjavik/hanna-utils/assets';` (Will be removed in v0.11) */
export type Illustrations = Illustration;
