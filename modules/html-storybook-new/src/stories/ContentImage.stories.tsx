import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { ContentImage, ContentImageProps } from '@reykjavik/hanna-react/ContentImage';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import dummyImage from '../example_assets/Gallery--landscape--large.jpg';
import { HiddenTiger } from '../utils/HiddenTrigger.js';

const meta: Meta<typeof ContentImage> = {
  title: 'components/ContentImage',
  component: ContentImage,
};
export default meta;

type Story = StoryObj<typeof ContentImage>;

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

const Component = () => {
  const caption = boolean('Caption text', true) ? CAPTION : undefined;
  const credit = boolean('Photo credit', true) ? CREDIT : undefined;

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
  render: () => <Component />,
};
