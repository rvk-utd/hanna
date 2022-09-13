import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import GridBlocks from '@reykjavik/hanna-react/GridBlocks';

import { Minimal } from '../../layout/Minimal';
import { efnistakn } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const blocks = range(1, 5).map((n) => ({
  title: n === 5 ? 'Optional link long long long title' : 'Static Heading',
  href: n === 5 ? '' : undefined,
  icon: efnistakn[n + 2],
  summary:
    n % 2 === 0
      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doasdasd eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
      : 'Lorem ipsum dolor sit amet',
  links: [
    {
      href: '',
      label: 'Normal',
    },
    {
      href: '',
      label: 'Normal',
    },
  ].slice(0, (n + 1) % 6),
}));

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <GridBlocks blocks={blocks} startSeen />
      <GridBlocks blocks={blocks} twocol={true} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.GridBlocks__item__titlelink >> nth = 0',

  extras: async ({ page, pageScreenshot }) => {
    await page.locator('.ButtonTertiary >> nth=0').hover();
    await pageScreenshot('button-hover');
  },
};
