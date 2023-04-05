import React from 'react';
import Pagination from '@reykjavik/hanna-react/Pagination';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Pagination',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Pagination: StoryComponent = () => {
  return <Pagination currentItem={1} itemsLength={25} />;
};
