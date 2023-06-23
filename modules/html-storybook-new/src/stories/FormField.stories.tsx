import React, { Fragment } from 'react';
import { FormField } from '@reykjavik/hanna-react/FormField';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { getFormFieldKnobs } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

const groupLabelTagOptions = ['h3', 'h4', 'h5'] as const;
type GroupLabelTag = (typeof groupLabelTagOptions)[number];

type ControlProps = {
  hideLabel: boolean;
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  isAFieldGroup: boolean;
  GroupLabelTag: GroupLabelTag;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/FormField',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const FormFieldStory: React.FC<ControlProps> = ({
  hideLabel,
  small,
  disabled,
  readOnly,
  required,
  invalid,
  errorMessage,
  helpText,
  isAFieldGroup,
  GroupLabelTag,
}) => {
  const ffProps = getFormFieldKnobs({
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
    hideLabel,
  });

  const group = isAFieldGroup;
  const LabelTag = group ? GroupLabelTag : undefined;
  return (
    <Fragment key={JSON.stringify(ffProps) + group + LabelTag}>
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

export const _FormField: Story = {
  render: (args: ControlProps) => <FormFieldStory {...args} />,
  argTypes: {
    hideLabel: {
      control: 'boolean',
      name: 'Hide <label/>',
    },
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
      name: 'Read only',
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
    isAFieldGroup: {
      control: 'boolean',
      name: 'Is a field-group',
    },
    GroupLabelTag: {
      if: { arg: 'isAFieldGroup', eq: true },
      control: 'select',
      options: groupLabelTagOptions,
    },
  },
  args: {
    hideLabel: false,
    small: false,
    disabled: false,
    readOnly: false,
    required: 'no',
    invalid: false,
    errorMessage: false,
    helpText: false,
    isAFieldGroup: false,
    GroupLabelTag: 'h4',
  },
};
