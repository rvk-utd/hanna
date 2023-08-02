import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';
import { css, str, VariablePrinter } from 'es-in-css';

import { font } from './font.js';
import iconfonttokens from './iconfonttokens.js';

// ---------------------------------------------------------------------------

const iconfontName = 'icons';

/**
 * Mixin to use in either `::before` or `:after` contexts
 * to set up iconfont styling
 */
export const iconStyle = (icon?: string | VariablePrinter) => {
  if (typeof icon === 'string') {
    icon = str(icon);
  }

  return css`
    display: inline-block;
    text-indent: 0;
    text-align: center;
    vertical-align: top;
    /* iconFontStyling */
    font-family: ${`${iconfontName}, ${font.family_w_fallback}`};
    speak: none; /* speak property is deprecated */
    font-weight: normal;
    font-style: normal;
    white-space: nowrap;
    -webkit-font-smoothing: antialiased; /* fix for light text on dark background from beeing smudgy in webkit/mac */
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0;
    ${icon && `content: ${icon};`}
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

type TrimmedIconName = keyof typeof iconfonttokens extends `icon__${infer ShortName}`
  ? ShortName
  : never;

export const iconfont_raw = /*#__PURE__*/ (() =>
  ({
    name: iconfontName,
    chars: ObjectFromEntries(
      ObjectEntries(iconfonttokens).map(([name, char]) => [
        name.replace(/^icon__/, '') as TrimmedIconName,
        char,
      ])
    ),
  } as const))();

/**
 * Icon names available for data-icon="" attributes
 */
export type IconName =
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
  | 'user';

/**
 * The icons
 */
export const icons: Readonly<Record<IconName, IconName>> = {
  calendar: 'calendar',
  chat: 'chat',
  checkmark: 'checkmark',
  close: 'close',
  data: 'data',
  document: 'document',
  edit: 'edit',
  external: 'external',
  file_pdf: 'file_pdf',
  home: 'home',
  info: 'info',
  link: 'link',
  location: 'location',
  pen: 'pen',
  search: 'search',
  text: 'text',
  time: 'time',
  user: 'user',
};
