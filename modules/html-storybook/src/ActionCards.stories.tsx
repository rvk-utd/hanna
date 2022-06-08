import React from 'react';
import ActionCards, { ActionCardsProps } from '@reykjavik/hanna-react/ActionCards';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'ActionCards',
  parameters: {} as StoryParameters,
};

const cards: ActionCardsProps['cards'] = [];

for (let i = 1; i < 10; i++) {
  cards.push({
    title: 'ActionCard ' + i,
    href: '',
    summary:
      i % 4 === 0
        ? undefined
        : (i + 3) % 3 === 0
        ? 'Summary for this card lorem ipsum dolor sit bladiblah foo blah'
        : 'Summary for this card',
  });
}

export const _ActionCards: StoryComponent = () => {
  return <ActionCards title="ActionCards" cards={cards} startSeen />;
};
