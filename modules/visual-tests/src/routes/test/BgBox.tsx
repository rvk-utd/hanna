import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import BgBox from '@reykjavik/hanna-react/BgBox';

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
      <BgBox>
        <p>Some content that needs a "background box".</p>
      </BgBox>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
