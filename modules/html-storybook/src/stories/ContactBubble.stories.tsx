import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ContactBubbleStory } from './Shared/ContactBubble.js';

type ControlProps = {
  ssr: boolean;
  alwaysShow: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ContactBubble',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    layout: { pos: 'footer' },
  },
};
export default meta;

export const _ContactBubble: StoryObj<ControlProps> = {
  render: (args) => <ContactBubbleStory {...args} />,
  argTypes: {
    ssr: { name: 'Show client-side markup' },
    alwaysShow: { name: 'Set optional "alwaysShow" data-attribute' },
  },
  args: {
    ssr: false,
    alwaysShow: true,
  },
};
