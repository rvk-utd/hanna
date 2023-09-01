import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Tooltip } from '@reykjavik/hanna-react/Tooltip';
import { VSpacer } from '@reykjavik/hanna-react/VSpacer';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('VSpacer');

export default function () {
  return (
    <Minimal>
      <VSpacer size="large" />
      <Tooltip
        label="What is this?"
        text={<Fragment>{loremRT.tiny(true)}</Fragment>}
        iconOnly
      />

      <VSpacer size="small" />

      <Tooltip label="Optional label?" text={lorem.short} />
      <VSpacer size="small" />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  initialHover: '.Tooltip >> nth=0',
};
