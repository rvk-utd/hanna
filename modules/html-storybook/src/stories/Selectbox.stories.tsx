import React, { Fragment, useState } from 'react';
import { Selectbox, SelectboxOptionList } from '@reykjavik/hanna-react/Selectbox';
import { useDomid } from '@reykjavik/hanna-react/utils';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';
import { FFControlProps, formFieldControls } from '../utils/knobs.js';

type ControlProps = FFControlProps;

const ffCtrls = formFieldControls();

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/Selectbox',
  parameters: {
    css: { tokens: 'Selectbox' },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const makeStory = (ssr: boolean): StoryObj<ControlProps> => {
  const StoryComponent = (props: ControlProps) => {
    const ffProps = ffCtrls.getProps(props);

    const domid = useDomid();
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
        />

        <HiddenTiger>
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
    name: `Selectbox (${envName})`,
    render: (args) => <StoryComponent {...args} />,
    argTypes: {
      ...ffCtrls.argTypes,
    },
    args: {
      ...ffCtrls.args,
    },
  };
};

export const _SelectboxServer = makeStory(true);
export const _SelectboxClient = makeStory(false);
