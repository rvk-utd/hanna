import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ActionCards, { ActionCardsProps } from '@reykjavik/hanna-react/ActionCards';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const cards: ActionCardsProps['cards'] = [];

for (let i = 1; i < 10; i++) {
  cards.push({
    title:
      i === 3
        ? 'Title for this card lorem ipsum dolor sit bladiblah foo blah' + i
        : 'ActionCard ' + i,
    href: '',
    summary:
      i % 4 === 0
        ? undefined
        : (i + 3) % 3 === 0
        ? 'Summary for this card lorem ipsum dolor sit bladiblah foo blah'
        : 'Summary for this card',
  });
}

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ActionCards title="ActionCards" cards={cards} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('.ActionCards__card >> nth=5').hover();
  },
};
