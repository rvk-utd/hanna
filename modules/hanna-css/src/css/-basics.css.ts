import {
  font_raw,
  hannaVarOverride,
  hannaVars as vars,
  WARNING__,
} from '@reykjavik/hanna-css';
import { css, str } from 'es-in-css';
import md5File from 'md5-file';

import { srOnly } from '../lib/a11y.js';
import { bp } from '../lib/breakpoints.js';
import { characters, iconfont_raw } from '../lib/icons.js';
import { WARNING_border__ } from '../lib/WARNING__.js';

import { hannaVarDeclarations } from './styles/hannaVarDeclarations.js';
import { LinkStyle, LinkStyle__focusOutline } from './styles/links.js';
import { buttonReset } from './utils/buttonReset.js';
import {
  setDefaultKeyboardFocusStyle,
  setDefaultNonKeyboardFocusStyle,
} from './utils/focus-selectors.js';
import { normalizeCss } from './utils/normalize.js';
import { writeMediaFormatMarkers } from './utils/writeMediaFormatMarkers.js';

import { BlockBreak_css } from './BlockBreak.css.js';
import { SeenEffect_css } from './SeenEffect.css.js';

const fileChecksum = (file: string) => {
  try {
    return md5File.sync(file);
  } catch (error) {
    console.error(`Can't do \`fileChecksum\` for "${file}"\n - - - -`);
    return '😢';
  }
};

const quotes = (lang: 'IS' | 'EN' | 'PL') => {
  const q = characters.quotes[lang];
  return `${str(q.open)} ${str(q.close)} ${str(q.openSingle)} ${str(q.closeSingle)}`;
};

const iconFontVersion = fileChecksum('../../servers/styles/public/css/dev/i/icons.woff2');
const esjaFolder = '/assets/fonts/Esja';

// ---------------------------------------------------------------------------

