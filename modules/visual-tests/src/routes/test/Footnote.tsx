import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Footnote } from '@reykjavik/hanna-react/Footnote';

import { Minimal } from '../../layout/Minimal.js';
import { loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <Footnote>{loremRT.medium(true)}</Footnote>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
