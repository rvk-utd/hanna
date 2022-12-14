import { FormatChange } from 'formatchange';

/**
 * A module that contains info about the currently active screen media format
 * and a way to subscribe/unsubscribe callbacks to whenever the window
 * switches over to another "media-format"
 *
 * The Hanna CSS module/token `-basics` configures certain media-query breakpoints with
 * human-friendly names (i.e. "phone", "phablet", "tablet", "netbook", "wide")
 *
 * See https://github.com/maranomynet/formatchange#3-getting-the-current-media-format
 * for more info.
 *
 * ```ts
 * import { formatMonitor } from '@reykjavik/hanna-utils';
 *
 * formatMonitor.media.is // e.g. 'wide';
 *
 * formatMonitor.subscribe((media) => {
 *   media === formatMonitor.media // true;
 *   // Do something because `media.is` has changed,
 * })
 * ```
 *
 * (This utility is, for example, utilized by the hanna-react package to generate
 * its `useFormatMonitor` hook.)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#formatmonitor
 */
export const formatMonitor = new FormatChange({
  Hamburger: {
    phone: true,
    phablet: true,
    tablet: true,
  },
  Topmenu: {
    netbook: true,
    // desktop: true,
    wide: true,
  },
});

export type MediaFormat = typeof formatMonitor.media;
