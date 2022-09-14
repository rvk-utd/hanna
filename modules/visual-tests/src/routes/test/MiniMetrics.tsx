import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import MiniMetrics from '@reykjavik/hanna-react/MiniMetrics';

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
      <MiniMetrics
        text="78% nemanda upplifðu gleði 2019"
        moreButton={{ href: '', label: 'Skoða mælaborðið' }}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.MiniMetrics__more',
};
