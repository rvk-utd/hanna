import React, { useEffect, useState } from 'react';

// Import (and possibly mock in React < 18) `useSyncExternalStore`
// for limited module-local use
let _useSyncExternalStore:
  | undefined
  | ((
      subscribe: (onStoreChange: () => void) => () => void,
      getSnapshot: () => boolean,
      getServerSnapshot: () => boolean
    ) => boolean) =
  // @ts-expect-error  (transparently feature-detect useId hook, which is introduced in React@18)
  React.useSyncExternalStore;

if (!_useSyncExternalStore) {
  let alreadyBrowserSide = false;

  _useSyncExternalStore = (_, clientState, serverState) => {
    const [state, setState] = useState(alreadyBrowserSide ? clientState : serverState);
    useEffect(() => {
      alreadyBrowserSide = true;
      if (clientState !== serverState) {
        setState(clientState());
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return state;
  };
}

// ---------------------------------------------------------------------------

/**
 * Indicates whether server-side rendering is supported or not.
 *
 * The `ssr-only` value is useful for cases where you need
 * to demo the server-rendered version in a browser.
 */
export type SSRSupport = boolean | 'ssr-only';

const defaultSSRSupport: SSRSupport = true;
/**
 * The default value use for the optional `ssrSupport` parameter
 * on the `useIsBRowserSide` and `useIsServerSide` hooks.`
 */
let DEFAULT_SSR_SUPPORT: SSRSupport = defaultSSRSupport;

export type SSRSupportProps = {
  /**
   * Indicates whether server-side rendering is supported or not.
   *
   * The `ssr-only` value is useful for cases where you need
   * to demo the server-rendered version in a browser.
   */
  ssr?: SSRSupport;
};

const _stableSubscribe = () => () => undefined;
const _retTrue = () => true;
const _retFalse = () => false;

/**
 * Returns `true` when `useEffect` has executed.
 *
 * This signals the time to apply Progressive Enhancement.
 *
 * ```js
 * const Knob = (props) => {
 *   const [visible, setVisible] = useState(false);
 *   const isBrowser = useIsBrowserSide();
 *   const handleClick = () => {
 *     setVisible(!visible);
 *     props.onClick && props.onClick(!visible);
 *   };
 *
 *   if (isBrowser) {
 *     return (
 *       <button className="Knob" aria-pressed={visible} onClick={handleClick}>
 *         {props.label}
 *       </button>
 *     );
 *   }
 *   return <span className="Knob">{props.label}</span>
 * }
 * ```
 *
 * SSR support mode can optionally be set to:
 *
 * - `true` (the default) enables the serve-side phase (returns `true` then `undefined`).
 * - `false` disables (skips) the serve-side phase (always returns `true`).
 * - `"ssr-only"` disables (skips) the browser-side phase (always returns `undefined`).
 *
 * NOTE: The `ssrSupport` parameter is ignored after the initial render.
 */
export const useIsBrowserSide = (ssrSupport = DEFAULT_SSR_SUPPORT) =>
  // This implementation is based on sergiodxa/remix-utils `useHydrated` hook
  _useSyncExternalStore!(
    _stableSubscribe,
    ssrSupport === 'ssr-only' ? _retFalse : _retTrue,
    ssrSupport ? _retFalse : _retTrue
  ) || undefined;

/**
 * Returns `true` if `useEffect` has not executed yet.
 *
 * This signals that we're in "server-side rendering" mode
 * and it's not yet appropriate to do JS-driven UI enhancements.
 *
 * ```js
 * const Knob = (props) => {
 *   const [visible, setVisible] = useState(false);
 *   const isServer = useIsServerSide();
 *   const handleClick = () => {
 *     setVisible(!visible);
 *     props.onClick && props.onClick(!visible);
 *   };
 *
 *   if (isServer) {
 *     return <span className="Knob">{props.label}</span>
 *   }
 *   return (
 *     <button className="Knob" aria-pressed={visible} onClick={handleClick}>
 *       {props.label}
 *     </button>
 *   );
 * }
 * ```
 *
 * SSR support mode can optionally be set to:
 *
 * - `true` (the default) enables the serve-side phase (returns `true` then `undefined`).
 * - `false` disables (skips) the serve-side phase (always returns `undefined`).
 * - `"ssr-only"` disables (skips) the browser-side phase (always returns `true`).
 *
 * NOTE: The `ssrSupport` parameter is ignored after the initial render.
 */
export const useIsServerSide = (ssrSupport?: SSRSupport) => !useIsBrowserSide(ssrSupport);

// ---------------------------------------------------------------------------

const _history: Array<SSRSupport> = [];

/**
 * Allows you to set a the default SSRSupport value for the `useIsBRowserSide`
 * and `useIsServerSide` hooks.
 *
 * Example use:
 *
 * ```js
 * setDefaultSSR(false);
 * ```
 *
 * The values are pushed to a simple stack, and if you want to revert
 * a temporarily set value, use the `setDefaultSSR.pop()` method
 * to go back to the previous value. Example:
 *
 * ```js
 * setDefaultSSR('ssr-only');
 * // ...render some components...
 * setDefaultSSR.pop(); // go back to the previous state
 * ```
 *
 * You explicitly switch to using the library's default by passing `undefined`
 * as an argument — like so:
 *
 * ```js
 * setDefaultSSR(undefined);
 * ```
 */
export const setDefaultSSR = (ssrSupport: SSRSupport | undefined) => {
  DEFAULT_SSR_SUPPORT = ssrSupport != null ? ssrSupport : defaultSSRSupport;
  _history.unshift(DEFAULT_SSR_SUPPORT);
};

/**
 * Unsets the last pushed defaultSSR value
 */
setDefaultSSR.pop = () => {
  _history.shift();
  DEFAULT_SSR_SUPPORT = _history[0] != null ? _history[0] : defaultSSRSupport;
};
