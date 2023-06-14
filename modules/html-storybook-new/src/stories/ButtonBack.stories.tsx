import React from 'react';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta = {
  title: 'buttons/ButtonBack',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj;

const ButtonBackStory = () => {
  return (
    <>
      <p>
        <ButtonBack>Button Back</ButtonBack>
        <ButtonBack disabled>Disabled</ButtonBack>
      </p>
      <br />
      <p>
        <ButtonBack href="">Link Back</ButtonBack>{' '}
      </p>
    </>
  );
};

export const _ButtonBack: Story = {
  render: () => <ButtonBackStory />,
  name: 'ButtonBack',
};
