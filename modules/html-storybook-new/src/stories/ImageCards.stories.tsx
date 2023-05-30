import React from 'react';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCards } from '@reykjavik/hanna-react/ImageCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { imageCards } from '../utils/_dummyData.js';

const meta: Meta<typeof ImageCards> = {
  title: 'ImageCards',
  component: ImageCards,
};
export default meta;

type Story = StoryObj<typeof ImageCards>;

const ImageCardsStory = () => {
  const background = boolean('Background color', false) || undefined;
  const imgPlaceholder = boolean('Custom fallback image', false)
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;
  const title = boolean('Title', true) || undefined;
  const summary = boolean('Summary text/More link', false) || undefined;
  return (
    <ImageCards
      title={title && 'Image Cards'}
      summaryElement={summary && <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>}
      background={background}
      cards={imageCards}
      imgPlaceholder={imgPlaceholder}
      startSeen
    />
  );
};

export const _ImageCards: Story = {
  render: () => <ImageCardsStory />,
};
