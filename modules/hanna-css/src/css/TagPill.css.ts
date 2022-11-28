import { css, em } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { LinkStyle_Reset } from './styles/links';
import { hideText_css } from './utils/hideText';

export default css`
  // TODO: Empty deps below. Should it be removed?
  /*!@deps
  */
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

      --TagPill--background: ${vars.color_suld_50};
      --TagPill--background--hover: ${vars.color_suld_150};
      background-color: var(--TagPill--background);
      color: ${vars.color_suld_200};
      border-radius: ${vars.space_0$5};
      text-align: center;
      --TagPill--height: ${vars.space_3};
      height: var(--TagPill--height);
      line-height: var(--TagPill--height);
      font-size: ${vars.font_label_size};
      font-weight: ${vars.font_weight__bold};

      box-sizing: content-box;
      min-width: ${vars.space_5};
      padding: 0 ${vars.space_1};

      margin-bottom: ${vars.space_2};
      margin-right: ${vars.space_2};
    }
    .TagPill--large {
      --TagPill--height: calc(${vars.space_3} + ${vars.space_0$5});
      font-size: ${vars.font_button_size};
      font-weight: ${vars.font_weight__normal};
    }
    .TagPill--color--green {
      --TagPill--background: ${vars.color_ellidaardalur_50};
      --TagPill--background--hover: ${vars.color_ellidaardalur_150};
    }
    .TagPill--color--yellow {
      --TagPill--background: ${vars.color_nautholsvik_50};
      --TagPill--background--hover: ${vars.color_nautholsvik_150};
    }
    .TagPill--color--orange {
      --TagPill--background: ${vars.color_blafjoll_50};
      --TagPill--background--hover: ${vars.color_blafjoll_150};
    }
    .TagPill--color--red {
      --TagPill--background: ${vars.color_heidmork_50};
      --TagPill--background--hover: ${vars.color_heidmork_150};
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
      background-color: var(--TagPill--background--hover);
      color: ${vars.color_suld_0};
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
      background-color: var(--TagPill--background--hover);
      color: ${vars.color_suld_0};
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
      background-color: var(--TagPill--background--hover);
      color: ${vars.color_suld_0};
    }

    .TagPill[disabled],
    .TagPill[aria-disabled],
    .TagPill[aria-pressed],
    .TagPill__button[disabled],
    .TagPill__button[aria-disabled],
    .TagPill__button[aria-pressed],
    .TagPill__remove[disabled],
    .TagPill__remove[aria-disabled],
    .TagPill__remove[aria-pressed] {
      ${WARNING__('.TagPill buttons/links can not be disabled')};
    }
  }
`;
