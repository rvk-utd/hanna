import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { BgBox } from '@reykjavik/hanna-react/BgBox';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <BgBox>
        <p>{lorem.medium}</p>
      </BgBox>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
