import { getFormatMonitor } from '@reykjavik/hanna-utils';
import { makeFormatMonitorHook } from 'formatchange/react';

// ==================================================

/**
 * Pass a callback that gets called whenever the browser window
 * resizes past one of the preconfigured "media-format" breakpoints.
 *
 * Exmple use:
 *
 * ```ts
 * import { useFormatMonitor } from '@reykjavik/hanna-react/utils';
 *
 * useFormatMonitor((media) => {
 *   if (media.is === 'phone') {
 *     // do something clever because the window
 *     // just became "phone" sized.
 *   }
 *   if (media.was === 'phone') {
 *     // do something clever because the window
 *     // just stopped being "phone" sized.
 *   }
 * })
 * ```
 *
 * The `media` argument has the following properties:
 *
 * ```ts
 *  // type Formats = 'phone' | 'phablet' | 'tablet' | 'netbook' | 'wide'
 *  media.is // : Format
 *  media.was // ?: Format
 *  // Category/mode boolean flags
 *  // (Hamburger refers to the "mobile menu" mode)
 *  media.isTopmenu
 *  media.isHamburger
 *  media.wasTopmenu
 *  media.wasHamburger
 *  media.becameTopmenu
 *  media.becameHamburger
 *  media.leftTopmenu
 *  media.leftHamburger
 * ```
 */
export const useFormatMonitor = makeFormatMonitorHook(getFormatMonitor);
