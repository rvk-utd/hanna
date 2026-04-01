import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';

export const StatusTagVariables = buildVariables(
  ['background', 'borderColor', 'lightColor'],
  'StatusTag'
);
const Stv = StatusTagVariables.vars;

export default css`
  @media screen {
    .StatusTag {
      ${StatusTagVariables.declare({
        borderColor: vars.color_suld_50,
        background: vars.color_suld_25,
        lightColor: vars.color_suld_100,
      })};
      display: inline-flex;
      font: ${vars.font_label};
      font-weight: ${vars.font_weight__bold};
      align-items: center;
      padding: ${vars.space_0$5} ${vars.space_1};
      border: 1px solid ${Stv.borderColor};
      border-radius: ${vars.space_0$5};
      background: ${Stv.background};
      color: ${vars.color_suld_200};
      vertical-align: middle;
      white-space: nowrap;

      margin-right: ${vars.space_2};
      margin-bottom: ${vars.space_2};
    }

    .StatusTag--large {
      padding: ${vars.space_1} ${vars.space_1$5};
    }

    .StatusTag::before {
      content: '';
      color: ${Stv.lightColor};
      background: currentColor;
      border-radius: 50%;
      flex: 0 0 auto;
      width: ${vars.space_1};
      height: ${vars.space_1};
      margin-right: 6px; /* Figma design has 6px space */
    }
    .StatusTag--light--off::before {
      content: none;
    }

    .StatusTag__label {
      display: inline-block;
    }

    .StatusTag--color--blue {
      ${StatusTagVariables.override({
        background: vars.color_faxafloi_25,
        borderColor: vars.color_faxafloi_50,
        lightColor: vars.color_faxafloi_100,
      })};
    }
    .StatusTag--color--green {
      ${StatusTagVariables.override({
        borderColor: vars.color_ellidaardalur_100,
        background: vars.color_ellidaardalur_50,
        lightColor: vars.color_ellidaardalur_100,
      })};
    }
    .StatusTag--color--yellow {
      ${StatusTagVariables.override({
        borderColor: vars.color_nautholsvik_100,
        background: vars.color_nautholsvik_50,
        lightColor: vars.color_nautholsvik_100,
      })};
    }
    .StatusTag--color--red {
      ${StatusTagVariables.override({
        borderColor: vars.color_heidmork_100,
        background: vars.color_heidmork_50,
        lightColor: vars.color_heidmork_100,
      })};
    }
  }
`;
