import React from 'react';
import { Carousel } from '@reykjavik/hanna-react/Carousel';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  title: 'Carousel',
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

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
};
