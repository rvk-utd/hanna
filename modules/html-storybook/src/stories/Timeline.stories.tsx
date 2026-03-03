import React from 'react';
import { Timeline } from '@reykjavik/hanna-react/Timeline.js';
import { Meta, StoryObj } from '@storybook/react';

const typeOptions = ['link', 'button', 'submit'] as const;
const stateOptions = ['1_25', '9_25', '25_25', '1_5'] as const;

type ControlProps = {
  type: (typeof typeOptions)[number];
  state: (typeof stateOptions)[number];
};

type TimelineItem = {
  title: string;
  category: string;
  description?: string;
};

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
    description:
      'Umsækjandi þarf að koma með skilríki þegar hann mætir. Þetta er nauðsynlegt til að staðfesta auðkenni hans. Vinsamlegast tryggið að skilríkin séu gild.',
  },
];

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Timeline',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const TimelineStory = (props: ControlProps) => {
  const { type, state } = props;

  const nrOfItems = 6;
  // Generate dynamic timeline items
  const items = Array.from({ length: nrOfItems }, (_, i) => {
    const timelineItem = timelineItems[i];
    return {
      title: timelineItem?.title,
      date: new Date(2025, 0, 10 - i * 2),
      category: timelineItem?.category,
      curent: i === 0,
      description: timelineItem?.description,
    };
  });

  return <Timeline key="hugahuga" items={items} />;
};

export const _Timeline: StoryObj<ControlProps> = {
  render: (args) => <TimelineStory {...args} />,
};
