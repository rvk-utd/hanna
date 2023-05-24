import React from 'react';
import { ContactBubble } from '@reykjavik/hanna-react/ContactBubble';
import { Meta, StoryObj } from '@storybook/react';

import { ContactBubbleComponent } from '../Shared/ContactBubble.js';

const meta: Meta<typeof ContactBubble> = {
  title: 'ContactBubble',
  component: ContactBubble,
};
export default meta;

type Story = StoryObj<typeof ContactBubble>;

export const _ContactBubble: Story = {
  render: () => <ContactBubbleComponent />,
};
