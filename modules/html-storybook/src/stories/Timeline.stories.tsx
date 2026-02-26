import React from 'react';
import { Timeline } from '@reykjavik/hanna-react/Timeline.js';
import { Meta, StoryObj } from '@storybook/react';

const typeOptions = ['link', 'button', 'submit'] as const;
const stateOptions = ['1_25', '9_25', '25_25', '1_5'] as const;

type ControlProps = {
  type: (typeof typeOptions)[number];
  state: (typeof stateOptions)[number];
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
  const { type, state } = props;

  return (
    <Timeline
      key="hugahuga"
      items={[
        {
          title: 'Vantar upplýsingar',
          date: new Date(2025, 1, 12),
          category: 'Starfsmaður Erlingsson',
          curent: true,
          description: 'Þarf vantar *gerð skjals*',
        },
        {
          title: 'Í vinnslu',
          date: new Date(2025, 1, 10),
          category: 'Starfsmaður Erlingsson',
          curent: false,
        },
        'skeleton',
        {
          title: 'Ný umsókn',
          date: new Date(2025, 0, 10),
          category: 'Umsækjandi Umsækjandason',
          curent: false,
        },
        'skeleton',
      ]}
    />
  );
};

export const _Timeline: StoryObj<ControlProps> = {
  render: (args) => <TimelineStory {...args} />,
};
