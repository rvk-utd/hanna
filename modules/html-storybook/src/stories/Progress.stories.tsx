import React from 'react';
import { Progress, ProgressProps } from '@reykjavik/hanna-react/Progress';
import { Meta, StoryObj } from '@storybook/react';

type SpinnerSize = NonNullable<ProgressProps['size']>;
const sizeOptions: Array<SpinnerSize> = ['xsmall', 'small', 'medium', 'large'];

type ControlProps = {
  indeterminate: boolean;
  percent?: number;
  done: boolean;
  spinner: boolean;
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
    const { done, indeterminate, percent, spinner, size } = args;
    return (
      <Progress
        {...(indeterminate ? {} : done ? { done } : { percent })}
        {...(spinner ? { spinner: true, size } : { spinner: false })}
      />
    );
  },
  argTypes: {
    spinner: { name: 'Spinner variant' },
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
      if: { arg: 'spinner', eq: true },
    },
    indeterminate: { name: 'Indeterminate state' },
    percent: {
      name: 'Percent value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      if: { arg: 'indeterminate', eq: false },
    },
    done: {
      name: 'Done state',
      if: { arg: 'indeterminate', eq: false },
    },
  },
  args: {
    spinner: false,
    size: 'medium',
    indeterminate: false,
    percent: 17,
    done: false,
  },
};
