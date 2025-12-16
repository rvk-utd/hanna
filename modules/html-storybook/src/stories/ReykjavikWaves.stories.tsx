import React, { Fragment } from 'react';
import { ReykjavikWaves } from '@reykjavik/hanna-react/ReykjavikWaves';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

type ControlProps = {
  small: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ReykjavikWaves',
};
export default meta;

const ReykjavikWavesStory: React.FC<ControlProps> = ({ small }) => {
  return (
    <Fragment key={`${small}`}>
      <ReykjavikWaves small={small} />
      <HiddenTiger>
        <br />
        <br />
      </HiddenTiger>
      <ReykjavikWaves small={small} className="some-other-classname">
        Optional content
      </ReykjavikWaves>
    </Fragment>
  );
};

export const _ReykjavikWaves: StoryObj<ControlProps> = {
  render: (args) => <ReykjavikWavesStory {...args} />,
  argTypes: {
    small: { name: 'Small variant' },
  },
  args: {
    small: false,
  },
};
