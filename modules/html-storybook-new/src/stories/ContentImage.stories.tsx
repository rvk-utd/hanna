import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { ContentImage, ContentImageProps } from '@reykjavik/hanna-react/ContentImage';
import { Meta, StoryObj } from '@storybook/react';

import dummyImage from '../example_assets/Gallery--landscape--large.jpg';
import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { StoryParameters } from '../utils/storytypes.js';

type ContentImageControlsProps = {
  captionText: boolean;
  photoCredit: boolean;
};

type Story = StoryObj<ContentImageControlsProps>;

const meta: Meta<ContentImageControlsProps> = {
  title: 'ContentImage',
  // component: ContentImage,
  parameters: {
    knobs: { disabled: false },
    css: { tokens: 'ContentImage,CenterColumn' },
  } as StoryParameters,
};
export default meta;

const dummyImageProps: NonNullable<ContentImageProps['image']> = {
  src: dummyImage,
  altText: 'Elliðaárdalur alt text',
};
const CAPTION =
  // …
  // 'Caption text for the image';
  'Long caption here to test how this can line-break at different screen sizes' +
  'Long caption here to test how this can line-break at different screen sizes.';

const CREDIT = '©2017 Jónína Jóhannesdóttir og Páll Pétursson';

const ContentImageStory: React.FC<ContentImageControlsProps> = ({
  captionText,
  photoCredit,
}) => {
  const caption = captionText ? CAPTION : undefined;
  const credit = photoCredit ? CREDIT : undefined;

  const children = (
    <ContentImage image={dummyImageProps} caption={caption} credit={credit} />
  );

  return (
    <HiddenTiger
      serverSide={children}
      clientSide={<CenterColumn>{children}</CenterColumn>}
    />
  );
};

export const _ContentImage: Story = {
  render: (args: ContentImageControlsProps) => <ContentImageStory {...args} />,
  argTypes: {
    captionText: {
      control: 'boolean',
      name: 'Caption text',
    },
    photoCredit: {
      control: 'boolean',
      name: 'Photo credit text',
    },
  },
  args: {
    captionText: true,
    photoCredit: true,
  },
};
