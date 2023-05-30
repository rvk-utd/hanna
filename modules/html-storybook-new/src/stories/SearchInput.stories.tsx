import React, { ChangeEvent, useState } from 'react';
import { SearchInput } from '@reykjavik/hanna-react/SearchInput';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  component: SearchInput,
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

const SearchInputStory = () => {
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

export const _SearchInput: Story = {
  render: () => <SearchInputStory />,
};