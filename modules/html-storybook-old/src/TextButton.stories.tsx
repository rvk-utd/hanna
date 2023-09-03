import React from 'react';
import { TextButton } from '@reykjavik/hanna-react/TextButton';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'Buttons',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

// ===========================================================================

export const TextButtons: StoryComponent = () => {
  return (
    <>
      <p>
        Some <TextButton href="">text Link</TextButton> in text.
      </p>
      <p>
        Also available: <TextButton>text Button</TextButton>.
      </p>
    </>
  );
};
TextButtons.story = {
  parameters: {
    css: { tokens: 'TextButton' },
  },
};
