import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';
import { Meta, StoryObj } from '@storybook/react';

const variantOptions = ['text', 'block'] as const;

type ControlProps = {
  variant: (typeof variantOptions)[number];
};

const meta: Meta = {
  title: 'Skeleton',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const SkeletonStory: React.FC<ControlProps> = ({ variant }) => {
  console.log('variant => ', variant);
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

export const _Skeleton: StoryObj<ControlProps> = {
  render: (args) => <SkeletonStory {...args} />,
  argTypes: {
    variant: {
      name: 'Variant',
      options: variantOptions,
      control: 'radio',
    },
  },
  args: {
    variant: 'text',
  },
};
