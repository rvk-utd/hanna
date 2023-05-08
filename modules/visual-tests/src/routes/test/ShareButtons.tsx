import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';

import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <ShareButtons facebook twitter linkedin email />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ShareButtons__link--twitter',
};
