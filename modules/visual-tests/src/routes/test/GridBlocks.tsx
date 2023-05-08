import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { V2_MetaFunction } from '@remix-run/node';
import { GridBlocks } from '@reykjavik/hanna-react/GridBlocks';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { efnistakn, lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const blocks = range(1, 5).map((n) => ({
  title: n === 3 ? 'Optional link long long long title' : 'Static Heading',
  href: n === 5 ? '' : undefined,
  icon: efnistakn[n + 1],
  summary: n % 2 === 0 ? lorem.medium : 'Lorem ipsum dolor sit amet',
  links: [
    {
      href: '',
      label: 'Normal',
    },
    {
      href: '',
      label: 'Normal',
    },
  ].slice(0, (n + 1) % 3),
}));

export default function () {
  return (
    <Minimal>
      <GridBlocks blocks={blocks} startSeen />
      <DummyBlock thin />
      <GridBlocks blocks={blocks} twocol={true} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.GridBlocks__item__titlelink >> nth = 0',
};
