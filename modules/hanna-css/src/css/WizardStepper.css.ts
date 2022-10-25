import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { characters, iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { prem } from './utils/miscUtils';

export default css`
  @media screen {
    .WizardStepper {
      counter-reset: step;
    }
    .WizardStepper__step {
      --WizardStepper-ballBackground: ${vars.color_faxafloi_75};
      --WizardStepper-ballColor: ${vars.color_suld_0};
      --WizardStepper-ballIcon: '#{$icons-checkmark}';
      --WizardStepper-lineColor: ${vars.color_faxafloi_100};
      color: ${vars.color_faxafloi_100};

      display: block;
      line-height: 1.35;
      padding: ${prem(12)} 0;
      padding-left: ${prem(40)};
      margin: ${prem(-12)} 0 0 ${prem(-12)};
      box-sizing: content-box;
      line-height: ${prem(18)};
      position: relative;
      margin-bottom: ${prem(34)};
      font-size: ${prem(12)};
      // NOTE: Counter increment must not be on the ::before because of
      // this browser bug: https://bugs.chromium.org/p/chromium/issues/detail?id=487515
      counter-increment: step;
    }
    .WizardStepper__step::before {
      content: counter(step);
      width: ${prem(24)};
      line-height: ${prem(24)};
      position: absolute;
      top: ${prem(8)};
      left: ${prem(8)};
      background: var(--WizardStepper-ballBackground);
      border-radius: 50%;
      color: var(--WizardStepper-ballColor);
      font-size: ${prem(14)};
      font-weight: ${vars.font_weight__bold};
      text-align: center;
    }

    .WizardStepper__step::after {
      content: '';
      position: absolute;
      top: ${prem(38)};
      bottom: ${prem(-24)};
      left: ${prem(19)};
      width: ${prem(2)};
      background: var(--WizardStepper-lineColor);
    }
    .WizardStepper__step:last-child::after {
      content: none;
    }

    .WizardStepper__step--neutral {
      counter-increment: none;
    }
    .WizardStepper__step--neutral::before {
      content: ${characters.bullets.disc};
      font-size: ${prem(20)};
    }

    .WizardStepper--preview > .WizardStepper__step,
    [aria-current='step'] ~ .WizardStepper__step {
      --WizardStepper-ballBackground: ${vars.color_suld_50};
      --WizardStepper-ballColor: ${vars.color_suld_100};
      --WizardStepper-lineColor: ${vars.color_suld_75};
      color: ${vars.color_suld_150};
    }
    .WizardStepper--preview > .WizardStepper__step--done,
    [aria-current='step'] ~ .WizardStepper__step--done {
      --WizardStepper-ballColor: ${vars.color_suld_150}; // $var--color-suld-150
    }

    .WizardStepper__step[aria-current='step'] {
      --WizardStepper-ballBackground: ${vars.color_faxafloi_100};
      --WizardStepper-ballIcon: ${vars.icon__pen};
      --WizardStepper-lineColor: ${vars.color_suld_75};
    }

    .WizardStepper__step--done::before,
    .WizardStepper__step[aria-current='step']::before {
      ${iconStyle('')}
      // TODO: check/fix
      content: var(--WizardStepper-ballIcon);
      font-size: ${prem(12)};
    }

    button.WizardStepper__step:hover,
    button.WizardStepper__step:active {
      color: ${vars.link_color__hover};
      text-decoration: underline;
    }

    // ---------------------------------------------------------------------------

    :not(.WizardStepper--preview)
      > .WizardStepper__step:last-child:not([aria-current='step']):not([aria-current='step']
        ~ *) {
      ${WARNING__('You forgot aria-current="step".')};
    }
    .WizardStepper--preview > .WizardStepper__step[aria-current='step'] {
      ${WARNING__('Remove the `--preview` modifier on parent')};
    }
  }

  @media ${mq.phone_phablet} {
    .WizardStepper__step {
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: ${prem(10)};
      padding-bottom: ${prem(25)};
    }
  }
`;
