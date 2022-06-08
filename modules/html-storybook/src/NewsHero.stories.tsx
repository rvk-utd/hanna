import React, { useCallback } from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import NewsHero, { NewsHeroProps } from '@reykjavik/hanna-react/NewsHero';
import ShareButtons from '@reykjavik/hanna-react/ShareButtons';
import { optionsKnob } from '@storybook/addon-knobs';

import landscapeImage from './example_assets/NewsHero__landscape.jpg';
import portraitImage from './example_assets/NewsHero__portrait.jpg';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'NewsHero',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

const newsHeroProps = {
  title: 'Útivistarsvæðin í borginni iða af lífi',
  meta: '14. oktober',
  summary:
    'Reykvíkingar eru heppnir að geta valið milli margra spennandi útivistarsvæða þar sem er hægt að viðra sig og næra líkama og sál. Þessi svæði eru sérstaklega mikilvæg nú á tímum samkomu- banns og aflýstra viðburða. Náttúran er enn opin og á útivistar- svæðum er auðvelt að hlýða Víði og virða tveggja metra regluna en á sama tíma finna fyrir ákveðinni nálægð við annað fólk.',
};

export const _NewsHero: StoryComponent = () => {
  const isServerSide = useIsServerSide();

  const renderShareButtons = useCallback(
    () => <ShareButtons ssr={isServerSide ? 'ssr-only' : false} />,
    [isServerSide]
  );

  const imageType =
    optionsKnob('Image type', { Image: 'image', 'No image (Bling)': '' }, 'image', {
      display: 'inline-radio',
    }) || undefined;

  const blingType =
    (!imageType &&
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
      key={'' + imageType + isServerSide + blingType}
      {...newsHeroProps}
      image={imageType && { src: landscapeImage }}
      sharing={renderShareButtons}
      blingType={blingType}
      startSeen
    />
  );
};

// ===========================================================================

export const _NewsHeroExamples: StoryComponent = () => {
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
_NewsHeroExamples.story = {
  parameters: {
    knobs: { disabled: true },
  },
};
