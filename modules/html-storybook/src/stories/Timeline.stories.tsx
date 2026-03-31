import React from 'react';
import { Timeline } from '@reykjavik/hanna-react/Timeline';
import { Meta, StoryObj } from '@storybook/react';

import { timelineItems } from '../utils/_dummyData.js';

type ControlProps = {
  loadingMore: boolean;
  oldestFirst: boolean;
};

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Timeline',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const TimelineStory = (props: ControlProps) => {
  const { oldestFirst, loadingMore } = props;

  const result = timelineItems.slice(0, 4);
  if (loadingMore) {
    result[result.length - 1] = 'loading';
  }

  return <Timeline items={result} oldestFirst={oldestFirst} />;
};

export const _Timeline: StoryObj<ControlProps> = {
  render: (args) => <TimelineStory {...args} />,
  argTypes: {
    loadingMore: { name: 'Is loading' },
    oldestFirst: { name: 'Oldest item first' },
  },
  args: {
    loadingMore: false,
    oldestFirst: false,
  },
};
