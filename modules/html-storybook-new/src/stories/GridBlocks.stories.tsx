import React from 'react';
import range from '@hugsmidjan/qj/range';
import { GridBlocks, GridBlocksProps } from '@reykjavik/hanna-react/GridBlocks';
import { efnistakn } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

type Story = StoryObj<GridBlocksProps>;

const meta: Meta<GridBlocksProps> = {
  title: 'GridBlocks',
  component: GridBlocks,
};
export default meta;

const blocks = range(1, 5).map((n) => ({
  title: n === 5 ? 'Optional link' : 'Static Heading',
  href: n === 5 ? '' : undefined,
  icon: efnistakn[n + 2],
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doasdasd eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
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

const GridBlocksStory: React.FC<GridBlocksProps> = ({ twocol }) => {
  return <GridBlocks blocks={blocks} twocol={twocol} startSeen />;
};

export const _GridBlocks: Story = {
  render: (args: GridBlocksProps) => <GridBlocksStory {...args} />,
  argTypes: {
    twocol: {
      control: 'boolean',
      name: 'Two columns',
    },
    ...disableControlProps(['blocks', 'startSeen']),
  },
  args: {
    twocol: false,
  },
};
