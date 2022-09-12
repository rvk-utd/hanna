import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import ActionCards, { ActionCardsItemProps } from '@reykjavik/hanna-react/ActionCards';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

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
export const handle = { cssTokens: ['ButtonTertiary'] };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
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
