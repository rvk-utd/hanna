import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import PullQuote from '@reykjavik/hanna-react/PullQuote';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <PullQuote by="Jón Jónsson" byHref=" ">
        {lorem.medium}{' '}
      </PullQuote>
      <DummyBlock thin />
      <PullQuote by="Jón Jónsson">{lorem.long} </PullQuote>
      <DummyBlock thin />
      <PullQuote>{lorem.short} </PullQuote>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const pullQuote = page.locator('.PullQuote:has(.PullQuote__quote:text("Vender"))');
    const byHref = page.locator('a');
    await byHref.hover();
    await localScreenshot(pullQuote, 'byHref-hover', { margin: 30 });
  },
};
