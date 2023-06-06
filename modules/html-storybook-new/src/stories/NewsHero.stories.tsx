import React, { useCallback } from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { NewsHero, NewsHeroProps } from '@reykjavik/hanna-react/NewsHero';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';
import portraitImage from '../example_assets/NewsHero__portrait.jpg';

type BlingType =
  | 'auto'
  | 'interesting'
  | 'snake'
  | 'pentagon'
  | 'dome'
  | 'balls-small'
  | 'balls-large';

type NewsHeroControlProps = {
  imageType: 'image' | 'no-image';
  blingType?: BlingType;
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

const getBlingType = (blingType: BlingType | undefined): NewsHeroProps['blingType'] => {
  if (blingType === 'auto') {
    return undefined;
  }
  return blingType;
};

const NewsHeroStory: React.FC<NewsHeroControlProps> = ({ imageType, blingType }) => {
  const isServerSide = useIsServerSide();

  const renderShareButtons = useCallback(
    () => <ShareButtons ssr={isServerSide ? 'ssr-only' : false} />,
    [isServerSide]
  );
  const image = imageType === 'image' ? 'image' : undefined;

  const blingOptType = !image ? getBlingType(blingType) : undefined;

  return (
    <NewsHero
      key={'' + image + isServerSide + blingOptType}
      {...newsHeroProps}
      image={image && { src: landscapeImage }}
      sharing={renderShareButtons}
      blingType={blingOptType}
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
    blingType: {
      if: { arg: 'imageType', eq: 'no-image' },
      control: {
        type: 'inline-radio',
        labels: {
          auto: '(Auto)',
          interesting: 'Interesting',
          snake: 'Snake',
          pentagon: 'Pentagon',
          dome: 'Dome',
          'balls-small': 'Balls-small',
          'balls-large': 'Balls-large',
        },
      },
      options: [
        'auto',
        'interesting',
        'snake',
        'pentagon',
        'dome',
        'balls-small',
        'balls-large',
      ],
      name: 'Image',
    },
  },
  args: {
    imageType: 'image',
    blingType: 'auto',
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
    controls: { hideNoControlsWarning: true },
    css: {
      tokens: 'NewsHero',
    },
  },
};
