import React, { Fragment, useState } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import { Selectbox, SelectboxOptionList } from '@reykjavik/hanna-react/Selectbox';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta = {
  title: 'Forms/Selectbox',
};
export default meta;

type Story = StoryObj;

const MakeStory = (ssr: boolean) => {
  const domid = useDomid();

  const ffProps = getFormFieldKnobs();

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

export const _SelectboxServer: Story = {
  render: () => MakeStory(true),
  name: 'Selectbox (Server)',
};

export const _SelectboxClient: Story = {
  render: () => MakeStory(false),
  name: 'Selectbox (Client)',
};
