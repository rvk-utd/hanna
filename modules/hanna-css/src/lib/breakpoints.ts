import { CssMediaQueryString, px } from 'es-in-css';

/** Starting viewport-width breakpoints INCLUDING `grid.margin__*` */
export const bp = /*#__PURE__*/ (() =>
  ({
    wide: px(1368), // grid.margin__wide: 80;
    netbook: px(980),
    tablet: px(760),
    phablet: px(480),
    phone: px(320), // grid.margin__phone: 20;
  } as const))();
// NOTE: 20px at 320px is equivalent to
// 24px at 375px,`+` and 26px at 415px

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
    wide,
    netbook,
    tablet,
    phablet,
    phone,
    netbook_up,
    tablet_netbook,
    tablet_up,
    phablet_tablet,
    phablet_netbook,
    phablet_up,
    phone_phablet,
    phone_tablet,
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
 * ```css
 * ·@media ${screen_and + mq.tablet} {
 * ·  div { display: block; }
 * ·}
 * ```
 */
export const screen_and = 'screen and ';

export const baseMQs = ['phone', 'phablet', 'tablet', 'netbook', 'wide'] satisfies Array<
  keyof typeof mq
>;
