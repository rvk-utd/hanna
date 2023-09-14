import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('TextBlock')}
`;

// inlined by TextBlock.css.ts
export const VSpacer_css = () => css`
  // Medium is the default.
  .VSpacer[class] {
    margin: 0;
    margin-top: ${vars.component_vspace__medium};
    margin-bottom: ${vars.component_vspace__medium};
  }
  .VSpacer--small[class] {
    margin-top: ${vars.component_vspace__small};
    margin-bottom: ${vars.component_vspace__small};
  }
  .VSpacer--large[class] {
    margin-top: ${vars.component_vspace__large};
    margin-bottom: ${vars.component_vspace__large};
  }
  .VSpacer--xlarge[class] {
    margin-top: ${vars.component_vspace__xlarge};
    margin-bottom: ${vars.component_vspace__xlarge};
  }

  .VSpacer--top--none[class] {
    margin-top: 0;
  }
  .VSpacer--top--small[class] {
    margin-top: ${vars.component_vspace__small};
  }
  .VSpacer--top--large[class] {
    margin-top: ${vars.component_vspace__large};
  }
  .VSpacer--top--xlarge[class] {
    margin-top: ${vars.component_vspace__xlarge};
  }

  .VSpacer--bottom--none[class] {
    margin-bottom: 0;
  }
  .VSpacer--bottom--small[class] {
    margin-bottom: ${vars.component_vspace__small};
  }
  .VSpacer--bottom--large[class] {
    margin-bottom: ${vars.component_vspace__large};
  }
  .VSpacer--bottom--xlarge[class] {
    margin-bottom: ${vars.component_vspace__xlarge};
  }

  br.VSpacer[class], // @deprecated (remove in v0.9)
  // Drop-in (non-wrapping) <hr/> variant.
  hr.VSpacer[class] {
    display: block;
    height: 0;
    border: 0;
    margin-bottom: 0;
  }
  br.VSpacer + [class], // @deprecated (remove in v0.9)
  // Drop-in spacers override the top-margin of their next component sibling
  hr.VSpacer + [class] {
    margin-top: 0;
  }

  // Disallow double *--none classNames
  .VSpacer--top--none.VSpacer--bottom--none {
    margin-top: ${vars.component_vspace__small};
    margin-bottom: ${vars.component_vspace__small};
    ${WARNING__("VSpacer can't be both `--top--none` and  `--bottom--none`")};
  }

  // Warn about redundant classNames
  [class*='VSpacer--top--'][class*='VSpacer--bottom--'] {
    .VSpacer--small {
      ${WARNING__('The class-name `.VSpacer--small` is redundant')};
    }
    .VSpacer--large {
      ${WARNING__('The class-name `.VSpacer--large` is redundant')};
    }
    .VSpacer--xlarge {
      ${WARNING__('The class-name `.VSpacer--xlarge` is redundant')};
    }
  }
`;
