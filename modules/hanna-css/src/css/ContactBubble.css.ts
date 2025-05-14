import { css, pct_f } from 'es-in-css';

import { srOnly_focusable } from '../lib/a11y.js';
import { scale } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { htmlCl } from '../lib/classNames.js';
import { grid } from '../lib/grid.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { freezeScroll_css, LayoutHeaderUnderlay_css } from './styles/header.js';
import { hideText_css } from './utils/hideText.js';
import { grid_units, prem } from './utils/miscUtils.js';

import { MobileMenuTogglerGlobalClasses } from './MobileMenuToggler.css.js';

const { mobileMenuIsOpen } = MobileMenuTogglerGlobalClasses;

const mq_Fullscreen = mq.phone_phablet;
const mq_Popup = mq.tablet_up;

export default css`
  @media screen {
    // Script-only wrapper element
    .ContactBubble__wrapper {
      pointer-events: none;
      position: fixed;
      bottom: 0;
      right: ${vars.grid_margin__right};
      left: ${vars.grid_margin};
      max-width: ${prem(grid.contentMaxWidth)};
      margin: 0 auto;
      transition: all 600ms ease-in-out;

      @media ${mq_Fullscreen} {
        z-index: calc(${vars.zindex__header} - 1);
      }
      @media ${mq_Popup} {
        z-index: calc(${vars.zindex__header} + 5);
      }
    }

    ${htmlCl.beforeSprinkling} .ContactBubble__wrapper:not([data-show]) {
      display: none;
    }
    ${mobileMenuIsOpen} .ContactBubble__wrapper,
    .ContactBubble__wrapper[data-show='false'] {
      opacity: 0;
      visibility: hidden;
    }
    .ContactBubble__wrapper[data-show='true'] {
    }

    @media ${mq_Fullscreen} {
      // [data-freeze-scroll]
      // Env tweaks (side-effects)
      html[data-contact-bubble] {
        ${freezeScroll_css({
          hideSkiplink: true,
          fixHeader: true,
        })}
      }
    }

    // ---------------------------------------------------------------------------

    // Script-only button
    .ContactBubble__openbtn {
      position: absolute;
      right: ${vars.space_1};
      bottom: ${vars.space_3};
      pointer-events: auto;
      box-sizing: content-box;
      font-size: ${vars.font_body_l_size};
      font-weight: ${vars.font_weight__bold};
      background-color: ${vars.color_suld_25};
      color: ${vars.color_faxafloi_100};
      border-radius: ${grid_units(4.5)};
      border: ${vars.border_default};
      height: ${vars.space_3};
      line-height: ${vars.space_3};
      padding: ${vars.space_3} 0;
      padding-left: ${vars.space_9};
      width: 0;
      overflow: hidden;
      white-space: nowrap;

      @media ${mq_Popup} {
        display: block;
        right: ${vars.space_2__neg};
        bottom: 4vh;
        bottom: min(4vh, ${vars.space_5});
        width: auto;
        transition: all 300ms ease-in-out;
        max-width: 20em;
        padding-right: ${grid_units(3)};
      }
    }

    .ContactBubble__openbtn:hover {
      color: ${vars.color_faxafloi_150};
      border-color: ${vars.color_suld_100};
      background-color: ${vars.color_suld_50};
    }

    .ContactBubble__openbtn[aria-expanded='true'] {
      @media ${mq_Fullscreen} {
        opacity: 0;
      }
      @media ${mq_Popup} {
        max-width: 0;
        padding-right: 0;
      }
    }

    .ContactBubble__openbtn::before,
    .ContactBubble__openbtn::after {
      ${iconStyle(vars.icon__chat)}
      position: absolute;
      top: 50%;
      font-size: ${prem(40)};
      left: ${grid_units(2)};
      margin-top: -0.5em;
      width: ${grid_units(5)};
      height: 1em;
      line-height: 1em;
      transition: opacity 200ms ease-in;
    }
    .ContactBubble__openbtn::after {
      content: ${vars.icon__close};
      opacity: 0;
      font-size: ${prem(26)};
    }

    .ContactBubble__openbtn[aria-expanded='true']::before {
      opacity: 0;
      transition-delay: 200ms;
      transition-duration: 200ms;
    }
    .ContactBubble__openbtn[aria-expanded='true']::after {
      opacity: 1;
      transition-delay: 200ms;
      transition-duration: 200ms;
    }

    // ---------------------------------------------------------------------------

    ${htmlCl.beforeSprinkling} .ContactBubble:not([data-sprinkled]) {
      display: none;
    }
    .ContactBubble {
      pointer-events: auto;
      background-color: ${vars.color_suld_25};
      padding: ${grid_units(4)};
      opacity: 1;
      transition: all 300ms ease-in-out;
      transition-property: opacity, visibility;

      @media ${mq_Popup} {
        max-width: ${prem(375)};
        border: ${vars.border_default};
      }
    }

    .ContactBubble__wrapper > .ContactBubble {
      // .ContactBubble[data-sprinkled] {
      @media ${mq_Fullscreen} {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        // right: calc(-1 * ${vars.browser_scrollbar_width});
        left: 0;
        // overflow-y: scroll;
        overflow: auto;
        padding-top: ${vars.Layout$$header_height};
        // …
      }
      @media ${mq_Popup} {
        overflow: auto;
        position: absolute;
        right: ${grid_units(-2)};

        --bottomOffset: calc(4vh + 11 * ${vars.space_1});
        bottom: var(--bottomOffset);
        max-height: calc(100vh - var(--bottomOffset));

        --bottomOffsetMin: calc(min(4vh, ${vars.space_5}) + 11 * ${vars.space_1});
        bottom: var(--bottomOffsetMin);
        max-height: calc(100vh - var(--bottomOffsetMin));
      }
    }

    .ContactBubble[hidden] {
      display: block;
      opacity: 0;
      visibility: hidden;
    }

    @media ${mq_Fullscreen} {
      // underlay for .Layout__header
      .ContactBubble::before {
        ${LayoutHeaderUnderlay_css(vars.color_suld_25)}
      }
      .ContactBubble::after {
        content: '';
        display: block;
        height: 0;
        margin-top: ${vars.space_8};
        padding-top: ${pct_f(300 / 610)};
        background: url('i/ContactBubble/illustration.png') 50% 50% / 100% auto no-repeat;
        max-width: 500px;
      }
    }

    .ContactBubble__title {
      @media ${mq_Fullscreen} {
        font: ${vars.font_heading_xl};
        max-width: 9em; /* Makes for nice line-wrap in the text 'Hvað getum við \n gert fyrir þig?' */
        margin-bottom: ${scale(3 * grid.unit, 8 * grid.unit, 480, 812, 'vh')};
        margin-bottom: min(
          ${vars.space_8},
          ${scale(3 * grid.unit, 8 * grid.unit, 480, 812, 'vh')}
        );
      }
      @media ${mq_Popup} {
        font: ${vars.font_body_l};
        font-weight: ${vars.font_weight__bold};
        margin-bottom: ${grid_units(3)};
      }
    }

    .ContactBubble__list {
      font: ${vars.font_body_m};
      border-top: 1px solid ${vars.color_suld_50};
      font-weight: ${vars.font_weight__bold};
    }

    .ContactBubble__item {
      box-sizing: content-box;
      padding: ${grid_units(2)} ${grid_units(4)};
      padding-left: ${grid_units(7)};
      min-height: calc(${vars.font_body_m_leading} + ${vars.font_label_leading});
      border-bottom: 1px solid ${vars.color_suld_50};
      ${hannaVarOverride({
        link_underline: 'none',
        link_underline__hover: 'none',
      })}
      --ContactBubble--type--icon: none;
    }
    .ContactBubble__item--type--suggestions {
      --ContactBubble--type--icon: url(i/ContactBubble/paperplane.svg);
    }
    .ContactBubble__item--type--phone {
      --ContactBubble--type--icon: url(i/ContactBubble/phone.svg);
    }
    .ContactBubble__item--type--faq {
      --ContactBubble--type--icon: url(i/ContactBubble/faq.svg);
    }
    .ContactBubble__item--type--livechat {
      --ContactBubble--type--icon: url(i/ContactBubble/chat.svg);
    }

    .ContactBubble__link {
      display: block;
      color: ${vars.link_color};
    }
    .ContactBubble__link > small {
      font: ${vars.font_label};
      font-weight: ${vars.font_weight__normal};
      display: block;
      color: ${vars.color_suld_200};
      text-decoration: none;
      transition: inherit;
    }
    .ContactBubble__link:hover > small {
      color: inherit;
    }

    .ContactBubble__link::before {
      content: '';
      background-color: ${vars.color_suld_100};
      width: ${grid_units(4)};
      height: ${grid_units(3.5)};
      line-height: ${grid_units(3.5)};
      float: left;
      margin-left: ${grid_units(-6)};
      vertical-align: top;
      mask-image: var(--ContactBubble--type--icon);
      mask-size: auto 100%;
      mask-position: 0% 50%;
      mask-repeat: no-repeat;
      transition: inherit;
    }
    .ContactBubble__link:hover::before {
      background-color: currentColor;
    }

    // ---------------------------------------------------------------------------

    // Script-only button
    @media ${mq_Fullscreen} {
      .ContactBubble__closebtn {
        position: fixed;
        z-index: 1;
        top: calc(0.5 * ${vars.Layout$$header_height});
        right: ${vars.grid_margin__right};
        ${hideText_css('soft')}
        margin: ${vars.space_3__neg} ${vars.space_0$5};
        width: ${vars.space_6};
        height: ${vars.space_6};
        line-height: ${vars.space_6};
        color: ${vars.color_faxafloi_100};
        transition: all 200ms ease-in-out;
      }
      .ContactBubble__closebtn:hover {
        color: inherit;
        transform: scale(1.15);
      }
      .ContactBubble__closebtn::before {
        ${iconStyle(vars.icon__close)}
        font-size: ${prem(26)};
        width: 100%;
        margin-right: 1px;
      }
    }

    @media ${mq_Popup} {
      .ContactBubble__closebtn {
        ${srOnly_focusable()}
      }
    }
  }
`;
