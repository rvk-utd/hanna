import { ColorValue, css, VariablePrinter } from 'es-in-css';

import { hannaVars as vars } from '../../lib/hannavars';

import { keyboardFocus_selector } from './focus-selectors';

const defaultLink = vars.link_color__hover;
const defaultBg = vars.color_suld_0;
const defaultBorder = `3px double ${vars.link_color__hover}`;
const focusLinkZindex = vars.zindex__sr_only;

type Mode = 'normal' | 'soft' | 'hard';
type Dir = 'ltr' | 'rtl';

type SROnlyFocusProps = {
  link?: `#${string}` | ColorValue | VariablePrinter;
  border?: string;
  bg?: `#${string}` | ColorValue | VariablePrinter;
};

const sr_only_undo = (mode: Mode = 'normal') => css`
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  opacity: 1;
  pointer-events: auto;
  ${mode !== 'soft' &&
  css`
    margin: 0;
  `}
`;

const srFocusStyling = ({ link, border, bg }: Required<SROnlyFocusProps>) => css`
  z-index: ${focusLinkZindex};
  font-size: 1em;
  background: ${bg};
  border: ${border};
  margin: 0;
  padding: 0.2em 0.33em;
  color: ${link};
  text-shadow: none;
  white-space: nowrap;
`;

export const sr_only = (mode: Mode = 'normal') => css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  opacity: 0.00001;
  pointer-events: none;
  ${mode !== 'soft' &&
  css`
    margin: 0;
  `}
`;

const sr_offscreen = (dir: Dir = 'ltr') => css`
  position: absolute;
  ${dir === 'ltr'
    ? css`
        right: 9999px;
        left: auto;
      `
    : css`
        left: 9999px;
        right: auto;
      `}
`;

// ============== NOT IN USE =================
export const sr_offscreen_undo = (dir: Dir = 'ltr') => css`
  z-index: ${focusLinkZindex};
  ${dir === 'ltr'
    ? css`
        right: auto;
      `
    : css`
        left: auto;
      `}
`;

const sr_offscreen_content__undo = (dir: Dir = 'ltr') => css`
  position: absolute;
  ${dir === 'ltr'
    ? css`
        right: -9999px;
      `
    : css`
        left: -9999px;
      `}
`;

export const sr_only_focusable_css = ({
  link = defaultLink,
  border = defaultBorder,
  bg = defaultBg,
}: SROnlyFocusProps) => {
  const sou = sr_only_undo();
  const sfs = srFocusStyling({ link, border, bg });
  const keyboadFocusContent = css`
    ${sou}
    ${sfs}
  `;
  return css`
    ${sr_only()};
    ${keyboardFocus_selector(keyboadFocusContent)}
    &:focus-within:not(:focus) {
      ${sr_only_undo()}
      ${srFocusStyling({ link, border, bg })}
    }
  `;
};

export const sr_only_content_focusable = ({
  link = defaultLink,
  border = defaultBorder,
  bg = defaultBg,
  dir = 'ltr',
}: SROnlyFocusProps & { dir?: Dir }) => {
  return css`
    ${sr_offscreen(dir)}
    a:focus,
    a:active,
    button:focus {
      ${sr_offscreen_content__undo(dir)}
      ${srFocusStyling({ link, border, bg })}
    }
  `;
};
