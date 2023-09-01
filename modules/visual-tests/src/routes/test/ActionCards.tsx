import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { V2_MetaFunction } from '@remix-run/node';
import { ActionCards, ActionCardsItemProps } from '@reykjavik/hanna-react/ActionCards';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

const cards = range(1, 5).map(
  (n): ActionCardsItemProps => ({
    title:
      n === 3
        ? 'Title for this card lorem ipsum dolor sit bladiblah foo blah' + n
        : 'ActionCard ' + n,
    href: '',
    summary:
      n % 4 === 0
        ? undefined
        : (n + 3) % 3 === 0
        ? 'Summary for this card lorem ipsum dolor sit bladiblah foo blah'
        : 'Summary for this card',
  })
);

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('ButtonTertiary');

export default function () {
  return (
    <Minimal>
      <ActionCards title="Action Cards" cards={cards} startSeen />
      <ActionCards
        title="Action Cards"
        summaryElement={<ButtonTertiary href="/">Sjá meira</ButtonTertiary>}
        cards={cards.slice(0, 1)}
        startSeen
      />
      {/* No title */}
      <ActionCards cards={cards.slice(0, 2)} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ActionCards__card >> nth=0',
};
