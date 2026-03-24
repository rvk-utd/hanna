import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Timeline } from '@reykjavik/hanna-react/Timeline';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <Timeline
        items={[
          {
            title: 'Vantar upplýsingar',
            category: 'Nafn starfsmanns',
            description: 'Þarf að sanna sér deili',
            date: new Date(2025, 0, 10),
          },
          {
            title: 'Í vinnslu',
            category: 'Nafn starfsmanns',
            date: new Date(2025, 0, 8),
            status: { label: 'Móttekið', color: 'green' },
          },
          {
            title: 'Vantar upplýsingar',
            category: 'Nafn starfsmanns',
            description: 'Vantar sakavottorð',
            date: new Date(2025, 0, 6),
          },
          {
            title: 'Athugasemd',
            category: 'Nafn starfsmanns',
            description: lorem.medium,
            date: new Date(2025, 0, 4),
          },
        ]}
      />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {};
