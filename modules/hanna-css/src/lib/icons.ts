import {
  Expect,
  Extends,
  ObjectEntries,
  ObjectFromEntries,
  OpenRecord,
} from '@reykjavik/hanna-utils';
import { css, VariablePrinter } from 'es-in-css';

import { IconToken } from '../iconfontTokens.js';

import { font } from './font.js';
import { hannaVars } from './hannavars.js';
import iconfonttokens from './iconfonttokens.js';

// ---------------------------------------------------------------------------

export const _legacyIconfontName = 'icons';
const iconfontName = 'iconfont';

/**
 * Sugar identity function to get typesafe `IconToken` values
 * wrapped in quotatiton marks.
 *
 * Removes `_filled` suffix from the token name, as the filled variant
 * should be controlled elsewhere via `font-variation-settings: 'FILL' 1;`
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#icontoken
 */
export const iconToken = (iconToken: IconToken): `"${IconToken}"` =>
  `"${iconToken.replace(/_filled$/, '') as IconToken}"`;

/**
 * Mixin to use in either `::before` or `:after` pseudo-elements to set `content`
 * and `font-variation-settings` properties correctly and in a typesafe and
 * accessible way.
 *
 * The `filled` parameter can be used to force rendering of the filled variant of
 * an icon, this is useful when the icon character is passed via a CSS variable.
 *
 * (Used internally by `iconStyle()`.)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#iconcontent
 */
/*#__NO_SIDE_EFFECTS__*/
export const iconContent = (iconChar: IconToken | VariablePrinter, filled?: boolean) => {
  let isFilled = filled;
  let _iconChar: VariablePrinter | string | undefined = iconChar;
  if (typeof iconChar === 'string') {
    isFilled = filled || iconChar.endsWith('_filled');
    _iconChar = iconToken(iconChar);
  }
  // Uses `content: 'visible' / 'alt';` syntax in an effort to hide
  // presentational, english language icon names from screen-readers
  return css`
    content: ${_iconChar};
    content: ${_iconChar} / '';
    ${isFilled &&
    css`
      font-variation-settings: 'FILL' 1;
    `}
  `;
};

export type IconSize = 'small' | 'normal' | 'large';
/**
 * Mixin to use in either `::before` or `:after` pseudo-elements
 * to set up iconfont styling.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#iconstyle
 */
/*#__NO_SIDE_EFFECTS__*/
export const iconStyle = (
  iconChar?: IconToken | VariablePrinter,
  opts?: IconSize | { size?: IconSize; filled?: boolean }
) => {
  const _opts = typeof opts === 'string' ? { size: opts } : opts || {};
  return css`
    ${iconChar && iconContent(iconChar, _opts.filled)};
    display: inline-block;
    text-indent: 0;
    text-align: center;
    width: 1em;
    vertical-align: top;
    font-family: ${`${iconfontName}, ${_legacyIconfontName}, ${font.family_w_fallback}`};
    font-weight: normal;
    font-style: normal;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -moz-font-feature-settings: 'liga';
    letter-spacing: normal;
    font-size: ${hannaVars[`icon_size__${_opts.size || 'normal'}`]};
    -moz-osx-font-smoothing: grayscale;
  `;
};

// ---------------------------------------------------------------------------

// quote marks for use with blockquote
const upper6 = '\u2018';
const upper9 = '\u2019';
const lower9 = '\u201a';
const upper66 = '\u201c';
const upper99 = '\u201d';
const lower99 = '\u201e';

const quotes = {
  upper6,
  upper9,
  lower9,
  upper66,
  upper99,
  lower99,

  // https://op.europa.eu/en/web/eu-vocabularies/formex/physical-specifications/character-encoding/use-of-quotation-marks-in-the-different-languages

  /** Icelandic style */
  IS: {
    open: lower99,
    close: upper66,
    openSingle: lower9,
    closeSingle: upper6,
  },
  /** English style */
  EN: {
    open: upper66,
    close: upper99,
    openSingle: upper6,
    closeSingle: upper9,
  },
  /** Polish style */
  PL: {
    open: lower99,
    close: upper99,
    openSingle: upper6,
    closeSingle: upper9,
  },
} as const;

