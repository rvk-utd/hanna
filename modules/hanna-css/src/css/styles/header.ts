import { ColorValue, css, VariablePrinter } from 'es-in-css';

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

export const LayoutHeaderHomeLink = () => css`
  /** @deprecated Back-compat  (Remove in Hanna 0.9) */
  a&__logo {
    ${LinkStyle_Reset(true)};
  }

  &__homelink {
    ${LinkStyle_Reset(true)};
    margin: ${prem(-8)};
    padding: ${prem(8)};
    padding-right: 0;
    margin-right: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: content-box;
    max-width: ${prem(224)};
  }
  &__logo {
    order: -1;
    ${hideText_css('soft')}
    display: block;
    width: ${prem(35)}; /* -notext Logo variant */
    height: ${prem(53)};
  }
  &__logo:last-child {
    width: ${prem(182)}; /** Normal full-logo  */
  }
  /** @deprecated Back-compat selector  (Remove in Hanna 0.9) */
  a&__logo {
    box-sizing: content-box;
    width: ${prem(182)};
    margin: ${prem(-8)};
    padding: ${prem(8)};
  }
  /** @deprecated Back-compat styles (Remove in Hanna 0.9) */
  a&__logo > div {
    display: inline-block;
  }

  &__logo > * > svg, /** @deprecated Back-compat selector  (Remove in Hanna 0.9) */
  &__logo > * > img,  /** @deprecated Back-compat selector  (Remove in Hanna 0.9) */
  &__logo > svg,
  &__logo > img {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    object-fit: contain;
    object-position: 0% 50%;
    margin-right: ${prem(10)};
    margin-left: -1px;
  }

  &__sitename {
    position: relative;
    flex-shrink: 1;
    font-size: ${prem(20)};
    line-height: 1.2;
    font-weight: ${vars.font_weight__bold};
    margin-top: -0.25em;
    margin-left: ${vars.space_1$5};
    padding-left: ${vars.space_1$5};
    border-left: 1px solid transparent;
  }
  &__sitename::before {
    content: '';
    position: absolute;
    top: 0.25em;
    left: -1px;
    bottom: 0;
    width: 1px;
    height: ${vars.space_4};
    background-color: ${vars.color_suld_100};
    margin: auto 0;
  }
`;

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

export const LayoutHeaderUnderlay_css = (color: ColorValue | VariablePrinter) => css`
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
