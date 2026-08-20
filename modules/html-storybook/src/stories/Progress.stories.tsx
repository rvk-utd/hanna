import React from 'react';
import { Progress, ProgressProps } from '@reykjavik/hanna-react/Progress';
import { Meta, StoryObj } from '@storybook/react';

type SpinnerSize = NonNullable<ProgressProps['size']>;
const sizeOptions: Array<SpinnerSize> = ['xsmall', 'small', 'medium', 'large'];

const variantOptions = ['bar', 'spinner'] as const;

type ControlProps = {
  indeterminate: boolean;
  percent?: number;
  done: boolean;
  variant: (typeof variantOptions)[number];
  size?: (typeof sizeOptions)[number];
};

const meta: Meta<ControlProps> = {
  title: 'Progress',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};

export default meta;

export const _Progress: StoryObj<ControlProps> = {
  render: (args) => {
    const { done, indeterminate, percent, variant, size } = args;
    return (
      <Progress
        {...(indeterminate ? {} : done ? { done } : { percent })}
        {...(variant === 'spinner' ? { spinner: true, size } : { spinner: false })}
      />
    );
  },
  argTypes: {
    variant: {
      name: 'Variant',
      options: variantOptions,
      control: {
        type: 'inline-radio',
        labels: {
          bar: 'Bar (default)',
          spinner: 'Spinner',
        },
      },
    },
    size: {
      name: 'Spinner size',
      options: sizeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          xsmall: 'Extra small',
          small: 'Small',
          medium: 'Medium (default)',
          large: 'Large',
        } satisfies Record<SpinnerSize, string>,
      },
      if: { arg: 'variant', eq: 'spinner' },
    },
    indeterminate: { name: 'Indeterminate state' },
    percent: {
      name: 'Percent value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      if: { arg: 'indeterminate', eq: false },
    },
    done: {
      name: 'Done state',
    },
  },
  args: {
    variant: 'bar',
    size: 'medium',
    indeterminate: false,
    percent: 17,
    done: false,
  },
};
