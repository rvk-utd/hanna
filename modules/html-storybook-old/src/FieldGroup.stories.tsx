import React from 'react';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'Forms/FieldGroup',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _FieldGroup: StoryComponent = () => {
  const small = boolean('Small Legend', false);
  const disabled = boolean('Disabled', false);

  return (
    <FieldGroup legend="Group headline" small={small} disabled={disabled}>
      <p>...FormFields and other content goes here...</p>
    </FieldGroup>
  );
};
