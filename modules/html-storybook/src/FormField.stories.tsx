import React, { Fragment } from 'react';
import FormField from '@reykjavik/hanna-react/FormField';
import { boolean, select } from '@storybook/addon-knobs';

import HiddenTiger from './utils/HiddenTiger';
import { getFormFieldKnobs } from './utils/knobs';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Forms/FormField',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _FormField: StoryComponent = () => {
  const ffProps = getFormFieldKnobs({ hideLabel: false });

  const group = boolean('Is a field-group', false);
  const LabelTag = group
    ? select('Group Label Tag', ['h3', 'h4', 'h5'], 'h4')
    : undefined;

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
