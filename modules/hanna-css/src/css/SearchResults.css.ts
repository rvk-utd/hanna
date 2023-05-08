import { css } from 'es-in-css';

import { srOnly } from '../lib/a11y.js';
import { between_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { font } from '../lib/font.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonTertiaryStyle } from './styles/buttons.js';
import { LabeledTitleStyle__basics } from './styles/labeledTitle.js';
import { LinkStyle_Reset } from './styles/links.js';
import { afterClear_css } from './utils/afterClear.js';
import { hoverActiveKeyboardFocus_selector } from './utils/focus-selectors.js';
import { cols_px, grid_units, prem } from './utils/miscUtils.js';

const baseDashWidth = 24;
const hoverDashWidth = 48;
const dashDiff = hoverDashWidth - baseDashWidth;
const dashTransition = '200ms ease-in';

const flexDash = (pxWidth: number) => {
  // get the pxWidth as a ratio of `vw` based on a maxinum 64px width (i.e. ${vars.grid_column})
  // FIXME: calculated value will be just a hair off ${vars.grid_column}
  const from = (pxWidth / grid.column / grid.numCols) * grid.contentMinWidth;
  return between_phone_netbook(Math.floor(from), pxWidth);
};

export default css`
  /*!@deps
    Tabs,
    Alert
  */

  @media screen {
    .SiteSearchPage {
      position: relative;
      margin-left: auto;
      padding-top: ${between_phone_netbook(64, 88)};

      @media ${mq.netbook_up} {
        width: ${vars.grid_9};
      }
    }

    .SearchResults {
      position: relative;
      margin-left: auto;
      transition: opacity 400ms ease-in;
    }

    .SearchResults--loadingquery {
      opacity: 0.5;
    }

    .SearchResults__title {
      font: ${vars.font_hd_m};
      margin-bottom: ${between_phone_netbook(48, 64)};

      @media ${mq.wide} {
        margin-bottom: ${prem(64)};
      }
    }

    .SearchResults__query {
      font: ${vars.font_sh_s};
      display: block;
    }
    .SearchResults__query::before {
      content: open-quote;
    }
    .SearchResults__query::after {
      content: close-quote;
    }

    .SearchResults__results {
    }

    .SearchResults__list {
      position: relative;
      padding-left: 0;
    }

    .SearchResults--loadingfilter > * > .SearchResults__list--loading,
    .SearchResults--loadingmore > * > .SearchResults__list--loading {
      opacity: 0.5;
    }
    @keyframes loadingAnimation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .SearchResults__list--loading::before {
      content: '';
      position: absolute;
      top: ${prem(20)};
      left: 25%;

      width: ${prem(48)};
      height: ${prem(48)};

      border-radius: 50%;
      border: ${prem(3)} solid ${vars.color_faxafloi_100};
      border-color: ${vars.color_faxafloi_100} transparent;
      animation: loadingAnimation 1000ms linear infinite;
    }

    ol.SearchResults__list > li::before {
      // hide <ol><li> counter markers
      ${srOnly}
    }

    .SearchResultsItem {
      margin-bottom: ${between_phone_netbook(48, 64)};

      @media ${mq.wide} {
        margin-bottom: ${prem(64)};
      }
    }

    .SearchResultsItem__link {
      ${LinkStyle_Reset(true)}
      display: flex;
      flex-flow: column;
      padding-left: ${vars.grid_1};
      margin-left: ${vars.grid_1__neg};
      max-width: ${cols_px(6)};

      @media ${mq.tablet_up} {
        margin-left: 0;
      }
    }

    .SearchResultsItem__title {
      --dash-width: ${flexDash(baseDashWidth)};
      --dash-margin: ${flexDash(32)};
      --dash-indent: ${flexDash(8)};

      ${LabeledTitleStyle__basics}

      margin-bottom: ${prem(16)};
      margin-left: ${vars.grid_column__neg};

      margin-right: ${flexDash(-dashDiff)};
      padding-right: ${flexDash(dashDiff)};
      transition: padding-right ${dashTransition};

      @media ${mq.phone_phablet} {
        margin-left: 0;
      }
      @media ${mq.wide} {
        --dash-width: ${prem(baseDashWidth)};
        --dash-margin: ${prem(32)};
        --dash-indent: ${prem(8)};

        margin-right: ${prem(-dashDiff)};
        padding-right: ${prem(dashDiff)};
      }
    }

    .SearchResultsItem__title::before {
      transition: width ${dashTransition};
    }

    .SearchResultsItem__link {
      ${hoverActiveKeyboardFocus_selector()(css`
        > .SearchResultsItem__title {
          padding-right: 0;

          --dash-width: ${flexDash(hoverDashWidth)};
          @media ${mq.wide} {
            --dash-width: ${prem(hoverDashWidth)};
          }
        }
      `)}
    }

    .SearchResultsItem__meta {
      font: ${vars.font_label};
      color: ${vars.color_suld_150};
      margin-top: ${vars.space_1__neg};
      margin-bottom: ${vars.space_1$5};
    }
    .SearchResultsItem__meta > span {
      display: inline-block;
    }
    .SearchResultsItem__meta > span:not(:last-child)::after {
      content: ' | ';
      margin: 0 0.25em;
      text-decoration: none;
      color: ${vars.color_suld_150};
    }
    .SearchResultsItem__summary {
      font-weight: ${vars.font_weight__normal};
    }
    .SearchResultsItem__image {
      display: none;
    }

    .SearchResults__loadmore {
      ${ButtonTertiaryStyle}
      display: block;
      border: 50px solid transparent;
      border-width: ${prem(50)} ${prem(300)};
      margin: 0 auto;

      @media ${mq.phone} {
        border-left-width: ${prem(30)};
        border-left-width: ${prem(30)};
      }
      @media ${mq.phablet} {
        border-left-width: ${prem(100)};
        border-left-width: ${prem(100)};
      }
    }
    .SearchResults__loadmore__count {
      // TODO: Check if value is right
      /* font-size: ${vars.font_label_size}; */
      font-size: ${font.sizes.size_12};
      color: ${vars.color_suld_150};
      font-weight: ${vars.font_weight__normal};
      margin-left: ${prem(4)};
    }
  }

  // ===========================================================================

  // ===========================================================================

  @media screen {
    .SearchResultsHighlightItem {
      margin-bottom: ${between_phone_netbook(48, 64)};

      @media ${mq.wide} {
        margin-bottom: ${prem(64)};
      }
    }
    .SearchResultsHighlightItem__link {
      ${LinkStyle_Reset(true)};
      position: relative;
      display: flex;
      flex-flow: column;
      padding: ${vars.grid_1};
      min-height: ${vars.grid_4};
      border: ${vars.border_default};
      margin: 0 ${vars.grid_1__neg};

      @media ${mq.tablet_up} {
        margin: 0 -1px;
        padding-right: ${vars.grid_4_4};
      }
      ${afterClear_css}
    }
    .SearchResultsHighlightItem__link:not(:has(.SearchResultsHighlightItem__image)) {
      min-height: 0;
    }

    .SearchResultsHighlightItem__link:hover,
    .SearchResultsHighlightItem__link:active {
      border-color: ${vars.color_faxafloi_100};
      box-shadow: inset 0 0 0 1px ${vars.color_faxafloi_100};
    }
    .SearchResultsHighlightItem__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${grid_units(3)};
    }

    .SearchResultsHighlightItem__meta {
      /* font: ${vars.font_bd_s}; */
      font: ${vars.font_label};
      color: ${vars.color_suld_150};
      margin-top: ${vars.space_1$5__neg};
      margin-bottom: ${vars.space_2};
    }
    .SearchResultsHighlightItem__meta > span {
      display: inline-block;
    }
    .SearchResultsHighlightItem__meta > span:not(:last-child)::after {
      content: ' | ';
      margin: 0 0.25em;
      text-decoration: none;
      color: ${vars.color_suld_150};
    }

    .SearchResultsHighlightItem__image {
      order: -2;

      @media ${mq.phone_phablet} {
        position: relative;
        height: 0;
        padding-top: 50%;
        margin-bottom: ${vars.space_2};
      }
    }
    .SearchResultsHighlightItem__image > img {
      position: absolute;
      object-fit: contain;

      @media ${mq.phone_phablet} {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      @media ${mq.tablet_up} {
        top: ${prem(20)};
        right: 0;
        width: ${vars.grid_4_4};
        height: calc(100% - ${prem(40)});
      }
    }
  }
`;
