import { css } from 'es-in-css';

import { between_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { htmlCl } from '../lib/classNames.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { LinkStyle_Reset } from './styles/links.js';
import { keyboardFocus_selector } from './utils/focus-selectors.js';
import { cols_px, prem } from './utils/miscUtils.js';
import { SeenEffect__disallowNesting, SeenEffect__fadeup } from './utils/seenEffects.js';

export default css`
  @media screen {
    .Tabs {
      --Tabs--borderWidth: 2px;
      --Tabs__tab--borderWidth: 4px;
      ${SeenEffect__fadeup}
      // @deprecated  Remove this mixin in v0.9
    ${SeenEffect__disallowNesting}
    display: flex;
      flex-flow: row wrap;
      border-bottom: var(--Tabs--borderWidth) solid ${vars.color_suld_50};
      font: ${vars.font_button};
      font-weight: ${vars.font_weight__bold};
      margin: ${vars.space_5} 0;
    }
    .Tabs::after {
      content: '';
      width: 100%;
      height: var(--Tabs--borderWidth);
      background-color: ${vars.color_suld_50};
    }

    .Tabs__tab {
      ${LinkStyle_Reset(true)}
      white-space: nowrap;
      border-bottom: var(--Tabs__tab--borderWidth) solid ${vars.color_suld_50};
      margin-bottom: calc(-1 * var(--Tabs__tab--borderWidth));
      color: ${vars.color_suld_200};
      position: relative;
      z-index: 1; // overlap subTabs

      // NOTE: left/right paddings must *NOT* be %-based because
      // it triggers a Chrome bug that collapses the width of <button/> flex-items
      // ARGH!...  --Már @ 2020-10-28
      padding: ${between_phone_netbook(12, 24)} ${between_phone_netbook(15, 40)};
      @media ${mq.wide} {
        padding: 24px 40px;
      }
    }
    .Tabs__tab:hover,
    .Tabs__tab:active,
    .Tabs__tab[data-active='true'],
    .Tabs__tab[aria-pressed='true'] {
      border-bottom: var(--Tabs__tab--borderWidth) solid
        ${vars.theme_color_primary__safeish};
    }

    .Tabs__tab__badge {
      font: ${vars.font_label};
      font-weight: ${vars.font_weight__normal};
      color: ${vars.color_suld_150};
      margin-left: ${vars.space_0$5};
      margin-right: ${vars.space_1__neg};
    }

    ${htmlCl.beforeSprinkling} .TabPanel:not([data-sprinkled]) {
      display: none;
    }
    .TabPanel {
      ${keyboardFocus_selector(css`
        outline-color: ${vars.color_suld_100};
        outline-style: dotted;
        outline-offset: ${vars.space_1};
      `)}
    }

    // Nested/sub-tabs

    .Tabs > .Tabs {
      --Tabs__tab--borderWidth: 2px;
      margin: 0;
      width: 100%;
      border-bottom: 0;
    }
    .Tabs > .Tabs::after {
      content: none;
    }
    .Tabs:not(.Tabs--vertical) > .Tabs {
      border-top: var(--Tabs--borderWidth) solid ${vars.color_suld_50};
      order: 1;
    }
    .Tabs > * > .Tabs__tab {
      font-weight: ${vars.font_weight__normal};
      padding-top: ${prem(10)};
      padding-bottom: ${prem(10)};
    }

    // ===========================================================================
    // Overrides for --vertical

    .Tabs--vertical[class] {
      --Tabs--borderWidth: 2px;
      --Tabs__tab--borderWidth: 2px;
      float: left; // default layout behavior
      width: 100%;
      margin-top: 0;
      max-width: ${cols_px(3)};
      border-bottom: 0;
      flex-direction: column;

      @media ${mq.tablet_up} {
        position: sticky;
        top: 0;
        max-height: 100vh;
        overflow-y: auto;
      }
    }
    .Tabs--vertical::after {
      content: none;
    }

    .Tabs--vertical .Tabs__tab {
      display: block;
      width: 100%;
      margin: 0;
      padding: ${vars.space_2} ${vars.space_1};
      white-space: normal;

      ${keyboardFocus_selector(css`
        outline-offset: -3px;
      `)}
    }
    .Tabs--vertical > .Tabs__tab {
      margin-top: ${vars.space_0$5};
    }

    // Nested/sub-tabs

    .Tabs--vertical > .Tabs {
      flex-direction: column;
    }
    .Tabs--vertical > * > .Tabs__tab {
      padding: ${vars.space_1$5} ${vars.space_1};
      padding-left: ${vars.space_2};
    }
    .Tabs--vertical > * > .Tabs__tab:hover,
    .Tabs--vertical > * > .Tabs__tab:active,
    .Tabs--vertical > * > .Tabs__tab[data-active='true'],
    .Tabs--vertical > * > .Tabs__tab[aria-pressed='true'] {
      border-color: ${vars.color_suld_50};
      color: ${vars.theme_color_primary__safeish};
    }
    .Tabs--vertical > * > .Tabs__tab[data-active='true'],
    .Tabs--vertical > * > .Tabs__tab[aria-pressed='true'] {
      font-weight: ${vars.font_weight__bold};
    }

    .Tabs--vertical .Tabs__tab[data-active='true'] ~ .Tabs__tab,
    .Tabs--vertical .Tabs__tab[aria-pressed='true'] ~ .Tabs__tab {
      order: 1;
    }

    // ---------------------------------------------------------------------------

    .Tabs > *:not(.Tabs__tab):not(.Tabs) {
      ${WARNING__('Only .Tabs__tab or `.Tabs` are allowed here')};
    }
    .Tabs > .Tabs:not(:last-child) {
      ${WARNING__('Nested .Tabs must be :last-child')};
    }
    .Tabs--vertical > .Tabs--vertical {
      ${WARNING__('.Tabs--vertical not supported as sub-Tabs')};
    }
    .Tabs > .Tabs > .Tabs {
      ${WARNING__('For the love of god, DO NOT nest your already nested .Tabs')};
    }
  }
`;
