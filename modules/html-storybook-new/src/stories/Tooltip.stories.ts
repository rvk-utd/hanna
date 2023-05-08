import Tooltip from '@reykjavik/hanna-react/Tooltip';
import type { Meta, StoryObj } from '@storybook/react';
// import Tooltip from '../../../hanna-react/src/Tooltip.js';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'huga buga',
    text: 'suga',
  },
};
