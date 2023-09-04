import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <MiniMetrics
        text="Leebur deroor iehroom, bork bork börk!"
        moreButton={{ href: '', label: 'Label text' }}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.MiniMetrics__more',
  clipViewport: true,
};
