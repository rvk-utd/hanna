import { px, RawMediaQuery } from 'es-in-css';

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

  const wide: RawMediaQuery = `(min-width: ${bp.wide})`;
  const netbook: RawMediaQuery =
    `(min-width: ${bp.netbook})` + ` and (max-width: ${maxBp_netbook})`;
  const tablet: RawMediaQuery =
    `(min-width: ${bp.tablet})` + ` and (max-width: ${maxBp_tablet})`;
  const phablet: RawMediaQuery =
    `(min-width: ${bp.phablet})` + ` and (max-width: ${maxBp_phablet})`;
  const phone: RawMediaQuery = `(max-width: ${maxBp_phone})`;

  const netbook_up: RawMediaQuery = `(min-width: ${bp.netbook})`;

  const tablet_netbook: RawMediaQuery =
    `(min-width: ${bp.tablet})` + ` and (max-width: ${maxBp_netbook})`;
  const tablet_up: RawMediaQuery = `(min-width: ${bp.tablet})`;

  const phablet_tablet: RawMediaQuery =
    `(min-width: ${bp.phablet})` + ` and (max-width: ${maxBp_tablet})`;
  const phablet_netbook: RawMediaQuery =
    `(min-width: ${bp.phablet})` + ` and (max-width: ${maxBp_netbook})`;
  const phablet_up: RawMediaQuery = `(min-width: ${bp.phablet})`;

  const phone_phablet: RawMediaQuery = `(max-width: ${maxBp_phablet})`;
  const phone_tablet: RawMediaQuery = `(max-width: ${maxBp_tablet})`;
  const phone_netbook: RawMediaQuery = `(max-width: ${maxBp_netbook})`;

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
    Hamburger,
    Topmenu,
  } as const;
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
