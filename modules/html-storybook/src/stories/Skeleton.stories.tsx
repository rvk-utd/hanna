import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';
import { Meta, StoryObj } from '@storybook/react';

const variantOptions = ['text', 'block'] as const;
const heightOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type ControlProps = {
  variant: (typeof variantOptions)[number];
  height: (typeof heightOptions)[number];
};

const meta: Meta = {
  title: 'Skeleton',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const SkeletonStory: React.FC<ControlProps> = ({ variant, height }) => {
  console.log('variant => ', variant);
  return (
    <>
      <h3>HUGA BUGA</h3>
      {variant === 'text' ? (
        <Skeleton height={height} text />
      ) : (
        <Skeleton height={height} />
      )}
      <h3>HUGA BUGA END</h3>
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
    height: {
      name: 'Height',
      options: heightOptions,
      control: 'select',
    },
  },
  args: {
    variant: 'text',
    height: 3,
  },
};
