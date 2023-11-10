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

  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const baseCtrl: Pick<StoryObj<ControlProps>, 'argTypes' | 'args'> = {
  argTypes: {
    required: { name: 'Required' },
    invalid: { name: 'Invalid' },
    errorMessage: { name: 'Error message' },
  },
  args: {
    required: false,
    invalid: false,
    errorMessage: false,
  },
};

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
    disabled: { name: 'Disabled' },
    ...baseCtrl.argTypes,
  },
  args: {
    subText: false,
    disabled: false,
    ...baseCtrl.args,
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
  const errorMessage = args.errorMessage ? 'You must accept this nice offer.' : undefined;
  const disabledOpt = args.disabled !== 'none' ? args.disabled : '';
  const disabled = disabledOpt === 'some' ? false : !!disabledOpt;
  const options = disabledOpt === 'some' ? partialNames : names;

  return {
    invalid: args.invalid,
    errorMessage,
    options,
    required: args.required,
    disabled,
    stacked: args.stacked,
  };
};

// ==================== Checkbox Buttons Group =======================================

const disabledOptions = ['none', 'some', 'all'] as const;

type ControlPropsCheckboxAndRadioButtonsGroup = ControlProps & {
  stacked: boolean;
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
    stacked: { name: 'Stacked (1 col)' },
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
    ...baseCtrl.argTypes,
  },
  args: {
    stacked: false,
    disabled: 'none',
    ...baseCtrl.args,
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
