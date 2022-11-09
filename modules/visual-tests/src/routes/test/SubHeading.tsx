import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Subheading from '@reykjavik/hanna-react/SubHeading';

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
      {checkeredBackground('.SubHeading')}
      <Subheading startSeen align="right">
        Right aligned
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen align="right" small>
        Right aligned and small
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen>Left aligned</Subheading>
      <Subheading startSeen small>
        Left aligned and small
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen wide>
        Wide Subheading
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen Tag="h3">
        Heading level H3
      </Subheading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
