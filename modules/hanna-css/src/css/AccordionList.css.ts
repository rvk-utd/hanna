import { css } from 'es-in-css';

import { between_container, between_phone_phablet } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { buildVariables } from '../lib/cssutils';
import { cols_px } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { prem } from './utils/misc';
import { SeenEffect__fadeup } from './utils/seenEffects';
import { textContent } from './utils/textContent';

const a = buildVariables(['leftIndent', 'iconWidth']);

export default css`
  @media screen {
    .AccordionList {
      ${SeenEffect__fadeup}
      max-width: ${cols_px(8)};
      margin-top: ${between_container(32, 56)};

      ${a.declare({
        leftIndent: between_phone_phablet(32, 48),
        iconWidth: between_phone_phablet(24, 36),
      })}

      @media ${mq.tablet_up} {
        ${a.override({
          leftIndent: vars.grid_1_1,
          iconWidth: vars.grid_1,
        })}
      }
    }
    .AccordionList--wide {
      max-width: ${cols_px(11)};
    }

    .AccordionList__item {
      margin-bottom: ${vars.space_7};
    }
    .AccordionList__item--disabled {
      opacity: 0.5;
    }

    .AccordionList__title {
      font: ${vars.font_sh_s};
      font-weight: ${vars.font_weight__bold};
      padding-left: ${a.vars.leftIndent};
    }
    .AccordionList__button {
      position: relative;
      color: inherit;
      margin-left: calc(-1 * ${a.vars.leftIndent});
      padding-left: ${a.vars.leftIndent};
    }
    button.AccordionList__button:not([aria-controls]) {
      ${WARNING__('`aria-controls` missing.')}
    }
    .AccordionList__button:hover,
    .AccordionList__button:active {
      color: ${vars.color_faxafloi_100};
    }
    .AccordionList__button[disabled] {
      color: inherit;
    }

    .AccordionList__button::before {
      ${iconStyle(vars.icon__close)}

      position: absolute;
      left: 0;
      width: ${a.vars.iconWidth};
      font-size: ${prem(14)};
      color: ${vars.color_suld_200};
      transform: rotateZ(45deg);
      transition: transform 200ms ease-in;
    }
    .AccordionList__button[aria-pressed='true']::before,
    .AccordionList__button[aria-expanded='true']::before {
      transform: rotateZ(0);
    }
    .AccordionList__button:hover::before,
    .AccordionList__button:active::before {
      color: ${vars.color_faxafloi_150};
    }

    // ---------------------------------------------------------------------------

    .AccordionList__content {
      ${textContent} // no headings above h4

      font: ${vars.font_bd_l};
      transition: all 200ms ease-in;
      transition-property: opacity, visibility, max-height, padding-top;
      overflow: hidden;
      margin-left: ${a.vars.leftIndent};
      padding-top: ${vars.space_4};
      max-height: 4000px; // DECIDE: is this enough?
      opacity: 1;
    }
    .AccordionList__content h1,
    .AccordionList__content h2,
    .AccordionList__content h3 {
      ${WARNING__('Only use <h4/> and below here')}
    }

    .AccordionList__content .TextBlock {
      max-width: none;
      margin: 0;
    }

    html.before-sprinkling
      .AccordionList__item:not([data-sprinkled])
      > .AccordionList__content {
      display: none;
    }

    .AccordionList__content[hidden] {
      display: block; // override default
      padding-top: 0;
      max-height: 0;
      opacity: 0;
      visibility: hidden;
    }
  }
`;
