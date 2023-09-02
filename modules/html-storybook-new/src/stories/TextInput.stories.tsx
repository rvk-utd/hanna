import React, { ChangeEvent, Fragment, useState } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import TextInput from '@reykjavik/hanna-react/TextInput';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { getFormFieldKnobs } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type ControlProps = {
  multiLine: boolean;
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  placeHolderText: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/TextInput',
  parameters: {
    css: { tokens: 'TextInput' },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const makeStory = (ssr: boolean, args: ControlProps) => {
  const StoryComponent = (args: ControlProps) => {
    const {
      multiLine,
      small,
      disabled,
      readOnly,
      required,
      invalid,
      errorMessage,
      helpText,
      placeHolderText,
    } = args;
    const domid = useDomid();
    const type = multiLine ? 'textarea' : 'text';
    const ffProps = getFormFieldKnobs({
      small,
      disabled,
      readOnly,
      required,
      invalid,
      errorMessage,
      helpText,
    });
    const placeholder = placeHolderText ? 'Apple, Orange, etc.' : undefined;

    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState<string>('');

    return (
      <Fragment key={type + placeholder + JSON.stringify(ffProps)}>
        <TextInput
          {...ffProps}
          type={type}
          ssr={ssr && 'ssr-only'}
          label="Pick your fruits"
          placeholder={placeholder}
          value={value}
          id={domid}
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue(e.currentTarget.value)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <HiddenTiger key={value + focused} style={{ maxWidth: 'var(--grid-8)' }}>
          <br />
          <br />
          <p>
            <strong>NOTE:</strong> The scripting-effects of the component toggle{' '}
            <code>FromField--empty</code>, <code>FromField--filled</code> and{' '}
            <code>FromField--focused</code> class--names on the outermost wrapper to
            reflect the inputs status.
          </p>
          <br />
          <p>
            <strong>NOTE:</strong> When a component has a "placeholder" text, it can be{' '}
            <strong>neither</strong> <code>--empty</code> (no visible value/placeholder){' '}
            <strong>nor</strong> <code>--filled</code> (has actual input/value) at the
            same time.
          </p>
        </HiddenTiger>
      </Fragment>
    );
  };
  return StoryComponent(args);
};

const argTypes = {
  multiLine: {
    control: 'boolean',
    name: 'Multi-line',
  },
  small: {
    control: 'boolean',
    name: 'Multi-line',
  },
  disabled: {
    control: 'boolean',
    name: 'Disabled',
  },
  required: {
    control: {
      type: 'inline-radio',
      labels: {
        no: 'No',
        yes: 'Yes',
        subtle: 'Yes but subtle',
      } satisfies Record<Required, string>,
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
  placeHolderText: {
    control: 'boolean',
    name: 'Placeholder text',
  },
};

const args: ControlProps = {
  multiLine: false,
  small: false,
  disabled: false,
  readOnly: false,
  required: 'no',
  invalid: false,
  errorMessage: false,
  helpText: false,
  placeHolderText: false,
};

export const ServerTextInput: Story = {
  render: (args: ControlProps) => makeStory(true, args),
  argTypes: argTypes,
  args: args,
};

export const ClientTextInput: Story = {
  render: (args: ControlProps) => makeStory(false, args),
  argTypes: argTypes,
  args: args,
};
