import React, { FC } from 'react';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import {
  CheckboxGroup,
  CheckboxGroupOptions,
  CheckboxGroupProps,
} from '@reykjavik/hanna-react/CheckboxGroup';
import { RadioGroup, RadioGroupProps } from '@reykjavik/hanna-react/RadioGroup';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type CheckboxControlProps = Record<
  'required' | 'invalid' | 'errorMessage' | 'disabled',
  boolean
>;

type CheckboxStory = StoryObj<CheckboxControlProps>;
type Story = StoryObj;

const meta: Meta = {
  title: 'Forms/Checkbox & Radio',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};
export default meta;

const CheckboxStory: React.FC<CheckboxControlProps> = ({
  required,
  invalid,
  errorMessage,
  disabled,
}) => {
  const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;
  return (
    <Checkbox
      label="Add me to your professional network on LinkedIn"
      required={required}
      invalid={invalid}
      disabled={disabled}
      errorMessage={_errorMessage}
    />
  );
};

export const _Checkbox: CheckboxStory = {
  render: (args: CheckboxControlProps) => <CheckboxStory {...args} />,
  argTypes: {
    required: {
      control: 'boolean',
      name: 'Required',
    },
    invalid: {
      control: 'boolean',
      name: 'Invalid',
    },
    errorMessage: {
      control: 'boolean',
      name: 'Error message',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
  },
  args: {
    required: false,
    invalid: false,
    errorMessage: false,
    disabled: false,
  },
};

// -----------------------------------------------------------------------

const layoutOptions = ['normal', 'inline'] as const;
type Layout = (typeof layoutOptions)[number];

const disabledOptions = ['none', 'all', 'some'] as const;
type Disabled = (typeof disabledOptions)[number];

type CheckboxAndRadioGroupControlProps = Omit<CheckboxControlProps, 'disabled'> & {
  layout: Layout;
  disabled: Disabled;
};

type CheckboxAndRadioGroupStory = StoryObj<CheckboxAndRadioGroupControlProps>;

type CheckboxAndRadioGroupArgs = {
  layout: Layout;
  required: boolean;
  invalid: boolean;
  errorMessage: boolean;
  disabled: Disabled;
};

const checkboxAndRadioGroupArgTypes = {
  layout: {
    control: {
      type: 'inline-radio',
      labels: {
        normal: 'Normal',
        inline: 'Inline',
      },
    },
    options: layoutOptions,
    name: 'Layout',
  },
  required: {
    control: 'boolean',
    name: 'Required',
  },
  invalid: {
    control: 'boolean',
    name: 'Invalid',
  },
  errorMessage: {
    control: 'boolean',
    name: 'Error message',
  },
  disabled: {
    control: {
      type: 'inline-radio',
      labels: {
        none: 'None',
        all: 'All',
        some: 'Some',
      },
    },
    options: disabledOptions,
    name: 'Disabled',
  },
};

const checkboxAndRadioGroupArgs: CheckboxAndRadioGroupArgs = {
  layout: 'normal',
  required: false,
  invalid: false,
  errorMessage: false,
  disabled: 'none',
};

const fruits: CheckboxGroupOptions = [
  { value: 'a', label: 'Apple' },
  {
    value: 'b',
    label: (
      <>
        Banana <span>phone</span>
      </>
    ),
  },
  { value: 'c', label: 'Orange' },
  {
    value: 'd',
    label: (
      <>
        Tomato <a href="">see more</a>
      </>
    ),
  },
];
const partialFruits: CheckboxGroupOptions = fruits.map((opt, i) => ({
  ...opt,
  disabled: i >= 2,
}));

const makeTogglerGroupStory = (
  Component: FC<CheckboxGroupProps> | FC<RadioGroupProps>,
  args: CheckboxAndRadioGroupControlProps
) => {
  const { layout, required, invalid, errorMessage, disabled } = args;
  const _layout = layout !== 'normal' ? layout : undefined;
  const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;
  const disabledOpt = disabled === 'none' ? '' : disabled;

  const _disabled = disabledOpt === 'some' ? false : !!disabledOpt;
  const options = disabledOpt === 'some' ? partialFruits : fruits;

  return (
    <Component
      label="Pick your fruits"
      invalid={invalid}
      errorMessage={_errorMessage}
      name="fruits"
      options={options}
      required={required}
      disabled={_disabled}
      layout={_layout}
    />
  );
};

export const _CheckboxGroup: CheckboxAndRadioGroupStory = {
  render: (args: CheckboxAndRadioGroupControlProps) =>
    makeTogglerGroupStory(CheckboxGroup, args),
  argTypes: {
    ...checkboxAndRadioGroupArgTypes,
  },
  args: {
    ...checkboxAndRadioGroupArgs,
  },
};

export const _RadioGroup: CheckboxAndRadioGroupStory = {
  render: (args: CheckboxAndRadioGroupControlProps) =>
    makeTogglerGroupStory(RadioGroup, args),
  argTypes: {
    ...checkboxAndRadioGroupArgTypes,
  },
  args: {
    ...checkboxAndRadioGroupArgs,
  },
};

// -----------------------------------------------------------------------

const StylingTestsStory = () => {
  return (
    <RowBlock>
      <RowBlockColumn>
        <Checkbox label="Lorem ipsum dolor sit amet Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn" />
        <Checkbox label="Normal" checked={false} />
        <Checkbox label="Checked" checked />
        <Checkbox label="Disabled" disabled checked={false} />
        <Checkbox label="Disabled + checked" disabled checked />
        <Checkbox label="Invalid" invalid checked={false} />
        <Checkbox label="Invalid + checked" invalid checked />
        <Checkbox
          label="Invalid + message"
          checked={false}
          errorMessage="Error message here"
        />
      </RowBlockColumn>
      <RowBlockColumn>
        <RadioGroup.__Radio label="Lorem ipsum dolor sit amet Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn" />
        <RadioGroup.__Radio label="Normal" checked={false} />
        <RadioGroup.__Radio label="Checked" checked />
        <RadioGroup.__Radio label="Disabled" disabled checked={false} />
        <RadioGroup.__Radio label="Disabled + checked" disabled checked />
        <RadioGroup.__Radio label="Invalid" invalid checked={false} />
        <RadioGroup.__Radio label="Invalid + checked" invalid checked />
        {/* Standalone Radio has no error-message */}
      </RowBlockColumn>{' '}
    </RowBlock>
  );
};

export const _StylingTests: Story = {
  render: () => <StylingTestsStory />,
  parameters: {
    css: { tokens: 'Checkbox,RadioGroup,RowBlock,RowBlockColumn' },
  },
};
