import { css } from 'es-in-css';

import { between, RangeEdge } from '../lib/between';
import { bp, mq } from '../lib/breakpoints';
import { grid } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { prem } from './utils/miscUtils';
import { SeenEffect__disallowNesting, SeenEffect__fadeup } from './utils/seenEffects';

const _between = (from: RangeEdge, to: RangeEdge) =>
  between(from, to, bp.phone, grid.contentMaxWidth, '%');

export default css`
  @media screen {
    .TableWrapper {
      ${SeenEffect__fadeup}
      // @deprecated  Remove this mixin in v0.9
      ${SeenEffect__disallowNesting}
      position: relative;
      overflow-x: auto;
    }
    .TableWrapper__footnote div:before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 18px;
      position: relative;
      margin-right: 24px;
      transform: translateY(4px);
      background-color: ${vars.color_suld_150};
    }
    .TableWrapper__footnote div {
      color: ${vars.color_suld_150};
    }

    .TableWrapper--BasicTable--fullwidth .BasicTable {
      width: 100%;
    }

    @media ${mq.tablet_up} {
      .TableWrapper--BasicTable--align--right {
        margin-left: auto;
        width: ${vars.grid_7}; // tolerate containment by right-aligned TextBlock, for instance
        .BasicTable {
          width: 100%;
        }
      }
      .paragraph-alignment-right .TableWrapper__footnote {
        margin-left: auto;
        width: ${vars.grid_7};
      }
      .TableWrapper--BasicTable--fullwidth {
        width: ${vars.grid_12};
      }

      .TextBlock--labelled .TableWrapper--BasicTable--fullwidth,
      .TextBlock--align--right .TableWrapper--BasicTable--fullwidth,
      .LabeledTextBlock--wide .TableWrapper--BasicTable--fullwidth {
        margin-left: calc(-1 * ${vars.grid_5_5});
      }
      .LabeledTextBlock .TableWrapper--BasicTable--fullwidth {
        margin-left: calc(-1 * ${vars.grid_6_6});
      }
    }

    .TableWrapper > table,
    .TableWrapper > * > table {
      margin: 0;
    }

    .TableWrapper--at::before,
    .TableWrapper--at::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${vars.space_3};
      background-image: linear-gradient(
        90deg,
        rgba(black, 0.12) 0,
        rgba(black, 0.05) 50%,
        transparent 100%
      );
      pointer-events: none;
      transition: opacity 200ms ease-in;
    }
    .TableWrapper--at::after {
      left: auto;
      right: 0;
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
      overflow-x: auto;
    }
  }
  @media ${mq.phone_tablet} {
    .BasicTable {
      width: 100%;
    }
    .TableWrapper {
      margin: 0 ${vars.grid_margin__neg};
      margin-right: ${vars.grid_margin__right__neg};
    }
    .TableWrapper__scroller {
      padding: 0 ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
      // border-right: $var--browser-scrollbar-width solid transparent; // push away fromunder
    }
  }

  // ===========================================================================

  @media screen {
    .BasicTable,
    .TableWrapper--BasicTable {
      margin-bottom: ${prem(30)};
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

  // ===========================================================================

  .TableWrapper--BasicTable--align--right.TableWrapper--BasicTable--fullwidth {
    ${WARNING__('--align-right and --fullwidth should not be used together')};
  }
`;
