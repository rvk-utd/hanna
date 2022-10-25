import { Expect, Extends } from '@reykjavik/hanna-utils';
import { RawMediaQuery } from 'es-in-css';

// Starting breakpoints **including* $grid-margin--*
export const bp = {
  wide: 1368, // $grid-margin--wide: 80;
  netbook: 980,
  tablet: 760,
  phablet: 480,
  phone: 320, // $grid-margin--phone: 20;
} as const;
// NOTE: 20px at 320px is equivalent to
// 24px at 375px,`+` and 26px at 415px

const wide: RawMediaQuery = `(min-width: ${bp.wide}px)`;
const netbook: RawMediaQuery =
  `(min-width: ${bp.netbook}px)` + ` and (max-width: ${bp.wide - 1}px)`;
const tablet: RawMediaQuery =
  `(min-width: ${bp.tablet}px)` + ` and (max-width: ${bp.netbook - 1}px)`;
const phablet: RawMediaQuery =
  `(min-width: ${bp.phablet}px)` + ` and (max-width: ${bp.tablet - 1}px)`;
const phone: RawMediaQuery = `(max-width: ${bp.phablet - 1}px)`;

const netbook_up: RawMediaQuery = `(min-width: ${bp.netbook}px)`;

const tablet_netbook: RawMediaQuery =
  `(min-width: ${bp.tablet}px)` + ` and (max-width: ${bp.wide - 1}px)`;
const tablet_up: RawMediaQuery = `(min-width: ${bp.tablet}px)`;

const phablet_tablet: RawMediaQuery =
  `(min-width: ${bp.phablet}px)` + ` and (max-width: ${bp.netbook - 1}px)`;
const phablet_netbook: RawMediaQuery =
  `(min-width: ${bp.phablet}px)` + ` and (max-width: ${bp.wide - 1}px)`;
const phablet_up: RawMediaQuery = `(min-width: ${bp.phablet}px)`;

const phone_phablet: RawMediaQuery = `(max-width: ${bp.tablet - 1}px)`;
const phone_tablet: RawMediaQuery = `(max-width: ${bp.netbook - 1}px)`;
const phone_netbook: RawMediaQuery = `(max-width: ${bp.wide - 1}px)`;

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

// TODO: Use `satisfies` as soon as TypeScript 4.9 is out
export const baseMQs = ['phone', 'phablet', 'tablet', 'netbook', 'wide'] as const;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Satisfies_baseMQs = Expect<Extends<typeof baseMQs[number], keyof typeof mq>>;
