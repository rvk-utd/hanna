import React from 'react';
import range from '@hugsmidjan/qj/range';
import {
  ActionCards,
  ActionCardsItemProps,
  ActionCardsProps,
} from '@reykjavik/hanna-react/ActionCards';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Meta, StoryObj } from '@storybook/react';

type ActionCardsControlsProps = {
  showTitle: boolean;
  showSummaryElement: boolean;
};

type ActionCardsStoryProps = ActionCardsProps & ActionCardsControlsProps;

const meta: Meta<ActionCardsStoryProps> = {
  title: 'ActionCards',
  component: ActionCards,
};
export default meta;

type Story = StoryObj<ActionCardsStoryProps>;

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

const ActionCardsStory: React.FC<ActionCardsControlsProps> = ({
  showTitle,
  showSummaryElement,
}) => {
  return (
    <ActionCards
      title={showTitle ? 'Action Cards' : undefined}
      summaryElement={
        showSummaryElement ? (
          <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>
        ) : undefined
      }
      cards={cards}
      startSeen
    />
  );
};

export const _ActionCards: Story = (args: ActionCardsStoryProps) => (
  <ActionCardsStory {...args} />
);

_ActionCards.argTypes = {
  showTitle: {
    control: 'boolean',
    name: 'ShowTitle',
  },
  showSummaryElement: {
    control: 'boolean',
    name: 'Summary text/More link',
  },
  cards: {
    table: {
      disable: true,
    },
  },
  startSeen: {
    table: {
      disable: true,
    },
  },
  summaryElement: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
  titleTag: {
    table: {
      disable: true,
    },
  },
};
_ActionCards.args = {
  showTitle: true,
  showSummaryElement: false,
};
