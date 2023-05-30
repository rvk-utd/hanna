import React from 'react';
import { BgBox } from '@reykjavik/hanna-react/BgBox';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BgBox> = {
  title: 'BgBox',
  component: BgBox,
};
export default meta;

type Story = StoryObj<typeof BgBox>;

const BgBoxStory = () => {
  return (
    <BgBox>
      <p>Some content that needs a "background box".</p>
    </BgBox>
  );
};

export const _BgBox: Story = {
  render: () => <BgBoxStory />,
};
