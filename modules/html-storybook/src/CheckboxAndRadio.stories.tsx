import React, { FC } from 'react';
import Checkbox from '@reykjavik/hanna-react/Checkbox';
import CheckboxGroup, {
  CheckboxGroupOptions,
  CheckboxGroupProps,
} from '@reykjavik/hanna-react/CheckboxGroup';
import RadioGroup, { RadioGroupProps } from '@reykjavik/hanna-react/RadioGroup';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Forms/Checkbox & Radio',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Checkbox: StoryComponent = () => {
  const required = boolean('Required', false);
  const invalid = boolean('Invalid', false);
  const errorMessage = boolean('Error message', false)
    ? 'You must accept this nice offer.'
    : undefined;
  const disabled = boolean('Disabled', false);

  return (
    <Checkbox
      label="Add me to your professional network on LinkedIn"
      required={required}
      invalid={invalid}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
};
_Checkbox.story = {
  parameters: {
    css: { tokens: Checkbox.name },
  },
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
): StoryComponent => {
  const Story: StoryComponent = () => {
    const layout =
      optionsKnob('Layout', { Normal: '', Inline: 'inline' }, '', {
        display: 'inline-radio',
      }) || undefined;
    const required = boolean('Required', false);
    const invalid = boolean('Invalid', false);
    const errorMessage = boolean('Error message', false)
      ? 'You must accept this nice offer.'
      : undefined;
    const disabledOpt = optionsKnob(
      'Disabled',
      { None: '', All: 'all', Some: 'some' },
      '',
      {
        display: 'inline-radio',
      }
    );

    const disabled = disabledOpt === 'some' ? false : !!disabledOpt;
    const options = disabledOpt === 'some' ? partialFruits : fruits;

    return (
      <Component
        label="Pick your fruits"
        invalid={invalid}
        errorMessage={errorMessage}
        name="fruits"
        options={options}
        required={required}
        disabled={disabled}
        layout={layout}
      />
    );
  };
  Story.story = {
    parameters: {
      css: { tokens: Component.name },
    },
  };
  return Story;
};

export const _CheckboxGroup = makeTogglerGroupStory(CheckboxGroup);
export const _RadioGroup = makeTogglerGroupStory(RadioGroup);

export const StylingTests: StoryComponent = () => (
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
StylingTests.story = {
  parameters: {
    css: { tokens: 'Checkbox,RadioGroup,RowBlock,RowBlockColumn' },
  },
};
