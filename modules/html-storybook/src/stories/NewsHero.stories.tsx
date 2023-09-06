import React, { useCallback } from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { NewsHero, NewsHeroProps } from '@reykjavik/hanna-react/NewsHero';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';
import portraitImage from '../example_assets/NewsHero__portrait.jpg';

const imageTypeOptions = ['image', 'no-image'] as const;
const blingTypeOptions = [
  'auto',
  'interesting',
  'snake',
  'pentagon',
  'dome',
  'balls-small',
  'balls-large',
] satisfies Array<'auto' | NewsHeroProps['blingType']>;

type ControlProps = {
  imageType: (typeof imageTypeOptions)[number];
  blingType: (typeof blingTypeOptions)[number];
};

const meta: Meta<ControlProps> = {
  title: 'NewsHero',
};
export default meta;

const newsHeroProps = {
  title: 'Útivistarsvæðin í borginni iða af lífi',
  meta: '14. oktober',
  summary:
    'Reykvíkingar eru heppnir að geta valið milli margra spennandi útivistarsvæða þar sem er hægt að viðra sig og næra líkama og sál. Þessi svæði eru sérstaklega mikilvæg nú á tímum samkomu- banns og aflýstra viðburða. Náttúran er enn opin og á útivistar- svæðum er auðvelt að hlýða Víði og virða tveggja metra regluna en á sama tíma finna fyrir ákveðinni nálægð við annað fólk.',
};

const getBlingType = (
  blingType: ControlProps['blingType'] | undefined
): NewsHeroProps['blingType'] => {
  if (blingType === 'auto') {
    return undefined;
  }
  return blingType;
};

const NewsHeroStory: React.FC<ControlProps> = ({ imageType, blingType }) => {
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
    />
  );
};

export const _NewsHero: StoryObj<ControlProps> = {
  render: (args) => <NewsHeroStory {...args} />,
  argTypes: {
    imageType: {
      name: 'Image',
      options: imageTypeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          image: 'Image',
          'no-image': 'No image (Bling)',
        } satisfies Record<ControlProps['imageType'], string>,
      },
    },
    blingType: {
      name: 'Image',
      options: blingTypeOptions,
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
        } satisfies Record<ControlProps['blingType'], string>,
      },
      if: { arg: 'imageType', eq: 'no-image' },
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
        />
      ))}
    </>
  );
};

export const _NewsHeroExamples: StoryObj<ControlProps> = {
  render: () => <NewsHeroExamplesStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
    css: { tokens: 'NewsHero' },
  },
};
