import { em, px, rem } from 'es-in-css';

import { colorVars } from './colors';
import { buildVariables } from './cssutils';
import { fontVars } from './font';

export const linkVars = buildVariables([
  'link_color',
  'link_color__hover',
  'link_weight',

  'link_underline__thickness',
  'link_underline',
  'link_underline__hover',
  'link_underline_offset',

  'link_transition',

  'link_focus_outlineColor',
  'link_focus_outline',
  'link_focus_outlineOffset',
]);

const _l = linkVars.vars;

export const linkVarDeclarations = linkVars.declare({
  link_color: colorVars.vars.color_faxafloi_100,
  link_color__hover: colorVars.vars.color_faxafloi_100,
  link_weight: fontVars.vars.font_weight__bold,

  link_underline__thickness: rem(2 / 16),
  link_underline: `${_l.link_underline__thickness} solid transparent`,
  link_underline__hover: `${_l.link_underline__thickness} solid currentColor`,
  link_underline_offset: em(0.15), // 2.4px

  link_transition: `200ms ease-in`,

  link_focus_outlineColor: `currentColor`,
  link_focus_outline: `3px solid currentColor`,
  link_focus_outlineOffset: px(2),
});
