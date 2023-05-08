import React, { ChangeEvent, useState } from 'react';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';

import { getFormFieldKnobs } from './utils/knobs.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'Forms/SiteSearchInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _SiteSearchInput: StoryComponent = () => {
  const ffProps = getFormFieldKnobs({ small: false, readOnly: false });

  const [value, setValue] = useState('');

  return (
    <>
      <SiteSearchInput
        {...ffProps}
        label="Sláðu inn leitarorð"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
        }}
        onButtonClick={() => alert('Perform Search!')}
        buttonText="Leita"
      />
      ...
    </>
  );
};
