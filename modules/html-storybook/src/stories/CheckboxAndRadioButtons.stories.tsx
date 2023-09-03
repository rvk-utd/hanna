import React from 'react';
import CheckboxButton from '@reykjavik/hanna-react/CheckboxButton';
import { CheckboxButtonsGroup } from '@reykjavik/hanna-react/CheckboxButtonsGroup';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  required: boolean;
  invalid: boolean;
  errorMessage: boolean;
};

const meta: Meta = {
  title: 'Forms/Checkbox & Radio Buttons',
  argTypes: {
    required: { name: 'Required' },
    invalid: { name: 'Invalid' },
    errorMessage: { name: 'Error message' },
    disabled: { name: 'Disabled' },
  },
  args: {
    subText: true,
    required: false,
    invalid: false,
    errorMessage: false,
  },

  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

// ==================== CheckboxButton ===========================================

type ControlPropsCheckboxButton = ControlProps & {
  subText: boolean;
  disabled: boolean;
};

export const _CheckboxButton: StoryObj<ControlPropsCheckboxButton> = {
  name: 'CheckboxButton',
  render: (args) => {
    const { subText, required, invalid, errorMessage, disabled } = args;
    const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;

    const labelText = 'Add me to your professional network on LinkedIn';
    const label = subText ? (
      <>
        {labelText} <small>(Just kidding)</small>
      </>
    ) : (
      labelText
    );

    return (
      <CheckboxButton
        label={label}
        required={required}
        invalid={invalid}
        disabled={disabled}
        errorMessage={_errorMessage}
      />
    );
  },
  argTypes: {
    subText: { name: 'Sub-text (small print)' },
  },
  args: {
    subText: false,
    disabled: false,
  },
};

// ---------------------------------------------------------------------------

const names = [
  {
    value: 'Jón',
    label: (
      <>
        Jón Jónsson <small>Fæddur 1991</small>
      </>
    ),
  },
  {
    value: 'Anna',
    label: <>Anna Önnudóttir</>,
  },
  {
    value: 'Gunnar',
    label: (
      <>
        Gunnar Gunnarilíus Gunnarsson <small>Fæddur 1995</small>
      </>
    ),
  },
  {
    value: 'Guðrún',
    label: (
      <>
        Guðrún Guðrúnardóttir <small>Fædd 1997</small>
      </>
    ),
  },
  {
    value: 'Pétur',
    label: <>Pétur Pétursson</>,
  },
];
const partialNames = names.map((opt, i) => ({
  ...opt,
  disabled: i >= 2,
}));

const getProps = (args: ControlPropsCheckboxAndRadioButtonsGroup) => {
  const { required, invalid, errorMessage, disabled } = args;
  const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;
  const disabledOpt = disabled !== 'none' ? disabled : '';
  const _disabled = disabledOpt === 'some' ? false : !!disabledOpt;
  const options = disabledOpt === 'some' ? partialNames : names;

  return {
    invalid,
    _errorMessage,
    options,
    required,
    _disabled,
  };
};

// ==================== Checkbox Buttons Group =======================================

const disabledOptions = ['none', 'some', 'all'] as const;

type ControlPropsCheckboxAndRadioButtonsGroup = ControlProps & {
  disabled: (typeof disabledOptions)[number];
};

export const _CheckboxButtonsGroup: StoryObj<ControlPropsCheckboxAndRadioButtonsGroup> = {
  render: (args) => (
    <CheckboxButtonsGroup
      label="Pick your fruits"
      name="fruits"
      value={['Anna', 'Guðrún']}
      {...getProps(args)}
    />
  ),
  argTypes: {
    disabled: {
      name: 'Disabled',
      options: disabledOptions,
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          some: 'Some',
          all: 'All',
        } satisfies Record<ControlPropsCheckboxAndRadioButtonsGroup['disabled'], string>,
      },
    },
  },
  args: {
    disabled: 'none',
  },
};

// ==================== Radio Buttons Group =======================================

export const _RadioButtonsGroup: StoryObj<ControlPropsCheckboxAndRadioButtonsGroup> = {
  ..._CheckboxButtonsGroup,
  render: (args) => (
    <RadioButtonsGroup
      label="Pick your fruit"
      name="fruit"
      value="Anna"
      {...getProps(args)}
    />
  ),
};
