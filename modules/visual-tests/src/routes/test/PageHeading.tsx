import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import PageHeading from '@reykjavik/hanna-react/PageHeading';

import { checkeredBackground, DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      {checkeredBackground('.PageHeading')}
      <PageHeading startSeen>Align left</PageHeading>
      <DummyBlock thin />
      <PageHeading startSeen align="right">
        Align right
      </PageHeading>
      <DummyBlock thin />
      <PageHeading startSeen small>
        Small title
      </PageHeading>
      <DummyBlock thin />
      <PageHeading startSeen Tag="h2">
        Heading level H2
      </PageHeading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
