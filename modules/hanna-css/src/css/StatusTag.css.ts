import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';

export const StatusTagVariables = buildVariables(
  ['background', 'borderColor', 'lightColor', 'height', 'paddingInline'],
  'StatusTag'
);
const Stv = StatusTagVariables.vars;

export default css`
  @media screen {
    .StatusTag {
      ${StatusTagVariables.declare({
        background: vars.color_faxafloi_25,
        borderColor: vars.color_faxafloi_50,
        lightColor: vars.color_faxafloi_100,
        height: vars.space_3,
        paddingInline: vars.space_1,
      })};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box;
      height: ${Stv.height};
      padding: 0 ${Stv.paddingInline};
      border-radius: ${vars.space_0$5};
      border: 1px solid ${Stv.borderColor};
      background: ${Stv.background};
      color: ${vars.color_suld_200};
      font: ${vars.font_label};
      font-weight: ${vars.font_weight__bold};
      vertical-align: middle;
      white-space: nowrap;

      margin-bottom: ${vars.space_2};
      margin-right: ${vars.space_2};
    }

    .StatusTag--large {
      ${StatusTagVariables.override({
        height: vars.space_4,
        paddingInline: vars.space_1$5,
      })};
    }

    .StatusTag__light {
      color: ${Stv.lightColor};
      background: currentColor;
      border-radius: 50%;
      flex: 0 0 auto;
      width: ${vars.space_1};
      height: ${vars.space_1};
      display: block;
    }

    .StatusTag__label {
      display: inline-block;
    }

    .StatusTag--color--grey {
      ${StatusTagVariables.override({
        borderColor: vars.color_suld_50,
        background: vars.color_suld_25,
        lightColor: vars.color_suld_100,
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
