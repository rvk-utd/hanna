import { css } from 'es-in-css';

import { srOnly } from '../lib/a11y.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { suppress_WARNING__ } from '../lib/WARNING__.js';

import { hideText_css } from './utils/hideText.js';
import { DEPS, prem } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField')}

  // 'react-datepicker/dist/react-datepicker.css' @ v2.14.1
  @media screen {
    .Datepicker > * > .react-datepicker-wrapper {
      flex-grow: 1;
    }
    .Datepicker > * > .react-datepicker__tab-loop {
      width: auto;
    }
    .Datepicker input {
      width: 100%;
      border: 0;
      background: 0;
      padding: 0;
      width: 100%;
      line-height: inherit;
      color: inherit;
    }
    .Datepicker input:focus {
      outline: 0;
    }

    .react-datepicker {
      background-color: ${vars.color_suld_0};
      display: block;
      position: relative;
      font: ${vars.font_base};
    }

    .react-datepicker__input-container {
    }
    .react-datepicker__input-container::after {
      ${iconStyle(vars.icon__calendar)}
      display: block;
      color: ${vars.color_suld_0};
      font-size: 1em;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: content-box;
      right: 1px;
      width: ${vars.space_8};
      border-left: 2px solid ${vars.color_suld_150};
      color: ${vars.color_suld_150};
      line-height: ${vars.space_4};
      pointer-events: none;
    }
    .FormField--small .react-datepicker__input-container::after {
      line-height: calc(${vars.space_0$5} + ${vars.space_2});
      width: ${vars.space_6};
    }

    .FormField--focused .react-datepicker__input-container::after {
      border-color: ${vars.color_faxafloi_100};
      color: ${vars.color_faxafloi_100};
    }

    .react-datepicker__aria-live {
      ${srOnly}
    }

    // The popper
    .react-datepicker-popper {
      z-index: ${vars.zindex__overlay};
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .react-datepicker-popper[data-placement^='bottom'] {
      margin-top: 10px;
    }

    .react-datepicker-popper[data-placement^='top'] {
      margin-bottom: 10px;
    }

    .react-datepicker-popper[data-placement^='right'] {
      margin-left: 8px;
    }

    .react-datepicker-popper[data-placement^='left'] {
      margin-right: 8px;
    }

    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__current-month {
      display: none;
    }

    .react-datepicker__month-container::after {
      content: '';
      background: ${vars.color_suld_25};
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
      bottom: 0;
      width: ${prem(88)};
    }

    .react-datepicker__header {
      position: relative;
      z-index: 4;
    }
    .react-datepicker__month {
      padding-bottom: ${prem(8)};
      position: relative;
      z-index: 3;
    }

    .react-datepicker__header__dropdown {
      background: ${vars.color_faxafloi_100};
      border-top-left-radius: ${prem(3)};
      border-top-right-radius: ${prem(3)};
      padding: ${prem(25)} ${prem(8)} ${prem(29)};
      text-align: center;
    }

    .react-datepicker__month-dropdown-container,
    .react-datepicker__year-dropdown-container {
      display: inline-block;
      margin: 0;
      padding: 0;
      color: ${vars.color_suld_0};
      position: relative;
    }
    .react-datepicker__month-dropdown-container {
      margin-right: ${prem(12)};
    }
    .react-datepicker__month-dropdown-container:hover,
    .react-datepicker__year-dropdown-container:hover {
      border-color: ${vars.color_suld_50};
      color: ${vars.color_suld_50};
    }

    .react-datepicker__navigation {
      ${hideText_css}
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: ${prem(26)};
      left: ${prem(12)};
      z-index: 5;
      height: ${prem(24)};
      width: ${prem(24)};

      &::after {
        ${iconStyle(vars.icon__chevron_left)}
        display: block;
        color: ${vars.color_suld_0};
        font-size: 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: ${prem(24)};
        line-height: ${prem(24)};
      }

      &:hover::after,
      &:focus::after {
        color: ${vars.color_suld_50};
      }
    }

    .react-datepicker__navigation--next,
    .react-datepicker__navigation--previous {
      display: none;
    }
    /*
      .react-datepicker__navigation--next {
        right: ${prem(12)};
        left: auto;

        &::after {
          content: ${vars.icon__chevron_right};
        }
      }

      .react-datepicker__navigation--previous--disabled::after,
      .react-datepicker__navigation--next--disabled::after {
        color: ${vars.color_suld_100};
      }
    */

    [class].react-datepicker__navigation--years {
      ${suppress_WARNING__}
      position: relative;
      top: auto;
      left: auto;
      margin-left: auto;
      margin-right: auto;

      &::before {
        content: none;
      }

      &::after {
        content: ${vars.icon__chevron_down};
        color: ${vars.color_suld_150};
      }

      &:hover,
      &:focus {
        &::after {
          color: ${vars.color_suld_200};
        }
      }
    }

    [class].react-datepicker__navigation--years-upcoming::after {
      content: ${vars.icon__chevron_up};
    }

    .react-datepicker__month .react-datepicker__month-text {
      display: inline-block;
      width: 4rem;
      margin: 2px;
    }

    .react-datepicker__month--selected,
    .react-datepicker__month--in-selecting-range,
    .react-datepicker__month--in-range {
      background-color: ${vars.color_blafjoll_100};
      color: ${vars.color_suld_0};

      &:hover,
      &:focus {
        background-color: ${vars.color_blafjoll_100};
      }
    }

    .react-datepicker__day-names,
    .react-datepicker__week {
      white-space: nowrap;
      padding: 0 ${prem(8)};
    }
    .react-datepicker__day-names {
      padding-top: ${prem(8)};
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
      color: ${vars.color_suld_200};
      display: inline-block;
      width: ${prem(40)};
      line-height: ${prem(40)};
      text-align: center;
      margin: 0;
      border-radius: 50%;
    }
    .react-datepicker__day-name {
      font-weight: ${vars.font_weight__bold};
    }

    .react-datepicker__day {
      transition: all 200ms ease-in;
      transition-property: color, background-color;
    }

    .react-datepicker__day,
    .react-datepicker__month-text {
      cursor: pointer;

      &:hover,
      &:focus {
        background-color: ${vars.color_faxafloi_150};
        color: ${vars.color_suld_0};
      }
    }

    .react-datepicker__day--today,
    .react-datepicker__month-text--today {
      font-weight: ${vars.font_weight__bold};
    }

    .react-datepicker__day--highlighted,
    .react-datepicker__month-text--highlighted {
      background-color: ${vars.color_ellidaardalur_100};
      color: ${vars.color_suld_0};

      &:hover,
      &:focus {
        background-color: ${vars.color_ellidaardalur_150};
      }
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range {
      font-weight: 700;
      background-color: ${vars.color_suld_50};
      color: ${vars.color_faxafloi_100};

      &:hover,
      &:focus {
        background-color: ${vars.color_suld_75};
        color: ${vars.color_faxafloi_150};
      }
    }

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected {
      background-color: ${vars.color_faxafloi_100};
      color: ${vars.color_suld_0};

      &:hover,
      &:focus {
        background-color: ${vars.color_faxafloi_150};
      }
    }

    .react-datepicker__day--in-selecting-range,
    .react-datepicker__month-text--in-selecting-range {
      background-color: rgba(33, 107, 165, 0.5);
    }

    .react-datepicker__month--selecting-range .react-datepicker__day--in-range,
    .react-datepicker__month--selecting-range .react-datepicker__month-text--in-range {
      background-color: ${vars.color_faxafloi_100};
      color: ${vars.color_suld_0};

      &:hover,
      &:focus {
        background-color: ${vars.color_faxafloi_75};
        color: ${vars.color_suld_0};
      }
    }

    .react-datepicker__day--outside-month {
      color: ${vars.color_suld_150};
    }

    .react-datepicker__day--disabled,
    .react-datepicker__month-text--disabled {
      cursor: default;
      color: ${vars.color_suld_100};

      &:hover {
        color: ${vars.color_suld_100};
        background-color: ${vars.color_suld_0};
      }
    }

    .react-datepicker__month-text.react-datepicker__month--selected,
    .react-datepicker__month-text.react-datepicker__month--in-range {
      &:hover,
      &:focus {
        background-color: ${vars.color_blafjoll_100};
      }
    }

    .react-datepicker__year-read-view,
    .react-datepicker__month-read-view,
    .react-datepicker__month-year-read-view {
      display: flex;
      align-items: center;
      align-content: center;

      &:hover {
        cursor: pointer;
      }
    }

    .react-datepicker__month-read-view {
      width: ${prem(142)};
    }

    .react-datepicker__month-read-view--selected-month,
    .react-datepicker__year-read-view--selected-year {
      visibility: visible !important; // override inline 'visibility: hidden'
      text-transform: capitalize;
      color: ${vars.color_suld_0};
      font: ${vars.font_bd_l};
      font-weight: ${vars.font_weight__bold};
    }

    .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
      visibility: visible !important; // override inline 'visibility: hidden'
      position: relative;
      order: 1;
      margin-left: ${prem(5)};
      width: ${prem(14)};
      height: ${prem(14)};

      &::before {
        ${iconStyle(vars.icon__chevron_down)}
        display: block;
        color: ${vars.color_suld_0};
        font-size: 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: ${prem(14)};
        line-height: ${prem(14)};
      }
    }

    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown,
    .react-datepicker__month-year-dropdown {
      background-color: ${vars.color_suld_0};
      border-color: ${vars.color_suld_50};
      box-shadow: 2px 2px 0 ${vars.color_suld_50};
      color: ${vars.color_suld_150};
      position: absolute;
      width: ${prem(120)};
      padding: ${prem(8)} 0;
      left: 50%;
      transform: translateX(-50%);
      top: calc(100% + 2px);
      z-index: 1;
      border-radius: ${prem(3)};

      &:hover {
        cursor: pointer;
      }
    }

    .react-datepicker__year-dropdown--scrollable,
    .react-datepicker__month-dropdown--scrollable,
    .react-datepicker__month-year-dropdown--scrollable {
      height: 150px;
      overflow-y: scroll;
    }

    .react-datepicker__year-option,
    .react-datepicker__month-option,
    .react-datepicker__month-year-option {
      width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;

      &:hover,
      &:focus {
        background-color: ${vars.color_suld_50};
      }
    }

    .react-datepicker__year-option:last-of-type,
    .react-datepicker__month-option:last-of-type,
    .react-datepicker__month-year-option:last-of-type {
      user-select: none;
    }

    .react-datepicker__year-option--selected,
    .react-datepicker__month-option--selected,
    .react-datepicker__month-year-option--selected {
      position: absolute;
      left: ${prem(5)};
    }

    .react-datepicker__tab-loop__end {
      opacity: 0.0001;
    }
  }

  @media ${mq.tablet_up} {
    .react-datepicker__month-container::after {
      width: ${prem(40 + 40 + 32)};
    }
    .react-datepicker__day-names,
    .react-datepicker__week {
      padding-left: ${prem(32)};
      padding-right: ${prem(32)};
    }
    .react-datepicker__month {
      padding-bottom: ${prem(32)};
    }
  }
`;
