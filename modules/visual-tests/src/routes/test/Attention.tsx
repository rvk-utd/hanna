import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Attention } from '@reykjavik/hanna-react/Attention';

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
