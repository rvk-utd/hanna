import { css } from 'es-in-css';
import Color from 'es-in-css/_/color.types';

import { hannaVars as vars } from '../../lib/hannavars';

type FreezeScrollProps = {
  immediate?: boolean;
  fixHeader?: boolean;
  hideSkiplink?: boolean;
  hideAlerts?: boolean;
};

export const freezeScroll_css = ({
  immediate = false,
  fixHeader = false,
  hideSkiplink = false,
  hideAlerts = true,
}: FreezeScrollProps) => css`
  > body {
    overflow-y: hidden;
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

export const LayoutHeaderUnderlay_css = (color: Color) => css`
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