/**
 * Object with several named unicode symbols for use in generated content
 * (`::marker`s, `::before` texts, etc.). Includes `bullets`, `spaces`, `quotes`.
 */
export const characters = {
  /** Common bullets */
  bullets: {
    disc: '\u2022',
    square: '\u25aa',
  },
  /** Various unicode space characters */
  spaces: {
    /** ~0.28em  (NO-BREAK space) */
    normal: '\u00a0',
    /** 1/2em  (EN space) */
    half: '\u2002',
    /** 1em  (EM space) */
    em: '\u2003',
    /** 1/3em  (THREE-PER-EM space) */
    third: '\u2004',
    /** 1/4em  (FOUR-PER-EM space) */
    fourth: '\u2005',
    /** 1/6em  (SIX-PER-EM space) */
    sixth: '\u2006',
    // figure:        "\2007",
    // punctuation:   "\2008",
    /** 1/5em  (THIN space) */
    fifth: '\u2009',
    /** 1/12em (HAIR space) */
    hair: '\u200A',
  },
  /** Collection of quotation marks for use on `blockquote`s etc. */
  quotes,
} as const;

// ---------------------------------------------------------------------------

type _TrimmedIconName = keyof typeof iconfonttokens extends `icon__${infer ShortName}`
  ? ShortName
  : never;

/**
 * @deprecated Use type `IconToken` instead  (Will be removed in v0.5)
 *
 *  This list of icons is fixed and only for back-compat reasons
 */
export type IconName_old =
  | 'calendar'
  | 'chat'
  | 'checkmark'
  | 'close'
  | 'data'
  | 'document'
  | 'edit'
  | 'external'
  | 'file_pdf'
  | 'home'
  | 'info'
  | 'link'
  | 'location'
  | 'pen'
  | 'search'
  | 'text'
  | 'time'
  | 'user'
  | 'globe'; // added informally to Button* icon prop
// Type tests
type _ = {
  // eslint-disable-next-line deprecation/deprecation
  old_iconNames_Exist: Expect<Extends<IconName_old, _TrimmedIconName | 'globe'>>;
};

/**
 * Icon names available for `data-icon=""` and `data-icon-after=""` attributes,
 * and for use in hanna-react components.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#type-icontoken
 */
export type { IconToken } from '../iconfontTokens.js';

/** @deprecated Use the `IconName` type instead (Will be removed in v0.5)
 *
 * This object only contains the old iconfont token names from before when
 * Material Symbols was adopted.
 *
 * If you need a full list of current icon names at runtime, consider using
 * `https://styles.reykjavik.is/css/v0.8/i/iconfont.json`
 */
export const iconfont_raw = /*#__PURE__*/ (() =>
  ({
    name: iconfontName,
    chars: ObjectFromEntries(
      ObjectEntries(iconfonttokens).map(([name, char]) => [
        name.replace(/^icon__/, '') as _TrimmedIconName,
        char,
      ])
    ),
  } as const))();

/** @deprecated Use the `IconName` type instead (Will be removed in v0.5)
 *
 * This object only contains the old icon names from before Material Symbols
 * was adopted.
 *
 * If you need a full list of current icon names at runtime, consider using
 * `https://styles.reykjavik.is/css/v0.8/i/iconfont.json`
 */
// eslint-disable-next-line deprecation/deprecation
export const icons: Readonly<OpenRecord<IconName_old, IconToken>> = {
  calendar: 'calendar_month',
  chat: 'forum',
  checkmark: 'check',
  close: 'close',
  data: 'pie_chart',
  document: 'docs',
  edit: 'edit',
  external: 'open_in_new',
  file_pdf: 'picture_as_pdf',
  home: 'house',
  info: 'info_filled',
  link: 'link',
  location: 'location_on',
  pen: 'edit',
  search: 'search',
  text: 'notes',
  time: 'schedule',
  user: 'account_circle',
  globe: 'language',
};
