import { color, css } from 'es-in-css';

import { isDevMode } from './cssutils';

type Mode = 'normal' | 'soft';

type WarningOpts = {
  pos?: 'before' | 'after';
  always?: boolean;
};

export const WARNING__ = (message: string, opts?: WarningOpts) => {
  const {
    pos = 'before',
    always,
    // @ts-expect-error  (Undocumented property for local use)
    mode = 'normal' as Mode,
  } = opts || {};

  if (!isDevMode && !always) {
    return '';
  }

  const _color = mode === 'soft' ? 'orange' : 'red';
  const hover = mode === 'soft' && ':hover';

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover} {
      box-shadow: 0 0 0 1px ${color(_color).alpha(0.5)} !important;
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
      content: ${JSON.stringify(message)} !important;
    }
  `;
};
export const suppress_WARNING__ = (opts?: WarningOpts) => {
  const {
    pos = 'before',
    always,
    // @ts-expect-error  (Undocumented property for local use)
    mode = 'normal' as Mode,
  } = opts || {};

  if (!isDevMode && !always) {
    return '';
  }

  const hover = mode === 'soft' && ':hover';

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover} {
      box-shadow: none !important;
    }
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover}::${pos} {
      content: none !important;
    }
  `;
};

export const WARNING_message__ = (message: string, opts?: WarningOpts) => {
  const {
    pos = 'before',
    always,
    // @ts-expect-error  (Undocumented property for local use)
    mode = 'normal' as Mode,
  } = opts || {};

  if (!isDevMode && !always) {
    return '';
  }

  const hover = mode === 'soft' && ':hover';

  return css`
    html:not([data-disable-css-warnings-with-abandon='true']) &${hover}::${pos} {
      content: ${JSON.stringify(message)} !important;
    }
  `;
};

export const WARNING_soft__ = (message: string, opts?: Omit<WarningOpts, 'mode'>) =>
  WARNING__(message, {
    ...opts,
    // @ts-expect-error  (Undocumented property for local use)
    mode: 'soft',
  });

export const suppress_WARNING_soft__ = (opts?: Omit<WarningOpts, 'mode'>) =>
  suppress_WARNING__({
    ...opts,
    // @ts-expect-error  (Undocumented property for local use)
    mode: 'soft',
  });
