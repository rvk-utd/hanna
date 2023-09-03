import React from 'react';
import { Gallery, GalleryItemProps } from '@reykjavik/hanna-react/Gallery';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/Gallery--landscape.jpg';
import landscapeImageLarge from '../example_assets/Gallery--landscape--large.jpg';
import portraitImage from '../example_assets/Gallery--portrait.jpg';
import portraitImageLarge from '../example_assets/Gallery--portrait--large.jpg';

const meta: Meta = {
  title: 'Gallery',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const galleryData: Array<GalleryItemProps> = [
  {
    caption: 'Elliðaárdalur',
    largeImageSrc: landscapeImageLarge,
    src: landscapeImage,
  },
  {
    caption: 'long caption here to test how this can break the layout',
    largeImageSrc: portraitImageLarge,
    src: portraitImage,
    altText: 'Elliðaárdalur alt text',
  },
  {
    largeImageSrc: landscapeImageLarge,
    src: landscapeImage,
  },
  {
    caption: 'Test incorrect ratio',
    description: 'Some description to go along with this image',
    largeImageSrc: portraitImageLarge,
    src: portraitImage,
  },
  {
    caption: 'This one has a caption',
    // large image missing
    src: portraitImage,
  },
];

export const _Gallery: StoryObj = {
  render: () => <Gallery items={galleryData} startSeen />,
};
