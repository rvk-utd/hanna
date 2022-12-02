import React from 'react';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'text/Heading',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Heading: StoryComponent = () => {
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
  const size =
    optionsKnob(
      'Size variant',
      {
        'Normal (medium)': '',
        Small: 'small',
        Large: 'large',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;
  const htmlTag =
    optionsKnob('Heading level', { 'H2 (default)': '', H3: 'h3' }, '', {
      display: 'inline-radio',
    }) || undefined;

  const layoutProps = layout === 'wide' ? { wide: true } : { align: layout };

  return (
    <Heading {...layoutProps} size={size} Tag={htmlTag}>
      Heading title
    </Heading>
  );
};
