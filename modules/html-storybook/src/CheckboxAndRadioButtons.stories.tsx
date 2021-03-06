import React from 'react';
import CheckboxButtonsGroup from '@reykjavik/hanna-react/CheckboxButtonsGroup';
import RadioButtonsGroup from '@reykjavik/hanna-react/RadioButtonsGroup';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { StoryParameters } from './storytypes';

export default {
  title: 'Forms/Checkbox & Radio Buttons',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

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

const getProps = () => {
  const required = boolean('Required', false);
  const invalid = boolean('Invalid', false);
  const errorMessage = boolean('Error message', false)
    ? 'You must accept this nice offer.'
    : undefined;
  const disabledOpt = optionsKnob(
    'Disabled',
    {
      None: '',
      Some: 'some',
      All: 'all',
    },
    '',
    {
      display: 'inline-radio',
    }
  );

  const disabled = disabledOpt === 'some' ? false : !!disabledOpt;

  const options = disabledOpt === 'some' ? partialNames : names;

  return {
    invalid,
    errorMessage,
    options,
    required,
    disabled,
  };
};

export const _CheckboxButtonsGroup = () => (
  <CheckboxButtonsGroup
    label="Pick your fruits"
    name="fruits"
    value={['Anna', 'Guðrún']}
    {...getProps()}
  />
);
_CheckboxButtonsGroup.story = {
  parameters: {
    css: { tokens: 'CheckboxButtonsGroup' },
  },
};

export const _RadioButtonsGroup = () => (
  <RadioButtonsGroup label="Pick your fruit" name="fruit" value="Anna" {...getProps()} />
);

_RadioButtonsGroup.story = {
  parameters: {
    css: { tokens: 'RadioButtonsGroup' },
  },
};
