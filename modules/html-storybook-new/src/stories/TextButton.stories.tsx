import React from 'react';
import { TextButton } from '@reykjavik/hanna-react/TextButton';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'buttons/TextButtons',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
    css: { tokens: 'TextButton' },
  } as StoryParameters,
};
export default meta;

const TextButtonsStory = () => {
  return (
    <>
      <p>
        Some <TextButton href="">text Link</TextButton> in text.
      </p>
      <p>
        Also available: <TextButton>text Button</TextButton>.
      </p>
    </>
  );
};

export const _TextButtons: Story = {
  render: () => <TextButtonsStory />,
};
