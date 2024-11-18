import { css, scoped } from 'es-in-css';

import { colors } from '../lib/colors.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { LinkStyle, LinkStyle_SameColor } from './styles/links.js';
import { hideText_css } from './utils/hideText.js';
import { prem } from './utils/miscUtils.js';

const tooltipBgColor = 'rgba(0, 0, 0, 0.7)';

const triangleH = 6;
const triangleW = 14;

const openAnimation = scoped('DropdownMenu-open');

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
    ${LinkStyle}
    transition: none;
  }

  .Tooltip:hover,
  .Tooltip:active {
    border-bottom-color: ${colors.white};
  }

  .Tooltip__trigger::marker {
    content: none;
  }
  .Tooltip__trigger::-webkit-details-marker {
    display: none;
  }

  .Tooltip__trigger--icononly {
    ${hideText_css('soft')}
    width: ${prem(25)};
  }

  .Tooltip__trigger::before {
    ${iconStyle(vars.icon__info)}
    width: ${prem(25)};
    height: ${prem(25)};
    display: inline-block;
    text-align: center;
  }

  .Tooltip__content {
    width: ${prem(250)};
    color: ${vars.color_white};
    background-color: ${tooltipBgColor};
    font-weight: normal;
    font-size: ${prem(12)};
    border-radius: ${prem(8)};
    box-sizing: border-box;
    line-height: 1.5;
    padding: ${prem(10)} ${prem(20)};
    position: absolute;
    top: var(--tooltip-content-pos-y);
    left: var(--tooltip-content-pos-x);
    z-index: 1;
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
