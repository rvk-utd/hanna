import { css, em } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { LinkStyle_Reset } from './styles/links.js';
import { hideText_css } from './utils/hideText.js';

export const TagPillVariables = buildVariables(
  ['background', 'background__hover', 'color', 'color__hover', 'height'],
  'TagPill'
);
const Tv = TagPillVariables.vars;

export default css`
  @media screen {
    .TagPill {
      ${LinkStyle_Reset(true)}
      // normalize links and buttons
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
      text-decoration: none;
      position: relative;

      transition: none;

      ${TagPillVariables.declare({
        background: vars.color_suld_50,
        background__hover: vars.color_suld_150,
        height: vars.space_3,
        color: vars.color_suld_200,
        color__hover: vars.color_suld_0,
      })};
      background-color: ${Tv.background};
      color: ${Tv.color};
      border-radius: ${vars.space_0$5};
      text-align: center;
      height: ${Tv.height};
      line-height: ${Tv.height};
      font-size: ${vars.font_label_size};
      font-weight: ${vars.font_weight__bold};

      box-sizing: content-box;
      min-width: ${vars.space_5};
      padding: 0 ${vars.space_1};

      margin-bottom: ${vars.space_2};
      margin-right: ${vars.space_2};
    }
    .TagPill--large {
      ${TagPillVariables.override({
        height: `calc(${vars.space_3} + ${vars.space_0$5})`,
      })};
      font-size: ${vars.font_button_size};
      font-weight: ${vars.font_weight__normal};
    }
    .TagPill--color--green {
      ${TagPillVariables.override({
        background: vars.color_ellidaardalur_50,
        background__hover: vars.color_ellidaardalur_150,
      })}
    }
    .TagPill--color--yellow {
      ${TagPillVariables.override({
        background: vars.color_nautholsvik_50,
        background__hover: vars.color_nautholsvik_150,
      })}
    }
    .TagPill--color--orange {
      ${TagPillVariables.override({
        background: vars.color_blafjoll_50,
        background__hover: vars.color_blafjoll_150,
      })}
    }
    .TagPill--color--red {
      ${TagPillVariables.override({
        background: vars.color_heidmork_50,
        background__hover: vars.color_heidmork_150,
      })}
    }

    .TagPill__button {
      transition: inherit;
      display: block;
      margin: 0 ${vars.space_1__neg};
      padding-left: ${vars.space_1};
      padding-right: calc(${vars.space_1$5} + 1em);
      border-radius: ${vars.space_0$5};
    }

    .TagPill__remove {
      ${hideText_css('soft')}
      box-sizing: content-box;
      width: 1em;
      padding-left: ${vars.space_0$5};
      padding-right: ${vars.space_1};
      margin-right: ${vars.space_1__neg};
      border-radius: ${vars.space_0$5};
      float: right;
      position: relative;
    }
    button.TagPill__remove:hover {
      margin-left: ${vars.space_0$5__neg};
      padding-left: ${vars.space_1};
      background-color: ${Tv.background__hover};
      color: ${Tv.color__hover};
    }
    .TagPill__button + .TagPill__remove {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
    }
    .TagPill__button:hover + .TagPill__remove,
    .TagPill__button:active + .TagPill__remove {
      opacity: 0.33;
      background-color: ${Tv.background__hover};
      color: ${Tv.color__hover};
    }

    .TagPill__remove::before {
      ${iconStyle(vars.icon__close)}
      font-size: ${em(12 / 16)};
      width: 100%;
      margin-right: 2em;
    }

    a.TagPill:hover,
    a.TagPill:active,
    button.TagPill:hover,
    .TagPill__button:hover,
    .TagPill__button:active {
      background-color: ${Tv.background__hover};
      color: ${Tv.color__hover};
    }

    .TagPill:disabled,
    .TagPill[aria-disabled],
    .TagPill[aria-pressed],
    .TagPill__button:disabled,
    .TagPill__button[aria-disabled],
    .TagPill__button[aria-pressed],
    .TagPill__remove:disabled,
    .TagPill__remove[aria-disabled],
    .TagPill__remove[aria-pressed] {
      ${WARNING__('.TagPill buttons/links can not be disabled')};
    }
  }
`;
