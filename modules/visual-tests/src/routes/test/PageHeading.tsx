import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';

import { checkeredBackground, DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {checkeredBackground('.PageHeading')}
      <PageHeading>Align left</PageHeading>
      <DummyBlock thin />
      <PageHeading align="right">Align right</PageHeading>
      <DummyBlock thin />
      <PageHeading small>Small title</PageHeading>
      <PageHeading small align="right">
        Small align right
      </PageHeading>
      <DummyBlock thin />
      <PageHeading Tag="h2">Heading level H2</PageHeading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
