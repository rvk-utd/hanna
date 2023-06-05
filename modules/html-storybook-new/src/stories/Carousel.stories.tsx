import React from 'react';
import { Carousel, CarouselProps } from '@reykjavik/hanna-react/Carousel';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

const meta: Meta<CarouselProps> = {
  title: 'Carousel',
  component: Carousel,
};
export default meta;

type Story = StoryObj<CarouselProps>;

const CarouselStory = () => {
  return (
    <>
      <style>
        {`
        .Carousel p {
          border: var(--border-default);
          background-color: var(--color-suld-25);
          padding: 1em;
          margin-right: var(--grid-gutter);
        }
        .Carousel strong {
          display: block;
          width: max-content;
        }
      `}
      </style>
      <Carousel startSeen>
        <p>
          <strong>one</strong> Subtext
        </p>
        <p>
          <strong>two</strong> Yöva gäta stahrt sömwaer. Ut enim ad minim veniam, letsi
          Björk ifder svensk og latin makinen dehr graek.
        </p>
        <p>
          <strong>three</strong> Ut enim ad minim veniam, letsi Björk ifder svensk og
          latin makinen dehr graek
        </p>
        <p>
          <strong>four</strong> Chockolate moose!
        </p>
      </Carousel>
    </>
  );
};

export const _Carousel: Story = {
  render: () => <CarouselStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    ...disableControlProps([
      'className',
      'ssr',
      'scrollRight',
      'items',
      'Component',
      'ComponentProps',
      'itemCount',
      'startSeen',
    ]),
  },
};
