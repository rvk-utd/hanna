import React from 'react';
import range from '@hugsmidjan/qj/range';
import { ActionCards, ActionCardsItemProps } from '@reykjavik/hanna-react/ActionCards';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Meta, StoryObj } from '@storybook/react';

type ControlsProps = {
  showTitle: boolean;
  showSummaryElement: boolean;
};

const meta: Meta<ControlsProps> = {
  title: 'ActionCards',
};
export default meta;

type Story = StoryObj<ControlsProps>;

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

const ActionCardsStory: React.FC<ControlsProps> = ({ showTitle, showSummaryElement }) => {
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

export const _ActionCards: Story = {
  render: (args: ControlsProps) => <ActionCardsStory {...args} />,
  argTypes: {
    showTitle: {
      control: 'boolean',
      name: 'ShowTitle',
    },
    showSummaryElement: {
      control: 'boolean',
      name: 'Summary text/More link',
    },
  },
  args: {
    showTitle: true,
    showSummaryElement: false,
  },
};
