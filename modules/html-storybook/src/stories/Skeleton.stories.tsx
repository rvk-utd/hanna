import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';
import { Meta, StoryObj } from '@storybook/react';

const variantOptions = ['text', 'block'] as const;
const numbersOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const gapOptions = [1, 2, 3, 4, 5] as const;

type ControlProps = {
  variant: (typeof variantOptions)[number];
  height: (typeof numbersOptions)[number];
  items: (typeof numbersOptions)[number];
  gap: (typeof gapOptions)[number];
};

const meta: Meta = {
  title: 'Skeleton',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const SkeletonStory: React.FC<ControlProps> = ({ variant, height, items, gap }) => {
  return <Skeleton height={height} items={items} text={variant === 'text'} gap={gap} />;
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
      options: numbersOptions,
      control: 'select',
    },
    items: {
      name: 'Items',
      options: numbersOptions,
      control: 'select',
    },
    gap: {
      name: 'gap',
      options: gapOptions,
      control: 'select',
      if: { arg: 'items', neq: 1 },
    },
  },
  args: {
    variant: 'text',
    height: 3,
    items: 1,
    gap: 1,
  },
};
