import React, { ChangeEvent, useState } from 'react';
import SearchInput from '@reykjavik/hanna-react/SearchInput';
import { boolean } from '@storybook/addon-knobs';

import { getFormFieldKnobs } from './utils/knobs';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Forms/SearchInput',
  component: 'SearchInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _SearchInput: StoryComponent = () => {
  const button = boolean('Physical search <button/>', false) || undefined;
  const ffProps = getFormFieldKnobs();

  const [value, setValue] = useState('');

  return (
    <SearchInput
      {...ffProps}
      label="Search for things"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
      }}
      onButtonClick={button && (() => alert('Perform Search!'))}
    />
  );
};
