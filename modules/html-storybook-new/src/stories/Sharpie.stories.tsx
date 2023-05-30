import React from 'react';
import { Sharpie } from '@reykjavik/hanna-react/Sharpie';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Sharpie',
};
export default meta;

type Story = StoryObj;

const SharpieStory = () => {
  return (
    <p>
      {' '}
      All I want for Christmas is{' '}
      <Sharpie tag="strong" color="green">
        something green
      </Sharpie>{' '}
      and <Sharpie color="red">something red</Sharpie>.
    </p>
  );
};

export const _Sharpie: Story = {
  render: () => <SharpieStory />,
};
