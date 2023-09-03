import React from 'react';
import { InfoHero, InfoHeroProps } from '@reykjavik/hanna-react/InfoHero';
import { Sharpie } from '@reykjavik/hanna-react/Sharpie';
import { Meta, StoryObj } from '@storybook/react';

import cityCouncilMemberImage from '../example_assets/Dagur-b.jpg';
import landScapeImage from '../example_assets/Gallery--landscape--large.jpg';
import swimmingpoolImage from '../example_assets/sundlaug.jpg';

const alignmentOptions = ['left', 'right'] satisfies Array<InfoHeroProps['align']>;
const imageOptions = ['no-image', 'portrait', 'landscape', 'pool'] as const;
const blingTypeOptions = ['waves', 'sunny-waves', 'triangles', 'circles'] satisfies Array<
  InfoHeroProps['blingType']
>;

type ControlProps = {
  alignment: (typeof alignmentOptions)[number];
  image: (typeof imageOptions)[number];
  blingType: (typeof blingTypeOptions)[number];
  swimmingPoolContent: boolean;
  blurbText: boolean;
  footerText: boolean;
};

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

const getImage = (image: ControlProps['image']) => {
  if (image === 'portrait') {
    return cityCouncilMemberImage;
  }
  if (image === 'landscape') {
    return landScapeImage;
  }
  if (image === 'pool') {
    return swimmingpoolImage;
  }
  return '';
};

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'InfoHero',
  parameters: {
    layout: { theme: 'dependable' },
  },
};
export default meta;

const InfoHeroStory = (props: ControlProps) => {
  const { alignment, image, blingType, swimmingPoolContent, blurbText, footerText } =
    props;
  const imageSrc = getImage(image);

  const contentProps = swimmingPoolContent ? swimmingpoolContent : cityCouncilContent;

  const blurb = blurbText ? (
    <>
      Lorem ipsum
      <br />
      Dolor sit
    </>
  ) : undefined;
  const footer = footerText ? 'Leebur deroor iehroom, minim chokolat moose.' : undefined;
  return (
    <InfoHero
      key={alignment + (imageSrc !== '') + blingType}
      {...contentProps}
      {...(imageSrc ? { image: { src: imageSrc } } : { image: undefined })}
      align={alignment}
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

export const _InfoHero: StoryObj<ControlProps> = {
  render: (args) => <InfoHeroStory {...args} />,
  argTypes: {
    alignment: {
      name: 'Alignment',
      options: alignmentOptions,
      control: 'inline-radio',
    },
    image: {
      name: 'Image',
      control: {
        type: 'inline-radio',
        options: imageOptions,
        labels: {
          'no-image': 'No image',
          portrait: 'Portrait',
          landscape: 'Landscape',
          pool: 'Pool',
        } satisfies Record<ControlProps['image'], string>,
      },
    },
    blingType: {
      name: 'Bling type',
      options: blingTypeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          waves: 'Waves',
          'sunny-waves': 'Sunny Waves',
          triangles: 'Triangles',
          circles: 'Circles',
        } satisfies Record<ControlProps['blingType'], string>,
      },
    },
    swimmingPoolContent: { name: 'Swimming Pool content' },
    blurbText: { name: 'Blurb text' },
    footerText: { name: 'Footer text' },
  },
  args: {
    alignment: 'right',
    image: 'portrait',
    blingType: 'waves',
    swimmingPoolContent: false,
    blurbText: false,
    footerText: false,
  },
};
