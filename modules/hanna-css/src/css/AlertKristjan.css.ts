import { color, css, ms } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { hannaVars } from '../lib/hannavars';
import { icons } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { LinkStyle_Reset } from './styles/links';
import { prem } from './utils/miscUtils';
import { hideText_css } from './utils/scssutils/hideText';

import IconCss from './Icon.css';

const pureWhite = color('#fff');
const linkColor = color(colors.faxafloi_100).mix(colors.faxafloi_150, 80);
const closing_duration = ms(400);
const ease_out_quartic = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

export default css`
  @media screen {
    .Alert {
      --Alert-background: ${color(colors.faxafloi_50).mix(pureWhite, 50)};
      --Alert-icon-color: ${hannaVars.color_faxafloi_100};
      --Alert-icon: ${icons.info};

      --link-color: ${linkColor};
      --link-color-hover: ${linkColor};

      background: var(--Alert-background);
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
      ${IconCss}
      content: var(--Alert-icon);
      color: var(--Alert-icon-color);

      font-size: ${prem(16)};
      // line-height: prem(12);
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

    // 	// This is the default styling state
    // 	.Alert--info {
    // }

    .Alert--critical,
    .Alert--error {
      --Alert-background: ${color(colors.heidmork_50).mix(pureWhite, 50)}; // a11y hax
      --Alert-icon-color: ${hannaVars.color_heidmork_100};
      --Alert-icon: ${icons.search}; // TODO: FIND icons-error '#{$icons-error}';
    }
    .Alert--warning {
      --Alert-background: ${hannaVars.color_nautholsvik_50};
      --Alert-icon-color: ${color(colors.nautholsvik_100).mix(
        colors.nautholsvik_150,
        67
      )}; // a11y hax
      --Alert-icon: ${icons.data}; // TODO: Find icons-warning
    }
    .Alert--success {
      --Alert-background: ${color(colors.ellidaardalur_50).mix(
        pureWhite,
        60
      )}; // a11y hax
      --Alert-icon-color: ${color(colors.ellidaardalur_100).mix(
        colors.ellidaardalur_150,
        67
      )};
      --Alert-icon: ${icons.chat}; // TODO: Find '#{$icons-checkmark}';
    }

    // ---------------------------------------------------------------------------

    // // NOTE: This className is only used to signal to hanna-sprinkles that
    // // a .Alert__close button should be injected
    // .Alert--closable {}

    $closing-duration: 400ms;

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
      ${icons.close}
      margin-right: 1px;
      width: 100%;
    }

    [hidden] > .Alert__close {
      opacity: 0;
    }
  }
`;
