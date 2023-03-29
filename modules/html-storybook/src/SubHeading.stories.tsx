import React from 'react';
import { SubHeading } from '@reykjavik/hanna-react/SubHeading';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes.js';

// ===========================================================================

export default {
  title: 'text/SubHeading',
  component: SubHeading,
  parameters: { knobs: { disabled: false } } as StoryParameters,
};

export const _SubHeading: StoryComponent = () => {
  const layout =
    optionsKnob(
      'Layout',
      {
        Left: '',
        'Right aligned': 'right',
        Wide: 'wide',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const layoutProps = layout === 'wide' ? { wide: true } : { align: layout };

  const small = boolean('Small', false) || undefined;

  const htmlTag =
    optionsKnob('Heading level', { 'H2 (default)': '', H3: 'h3' }, '', {
      display: 'inline-radio',
    }) || undefined;

  return (
    <SubHeading {...layoutProps} small={small} Tag={htmlTag} startSeen>
      Subheading title
    </SubHeading>
  );
};
