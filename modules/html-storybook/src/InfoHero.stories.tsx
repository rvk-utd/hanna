import React from 'react';
import { InfoHero, InfoHeroProps } from '@reykjavik/hanna-react/InfoHero';
import { Sharpie } from '@reykjavik/hanna-react/Sharpie';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import cityCouncilMemberImage from './example_assets/Dagur-b.jpg';
import landScapeImage from './example_assets/Gallery--landscape--large.jpg';
import swimmingpoolImage from './example_assets/sundlaug.jpg';
import { StoryComponent, StoryParameters } from './storytypes.js';

// ---------------------------------------------------------------------------

export default {
  title: 'InfoHero',
  parameters: {
    knobs: { disabled: false },
    layout: { theme: 'dependable' },
  } as StoryParameters,
};

// ---------------------------------------------------------------------------

const cityCouncilContent: InfoHeroProps = {
  title: 'Dagur B. Eggertsson',
  subTitle: 'Borgarstjóri',
  blurb: 'Samfylkingin',
};

const swimmingpoolContent: InfoHeroProps = {
  title: 'Vestur­bæjar­laug',
  titleBlurb: 'V/ Hofsvalla­götu, 107',
  subTitle: 'Opið í dag 6:30 til 22:00\n Lokað á Páskadag',
  blurb: (
    <>
      <Sharpie tag="strong" color="green">
        Opið núna
      </Sharpie>{' '}
      ...or...{' '}
      <Sharpie tag="strong" color="red">
        Lokað núna
      </Sharpie>
    </>
  ),
};

export const _InfoHero: StoryComponent = () => {
  const align = optionsKnob(
    'Alignment',
    {
      Left: 'left',
      Right: 'right',
    },
    'right',
    { display: 'inline-radio' }
  );
  const image = optionsKnob(
    'Image',
    {
      'No image': '',
      Portrait: cityCouncilMemberImage,
      Landscape: landScapeImage,
      Pool: swimmingpoolImage,
    },
    cityCouncilMemberImage,
    { display: 'inline-radio' }
  );
  const blingType = optionsKnob<InfoHeroProps['blingType']>(
    'Bling type',
    {
      Waves: 'waves',
      'Sunny Waves': 'sunny-waves',
      Triangles: 'triangles',
      Circles: 'circles',
    },
    'waves',
    { display: 'inline-radio' }
  );

  const contentProps = boolean('Swimming Pool content', false)
    ? swimmingpoolContent
    : cityCouncilContent;

  const blurb = boolean('Blurb text', false) ? (
    <>
      Lorem ipsum
      <br />
      Dolor sit
    </>
  ) : undefined;
  const footer = boolean('Footer text', false)
    ? 'Leebur deroor iehroom, minim chokolat moose.'
    : undefined;

  return (
    <InfoHero
      key={align + (image !== '') + blingType}
      {...contentProps}
      {...(image ? { image: { src: image } } : { image: undefined })}
      align={align}
      buttons={[
        { href: '', label: 'Fjárhagslegir hagsmunir' },
        { href: '', label: 'Dagur á Facebook' },
        {
          href: 'mailto:borgarstjori@reykjavik.is',
          label: 'borgarstjori@reykjavik.is',
        },
      ]}
      blurb={blurb}
      footer={footer}
      blingType={blingType}
    />
  );
};
