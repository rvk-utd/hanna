import React, { FC } from 'react';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import {
  CheckboxGroup,
  CheckboxGroupOptions,
  CheckboxGroupProps,
} from '@reykjavik/hanna-react/CheckboxGroup';
import { Radio } from '@reykjavik/hanna-react/Radio';
import { RadioGroup, RadioGroupProps } from '@reykjavik/hanna-react/RadioGroup';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';
import { Meta, StoryObj } from '@storybook/react';

// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Forms/Checkbox & Radio',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

// ==================== Radio ===========================================

type RadioControlProps = {
  required: boolean;
  invalid: boolean;
  disabled: boolean;
  hideLabel: boolean;
};

export const _Radio: StoryObj<RadioControlProps> = {
  render: (args) => {
    const { required, invalid, disabled, hideLabel } = args;
    return (
      <Radio
        label="Add me to your professional network on LinkedIn"
        required={required}
        invalid={invalid}
        disabled={disabled}
        hideLabel={hideLabel}
      />
    );
  },
  argTypes: {
    required: { name: 'Required' },
    invalid: { name: 'Invalid' },
    disabled: { name: 'Disabled' },
    hideLabel: { name: 'Minimal with hidden label' },
  },
  args: {
    required: false,
    invalid: false,
    disabled: false,
    hideLabel: false,
  },
};

// ==================== Checkbox ===========================================

type CheckboxControlProps = RadioControlProps & {
  errorMessage: boolean;
};

export const _Checkbox: StoryObj<CheckboxControlProps> = {
  render: (args) => {
    const { required, invalid, errorMessage, disabled, hideLabel } = args;
    const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;
    return (
      <Checkbox
        label="Add me to your professional network on LinkedIn"
        required={required}
        invalid={invalid}
        disabled={disabled}
        errorMessage={_errorMessage}
        hideLabel={hideLabel}
      />
    );
  },
  argTypes: {
    ..._Radio.argTypes,
    errorMessage: { name: 'Error message' },
  },
  args: {
    ..._Radio.args,
    errorMessage: false,
  },
};

// ----------------------------------------------------------------------------

const layoutOptions = ['normal', 'inline'] as const;
const disabledOptions = ['none', 'all', 'some'] as const;

type CheckboxAndRadioGroupControlProps = {
  layout: (typeof layoutOptions)[number];
  required: boolean;
  invalid: boolean;
  errorMessage: boolean;
  disabled: (typeof disabledOptions)[number];
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
  Component: FC<CheckboxGroupProps> | FC<RadioGroupProps>
): StoryObj<CheckboxAndRadioGroupControlProps> => ({
  render: (args) => {
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
  },

  argTypes: {
    layout: {
      name: 'Layout',
      options: layoutOptions,
      control: {
        type: 'inline-radio',
        labels: {
          normal: 'Normal',
          inline: 'Inline',
        } satisfies Record<CheckboxAndRadioGroupControlProps['layout'], string>,
      },
    },
    required: { name: 'Required' },
    invalid: { name: 'Invalid' },
    errorMessage: { name: 'Error message' },
    disabled: {
      name: 'Disabled',
      options: disabledOptions,
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          all: 'All',
          some: 'Some',
        } satisfies Record<CheckboxAndRadioGroupControlProps['disabled'], string>,
      },
    },
  },
  args: {
    layout: 'normal',
    required: false,
    invalid: false,
    errorMessage: false,
    disabled: 'none',
  },
});

export const _CheckboxGroup = makeTogglerGroupStory(CheckboxGroup);
export const _RadioGroup = makeTogglerGroupStory(RadioGroup);

// ==================== Styling Tests ===========================================

export const _StylingTests: StoryObj = {
  render: () => (
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
        <Radio label="Lorem ipsum dolor sit amet Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn Add me to your professional network on LinkedIn" />
        <Radio label="Normal" checked={false} />
        <Radio label="Checked" checked />
        <Radio label="Disabled" disabled checked={false} />
        <Radio label="Disabled + checked" disabled checked />
        <Radio label="Invalid" invalid checked={false} />
        <Radio label="Invalid + checked" invalid checked />
        {/* Standalone Radio has no error-message */}
      </RowBlockColumn>{' '}
    </RowBlock>
  ),
  parameters: {
    css: { tokens: 'Checkbox,RadioGroup,RowBlock,RowBlockColumn' },
    controls: { hideNoControlsWarning: true },
  },
};
