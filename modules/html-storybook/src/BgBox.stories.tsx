import React from 'react';
import { BgBox } from '@reykjavik/hanna-react/BgBox';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'BgBox',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _BgBox: StoryComponent = () => (
  <BgBox>
    <p>Some content that needs a "background box".</p>
  </BgBox>
);
