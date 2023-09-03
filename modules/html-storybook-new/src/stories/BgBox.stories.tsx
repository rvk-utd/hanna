import React from 'react';
import { BgBox } from '@reykjavik/hanna-react/BgBox';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'BgBox',
};
export default meta;

const BgBoxStory = () => {
  return (
    <BgBox>
      <p>Some content that needs a "background box".</p>
    </BgBox>
  );
};

export const _BgBox: StoryObj = {
  render: () => <BgBoxStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
