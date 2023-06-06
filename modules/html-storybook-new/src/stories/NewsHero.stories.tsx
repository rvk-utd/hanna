import React, { useCallback } from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { NewsHero, NewsHeroProps } from '@reykjavik/hanna-react/NewsHero';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';
import portraitImage from '../example_assets/NewsHero__portrait.jpg';

type NewsHeroControlProps = {
  imageType: 'image' | 'no-image';
};

const meta: Meta<NewsHeroControlProps> = {
  title: 'NewsHero',
};
export default meta;

type Story = StoryObj<NewsHeroControlProps>;

const newsHeroProps = {
  title: 'Útivistarsvæðin í borginni iða af lífi',
  meta: '14. oktober',
  summary:
    'Reykvíkingar eru heppnir að geta valið milli margra spennandi útivistarsvæða þar sem er hægt að viðra sig og næra líkama og sál. Þessi svæði eru sérstaklega mikilvæg nú á tímum samkomu- banns og aflýstra viðburða. Náttúran er enn opin og á útivistar- svæðum er auðvelt að hlýða Víði og virða tveggja metra regluna en á sama tíma finna fyrir ákveðinni nálægð við annað fólk.',
};

const NewsHeroStory: React.FC<NewsHeroControlProps> = ({ imageType }) => {
  const isServerSide = useIsServerSide();

  const renderShareButtons = useCallback(
    () => <ShareButtons ssr={isServerSide ? 'ssr-only' : false} />,
    [isServerSide]
  );
  const imageTypeGaur = imageType === 'image' ? 'image' : undefined;

  const blingType =
    (!imageTypeGaur &&
      optionsKnob<NewsHeroProps['blingType'] | ''>(
        'Bling type',
        {
          '(Auto)': '',
          interesting: 'interesting',
          snake: 'snake',
          pentagon: 'pentagon',
          dome: 'dome',
          'balls-small': 'balls-small',
          'balls-large': 'balls-large',
        },
        '',
        { display: 'inline-radio' }
      )) ||
    undefined;

  return (
    <NewsHero
      key={'' + imageTypeGaur + isServerSide + blingType}
      {...newsHeroProps}
      image={imageTypeGaur && { src: landscapeImage }}
      sharing={renderShareButtons}
      blingType={blingType}
      startSeen
    />
  );
};

export const _NewsHero: Story = {
  render: (args: NewsHeroControlProps) => <NewsHeroStory {...args} />,
  argTypes: {
    imageType: {
      control: {
        type: 'inline-radio',
        labels: {
          image: 'Image',
          'no-image': 'No image (Bling)',
        },
      },
      options: ['image', 'no-image'],
      name: 'Image',
    },
  },
  args: {
    imageType: 'image',
  },
};

// ===========================================================================

const NewsHeroExamplesStory = () => {
  const isServerSide = useIsServerSide();

  const renderShareButtons = useCallback(
    () => <ShareButtons ssr={isServerSide ? 'ssr-only' : false} />,
    [isServerSide]
  );

  return (
    <>
      {[landscapeImage, portraitImage, ''].map((image) => (
        <NewsHero
          key={image + isServerSide}
          {...newsHeroProps}
          image={image ? { src: image } : undefined}
          sharing={renderShareButtons}
          startSeen
        />
      ))}
    </>
  );
};

export const _NewsHeroExamples: Story = {
  render: () => <NewsHeroExamplesStory />,
  parameters: {
    css: {
      tokens: 'NewsHero',
    },
  },
};
