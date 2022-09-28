import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Attention from '@reykjavik/hanna-react/Attention';

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
      <Attention>
        <p>{loremRT.long(true)}</p>
      </Attention>
      <Attention small>{loremRT.long(true)}</Attention>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: 'a >> nth=0',
};
