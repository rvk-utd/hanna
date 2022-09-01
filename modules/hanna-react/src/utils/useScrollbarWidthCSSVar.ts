import { useEffect } from 'react';
import getScrollbarWidth from '@hugsmidjan/qj/getScrollbarWidth';

/**
 * Measures the scrollbar width and sets it as a CSS variable on
 * the `<html/>` element.
 *
 * Use this hook inside all of your top-level layout components
 *
 * The name of the variable is `--browser-scrollbar-width`, and you can
 * reference it manually in your CSS, or via the hanna-css variable helper.
 *
 * ```ts
 * import { hannaVars } from '@reykjavik/hanna-css';
 *
 * console.log(hannaVars.browser_scrollbar_width.toString())
 * // "var(--browser-scrollbar-width)"
 * ```
 */
export const useScrollbarWidthCSSVar = () =>
  useEffect(() => getScrollbarWidth.setCSSvar(), []);
