import React from 'react';
import MultiSelectDownshift from '@reykjavik/hanna-react/MultiSelectDownShift';
import MultiSelectReactSelect from '@reykjavik/hanna-react/MultiSelectReactSelect';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Multiselect: StoryComponent = () => {
  return (
    <>
      <MultiSelectReactSelect /> <MultiSelectDownshift />
    </>
  );
};
