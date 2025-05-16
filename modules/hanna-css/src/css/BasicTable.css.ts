import { color, css } from 'es-in-css';

import { scale, ScaleEdge } from '../lib/between.js';
import { bp, mq } from '../lib/breakpoints.js';
import { colors } from '../lib/colors.js';
import { buildVariables } from '../lib/cssutils.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS, prem } from './utils/miscUtils.js';

const _between = (from: ScaleEdge, to: ScaleEdge) =>
  scale(from, to, bp.phone, grid.contentMaxWidth, '%');

export const BasicTableVariables = buildVariables(
  ['width', 'margin_left', 'pad_left', 'pad_right'],
  'BasicTable'
);
const btVars = BasicTableVariables.vars;

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

    .BasicTable {
      margin-left: ${btVars.pad_left};
      margin-right: ${btVars.pad_right};

      @media ${mq.phone_phablet} {
        width: 100%;
      }
    }

    .BasicTable > * > * > th,
    .BasicTable > * > * > td {
      padding: ${_between(12, 24)} ${_between(16, 30)};
      text-align: left;
      vertical-align: center;

      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: ${prem(12)};
      }

      @media ${mq.wide} {
        padding: ${prem(24)};
      }
    }
    .BasicTable > thead > * > th {
      padding-bottom: ${_between(8, 18)};

      @media ${mq.wide} {
        padding-bottom: ${prem(18)};
      }
    }

    .BasicTable--compact > * > * > th,
    .BasicTable--compact > * > * > td {
      padding: ${_between(6, 12)};

      @media ${mq.wide} {
        padding: ${prem(12)};
      }
    }
    .BasicTable--compact > thead > * > th {
      padding-bottom: ${_between(4, 8)};

      @media ${mq.wide} {
        padding-bottom: ${prem(8)};
      }
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
      white-space: normal;
    }
    .BasicTable > * > * > .Cell--text {
      text-align: left;
      white-space: normal;
    }
    .BasicTable > * > * > .Cell--text--right {
      text-align: right;
      white-space: normal;
    }
    .BasicTable > * > * > .Cell--text--center {
      text-align: center;
      white-space: normal;
    }
  }
`;
