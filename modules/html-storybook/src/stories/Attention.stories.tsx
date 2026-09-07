import React from 'react';
import { Attention } from '@reykjavik/hanna-react/Attention';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

type ControlProps = {
  small: boolean;
};

const meta: Meta = {
  title: 'Attention',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const AttentionStory = ({ small }: ControlProps) => {
  return (
    <>
      <HiddenTiger>
        <p>
          This Atomic component can be placed inside/alongside just about any type of text
          content.
        </p>
      </HiddenTiger>
      <Attention small={small}>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00
      </Attention>
    </>
  );
};

export const _Attention: StoryObj<ControlProps> = {
  render: (args) => <AttentionStory {...args} />,
  argTypes: {
    small: { name: 'Small' },
  },
  args: {
    small: false,
  },
};
