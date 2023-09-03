import React from 'react';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'ButtonBack',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _ButtonBack: StoryComponent = () => (
  <>
    <p>
      <ButtonBack>Button Back</ButtonBack> <ButtonBack disabled>Disabled</ButtonBack>
    </p>
    <br />
    <p>
      <ButtonBack href="">Link Back</ButtonBack>{' '}
    </p>
  </>
);
