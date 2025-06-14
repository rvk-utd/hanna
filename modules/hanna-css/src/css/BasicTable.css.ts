import { color, css } from 'es-in-css';

import { clamp_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { colors } from '../lib/colors.js';
import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS, prem } from './utils/miscUtils.js';

export const BasicTableVariables = buildVariables(
  ['width', 'margin_left', 'pad_left', 'pad_right', 'cellPad_X', 'cellPad_Y'],
  'BasicTable'
);
const btVars = BasicTableVariables.vars;

const outdentOnMobile = false as boolean;

export default css`
  ${DEPS('Footnote')}

  @media screen {
    .TableWrapper {
      position: relative;
      overflow-x: auto;
      display: flex;

      ${BasicTableVariables.declare({
        width: 'auto', // auto causes calc() to fail and implicitly revert to "auto"
        margin_left: '0px',
        pad_left: '0px',
        pad_right: '0px',
        cellPad_Y: clamp_phone_netbook(12, 24),
        cellPad_X: clamp_phone_netbook(16, 24),
      })};

      width: calc(${btVars.width} + ${btVars.pad_left} + ${btVars.pad_right});
      margin-left: calc(${btVars.margin_left} - ${btVars.pad_left});
      margin-right: calc(0px - ${btVars.pad_right});

      @media ${mq.phone_tablet} {
        ${BasicTableVariables.override({
          pad_left: vars.grid_margin,
          pad_right: vars.grid_margin__right,
        })};
      }
    }

    .TableWrapper--BasicTable--fullwidth .BasicTable,
    .TableWrapper--BasicTable--align--right .BasicTable {
      width: 100%;
    }

    @media ${mq.tablet_up} {
      .TableWrapper--BasicTable--align--right {
        ${BasicTableVariables.override({
          margin_left: vars.grid_5_5,
          width: vars.grid_7,
        })};
      }
      .TextBlock--labelled .TableWrapper--BasicTable--align--right,
      .TextBlock--align--right .TableWrapper--BasicTable--align--right,
      .LabeledTextBlock--wide .TableWrapper--BasicTable--align--right {
        ${BasicTableVariables.override({
          margin_left: '0px',
        })};
      }

      .TableWrapper--BasicTable--fullwidth {
        ${BasicTableVariables.override({
          width: vars.grid_12,
        })};
      }
      .TextBlock--labelled .TableWrapper--BasicTable--fullwidth,
      .TextBlock--align--right .TableWrapper--BasicTable--fullwidth,
      .LabeledTextBlock--wide .TableWrapper--BasicTable--fullwidth {
        ${BasicTableVariables.override({
          margin_left: `calc(-1 * ${vars.grid_5_5})`,
        })};
      }
      .LabeledTextBlock .TableWrapper--BasicTable--fullwidth {
        ${BasicTableVariables.override({
          margin_left: `calc(-1 * ${vars.grid_6_6})`,
        })};
      }
    }

    .TableWrapper > table,
    .TableWrapper > * > table {
      max-width: 100%;
      margin-top: 0;
      margin-bottom: 0;
    }

    .TableWrapper--at::before,
    .TableWrapper--at::after {
      content: '';
      position: sticky;
      left: 0;
      margin-right: ${vars.space_3__neg};
      width: ${vars.space_3};
      background-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.12) 0,
        rgba(0, 0, 0, 0.05) 50%,
        transparent 100%
      );
      pointer-events: none;
      transition: opacity 200ms ease-in;
    }
    .TableWrapper--at::after {
      left: auto;
      margin-right: 0;
      right: 0;
      margin-left: ${vars.space_3__neg};
      transform: scaleX(-1);
    }

    .TableWrapper--at--start::before {
      // content: none
      opacity: 0;
    }
    .TableWrapper--at--end::after {
      // content: none
      opacity: 0;
    }

    .TableWrapper__scroller {
      max-width: 100%;
      overflow-x: auto;
      display: flex;

      @media ${mq.phone_tablet} {
        &::after {
          content: '';
          width: 0.5px;
        }
      }
    }

    .TableWrapper > :nth-of-type(2),
    .TableWrapper > :not(table):not(.TableWrapper__scroller) {
      ${WARNING__('TableWrapper should only contain a single <table/>')};
    }

    .TableWrapper--BasicTable--align--right.TableWrapper--BasicTable--fullwidth {
      ${WARNING__('--align-right and --fullwidth should not be used together')};
    }
  }

  // ===========================================================================

  // Drupal specific additions. Consider removing in future version
  .TableWrapper__footnote div {
    color: ${vars.color_suld_150};
  }
  .TableWrapper__footnote div:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    position: relative;
    margin-right: 24px;
    transform: translateY(4px);
    background-color: currentColor;
  }

  @media ${mq.tablet_up} {
    .paragraph-alignment-right .TableWrapper__footnote {
      margin-left: auto;
      width: ${vars.grid_7};
    }
  }

  // ===========================================================================

  @media screen {
    .BasicTable,
    .TableWrapper--BasicTable {
      margin-bottom: ${prem(30)};
    }

    table.BasicTable {
      margin-left: ${btVars.pad_left};
      margin-right: ${btVars.pad_right};
      max-width: calc(100% - ${btVars.pad_left} - ${btVars.pad_right});

      @media ${mq.phone_tablet} {
        width: 100%;
      }
    }
    .BasicTable--compact {
      ${BasicTableVariables.override({
        cellPad_Y: clamp_phone_netbook(8, 12),
        cellPad_X: clamp_phone_netbook(12, 16),
      })};
    }

    ${outdentOnMobile &&
    css`
      @media ${mq.phone_phablet} {
        table.BasicTable {
          max-width: calc(
            100% - ${btVars.pad_left} - ${btVars.pad_right} + 2 * ${btVars.cellPad_X}
          );
          margin-left: calc(${btVars.pad_left} - ${btVars.cellPad_X});
          margin-right: calc(${btVars.pad_right} - ${btVars.cellPad_X});
        }
        .BasicTable > caption {
          padding-left: ${btVars.cellPad_X};
          padding-right: ${btVars.cellPad_X};
        }
      }
    `}

    .BasicTable > tbody > tr:nth-child(odd) {
      background-color: ${vars.color_esja_25};
    }

    .BasicTable > * > * > th,
    .BasicTable > * > * > td {
      padding: ${btVars.cellPad_Y} ${btVars.cellPad_X};
      padding-right: 0;
      text-align: left;
      vertical-align: center;
    }
    .BasicTable > * > * > th:last-child,
    .BasicTable > * > * > td:last-child {
      padding-right: ${btVars.cellPad_X};
    }

    .BasicTable > thead > * > th {
      padding-bottom: ${clamp_phone_netbook(8, 16)};
    }
    .BasicTable--compact > thead > * > th {
      padding-bottom: ${clamp_phone_netbook(4, 8)};
    }

    .BasicTable > tfoot > * > th,
    .BasicTable > tfoot > * > td {
      border-top: 2px solid ${vars.color_suld_100};
      border-bottom: 0;
      font-weight: ${vars.font_weight__bold};
    }

    // ---------------------------------------------------------------------------

    .BasicTable > * > * > .Cell--number {
      text-align: right;
      white-space: nowrap;
    }
    .BasicTable > * > * > td.Cell--number--pos {
      // ACK! Ellidaardalur 150 is too dark green to register, while
      // Ellidaardalur 100 is too light to pass our A11y contrast requirements.
      // Improved color pallette may fix this!
      color: ${color(colors.ellidaardalur_150).mix(color(colors.ellidaardalur_100), 0.5)};
    }
    .BasicTable > * > * > td.Cell--number--neg {
      color: ${vars.color_heidmork_100};
    }
    .BasicTable > * > * > .Cell--tel {
      text-align: left;
      min-width: 6.5em; /* Mundu sjö stafa símanúmer */
      white-space: normal;
    }
    .BasicTable > * > * > .Cell--text {
      text-align: left;
      min-width: 10em;
      white-space: normal;
    }
    .BasicTable > * > * > .Cell--text--right {
      text-align: right;
    }
    .BasicTable > * > * > .Cell--text--center {
      text-align: center;
    }
  }
`;
