import React from 'react';
import { ContactBubble, ContactBubbleProps } from '@reykjavik/hanna-react/ContactBubble';
import { Meta, StoryObj } from '@storybook/react';

import { ContactBubbleStory } from '../Shared/ContactBubble.js';
import { disableControlProps } from '../utils/disableControlTypes.js';

const meta: Meta<ContactBubbleProps> = {
  title: 'ContactBubble',
  component: ContactBubble,
};
export default meta;

type Story = StoryObj<ContactBubbleProps>;

export const _ContactBubble: Story = {
  render: (args: ContactBubbleProps) => <ContactBubbleStory {...args} />,
  argTypes: {
    ssr: {
      control: 'boolean',
      name: 'Show client-side markup',
    },
    alwaysShow: {
      control: 'boolean',
      name: 'Set optional "alwaysShow" data-attribute',
    },
    ...disableControlProps(['title', 'links', 'texts', 'lang', 'open', 'onToggle']),
  },
  args: {
    ssr: false,
    alwaysShow: true,
  },
};
