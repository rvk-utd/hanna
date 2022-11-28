import { css } from 'es-in-css';

import { SeenEffect__fadeup } from './utils/seenEffects';

import { centerColumnsStyling } from './CenterColumn.css';

export default css`
  /*!@deps
    ArticleMeta
    Heading
    ContentImage
    TextBlock
    VSpacer
    RelatedLinks
  */
  @media screen {
    .ContentArticle {
      ${SeenEffect__fadeup}
      ${centerColumnsStyling}
    }
  }
`;
