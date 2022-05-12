import { RawMediaQuery } from 'es-in-css';

import { buildVariables } from './cssutils';

// Starting breakpoints **including* $grid-margin--*
export const bp = {
  wide: 1368, // $grid-margin--wide: 80;
  netbook: 980,
  tablet: 760,
  phablet: 480,
  phone: 320, // $grid-margin--phone: 20;
};
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
};

export const baseMQs: Array<keyof typeof mq> = [
  'phone',
  'phablet',
  'tablet',
  'netbook',
  'wide',
];

export const breakpointVars = buildVariables([
  'bp_w_phone',
  'bp_w_phablet',
  'bp_w_tablet',
  'bp_w_netbook',
  'bp_w_wide',
  'bp_w_Hamburger',
]);

export const breakpointVarDeclarations = breakpointVars.declare({
  bp_w_phone: bp.phone, // Widths below 320px are not supported
  bp_w_phablet: bp.phablet,
  bp_w_tablet: bp.tablet,
  bp_w_netbook: bp.netbook, // iPad in landscape orientation
  bp_w_wide: bp.wide,

  bp_w_Hamburger: breakpointVars.vars.bp_w_netbook,
});