export default css`
  /*! Reykjavík Design System basic CSS styles */

  @font-face {
    font-family: ${iconfont_raw.name};
    font-weight: normal;
    font-style: normal;
    font-display: block;
    src: url('i/icons.woff2?${iconFontVersion}') format('woff2'),
      url('i/icons.woff?${iconFontVersion}') format('woff');
  }

  @font-face {
    font-family: ${font_raw.familyName};
    font-weight: ${font_raw.weight_normal};
    font-style: normal;
    font-display: block;
    src: url('${esjaFolder}/Esja-regular.woff2') format('woff2'),
      url('${esjaFolder}/Esja-regular.woff') format('woff');
  }
  @font-face {
    font-family: ${font_raw.familyName};
    font-weight: ${font_raw.weight_bold};
    font-style: normal;
    font-display: block;
    src: url('${esjaFolder}/Esja-bold.woff2') format('woff2'),
      url('${esjaFolder}/Esja-bold.woff') format('woff');
  }
  /** /
  @font-face {
    font-family: ${font_raw.familyName};
    font-weight: ${font_raw.weight_normal};
    font-style: italic;
    font-display: block;
    src: url('${esjaFolder}/Esja-regularitalic.woff2') format('woff2'),
      url('${esjaFolder}/Esja-regularitalic.woff') format('woff');
  }
  @font-face {
    font-family: ${font_raw.familyName};
    font-weight: ${font_raw.weight_bold};
    font-style: italic;
    font-display: block;
    src: url('${esjaFolder}/Esja-bolditalic.woff2') format('woff2'),
      url('${esjaFolder}/Esja-bolditalic.woff') format('woff');
  }
  /**/

  ${hannaVarDeclarations}
  ${normalizeCss};

  *,
  *::before,
  *::after {
    flex-shrink: 0;
    box-sizing: border-box;
  }
  [hidden][hidden] {
    display: none;
  }

  ${setDefaultKeyboardFocusStyle(css`
    ${LinkStyle__focusOutline}
  `)};

  ${setDefaultNonKeyboardFocusStyle(css`
    outline: none;
    outline-offset: 0;
  `)};

  html {
    min-height: 100vh;
    min-width: calc(${bp.phone} - ${vars.browser_scrollbar_width});
    box-sizing: border-box;
    position: relative;
    scroll-behavior: smooth;
    overflow-y: scroll;
    overflow-x: hidden; // Normal browsers respect this.
    /**
      __NOTE:__
      Older Safari versions need to register this side-scroll-killer
      script to prevent side-scrolling on the <html/> element.

      \`\`\`js
      (function (d, u, h) {
        u.indexOf('Chrome') < 0 && u.indexOf('Safari') > 0 &&
        d.addEventListener("scroll", function () {
          (h = d.documentElement).scrollLeft > 0 &&
            (h.scrollLeft = 0);
        });
      })(document, navigator.userAgent);
      \`\`\`

      This script is also part of \`getEssentialHannaScripts\` helper
      exported from '@reykjavik/hanna-css'.

      See: https://www.npmjs.com/package/@reykjavik/hanna-css#getessentialhannascripts
    */
    overflow-x: clip; // For Safari 16+
  }

  body {
    // "Fix" nasty/smudgy font rendering on mac
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: ${vars.color_suld_0};
    color: ${vars.color_suld_200};

    font: ${vars.font_base};
    font-weight: 400;
    // English style as "normal-looking" fallback for unknown languages
    quotes: ${quotes('EN')};
    // quotes: auto; // Doesn't work in most browsers yet... See: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes#Browser_compatibility
  }

  *:lang(is) {
    quotes: ${quotes('IS')};
  }
  *:lang(pl) {
    quotes: ${quotes('PL')};
  }

  *:first-child {
    margin-top: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    font-weight: inherit;
    font-size: inherit;
  }

  p,
  ul,
  ol,
  dl,
  table,
  figure,
  blockquote {
    margin: 0;
  }

  p ul,
  p ol,
  p div,
  p p,
  p dl,
  p blockquote {
    ${WARNING__('No block-level tags inside <p/>')}
  }

  address {
    font-style: normal;
  }

  img {
    object-position: var(--focalPoint);
  }
  img,
  video {
  }
  iframe {
    width: 100%;
    display: block;
  }
  iframe:not([frameborder='yes']) {
    border: 0;
  }

  img:not([alt]),
  audio:not([title]):not([aria-label]),
  video:not([title]):not([aria-label]),
  iframe:not([title]):not([aria-label]) {
    ${WARNING_border__};
  }

  table {
    border-collapse: separate;
  }
  th,
  td {
    padding: 0;
  }

  abbr {
    cursor: help;
  }

  a[href^='tel:']:not([class]) {
    ${hannaVarOverride({
      link_color: '_inherit',
    })}
  }
  a {
    ${LinkStyle};
  }
  a[href='#'],
  a:not([href]) {
    ${WARNING__('Use <button/> instead')};
  }
  button[href] {
    ${WARNING__('Use <a href=""/>')};
  }

  button {
    ${buttonReset};
  }
  button:disabled {
    cursor: auto;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  select {
    font-size: inherit;
    line-height: inherit;
    padding: 0;
  }
  input:invalid {
    box-shadow: none; // reset red default browser stylesheet box-shadow
  }
  :disabled,
  [aria-disabled='true'] {
    cursor: default;
  }

  optgroup {
    font-style: normal;
  }

  ol {
    padding-left: 1.5em;
  }
  li ol {
    margin-bottom: 0;
  }
  ol {
    counter-reset: ol;
    list-style: none;
  }
  ol > li::before {
    counter-increment: ol;
    content: counter(ol) '. ';
    float: left;
    min-width: 2.5em;
    text-align: right;
    margin: 0 0.5em -0.5em -2.8em;
  }
  ol[type='a'], // <-- NOTE: non-scripted <ol> styling is limited
	  ol[data-oltype='a'] > li::before {
    content: counter(ol, lower-alpha) '. ';
  }
  ol[data-oltype='A'] > li::before {
    content: counter(ol, upper-alpha) '. ';
  }
  ol[type='i'], // <-- NOTE: non-scripted <ol> styling is limited
	  ol[data-oltype='i'] > li::before {
    content: counter(ol, lower-roman) '. ';
  }
  ol[data-oltype='I'] > li::before {
    content: counter(ol, upper-roman) '. ';
  }
  :not(ul):not(ol) > li {
    ${WARNING__('<li/> must be inside <ol/> or <ul/>')};
  }
  ol > :not(li),
  ul > :not(li),
  menu > :not(li) {
    ${WARNING__('Lists may only contain <li/>s')};
  }

  hr {
    display: block;
    margin: ${vars.baseVerticalMargin} 0;
    padding: 0;
    height: 1px;
    border: 0;
    border-top: 1px solid ${vars.color_suld_100};
  }

  fieldset {
    padding: 0;
    border: 0;
    margin: 0;
  }
  legend {
    float: left; // HACK: Trigger correct positioning within <fieldset>
  }
  :not(fieldset) > legend {
    ${WARNING__('<legend/> must be first-child of <fieldset/>')};
  }
  legend + * {
    clear: both;
  }

  // ===========================================================================

  table {
    font: ${vars.font_bd_s};
    border-collapse: collapse;
    margin-bottom: ${vars.baseVerticalMargin};
  }
  caption {
    text-align: left;
  }
  th,
  td {
    text-align: left;
    vertical-align: top;
    padding: ${vars.space_1} ${vars.space_2};
    color: ${vars.color_suld_150};
    font-weight: ${vars.font_weight__normal};

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
  thead > * > th {
    font-weight: ${vars.font_weight__bold};
    vertical-align: bottom;
  }
  tbody > * > th,
  tbody > * > td {
    border: ${vars.border_default};
    border-width: 1px 0;
  }

  // ---------------------------------------------------------------------------

  ${BlockBreak_css}
  ${SeenEffect_css}

  // ===========================================================================
  // HACK: Drupal admin styles
  // TODO: Get 1XInternet to cleanly insert these styles themselves
  // for logged-in Drupal editors
  // ===========================================================================
  @media screen {
    [class].visually-hidden {
      ${srOnly};
    }
    .local-tasks {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 99999;
      background: ${vars.color_ellidaardalur_50};
      box-shadow: 2px 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 3px 0 rgba(57, 103, 76, 0.4);
      padding: 0.75rem;
    }
    .local-tasks ul {
      display: flex;
      border-bottom: 1px solid ${vars.color_suld_100};
    }
    .local-tasks li {
      margin-bottom: -1px;
    }
    .local-tasks li a {
      font-weight: 400;
      display: block;
      color: ${vars.color_suld_150};
      padding: 0.5rem 1rem;
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }
    .local-tasks li a.is-active {
      color: ${vars.color_suld_200};
      background-color: ${vars.color_suld_0};
      border-color: ${vars.color_suld_100} ${vars.color_suld_100} ${vars.color_suld_0};
    }
  }
  // ===========================================================================

  ${writeMediaFormatMarkers}
`;
