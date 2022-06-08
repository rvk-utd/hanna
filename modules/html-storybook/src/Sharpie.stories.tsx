import React from 'react';
import Sharpie from '@reykjavik/hanna-react/Sharpie';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Sharpie',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _Sharpie: StoryComponent = () => (
  <p>
    {' '}
    All I want for Christmas is{' '}
    <Sharpie tag="strong" color="green">
      something green
    </Sharpie>{' '}
    and <Sharpie color="red">something red</Sharpie>.
  </p>
);
