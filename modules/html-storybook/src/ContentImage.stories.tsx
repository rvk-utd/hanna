import React from 'react';
import CenterColumn from '@reykjavik/hanna-react/CenterColumn';
import ContentImage, { ContentImageProps } from '@reykjavik/hanna-react/ContentImage';
import { boolean } from '@storybook/addon-knobs';

import dummyImage from './example_assets/Gallery--landscape--large.jpg';
import { HiddenTiger } from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'ContentImage',
  component: ContentImage,
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

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

export const _ContentImage: StoryComponent = () => {
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

_ContentImage.story = {
  parameters: {
    css: { tokens: 'ContentImage,CenterColumn' },
  },
};
