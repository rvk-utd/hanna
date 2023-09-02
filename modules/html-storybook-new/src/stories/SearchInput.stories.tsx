import React, { ChangeEvent, useState } from 'react';
import { SearchInput } from '@reykjavik/hanna-react/SearchInput';
import { Meta, StoryObj } from '@storybook/react';

import { FFControlProps, formFieldControls } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = FFControlProps & {
  physicalSearchButton: boolean;
};

const ffCtrls = formFieldControls();

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/SearchInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};
export default meta;

const SearchInputStory = (props: ControlProps) => {
  const button = props.physicalSearchButton || undefined;
  const ffProps = ffCtrls.getProps(props);

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

export const _SearchInput: StoryObj<ControlProps> = {
  render: (args) => <SearchInputStory {...args} />,
  argTypes: {
    physicalSearchButton: { name: 'Physical search <button/>' },
    ...ffCtrls.argTypes,
  },
  args: {
    physicalSearchButton: false,
    ...ffCtrls.args,
  },
};
