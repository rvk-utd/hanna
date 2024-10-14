import { CssMediaQueryString, px } from 'es-in-css';

/**
 * Starting viewport-width breakpoints INCLUDING `grid.margin__*`
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#raw-design-constants
 */
export const bp = /*#__PURE__*/ (() =>
  ({
    /** The start/lower boundary of the "wide" media query format */
    wide: px(1368), // grid.margin__wide: 80;
    /** The start/lower boundary of the "netbook" media query format */
    netbook: px(980),
    /** The start/lower boundary of the "tablet" media query format */
    tablet: px(760),
    /** The start/lower boundary of the "phablet" media query format */
    phablet: px(480),
    /** The start/lower boundary of the "phone" media query format */
    phone: px(320), // grid.margin__phone: 20; (NOTE: 20px at 320px is equivalent to 24px at 375px,`+` and 26px at 415px)
  } as const))();

/**
 * The `mq` object contains pre-fabricated media-query strings for the basic
 * Hanna media types.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
 */
export const mq = /*#__PURE__*/ (() => {
  const maxBp_netbook = px(bp.wide - 1); // grid.margin__wide: 80;
  const maxBp_tablet = px(bp.netbook - 1);
  const maxBp_phablet = px(bp.tablet - 1);
  const maxBp_phone = px(bp.phablet - 1);

  const wide = `(min-width: ${bp.wide})` as CssMediaQueryString;
  const netbook = (`(min-width: ${bp.netbook})` +
    ` and (max-width: ${maxBp_netbook})`) as CssMediaQueryString;
  const tablet = (`(min-width: ${bp.tablet})` +
    ` and (max-width: ${maxBp_tablet})`) as CssMediaQueryString;
  const phablet = (`(min-width: ${bp.phablet})` +
    ` and (max-width: ${maxBp_phablet})`) as CssMediaQueryString;
  const phone = `(max-width: ${maxBp_phone})` as CssMediaQueryString;

  const netbook_up = `(min-width: ${bp.netbook})` as CssMediaQueryString;

  const tablet_netbook = (`(min-width: ${bp.tablet})` +
    ` and (max-width: ${maxBp_netbook})`) as CssMediaQueryString;
  const tablet_up = `(min-width: ${bp.tablet})` as CssMediaQueryString;

  const phablet_tablet = (`(min-width: ${bp.phablet})` +
    ` and (max-width: ${maxBp_tablet})`) as CssMediaQueryString;
  const phablet_netbook = (`(min-width: ${bp.phablet})` +
    ` and (max-width: ${maxBp_netbook})`) as CssMediaQueryString;
  const phablet_up = `(min-width: ${bp.phablet})` as CssMediaQueryString;

  const phone_phablet = `(max-width: ${maxBp_phablet})` as CssMediaQueryString;
  const phone_tablet = `(max-width: ${maxBp_tablet})` as CssMediaQueryString;
  const phone_netbook = `(max-width: ${maxBp_netbook})` as CssMediaQueryString;

  // High level media-formats
  const Hamburger = phone_tablet;
  const Topmenu = netbook_up;

  return {
    /**
     * Captures desktops and larger laptops (~ 1368px wide and up)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    wide,
    /**
     * Captures tiny laptops and iPads in landscape mode (~ 980—1368px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    netbook,
    /**
     * Captures typical tablets like iPads, in portrait mode (~ 760—980px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    tablet,
    /**
     * Captures mobile phones in landscape mode and small tablets (~ 480—760px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phablet,
    /**
     * Captures typical mobile phone in portrait mode (~ 320—480px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phone,
    /**
     * Captures "netbook" and wider media types (~ 980px wide and up)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    netbook_up,
    /**
     * Captures both "tablet" and "netbook" media types (~ 760—1368px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    tablet_netbook,
    /**
     * Captures "tablet" and all wider media types (~ 760px wide and up)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    tablet_up,
    /**
     * Captures both "phablet" and "tablet" media types (~ 480—760px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phablet_tablet,
    /**
     * Captures "phablet", "tablet" and "netbook" media types (~ 480—980px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phablet_netbook,
    /**
     * Captures "phablet" and all wider media types (~ 480px wide and up)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phablet_up,
    /**
     * Captures "phone" and "phablet" media types (~ 320—760px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phone_phablet,
    /**
     * Captures "phone", "phablet" and "tablet" media types (~ 320—980px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phone_tablet,
    /**
     * Captures "phone", "phablet", "tablet" and "netbook" media types (~ 320—1368px wide)
     *
     * @see https://www.npmjs.com/package/@reykjavik/hanna-css#mq
     */
    phone_netbook,

    /** @deprecated Use `mq.phone_tablet` instead  (Will be removed in v0.5) */
    Hamburger, // eslint-disable-line deprecation/deprecation
    /** @deprecated Use `mq.netbook_up` instead  (Will be removed in v0.5) */
    Topmenu, // eslint-disable-line deprecation/deprecation
  } as const satisfies Record<string, CssMediaQueryString>;
})();

/**
 * Useful for appending `screen and ` in front of `mq.*` variables
 * without triggering CSS warnings in VSCode.
 *
 * ```ts
 * css`
 * ׁׁ  @media ${screen_and + mq.tablet} {
 *     div { display: block; }
 *   }
 * `
 * ```
 */
export const screen_and = 'screen and ';

/** Array containing the names of the base media-queries (not exported by the library) */
export const baseMQs = ['phone', 'phablet', 'tablet', 'netbook', 'wide'] satisfies Array<
  keyof typeof mq
>;
