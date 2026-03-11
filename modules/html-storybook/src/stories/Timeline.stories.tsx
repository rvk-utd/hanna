import React from 'react';
import { Timeline, TimeLineItem } from '@reykjavik/hanna-react/Timeline.js';
import { Meta, StoryObj } from '@storybook/react';

import { lorem } from '../utils/_dummyData.js';

const timelineItems: Array<TimeLineItem> = [
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Þarf að sanna sér deili',
    date: new Date(2025, 0, 10),
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
    date: new Date(2025, 0, 8),
  },
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Vantar sakavottorð',
    date: new Date(2025, 0, 6),
  },
  {
    title: 'Athugasemd',
    category: 'Nafn starfsmanns',
    description: lorem.medium,
    date: new Date(2025, 0, 4),
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
    date: new Date(2025, 0, 2),
  },
  {
    title: 'Póstur sendur',
    category: 'Nafn starfsmanns',
    description: 'Áminning um að sinna einstaklingsáætlun',
    date: new Date(2024, 11, 31),
  },
];

type ControlProps = {
  nrOfItems: number;
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
  const { nrOfItems, oldestFirst, loadingMore } = props;

  const result = timelineItems.slice(0, nrOfItems);
  if (loadingMore) {
    result[result.length - 1] = 'loading';
  }

  return <Timeline items={result} oldestFirst={oldestFirst} />;
};

export const _Timeline: StoryObj<ControlProps> = {
  render: (args) => <TimelineStory {...args} />,
  argTypes: {
    nrOfItems: {
      name: 'Nr. of items',
      options: [1, 2, 3, 4, 5, 6],
      control: 'select',
    },
    loadingMore: { name: 'Is loading' },
    oldestFirst: { name: 'Oldest item first' },
  },
  args: {
    nrOfItems: 4,
    loadingMore: false,
    oldestFirst: false,
  },
};
