import { css } from 'es-in-css';

import { gridPx } from '../lib/grid.js';
import { WARNING__, WARNING_message__ } from '../lib/WARNING__.js';

const not = (selectors?: Array<string>) =>
  selectors ? `:not(${selectors.join('):not(')})` : '';

// Included in ContentArticle
export const centerColumnsStyling = (opts: { allowed?: Array<string> } = {}) => css`
  & {
    max-width: ${gridPx(8)};
    margin: 0 auto;
  }

  & .PageHeading,
  & .Heading,
  & .TextBlock {
    width: auto;
    max-width: none;
    margin-left: 0;
  }

  // ===========================================================================
  & > [class*='--align--'],
  & > [class*='--wide'],
  & > .TextBlock--labelled,
  &
    > *:not(.TextBlock):not(.PageHeading):not(.Heading):not(.ContentImage):not(
      .RelatedLinks
    ):not(.ArticleMeta):not(.VSpacer):not(hr)${not(opts.allowed)} {
    ${WARNING__(
      'Only use plain `PageHeading`, `Heading`, `TextBlock`, `ContentImage`, `RelatedLinks`, `ArticleMeta`, `VSpacer`, `<hr/>` inside this parent wrapper.'
    )};
  }
  & > [class*='--align--'][class],
  & > [class*='--wide'][class] {
    ${WARNING_message__('Do not use --align-- or --wide modifiers.')};
  }
  & > .TextBlock--labelled[class] {
    ${WARNING_message__('Do not use the --labelled modifier.')};
  }
`;

export default css`
  @media screen {
    .CenterColumn {
      ${centerColumnsStyling}
    }
  }
`;
