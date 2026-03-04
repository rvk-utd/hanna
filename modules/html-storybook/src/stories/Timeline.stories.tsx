import React from 'react';
import { Timeline } from '@reykjavik/hanna-react/Timeline.js';
import { Meta, StoryObj } from '@storybook/react';

const timelineItems: Array<TimelineItem> = [
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Þarf að sanna sér deili',
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
  },
  {
    title: 'Vantar upplýsingar',
    category: 'Nafn starfsmanns',
    description: 'Vantar sakavottorð',
  },
  {
    title: 'Í vinnslu',
    category: 'Nafn starfsmanns',
  },
  {
    title: 'Póstur sendur',
    category: 'Nafn starfsmanns',
    description: 'Áminning um að sinna einstaklingsáætlun',
  },
  {
    title: 'Athugasemd',
    category: 'Nafn starfsmanns',
    description: `Umsækjandi þarf að koma með skilríki þegar hann mætir.
    Þetta er nauðsynlegt til að staðfesta auðkenni hans.
    Vinsamlegast tryggið að skilríkin séu gild.`,
  },
];

type ControlProps = {
  nrOfItems: number;
  isLoading: boolean;
  oldestFirst: boolean;
};

type TimelineItem = {
  title: string;
  category: string;
  description?: string;
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

  const items = Array.from({ length: nrOfItems }, (_, i) => {
    const timelineItem = timelineItems[i];
    if (isLoading || !timelineItem) {
      return 'skeleton';
    }
    return {
      title: timelineItem.title,
      date: new Date(2025, 0, 10 - i * 2),
      category: timelineItem.category,
      curent: i === 0,
      description: timelineItem.description,
    };
  });

  return <Timeline items={items} oldestFirst={oldestFirst} />;
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
