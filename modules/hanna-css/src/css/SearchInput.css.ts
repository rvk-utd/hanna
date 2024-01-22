import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { formFieldVars as ff } from '../lib/otherTokens.js';

import { hoverKeyboardFocusAndActiveStyling } from './utils/focus-selectors.js';
import { hideText_css } from './utils/hideText.js';
import { DEPS, prem } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField')}

  @media screen {
    .SearchInput {
      --buttonWidth: ${vars.space_8};
      --buttonColor: ${vars.color_suld_150};
    }
    .SearchInput.FormField--small {
      --buttonWidth: ${vars.space_6};
    }

    .SearchInput > .FormField__input {
      padding-right: var(--buttonWidth);
    }
    .SearchInput:not(.FormField--small) > .FormField__label {
      padding-right: calc(var(--buttonWidth) - ${vars.space_2});
    }

    // underlying inactive button-like icon
    .SearchInput > .FormField__input::after {
      ${iconStyle(vars.icon__search)}
      display: block;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      font-size: 1em;
      width: var(--buttonWidth);
      line-height: ${ff.input__height_inner};
      color: var(--buttonColor);
      pointer-events: none;
    }
    .SearchInput.FormField--focused:not(.FormField--readonly):not(.FormField--disabled)
      > .FormField__input::after {
      color: ${vars.color_faxafloi_100};
    }

    // Optional button, which then overlaps + hides the ::after pseudo.
    .SearchInput__button {
      ${hideText_css('soft')}
      position: absolute;
      z-index: 1;
      top: 0px;
      right: 0px;
      bottom: 0px;
      border: 1px solid transparent;
      background-clip: padding-box;
      font-size: 1em;
      border-radius: ${ff.input__border_inner_radius};
      /* border-top-left-radius: 0; */
      /* border-top-right-radius: 0; */
      width: var(--buttonWidth);
      color: var(--buttonColor);
      display: flex;
      align-items: center;
      background-color: inherit;
    }
    :disabled + .SearchInput__button,
    [readonly] + .SearchInput__button {
      display: none;
      pointer-events: none;
    }
    .SearchInput__button:disabled {
      opacity: 0.5;
    }
    .SearchInput__button::before {
      ${iconStyle(vars.icon__search)}
      width: 100%;
      margin-right: 1px;
      transition: all 100ms ease-in;
    }

    .SearchInput__button:not(:disabled) {
      ${hoverKeyboardFocusAndActiveStyling(
        css`
          background-color: ${vars.color_suld_25};
          color: ${vars.color_faxafloi_100};

          &::before {
            transform: scale(1.15);
          }
        `,
        { notActive: true }
      )}
    }
  }

  @media screen {
    .AutoComplete__list {
      position: absolute;
      z-index: ${vars.zindex__overlay};
      top: calc(100% + 5px);
      left: 0;
      right: 0;
      padding: ${prem(16)};
      max-height: 184px;
      overflow: auto;
      background: ${vars.color_suld_0};
      box-shadow: ${vars.boxShadow_elevated};
    }
    .AutoComplete__list__item {
      color: ${vars.color_suld_150};
      margin-bottom: ${prem(16)};

      &:last-child {
        margin-bottom: 0;
      }
    }
    .AutoComplete__list__item.autoComplete_selected {
      color: ${vars.color_faxafloi_100};
    }
  }
`;
