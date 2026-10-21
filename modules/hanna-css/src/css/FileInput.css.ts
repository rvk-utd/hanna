import { color, css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { colors } from '../lib/colors.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { hideText_css } from './utils/hideText.js';
import { DEPS, overflowEllipsis, prem } from './utils/miscUtils.js';

const FILE_ZONE_WIDTH = '584px';

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
      max-width: ${FILE_ZONE_WIDTH};
      border-radius: 4px;
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

    .FileInput__dropCounter {
      display: inline-block;
      margin-top: ${vars.space_2};
      border-radius: 999px;
      border: 1px solid ${vars.color_faxafloi_50};
      background: ${vars.color_suld_0};
      padding: 4px 8px;
      font: ${vars.font_label};
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

    // max files reached
    .FileInput__dropzone.FileInput__dropzone--disabled {
      border-color: ${vars.color_suld_100};
      background: ${vars.color_suld_25};
      cursor: default;
    }
    .FileInput__dropzone--disabled .FileInput__droptext,
    .FileInput__dropzone--disabled .FileInput__droptext > strong {
      color: ${vars.color_suld_150};
      border: none;
    }
    .FileInput__dropzone--disabled .FileInput__droptext::before {
      background: ${vars.color_suld_75};
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
      max-width: ${FILE_ZONE_WIDTH};
    }

    .FileInput__file {
      width: 100%;
      padding: 12px 16px;
      margin-bottom: ${vars.space_1$5};
      position: relative;
      background-color: ${vars.color_suld_25};
      border-radius: 4px;
    }

    .FileInput__file:hover {
      background-color: ${vars.color_suld_50};
      color: ${vars.color_faxafloi_150};
    }

    .FileInput__fileinfo {
      display: flex;
      vertical-align: middle;
      align-items: center;
      align-content: center;
    }
    .FileInput__fileinfo::before {
      ${iconStyle('check', 'small')}
      flex-shrink: 0;
      margin-right: ${vars.space_1};
      color: ${vars.color_faxafloi_100};
    }
    .FileInput__fileinfo--preview::before {
      display: none;
    }

    .FileInput__filename {
      ${overflowEllipsis};
      flex-shrink: 1;
      color: ${vars.color_faxafloi_100};
      font: ${vars.font_body_m};
      font-weight: bold;
    }
    .FileInput__filesize {
      padding-top: 2px;
      padding-left: ${vars.space_0$5};
      color: ${vars.color_suld_150};
      white-space: nowrap;
    }

    .FileInput__preview {
      flex-shrink: 0;
      width: ${prem(32)};
      height: ${prem(32)};
      margin-right: ${vars.space_1};
      border-radius: 2px;
      overflow: hidden;
    }
    .FileInput__preview img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .FileInput__file-remove {
      ${hideText_css('soft')}
      position: absolute;
      top: 12px;
      right: 12px;
      color: inherit;
      width: ${vars.icon_size__small};
      border-radius: 4px;
    }

    .FileInput__file-remove::before {
      ${iconStyle('delete', 'small')}
      color: ${vars.color_suld_200};
    }

    .FileInput__file-remove:hover,
    .FileInput__file-remove:focus {
      background-color: ${vars.color_suld_75};
    }
  }

  @media ${mq.tablet_up} {
    .FileInput__dropzone {
      padding: ${prem(64)};
    }
  }
`;
