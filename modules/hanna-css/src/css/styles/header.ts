import { css, VariablePrinter } from 'es-in-css';
import Color from 'es-in-css/_/color.types';

import { mq } from '../../lib/breakpoints.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { hideText_css } from '../utils/hideText.js';
import { prem } from '../utils/miscUtils.js';

import { LinkStyle_Reset } from './links.js';

type FreezeScrollProps = {
  immediate?: boolean;
  fixHeader?: boolean;
  hideSkiplink?: boolean;
  hideAlerts?: boolean;
};

export const LayoutHeaderLogo = () => css`
  ${LinkStyle_Reset(true)}
  ${hideText_css('soft')}
  display: block;
  width: ${prem(182)};
  height: ${prem(53)};

  & > svg,
  & > img,
  & > * > svg,
  & > * > img {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    object-fit: contain;
    object-position: 0% 50%;
    margin-right: ${prem(10)};
    margin-left: -1px;
  }

  @media ${mq.Hamburger} {
    margin: ${prem(-10)};
    padding: ${prem(10)};
    overflow: hidden;
    box-sizing: content-box;

    > div {
      display: inline-block;
    }

    & > svg,
    & > img,
    & > * > svg,
    & > * > img {
      width: ${prem(185)};
      object-fit: cover;
      margin-right: ${prem(21)};
    }

    // // Hide the text layer within the logo
    // svg .logo-text {
    // 	display: none;
    // }
  }
`;

export const freezeScroll_css = ({
  immediate = false,
  fixHeader = false,
  hideSkiplink = false,
  hideAlerts = true,
}: FreezeScrollProps) => css`
  & {
    overflow-y: hidden;
  }
  > body {
    padding-right: ${vars.grid_margin};
  }
  ${hideAlerts &&
  css`
    .Layout__alerts {
      max-height: 0;
      ${immediate &&
      css`
        transition-duration: 0ms;
      `}
    }
  `}
  ${fixHeader &&
  css`
    .Layout__header {
      position: fixed;
      top: 0;
      left: 0;
      right: ${vars.browser_scrollbar_width};
    }
  `}
    ${hideSkiplink &&
  css`
    .Layout__header__skiplink {
      opacity: 0;
      visibility: hidden;
    }
  `}
`;

export const LayoutHeaderUnderlay_css = (color: Color | VariablePrinter) => css`
  content: '';
  position: fixed;
  z-index: 1;
  color: ${color};
  background-color: currentColor;
  box-shadow: 0 0.67em 0.33em -0.33em currentColor;
  top: 0;
  left: 0;
  right: 0;
  height: ${vars.Layout$$header_height};
`;
