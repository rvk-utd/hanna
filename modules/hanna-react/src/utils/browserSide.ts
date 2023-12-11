import { useEffect, useState } from 'react';
/**
 * Indicates whether server-side rendering is supported or not.
 *
 * The `ssr-only` value is useful for cases where you need
 * to demo the server-rendered version in a browser.
 */
export type SSRSupport = boolean | 'ssr-only';

export type SSRSupportProps = {
  /**
   * Indicates whether server-side rendering is supported or not.
   *
   * The `ssr-only` value is useful for cases where you need
   * to demo the server-rendered version in a browser.
   */
  ssr?: SSRSupport;
};

let alreadyBrowserSide = false;

const defaultSSRSupport: SSRSupport = true;
/**
 * The default value use for the optional `ssrSupport` parameter
 * on the `useIsBRowserSide` and `useIsServerSide` hooks.`
 */
let DEFAULT_SSR_SUPPORT: SSRSupport = defaultSSRSupport;

/**
 * Low-level useState wrapper that initializes the state to one value
 * during initial render and then updates it to another value
 * once the component has been mounted.
 *
 * After that it's just a normal [value, setValue] pair.
 *
 * NOTE: The optional `ssrSupport` parameter is ignored after the initial render
 */
const useClientState = <T, U>(
  serverState: T | (() => T),
  clientState: U | (() => U),
  /**
   * Indicates whether server-side rendering is supported or not.
   *
   * The `ssr-only` value is useful for cases where you need
   * to demo the server-rendered version in a browser.
   */
  ssrSupport: SSRSupport = DEFAULT_SSR_SUPPORT
) => {
  const stateTuple = useState<T | U>(
    () =>
      (ssrSupport === 'ssr-only'
        ? serverState
        : ssrSupport && !alreadyBrowserSide
        ? serverState
        : clientState) as T | U // TODO: Remove this type assertion once @types/react and typescript have been updated
  );
  useEffect(
    () => {
      alreadyBrowserSide = true;
      if (ssrSupport !== 'ssr-only') {
        stateTuple[1](clientState);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return stateTuple;
};

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
export const useIsServerSide = (ssrSupport?: SSRSupport) =>
  useClientState(true, false, ssrSupport)[0] || undefined;

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
export const useIsBrowserSide = (ssrSupport?: SSRSupport) =>
  useClientState(false, true, ssrSupport)[0] || undefined;

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
