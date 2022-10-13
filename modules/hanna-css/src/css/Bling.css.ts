import { css } from 'es-in-css';

import { mq, screen_and } from '../lib/breakpoints';
import { buildVariables, isDevMode } from '../lib/cssutils';
import { grid } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

const $baseW = grid.contentMaxWidth;

export const BlingVariables = buildVariables(['Bling__baseWitdh']);
const Bv = BlingVariables.vars;

export default css`
  .Bling {
    display: none;
  }
  @media ${screen_and + mq.tablet_up} {
    :root {
      ${BlingVariables.declare({
        Bling__baseWitdh: vars.grid_12,
      })}
    }

    .Bling {
      display: block; // override default hidden state
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      z-index: ${vars.zindex__Bling};
      pointer-events: none;
      // Default colors are the same as .Bling--color--tertiary
      --bling-color-a: ${vars.theme_color_tertiary};
      --bling-color-b: ${vars.theme_color_secondary};
      --bling-width: 0;
      --bling-offset: 0;
      // --bling-offset-ish: ;
      // --bling-offset-center: ;
    }

    .Bling > svg {
      transform: translate(-50%, -50%); // Default to --vertical--center
      width: calc(var(--bling-width) / ${$baseW} * ${Bv.Bling__baseWitdh});
      height: auto;
      display: block;
      position: relative;
      padding: 3.5% 0;
    }

    // ---------------------------------------------------------------------------

    /*
      .Bling--color--tertiary {
      	--bling-color-a: ${vars.theme_color_tertiary};
      	--bling-color-b: ${vars.theme_color_secondary};
      }
    */
    .Bling--color--secondary {
      --bling-color-a: ${vars.theme_color_secondary};
      --bling-color-b: ${vars.theme_color_tertiary};
    }
    .Bling--color--primary {
      --bling-color-a: ${vars.theme_color_primary};
      --bling-color-b: ${vars.theme_color_secondary};
    }

    // ---------------------------------------------------------------------------

    .Bling--align--left > svg,
    .Bling--align--right > svg {
      left: calc(var(--bling-offset) / ${$baseW} * ${Bv.Bling__baseWitdh});
    }
    .Bling--align--left-ish > svg,
    .Bling--align--right-ish > svg {
      left: calc(
        var(--bling-offset-ish, var(--bling-offset)) / ${$baseW} * ${Bv.Bling__baseWitdh}
      );
      @if isDevMode() {
        // prettier-ignore
        --notDefined--bling-offset-ish: var(--bling-offset-ish, );
        outline: var(--notDefined--bling-offset-ish) 10px dashed rgba(red, 0.25);
      }
    }
    .Bling--align--left-center > svg,
    .Bling--align--right-center > svg {
      ${
        ''
        // postcss-calc (v7.0.4) (via cssnano) has LOTS of issues
        // Remove this workaround when https://github.com/postcss/postcss-calc/issues/104
        // has been successfully resolved
      }
      --postcss-calc-bug-workaround: var(
      --bling-offset-center,
      var(--bling-offset-ish, var(--bling-offset))
    );
      left: calc(var(--postcss-calc-bug-workaround) / ${$baseW} * ${Bv.Bling__baseWitdh});
      ${isDevMode &&
      css`
        // prettier-ignore
        --notDefined--bling-offset-center: var(--bling-offset-center, );
        outline: var(--notDefined--bling-offset-center) 10px dashed rgba(red, 0.25);
      `}
    }

    .Bling--align--right,
    .Bling--align--right-ish,
    .Bling--align--right-center {
      transform: scaleX(-1);
    }

    // ---------------------------------------------------------------------------

    .Bling--vertical--up > svg {
      transform: translate(-50%, -100%);
    }
    .Bling--vertical--up-ish > svg {
      transform: translate(-50%, -75%);
    }
    /*
      .Bling--vertical--center > svg {
      	transform: translate(-50%, -50%);
      }
    */
    .Bling--vertical--down-ish > svg {
      transform: translate(-50%, -25%);
    }
    .Bling--vertical--down > svg {
      transform: translate(-50%, 0%);
    }

    // ---------------------------------------------------------------------------

    .Bling--parent--top {
      top: -5%;
    }
    .Bling--parent--top-ish {
      top: 25%;
    }
    .Bling--parent--center {
      top: 50%;
    }
    .Bling--parent--bottom-ish {
      top: 75%;
    }
    .Bling--parent--bottom {
      top: 100%;
    }

    // ---------------------------------------------------------------------------

    .Bling--overlay {
      z-index: ${vars.zindex__Bling__overlay};
    }
  }
`;
