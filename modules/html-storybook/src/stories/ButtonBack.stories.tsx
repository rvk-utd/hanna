import React from 'react';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'buttons/ButtonBack',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

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

export const _ButtonBack: StoryObj = {
  name: 'ButtonBack',
  render: () => <ButtonBackStory />,
};
