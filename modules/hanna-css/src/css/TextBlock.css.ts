import { css, em } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { ComponentLayout } from './styles/componentLayout.js';
import {
  LabeledTitleStyle__basics,
  LabeledTitleStyle__outdented,
} from './styles/labeledTitle.js';
import { cols_pct, DEPS } from './utils/miscUtils.js';
import { textContent, textContentVars } from './utils/textContent.js';
import { ArticleMeta_css } from './ArticleMeta.css.js';
import { Heading_css } from './Heading.css.js';
import { PageHeading_css } from './PageHeading.css.js';
import { Sharpie_css } from './Sharpie.css.js';
import { SubHeading_css } from './SubHeading.css.js';
import { VSpacer_css } from './VSpacer.css.js';

export default css`
  ${DEPS('Attention')}

  @media screen {
    .TextBlock {
      ${ComponentLayout};
      ${textContent};

      position: relative;
      margin-bottom: ${scale_container(20, 30)};
    }
    .TextBlock--small {
      font: ${vars.font_bd_s};

      h2 {
        font: ${vars.font_sh_l};
      }
      h3 {
        font: ${vars.font_sh_s};
      }
      h4 {
        font: ${vars.font_bd_l};
        font-weight: ${vars.font_weight__bold};
      }
    }

    // ---------------------------------------------------------------------------

    .TextBlock--labelled h2 {
      ${LabeledTitleStyle__basics(false)}
    }

    @media ${mq.tablet_up} {
      .TextBlock--labelled {
        ${textContentVars.override({
          h2__marginTop: em(2),
          h2__marginBottom: em(0.25),
          // h3__marginTop: em(1.25), // <-- currently same as the default value.
          // same as --align--right (see layout.ComponentLayout())
        })}
        margin-left: auto;
        width: ${cols_pct(7)};
      }
      .TextBlock--labelled h2 {
        ${LabeledTitleStyle__outdented}
        width: auto;
        height: 0;
        margin-left: ${cols_pct(-5, -5, { ofCols: 7 })};
        padding-right: ${cols_pct(8, 7, { ofCols: 7 })};
      }
    }

    // ---------------------------------------------------------------------------

    .TextBlock--small.TextBlock--labelled {
      ${WARNING__("`--small` can't be `--labelled`")};
    }
    .TextBlock--wide.TextBlock--labelled {
      ${WARNING__("`--wide` can't be `--labelled`")};
    }

    // ---------------------------------------------------------------------------

    .TextBlock--largetext {
      ${WARNING__('`--largetext` is Outdated. TextBlock is "large" by default')};
    }
    .TextBlock__title {
      ${WARNING__('`__title` is Outdated. Use PageHeading/SubHeading')};
    }
    .TextBlock .PageHeading,
    .TextBlock .SubHeading {
      ${WARNING__('Should NOT be used inside TextBlock')};
    }
  }

  // ===========================================================================

  ${
    ''
    // Inline the most common text atom components
    // for better compression and loading speed
  }
  ${PageHeading_css}
  ${Heading_css}
  ${SubHeading_css}
  ${Sharpie_css}
  ${VSpacer_css}
  ${ArticleMeta_css}
`;
