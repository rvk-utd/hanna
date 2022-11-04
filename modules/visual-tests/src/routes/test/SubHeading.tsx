import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Subheading from '@reykjavik/hanna-react/SubHeading';

import { DummyBlock } from '../../layout/DummyBlock';
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
      <style>
        {`
          .SubHeading {
            background: 
            repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 
              50% / 20px 20px;
          }
        `}
      </style>
      <Subheading startSeen align="right">
        {' '}
        Right aligned{' '}
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen align="right" small>
        {' '}
        Right aligned and small{' '}
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen>Left aligned </Subheading>
      <DummyBlock thin />
      <Subheading startSeen wide>
        {' '}
        Wide Subheading{' '}
      </Subheading>
      <DummyBlock thin />
      <Subheading startSeen>Heading level H3</Subheading>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
