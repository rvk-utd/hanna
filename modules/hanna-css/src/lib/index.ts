import type { VariableStyles, VariableValue } from 'es-in-css';
import { makeVariables as _makeVariables } from 'es-in-css';

export * from 'es-in-css';

export const makeVariables = <T extends string>(
  input: Record<T, VariableValue>
): VariableStyles<T> =>
  _makeVariables(input, {
    nameRe: /^[a-z0-9$_-]+$/i,
    // .Tabs$$tab__borderWidth  -->  var(--Tabs__tab--borderWidth)
    toCSSName: (name) => name.replace(/_/g, '-').replace(/\$/g, '_'),
  });
makeVariables.join = _makeVariables.join;

// Starting breakpoints **including* $grid-margin--*
const bp = {
  wide: 1368, // $grid-margin--wide: 80;
  netbook: 980,
  tablet: 760,
  phablet: 480,
  phone: 320, // $grid-margin--phone: 20;
};
// NOTE: 20px at 320px is equivalent to
// 24px at 375px, and 26px at 415px

const $bp = makeVariables({
  bp_w_phone: bp.phone, // Widths below 320px are not supported
  bp_w_phablet: bp.phablet,
  bp_w_tablet: bp.tablet,
  bp_w_netbook: bp.netbook, // iPad in landscape orientation
  bp_w_wide: bp.wide,
});

const vars = makeVariables.join(
  $bp,
  makeVariables({
    bp_w_Hamburger: $bp.vars.bp_w_netbook,
  })
);

export const cssVars = vars.vars;
export const cssVarOverride = vars.override;
export const cssVarDeclarations = vars.declarations;
