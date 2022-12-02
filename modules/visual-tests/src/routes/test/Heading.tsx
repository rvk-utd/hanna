import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Heading } from '@reykjavik/hanna-react/Heading';

import { checkeredBackground, DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      {checkeredBackground('.Heading')}
      <Heading size="large" align="right">
        Right aligned and large
      </Heading>
      <DummyBlock thin />
      <Heading size="small" align="right">
        Right aligned and small
      </Heading>
      <DummyBlock thin />
      <Heading>Left aligned</Heading>
      <DummyBlock thin />
      <Heading size="small">Left aligned and small</Heading>
      <DummyBlock thin />
      <Heading wide>Wide Heading</Heading>
      <DummyBlock thin />
      <Heading Tag="h3">Heading level H3</Heading>
      <DummyBlock thin />
      <Heading forceH1>Heading level H1 (avoid using)</Heading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
