import React from 'react';
import range from '@hugsmidjan/qj/range';
import GridBlocks from '@reykjavik/hanna-react/GridBlocks';
import { efnistakn } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'GridBlocks',
  component: GridBlocks,
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

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

export const _GridBlocks: StoryComponent = () => {
  const twocol = boolean('Two columns', false);
  return <GridBlocks blocks={blocks} twocol={twocol} startSeen />;
};
