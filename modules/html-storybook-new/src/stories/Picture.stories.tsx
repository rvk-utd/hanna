import React from 'react';
import { css } from '@reykjavik/hanna-css';
import { Picture } from '@reykjavik/hanna-react/Picture';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';

type ControlProps = {
  customImageFocalPoint: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Picture',
};
export default meta;

const PictureStory: React.FC<ControlProps> = ({ customImageFocalPoint }) => {
  const focalPoint = customImageFocalPoint ? '80% 80%' : undefined;
  return (
    <>
      <div className="demobox">
        <Picture src={landscapeImage} focalPoint={focalPoint} />
      </div>
      {'\n\n'}
      <div className="demobox">
        <Picture src={landscapeImage} focalPoint={focalPoint} contain />
      </div>
      {'\n\n'}
      <style>{css`
        .demobox {
          float: left;
          width: 320px;
          height: 320px;
          border: 1px solid red;
          margin-right: 2em;
          margin-bottom: 2em;
        }
      `}</style>
    </>
  );
};

export const _Picture: Story = {
  render: (args: ControlProps) => <PictureStory {...args} />,
  argTypes: {
    customImageFocalPoint: {
      control: 'boolean',
      name: 'Custom image focal point',
    },
  },
  args: {
    customImageFocalPoint: false,
  },
};
