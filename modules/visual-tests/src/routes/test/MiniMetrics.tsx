import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <MiniMetrics
        text="Leebur deroor iehroom, bork bork börk!"
        moreButton={{ href: '', label: 'Label text' }}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.MiniMetrics__more',
  clipViewport: true,
};
