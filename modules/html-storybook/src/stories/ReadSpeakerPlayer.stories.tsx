import React, { Fragment } from 'react';
import { ReadSpeakerPlayer } from '@reykjavik/hanna-react/ReadSpeakerPlayer';
import { Meta, StoryObj } from '@storybook/react';

import { lorem } from '../utils/_dummyData.js';

type ControlProps = {
  align: 'right' | '';
  float: boolean;
};

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'ReadSpeakerPlayer',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const ReadSpeakerPlayerStory = (props: ControlProps) => {
  const { align, float } = props;
  return (
    <Fragment key={[align, float].join(',')}>
      <ReadSpeakerPlayer align={align || undefined} float={float} />
      <p>{lorem.medium}</p>
    </Fragment>
  );
};

export const _ReadSpeakerPlayer: StoryObj<ControlProps> = {
  render: (args) => <ReadSpeakerPlayerStory {...args} />,
  argTypes: {
    align: {
      name: 'Layout',
      control: {
        type: 'inline-radio',
        labels: {
          '': 'Left (default)',
          right: 'Right aligned',
        },
      },
      options: ['', 'right'],
    },
    float: {
      name: 'CSS Float',
    },
  },
  args: {
    align: '',
    float: false,
  },
};
