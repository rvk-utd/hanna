import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Footnote from '@reykjavik/hanna-react/Footnote';

import { Minimal } from '../../layout/Minimal';
import { loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Footnote>{loremRT.medium(true)}</Footnote>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
