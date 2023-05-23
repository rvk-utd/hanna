import React from 'react';
import { ArticleCards } from '@reykjavik/hanna-react/ArticleCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

// import { imageCards } from '../utils/_dummyData.js';

const meta: Meta<typeof ArticleCards> = {
  title: 'ArticleCards',
  component: ArticleCards,
};
export default meta;

type Story = StoryObj<typeof ArticleCards>;

const Component = () => {
  const imgPlaceholder = boolean('Custom fallback image', false)
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;

  // return <ArticleCards cards={imageCards} imgPlaceholder={imgPlaceholder} />
  return <p>Huga buga</p>;
};

export const _ArticleCards: Story = {
  render: () => <Component />,
};
