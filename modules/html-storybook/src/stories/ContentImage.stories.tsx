import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { ContentImage, ContentImageProps } from '@reykjavik/hanna-react/ContentImage';
import { Meta, StoryObj } from '@storybook/react';

import dummyImage from '../example_assets/Gallery--landscape--large.jpg';
import { HiddenTiger } from '../utils/HiddenTiger.js';

type ControlProps = {
  captionText: boolean;
  photoCredit: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ContentImage',
  parameters: {
    css: { tokens: 'ContentImage,CenterColumn' },
  },
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

const ContentImageStory: React.FC<ControlProps> = ({ captionText, photoCredit }) => {
  const caption = captionText ? CAPTION : undefined;
  const credit = photoCredit ? CREDIT : undefined;

  const children = (
    <ContentImage image={dummyImageProps} caption={caption} credit={credit} />
  );

  return (
    <HiddenTiger
      htmlDemo={children}
      visibleDemo={<CenterColumn>{children}</CenterColumn>}
    />
  );
};

export const _ContentImage: StoryObj<ControlProps> = {
  render: (args) => <ContentImageStory {...args} />,
  argTypes: {
    captionText: { name: 'Caption text' },
    photoCredit: { name: 'Photo credit text' },
  },
  args: {
    captionText: true,
    photoCredit: true,
  },
};
