import { css } from 'es-in-css';

import { cols_px } from '../lib/grid';
import { WARNING__, WARNING_message__ } from '../lib/WARNING__';

// Included in ContentArticle
export const centerColumnsStyling = () => css`
  & {
    max-width: ${cols_px(8)};
    margin: 0 auto;
  }

  & > .PageHeading,
  & > .Heading,
  & > .TextBlock {
    width: auto;
    max-width: none;
    margin-left: 0;
  }

  // ===========================================================================

  // TODO: The following css in not included in https://styles.reykjavik.is/css/v0.8/CenterColumn.css Why not?

  & > [class*='--align--'],
  & > [class*='--wide'],
  & > .TextBlock--labelled,
  &
    > *:not(.TextBlock):not(.PageHeading):not(.SubHeading):not(.Heading):not(.ContentImage):not(.RelatedLinks):not(.ArticleMeta):not(.VSpacer):not(hr) {
    ${WARNING__(
      'Only use plain `PageHeading`, `Heading`, `Subheading`, `TextBlock`, `ContentImage`, `RelatedLinks`, `ArticleMeta`, `VSpacer`, `<hr/>` inside this parent wrapper.'
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
