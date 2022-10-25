import { color, css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { hideText_css } from './utils/hideText';
import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    FormField
  */
  @media screen {
    .FileInput {
      margin-bottom: ${between_cols(30, 70)};
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
      margin-bottom: ${prem(20)};
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
        ${iconStyle(vars.icon__arrow_up_long)}
        position: absolute;
        top: 0;
        left: 50%;
        width: ${prem(64)};
        margin-left: ${prem(-32)};
        line-height: ${prem(64)};
        font-size: ${prem(24)};
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
      // TODO: Verify that this color is the same
      background: ${color(colors.heidmork_100).fade(0.1)};
      border-color: $var--color-heidmork-100;
    }

    .FileInput__filelist {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
    }

    .FileInput__file {
      width: 100%;
      padding-left: 26px;
      margin-bottom: ${prem(8)};
      position: relative;
    }

    .FileInput__fileinfo {
      display: flex;
      vertical-align: middle;
      align-items: center;
      align-content: center;
    }

    .FileInput__filename {
      // @include overflowEllipsis();
      // TODO: Add overflowEllipsis
      flex-shrink: 1;
    }
    .FileInput__filesize {
      padding-left: ${prem(3)};
      white-space: nowrap;
    }

    .FileInput__preview {
      width: 40px;
      height: 40px;
      display: inline-block;
      margin-right: ${prem(15)};
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
      top: 50%;
      left: 0;
      color: inherit;
      width: ${prem(10)};
      margin-top: ${prem(-5)};

      &::before {
        ${iconStyle(vars.icon__close)}
        font-size: ${prem(10)};
        line-height: 1;
        color: ${vars.color_faxafloi_100};
      }

      &:hover::before,
      &:focus::before {
        color: ${vars.color_faxafloi_150};
      }
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
