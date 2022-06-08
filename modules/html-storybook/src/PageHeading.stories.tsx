import React from 'react';
import PageHeading from '@reykjavik/hanna-react/PageHeading';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'text/PageHeading',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _PageHeading: StoryComponent = () => {
  const htmlTag =
    optionsKnob('Heading level', { 'H1 (default)': '', H2: 'h2' }, '', {
      display: 'inline-radio',
    }) || undefined;
  const align = boolean('Right-aligned', false) ? 'right' : undefined;
  const small = boolean('Small', false) || undefined;

  return (
    <PageHeading Tag={htmlTag} align={align} small={small} startSeen>
      Page Heading Title
    </PageHeading>
  );
};
