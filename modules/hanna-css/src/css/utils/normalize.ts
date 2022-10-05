import { css } from 'es-in-css';

export const normalizeCss = () => css`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  /* Document
   ========================================================================== */

  /**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /* Sections
   ========================================================================== */

  /**
 * Remove the margin in all browsers.
 */

  body {
    margin: 0;
  }

  /**
 * Render the \`main\` element consistently in IE.
 */

  main {
    display: block;
  }

  /**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
   ========================================================================== */

  /**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
   ========================================================================== */

  /**
 * Remove the gray background on active links in IE 10.
 */

  a {
    background-color: transparent;
  }

  /**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

  // /* Hugsmidjan change - remove [title] to make selector less specific  */
  abbr {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

  b,
  strong {
    font-weight: bolder;
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
 * Add the correct font size in all browsers.
 */

  small {
    font-size: 80%;
  }

  /**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
   ========================================================================== */

  /**
 * Remove the border on images inside links in IE 10.
 */

  img {
    border-style: none;
  }

  /* Forms
   ========================================================================== */

  /**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
 * Correct the inability to style clickable types in iOS and Safari.
 */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
 * Remove the inner border and padding in Firefox.
 */

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
 * Restore the focus styles unset by the previous rule.
 */

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
 * Correct the padding in Firefox.
 */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

  progress {
    vertical-align: baseline;
  }

  /**
 * Remove the default vertical scrollbar in IE 10+.
 */

  textarea {
    overflow: auto;
  }

  /**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
   ========================================================================== */

  /*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

  details {
    display: block;
  }

  /*
 * Add the correct display in all browsers.
 */

  summary {
    display: list-item;
  }

  /* Misc
   ========================================================================== */

  /**
 * Add the correct display in IE 10+.
 */

  template {
    display: none;
  }

  /**
 * Add the correct display in IE 10.
 */

  [hidden] {
    display: none;
  }

  /*! Normalization tweaks by Hugsmiðjan */
  // /*
  //  * ==========================================================================
  //  * Hugsmiðjan's additions
  //  * ==========================================================================
  //  */

  // /*
  //  * 1. Cursors only change to hint non-obvious interfaces
  //  * 2. Enforce vertical scrollbar.
  //  * 3. Words break to prevent overflow - ("word-break: break-word;" is deprecated)
  //   *   - https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#Values
  //  */
  html {
    font-family: sans-serif;
    cursor: default; /* 1 */
    overflow-y: scroll; /* 2 */
    // Disabled. Should be Opt-in.
    // word-break: break-word; /* 3 */
    // overflow-wrap: break-word; /* 3 */
  }

  // /*
  //  * Remove default outline from [tabindex="-1"] elements
  //  * when they receive focus via JavaScript
  //  */
  [tabindex='-1'] {
    outline: none;
  }

  // /*
  //  * Single taps are dispatched immediately on clickable elements
  //  */
  a,
  area,
  button,
  input,
  label,
  select,
  summary,
  textarea,
  [tabindex] {
    touch-action: manipulation;
  }

  // /*
  //  * Remove (otherwise unoverridable) default box-shadow inset on iOS devices!
  //  * (Save bandwidth by only enumerating the most common/useful HTML5 input types)
  //  */
  input[type='tel'],
  input[type='number'],
  input[type='email'],
  input[type='url'],
  input[type='date'],
  textarea,
  input[type='password'],
  input[type='text'] {
    // /* border-radius: 0 // <-- should we enable this? */
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='search'],
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // Add back placeholder fix removed because of Edge bug
  // (https://github.com/necolas/normalize.css/commit/f081e459e4ea9f9fce9184cc69e4d3b7c1226e92)
  // ...which seems to have been fixed since.
  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  /*
     * Textareas only resize vertically by default
     */
  textarea {
    resize: vertical;
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  // /*
  //  * Normalize to old-school border-bottom - rather than the new standard
  //  * which uses advanced \`text-decoration: dotted underline
  //  * not supported by most browsers as of early 2016
  //  */
  abbr {
    text-decoration: none;
    border-bottom: 1px dotted;
  }

  // /*
  //  * Override default normalization because
  //  * position:relative on large numbers of display:inline elements
  //  * slows IE11 to a grinding halt -- Már 2015
  //  */
  sup,
  sub {
    position: static;
    line-height: inherit;
    top: auto;
    bottom: auto;
    // /* this works better */
    display: inline-block;
    vertical-align: middle;
  }
  sup {
    margin-top: -1.1em;
  }
  sub {
    margin-bottom: -0.85em;
  }

  // /*
  //  * Normalize button cursor
  //  */
  button {
    cursor: pointer;
  }

  // /**
  //  * Remove most spacing between table cells.
  //  */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
