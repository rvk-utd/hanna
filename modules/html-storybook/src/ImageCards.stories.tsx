import React from 'react';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import ImageCards from '@reykjavik/hanna-react/ImageCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';

import { imageCards } from './utils/_dummyData';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'ImageCards',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _ImageCards: StoryComponent = () => {
  const background = boolean('Background color', false) || undefined;
  const imgPlaceholder = boolean('Custom fallback image', false)
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;
  const title = boolean('Title', true) || undefined;
  const summary = boolean('Summary text/More link', false) || undefined;

  return (
    <ImageCards
      title={title && 'Image Cards'}
      summaryElement={
        summary ? <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary> : undefined
      }
      background={background}
      cards={imageCards}
      imgPlaceholder={imgPlaceholder}
      startSeen
    />
  );
};
