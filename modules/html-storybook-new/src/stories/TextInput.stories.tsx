import React, { ChangeEvent, Fragment, useState } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import TextInput from '@reykjavik/hanna-react/TextInput';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

const makeStory = (ssr: boolean) => {
  const StoryComponent = () => {
    const domid = useDomid();
    const type = boolean('Multi-line', false) ? 'textarea' : 'text';
    const ffProps = getFormFieldKnobs();
    const placeholder = boolean('Placeholder text', false)
      ? 'Apple, Orange, etc.'
      : undefined;

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
  const envName = ssr ? 'Server' : 'Client';
  StoryComponent.story = { name: 'TextInput (' + envName + ')' };
  return StoryComponent;
};

export const ServerTextInput: Story = {
  render: makeStory(true),
};

export const ClientTextInput: Story = {
  render: makeStory(false),
};
