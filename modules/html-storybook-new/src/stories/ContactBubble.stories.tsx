import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ContactBubbleStory } from '../Shared/ContactBubble.js';
import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = {
  ssr: boolean;
  alwaysShow: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'ContactBubble',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

export const _ContactBubble: Story = {
  render: (args: ControlProps) => <ContactBubbleStory {...args} />,
  argTypes: {
    ssr: {
      control: 'boolean',
      name: 'Show client-side markup',
    },
    alwaysShow: {
      control: 'boolean',
      name: 'Set optional "alwaysShow" data-attribute',
    },
  },
  args: {
    ssr: false,
    alwaysShow: true,
  },
};
