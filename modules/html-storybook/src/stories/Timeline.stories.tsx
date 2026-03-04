import React from 'react';
import { Timeline, TimeLineItem } from '@reykjavik/hanna-react/Timeline.js';
import { Meta, StoryObj } from '@storybook/react';

const timelineItems: Array<TimeLineItem> = [
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Þarf að sanna sér deili',
    date: new Date(2025, 0, 10),
    curent: true,
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
    date: new Date(2025, 0, 8),
    curent: false,
  },
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Vantar sakavottorð',
    date: new Date(2025, 0, 6),
    curent: false,
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
    date: new Date(2025, 0, 4),
    curent: false,
  },
  {
    title: 'Póstur sendur',
    category: 'Nafn starfsmanns',
    description: 'Áminning um að sinna einstaklingsáætlun',
    date: new Date(2025, 0, 2),
    curent: false,
  },
  {
    title: 'Athugasemd',
    category: 'Nafn starfsmanns',
    description: `Umsækjandi þarf að koma með skilríki þegar hann mætir.
    Þetta er nauðsynlegt til að staðfesta auðkenni hans.
    Vinsamlegast tryggið að skilríkin séu gild.`,
    date: new Date(2024, 11, 31),
    curent: false,
  },
];

type ControlProps = {
  nrOfItems: number;
  isLoading: boolean;
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
  const nrOfItems = props.nrOfItems;
  const isLoading = props.isLoading;
  const oldestFirst = props.oldestFirst;

  const result: Array<TimeLineItem | 'skeleton'> = isLoading
    ? new Array(nrOfItems).fill('skeleton')
    : timelineItems.slice(0, nrOfItems);

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
    isLoading: { name: 'Is loading' },
    oldestFirst: { name: 'Oldest item first' },
  },
  args: {
    nrOfItems: 4,
    isLoading: false,
    oldestFirst: false,
  },
};
