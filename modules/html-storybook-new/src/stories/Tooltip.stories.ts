import Tooltip from '@reykjavik/hanna-react/Tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import { loremRT } from '../../../visual-tests/src/test-helpers/dummyData.js';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  // decorators: [withCSS('https://styles.reykjavik.is/css/v0.8/Tooltip.css')],
  args: {
    label: 'Hover me',
    text: loremRT.short(true),
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const _Tooltip: Story = {
  args: {
    iconOnly: false,
  },
};
