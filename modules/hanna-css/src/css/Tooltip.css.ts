import { css, em } from 'es-in-css';

import { font } from '../lib/font.js';
import { hannaVars, hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { LinkStyle, LinkStyle_SameColor } from '../lib/links.js';
import { hideText_css } from './utils/hideText.js';
import { prem } from './utils/miscUtils.js';

const tooltipBgColor = 'rgba(0, 0, 0, 0.7)';

const triangleH = 6;
const triangleW = 14;

const ballSize = em(25 / font.base_size);

const openAnimation = 'Tooltip-open';

export default css`
  @keyframes ${openAnimation} {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .Tooltip {
    display: inline-block;
    position: relative;
    vertical-align: top;
    font-size: ${hannaVars.font_base_size};
    transition: none;
    ${LinkStyle}
  }
  .Tooltip,
  .Tooltip:hover,
  .Tooltip:active {
    padding-bottom: 0;
    border-bottom: none;
  }

  .Tooltip__trigger {
    cursor: auto;
  }
  .Tooltip__trigger--icononly {
    ${hideText_css('soft')}
    width: ${ballSize};
  }

  .Tooltip__trigger::before {
    ${iconStyle(vars.icon__info)}
    width: ${ballSize};
    height: ${ballSize};
    display: inline-block;
    text-align: center;
  }

  .Tooltip__content {
    width: ${prem(250)};
    color: ${vars.color_white};
    background-color: ${tooltipBgColor};
    font-weight: normal;
    font-size: ${hannaVars.font_label_size};
    line-height: 1.5em;
    border-radius: ${prem(8)};
    box-sizing: border-box;
    padding: ${prem(10)} ${prem(20)};
    position: absolute;
    top: var(--tooltip-content-pos-y);
    left: var(--tooltip-content-pos-x);
    z-index: 1;
    transform: translateX(0px); // Needed to fix floating-ui arrow pos calc bug
  }
  [open] > .Tooltip__content {
    animation: ${openAnimation} 200ms ease-in;
  }

  .Tooltip__content::after {
    content: '';
    position: absolute;
    border-width: 0 ${prem(triangleW / 2)};
    border-top-width: ${prem(triangleH)};
    border-style: solid;
    margin: 0 ${prem(-triangleW / 2)};
    border-color: ${tooltipBgColor} transparent transparent transparent;
  }

  .Tooltip--top .Tooltip__content::after {
    left: var(--tooltip-arrow-pos-x);
    top: 100%;
  }

  .Tooltip--bottom .Tooltip__content::after {
    left: var(--tooltip-arrow-pos-x);
    bottom: 100%;
    transform: rotate(180deg);
  }

  .Tooltip__content a {
    ${LinkStyle_SameColor}
  }
`;
