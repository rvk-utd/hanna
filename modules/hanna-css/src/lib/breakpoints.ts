import { Expect, Extends } from '@reykjavik/hanna-utils';
import { px, RawMediaQuery } from 'es-in-css';

// Starting breakpoints **including* $grid-margin--*
export const bp = {
  wide: px(1368), // $grid-margin--wide: 80;
  netbook: px(980),
  tablet: px(760),
  phablet: px(480),
  phone: px(320), // $grid-margin--phone: 20;
} as const;
// NOTE: 20px at 320px is equivalent to
// 24px at 375px,`+` and 26px at 415px

const wide: RawMediaQuery = `(min-width: ${bp.wide})`;
const netbook: RawMediaQuery =
  `(min-width: ${bp.netbook})` + ` and (max-width: ${px(bp.wide - 1)})`;
const tablet: RawMediaQuery =
  `(min-width: ${bp.tablet})` + ` and (max-width: ${px(bp.netbook - 1)})`;
const phablet: RawMediaQuery =
  `(min-width: ${bp.phablet})` + ` and (max-width: ${px(bp.tablet - 1)})`;
const phone: RawMediaQuery = `(max-width: ${px(bp.phablet - 1)})`;

const netbook_up: RawMediaQuery = `(min-width: ${bp.netbook})`;

const tablet_netbook: RawMediaQuery =
  `(min-width: ${bp.tablet})` + ` and (max-width: ${px(bp.wide - 1)})`;
const tablet_up: RawMediaQuery = `(min-width: ${bp.tablet})`;

const phablet_tablet: RawMediaQuery =
  `(min-width: ${bp.phablet})` + ` and (max-width: ${px(bp.netbook - 1)})`;
const phablet_netbook: RawMediaQuery =
  `(min-width: ${bp.phablet})` + ` and (max-width: ${px(bp.wide - 1)})`;
const phablet_up: RawMediaQuery = `(min-width: ${bp.phablet})`;

const phone_phablet: RawMediaQuery = `(max-width: ${px(bp.tablet - 1)})`;
const phone_tablet: RawMediaQuery = `(max-width: ${px(bp.netbook - 1)})`;
const phone_netbook: RawMediaQuery = `(max-width: ${px(bp.wide - 1)})`;

// High level media-formats
const Hamburger = phone_tablet;
const Topmenu = netbook_up;

export const mq = {
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

// TODO: Use `satisfies` as soon as TypeScript 4.9 is out
export const baseMQs = ['phone', 'phablet', 'tablet', 'netbook', 'wide'] as const;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Satisfies_baseMQs = Expect<Extends<typeof baseMQs[number], keyof typeof mq>>;
