import React, { ChangeEvent, useState } from 'react';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta = {
  title: 'Forms/SiteSearchInput',
};
export default meta;

type Story = StoryObj;

const Component = () => {
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

export const _SiteSearchInput: Story = {
  render: () => <Component />,
};
