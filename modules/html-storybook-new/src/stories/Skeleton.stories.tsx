import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Skeleton',
};
export default meta;

const SkeletonStory = () => {
  return (
    <>
      <p>
        <br /> Single line:
        <Skeleton text />
      </p>
      <p>
        <br /> Multi-line:
        <Skeleton text height={4} />
      </p>
      <p>
        <br /> Block:
        <Skeleton height={6} />
      </p>

      <p>
        <br /> Multi item (default gap: 3):
        <Skeleton items={3} height={3} text />
      </p>
      <p>
        <br /> Multi block:
        <Skeleton items={3} height={3} gap={1} />
      </p>
    </>
  );
};

export const _Skeleton: Story = {
  render: () => <SkeletonStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  } as StoryParameters,
};
