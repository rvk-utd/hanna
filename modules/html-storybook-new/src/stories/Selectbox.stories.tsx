import React, { Fragment, useState } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import { Selectbox, SelectboxOptionList } from '@reykjavik/hanna-react/Selectbox';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { getFormFieldKnobsNew } from '../utils/knobs.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type ControlProps = {
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/Selectbox',
  parameters: {
    css: {
      tokens: 'Selectbox',
    },
  },
};
export default meta;

const MakeStory = (ssr: boolean, args: ControlProps) => {
  const { small, disabled, readOnly, required, invalid, errorMessage, helpText } = args;
  const domid = useDomid();

  const ffProps = getFormFieldKnobsNew({
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
  });

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState<string>('');

  const fruits: SelectboxOptionList<string> = [
    // { value: '', label: 'Empty (first)', disabled: true },
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
    { value: 'c', label: 'Orange' },
    { value: 'd', label: 'Tomato' },
    // { value: '', label: 'Empty' },
  ];

  return (
    <Fragment key={JSON.stringify(ffProps)}>
      <Selectbox
        {...ffProps}
        label="Pick your fruits"
        ssr={ssr && 'ssr-only'}
        options={fruits}
        value={value}
        // placeholder="" // empty
        // placeholderDisabled
        onSelected={setValue}
        id={domid}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <HiddenTiger key={'' + value + focused} style={{ maxWidth: 'var(--grid-8)' }}>
        <br />
        <br />
        <p>
          <strong>NOTE:</strong> The scripting-effects of the component toggle{' '}
          <code>FromField--empty</code>, <code>FromField--filled</code> and{' '}
          <code>FromField--focused</code> class--names on the outermost wrapper to reflect
          the inputs status.
        </p>
        <br />
        <p>
          <strong>NOTE:</strong> When a component has a "placeholder" text, it can be{' '}
          <strong>neither</strong> <code>--empty</code> (no visible value/placeholder){' '}
          <strong>nor</strong> <code>--filled</code> (has actual input/value) at the same
          time.
        </p>
      </HiddenTiger>
    </Fragment>
  );
};

const argTypes = {
  small: {
    control: 'boolean',
    name: 'Small',
  },
  disabled: {
    control: 'boolean',
    name: 'Disabled',
  },
  readOnly: {
    control: 'boolean',
    name: 'Read-only',
  },
  required: {
    control: {
      type: 'inline-radio',
      labels: {
        no: 'No',
        yes: 'Yes',
        subtle: 'Yes but subtle',
      },
    },
    options: requiredOptions,
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
  helpText: {
    control: 'boolean',
    name: 'Help text',
  },
};

const args: ControlProps = {
  small: false,
  disabled: false,
  readOnly: false,
  required: 'no',
  invalid: false,
  errorMessage: false,
  helpText: false,
};

export const _SelectboxServer: Story = {
  render: (args: ControlProps) => MakeStory(true, args),
  name: 'Selectbox (Server)',
  argTypes: {
    ...argTypes,
  },
  args: {
    ...args,
  },
};

export const _SelectboxClient: Story = {
  render: (args: ControlProps) => MakeStory(false, args),
  name: 'Selectbox (Client)',
  argTypes: {
    ...argTypes,
  },
  args: {
    ...args,
  },
};
