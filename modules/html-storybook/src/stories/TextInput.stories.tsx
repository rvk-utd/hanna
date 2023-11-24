import React, { ChangeEvent, Fragment, useState } from 'react';
import TextInput from '@reykjavik/hanna-react/TextInput';
import { useDomid } from '@reykjavik/hanna-react/utils';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';
import { FFControlProps, formFieldControls } from '../utils/knobs.js';

type ControlProps = FFControlProps & {
  multiLine: boolean;
  placeHolderText: boolean;
};

const ffCtrls = formFieldControls();

const meta: Meta<ControlProps> = {
  title: 'Forms/TextInput',
  parameters: {
    css: { tokens: 'TextInput' },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const makeStory = (ssr: boolean): StoryObj<ControlProps> => {
  const StoryComponent = (props: ControlProps) => {
    const type = props.multiLine ? 'textarea' : 'text';
    const placeholder = props.placeHolderText ? 'Apple, Orange, etc.' : undefined;
    const ffProps = ffCtrls.getProps(props);

    const domid = useDomid();
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

        <HiddenTiger key={value + focused}>
          <div style={{ maxWidth: 'var(--grid-8)' }}>
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
          </div>
        </HiddenTiger>
      </Fragment>
    );
  };

  const envName = ssr ? 'Server' : 'Client';

  return {
    name: `TextInput (${envName})`,
    render: (args) => <StoryComponent {...args} />,
    argTypes: {
      multiLine: { name: 'Multi-line' },
      ...ffCtrls.argTypes,
      placeHolderText: { name: 'Placeholder text' },
    },
    args: {
      multiLine: false,
      ...ffCtrls.args,
      placeHolderText: false,
    },
  };
};

export const ServerTextInput = makeStory(true);
export const ClientTextInput = makeStory(false);
