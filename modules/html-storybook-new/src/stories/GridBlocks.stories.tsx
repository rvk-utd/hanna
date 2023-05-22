import React from 'react';
import range from '@hugsmidjan/qj/range';
import { GridBlocks } from '@reykjavik/hanna-react/GridBlocks';
import { efnistakn } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GridBlocks> = {
  title: 'components/GridBlocks',
  component: GridBlocks,
};
export default meta;

type Story = StoryObj<typeof GridBlocks>;

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

const Component = () => {
  const twocol = boolean('Two columns', false);
  return <GridBlocks blocks={blocks} twocol={twocol} startSeen />;
};

export const _GridBlocks: Story = {
  render: () => <Component />,
};
