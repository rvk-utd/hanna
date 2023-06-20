import React from 'react';
import { InfoHero, InfoHeroProps } from '@reykjavik/hanna-react/InfoHero';
import { Sharpie } from '@reykjavik/hanna-react/Sharpie';
import { Meta, StoryObj } from '@storybook/react';

import cityCouncilMemberImage from '../example_assets/Dagur-b.jpg';
import landScapeImage from '../example_assets/Gallery--landscape--large.jpg';
import swimmingpoolImage from '../example_assets/sundlaug.jpg';

const alignmentOptions = ['left', 'right'] as const;
type Alignment = (typeof alignmentOptions)[number];

const imageOptions = ['no-image', 'portrait', 'landscape', 'pool'] as const;
type Image = (typeof imageOptions)[number];

const blingTypeOptions = ['waves', 'sunny-waves', 'triangles', 'circles'] as const;
type BlingType = (typeof blingTypeOptions)[number];

type ControlProps = {
  alignment: Alignment;
  image: Image;
  blingType: BlingType;
  swimmingPoolContent: boolean;
  blurbText: boolean;
  footerText: boolean;
};
type Story = StoryObj<ControlProps>;

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

const getImage = (image: Image) => {
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
};
export default meta;

const InfoHeroStory: React.FC<ControlProps> = ({
  alignment,
  image,
  blingType,
  swimmingPoolContent,
  blurbText,
  footerText,
}) => {
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

export const _InfoHero: Story = {
  render: (args: ControlProps) => <InfoHeroStory {...args} />,
  argTypes: {
    alignment: {
      control: 'inline-radio',
      options: alignmentOptions,
      name: 'Alignment',
    },
    image: {
      control: {
        type: 'inline-radio',
        labels: {
          'no-image': 'No image',
          portrait: 'Portrait',
          landscape: 'Landscape',
          pool: 'Pool',
        } satisfies Record<Image, string>,
      },
      options: imageOptions,
      name: 'Image',
    },
    blingType: {
      control: {
        type: 'inline-radio',
        labels: {
          waves: 'Waves',
          'sunny-waves': 'Sunny Waves',
          triangles: 'Triangles',
          circles: 'Circles',
        } satisfies Record<BlingType, string>,
      },
      options: blingTypeOptions,
      name: 'Bling type',
    },
    swimmingPoolContent: {
      control: 'boolean',
      name: 'Swimming Pool content',
    },
    blurbText: {
      control: 'boolean',
      name: 'Blurb text',
    },
    footerText: {
      control: 'boolean',
      name: 'Footer text',
    },
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
