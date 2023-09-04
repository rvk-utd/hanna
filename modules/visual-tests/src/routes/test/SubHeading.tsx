import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { SubHeading } from '@reykjavik/hanna-react/SubHeading';

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
      {checkeredBackground('.SubHeading')}
      <SubHeading align="right">Right aligned</SubHeading>
      <DummyBlock thin />
      <SubHeading align="right" small>
        Right aligned and small
      </SubHeading>
      <DummyBlock thin />
      <SubHeading>Left aligned</SubHeading>
      <SubHeading small>Left aligned and small</SubHeading>
      <DummyBlock thin />
      <SubHeading wide>Wide Subheading</SubHeading>
      <DummyBlock thin />
      <SubHeading Tag="h3">Heading level H3</SubHeading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
