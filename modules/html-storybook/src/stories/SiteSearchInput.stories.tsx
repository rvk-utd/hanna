import React from 'react';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  button: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Forms/SiteSearchInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const SiteSearchInputStory = (args: ControlProps) => {
  return (
    <>
      <SiteSearchInput
        {...args}
        label="Sláðu inn leitarorð"
        onButtonClick={() => alert('Perform Search!')}
        buttonText="Leita"
      />
      ...
    </>
  );
};

export const _SiteSearchInput: StoryObj<ControlProps> = {
  render: SiteSearchInputStory,
  argTypes: {
    button: { name: 'Submit button' },
  },
  args: {
    button: true,
  },
};
