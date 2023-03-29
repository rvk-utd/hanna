import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { SubHeading } from '@reykjavik/hanna-react/SubHeading';

import { checkeredBackground, DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {checkeredBackground('.SubHeading')}
      <SubHeading startSeen align="right">
        Right aligned
      </SubHeading>
      <DummyBlock thin />
      <SubHeading startSeen align="right" small>
        Right aligned and small
      </SubHeading>
      <DummyBlock thin />
      <SubHeading startSeen>Left aligned</SubHeading>
      <SubHeading startSeen small>
        Left aligned and small
      </SubHeading>
      <DummyBlock thin />
      <SubHeading startSeen wide>
        Wide Subheading
      </SubHeading>
      <DummyBlock thin />
      <SubHeading startSeen Tag="h3">
        Heading level H3
      </SubHeading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
