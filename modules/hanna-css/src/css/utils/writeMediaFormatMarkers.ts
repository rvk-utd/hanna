import { css, str } from 'es-in-css';

import { baseMQs, mq } from '../../lib/breakpoints';
import { isDevMode } from '../../lib/cssutils';

type Options = {
  selector?: '#mediaformat';
  visible?: boolean;
};

export const writeMediaFormatMarkers = (opts?: Options) => {
  const { selector = '#mediaformat', visible = isDevMode } = opts || {};

  return css`
    ${baseMQs.map(
      (format) => css`
        @media ${mq[format]} {
          ${selector}::after {
            content: ${str(format)};
          }
        }
      `
    )}
    ${selector}::after {
      ${visible
        ? css`
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            z-index: 10000 !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            color: #fec !important;
            visibility: visible !important;
            width: auto !important;
            height: auto !important;
            font-size: 14px !important;
            font-family: sans-serif !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            line-height: 1 !important;
            letter-spacing: 1px !important;
            padding: 3px 8px 2px 10px !important;
            margin: auto !important;
            pointer-events: none !important;
          `
        : css`
            display: none !important;
          `}
    }
  `;
};
