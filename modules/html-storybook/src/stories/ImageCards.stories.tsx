import React from 'react';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCards } from '@reykjavik/hanna-react/ImageCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { imageCards } from '../utils/_dummyData.js';

type ControlProps = {
  backgroundColor: boolean;
  customFallbackImage: boolean;
  title: boolean;
  summaryText: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ImageCards',
};
export default meta;

const ImageCardsStory: React.FC<ControlProps> = ({
  backgroundColor,
  customFallbackImage,
  title,
  summaryText,
}) => {
  const background = backgroundColor || undefined;
  const imgPlaceholder = customFallbackImage
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;
  const displayTitle = title || undefined;
  const summary = summaryText || undefined;
  return (
    <ImageCards
      title={displayTitle && 'Image Cards'}
      summaryElement={summary && <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>}
      background={background}
      cards={imageCards}
      imgPlaceholder={imgPlaceholder}
    />
  );
};

export const _ImageCards: StoryObj<ControlProps> = {
  render: (args) => <ImageCardsStory {...args} />,
  argTypes: {
    backgroundColor: { name: 'Background color' },
    customFallbackImage: { name: 'Custom fallback image' },
    title: { name: 'Title' },
    summaryText: { name: 'Summary text/More link' },
  },
  args: {
    backgroundColor: false,
    customFallbackImage: false,
    title: true,
    summaryText: false,
  },
};
