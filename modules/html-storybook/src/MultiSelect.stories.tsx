import React from 'react';
import MultiSelect from '@reykjavik/hanna-react/MultiSelect';
import MultiSelectDownshift from '@reykjavik/hanna-react/MultiSelectDownShift';

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
      <MultiSelect /> <MultiSelectDownshift />
    </>
  );
};
