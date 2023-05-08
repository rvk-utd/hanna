import { css } from 'es-in-css';

import { SeenEffect__fadeup } from './utils/seenEffects.js';

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
      ${centerColumnsStyling({ allowed: ['.ContentArticle__header'] })}
    }

    .ContentArticle__header {
      display: flex;
      flex-flow: column;
    }
    .ContentArticle__header > .PageHeading,
    .ContentArticle__header > .Heading {
      order: 1;
    }
    .ContentArticle__header > .Heading:not(:last-child) {
      margin-top: 0;
    }

    // Support for simpler (and legacy) usage patterns where __heaeder
    // is NOT present and .Heading is preceeded by .ArticlaMeta, etc.
    .ContentArticle > .Heading:nth-child(2),
    .ContentArticle > .Heading:nth-child(3),
    .ContentArticle > .Heading:nth-child(4) {
      margin-top: 0;
    }
  }
`;
