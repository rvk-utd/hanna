import React from 'react';
import { TextButton } from '@reykjavik/hanna-react/TextButton';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta<typeof TextButton> = {
  title: 'buttons/TextButtons',
  component: TextButton,
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    css: { tokens: 'TextButton' },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<typeof TextButton>;

const TextButtonsComponent = () => {
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
  render: () => <TextButtonsComponent />,
};
