import { css } from 'es-in-css';

import { hannaVars } from '../lib/hannavars.js';

import { avoidCssnanoMerging } from './utils/miscUtils.js';

export default css`
  .ReadSpeakerPlayer {
    display: flex;
    white-space: nowrap;
  }
  .ReadSpeakerPlayer--float {
    float: left;
  }
  .ReadSpeakerPlayer--float:not(.ReadSpeakerPlayer--align-right) {
    margin-right: ${hannaVars.space_1};
  }

  .ReadSpeakerPlayer--align-right {
    justify-content: flex-end;
  }
  .ReadSpeakerPlayer--align-right.ReadSpeakerPlayer--float {
    float: right;
    margin-left: ${hannaVars.space_1};
  }
  .ReadSpeakerPlayer button {
    text-align: center;
  }

  .ReadSpeakerPlayer .rsbtn {
    z-index: 1;
    display: flex;
  }
  .ReadSpeakerPlayer .rsbtn::after,
  .ReadSpeakerPlayer .rsbtn::before {
    content: none;
  }
  .ReadSpeakerPlayer .rsbtn > .rsbtn_toolpanel.vertical {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 235px !important;
  }
  .ReadSpeakerPlayer--align-right .rsbtn > .rsbtn_toolpanel.vertical {
    left: auto;
    right: 0;
    ${avoidCssnanoMerging(`right: max(0px, calc(100% - 235px));`)}
  }

  .ReadSpeakerPlayer .rsbtn_tools {
    width: 100% !important;
  }
`;
