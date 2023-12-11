import React from 'react';
import range from '@hugsmidjan/qj/range';
import { ActionCards, ActionCardsItemProps } from '@reykjavik/hanna-react/ActionCards';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  showTitle: boolean;
  showSummaryElement: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ActionCards',
};
export default meta;

const cards = range(1, 8).map(
  (n): ActionCardsItemProps => ({
    title: `ActionCard ${n}`,
    href: '',
    summary:
      n % 4 === 0
        ? undefined
        : (n + 3) % 3 === 0
        ? 'Summary for this card lorem ipsum dolor sit bladiblah foo blah'
        : 'Summary for this card',
  })
);

const ActionCardsStory: React.FC<ControlProps> = ({ showTitle, showSummaryElement }) => {
  return (
    <ActionCards
      title={showTitle ? 'Action Cards' : undefined}
      summaryElement={
        showSummaryElement ? (
          <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>
        ) : undefined
      }
      cards={cards}
    />
  );
};

export const _ActionCards: StoryObj<ControlProps> = {
  render: (args) => <ActionCardsStory {...args} />,
  argTypes: {
    showTitle: { name: 'ShowTitle' },
    showSummaryElement: { name: 'Summary text/More link' },
  },
  args: {
    showTitle: true,
    showSummaryElement: false,
  },
};
