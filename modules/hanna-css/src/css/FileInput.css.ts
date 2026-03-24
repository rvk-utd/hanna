import { color, css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { colors } from '../lib/colors.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { hideText_css } from './utils/hideText.js';
import { DEPS, overflowEllipsis, prem } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField')}

  @media screen {
    .FileInput {
      margin-bottom: ${scale_container(30, 70)};
      position: relative;
    }

    .FileInput__input {
      display: none;
    }
    .FileInput__input--fake {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      height: 0px;
      width: 0px;
    }

    .FileInput__dropzone {
      background: ${vars.color_suld_25};
      border: 2px dashed ${vars.color_suld_100};
      padding: ${prem(20)};
      transition: all 200ms ease-in;
      transition-property: background-color, border-color;
      cursor: pointer;
      text-align: center;
      color: ${vars.color_suld_200};
      position: relative;
    }

    .FileInput__dropzone:hover,
    .FileInput__dropzone:focus,
    .FileInput__input--fake:focus + .FileInput__dropzone,
    .FileInput__dropzone.FileInput__dropzone--highlight {
      border-color: ${vars.color_suld_150};
      background: ${vars.color_suld_50};
    }

    .FileInput__droptext {
      position: relative;
      text-align: center;
      color: ${vars.color_suld_200};
      padding-top: ${prem(80)};
      margin: 0;

      &::before {
        ${iconStyle('arrow_upward')}
        position: absolute;
        top: 0;
        left: 50%;
        width: ${prem(64)};
        margin-left: ${prem(-32)};
        line-height: ${prem(64)};
        color: #fff; // TODO: Should this be hardcoded?
        background: ${vars.color_faxafloi_100};
        border-radius: 50%;
      }
    }

    .FileInput__droptext > strong {
      display: inline-block;
      color: ${vars.color_faxafloi_100};
      border-bottom: 2px solid ${vars.color_faxafloi_100};
    }

    // disabled
    .FormField--disabled .FileInput__dropzone {
      border-color: ${vars.color_suld_75};
      background: ${vars.color_suld_0};
      cursor: default;
    }
    .FormField--disabled .FileInput__droptext,
    .FormField--disabled .FileInput__droptext > strong {
      color: ${vars.color_suld_100};
      border: none;
    }
    .FormField--disabled .FileInput__droptext::before {
      background: ${vars.color_suld_100};
    }

    //invalid
    .FormField--invalid .FileInput__dropzone {
      background: ${color(colors.heidmork_100).fade(0.9)};
      border-color: ${vars.color_heidmork_100};
    }

    .FileInput__filelist {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      margin-top: ${vars.space_2};
    }

    .FileInput__file {
      width: 100%;
      padding-left: 26px;
      margin-bottom: ${vars.space_1$5};
      position: relative;
    }

    .FileInput__fileinfo {
      display: flex;
      vertical-align: middle;
      align-items: center;
      align-content: center;
    }

    .FileInput__filename {
      ${overflowEllipsis};
      flex-shrink: 1;
    }
    .FileInput__filesize {
      padding-top: 2px;
      padding-left: ${vars.space_0$5};
      color: ${vars.color_suld_150};
      white-space: nowrap;
    }

    .FileInput__preview {
      width: 40px;
      height: 40px;
      margin: ${vars.space_1__neg} 0;
      margin-right: ${vars.space_1};
      display: inline-block;
      vertical-align: middle;
    }
    .FileInput__preview img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .FileInput__file-remove {
      ${hideText_css('soft')}
      position: absolute;
      top: 0;
      left: 0;
      color: inherit;
      width: ${vars.icon_size__small};
    }

    .FileInput__file-remove::before {
      ${iconStyle('close', 'small')}
      color: ${vars.color_faxafloi_100};
    }
    .FileInput__file-remove:hover::before,
    .FileInput__file-remove:focus::before {
      color: ${vars.color_faxafloi_150};
    }
  }

  @media ${mq.tablet_up} {
    .FileInput__dropzone {
      padding: ${prem(64)};
    }

    .FileInput--multi .FileInput__file {
      width: calc(50% - ${prem(30)});
      margin-right: ${prem(30)};
    }
  }
`;
