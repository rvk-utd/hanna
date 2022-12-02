import React from 'react';
import range from '@hugsmidjan/qj/range';
import { ActionCards, ActionCardsItemProps } from '@reykjavik/hanna-react/ActionCards';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'ActionCards',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

const cards = range(1, 8).map(
  (n): ActionCardsItemProps => ({
    title: 'ActionCard ' + n,
    href: '',
    summary:
      n % 4 === 0
        ? undefined
        : (n + 3) % 3 === 0
        ? 'Summary for this card lorem ipsum dolor sit bladiblah foo blah'
        : 'Summary for this card',
  })
);

export const _ActionCards: StoryComponent = () => {
  const title = boolean('Title', true) || undefined;
  const summary = boolean('Summary text/More link', false) || undefined;

  return (
    <ActionCards
      title={title && 'Action Cards'}
      summaryElement={summary && <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>}
      cards={cards}
      startSeen
    />
  );
};
