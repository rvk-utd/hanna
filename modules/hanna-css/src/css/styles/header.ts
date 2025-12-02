import { ColorValue, css, VariablePrinter } from 'es-in-css';

import { mq } from '../../lib/breakpoints.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { LinkStyle_Reset } from '../../lib/links.js';
import { hideText_css } from '../utils/hideText.js';
import { prem } from '../utils/miscUtils.js';

const mq_Topmenu = mq.netbook_up;

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
    max-width: ${vars.Layout$$header_homelink_width};
    min-width: ${prem(148)};
    @media ${mq_Topmenu} {
      min-width: ${prem(204)};
    }
  }
  &__logo {
    order: -1;
    ${hideText_css('soft')}
    display: block;
    width: ${prem(28)}; /* -notext Logo variant */
    height: ${prem(42)};

    @media ${mq_Topmenu} {
      width: ${prem(33)};
      height: ${prem(50)};
    }
  }
  &__logo:last-child {
    width: ${prem(143)}; /** Normal full-logo  */
    @media ${mq_Topmenu} {
      width: ${prem(172)};
    }
  }

  &__logo--custom {
    width: auto;
  }

  /** @deprecated Back-compat selector  (Remove in Hanna 0.9) */
  a&__logo {
    box-sizing: content-box;
    width: ${prem(143)};
    margin: ${prem(-8)};
    padding: ${prem(8)};
    @media ${mq_Topmenu} {
      width: ${prem(172)};
    }
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

  &__logo--custom > svg,
  &__logo--custom > img {
    margin-left: 0;
    margin-right: 0;
  }

  &__sitename {
    position: relative;
    flex-shrink: 1;
    font-size: ${prem(16)};
    line-height: 1.5;
    font-weight: ${vars.font_weight__bold};
    margin-left: 13px;
    padding-left: 16px;

    @media ${mq_Topmenu} {
      font-size: ${prem(24)};
      line-height: 1.2;
      margin-left: 21px;
      padding-left: 24px;
    }
  }
  &__sitename::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    height: ${prem(28)};
    background-color: ${vars.Layout$$header_homelink_divColor};
    margin: auto 0;

    @media ${mq_Topmenu} {
      height: ${prem(32)};
    }
  }
`;

// ---------------------------------------------------------------------------

export const freezeScroll_css = ({
  immediate = false,
  fixHeader = false,
  hideAlerts = true,
  /** @deprecated  (Will be removedin v0.9) */
  hideSkiplink = false,
}: FreezeScrollProps) => css`
  & {
    overflow-y: hidden;
    padding-right: ${vars.browser_scrollbar_width};
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
  ${
    /** @deprecated Remove this selector block in v0.9) */
    hideSkiplink &&
    css`
      .Layout__header__skiplink {
        opacity: 0;
        visibility: hidden;
      }
    `
  }
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
