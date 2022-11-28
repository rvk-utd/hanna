import { color, css, ms } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { buildVariables } from '../lib/cssutils';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { LinkStyle_Reset } from './styles/links';
import { hideText_css } from './utils/hideText';
import { prem } from './utils/miscUtils';

const AlertVariables = buildVariables(['background', 'icon_color', 'icon'], 'Alert');
const alertVars = AlertVariables.vars;

const pureWhite = color('#fff');
const linkColor = color(colors.faxafloi_100).mix(colors.faxafloi_150, 0.2);
const closing_duration = ms(400);
const ease_out_quartic = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

export default css`
  @media screen {
    .Alert {
      ${AlertVariables.declare({
        background: color(colors.faxafloi_50).mix(pureWhite, 0.5),
        icon_color: vars.color_faxafloi_100,
        icon: vars.icon__info,
      })}

      ${hannaVarOverride({
        link_color: linkColor,
        link_color__hover: linkColor,
      })}

      background: ${alertVars.background};
      border-radius: ${prem(8)};
      position: relative;

      padding: ${prem(13)} ${prem(20)} ${prem(12)} ${prem(44)};
      margin-bottom: ${prem(20)};

      @media ${mq.tablet_up} {
        padding: ${prem(17)} ${prem(32)} ${prem(16)} ${prem(64)};
        margin-bottom: ${prem(30)};
      }
    }
    .Alert::before {
      ${iconStyle(vars.icon__info)}
      content: ${alertVars.icon};
      color: ${alertVars.icon_color};

      font-size: ${prem(16)};
      // line-height: ${prem(12)};
      position: absolute;
      top: ${prem(14)};
      left: ${prem(14)};

      @media ${mq.tablet_up} {
        top: ${prem(17)};
        left: ${prem(25)};
      }
    }
    .Alert:not(.Alert--info):not(.Alert--success):not(.Alert--warning):not(.Alert--error):not(.Alert--critical) {
      ${WARNING__('"Type" modifier class-name is missing', { pos: 'after' })};
    }
    .Alert:not([role='alert']) {
      ${WARNING__('Should be role="alert"', { pos: 'after' })};
    }

    //  // This is the default styling state
    //  .Alert--info {
    // }

    .Alert--critical,
    .Alert--error {
      ${AlertVariables.override({
        background: color(colors.heidmork_50).mix(pureWhite, 0.5),
        icon_color: vars.color_heidmork_100,
        icon: vars.icon__error,
      })}
    }
    .Alert--warning {
      ${AlertVariables.override({
        background: vars.color_nautholsvik_50,
        icon_color: color(colors.nautholsvik_100).mix(colors.nautholsvik_150, 0.33),
        icon: vars.icon__warning,
      })}
    }
    .Alert--success {
      ${AlertVariables.override({
        background: color(colors.ellidaardalur_50).mix(pureWhite, 0.4),
        icon_color: color(colors.ellidaardalur_100).mix(colors.ellidaardalur_150, 0.33),
        icon: vars.icon__checkmark,
      })}
    }

    // ---------------------------------------------------------------------------

    // // NOTE: This className is only used to signal to hanna-sprinkles that
    // // a .Alert__close button should be injected
    // .Alert--closable {}

    .Alert {
      transition: all ${closing_duration} 0ms;
      transition-timing-function: ease-in, ${ease_out_quartic}, ease-in, ease-in,
        ease-in-out;
      transition-property: visibility, max-height, opacity, margin, padding;
      max-height: 1000px;

      overflow: hidden;
      padding-right: ${prem(25)};

      @media ${mq.tablet_up} {
        padding-right: ${prem(48)};
      }
    }
    .Alert[hidden][hidden] {
      display: block; // override default :hidden styling
      transition-delay: 0ms 0ms ${closing_duration} 0ms;
      opacity: 0;
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 0;
      margin-bottom: 0;
      visibility: hidden;
    }

    .Alert[hidden][hidden]::before {
      transition: opacity 200ms ease-in;
      opacity: 0;
    }

    .Alert__close {
      ${LinkStyle_Reset(true)}
      ${hideText_css('soft')}
      position: absolute;
      top: ${prem(3)};
      right: ${prem(-7)};
      width: ${prem(42)};
      height: ${prem(42)};
      line-height: ${prem(40)};
      transition: all 200ms ease-in;
      transition-property: font-size, opacity;
      font-size: ${prem(9)};
      opacity: 0.67;

      @media ${mq.tablet_up} {
        opacity: 1;
        top: ${prem(7)};
        right: ${prem(6)};
        font-size: ${prem(12)};
      }
    }
    .Alert__close:hover,
    .Alert__close:active {
      opacity: 1;
      font-size: ${prem(16)};
    }
    .Alert__close::before {
      ${iconStyle(vars.icon__close)}
      margin-right: 1px;
      width: 100%;
    }

    [hidden] > .Alert__close {
      opacity: 0;
    }
  }
`;
