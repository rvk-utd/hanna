import React from 'react';
import { Attention } from '@reykjavik/hanna-react/Attention';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Attention',
};
export default meta;

const AttentionStory = () => {
  return (
    <>
      <HiddenTiger>
        <p>
          This Atomic component can be placed inside/alongside just about any type of text
          content.
        </p>
      </HiddenTiger>
      <Attention>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00
      </Attention>
      {'\n\n'}
      <Attention small>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00
      </Attention>
    </>
  );
};

export const _Attention: Story = {
  render: () => <AttentionStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
