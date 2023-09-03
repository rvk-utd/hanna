import React, { Fragment } from 'react';
import { FormField } from '@reykjavik/hanna-react/FormField';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { FFControlProps, formFieldControls } from '../utils/knobs.js';

const groupLabelTagOptions = ['h3', 'h4', 'h5'] as const;

type ControlProps = FFControlProps & {
  group: boolean;
  groupLabelTag: (typeof groupLabelTagOptions)[number];
};

const ffCtrls = formFieldControls({ hideLabel: false });

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/FormField',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const FormFieldStory = (props: ControlProps) => {
  const ffProps = ffCtrls.getProps(props);
  const group = props.group;
  const LabelTag = group ? props.groupLabelTag : undefined;

  const key = JSON.stringify(ffProps) + group + LabelTag;

  return (
    <Fragment key={key}>
      <FormField
        {...ffProps}
        className="EXAMPLE_INPUT"
        label="This is my label"
        group={group}
        LabelTag={LabelTag}
        // empty
        // focused
        renderInput={(cl, inputProps) => (
          <span className={cl.input} {...inputProps}>
            <i>This is my custom input/control</i>
          </span>
        )}
      />

      <HiddenTiger style={{ maxWidth: 'var(--grid-8)' }}>
        <br />
        <p>
          The <code>FormField</code> clomponent is really an absract markup pattern that
          is then used and extended by a variety of other components, including{' '}
          <code>TextInput</code>, <code>Selectbox</code>, <code>DatePicker</code>, etc.
        </p>
        <br />
        <p>
          <strong>NOTE:</strong> The scripting-effects of the component toggle{' '}
          <code>FromField--empty</code>, <code>FromField--filled</code> and{' '}
          <code>FromField--focused</code> class--names on the outermost wrapper to reflect
          the inputs status.
        </p>
        <br />
        <p>
          <strong>Note:</strong> When a component has a "placeholder" text, it can be{' '}
          <strong>neither</strong> <code>--empty</code> (no visible value/placeholder){' '}
          <strong>nor</strong> <code>--filled</code> (has actual input/value) at the same
          time.
        </p>
      </HiddenTiger>
    </Fragment>
  );
};

export const _FormField: StoryObj<ControlProps> = {
  render: (args) => <FormFieldStory {...args} />,
  argTypes: {
    ...ffCtrls.argTypes,
    group: { name: 'Is a field-group' },
    groupLabelTag: {
      name: 'Group Label Tag',
      options: groupLabelTagOptions,
      control: 'inline-radio',
      if: { arg: 'group', eq: true },
    },
  },
  args: {
    ...ffCtrls.args,
    group: false,
    groupLabelTag: 'h4',
  },
};
