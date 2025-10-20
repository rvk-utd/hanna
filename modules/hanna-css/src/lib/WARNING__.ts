import { color, ColorName, css, str } from 'es-in-css';

import { buildVariables, isDevMode } from './cssutils.js';

type Mode = 'normal' | 'soft';

const warn = /*#__PURE__*/ buildVariables(['message'], 'WARNING');

const modeValues: Record<Mode, { _color: ColorName; hover?: string }> = {
  normal: { _color: 'red' },
  soft: { _color: 'orange', hover: ':hover' },
};

const border = (_color: ColorName) => css`
  box-shadow: 0 0 0 2px ${color(_color).alpha(0.5)} !important;
`;

type WarningOpts = {
  /**
   * Controls into which ::pseudo-element the `message` content is rendered.
   *
   * Default: `"before"`
   */
  pos?: 'before' | 'after';

  /**
   * Optionally make the warning messages visible in production builds also. A
   * drastic measure reserved for highly unusual situations.
   *
   * Default: `false`
   */
  always?: boolean;
};

type MiniWarningOpts = Omit<WarningOpts, 'pos'>;

const _WARNING_border__ = (opts?: MiniWarningOpts, mode: Mode = 'normal') => {
  if (!isDevMode && !(opts && opts.always)) {
    return '';
  }

  const { _color, hover } = modeValues[mode];

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover} {
      ${border(_color)}
    }
  `;
};

const _WARNING__ = (message: string, opts?: WarningOpts, mode: Mode = 'normal') => {
  const { pos = 'before', always } = opts || {};
  const { _color, hover } = modeValues[mode];

  if (!isDevMode && !always) {
    return '';
  }

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover} {
      ${warn.override({ message: str(message) })};
      ${border(_color)}
    }
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover}::${pos} {
      all: initial !important;
      order: -999 !important;
      font-family: sans-serif !important;
      position: absolute !important;
      white-space: nowrap !important;
      z-index: 2 !important;
      font-size: 12px !important;
      line-height: 1.5em !important;
      color: ${_color} !important;
      background-color: ${color(_color).mix(color('white'), 0.1).alpha(0.5)} !important;
      padding: 0 0.5em !important;
      content: ${warn.vars.message} !important;
    }
  `;
};

const _WARNING_message__ = (message: string, opts?: MiniWarningOpts) => {
  if (!isDevMode && !(opts && opts.always)) {
    return '';
  }

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) & {
      ${warn.override({ message: str(message) })};
    }
  `;
};

const _suppress_WARNING__ = (opts?: WarningOpts, mode: Mode = 'normal') => {
  const { pos = 'before', always } = opts || {};
  const { hover } = modeValues[mode];

  if (!isDevMode && !always) {
    return '';
  }

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover} {
      ${warn.override({ message: 'initial' })};
      box-shadow: none !important;
    }
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover}::${pos} {
      content: none !important;
    }
  `;
};

// ===========================================================================

/**
 * Renders a high-priority (red) warning and message.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#warning__
 */
/*#__NO_SIDE_EFFECTS__*/
export const WARNING__ = (message: string, opts?: WarningOpts) =>
  _WARNING__(message, opts);

/**
 * Renders a lower-priority (orange) warning and message that are only visible
 * then the HTML element is `:hover`ed.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#warning_soft__
 */
/*#__NO_SIDE_EFFECTS__*/
export const WARNING_soft__ = (message: string, opts?: WarningOpts) =>
  _WARNING__(message, opts, 'soft');

// ---------------------------------------------------------------------------

/**
 * Only sets (overrides) the warning message on an element that already has a
 * warning style applied.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#warning_message__
 */
/*#__NO_SIDE_EFFECTS__*/
export const WARNING_message__ = (message: string) => _WARNING_message__(message);

// ---------------------------------------------------------------------------

/**
 * Sets a high-priority (red) warning border around an element.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#warning_border__
 */
/*#__NO_SIDE_EFFECTS__*/
export const WARNING_border__ = (opts?: MiniWarningOpts) => _WARNING_border__(opts);

/**
 * Renders a lower-priority (orange) warning warning that is only visible then
 * the HTML element is `:hover`ed.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#warning_border_soft__
 */
/*#__NO_SIDE_EFFECTS__*/
export const WARNING_border_soft__ = (opts?: MiniWarningOpts) =>
  _WARNING_border__(opts, 'soft');

// ---------------------------------------------------------------------------

/**
 * Attempts to remove warning border and message.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#suppress_warning__
 */
/*#__NO_SIDE_EFFECTS__*/
export const suppress_WARNING__ = (opts?: WarningOpts) => _suppress_WARNING__(opts);

/**
 * Attempts to remove lower-priority (`:hover`) warning border and message.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#suppress_warning_soft__
 */
/*#__NO_SIDE_EFFECTS__*/
export const suppress_WARNING_soft__ = (opts?: WarningOpts) =>
  _suppress_WARNING__(opts, 'soft');
