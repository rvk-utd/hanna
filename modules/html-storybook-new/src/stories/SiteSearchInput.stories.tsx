import React from 'react';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { Meta, StoryObj } from '@storybook/react';

import { FFControlProps } from '../utils/knobs.js';

type ControlProps = FFControlProps;

const meta: Meta<ControlProps> = {
  title: 'Forms/SiteSearchInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const SiteSearchInputStory = (props: ControlProps) => {
  return (
    <>
      <SiteSearchInput
        {...props}
        label="Sláðu inn leitarorð"
        onButtonClick={() => alert('Perform Search!')}
        buttonText="Leita"
      />
      ...
    </>
  );
};

export const _SiteSearchInput: StoryObj<ControlProps> = {
  render: (args) => <SiteSearchInputStory {...args} />,
  argTypes: {},
  args: {},
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
