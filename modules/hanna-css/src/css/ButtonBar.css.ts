import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

export default css`
  .ButtonBar {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-right: calc(-1 * ${vars.Button__gapH});
  }

  .ButtonBar--align--right {
    justify-content: flex-end;
  }
  .ButtonBar > * {
    margin-right: ${vars.Button__gapH};
  }

  .ButtonBar[class] > * {
    margin-bottom: ${vars.Button__gapV};
  }

  .ButtonBar > .ButtonBar {
    margin: 0;
  }

  .ButtonBar > .ButtonBar__split {
    width: 0;
    margin: 0 auto;
    flex-grow: 1;
  }

  // ---------------------------------------------------------------------------

  :not(.ButtonBar) > .ButtonBar__split {
    ${WARNING__('`.ButtonBar__split` must be direct child of `.ButtonBar`')};
  }
  .ButtonBar > br {
    ${WARNING__('No `<br/>` children in `.ButtonBar`')};
  }
  .ButtonBar > hr {
    ${WARNING__('No `<hr/>` children in `.ButtonBar`')};
  }
  .ButtonBar
    > :last-child:not(.ButtonPrimary):not(.ButtonSecondary):not(.ButtonTertiary):not(.ButtonPrimary
      ~ *):not(.ButtonSecondary ~ *):not(.ButtonTertiary ~ *) {
    ${WARNING__('`.ButtonBar` should contain Buttons')};
  }
`;
