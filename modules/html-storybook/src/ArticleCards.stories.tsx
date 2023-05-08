import React from 'react';
import { ArticleCards } from '@reykjavik/hanna-react/ArticleCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';

import { imageCards } from './utils/_dummyData.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'ArticleCards',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _ArticleCards: StoryComponent = () => {
  const imgPlaceholder = boolean('Custom fallback image', false)
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;

  return <ArticleCards cards={imageCards} imgPlaceholder={imgPlaceholder} />;
};
