import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ShareButtons from '@reykjavik/hanna-react/ShareButtons';

import { Minimal } from '../../layout/Minimal';
import { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

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
